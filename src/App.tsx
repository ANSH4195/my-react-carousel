import type React from "react";
import { useRef, useState } from "react";
import CarouselContainer from "./Carousel/Container";

function App() {
	const modalContainerRef = useRef<HTMLDivElement | null>(null);
	const [isVertical, setIsVertical] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);

	const onToggleFullscreen = () => {
		setIsFullscreen((prev) => !prev);
	};

	const onClickModalContainer = (e: React.MouseEvent) => {
		if (!modalContainerRef.current?.contains(e.target as Node)) {
			onToggleFullscreen();
		}
	};

	return (
		<div className="container mx-auto py-12">
			<button
				type="button"
				className="py-3 px-5 my-3 rounded-xl bg-slate-200 active:bg-white transition-all duration-50 ease-in-out"
				onClick={(e) => {
					e.preventDefault();
					setIsVertical((prev) => !prev);
				}}
			>
				Toggle Vertical Mode
			</button>

			{!isFullscreen ? (
				<CarouselContainer
					isVertical={isVertical}
					onToggleFullscreen={onToggleFullscreen}
				/>
			) : (
				<div
					className="fixed inset-0 z-10 w-screen h-screen bg-slate-200 transform transition-all flex items-center px-4"
					aria-labelledby="modal-title"
					role="dialog"
					aria-modal="true"
					onMouseDown={onClickModalContainer}
				>
					<div ref={modalContainerRef}>
						<CarouselContainer
							isFullscreen={isFullscreen}
							onToggleFullscreen={onToggleFullscreen}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
