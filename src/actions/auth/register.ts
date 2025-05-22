'use server'

import prisma from "@/lib/prisma";
import bcryptjs from 'bcryptjs';


export const registerUser = async (name: string, email: string, password: string) => {
	// const { name, email, password } = Object.fromEntries(data.entries())

	try {
		const user = await prisma.user.create({
			data: {
				name: name as string,
				email: email.toLowerCase(),
				password: bcryptjs.hashSync(password),
			},
			select: {
				id: true,
				name: true,
				email: true,
			},
		});

		return {
			success: true,
			message: 'User registered successfully',
			user,
		};
	} catch (error) {
		console.error('Error registering user:', error);
		return {
			success: false,
			message: 'Error registrando usuario',
		};
	}
};