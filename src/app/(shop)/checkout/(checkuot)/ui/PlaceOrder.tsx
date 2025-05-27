/** @format */

'use client';

import { placeOrder } from '@/actions';
import { useAddressStore, useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const PlaceOrder = () => {
	const router = useRouter();
	const [loaded, setLoaded] = useState(false);
	const [isPlacingOrder, setIsPlacingOrder] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const address = useAddressStore((state) => state.address);

	const getSumaryInformation = useCartStore(
		(state) => state.getSumaryInformation
	);
	const clearCart = useCartStore((state) => state.clearCart);

	const { subTotal, tax, total, itemsInCart } = getSumaryInformation();

	const cart = useCartStore((state) => state.cart);

	useEffect(() => {
		setLoaded(true);
	}, []);

	const onPlaceOrder = async () => {
		setIsPlacingOrder(true);

		const productsToOrder = cart.map((product) => ({
			productId: product.id,
			quantity: product.quantity,
			size: product.size,
		}));

		//console.log(address, productsToOrder);

		const res = await placeOrder(productsToOrder, address);
		//console.log('Order placed', res);
		if (!res.ok) {
			setIsPlacingOrder(false);
			setErrorMessage(res.message);
			return;
		}

		setIsPlacingOrder(false);
		clearCart();
		router.replace(`/orders/${res.order?.id}`);
	};

	if (!loaded) return <p>Loading...</p>;
	return (
		<div className="bg-white rounded-lg shadow-md p-5 mb-10">
			<h2 className="text-2xl">Resumen de orden</h2>
			<div className="mb-10">
				<p className="text-xl">
					{address.firstName} {address.lastName}
				</p>
				<p>{address.address}</p>
				<p>{address.address2}</p>
				<p>{address.postalCode}</p>
				<p>
					{address.city}, {address.country}
				</p>
				<p>{address.phone}</p>
			</div>
			<div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>
			<h2 className="text-2xl">Resumen de orden</h2>
			<div className="grid grid-cols-2">
				<span>No. Productos</span>
				<span className="text-right">{itemsInCart} articulos</span>

				<span>SubTotal</span>
				<span className="text-right">{currencyFormat(subTotal)}</span>

				<span>Impuestos (19%)</span>
				<span className="text-right">{currencyFormat(tax)}</span>
				<span className="text-2xl mt-5">Total:</span>
				<span className="text-2xl mt-5 text-right">
					{currencyFormat(total)}
				</span>
			</div>

			<div className="mt-5 mb-2 w-full">
				<p className="mb-5">
					{/* Disclaimer */}
					<span className="text-xs">
						Al hacer clic en &quot;Colocar orden&quot;, aceptas nuestros{' '}
						<a href="#" className="underline">
							términos y condiciones
						</a>{' '}
						y{' '}
						<a href="#" className="underline">
							política de privacidad
						</a>
					</span>
				</p>

				<p className="text-red-500">{errorMessage}</p>

				<button
					//href={`/orders/123654`}
					onClick={() => onPlaceOrder()}
					className={clsx({
						'flex btn-primary justify-center': !isPlacingOrder,
						'flex btn-disabled justify-center animate-pulse': isPlacingOrder,
					})}
					disabled={isPlacingOrder}>
					Finalizar compra
				</button>
			</div>
		</div>
	);
};
