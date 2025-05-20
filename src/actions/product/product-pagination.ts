/** @format */

'use server';

import prisma from '@/lib/prisma';
import { Gender } from '@prisma/client';

interface PaginationOptions {
	page?: number;
	limit?: number;
	gender?: Gender;
}

export const getProductPaginationWithImages = async ({
	page = 1,
	limit = 12,
	gender,
}: PaginationOptions) => {
	if (isNaN(Number(page))) page = 1;
	if (isNaN(Number(limit))) limit = 12;
	if (page < 1) page = 1;

	try {
		//1. pructos
		const products = await prisma.product.findMany({
			take: limit,
			skip: (page - 1) * limit,
			include: {
				ProductImage: {
					take: 2,
					select: {
						url: true,
					},
				},
			},
			where: {
				gender: gender,
			},
		});
		
		//2. total paginas
		const totalCount = await prisma.product.count({
			where: {
				gender: gender,
			},
		});
		const totalPages = Math.ceil(totalCount / limit);

		return {
			currentPage: page,
			totalPages: totalPages,
			products: products.map((product) => ({
				...product,
				images: product.ProductImage.map((image) => image.url),
			})),
		};
	} catch (error) {
		console.log('Error fetching products:', error);
		throw new Error('Error fetching products');
	}
};
