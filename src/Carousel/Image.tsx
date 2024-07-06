interface CarouselImageProps {
	imageSrc: string;
}

const CarouselImage = ({ imageSrc }: CarouselImageProps) => {
	return (
		<div className="min-w-0">
			<img
				alt="useful-text"
				src={imageSrc}
				className="rounded-lg object-contain"
			/>
		</div>
	);
};

export default CarouselImage;
