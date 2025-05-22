/** @format */

import prisma from '@/lib/prisma';
import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcryptjs from 'bcryptjs';
//import { sleep } from '@/utils';

export const authConfig: NextAuthConfig = {
	pages: {
		signIn: '/auth/login',
		newUser: '/auth/new-account',
	},
	providers: [
		Credentials({
			async authorize(credentials) {
				const parsedCredentials = z
					.object({ email: z.string().email(), password: z.string().min(6) })
					.safeParse(credentials);

				//await sleep(2);	 // Simulate a delay for the sake of the example

				if (!parsedCredentials.success) return null;

				const { email, password } = parsedCredentials.data;

				const user = await prisma.user.findFirst({
					where: { email: email.toLowerCase() },
				});

				if (!user) return null;

				const isPasswordValid = bcryptjs.compareSync(password, user.password);

				if (!isPasswordValid) return null;

				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { password: _, ...userWithoutPassword } = user;
				console.log(userWithoutPassword);
				return userWithoutPassword;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.data = user;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user = token.data as any;
			}
			return session;
		},
		// async authorized({ auth, request: { nextUrl } }) {
		// 	console.log('authorized');
		// 	console.log('auth', { auth });
		// 	// const isLoggedIn = !!auth?.user;
		// 	// const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
		// 	// if (isOnDashboard) {
		// 	// 	if (isLoggedIn) return true;
		// 	// 	return false; // Redirect unauthenticated users to login page
		// 	// } else if (isLoggedIn) {
		// 	// 	return Response.redirect(new URL('/dashboard', nextUrl));
		// 	// }
		// 	return true;
		// },
	},
};

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
