/**
 * Sidebar.tsx
 *
 * @format
 */

'use client';
import { useUIStore } from '@/store';
import clsx from 'clsx';
import Link from 'next/link';
import { getSession, signOut } from 'next-auth/react';
import {
	IoCloseOutline,
	IoLogInOutline,
	IoLogOutOutline,
	IoPeopleOutline,
	IoPersonOutline,
	IoSearchOutline,
	IoShirtOutline,
	IoTicketOutline,
	IoTicketSharp,
} from 'react-icons/io5';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Session } from 'next-auth';

export const Sidebar = () => {
	const router = useRouter();
	const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
	const closeSideMenu = useUIStore((state) => state.closeSideMenu);
	const pathname = usePathname();
	const [session, setSession] = useState<Session | null>(null);

	const isAuthenticated = !!session?.user;
	const isAdmin = session?.user?.role === 'admin';

	const handleLogout = async () => {
		closeSideMenu();
		await signOut({ redirect: false });
		setSession(null);
		router.refresh();
	};

	useEffect(() => {
		getSession().then((s) => setSession(s));
	}, [pathname]);

	return (
		<>
			{isSideMenuOpen && (
				<div
					onClick={closeSideMenu}
					className="fixed inset-0 z-20 bg-black/30 backdrop-blur-sm"
				/>
			)}
			<nav
				className={clsx(
					'fixed top-0 right-0 h-screen z-30 bg-white shadow-2xl p-4 transform transition-transform duration-300',
					'w-full sm:w-64 md:w-80 lg:w-96 xl:w-[600px] 2xl:w-[700px]',
					{
						'translate-x-full': !isSideMenuOpen,
						'translate-x-0': isSideMenuOpen,
					}
				)}>
				<IoCloseOutline
					size={24}
					className="absolute top-4 right-4 cursor-pointer"
					onClick={closeSideMenu}
				/>

				<div className="mt-14 relative">
					<IoSearchOutline
						size={24}
						className="absolute top-1.5 left-2 text-gray-500"
					/>
					<input
						type="text"
						placeholder="Buscar..."
						className="w-full bg-gray-50 rounded pl-9 py-1.5 pr-4 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 text-base"
					/>
				</div>

				<div className="mt-6 space-y-3">
					{isAuthenticated ? (
						<>
							<Link
								href="/profile"
								className="flex items-center p-2 hover:bg-gray-100 rounded-md transition"
								onClick={closeSideMenu}>
								<IoPersonOutline size={24} />
								<span className="ml-3 text-base">Perfil</span>
							</Link>

							<Link
								href="/orders"
								className="flex items-center p-2 hover:bg-gray-100 rounded-md transition"
								onClick={closeSideMenu}>
								<IoTicketOutline size={24} />
								<span className="ml-3 text-base">Órdenes</span>
							</Link>

							<button
								className="flex w-full items-center p-2 hover:bg-gray-100 rounded-md transition"
								onClick={handleLogout}>
								<IoLogOutOutline size={24} />
								<span className="ml-3 text-base">Salir</span>
							</button>
						</>
					) : (
						<Link
							href="/auth/login"
							className="flex items-center p-2 hover:bg-gray-100 rounded-md transition"
							onClick={closeSideMenu}>
							<IoLogInOutline size={24} />
							<span className="ml-3 text-base">Ingresar</span>
						</Link>
					)}

					{isAuthenticated && isAdmin && (
						<>
							<div className="h-px bg-gray-200 my-4" />

							<Link
								href="/admin/products"
								className="flex items-center p-2 hover:bg-gray-100 rounded-md transition"
								onClick={closeSideMenu}>
								<IoShirtOutline size={24} />
								<span className="ml-3 text-base">Productos</span>
							</Link>

							<Link
								href="/admin/orders"
								className="flex items-center p-2 hover:bg-gray-100 rounded-md transition"
								onClick={closeSideMenu}>
								<IoTicketSharp size={24} />
								<span className="ml-3 text-base">Órdenes</span>
							</Link>

							<Link
								href="/admin/users"
								className="flex items-center p-2 hover:bg-gray-100 rounded-md transition"
								onClick={closeSideMenu}>
								<IoPeopleOutline size={24} />
								<span className="ml-3 text-base">Usuarios</span>
							</Link>
						</>
					)}
				</div>
			</nav>
		</>
	);
};
