import classNames from "classnames";
import {
	FiChevronDown,
	FiChevronLeft,
	FiChevronRight,
	FiChevronUp,
} from "react-icons/fi";
import type { CarouselContainerProps } from "./Container";

interface CarouselNavigationProps extends CarouselContainerProps {
	handleNavigate: () => void;
	scrollDirection: "backward" | "forward";
}

const getIcon = (
	scrollDirection: CarouselNavigationProps["scrollDirection"],
	isVertical: CarouselContainerProps["isVertical"],
) => {
	if (scrollDirection === "backward") {
		if (isVertical) {
			return <FiChevronUp />;
		}
		return <FiChevronLeft />;
	}
	if (isVertical) {
		return <FiChevronDown />;
	}
	return <FiChevronRight />;
};

const CarouselNavigation = ({
	handleNavigate,
	isVertical = false,
	scrollDirection,
}: CarouselNavigationProps) => {
	const buttonClasses = classNames(
		"text-8xl absolute text-white transition ease-in-out delay-25",
		{
			"right-0 left-0 bottom-0 flex justify-center":
				isVertical && scrollDirection === "forward",
			"right-0 left-0 top-0 flex justify-center":
				isVertical && scrollDirection === "backward",
			"top-0 bottom-0 right-0":
				!isVertical && scrollDirection === "forward",
			"top-0 bottom-0 left-0":
				!isVertical && scrollDirection === "backward",
		},
	);

	return (
		<button
			type="button"
			className={buttonClasses}
			onClick={(e) => {
				e.preventDefault();
				handleNavigate();
			}}
		>
			{getIcon(scrollDirection, isVertical)}
		</button>
	);
};

export default CarouselNavigation;
