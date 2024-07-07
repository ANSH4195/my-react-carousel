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
				handleNavigate={handleNavigateLeft}
				isValidNavigation={currentSlide !== 0}
				isVertical={isVertical}
				scrollDirection="backward"
			/>
			<CarouselImage imageSrc={SLIDES[currentSlide].imageUrl} />
			<CarouselNavigation
				handleNavigate={handleNavigateRight}
				isValidNavigation={currentSlide !== SLIDES_LENGTH - 1}
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
