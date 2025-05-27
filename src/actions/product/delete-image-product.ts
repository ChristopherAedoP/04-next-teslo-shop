/** @format */
'use server';
import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
cloudinary.config(process.env.CLOUDINARY_URL || '');

export const deleteImageProduct = async (
	imagenId: number,
	imagenUrl: string
) => {
	if (!imagenUrl.startsWith('https')) {
		return {
			ok: false,
			message: 'La imagen no es una URL válida',
		};
	}

	const imageName = imagenUrl.split('/').pop()?.split('.')[0] ?? '';

	console.log(
		'Deleting image with ID:',
		imagenId,
		'and URL:',
		imagenUrl,
		'name',
		imageName
	);

	try {
		await cloudinary.uploader.destroy(`products/${imageName}`);

		const deletedImage = await prisma.productImage.delete({
			where: {
				id: imagenId,
			},
			select: {
				product: {
					select: {
						slug: true,
					},
				},
			},
		});

		revalidatePath(`/admin/products`);
		revalidatePath(`/admin/product/${deletedImage.product.slug}`);

		revalidatePath(`/product/${deletedImage.product.slug}`);

		return {
			ok: true,
			message: 'Imagen eliminada correctamente',
		};
	} catch (error) {
		console.error('Error deleting image:', error);
		return {
			ok: false,
			message: 'Error al eliminar la imagen',
		};
	}
};
