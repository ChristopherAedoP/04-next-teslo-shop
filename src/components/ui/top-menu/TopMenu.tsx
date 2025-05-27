/** @format */

'use client';
import Link from 'next/link';
import { titleFont } from '@/config/fonts';
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5';
import { useCartStore, useUIStore } from '@/store';
import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export const TopMenu = () => {
	const openSideMenu = useUIStore((s) => s.openSideMenu);
	const totalItemsInCart = useCartStore((s) => s.getTotalItems());
	const [loaded, setLoaded] = useState(false);

	// Animation controls
	const controls = useAnimation();

	// Trigger bounce when count cambia
	useEffect(() => {
		if (!loaded) return;
		if (totalItemsInCart > 0) {
			controls.start({
				scale: [1, 1.3, 1],
				transition: { duration: 0.4, ease: 'easeInOut' },
			});
		}
	}, [totalItemsInCart, loaded, controls]);

	useEffect(() => {
		setLoaded(true);
	}, []);

	return (
		<nav className="flex px-5 justify-between items-center w-full">
			{/* Logo */}
			<div>
				<Link href="/">
					<span className={`${titleFont.className} antialiased font-bold`}>
						Chris
					</span>
					<span className={`${titleFont.className} antialiased font-bold`}>
						| Shop
					</span>
				</Link>
			</div>

			{/* Links de género */}
			<div className="hidden sm:block">
				{['men', 'women', 'kid'].map((g) => (
					<Link
						key={g}
						className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
						href={`/gender/${g}`}>
						{g === 'men' ? 'Hombres' : g === 'women' ? 'Mujeres' : 'Niños'}
					</Link>
				))}
			</div>

			{/* Buscador + Carrito + Menu */}
			<div className="flex items-center">
				<Link href="/search" className="mx-2">
					<IoSearchOutline className="w-5 h-5" />
				</Link>

				<Link
					href={loaded && totalItemsInCart === 0 ? '/empty' : '/cart'}
					className="mx-2">
					{/* Aquí envolvemos en motion.div */}
					<motion.div
						animate={controls}
						initial={{ scale: 1 }}
						className="relative inline-block">
						{/* Badge */}
						{loaded && totalItemsInCart > 0 && (
							<motion.span
								key={totalItemsInCart}
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ type: 'spring', stiffness: 300, damping: 20 }}
								className="
    absolute -top-1 -right-1 
    bg-blue-700 text-white 
    w-4 h-4 
    text-[0.625rem] 
    rounded-full 
    flex items-center justify-center 
    font-bold
  ">
								{totalItemsInCart}
							</motion.span>
						)}

						{/* Icono */}
						<IoCartOutline className="w-5 h-5" />
					</motion.div>
				</Link>

				<button
					onClick={openSideMenu}
					className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
					Menu
				</button>
			</div>
		</nav>
	);
};
