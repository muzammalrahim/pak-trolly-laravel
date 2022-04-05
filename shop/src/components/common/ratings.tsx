import Text from "@components/ui/text";
import StarIcon from "@components/icons/star-icon";
import QuoteIcon from "@components/icons/quote-icon";

interface Props {
	item: any;
}

const Ratings: React.FC<Props> = ({ item }) => {
	return (
	 

	  <div className="">
       
	   <div className="inline-grid grid-cols-5 gap-1.5 mt-3 lg:mt-5 ">
				{Array.from({ length: item}).map((_, idx) => (
					<StarIcon key={idx} />
				))}
				{Array.from({ length: 5 - item}).map((_, idx) => (
					<StarIcon color="#e6e6e6" key={idx} />
				))}
		</div>
	  </div>
	);
};

export default Ratings;
