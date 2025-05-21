/** @format */

import { Title } from '@/components';

import Link from 'next/link';
import { ProductsInCart } from './ui/ProductsInCart';
import { OrderSummary } from './ui/OrderSummary';

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
						<ProductsInCart />
					</div>
					{/* resumen orden */}
					<div className="bg-white rounded-lg shadow-md p-5 mb-5 h-fit">
						<h2 className="text-2xl">Resumen de orden</h2>
						<OrderSummary />

						<div className="mt-5 mb-2 w-full">
							<Link
								href={`/checkout`}
								className="flex btn-primary justify-center">
								Checkout
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
