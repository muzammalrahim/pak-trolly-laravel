import TestimonialCard from "@components/common/testimonial-card";
import SectionHeader from "@components/common/section-header";
import Carousel from "@components/ui/carousel/carousel";
import { testimonials } from "@data/static/testimonial";
import { SwiperSlide } from "swiper/react";

interface TestimonialsProps {
	sectionHeading: string;
	className?: string;
	type?: "rounded" | "circle";
}

const breakpoints = {
	"1720": {
		slidesPerView: 1,
	},
	"1366": {
		slidesPerView: 1,
	},
	"1025": {
		slidesPerView: 1,
	},
	"768": {
		slidesPerView: 1,
	},
	"0": {
		slidesPerView: 1,
	},
};

const TestimonialCarousel: React.FC<TestimonialsProps> = ({
	sectionHeading,
	className = "mb-8"
}) => {
	return (
		<div className={`heightFull ${className}`}>
			{/* <SectionHeader sectionHeading={sectionHeading} /> */}
			<Carousel
				autoplay={{
					delay: 400000,
				}}
				breakpoints={breakpoints}
				className="testimonial-carousel"
				buttonClassName="hidden"
				scrollbar={{ draggable: true, hide: false }}
			>
				{testimonials?.map((testimonial) => (
					<SwiperSlide key={`testimonial--key-${testimonial.id}`}>
						<TestimonialCard item={testimonial} />
					</SwiperSlide>
				))}
			</Carousel>
		</div>
	);
};

export default TestimonialCarousel;
