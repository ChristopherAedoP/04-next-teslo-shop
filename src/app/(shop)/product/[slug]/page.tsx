/** @format */

import { notFound } from 'next/navigation';

import { initialData } from '@/seed/seed';
import { titleFont } from '@/config/fonts';
import {
	ProductMobileSlideshow,
	ProductSlideshow,
	QuantitySelector,
	SizeSelector,
} from '@/components';
interface Props {
	params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
	const { slug } = await params;

	const product = initialData.products.find((product) => product.slug === slug);
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
