/** @format */

'use server';

import { auth } from '@/auth.config';
import type { Address, Size } from '@/interfaces';
import prisma from '@/lib/prisma';

interface ProductToOrder {
	productId: string;
	quantity: number;
	size: Size;
}
export const placeOrder = async (
	productIds: ProductToOrder[],
	address: Address
) => {
	const session = await auth();
	const userId = session?.user.id;
	if (!userId) {
		return {
			ok: false,
			message: 'Error al crear la orden, sin sesion de usuario',
		};
	}

	//console.log('placeOrder', productIds, address, userId);

	const products = await prisma.product.findMany({
		where: {
			id: {
				in: productIds.map((p) => p.productId),
			},
		},
	});

	//console.log(products);
	//calcular los montos.
	//cantidad de productos
	const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

	// Los totales de tax, subtotal, y total
	const { subTotal, tax, total } = productIds.reduce(
		(totals, item) => {
			const productQuantity = item.quantity;
			const product = products.find((product) => product.id === item.productId);

			if (!product) throw new Error(`${item.productId} no existe - 500`);

			const subTotal = product.price * productQuantity;

			totals.subTotal += subTotal;
			totals.tax += subTotal * 0.19;
			totals.total += subTotal * 1.19;

			return totals;
		},
		{ subTotal: 0, tax: 0, total: 0 }
	);
	//console.log('subTotal', subTotal, 'tax', tax, 'total', total);

	try {
		const prismaTx = await prisma.$transaction(async (tx) => {
			//1. actualizar stock prod.

			const updatedProductsPromises = products.map(async (product) => {
				const productQuantity = productIds
					.filter((p) => p.productId === product.id)
					.reduce((count, p) => count + p.quantity, 0);

				if (productQuantity === 0) {
					throw new Error(`${product.title} no tiene stock - 500`);
				}

				return tx.product.update({
					where: {
						id: product.id,
					},
					data: {
						inStock: {
							decrement: productQuantity,
						},
					},
				});
			});

			const updatedProducts = await Promise.all(updatedProductsPromises);

			updatedProducts.forEach((product) => {
				if (product.inStock < 0) {
					throw new Error(`${product.title} no tiene stock - 500`);
				}
			});

			//2.crear la orden
			const order = await tx.order.create({
				data: {
					userId: userId,
					itemsInOrder: itemsInOrder,
					subTotal: subTotal,
					tax: tax,
					total: total,

					OrderItem: {
						createMany: {
							data: productIds.map((p) => ({
								quantity: p.quantity,
								size: p.size,
								productId: p.productId,
								price:
									products.find((product) => product.id === p.productId)
										?.price ?? 0,
							})),
						},
					},
				},
			});

			//3. crear la direccion de la orden
			const newAddressOrder = await tx.orderAddress.create({
				data: {
					firstName: address.firstName,
					lastName: address.lastName,
					address: address.address,
					address2: address.address2,
					postalCode: address.postalCode,
					city: address.city,
					phone: address.phone,
					orderId: order.id,
					countryCode: address.country,
				},
			});

			return {
				order: order,
				orderAddress: newAddressOrder,
				updatedProducts: updatedProducts,
			};
		});

		return{
			ok: true,
			order: prismaTx.order,
			orderAddress: prismaTx.orderAddress,
			updatedProducts: prismaTx.updatedProducts,
			prismaTx: prismaTx,
			message: 'Orden creada correctamente',
		}

	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: `${error}`,
		};
	}
};
