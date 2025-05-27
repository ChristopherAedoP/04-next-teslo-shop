/** @format */

'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getPaginatedOrder = async () => {

	const session = await auth();
	
    if (!session?.user || session?.user.role !== 'admin') {
		return {
			ok: false,
			message: 'Error al obtener las ordenes, sin sesion de usuario',
		};
	}

	const orders = await prisma.order.findMany({
		include: {
			OrderAddress: {
				select: {
					firstName: true,
					lastName: true,
				},
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	return {
		ok: true,
		orders,
	};
};
