import classNames from "classnames";
import { BiExitFullscreen, BiFullscreen } from "react-icons/bi";
import { IoPlayOutline } from "react-icons/io5";
import { RxDot, RxDotFilled } from "react-icons/rx";
import type { TransitionStatus } from "react-transition-state";
import { SLIDES } from "../slides";
import type { CarouselContainerProps } from "./Container";

interface SlideDotsProps extends CarouselContainerProps {
	currentSlide: number;
	handleNavigate: (idx: number) => void;
	transitionStatus: TransitionStatus;
}

const BottomControls = ({
	currentSlide,
	handleNavigate,
	isFullscreen,
	isVertical = false,
	onToggleFullscreen,
	transitionStatus,
}: SlideDotsProps) => {
	const containerClasses = classNames(
		"flex justify-between items-center text-white text-6xl",
		{
			"fixed ": isFullscreen,
			"absolute ": !isFullscreen,
			"px-2 py-4 flex-col top-0 bottom-0 right-0": isVertical,
			"px-4 py-2 left-0 right-0 bottom-0": !isVertical,
		},
	);

	const activeDotClasses = classNames("transition-all ease-in-out", {
		"animate-fade-up":
			transitionStatus === "entering" || transitionStatus === "exiting",
	});

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
						{currentSlide === idx ? (
							<RxDotFilled className={activeDotClasses} />
						) : (
							<RxDot />
						)}
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
