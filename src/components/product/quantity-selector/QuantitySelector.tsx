'use client'

import { IoAdd, IoRemoveOutline } from 'react-icons/io5';

interface Props {
	quantity: number;
	onQuantityChanged: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {

	const onValueChange = (value: number) => {
		if (quantity + value < 1) return;
		onQuantityChanged(quantity + value);
	};

	return (
		<div className="flex ">
			<button
				onClick={() => onValueChange(-1)}
				className="hover:cursor-pointer">
				<IoRemoveOutline size={30} />
			</button>

			<span className="w-15 mx-3 px-5 bg-gray-200/80 text-center rounded">
				{quantity}
			</span>
			<button
				onClick={() => onValueChange(+1)}
				className="hover:cursor-pointer">
				<IoAdd size={30} />
			</button>
		</div>
	);
};
