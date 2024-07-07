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
	isValidNavigation: boolean;
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
	isValidNavigation,
	isVertical = false,
	scrollDirection,
}: CarouselNavigationProps) => {
	const buttonClasses = classNames(
		"text-8xl absolute text-white disabled:opacity-5 transition ease-in-out delay-25",
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
			disabled={!isValidNavigation}
		>
			{getIcon(scrollDirection, isVertical)}
		</button>
	);
};

export default CarouselNavigation;
