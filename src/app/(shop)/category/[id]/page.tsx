import { notFound } from "next/navigation";


interface Props {
	params: {
		id: string;
	}
}

export default function CategoryPage({ params }: Props) {
  const { id } = params;
	console.log(id);

	if(id === 'kids') {
		notFound();
	}
  return (
		<div>
			<h1>Hello Page Category</h1>
		</div>
	);
}