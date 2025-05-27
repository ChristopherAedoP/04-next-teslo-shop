/** @format */

'use client';

import { QuantitySelector, SizeSelector } from '@/components';
import { Product, Size } from '@/interfaces';
import { useCartStore } from '@/store';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoCheckmarkOutline } from 'react-icons/io5';

interface Prop {
	product: Product;
}

export const AddToCart = ({ product }: Prop) => {
	const addProductToCart = useCartStore((s) => s.addProductToCart);
	const [size, setSize] = useState<Size>();
	const [quantity, setQuantity] = useState(1);
	const [errorPosted, setErrorPosted] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);

	const CONFIRM_DURATION = 1000; // 1 segundo

	const addToCart = () => {
		if (!size) {
			setErrorPosted(true);
			setTimeout(() => setErrorPosted(false), 2000);
			return;
		}

		addProductToCart({
			id: product.id,
			slug: product.slug,
			title: product.title,
			size,
			quantity,
			image: product.images[0],
			price: product.price,
		});

		setSize(undefined);
		setQuantity(1);

		setShowConfirm(true);
		setTimeout(() => setShowConfirm(false), CONFIRM_DURATION);
	};

	return (
		<>
			{/* Error de talla */}
			{errorPosted && (
				<span className="text-red-500 text-sm mt-1 block">
					* Debes seleccionar una talla
				</span>
			)}

			<SizeSelector
				selectedSize={size}
				availableSizes={product.sizes}
				onSizeChanged={setSize}
			/>

			<QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

			{/* Botón que se reemplaza */}
			<motion.button
				onClick={addToCart}
				disabled={showConfirm}
				whileTap={!showConfirm ? { scale: 0.95 } : {}}
				className={`
    w-full mt-5 flex items-center justify-center gap-2 
    text-white font-medium 
    ${
			showConfirm
				? 'bg-green-600 hover:bg-green-700'
				: 'bg-blue-600 hover:bg-blue-700'
		}  
    px-6 py-3 rounded-lg transition-colors duration-200
    ${showConfirm ? 'cursor-default' : 'cursor-pointer'}
  `}>
				{showConfirm ? (
					<>
						<IoCheckmarkOutline size={20} />
						Producto añadido
					</>
				) : (
					'Agregar al carrito'
				)}
			</motion.button>
		</>
	);
};
