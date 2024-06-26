import { useState } from "react";
import CarouselImage from "./Image";
import CarouselNavigation from "./Navigation";

const CarouselContainer = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const handleNavigateLeft = () => {
		setCurrentSlide((prevSlide) =>
			prevSlide > 0 ? prevSlide - 1 : prevSlide,
		);
	};
	const handleNavigateRight = () => {
		setCurrentSlide((prevSlide) =>
			prevSlide < 6 ? prevSlide + 1 : prevSlide,
		);
	};

	return (
		<div className="flex items-center">
			<CarouselNavigation
				direction="left"
				isValidNavigation={currentSlide !== 0}
				handleNavigate={handleNavigateLeft}
			/>
			<CarouselImage
				imageSrc={`https://picsum.photos/id/${currentSlide + 50}/1920/1080`}
			/>
			<CarouselNavigation
				direction="right"
				isValidNavigation={currentSlide !== 5}
				handleNavigate={handleNavigateRight}
			/>
		</div>
	);
};

export default CarouselContainer;
