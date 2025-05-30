/** @format */

import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	if (!session) {
		redirect('/auth/login?redirectTo=/admin');
	}
	return <>{children}</>;
}
