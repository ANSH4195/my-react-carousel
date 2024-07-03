import { RxDotFilled } from "react-icons/rx";
import { IoPlayOutline } from "react-icons/io5";
import { BiExitFullscreen, BiFullscreen } from "react-icons/bi";
import { SLIDES } from "../slides";
import type { CarouselContainerProps } from "./Container";

interface SlideDotsProps extends CarouselContainerProps {
	currentSlide: number;
	handleNavigate: (idx: number) => void;
}

const SlideDots = ({
	currentSlide,
	isVertical = false,
	isFullscreen,
	onToggleFullscreen,
	handleNavigate,
}: SlideDotsProps) => (
	<div
		className={`flex ${isVertical && "flex-col"} justify-between ${!isVertical && "space-x-2 my-2"} ${isVertical ? "my-14" : "mx-14"} items-center`}
	>
		<button type="button" className="text-2xl">
			<IoPlayOutline />
		</button>
		<div className={`flex ${isVertical && "flex-col"} items-center`}>
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
		<button type="button" className="text-2xl" onClick={onToggleFullscreen}>
			{isFullscreen ? <BiExitFullscreen /> : <BiFullscreen />}
		</button>
	</div>
);

export default SlideDots;
