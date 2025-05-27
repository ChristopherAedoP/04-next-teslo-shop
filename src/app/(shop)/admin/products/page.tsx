/** @format */

// https://tailwindcomponents.com/component/hoverable-table
import { getProductPaginationWithImages } from '@/actions';
import { Pagination, ProductImage, Title } from '@/components';

import Link from 'next/link';



import { currencyFormat } from '@/utils';


interface Props {
	searchParams: Promise<{ page?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
	const { page: pageStr } = await searchParams; //  await antes de usar
	const page = pageStr ? parseInt(pageStr, 10) : 1; // parseInt con radix

	const { products, totalPages = 1 } = await getProductPaginationWithImages({
		page,
	});

	return (
		<>
			<Title title="Mantenimiento de productos" />

			<div className="flex justify-end mb-5">
				<Link className="btn-primary" href="/admin/product/new">
					Nuevo Producto
				</Link>
			</div>

			<div className="mb-10">
				<table className="min-w-full">
					<thead className="bg-gray-200 border-b">
						<tr>
							<th
								scope="col"
								className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
								Imagen
							</th>
							<th
								scope="col"
								className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
								Titulo
							</th>
							<th
								scope="col"
								className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
								Precio
							</th>
							<th
								scope="col"
								className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
								Genero
							</th>
							<th
								scope="col"
								className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
								Stock
							</th>
							<th
								scope="col"
								className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
								Talla
							</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr
								key={product.id}
								className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
									<Link href={`/product/${product.slug}`}>
										<ProductImage
											src={product.ProductImage[0]?.url}
											alt={product.title}
											width={80}
											height={80}
											className=" w-20 h-20 object-cover rounded"
										/>
									</Link>
								</td>
								<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
									<Link
										className="hover:underline"
										href={`/admin/product/${product.slug}`}>
										{product.title}
									</Link>
								</td>
								<td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
									{currencyFormat(product.price)}
								</td>
								<td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
									{product.gender}
								</td>
								<td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
									{product.inStock}
								</td>
								<td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
									{product.sizes.join(', ')}
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<Pagination totalPages={totalPages} />
			</div>
		</>
	);
}
