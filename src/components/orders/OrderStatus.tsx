/** @format */

import clsx from 'clsx';
import React from 'react';
import { IoCardOutline } from 'react-icons/io5';

interface Props {
	isPaid: boolean;
}
export const OrderStatus = ({ isPaid }: Props) => {
	return (
		<div
			className={clsx(
				'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
				{
					'bg-red-400': !isPaid,
					'bg-green-500/80': isPaid,
				}
			)}>
			<IoCardOutline size={30} />
			<span className="mx-2">{isPaid ? 'Pagada ' : 'Pendiente'}</span>
		</div>
	);
};
