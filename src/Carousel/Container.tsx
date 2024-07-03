import { useState } from "react";
import CarouselImage from "./Image";
import CarouselNavigation from "./Navigation";
import { SLIDES, SLIDES_LENGTH } from "../slides";
import SlideDots from "./SlideDots";
import { useImagePreloader } from "../useImagePreloader.hook";
import Loader from "../Loader";

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

	const handleNavigateLeft = () => {
		setCurrentSlide((prevSlide) =>
			prevSlide > 0 ? prevSlide - 1 : prevSlide,
		);
	};
	const handleNavigateRight = () => {
		setCurrentSlide((prevSlide) =>
			prevSlide < SLIDES_LENGTH ? prevSlide + 1 : prevSlide,
		);
	};
	const handleNavigateDots = (index: number) => {
		setCurrentSlide(index);
	};

	return !arePreloaded ? (
		<div className="flex items-center justify-center h-52">
			<Loader />
		</div>
	) : (
		<div className={`flex ${!isVertical && "flex-col"}`}>
			<div className={`flex ${isVertical && "flex-col"} items-center`}>
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
			</div>
			<SlideDots
				isVertical={isVertical}
				isFullscreen={isFullscreen}
				onToggleFullscreen={onToggleFullscreen}
				currentSlide={currentSlide}
				handleNavigate={handleNavigateDots}
			/>
		</div>
	);
};

export default CarouselContainer;
