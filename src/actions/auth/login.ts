/** @format */

'use server';

import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';

// ...

export async function authenticate(
	prevState: string | undefined,
	formData: FormData
) {
	try {
		console.log('FormData:', formData);
		await signIn('credentials', {
			...Object.fromEntries(formData),
			redirect: false,
		});

		return 'success';
	} catch (error) {
		console.log('Error during signIn:', error);
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return 'Invalid credentials.';
				default:
					return 'Something went wrong.';
			}
		}
		return 'Error';
	}
}

export const login = async(email: string, password: string) => {
			
	try {
		await signIn('credentials', {
			email: email,
			password: password,
			redirect: false,
		});

		return { ok: 'success' };
	} catch (error) {
		console.log('Error during signIn:', error);
		// if (error instanceof AuthError) {
		// 	switch (error.type) {
		// 		case 'CredentialsSignin':
		// 			return { ok: 'Invalid credentials.' };
		// 		default:
		// 			return { ok: 'Something went wrong.' };
		// 	}
		// }
		return { ok: 'error' };
	}
}