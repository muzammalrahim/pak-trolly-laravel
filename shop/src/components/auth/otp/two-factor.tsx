import React from "react";
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
import Label from "@components/ui/label";
import Button from "@components/ui/button";
import MobileOtpInput from "react-otp-input";

type Props = {
  layout?: "modal" | "page";
};

const TwoFactorLogin: React.FC<Props> = ({ layout = "modal" }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { setModalView, openModal, closeModal } = useUI();
  const [_, authorize] = useAtom(authorizationAtom);

  const onLoginSuccess = (token: string) => {
    if (token) {
      Cookies.set(AUTH_TOKEN, token);
      authorize(true);

      if (layout === "modal") {
        closeModal();
        return;
      } else {
        return router.push(ROUTES.ACCOUNT);
      }
    }
  };

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

      <div>
        <Label>{t("text-otp-code")}</Label>
        <MobileOtpInput
          // value={value}
          // onChange={onChange}
          numInputs={6}
          separator={<span className="hidden sm:inline-block sm:mx-2">-</span>}
          containerStyle="justify-center space-x-2 sm:space-x-0 mb-5 md:mb-0"
          inputStyle="flex items-center justify-center !w-full sm:!w-11 appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-gray-100 rounded focus:border-heading h-12"
          disabledStyle="!bg-gray-100"
        />
      </div>
      <br />
      <div className="relative">
        <Button
          type="submit"
          // loading={otpLoginLoading}
          // disabled={otpLoginLoading}
          className="h-11 md:h-12 w-full mt-1.5"
        >
          {t("common:text-login")}
        </Button>
      </div>
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
