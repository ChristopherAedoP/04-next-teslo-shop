import type { Metadata } from "next";

import "./globals.css";
import { geistMono, geistSans } from "@/config/fonts";
import { Providers } from '@/components';


export const metadata: Metadata = {
	title: {
		template: '%s - Chris | Shop',
		default: 'Home - Chris | Shop',
	},
	description: 'Curso next by chris',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang="es">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
