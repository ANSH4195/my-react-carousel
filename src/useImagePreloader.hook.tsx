import { useEffect, useState } from "react";
import type { SLIDES } from "./slides";

const preloadImage = (imageSource: string) =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.onload = () => resolve(image);
		image.onerror = () => reject(imageSource);
		image.src = imageSource;
	});

export const useImagePreloader = (images: typeof SLIDES) => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async () => {
			await Promise.all(
				images.map((image) => preloadImage(image.imageUrl)),
			);
			setIsLoading(false);
		})();
	}, [images]);

	return { arePreloaded: !isLoading };
};
