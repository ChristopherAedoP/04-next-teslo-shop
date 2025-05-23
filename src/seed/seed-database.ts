/** @format */

import { initialData } from './seed';
import prisma from '../lib/prisma';
import { seedCountries } from './seed-countries';

async function main() {
	console.log('Sembrando base datos.....');

	// 1. Borrar registros previos
	// await Promise.all( [
	await prisma.country.deleteMany();
	await prisma.userAddress.deleteMany();
	await prisma.user.deleteMany();
	await prisma.productImage.deleteMany();
	await prisma.product.deleteMany();
	await prisma.category.deleteMany();
	// ]);

	const { categories, products, users } = initialData;
	//1. users
	await prisma.user.createMany({
		data: users,
	});

	//2. categorias
	const categoriesData = categories.map((category) => ({
		name: category,
	}));

	await prisma.category.createMany({
		data: categoriesData,
	});

	const categoriesDB = await prisma.category.findMany();

	const categoriesMap = categoriesDB.reduce((map, category) => {
		map[category.name.toLowerCase()] = category.id; //<string=shirts, string=categoryId>
		return map;
	}, {} as Record<string, string>); //<string=shirts, string=categoryId>

	//console.log(categoriesMap);
	//3. productos

	products.forEach(async (product) => {
		const { type, images, ...rest } = product;

		const dbProduct = await prisma.product.create({
			data: {
				...rest,
				categoryId: categoriesMap[type],
			},
		});

		// Images
		const imagesData = images.map((image) => ({
			url: image,
			productId: dbProduct.id,
		}));

		await prisma.productImage.createMany({
			data: imagesData,
		});
	});

	//4. Country
	const newConuntries = seedCountries.map((country) => ({
		id: country.id,
		name: country.name,
		code: country.id,
	}));


	await prisma.country.createMany({
		data: newConuntries,
	});


	console.log('Ejecutado con éxito');
}

(() => {
	if (process.env.NODE_ENV === 'production') return;

	main();
})();
