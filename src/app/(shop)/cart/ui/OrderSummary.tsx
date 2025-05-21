/** @format */

'use client';

import { useCartStore } from '@/store';
import { useEffect, useState } from 'react';
import { currencyFormat } from '../../../../utils/currencyFormat';

export const OrderSummary = () => {
	const [loaded, setLoaded] = useState(false);
	useCartStore((state) => state.cart); //Al seleccionar el cart, este se vuelve a renderizar

	const getSumaryInformation = useCartStore(
		(state) => state.getSumaryInformation
	);
	const { subTotal, tax, total, itemsInCart } = getSumaryInformation();

	useEffect(() => {
		setLoaded(true);
	});

	if (!loaded) return <p>Loading...</p>;

	return (
		<div className="grid grid-cols-2 transition-all">
			<span>No. Productos</span>
			<span className="text-right">{itemsInCart} articulos</span>

			<span>SubTotal</span>
			<span className="text-right">$ {currencyFormat(subTotal)}</span>

			<span>Impuestos (19%)</span>
			<span className="text-right">$ {currencyFormat(tax)}</span>
			<span className="text-2xl mt-5">Total:</span>
			<span className="text-2xl mt-5 text-right">$ {currencyFormat(total)}</span>
		</div>
	);
};
