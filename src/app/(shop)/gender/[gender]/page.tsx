/** @format */
export const revalidate = 60; // seconds

import { getProductPaginationWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
import { Gender } from '@prisma/client';
import { redirect } from 'next/navigation';

interface Props {
	params: Promise<{ gender: string }>;
	searchParams: Promise<{ page?: string }>;
}

export default async function CategoryPage({ params, searchParams }: Props) {
	const { gender } = await params;

	const { page: pageStr } = await searchParams; //  await antes de usar
	const page = pageStr ? parseInt(pageStr, 10) : 1; // parseInt con radix

	const { products, totalPages = 1 } = await getProductPaginationWithImages({
		page,
		gender: gender as Gender,
	});

	if (products.length === 0) {
		redirect(`/gender/${gender}`);
	}

	const labels: Record<string, string> = {
		men: 'para hombres',
		women: 'para mujeres',
		kid: 'para niños',
		unisex: 'para todos',
	};

	return (
		<>
			<Title
				title="Categoria"
				subtitle={`Articulos ${labels[gender]}`}
				className="mb-2"
			/>

			<ProductGrid products={products} />

			<Pagination totalPages={totalPages} />
		</>
	);
}
