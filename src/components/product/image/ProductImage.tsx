/** @format */

import Image from 'next/image';
import React from 'react';

interface Props {
	src?: string;
	alt: string;
	className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
	style?: React.StyleHTMLAttributes<HTMLImageElement>['style'];
	width: number;
	height: number;
	onMouseLeave?: () => void;
	onMouseEnter?: () => void;
}

/**
 * Renders an image component with optional local or remote source.
 * 
 * @param {string} src - The image source URL. If not provided or not a valid URL, a placeholder image is used.
 * @param {string} alt - The alternative text for the image.
 * @param {string} [className] - Optional CSS class names for styling the image.
 * @param {number} width - The width of the image.
 * @param {number} height - The height of the image.
 */

export const ProductImage = ({
	src,
	alt,
	className,
	width,
    style,
	height,
    onMouseLeave,
    onMouseEnter,
}: Props) => {
	const localSrc = src
		? src.startsWith('http')
			? src
			: `/products/${src}`
		: `/imgs/placeholder.jpg`;

	return (
		<Image
			src={localSrc}
			alt={alt}
			width={width}
			height={height}
			className={className}
			style={style}
			onMouseLeave={onMouseLeave}
            onMouseEnter={onMouseEnter}
		/>
	);
}
