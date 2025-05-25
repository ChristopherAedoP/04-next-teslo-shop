/** @format */

'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

interface Props {
	transactionId: string;
	orderId: string;
}
export const setTransactionId = async ({ transactionId, orderId }: Props) => {
	const session = await auth();
	if (!session?.user) {
		return {
			ok: false,
			message: 'Error pagar orden, usuario sin sesion',
		};
	}

	const order = await prisma.order.update({
		data: {
			transactionId: transactionId,
			isPaid: true,
		},
		where: {
			id: orderId,
		},
	});

	if (!order) {
		return {
			ok: false,
			message: 'Error pagar, orden no encontrada',
		};
	}

	return {
		ok: true,
		order,
	};
};
