/** @format */

'use client';
import { authenticate } from '@/actions';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useActionState, useEffect } from 'react';
import { IoWarning } from 'react-icons/io5';

export const LoginForm = () => {
	const router = useRouter();

	const [result, formAction, isPending] = useActionState(
		authenticate,
		undefined
	);

	useEffect(() => {
		if (result === 'success') {
			 router.refresh();
			 router.push('/');  
		}
	}, [result, router]);

	return (
		<form action={formAction} className="flex flex-col">
			<label htmlFor="email">Correo electrónico</label>
			<input
				className="px-5 py-2 border bg-gray-200 rounded mb-5"
				type="email"
				name="email"
			/>

			<label htmlFor="email">Contraseña</label>
			<input
				className="px-5 py-2 border bg-gray-200 rounded mb-5"
				type="password"
				name="password"
			/>
			{result !== undefined && result !== 'success' && (
				<div
					role="alert"
					className="flex items-center gap-2 bg-red-50 border border-red-400 text-red-700 px-4 py-2 rounded mb-5">
					<IoWarning className="h-5 w-5 flex-shrink-0" />
					<span className="text-sm font-medium">{result}</span>
				</div>
			)}
			<button
				className={clsx({
					'btn-primary': !isPending,
					'btn-disabled': isPending,
				})}
				aria-disabled={isPending}>
				Ingresar
			</button>

			{/* divisor l ine */}
			<div className="flex items-center my-5">
				<div className="flex-1 border-t border-gray-500"></div>
				<div className="px-2 text-gray-800">O</div>
				<div className="flex-1 border-t border-gray-500"></div>
			</div>

			<Link href="/auth/new-account" className="btn-secondary text-center">
				Crear una nueva cuenta
			</Link>
		</form>
	);
};
