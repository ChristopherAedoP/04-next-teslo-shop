/** @format */

'use client';
import { changeUserRole } from '@/actions';
import { User } from '@/interfaces';
import React from 'react';

interface Props {
	users: User[];
}

export const UserTable = ({ users }: Props) => {
	return (
		<table className="min-w-full">
			<thead className="bg-gray-200 border-b">
				<tr>
					<th
						scope="col"
						className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
						Correo electrónico
					</th>
					<th
						scope="col"
						className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
						Nombre
					</th>
					<th
						scope="col"
						className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
						Rol
					</th>
				</tr>
			</thead>
			<tbody>
				{users.map((user) => (
					<tr
						key={user.id}
						className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
						<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							{user.email}
						</td>
						<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
							{user.name}
						</td>
						<td className="text-sm text-gray-900 font-light px-6 ">
							<select
								className="text-sm text-gray-900 w-full p-2"
								value={user.role}
								onChange={(e) => changeUserRole(user.id, e.target.value)}>
								<option value="user">Usuario</option>
								<option value="admin">Administrador</option>
							</select>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
