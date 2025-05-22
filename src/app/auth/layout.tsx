import { auth } from "@/auth.config";
import { redirect } from "next/navigation";


export default async function LoginLayout({
	children,
}: {
	children: React.ReactNode;
}) {

	const session = await auth();

	if (session?.user) {
		redirect("/"); // Redirect to the home page if the user is already authenticated
	}

	//console.log({session});
	return (
		<main className="flex justify-center">
			<div className="w-full sm:w-[350px] px-10">{children}</div>
		</main>
	);
}