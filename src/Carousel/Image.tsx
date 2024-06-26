interface CarouselImageProps {
	imageSrc: string;
}

const CarouselImage = ({ imageSrc }: CarouselImageProps) => {
	return (
		<div className="min-w-0 px-2">
			<img
				alt="useful-text"
				src={imageSrc}
				className="rounded-lg object-contain"
			/>
		</div>
	);
};

export default CarouselImage;
