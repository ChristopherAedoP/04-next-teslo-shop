/** @format */

export interface User {
	id: string;
	name: string;
	email: string;
	emailVerified: Date | null;
	password: string;
	role: string;
	image?: string | null;
	createdAt: Date | null;
	updatedAt: Date | null;
	//   address       : string;
	//   Orders        : string;
}
