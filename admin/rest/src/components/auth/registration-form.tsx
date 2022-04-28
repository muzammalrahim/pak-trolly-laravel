import Alert from "@components/ui/alert";
import Button from "@components/ui/button";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "@components/ui/link";
import { allowedRoles, hasAccess, setAuthCredentials } from "@utils/auth-utils";
import { Permission } from "@ts-types/generated";
import { useRegisterMutation } from "@data/user/use-register.mutation";

type FormValues = {
	name: string;
	email: string;
	password: string;
	permission: Permission;
};
const registrationFormSchema = yup.object().shape({
	name: yup.string().required("form:error-name-required"),
	email: yup
		.string()
		.email("form:error-email-format")
		.required("form:error-email-required"),
	password: yup.string().required("form:error-password-required"),
	permission: yup.string().default("store_owner").oneOf(["store_owner"]),
});
const RegistrationForm = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const { mutate: registerUser, isLoading: loading } = useRegisterMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<FormValues>({
		resolver: yupResolver(registrationFormSchema),
		defaultValues: {
			permission: Permission.StoreOwner,
		},
	});
	const router = useRouter();
	const { t } = useTranslation();

	async function onSubmit({ name, email, password, permission }: FormValues) {
		registerUser(
			{
				variables: {
					name,
					email,
					password,
					permission,
				},
			},

			{
				onSuccess: ({ data }) => {
					if (data?.token) {
						if (hasAccess(allowedRoles, data?.permissions)) {
							setAuthCredentials(data?.token, data?.permissions);
							router.push(ROUTES.DASHBOARD);
							return;
						}
						setErrorMessage("form:error-enough-permission");
					} else {
						setErrorMessage("form:error-credential-wrong");
					}
				},
				onError: (error: any) => {
					Object.keys(error?.response?.data).forEach((field: any) => {
						setError(field, {
							type: "manual",
							message: error?.response?.data[field],
						});
					});
				},
			}
		);
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				
				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
					<label className="block text-black text-sm font-medium mb-1 md:mb-0 pr-4">
					Account Type
					</label>
					</div>
					<div className="md:w-2/3">
					<label className="block text-blue text-sm font-medium mb-1 md:mb-0 pr-4">
						Bussiness
					</label>
						<p className="text-gray-500 text-xs font-normal">
						Please make sure you have active Business License in order to sell on Daraz as a Corporate
						</p>
					
					</div>
					
				</div>
				<Input
					label={t("form:input-label-name")}
					{...register("name")}
					variant="outline"
					className="mb-4"
					error={t(errors?.name?.message!)}
				/>
				
				<Input
					label={t("form:input-label-email")}
					{...register("email")}
					type="email"
					variant="outline"
					className="mb-4"
					error={t(errors?.email?.message!)}
				/>
				<PasswordInput
					label={t("form:input-label-password")}
					{...register("password")}
					error={t(errors?.password?.message!)}
					variant="outline"
					className="mb-4"
				/>
				<Button className="w-full bg-blue" loading={loading} disabled={loading}>
					{t("form:text-register")}
				</Button>

				{errorMessage ? (
					<Alert
						message={t(errorMessage)}
						variant="error"
						closeable={true}
						className="mt-5"
						onClose={() => setErrorMessage(null)}
					/>
				) : null}
			</form>
			<div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-11 mb-6 sm:mb-8">
				<hr className="w-full" />
				<span className="absolute start-2/4 -top-2.5 px-2 -ms-4 bg-light">
					{t("common:text-or")}
				</span>
			</div>
			<div className="text-sm sm:text-base text-body text-center">
				{t("form:text-already-account")}{" "}
				<Link
					href={ROUTES.LOGIN}
					className="ms-1 underline text-accent font-semibold transition-colors duration-200 focus:outline-none hover:text-accent-hover focus:text-accent-hover hover:no-underline focus:no-underline"
				>
					{t("form:button-label-login")}
				</Link>
			</div> 
			<form/>


			{/* <form className="w-full">
				
				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
					<label className="block text-black text-sm font-medium mb-1 md:mb-0 pr-4">
					Account Type
					</label>
					</div>
					<div className="md:w-2/3">
					<label className="block text-blue text-sm font-medium mb-1 md:mb-0 pr-4">
						Bussiness
					</label>
						<p className="text-gray-500 text-xs font-normal">
						Please make sure you have active Business License in order to sell on Daraz as a Corporate
						</p>
					
					</div>
					
				</div>

				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
					<label className="block text-black text-sm font-medium mb-1 md:mb-0 pr-4">
					Shop Based in
					</label>
					</div>
					<div className="md:w-2/3">
						<input className="appearance-none border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue" id="inline-full-name" type="text" value="" placeholder="City Name"/>
					</div>
					
				</div> 

				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
					<label className="block text-black text-sm font-medium mb-1 md:mb-0 pr-4">
					Email Address
					</label>
					</div>
					<div className="md:w-2/3">
					<input className=" appearance-none border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-whit focus:border-blue" id="inline-full-name" type="text" value="" placeholder="Email"/>
					</div>
					
				</div>

				 <div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
					<label className="block text-black text-sm font-medium mb-1 md:mb-0 pr-4">
					Phone#
					</label>
					</div>
					<div className="md:w-2/3">
					<input className=" appearance-none border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-whit focus:border-blue" id="inline-full-name" type="text" value="" placeholder="Phone Number"/>
					</div>
					
				</div> 
				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
					<label className="block text-black text-sm font-medium mb-1 md:mb-0 pr-4">
						Password
					</label>
					</div>
					<div className="md:w-2/3">
					<input className=" appearance-none border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-whit focus:border-blue" id="inline-password" type="password" placeholder="******************"/>
					</div>
				</div>
				 <div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
					<label className="block text-black text-sm font-medium mb-1 md:mb-0 pr-4">
						Confirm Password
					</label>
					</div>
					<div className="md:w-2/3">
					<input className="appearance-none border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue" id="inline-password" type="password" placeholder="******************"/>
					</div>
				</div> 
				
				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
					<label className="block text-black text-sm font-medium mb-1 md:mb-0 pr-4">
					Store Name
					</label>
					</div>
					<div className="md:w-2/3">
					<input className="appearance-none border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue" id="inline-full-name" type="text" value="" placeholder="Type Your Store Name"/>
					</div>
					
				</div> 
				<div className="md:flex md:items-center mb-6">
					<label className=" block text-gray-500 font-bold">
					<input className="mr-2 leading-tight" type="checkbox"/>
						<span className="text-sm font-normal">
							I've read and understood Pak Trollery 
							<Link href="#"> Terms & Conditions</Link>
							</span>
					</label>
				</div>
				
				<Button className="w-full" loading={loading} disabled={loading}>
					{t("form:text-register")}
				</Button>

				<div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-11 mb-6 sm:mb-8">
					<hr className="w-full" />
					<span className="absolute start-2/4 -top-2.5 px-2 -ms-4 bg-light">
						{t("common:text-or")}
					</span>
				</div>
				<div className="text-sm sm:text-base text-body text-center">
					{t("form:text-already-account")}{" "}
					<Link
						href={ROUTES.LOGIN}
						className="ms-1 underline text-accent font-semibold transition-colors duration-200 focus:outline-none hover:text-accent-hover focus:text-accent-hover hover:no-underline focus:no-underline"
					>
						{t("form:button-label-login")}
					</Link>
				</div>	
				
			</form>
			*/}
		</>
	);
};

export default RegistrationForm;
