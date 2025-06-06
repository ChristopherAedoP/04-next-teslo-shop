/** @format */

import { Title } from '@/components';
import Link from 'next/link';
import { ProductsInCart } from './ui/ProductsInCart';
import { PlaceOrder } from './ui/PlaceOrder';



export default function CheckoutPage() {
	return (
		<div className="flex justify-center items-center md-72 px-10 sm:px-0">
			<div className="flex flex-col w-[1000px]">
				<Title title="Verificar Orden" />

				<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
					{/* carrito */}
					<div className="flex flex-col mt-5">
						<Link href={`/cart`} className="underline mb-5">
							Editar carrito
						</Link>

						{/* items */}
						<ProductsInCart />
					</div>
					{/* resumen orden */}
						<PlaceOrder/>
				</div>
			</div>
		</div>
	);
}
