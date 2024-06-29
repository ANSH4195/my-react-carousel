import { RxDotFilled } from "react-icons/rx";
import { SLIDES } from "../slides";
import type { CarouselContainerProps } from "./Container";

interface SlideDotsProps extends CarouselContainerProps {
	currentSlide: number;
	handleNavigate: (idx: number) => void;
}

const SlideDots = ({
	currentSlide,
	isVertical = false,
	handleNavigate,
}: SlideDotsProps) => (
	<div
		className={`flex ${isVertical && "flex-col"} justify-center ${!isVertical && "space-x-2 my-2"} items-center`}
	>
		{SLIDES.map((slide, idx) => (
			<button
				type="button"
				key={slide.altText}
				className={currentSlide === idx ? "text-4xl" : "text-lg"}
				onClick={() => handleNavigate(idx)}
			>
				<RxDotFilled />
			</button>
		))}
	</div>
);

export default SlideDots;
