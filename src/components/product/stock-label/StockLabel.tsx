/** @format */

'use client';

import { getStockBySlug } from '@/actions';
import { titleFont } from '@/config/fonts';
import { useEffect, useState } from 'react';

interface Props {
	slug: string;
}

export const StockLabel = ({ slug }: Props) => {
	const [stock, setStock] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		getStock();
	});

	const getStock = async () => {
		const inStock = await getStockBySlug(slug);
		//console.log('Stock: ', inStock);
		setStock(inStock);
		setLoading(false);
	};
	//
	return (
		<div className="flex flex-col items-start justify-start transition-all">
			{!loading ? (
				<div className="flex items-center w-full transition-all ">
					<h1
						className={`${titleFont.className} transition-all antialiased font-bold text-lg`}>
						Stock: {stock}
					</h1>
				</div>
			) : (
				<div className="flex items-center w-full animate-pulse transition-all ">
					<h1 className="h-fit bg-gray-200 rounded-full dark:bg-gray-300 w-20">
						&nbsp;
					</h1>
					<h1 className="h-fit ms-2 bg-gray-200 rounded-full dark:bg-gray-300 w-10">
						&nbsp;
					</h1>
				</div>
			)}
		</div>
	);
};
