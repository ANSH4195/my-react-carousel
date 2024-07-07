import { useState } from "react";
import CarouselImage from "./Image";
import CarouselNavigation from "./Navigation";
import { SLIDES, SLIDES_LENGTH } from "../slides";
import BottomControls from "./BottomControls";
import { useImagePreloader } from "../useImagePreloader.hook";
import Loader from "../Loader";
import useTransition from "react-transition-state";

export interface CarouselContainerProps {
	isVertical?: boolean;
	isFullscreen?: boolean;
	onToggleFullscreen?: () => void;
}

const CarouselContainer = ({
	isVertical = false,
	isFullscreen = false,
	onToggleFullscreen,
}: CarouselContainerProps) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const { arePreloaded } = useImagePreloader(SLIDES);
	const [{ status }, toggle] = useTransition({
		timeout: 1000,
	});

	const handleNavigateLeft = () => {
		setCurrentSlide((prevSlide) =>
			prevSlide > 0 ? prevSlide - 1 : prevSlide,
		);
		toggle();
	};
	const handleNavigateRight = () => {
		setCurrentSlide((prevSlide) =>
			prevSlide < SLIDES_LENGTH ? prevSlide + 1 : prevSlide,
		);
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
			<CarouselNavigation
				scrollDirection="backward"
				isVertical={isVertical}
				isValidNavigation={currentSlide !== 0}
				handleNavigate={handleNavigateLeft}
			/>
			<CarouselImage imageSrc={SLIDES[currentSlide].imageUrl} />
			<CarouselNavigation
				scrollDirection="forward"
				isVertical={isVertical}
				isValidNavigation={currentSlide !== SLIDES_LENGTH - 1}
				handleNavigate={handleNavigateRight}
			/>
			<BottomControls
				isVertical={isVertical}
				isFullscreen={isFullscreen}
				transitionStatus={status}
				onToggleFullscreen={onToggleFullscreen}
				currentSlide={currentSlide}
				handleNavigate={handleNavigateDots}
			/>
		</div>
	);
};

export default CarouselContainer;
