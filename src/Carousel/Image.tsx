import classNames from "classnames";
import type { TransitionStatus } from "react-transition-state";

interface CarouselImageProps {
	imageSrc: string;
	transitionStatus: TransitionStatus;
}

const CarouselImage = ({ imageSrc, transitionStatus }: CarouselImageProps) => {
	const classes = classNames("rounded-lg object-contain", {
		"animate-fade-left":
			transitionStatus === "entering" || transitionStatus === "exiting",
	});

	return (
		<div className="min-w-0">
			<img alt="useful-text" src={imageSrc} className={classes} />
		</div>
	);
};

export default CarouselImage;
