
import StarIcon from "@components/icons/star-icon";
interface Props {
	rating: any;
}
const RatingProduct: React.FC<Props> = ({rating}) => {
  return (
	<div className="mt-5 mb-5">
	  <h2 className="text-2xl border-b-2 border-blue inline-block text-black font-semibold">Rating & Reviews</h2>
	  <span className="border-b-2 border-[#e6e6e6] block -mt-0.5"></span>

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
	  <h2 className="text-2xl border-b-2 border-[#e6e6e6] text-black font-semibold">Product Reviews</h2>
		<div className="mt-5 border-b-2 border-[#e6e6e6] pb-3 mb-3">
		<div className="inline-grid grid-cols-5 gap-1.5 mt-3 lg:mt-5">
					{Array.from({ length: rating}).map((_, idx) => (
						<StarIcon key={idx} />
					))}
					{Array.from({ length: 5 - rating}).map((_, idx) => (
						<StarIcon color="#e6e6e6" key={idx} />
					))}
			</div>
			<div className="block">
				<strong className="inline-block text-black">By Robat Mark</strong> 
				<span className="text-[#29B665] inline-block ml-5">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
				</svg>
				Verified Purchase
				</span>
			</div>
			<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
		</div>
		<div className="mt-5 border-b-2 border-[#e6e6e6] pb-3 mb-3">
		<div className="inline-grid grid-cols-5 gap-1.5 mt-3 lg:mt-5">
					{Array.from({ length: rating}).map((_, idx) => (
						<StarIcon key={idx} />
					))}
					{Array.from({ length: 5 - rating}).map((_, idx) => (
						<StarIcon color="#e6e6e6" key={idx} />
					))}
			</div>
			<div className="block">
				<strong className="inline-block text-black">By Robat Mark</strong> 
				<span className="text-[#29B665] inline-block ml-5">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
				</svg>
				Verified Purchase
				</span>
			</div>
			<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
		</div>
		<div className="mt-5 border-b-2 border-[#e6e6e6] pb-3 mb-3">
		<div className="inline-grid grid-cols-5 gap-1.5 mt-3 lg:mt-5">
					{Array.from({ length: rating}).map((_, idx) => (
						<StarIcon key={idx} />
					))}
					{Array.from({ length: 5 - rating}).map((_, idx) => (
						<StarIcon color="#e6e6e6" key={idx} />
					))}
			</div>
			<div className="block">
				<strong className="inline-block text-black">By Robat Mark</strong> 
				<span className="text-[#29B665] inline-block ml-5">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
				</svg>
				Verified Purchase
				</span>
			</div>
			<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
		</div>
     <a href="#" className="block text-center mt-5 mb-8 text-blue font-semibold text-2xl">View All</a>
	  </div>
	</div>
  )
}

export default RatingProduct
