import {
	FiChevronDown,
	FiChevronLeft,
	FiChevronRight,
	FiChevronUp,
} from "react-icons/fi";
import type { CarouselContainerProps } from "./Container";

interface CarouselNavigationProps extends CarouselContainerProps {
	scrollDirection: "backward" | "forward";
	isValidNavigation: boolean;
	handleNavigate: () => void;
}

const CarouselNavigation = ({
	scrollDirection,
	isVertical = false,
	isValidNavigation,
	handleNavigate,
}: CarouselNavigationProps) => {
	const getIcon = () => {
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

	return (
		<button
			type="button"
			className="text-5xl disabled:opacity-25 transition ease-in-out delay-25"
			onClick={(e) => {
				e.preventDefault();
				handleNavigate();
			}}
			disabled={!isValidNavigation}
		>
			{getIcon()}
		</button>
	);
};

export default CarouselNavigation;
