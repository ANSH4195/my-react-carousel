import classNames from "classnames";
import { BiExitFullscreen, BiFullscreen } from "react-icons/bi";
import { IoPlayOutline } from "react-icons/io5";
import { RxDot, RxDotFilled } from "react-icons/rx";
import { SLIDES } from "../slides";
import type { CarouselContainerProps } from "./Container";

interface SlideDotsProps extends CarouselContainerProps {
	currentSlide: number;
	handleNavigate: (idx: number) => void;
}

const BottomControls = ({
	currentSlide,
	isVertical = false,
	isFullscreen,
	onToggleFullscreen,
	handleNavigate,
}: SlideDotsProps) => {
	const containerClasses = classNames(
		"flex justify-between items-center absolute text-white text-6xl",
		{
			"px-2 py-4 flex-col top-0 bottom-0 right-0": isVertical,
			"px-4 py-2 left-0 right-0 bottom-0": !isVertical,
		},
	);

	return (
		<div className={containerClasses}>
			<button type="button">
				<IoPlayOutline />
			</button>
			<div className={`flex ${isVertical && "flex-col"} items-center`}>
				{SLIDES.map((slide, idx) => (
					<button
						type="button"
						key={slide.altText}
						onClick={() => handleNavigate(idx)}
					>
						{currentSlide === idx ? <RxDotFilled /> : <RxDot />}
					</button>
				))}
			</div>
			<button type="button" onClick={onToggleFullscreen}>
				{isFullscreen ? <BiExitFullscreen /> : <BiFullscreen />}
			</button>
		</div>
	);
};

export default BottomControls;
