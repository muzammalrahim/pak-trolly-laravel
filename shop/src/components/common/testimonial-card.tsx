import Text from "@components/ui/text";
import StarIcon from "@components/icons/star-icon";
import QuoteIcon from "@components/icons/quote-icon";

interface Props {
	item: any;
}

const TestimonialCard: React.FC<Props> = ({ item }) => {
	return (
		<div className="flex flex-col md:flex-row items-center bg-gray-200 rounded-md p-6 md:p-8 lg:p-6 xl:p-8 transition duration-300 ease-in-out mx-auto md:mx-0">
			<div>
				<div className="w-[90px] mr-0 md:mr-5">
					<img
						src={item.avatar.src}
						alt={item.name}
						className="rounded-sm p-1 border-[1px] border-blue shadow-avatar"
					/>
				</div>
				
			</div>
			
			{/* <div className="inline-grid grid-cols-5 gap-1.5 mt-3 lg:mt-5">
				{Array.from({ length: item.rating }).map((_, idx) => (
					<StarIcon key={idx} />
				))}
				{Array.from({ length: 5 - item.rating }).map((_, idx) => (
					<StarIcon color="#e6e6e6" key={idx} />
				))}
			</div> */}
			<div className="flex flex-col md:flex-row items-center">
				<div className="mt-5 md:mt-0 mr-0 md:mr-5">
					<QuoteIcon className="mb-3 xl:mb-4" />
				</div>
				<div>
					<Text className="text-center md:text-left text-sm sm:leading-7 lg:text-base lg:leading-[1.625rem] mt-5 xl:mt-7">
						{item.text}
					</Text>
					<Text variant="mediumHeading" className="text-center md:text-left 2xl:text-2xl mt-1 xl:mt-2">
						{item.name}
					</Text>
				</div>
				
				
			</div>
			
		</div>
	);
};

export default TestimonialCard;
