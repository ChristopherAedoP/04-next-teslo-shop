/** @format */
'use client';

import { useCartStore } from '@/store';
import Image from 'next/image';

import React, { useEffect, useState } from 'react';
import { currencyFormat } from '../../../../../utils/currencyFormat';

export const ProductsInCart = () => {
	const productsInCart = useCartStore((state) => state.cart);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(true);
	}, []);

	if (!loaded) {
		return <p>loading...</p>;
	}

	return (
		<>
			{productsInCart.map((product, index) => (
				<div key={index} className="flex mb-5 ">
					<Image
						src={`/products/${product.image}`}
						alt={product.title}
						width={100}
						height={100}
						style={{
							width: '100px',
							height: '100px',
						}}
						className="mr-5 rounded"
					/>

					<div className='flex flex-col'>
						<span>
							({product.size}) - {product.title}
						</span>
						<span className="text-sm">
							{currencyFormat(product.price)} x {product.quantity}
						</span>
						<p className="font-bold mt-2">
							{currencyFormat(product.price * product.quantity)}
						</p>
					</div>
				</div>
			))}
		</>
	);
};
