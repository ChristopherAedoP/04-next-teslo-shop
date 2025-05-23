/** @format */

'use server';

import type { Address } from '@/interfaces';
import prisma from '@/lib/prisma';

export const setUserAddress = async (address: Address, userId: string) => {
	try {
		const savedAddress = await createOrReplaceAddress(address, userId);

		return {
			ok: true,
			address: savedAddress,
			message: 'Dirección guardada correctamente',
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: 'Error al guardar la dirección',
		};
	}
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
	try {
		const storeAddress = await prisma.userAddress.findUnique({
			where: {
				userId: userId,
			},
		});

		const addressToSave = {
			userId: userId,
			firstName: address.firstName,
			lastName: address.lastName,
			address: address.address,
			address2: address.address2,
			countryCode: address.country,
			phone: address.phone,
			postalCode: address.postalCode,
			city: address.city,
		};

		if (!storeAddress) {
			const newAddress = await prisma.userAddress.create({
				data: addressToSave,
			});

			return newAddress;
		}

		const updatedAddress = await prisma.userAddress.update({
			where: {
				userId: userId,
			},
			data: addressToSave,
		});

		return updatedAddress;
	} catch (error) {
		console.log(error);
		throw new Error('Error al crear o reemplazar la dirección');
	}
};
