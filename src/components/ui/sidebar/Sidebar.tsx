/** @format */

'use client';

import { useUIStore } from '@/store';
import clsx from 'clsx';
import Link from 'next/link';

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

export const Sidebar = () => {
	const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
	const closeSideMenu = useUIStore((state) => state.closeSideMenu);
	
	return (
		<div>
			{/* background: black, */}
			{isSideMenuOpen && (
				<div className="fixed top-0 left-0 w-screen z-10 h-screen bg-black/30"></div>
			)}
			{/* bluer */}
			{isSideMenuOpen && (
				<div
					onClick={() => closeSideMenu()}
					className="fade-in fixed top-0 left-0 w-screen h-screen z-15 backdrop-filter backdrop-blur-sm"></div>
			)}
			{/* sidemenu */}

			<nav
				className={clsx(
					'fixed p-5 right-0 top-0 w-[500px] h-screen z-20 bg-white shadow-2xl transform transition-all duration-300',
					{ 'translate-x-full': !isSideMenuOpen }
				)}>
				<IoCloseOutline
					size={50}
					className="absolute top-5 right-5 cursor-pointer"
					onClick={() => {
						closeSideMenu();
					}}
				/>

				<div className="relative mt-14">
					<IoSearchOutline size={20} className="absolute top-2 left-2" />
					<input
						type="text"
						placeholder="Buscar..."
						className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 border-gray-200 focus:outline-none  focus:border-blue-500"
					/>
				</div>

				{/* menu items */}
				<Link
					href={`/`}
					className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded-md transition-all">
					<IoPersonOutline size={30} />
					<span className="ml-3 text-xl">Perfil</span>
				</Link>
				<Link
					href={`/`}
					className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded-md transition-all">
					<IoTicketOutline size={30} />
					<span className="ml-3 text-xl">Ordenes</span>
				</Link>
				<Link
					href={`/`}
					className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded-md transition-all">
					<IoLogInOutline size={30} />
					<span className="ml-3 text-xl">Ingresar</span>
				</Link>
				<Link
					href={`/`}
					className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded-md transition-all">
					<IoLogOutOutline size={30} />
					<span className="ml-3 text-xl">Salir</span>
				</Link>
				{/* separeacion */}
				<div className="w-full h-px bg-gray-200 my-10"></div>

				<Link
					href={`/`}
					className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded-md transition-all">
					<IoShirtOutline size={30} />
					<span className="ml-3 text-xl">Productos</span>
				</Link>
				<Link
					href={`/`}
					className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded-md transition-all">
					<IoTicketSharp size={30} />
					<span className="ml-3 text-xl">Ordenes</span>
				</Link>
				<Link
					href={`/`}
					className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded-md transition-all">
					<IoPeopleOutline size={30} />
					<span className="ml-3 text-xl">Usuarios</span>
				</Link>
			</nav>
		</div>
	);
};
