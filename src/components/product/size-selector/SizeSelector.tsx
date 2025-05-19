import { Size } from "@/interfaces";


interface Props {
	selectedSize: Size;
	availableSizes: Size[];
}


export const SizeSelector = ({ selectedSize , availableSizes}: Props) => {


	return (
		<div className="my-5">
			<h3 className="font-bold mb-2">Talla disponibles</h3>

			<div className="flex ">
				{availableSizes.map((size) => (
					<div
						key={size}
						className={`mx-2 hover:underline text-lg hover:cursor-pointer ${
							selectedSize === size ? 'underline' : ''
						}`}>
						{size}
					</div>
				))}
			</div>
		</div>
	);
};
