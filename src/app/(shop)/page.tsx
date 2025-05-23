/** @format */
export const revalidate = 60; // seconds

import { getProductPaginationWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
import { redirect } from 'next/navigation';

interface Props {
	searchParams: Promise<{ page?: string }>;
}



export default async function Home({ searchParams }: Props) {

	const { page: pageStr } = await searchParams; //  await antes de usar
	const page = pageStr ? parseInt(pageStr, 10) : 1; // parseInt con radix

	const { products, totalPages = 1 } = await getProductPaginationWithImages({
		page,
	});

	if (products.length === 0) {
		redirect('/');
	}

	return (
		<div>
			<Title title="Tienda" subtitle="Todos los productos" className="mb-2" />

			<ProductGrid products={products} />

			<Pagination totalPages={totalPages} />
		</div>
	);
}
