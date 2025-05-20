/** @format */
export const revalidate = 604800; //7 dias

import { notFound } from 'next/navigation';

import { titleFont } from '@/config/fonts';

import { getProductBySlug } from '@/actions';
import {
	ProductMobileSlideshow,
	ProductSlideshow,
	QuantitySelector,
	SizeSelector,
	StockLabel,
} from '@/components';
import { Metadata } from 'next';

interface Props {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata(
	{ params }: Props
): Promise<Metadata> {
	const slug = (await params).slug;

	const product = await getProductBySlug(slug);

	return {
		title: product?.title,
		description: product?.description,
		openGraph: {
			title: product?.title,
			description: product?.description,
			images: [`/products/${product?.images[2]}`],
		},
	};
}

export default async function ProductPage({ params }: Props) {
	const { slug } = await params;

	//const product = initialData.products.find((product) => product.slug === slug);
	const product = await getProductBySlug(slug);

	if (!product) {
		notFound();
	}

	return (
		<div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
			{/* Slideshow */}
			<div className="col-span-1 md:col-span-2">
				{/* mobile */}
				<ProductMobileSlideshow
					images={product.images}
					title={product.title}
					className="block md:hidden"
				/>

				{/* desktop */}
				<ProductSlideshow
					images={product.images}
					title={product.title}
					className="hidden md:block"
				/>
			</div>

			{/* Detalles */}
			<div className="col-span-1 px-5 ">
				<StockLabel slug={product.slug} />

				<h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
					{product.title}
				</h1>
				<p className="text-lg mb-5">$ {product.price}</p>

				{/* Tallas */}
				<SizeSelector
					selectedSize={product.sizes[2]} // Cambiar por el tamaño seleccionado
					availableSizes={product.sizes}
				/>
				{/* cantiadas */}
				<QuantitySelector quantity={2} />
				{/* botton */}
				<button className="btn-primary my-5 ">Agregar al carrito</button>

				{/* descripcion */}

				<h3 className="font-bold text-sm">Descripción</h3>
				<p className="font-light">{product.description}</p>
			</div>
		</div>
	);
}
