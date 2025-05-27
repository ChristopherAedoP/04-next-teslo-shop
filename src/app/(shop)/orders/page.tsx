/** @format */
import { getOrderByUser } from '@/actions';
import { Title } from '@/components';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';

export default async function OrdersPage() {
	const { ok, orders = [] } = await getOrderByUser();
	if (!ok) redirect('/auth/login?redirectTo=/orders');

	return (
		<>
			<Title title="Ordenes de compra" />

			{/* ––– VISTA MÓVIL ––– */}
			<div className="md:hidden space-y-4 px-4 mb-4">
				{orders.map((order) => (
					<div key={order.id} className="bg-white rounded-lg shadow-sm p-4">
						<div className="flex justify-between mb-2">
							<span className="font-medium text-gray-600">ID</span>
							<span className="text-gray-900 text-sm break-all">
								{order.id}
							</span>
						</div>
						<div className="flex justify-between mb-2">
							<span className="font-medium text-gray-600">Cliente</span>
							<span className="text-gray-900 text-sm">
								{order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
							</span>
						</div>
						<div className="flex justify-between items-center mb-2">
							<span className="font-medium text-gray-600">Estado</span>
							<div className="flex items-center text-sm">
								<IoCardOutline
									className={order.isPaid ? 'text-green-600' : 'text-red-600'}
								/>
								<span
									className={
										order.isPaid ? 'text-green-600 ml-1' : 'text-red-600 ml-1'
									}>
									{order.isPaid ? 'Pagada' : 'No Pagada'}
								</span>
							</div>
						</div>
						<div className="text-right">
							<Link
								href={`/orders/${order.id}`}
								className="text-blue-600 hover:underline text-sm font-medium">
								Ver orden
							</Link>
						</div>
					</div>
				))}
			</div>

			{/* ––– VISTA TABLET+ ––– */}
			<div className="hidden md:block overflow-x-auto px-4 mb-4">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							{[
								{ label: '#ID', width: 'w-1/3' },
								{ label: 'Nombre completo', width: 'w-1/3' },
								{ label: 'Estado', width: 'w-1/6' },
								{ label: 'Opciones', width: 'w-1/6' },
							].map((col) => (
								<th
									key={col.label}
									scope="col"
									className={`${col.width} px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}>
									{col.label}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{orders.map((order) => (
							<tr key={order.id} className="hover:bg-gray-50 transition-colors">
								<td className="px-6 py-4 text-sm text-gray-900 font-medium break-all">
									{order.id}
								</td>
								<td className="px-6 py-4 text-sm text-gray-700">
									{order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
								</td>
								<td className="px-6 py-4 text-sm">
									<div className="flex items-center">
										<IoCardOutline
											className={
												order.isPaid ? 'text-green-600' : 'text-red-600'
											}
										/>
										<span
											className={
												order.isPaid
													? 'text-green-600 ml-2'
													: 'text-red-600 ml-2'
											}>
											{order.isPaid ? 'Pagada' : 'No Pagada'}
										</span>
									</div>
								</td>
								<td className="px-6 py-4 text-sm">
									<Link
										href={`/orders/${order.id}`}
										className="text-blue-600 hover:underline font-medium">
										Ver orden
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
