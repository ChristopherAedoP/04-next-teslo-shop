/** @format */
//export const revalidate = 600000;

import { Title } from '@/components';
import AddressForm from './ui/AddressForm';
import { getCountries, getUserAddress } from '@/actions';
import { auth } from '@/auth.config';

export default async function NamePage() {
	const countries = await getCountries();
	const session = await auth();
	if (!session?.user) {
		
		return (
			<h3 className='text-3xl text-center'> 500 - no autenticado </h3>
		);
	}

	const userStoredAddress = await getUserAddress(session.user.id);

	return (
		<div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
			<div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
				<Title title="Dirección" subtitle="Dirección de entrega" />

				<AddressForm
					countries={countries}
					userStoredAddress={userStoredAddress}
				/>
			</div>
		</div>
	);
}
