
import StarIcon from "@components/icons/star-icon";
interface Props {
	rating: any;
}
const RatingProduct: React.FC<Props> = ({rating}) => {
  return (
	<div className="mt-5 mb-5">
	  <h2 className="text-2xl border-b-2 border-blue inline-block text-black font-semibold">Rating & Reviews</h2>
	  <span className="border-b-2 border-gray-400 block -mt-0.5"></span>

	  <div className="mt-4 mb-9">
       <strong className="text-5xl text-black pr-1 inline-block">4.0/</strong>
	   <span className="inline-block text-2xl text-black">5</span>
	   <div className="inline-grid grid-cols-5 gap-1.5 mt-3 lg:mt-5 ml-6">
				{Array.from({ length: rating}).map((_, idx) => (
					<StarIcon key={idx} />
				))}
				{Array.from({ length: 5 - rating}).map((_, idx) => (
					<StarIcon color="#e6e6e6" key={idx} />
				))}
		</div>
	  </div>

	  <div className="mb-9">
	  <h2 className="text-2xl border-b-2 border-gray-400 text-black font-semibold">Product Reviews</h2>
       <div className=""></div>

	  </div>
	</div>
  )
}

export default RatingProduct
