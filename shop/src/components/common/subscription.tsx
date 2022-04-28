import Text from "@components/ui/text";
import React from "react";
import {useTranslation} from "next-i18next";
import MailchimpForm from "@components/common/mailchimp-form";
import { getDirection } from '@utils/get-direction';
import { useRouter } from 'next/router';
// import WidgetSocial from "@components/widgets/widget-social";
import Container from "@components/ui/container";
import Image from 'next/image';
import Link from "next/link";
import Subs from "../../../public/assets/images/footer/subs.png";
import Facebook from "../../../public/assets/images/footer/face-book.png";
import LinkdIn from "../../../public/assets/images/footer/linked-in.png";
import YouTube from "../../../public/assets/images/footer/you-tube.png";


interface Props {
	className?: string;
	variant?: "default" | "modern";
}

const Subscription: React.FC<Props> = ({ className = "", variant = "default" }) => {
	const { t } = useTranslation();
	const { locale } = useRouter();
	const dir = getDirection(locale);
	return (
		<div className="bg-blue">
			<Container>
				<div
					className={`${className} flex flex-col justify-center xl:justify-between items-center bg-blue py-5 md:py-4 lg:py-4 ${variant === "default" ? "xl:flex-row" : ""}`}
				
				>
					<div className="flex items-center flex-col lg:flex-row">
						<div className={`-mt-1.5 lg:-mt-2 xl:-mt-0.5 text-center ltr:xl:text-left rtl:xl:text-right ${variant === "default" ? "mb-7 md:mb-8 lg:mb-9 xl:mb-0" : "mb-7  z-10 relative"}`}>
							<div className="flex flex-row">
								<Image
								src={Subs}
								alt="Picture of the author"
								width="35px"
								height="25px"
								/>
								<Text
									variant="mediumHeading"
									className="text-white text-2xl pl-3"
								>
									{t(`common:text-subscribe-heading`)}
								</Text>
								{/* <p className="text-body text-xs md:text-sm leading-6 md:leading-7">
									{t(`common:text-subscribe-description`)}
								</p> */}
							</div>
							
						</div>
						<div className="pl-4 items-center">
							<MailchimpForm layout="subscribe" />
							{variant === "modern" ?
								<div
									style={{
									backgroundImage:
										dir === 'rtl'
										? 'url(/assets/images/subscription-bg-reverse.png)'
										: 'url(/assets/images/subscription-bg.png)',
									}}
									className={`hidden z-0 xl:block bg-no-repeat bg-blue ${
									dir === 'rtl'
										? 'bg-left 2xl:-left-12 3xl:left-0 '
										: 'bg-right xl:-right-24 2xl:-right-20 3xl:right-0'
									} bg-contain xl:bg-cover 3xl:bg-contain absolute h-full w-full top-0`}
								/>
							:
							""
							}
						</div>
						
					</div>

					<div className="social-links mt-8 lg:mt-0">
						<ul className="flex flex-row">
							<li>
								<Link href="https://www.facebook.com/">
									<a>
										<Image
										src={Facebook}
										alt="Picture of the author"
										width="35px"
										height="35px"
										/>
									</a>
								</Link>
							</li>
							<li className="pl-3">
								<Link href="https://www.facebook.com/">
									<a>
										<Image
										src={LinkdIn}
										alt="Picture of the author"
										width="35px"
										height="35px"
										/>
									</a>
								</Link>
							</li>
							<li className="pl-3">
								<Link href="https://www.facebook.com/">
									<a>
										<Image
										src={YouTube}
										alt="Picture of the author"
										width="45px"
										height="35px"
										/>
									</a>
								</Link>
							</li>
						</ul>
					</div>
					
					{/* <WidgetSocial /> */}
				</div>
			</Container>
			
		</div>
		
	);
};

export default Subscription;
