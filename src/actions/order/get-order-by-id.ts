/** @format */

'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getOrderById = async (id: string) => {
	const session = await auth();

	if (!session?.user) {
		return {
			ok: false,
			message: 'Error al obtener la orden, sin sesion de usuario',
		};
	}

	try {
		const order = await prisma.order.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				subTotal: true,
				tax: true,
				total: true,
				isPaid: true,
				itemsInOrder: true,
				OrderAddress: true,
				userId: true,
				OrderItem: {
					select: {
						quantity: true,
						size: true,
						price: true,
						product: {
							select: {
								title: true,
								slug: true,
								ProductImage: {
									select: {
										url: true,
									},
									take: 1,
								},
							},
						},
					},
				},
			},
		});

		if (!order) {
			return {
				ok: false,
				message: 'Error al obtener la orden, no encontrada',
			};
		}

		if (session.user.role === 'user' && order.userId !== session.user.id) {
			return {
				ok: false,
				message: 'Error al obtener la orden, no autorizada',
			};
		}

		return {
			ok: true,
			order: order,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: 'Error al obtener la orden',
		};
	}
};
