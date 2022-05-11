import Image from "next/image";
import Link from "@components/ui/link";
import cn from "classnames";
import { siteSettings } from "@settings/site.settings";
import { useSettings } from "@contexts/settings.context";

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
	className,
	...props
}) => {
  const { logo, siteTitle } = useSettings();


	return (
		<Link
			href={"/"}
			className={cn("inline-flex focus:outline-none md:absolute lg:relative 2xl:relative xl:relative lg:left-0 2xl:left-0 xl:left-0  lg:text-left 2xl:text-left xl:text-left   lg:inline-block 2xl:inline-block xl:inline-block left-0 md:top-3 left-10 sm:m-auto md:w-auto lg:m-auto sm:w-full sm:block sm:text-center sm:mb-8 sm:mt-10 md:text-left ", className)}
			{...props}
		>
			<Image
        // src={logo?.original ?? siteSettings.logo.url}
		src={siteSettings.logo.url}
				alt={siteTitle || "ChawkBazar Logo"}
        // TODO: Make it dynamic
				height={60}
				width={130}
				layout="fixed"
				loading="eager"
			/>
		</Link>
	);
};

export default Logo;
