/** @format */

import { Title } from '@/components';
import { initialData } from '@/seed/seed';
import clsx from 'clsx';
import Image from 'next/image';
import {  IoCardOutline } from 'react-icons/io5';

const productsInCart = [
	initialData.products[0],
	initialData.products[3],
	initialData.products[4],
];

interface Props {
	params: Promise<{ id: string }>;
}
export default async function OrderPage({ params }: Props) {
	const { id } = await params;

	return (
		<div className="flex justify-center items-center md-72 px-10 sm:px-0">
			<div className="flex flex-col w-[1000px]">
				<Title title={`Orden #${id}`} />

				<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
					{/* carrito */}
					<div className="flex flex-col mt-5">
						<div
							className={clsx(
								'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
								{
									'bg-red-400': false,
									'bg-green-500/80': true,
								}
							)}>
							<IoCardOutline size={30} />
							{/* <span className='mx-2'>Pendiente</span> */}
							<span className="mx-2">Pagada</span>
						</div>

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
									<p>${product.price} x 3</p>
									<p className="font-bold">SubTotal: ${product.price * 3}</p>

									<button className="underline mt-3">Remover</button>
								</div>
							</div>
						))}
					</div>
					{/* resumen orden */}
					<div className="bg-white rounded-lg shadow-md p-5">
						<h2 className="text-2xl">Resumen de orden</h2>
						<div className="mb-10">
							<p className="text-xl">Christopher Aedp</p>
							<p>Christopher Aedp</p>
							<p>Christopher Aedp</p>
							<p>Christopher Aedp</p>
							<p>Christopher Aedp</p>
						</div>
						<div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>
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

						<div className="mt-5 mb-2 w-full">
							<div
								className={clsx(
									'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
									{
										'bg-red-400': false,
										'bg-green-500/80': true,
									}
								)}>
								<IoCardOutline size={30} />
								{/* <span className='mx-2'>Pendiente</span> */}
								<span className="mx-2">Pagada</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
