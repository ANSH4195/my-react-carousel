import type React from "react";
import { useRef, useState } from "react";
import CarouselContainer from "./Carousel/Container";

// FIXME: Bug: fullscreen carousel does not retain the slide position
// TODO: Implement the autoplay
// TODO: Add animations
// TODO: Add drag to change slide

function App() {
	const modalContainerRef = useRef<HTMLDivElement | null>(null);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [isVertical, setIsVertical] = useState(false);

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
				className="py-3 px-5 my-3 rounded-xl bg-slate-200 active:bg-white"
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
					aria-labelledby="modal-backdrop"
					aria-modal="true"
					role="dialog"
					className="fixed inset-0 z-10 w-screen h-screen bg-gray-900 flex items-center px-4"
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
