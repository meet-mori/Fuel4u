import React from 'react';
import { User } from '../../types';

interface UserManagementTableProps {
    users: User[];
    onEditUser: (user: User) => void;
}

export const UserManagementTable: React.FC<UserManagementTableProps> = ({ users, onEditUser }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-300">
                <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                    <tr>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">Roles</th>
                        <th scope="col" className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600">
                            <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{user.email}</td>
                            <td className="px-6 py-4">{user.roles.join(', ')}</td>
                            <td className="px-6 py-4 text-right">
                                <button
                                    onClick={() => onEditUser(user)}
                                    className="font-medium text-brand-primary hover:underline"
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
