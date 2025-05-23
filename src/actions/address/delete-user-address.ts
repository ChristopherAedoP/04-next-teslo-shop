/** @format */
'use server'
import prisma from '@/lib/prisma';

export const deleteAddress = async (userId: string) => {
	try {
		await prisma.userAddress.delete({
			where: {
				userId: userId,
			},
		});
		return {
			ok: true,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: 'Error al eliminar la dirección',
		};
	}
};
