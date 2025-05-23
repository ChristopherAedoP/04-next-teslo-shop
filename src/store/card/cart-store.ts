/** @format */

import { CartProduct } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
	cart: CartProduct[];
	addProductToCart: (product: CartProduct) => void;
	getSumaryInformation: () => {
		subTotal: number;
		tax: number;
		total: number;
		itemsInCart: number;
	};
	getTotalItems: () => number;
	updateProductQuantity: (product: CartProduct, quantity: number) => void;
	removeProduct: (product: CartProduct) => void;
	clearCart: () => void;
}

export const useCartStore = create<State>()(
	persist(
		(set, get) => ({
			cart: [],

			//metodos
			//0. clear cart
			clearCart: () => set({ cart: [] }),
			// 1. contar productos en el carrito
			getTotalItems: () => {
				const { cart } = get();
				return cart.reduce((total, item) => total + item.quantity, 0);
			},

			// 2. agregar producto al carrito
			addProductToCart: (product: CartProduct) => {
				const { cart } = get();
				// 1. validar si el producto existe en cart
				const productInCart = cart.some(
					(item) => item.id === product.id && item.size === product.size
				);

				if (!productInCart) {
					set({
						cart: [...cart, product],
					});
					return;
				}
				// 2. si existe, actualizar la cantidad
				const updatedProductCart = cart.map((item) => {
					if (item.id === product.id && item.size === product.size) {
						return {
							...item,
							quantity: item.quantity + product.quantity,
						};
					}
					return item;
				});

				set({ cart: updatedProductCart });
			},
			// 3. update producto en carrito
			updateProductQuantity: (product: CartProduct, quantity: number) => {
				const { cart } = get();

				const updatedProductCart = cart.map((item) => {
					if (item.id === product.id && item.size === product.size) {
						return {
							...item,
							quantity: quantity,
						};
					}
					return item;
				});

				set({ cart: updatedProductCart });
			},
			// 4. eliminar
			removeProduct: (product: CartProduct) => {
				const { cart } = get();

				const updatedProductCart = cart.filter(
					(item) => item.id !== product.id || item.size !== product.size
				);

				set({ cart: updatedProductCart });
			},
			// 5. obtener resumen
			getSumaryInformation: () => {
				const { cart } = get();

				const subTotal = cart.reduce(
					(subTotal, prod) => prod.price * prod.quantity + subTotal,
					0
				);

				const tax = subTotal * 0.19;
				const total = subTotal + tax;

				const itemsInCart = cart.reduce(
					(total, item) => total + item.quantity,
					0
				);

				return { subTotal, tax, total, itemsInCart };
			},
		}),
		{
			name: 'cart-store',
		}
	)
);
