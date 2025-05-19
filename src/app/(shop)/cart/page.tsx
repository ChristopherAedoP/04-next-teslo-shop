/** @format */

import { QuantitySelector, Title } from '@/components';
import { initialData } from '@/seed/seed';
import Image from 'next/image';
import Link from 'next/link';

const productsInCart = [
	initialData.products[0],
	initialData.products[3],
	initialData.products[4],
];

export default function CartPage() {
	return (
		<div className="flex justify-center items-center md-72 px-10 sm:px-0">
			<div className="flex flex-col w-[1000px]">
				<Title title="Cart" />

				<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
					{/* carrito */}
					<div className="flex flex-col mt-5">
						<span className="text-xl">Agregar más Items</span>
						<Link href={`/`} className="underline mb-5">
							Continuar comprando
						</Link>

						{/* items */}
						{productsInCart.map((product) => (
							<div key={product.slug} className="flex mb-5 ">
								<Image
									src={`/products/${product.images[0]}`}
									alt={product.title}
									width={100}
									height={100}
                  style={{
                    width: '100px',
                    height: '100px',
                  }}
									className="mr-5 rounded"
								/>

								<div>
									<p>{product.title}</p>
									<p>${product.price}</p>
									<QuantitySelector quantity={2} />

									<button className="underline mt-3">Remover</button>
								</div>
							</div>
						))}
					</div>
					{/* resumen orden */}
					<div className="bg-white rounded-lg shadow-md p-5 mb-3 h-fit">
						<h2 className="text-2xl">Resumen de orden</h2>
						<div className="grid grid-cols-2">
							<span>No. Productos</span>
							<span className="text-right">3 articulos</span>

							<span>SubTotal</span>
							<span className="text-right">$ 100</span>

							<span>Impuestos (195)</span>
							<span className="text-right">$ 119</span>

							<span className="text-2xl mt-5">Total:</span>
							<span className="text-2xl mt-5 text-right">$ 119</span>
						</div>

            <div className='mt-5 mb-2 w-full'>
              <Link href={`/checkout`} className="flex btn-primary justify-center">
                Checkout
              </Link>
            </div>
					</div>
				</div>
			</div>
		</div>
	);
}
