/** @format */

'use client';

import { SessionProvider } from 'next-auth/react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

interface Props {
	children: React.ReactNode;
}

export function Providers({ children }: Props) {
	const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID?? '';
	return (
		<PayPalScriptProvider
			options={{
				clientId: clientId ?? '',
				intent: 'capture',
				currency: 'USD',
			}}>
			<SessionProvider>{children}</SessionProvider>;
		</PayPalScriptProvider>
	);
}
