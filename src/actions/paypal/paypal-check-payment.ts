/** @format */

'use server';

import { PayPayOrderStatusResponse } from '@/interfaces';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const paypalCheckPayment = async (paypalTransactionId: string) => {
	//console.log('paypalTransactionId', paypalTransactionId);

	const authToken = await getPayPalToken();
	//console.log('authToken', authToken);
	if (!authToken) {
		return {
			ok: false,
			message: 'Error al obtener token de paypal',
		};
	}

	const result = await verifyPayment(paypalTransactionId, authToken);

	if (!result) {
		return {
			ok: false,
			message: 'Error al verificar el pago de paypal',
		};
	}

	const { purchase_units, status } = result;
	//console.log('purchase_units', purchase_units, status);
	const { invoice_id: orderId } = purchase_units[0];

	if (status !== 'COMPLETED') {
		return {
			ok: false,
			message: 'Error al verificar el pago de paypal',
		};
	}

	try {
		await prisma.order.update({
			where: {
				id: orderId,
			},
			data: {
				isPaid: true,
				paidAt: new Date(),
			},
		});

		revalidatePath(`/orders/${orderId}`);
	
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: 'Error al verificar el pago de paypal',
		};
	}

	return result;
};

const getPayPalToken = async (): Promise<string | null> => {
	const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
	const PAYPAL_SECRET_KEY = process.env.PAYPAL_SECRET_KEY;
	const PAYPAL_OAUTH_URL = process.env.PAYPAL_OAUTH_URL ?? '';

	const base64Token = Buffer.from(
		`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET_KEY}`,
		'utf-8'
	).toString('base64');

	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
	myHeaders.append('Authorization', `Basic ${base64Token}`);

	const urlencoded = new URLSearchParams();
	urlencoded.append('grant_type', 'client_credentials');

	const requestOptions: RequestInit = {
		method: 'POST',
		headers: myHeaders,
		body: urlencoded,
		redirect: 'follow',
		cache: 'no-store',
	};

	try {
		const result = await fetch(PAYPAL_OAUTH_URL, requestOptions)
			.then((r) => r.json())
			.catch((error) => console.log('error', error));

		return result.access_token;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const verifyPayment = async (
	paypalTransactionId: string,
	token: string
): Promise<PayPayOrderStatusResponse | null> => {
	const PAYPAL_ORDERS_URL = process.env.PAYPAL_ORDERS_URL ?? '';
	const paypalOrderUrl = `${PAYPAL_ORDERS_URL}/${paypalTransactionId}`;

	const myHeaders = new Headers();
	myHeaders.append('Authorization', `Bearer ${token}`);

	const requestOptions: RequestInit = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow',
		cache: 'no-store',
	};

	try {
		const result = await fetch(paypalOrderUrl, requestOptions)
			.then((r) => r.json())
			.catch((error) => console.log('error', error));

		return result;
	} catch (error) {
		console.log(error);
		return null;
	}
};
