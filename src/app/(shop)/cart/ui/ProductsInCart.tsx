/** @format */
'use client';
import { ProductImage, QuantitySelector } from '@/components';
import { useCartStore } from '@/store';
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
					<ProductImage
						src={product.image}
						alt={product.title}
						width={100}
						height={100}
						className="w-[100px] h-[100px] mr-5 rounded"
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
