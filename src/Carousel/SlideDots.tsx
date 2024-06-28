import { SLIDES } from "../slides";

interface SlideDotsProps {
	currentSlide: number;
}

const SlideDots = ({ currentSlide }: SlideDotsProps) => (
	<div className="flex justify-center space-x-2 my-2">
		{SLIDES.map((slide, idx) => (
			<span key={slide.altText}>{idx === currentSlide ? "X" : "O"}</span>
		))}
	</div>
);

export default SlideDots;
