/** @format */

import { auth } from '@/auth.config';
import { Title } from '@/components';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
	const session = await auth();

	if (!session?.user) {
		// redirect("/auth/login?redirectTo=/profile");
		redirect('/');
	}
	const {user} = session;
	return (
		<div>
			<Title title="Perfil" />

			{/* <pre>{JSON.stringify(session.user, null, 2)}</pre>

			<h3 className="text-3xl mb-10">{session.user.role}</h3> */}

			<div className="bg-gray-200 rounded-xl font-sans h-[600px] w-full flex flex-row justify-center items-center mb-4">
				<div className="card w-96 mx-auto bg-white shadow-xl hover:shadow rounded">
					{/* {avatar ? (
						<img
							className="w-32 mx-auto rounded-full -mt-20 border-8 border-white"
							src={avatar}
							alt={`Avatar de ${name}`}
						/> */}
					{/* ) : ( */}
					<div className="w-32 h-32 mx-auto rounded-full -mt-20 border-8 border-white bg-gray-300 flex justify-center items-center">
						<span className="text-white text-3xl font-extrabold">
							{user.name!.substring(0, 2)}
						</span>
					</div>
					{/* )} */}

					<div className="text-center mt-2 text-3xl font-medium">
						{user.name}
					</div>
					<div className="text-center mt-2 font-light text-sm">
						{user.email}
					</div>
					<div className="text-center font-normal text-lg">
						<p>{user.role}</p>
					</div>
					<div className="px-6 text-center mt-2 font-light text-sm">
						{user.emailVerified ? 'Email verificado' : 'Email no verificado'}
					</div>
					<hr className="mt-8" />
					<div className="flex p-4">
						<div className="w-1/2 text-center">
							<span className="font-bold">1.8 k</span> Followers
						</div>
						<div className="w-0 border border-gray-300"></div>
						<div className="w-1/2 text-center">
							<span className="font-bold">2.0 k</span> Following
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
