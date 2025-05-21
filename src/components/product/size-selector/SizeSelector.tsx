import { Size } from "@/interfaces";


interface Props {
	selectedSize?: Size;
	availableSizes: Size[];
	onSizeChanged: (size: Size) => void;
}


export const SizeSelector = ({
	selectedSize,
	availableSizes,
	onSizeChanged,
}: Props) => {
	return (
		<div className="my-5">
			<h3 className="font-bold mb-2">Talla disponibles</h3>

			<div className="flex  transition-all">
				{availableSizes.map((size) => (
					<button
						onClick={() => onSizeChanged(size)}
						key={size}
						className={`mx-2 hover:underline text-lg hover:cursor-pointer ${
							selectedSize === size ? 'underline font-semibold' : ''
						}`}>
						{size}
					</button>
				))}
			</div>
		</div>
	);
};
