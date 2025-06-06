/** @format */

'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getPaginatedUsers = async () => {
	const session = await auth();

	if (!session?.user || session?.user.role !== 'admin') {
		return {
			ok: false,
			message: 'Error usuario sin rol.',
		};
	}

	const users = await prisma.user.findMany({
		orderBy: {
			createdAt: 'desc',
		},
	});

	return {
		ok: true,
		users,
	};
};
