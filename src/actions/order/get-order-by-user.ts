/** @format */

'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getOrderByUser = async () => {
	const session = await auth();
	if (!session?.user) {
		return {
			ok: false,
			message: 'Error al obtener las ordenes, sin sesion de usuario',
		};
	}

	const orders = await prisma.order.findMany({
		where: {
			userId: session.user.id,
		},
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
