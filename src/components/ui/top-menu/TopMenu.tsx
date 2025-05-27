/** @format */
'use client';
import Link from 'next/link';


import { IoCartOutline, IoSearchOutline } from 'react-icons/io5';
import { useCartStore, useUIStore } from '@/store';
import { useEffect, useState } from 'react';

export const TopMenu = () => {
	const openSideMenu = useUIStore((state) => state.openSideMenu);
	const totalItemsInCart = useCartStore((state) => state.getTotalItems());

	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(true);
	}, []);

	return (
		<nav className="flex px-5 justify-between items-center w-full">
			{/* logo */}

			<div>
				<Link href="/">
					<span className={`antialiased font-bold`}>
						Chris
					</span>
					<span className={`antialiased font-bold`}>
						| Shop
					</span>
				</Link>
			</div>

			{/* menu */}
			<div className="hidden sm:block">
				<Link
					className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
					href="/gender/men">
					Hombres
				</Link>
				<Link
					className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
					href="/gender/women">
					Mujeres
				</Link>
				<Link
					className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
					href="/gender/kid">
					Niños
				</Link>
			</div>

			{/* cart */}
			<div className="flex items-center">
				<Link href="/search" className="mx-2">
					<IoSearchOutline className="w-5 h-5" />
				</Link>
				<Link
					href={totalItemsInCart === 0 && loaded ? '/empty' : '/cart'}
					className="mx-2">
					<div className="relative">
						{loaded && totalItemsInCart > 0 && (
							<span className="fade-in absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white transition-all">
								{totalItemsInCart}
							</span>
						)}
						<IoCartOutline className="w-5 h-5" />
					</div>
				</Link>

				<button
					onClick={() => {
						openSideMenu();
					}}
					className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 ">
					Menu
				</button>
			</div>
		</nav>
	);
};
