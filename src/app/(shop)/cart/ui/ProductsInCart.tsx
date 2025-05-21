/** @format */
'use client';
import { QuantitySelector } from '@/components';
import { useCartStore } from '@/store';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export const ProductsInCart = () => {
	const productsInCart = useCartStore((state) => state.cart);
	const updateProductQuantity = useCartStore(
		(state) => state.updateProductQuantity
	);
	const removeProduct = useCartStore((state) => state.removeProduct);

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

					<div>
						<Link className="hover:underline" href={`/product/${product.slug}`}>
							{product.size} -{product.title}
						</Link>
						<p>${product.price}</p>
						<QuantitySelector
							quantity={product.quantity}
							onQuantityChanged={(quantity) =>
								updateProductQuantity(product, quantity)
							}
						/>

						<button
							onClick={() => removeProduct(product)}
							className="underline mt-3">
							Remover
						</button>
					</div>
				</div>
			))}
		</>
	);
};
