/** @format */

'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import React from 'react';
import { ProductImage } from '../image/ProductImage';

interface Props {
	images: string[];
	title: string;
	className?: string;
}

export const ProductMobileSlideshow = ({ images, title, className }: Props) => {
	return (
		<div className={className}>
			<Swiper
				style={{ width: '100vw', height: '500px' }}
				pagination={true}
				autoplay={{ delay: 5000 }}
				modules={[FreeMode, Autoplay, Pagination]}
				className="mySwiper2">
				{images.map((image) => (
					<SwiperSlide key={image}>
						<ProductImage
							width={600}
							height={500}
							src={image}
							alt={title}
							className="object-fill"
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};
