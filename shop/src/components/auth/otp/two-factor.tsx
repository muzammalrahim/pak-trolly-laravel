import React, { useState } from "react";
import Logo from "@components/ui/logo";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { ROUTES } from "@lib/routes";
import { useUI } from "@contexts/ui.context";
import Cookies from "js-cookie";
import { AUTH_TOKEN } from "@lib/constants";
import { useAtom } from "jotai";
import { authorizationAtom } from "@store/authorization-atom";
import { OTPLoginForm } from "@components/auth/otp/otp-login-form";
import { API_ENDPOINTS } from "@framework/utils/endpoints";
import {
  useOtpLoginMutation,
  useTwoFactorMutation,
  useSendOtpCodeMutation,
} from "@framework/auth/auth.query";
import { Controller } from "react-hook-form";
import Label from "@components/ui/label";
import Button from "@components/ui/button";
import MobileOtpInput from "react-otp-input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type Props = {
  layout?: "modal" | "page";
};

const defaultValues = {
  name: "",
  email: "",
  code: "",
};

const otpLoginFormSchema = yup.object().shape({
  email: yup
    .string()
    .email("forms:error-email-format")
    .when("isContactExist", {
      is: false,
      then: yup.string().required("forms:error-email-required"),
    }),
  name: yup.string().when("isContactExist", {
    is: false,
    then: yup.string().required("forms:error-name-required"),
  }),
  code: yup
    .string()
    .required("forms:error-code-required")
    .min(4, "forms:error-min-code"),
});

const TwoFactorLogin: React.FC<Props> = ({ layout = "modal" }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isContactExist, setIsContactExist] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasOTP, setHasOTP] = useState(false);
  const [otpId, setOtpId] = useState("");
  const [number, setNumber] = useState("");

  const { setModalView, openModal, closeModal } = useUI();
  const [_, authorize] = useAtom(authorizationAtom);
  const { mutate: twoFactor, isLoading: otpLoginLoading } =
    useTwoFactorMutation();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...defaultValues,
      isContactExist,
    },
    resolver: yupResolver(otpLoginFormSchema),
    shouldUnregister: true,
  });

  const onLoginSuccess = (token: string) => {
    if (token) {
      Cookies.set(AUTH_TOKEN, token);
      authorize(true);

      if (layout === "modal") {
        closeModal();
        return;
      } else {
        return router.push(API_ENDPOINTS.TWO_FACTOR);
      }
    }
  };

  function onOtpLoginSubmission(values: any) {
    twoFactor(
      {
        ...values,
        phone_number: number,
        otp_id: otpId,
      },
      {
        onSuccess: (data: any) => {
          if (data?.token && data?.permissions?.length) {
            onLoginSuccess(data?.token);
          }
          authorize(true);

          if (layout === "page") {
            // Redirect to the my-account page
            return router.push(API_ENDPOINTS.TWO_FACTOR);
          } else {
            closeModal();
            return;
          }

          if (!data?.token) {
            setErrorMessage("text-otp-verify-failed");
          }
        },
        onError: (error: any) => {
          console.log("Error", error);
          setErrorMessage(error?.response?.data?.message);
        },
      }
    );
  }

  const handleSignIn = () => {
    if (layout === "modal") {
      setModalView("LOGIN_VIEW");
      return openModal();
    } else {
      return router.push(ROUTES.LOGIN);
    }
  };

  return (
    <div className="py-6 px-5 sm:p-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
      <div className="text-center mb-9 pt-2.5">
        <div onClick={closeModal}>
          <Logo />
        </div>
        <p className="text-sm md:text-base text-body mt-3 sm:mt-4 mb-8 sm:mb-10">
          {/* Enter your 5-Digit Code. */}
          We'll send you a link to reset your password
        </p>
      </div>

      {/* <OTPLoginForm onLoginSuccess={onLoginSuccess} /> */}
      <form onSubmit={handleSubmit(onOtpLoginSubmission)}>
        <div>
          <Label>{t("text-otp-code")}</Label>
          {/* <MobileOtpInput
          // value={value}
          // onChange={onChange}
          numInputs={4}
          separator={<span className="hidden sm:inline-block sm:mx-2">-</span>}
          containerStyle="justify-center space-x-2 sm:space-x-0 mb-5 md:mb-0"
          inputStyle="flex items-center justify-center !w-full sm:!w-11 appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-gray-100 rounded focus:border-heading h-12"
          disabledStyle="!bg-gray-100"
        /> */}

          <Controller
            control={control}
            render={({
              field: { onChange, onBlur: _, value },
              fieldState: { error },
            }) => (
              <>
                <MobileOtpInput
                  value={value}
                  onChange={onChange}
                  numInputs={4}
                  separator={
                    <span className="hidden sm:inline-block sm:mx-2">-</span>
                  }
                  containerStyle="justify-center space-x-2 sm:space-x-0 mb-5 md:mb-0"
                  inputStyle="flex items-center justify-center !w-full sm:!w-11 appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-gray-100 rounded focus:border-heading h-12"
                  disabledStyle="!bg-gray-100"
                />
                {error && (
                  <p className="my-2 text-xs text-red-500">
                    {/* @ts-ignore */}
                    {t(error?.message)}
                  </p>
                )}
              </>
            )}
            name="code"
            defaultValue=""
          />
        </div>
        <br />
        <div className="relative">
          <Button
            type="submit"
            loading={otpLoginLoading}
            disabled={otpLoginLoading}
            className="h-11 md:h-12 w-full mt-1.5"
          >
            {t("common:text-login")}
          </Button>
        </div>
      </form>

      <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-10 mb-6 sm:mb-7">
        <hr className="w-full border-gray-300" />
        <span className="absolute -top-2.5 px-2 bg-white">
          {t("common:text-or")}
        </span>
      </div>
      <div className="text-sm sm:text-base text-body text-center">
        {t("common:text-back-to")}{" "}
        <button
          type="button"
          className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
          onClick={handleSignIn}
        >
          {t("common:text-login")}
        </button>
      </div>
    </div>
  );
};

export default TwoFactorLogin;
