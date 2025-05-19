/** @format */

import { ProductGrid, Title } from '@/components';
import { Category } from '@/interfaces';
import { initialData } from '@/seed/seed';
// import { notFound } from 'next/navigation';

interface Props {
	params: Promise<{ id: Category }>;
}

const seedProducts = initialData.products;

export default  async function CategoryPage({ params }: Props) {
	const { id } = await  params;
	//console.log(id);

	// if(id === 'kids') {
	// 	notFound();
	// }
	
	const labels: Record<Category, string> = {
		'men': 'para hombres',
		'women': 'para mujeres',
		'kid': 'para niños',
		'unisex': 'para todos'
	}

	const products = seedProducts.filter((product) => product.gender === id);

	

	return (
		<>
			<Title title="Categoria" subtitle={`Articulos ${ labels[id]}`} className="mb-2" />

			<ProductGrid products={products} />
		</>
	);
}
