import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface CarouselNavigationProps {
	direction: "right" | "left";
	isValidNavigation: boolean;
	handleNavigate: () => void;
}

const CarouselNavigation = ({
	direction,
	isValidNavigation,
	handleNavigate,
}: CarouselNavigationProps) => {
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
			{direction === "left" ? <FiChevronLeft /> : <FiChevronRight />}
		</button>
	);
};

export default CarouselNavigation;
