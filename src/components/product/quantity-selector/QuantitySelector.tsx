'use client'
import React, { useState } from 'react'
import { IoAdd, IoRemoveOutline } from 'react-icons/io5';

interface Props {
     quantity: number;
}

export const QuantitySelector = ({ quantity }: Props) => {
	
    const [count, setCount] = useState(quantity);
    
    const onQuantityChange = (value: number) => {
        if (count + value < 1) return;
        setCount(count + value);    
    }

    return (
			<div className="flex ">
				<button
					onClick={() => onQuantityChange(-1)}
					className="hover:cursor-pointer">
					<IoRemoveOutline size={30} />
				</button>

				<span className="w-15 mx-3 px-5 bg-gray-200/80 text-center rounded">
					{count}
				</span>
				<button
					onClick={() => onQuantityChange(+1)}
					className="hover:cursor-pointer">
					<IoAdd size={30} />
				</button>
			</div>
		);
};
