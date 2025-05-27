/** @format */

'use server';

import prisma from '@/lib/prisma';
import { Gender, Product, Size } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL || '');

const ProductFormSchema = z.object({
	id: z.string().uuid().optional().nullable(),
	title: z.string().min(3, 'Title is required').max(255),
	slug: z.string().min(3, 'Title is required').max(255),
	description: z.string(),
	price: z.coerce
		.number()
		.min(0, 'Price must be a positive number')
		.max(999999, 'Price must be less than 1 million')
		.transform((val) => Number(val.toFixed(2))),
	inStock: z.coerce
		.number()
		.min(0, 'Price must be a positive number')
		.max(999999, 'Price must be less than 1 million')
		.transform((val) => Number(val.toFixed(0))),
	categoryId: z.string().uuid(),
	sizes: z.coerce.string().transform((val) => val.split(',')),
	tags: z.string(),
	gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
	const data = Object.fromEntries(formData.entries());
	const parsedData = ProductFormSchema.safeParse(data);

	//console.log('Parsed data:', parsedData);

	if (!parsedData.success) {
		console.log('Validation errors:', parsedData.error.errors);
		return {
			ok: false,
			message: parsedData.error.errors.map((err) => err.message).join(', '),
		};
	}

	const product = parsedData.data;
	product.slug = product.slug.toLowerCase().replace(/\s+/g, '-').trim();
	const { id, ...rest } = product;

	try {
		const prismaTx = await prisma.$transaction(async (tx) => {
			let product: Product;
			const tagsArray = rest.tags
				.split(',')
				.map((tag) => tag.trim().toLowerCase());

			if (id) {
				//actualizar
				product = await tx.product.update({
					where: {
						id: id,
					},
					data: {
						...rest,
						sizes: {
							set: rest.sizes as Size[],
						},
						tags: {
							set: tagsArray,
						},
					},
				});

				//console.log('Product updated:', product);
			} else {
				//crear
				product = await tx.product.create({
					data: {
						...rest,
						sizes: {
							set: rest.sizes as Size[],
						},
						tags: {
							set: tagsArray,
						},
					},
				});

				//console.log('Product created:', product);
			}

			// proceso de guardar imagenes
			if (formData.has('images')) {
				//console.log('Processing images...', formData.getAll('images'));
				const images = await uploadImage(formData.getAll('images') as File[]);
				//console.log('Images uploaded:', images);
				if (!images) {
					throw new Error('Error uploading images');
				}
				await tx.productImage.createMany({
					data: images.map((url) => ({
						url: url,
						productId: product.id,
					})),
				});
			}

			return {
				product: product,
			};
		});

		//console.log('Transaction completed:', prismaTx);

		revalidatePath('/admin/product');
		revalidatePath(`/admin/product/${prismaTx.product.slug}`);
		revalidatePath(`/products/${prismaTx.product.slug}`);

		return {
			ok: true,
			product: prismaTx.product,
		};
	} catch (error) {
		console.error('Error creating/updating product:', error);
		return {
			ok: false,
			message: 'Error creating/updating product',
		};
	}
};

const uploadImage = async (images: File[]) => {
	try {
		const uploadPromises = images.map(async (image) => {
			const buffer = await image.arrayBuffer();
			const base64Image = Buffer.from(buffer).toString('base64');

			return cloudinary.uploader
				.upload(`data:image/png;base64,${base64Image}`, {
					folder: 'products',
					unique_filename: false,
				})
				.then((result) => result.secure_url)
				.catch((error) => {
					console.error('Error uploading image:', error);
					throw new Error('Error uploading image');
				});
		});

		const uploadedUrls = await Promise.all(uploadPromises);
		return uploadedUrls;

	} catch (error) {
		console.log('Error uploading image:', error);
		return null;
	}
};
