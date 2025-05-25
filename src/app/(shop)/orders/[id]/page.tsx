/** @format */

import { getOrderById } from '@/actions';
import { OrderStatus, PayPalButton, Title } from '@/components';

import { currencyFormat } from '@/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';

interface Props {
	params: Promise<{ id: string }>;
}
export default async function OrderPage({ params }: Props) {
	const { id } = await params;

	const { ok, order } = await getOrderById(id);

	if (!ok) redirect('/');

	const address = order!.OrderAddress;
	const items = order!.OrderItem;

	return (
		<div className="flex justify-center items-center md-72 px-10 sm:px-0">
			<div className="flex flex-col w-[1000px]">
				<Title title={`Orden #${id.split('-').at(-1)}`} />

				<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
					{/* carrito */}
					<div className="flex flex-col mt-5">
						<OrderStatus isPaid={order?.isPaid || false} />

						{/* items */}
						{items.map((item, index) => (
							<div key={index} className="flex mb-5 ">
								<Image
									src={`/products/${item.product.ProductImage[0].url}`}
									alt={item.product.title}
									width={100}
									height={100}
									style={{
										width: '100px',
										height: '100px',
									}}
									className="mr-5 rounded"
								/>

								<div className="flex flex-col">
									<span>
										({item.size}) - {item.product.title}
									</span>
									<span className="text-sm">
										{currencyFormat(item.price)} x {item.quantity}
									</span>
									<p className="font-bold mt-2">
										{currencyFormat(item.price * item.quantity)}
									</p>
								</div>
							</div>
						))}
					</div>
					{/* resumen orden */}
					<div className="bg-white rounded-lg shadow-md p-5 mb-5">
						<h2 className="text-2xl">Resumen de orden</h2>

						<div className="mb-10">
							<p className="text-xl">
								{address!.firstName} {address!.lastName}
							</p>
							<p>{address!.address}</p>
							<p>{address!.address2}</p>
							<p>{address!.postalCode}</p>
							<p>
								{address!.city}, {address!.countryCode}
							</p>
							<p>{address!.phone}</p>
						</div>
						<div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>
						<h2 className="text-2xl">Resumen de orden</h2>
						<div className="grid grid-cols-2">
							<span>No. Productos</span>
							<span className="text-right">
								{order?.itemsInOrder} articulos
							</span>

							<span>SubTotal</span>
							<span className="text-right">
								{currencyFormat(order!.subTotal)}
							</span>

							<span>Impuestos (19%)</span>
							<span className="text-right">{currencyFormat(order!.tax)}</span>
							<span className="text-2xl mt-5">Total:</span>
							<span className="text-2xl mt-5 text-right">
								{currencyFormat(order!.total)}
							</span>
						</div>

						<div className="mt-5 mb-2 w-full">
							{order?.isPaid ? (
								<OrderStatus isPaid={order?.isPaid || false} />
							) : (
								<PayPalButton orderId={order!.id} amount={order!.total} />
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
