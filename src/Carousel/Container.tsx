import { useState } from "react";
import CarouselImage from "./Image";
import CarouselNavigation from "./Navigation";
import { SLIDES, SLIDES_LENGTH } from "../slides";
import SlideDots from "./SlideDots";

const CarouselContainer = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

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

	return (
		<div className="flex items-center">
			<CarouselNavigation
				direction="left"
				isValidNavigation={currentSlide !== 0}
				handleNavigate={handleNavigateLeft}
			/>
			<div className="flex flex-col">
				<CarouselImage imageSrc={SLIDES[currentSlide].imageUrl} />
				<SlideDots currentSlide={currentSlide} />
			</div>
			<CarouselNavigation
				direction="right"
				isValidNavigation={currentSlide !== SLIDES_LENGTH - 1}
				handleNavigate={handleNavigateRight}
			/>
		</div>
	);
};

export default CarouselContainer;
