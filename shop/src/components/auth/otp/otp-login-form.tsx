import Button from "@components/ui/button";
import {
  useOtpLoginMutation,
  useSendOtpCodeMutation,
} from "@framework/auth/auth.query";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import Alert from "@components/ui/alert";
import MobileOtpInput from "react-otp-input";
import Label from "@components/ui/label";
import { useTranslation } from "next-i18next";
import "react-phone-input-2/lib/bootstrap.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Input from "@components/ui/input";
import { useAtom } from "jotai";
import { authorizationAtom } from "@store/authorization-atom";
import { Controller } from "react-hook-form";
import { getDirection } from "@utils/get-direction";
import { useRouter } from "next/router";
import { API_ENDPOINTS } from "@framework/utils/endpoints";
import { ROUTES } from "@lib/routes";

import {
  // useOtpLoginMutation,
  useTwoFactorMutation,
  // useSendOtpCodeMutation,
} from "@framework/auth/auth.query";

interface OTPProps {
  onLoginSuccess: (token: string) => void;
}

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

export const OTPLoginForm: React.FC<OTPProps> = ({ onLoginSuccess }) => {
  const { t } = useTranslation("common");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasOTP, setHasOTP] = useState(false);
  const [otpId, setOtpId] = useState("");
  const [number, setNumber] = useState("");
  const [isContactExist, setIsContactExist] = useState(false);
  const { mutate: sendOtpCode, isLoading: loading } = useSendOtpCodeMutation();
  const [_, authorize] = useAtom(authorizationAtom);
  const { mutate: twoFactor, isLoading: otpLoginLoading } =
    useTwoFactorMutation();

  const router = useRouter();
  const dir = getDirection(router.locale);

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

  function onSendCodeSubmission() {
    sendOtpCode(
      {
        phone_number: number,
      },
      {
        onSuccess: (data: any) => {
          if (data?.success) {
            setErrorMessage(null);
            setIsContactExist(data?.is_contact_exist);
            setHasOTP(true);
            setOtpId(data?.sendOtpCode?.id!);

            // Update isContactExist value for update validation
            setValue("isContactExist", !!data?.is_contact_exist);
          }
          if (!data?.success) {
            setErrorMessage(data?.message);
          }
        },
        onError: (error: any) => {
          setErrorMessage(error?.response?.data?.message);
        },
      }
    );
  }

  function onOtpLoginSubmission(values: any) {
    console.log("userfactorID", localStorage.getItem("twoFactorUserId"));

    twoFactor(
      {
        ...values,
        phone_number: number,
        user_id: localStorage.getItem("twoFactorUserId"),
        permission: localStorage.getItem("permission"),
      },
      {
        onSuccess: (data: any) => {
          console.log("token data", data.token);

          if (data?.token && data?.permissions?.length) {
            onLoginSuccess(data?.token);
          }
          // authorize(true);
          else if (!data?.token) {
            setErrorMessage("text-otp-verify-failed");
          }

          // if (layout === "page") {
          //   // Redirect to the my-account page
          //   return router.push(API_ENDPOINTS.TWO_FACTOR);
          // } else {
          //   closeModal();
          //   return;
          // }
        },
        onError: (error: any) => {
          console.log("Error", error);
          setErrorMessage(error?.response?.data?.message);
        },
      }
    );
  }
  return (
    <>
      {errorMessage && (
        <Alert
          variant="error"
          message={t(errorMessage)}
          className="mb-4"
          closeable={true}
          onClose={() => setErrorMessage(null)}
        />
      )}

      <div className="w-full flex flex-col md:flex-row md:items-center md:space-x-5">
        <form onSubmit={handleSubmit(onOtpLoginSubmission)}>
          <div className="flex flex-col space-y-4">
            <div>
              <Label>{t("text-otp-code")}</Label>

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
                        <span className="hidden sm:inline-block sm:mx-2">
                          -
                        </span>
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
          </div>
        </form>
      </div>
    </>
  );
};
