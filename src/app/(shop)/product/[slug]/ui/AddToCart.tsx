/** @format */
'use client';

import { QuantitySelector, SizeSelector } from '@/components';
import { CartProduct, Product, Size } from '@/interfaces';
import { useCartStore } from '@/store';
import React, { useState } from 'react';

interface Prop {
	product: Product;
}

export const AddToCart = ({ product }: Prop) => {

    const addProductToCart = useCartStore(state => state.addProductToCart);

	const [size, setSize] = useState<Size | undefined>();
	const [quantity, setQuantity] = useState<number>(1);
	const [posted, setPosted] = useState(false);

	const addToCart = () => {
        setPosted(true);
        if (!size) return;
		//console.log(size, quantity);
        
        const cartProducto: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            size: size,
            quantity: quantity,
            image: product.images[0],
            price: product.price,
        }

        addProductToCart(cartProducto);

        setPosted(false);
        setSize(undefined);
        setQuantity(1);
	};

	return (
		<>
			{/* Tallas */}
			{posted && !size && (
				<span className="text-red-500 text-sm mt-1 fade-in transition-all">
					* Debes seleccionar una talla
				</span>
			)}

			<SizeSelector
				selectedSize={size} // Cambiar por el tamaño seleccionado
				availableSizes={product.sizes}
				onSizeChanged={(size) => setSize(size)}
			/>

			{/* cantiadas */}
			<QuantitySelector
				quantity={quantity}
				onQuantityChanged={(quantity) => setQuantity(quantity)}
			/>
			{/* botton */}
			<button onClick={addToCart} className="btn-primary my-5 ">
				Agregar al carrito
			</button>
		</>
	);
};
