/** @format */
export const revalidate = 0; // no cache';
// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedUsers } from '@/actions';
import { Title } from '@/components';

import { redirect } from 'next/navigation';
import { UserTable } from './ui/UserTable';


export default async function OrdersPage() {
	const { ok, users = [] } = await getPaginatedUsers();

	if (!ok) {
		redirect('/auth/login?redirectTo=/orders');
	}

	return (
		<>
			<Title title="Mantenimiento de usuarios" />

			<div className="mb-10">
				<UserTable users={users} />
			</div>
		</>
	);
}
