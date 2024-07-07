import { useState } from "react";
import useTransition from "react-transition-state";
import Loader from "../Loader";
import { SLIDES, SLIDES_LENGTH } from "../slides";
import { useImagePreloader } from "../useImagePreloader.hook";
import BottomControls from "./BottomControls";
import CarouselImage from "./Image";
import CarouselNavigation from "./Navigation";

export interface CarouselContainerProps {
	isFullscreen?: boolean;
	isVertical?: boolean;
	onToggleFullscreen?: () => void;
}

const CarouselContainer = ({
	isFullscreen = false,
	isVertical = false,
	onToggleFullscreen,
}: CarouselContainerProps) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const { arePreloaded } = useImagePreloader(SLIDES);
	const [{ status }, toggle] = useTransition({
		timeout: 400,
	});

	const handleNavigation = (direction: "backward" | "forward") => () => {
		setCurrentSlide((prevSlide) => {
			if (direction === "backward") {
				return prevSlide === 0 ? SLIDES_LENGTH - 1 : prevSlide - 1;
			}
			return (prevSlide + 1) % SLIDES_LENGTH;
		});
		toggle();
	};

	const handleNavigateDots = (index: number) => {
		setCurrentSlide(index);
		toggle();
	};

	return !arePreloaded ? (
		<div className="flex items-center justify-center h-52">
			<Loader />
		</div>
	) : (
		<div className="relative">
			<CarouselImage
				imageSrc={SLIDES[currentSlide].imageUrl}
				transitionStatus={status}
			/>
			<CarouselNavigation
				handleNavigate={handleNavigation("backward")}
				isVertical={isVertical}
				scrollDirection="backward"
			/>
			<CarouselNavigation
				handleNavigate={handleNavigation("forward")}
				isVertical={isVertical}
				scrollDirection="forward"
			/>
			<BottomControls
				currentSlide={currentSlide}
				handleNavigate={handleNavigateDots}
				isFullscreen={isFullscreen}
				isVertical={isVertical}
				onToggleFullscreen={onToggleFullscreen}
				transitionStatus={status}
			/>
		</div>
	);
};

export default CarouselContainer;
