/** @format */

'use client';

import { login, registerUser } from '@/actions';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoWarning } from 'react-icons/io5';

type FormInputs = {
	name: string;
	email: string;
	password: string;
};

export const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormInputs>();

	const [errorMessage, setErrorMessage] = useState('');

	const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
		setErrorMessage('');
		const { name, email, password } = data;
		const resp = await registerUser(name, email, password);

		if (!resp.success) {
			setErrorMessage(resp.message);
		}

		await login(email.toLowerCase(), password);

		window.location.replace('/'); // Redirect to the home page after successful login
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
			<label htmlFor="email">Nombre completo</label>
			<input
				className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
					'border-red-500': errors.name, // Add your error condition here
				})}
				type="text"
				autoFocus
				{...register('name', { required: true })} // Registering the input with react-hook-form
			/>

			<label htmlFor="email">Correo electrónico</label>
			<input
				className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
					'border-red-500': errors.email, // Add your error condition here
				})}
				type="email"
				{...register('email', {
					required: true,
					pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				})} // Registering the input with react-hook-form
			/>

			<label htmlFor="password">Contraseña</label>
			<input
				className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
					'border-red-500': errors.password, // Add your error condition here
				})}
				type="password"
				{...register('password', { required: true, minLength: 6 })} // Registering the input with react-hook-form
			/>

			{errorMessage !== '' && errorMessage !== 'success' && (
				<div
					role="alert"
					className="flex items-center gap-2 bg-red-50 border border-red-400 text-red-700 px-4 py-2 rounded mb-5">
					<IoWarning className="h-5 w-5 flex-shrink-0" />
					<span className="text-sm font-medium">{errorMessage}</span>
				</div>
			)}

			<button className="btn-primary">Crear cuenta</button>

			{/* divisor l ine */}
			<div className="flex items-center my-5">
				<div className="flex-1 border-t border-gray-500"></div>
				<div className="px-2 text-gray-800">O</div>
				<div className="flex-1 border-t border-gray-500"></div>
			</div>

			<Link href="/auth/login" className="btn-secondary text-center">
				Ingresar
			</Link>
		</form>
	);
};
