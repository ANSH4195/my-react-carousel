import { useState } from "react";
import CarouselContainer from "./Carousel/Container";

function App() {
	const [isVertical, setIsVertical] = useState(false);

	return (
		<div className="container mx-auto py-12">
			<button
				type="button"
				className="border-2 py-2 px-4 my-3 rounded-xl bg-slate-200 active:bg-white transition-all duration-50 ease-in-out"
				onClick={(e) => {
					e.preventDefault();
					setIsVertical((prev) => !prev);
				}}
			>
				Toggle Vertical Mode
			</button>

			<CarouselContainer isVertical={isVertical} />
		</div>
	);
}

export default App;
