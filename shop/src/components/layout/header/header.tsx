import React, { useRef } from "react";
import SearchIcon from "@components/icons/search-icon";
import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import { ROUTES } from "@lib/routes";
import { addActiveScroll } from "@utils/add-active-scroll";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import Container from "@components/ui/container";
import { useAtom } from "jotai";
import { authorizationAtom } from "@store/authorization-atom";
import { menu } from "@data/static/menus";
import TopHeader from "./topheader";
import HeaderMenu from "@components/layout/header/header-menu";

const AuthMenu = dynamic(() => import("./auth-menu"), { ssr: false });
const CartButton = dynamic(() => import("@components/cart/cart-button"), {
	ssr: false,
});

interface Props {
	variant?: "default" | "modern";
}

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const Header: React.FC<Props> = ({
	variant = "default"
}) => {
	const {
		openSidebar,
		setDrawerView,
		openModal,
		setModalView,
	} = useUI();
  const [ isAuthorize ] = useAtom(authorizationAtom);
	const { t } = useTranslation("common");
	const siteHeaderRef = useRef() as DivElementRef;
	addActiveScroll(siteHeaderRef);

	function handleLogin() {
		setModalView("LOGIN_VIEW");
		return openModal();
	}
	function handleMobileMenu() {
		setDrawerView("MOBILE_MENU");
		return openSidebar();
	}

  return (
	  <>
	  <TopHeader />
<Container className="w-full">
	<header id="siteHeader" ref={siteHeaderRef}  className="main-header grid grid-cols-12 pt-5 pb-5 w-full h-20 lg:h-40 relative z-20 ">

		

	<div className="lg:col-span-3 md:col-span-4 col-sm-12 m-auto block">
	<button
		aria-label="Menu"
		className={`menuBtn md:flex ${variant !== "modern" ? "hidden lg:hidden px-5 2xl:px-7" : "ltr:pr-7 rtl:pl-2 hidden md:block"} flex-col items-center justify-center flex-shrink-0 h-full outline-none focus:outline-none`}
		onClick={handleMobileMenu}
	>
		<span className="menuIcon">
			<span className="bar" />
			<span className="bar" />
			<span className="bar" />
		</span>
	</button>
	<Logo />
	</div>
	<div className="hidden md:block lg:col-span-7 md:col-span-5  relative">
	<input className="hadow appearance-none border-blue border rounded w-full py-2 px-3 text-gray-700 leading-tight h-11 focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
	<SearchIcon className="absolute top-3 right-3" />
	</div>
	<div className="lg:col-span-1 md:col-span-1 hidden md:block pt-3 text-right justify-center">

		<AuthMenu
			isAuthorized={isAuthorize}
			href={ROUTES.ACCOUNT}
			className="text-sm xl:text-base text-heading font-semibold inline-block"
			btnProps={{
				className:
					"text-sm xl:text-base text-heading font-semibold focus:outline-none",
				children: t("text-sign-in"),
				onClick: handleLogin,
			}}
		>
			{t("text-page-my-account")}
		</AuthMenu>
		</div>
	<div className="lg:col-span-1 pt-3 md:col-span-1 hidden md:block justify-center text-right lg:pl-10 md:pl-7">
	<CartButton />
	</div>
	

	<div className="col-span-12">
	{variant !== "modern" ?
			<HeaderMenu data={menu} className="hidden lg:flex p-0"/>
			:
			""
			}

	</div>

	</header>
</Container>
	  

		
		</>
	);
};

export default Header;
