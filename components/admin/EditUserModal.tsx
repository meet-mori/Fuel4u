import React, { useState } from 'react';
import { User, UserRole } from '../../types';

interface EditUserModalProps {
    user: User;
    onClose: () => void;
    onSave: (userId: string, roles: UserRole[]) => void;
}

const ALL_ROLES: UserRole[] = ['RIDER', 'ADMIN', 'SUPER_ADMIN'];

export const EditUserModal: React.FC<EditUserModalProps> = ({ user, onClose, onSave }) => {
    const [selectedRoles, setSelectedRoles] = useState<UserRole[]>(user.roles);

    const handleRoleChange = (role: UserRole) => {
        setSelectedRoles(prev => 
            prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
        );
    };

    const handleSave = () => {
        onSave(user.id, selectedRoles);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fade-in">
            <div className="bg-brand-secondary rounded-lg shadow-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-4">Edit User Roles</h2>
                <p className="text-gray-300 mb-6">Editing roles for: <span className="font-mono text-brand-primary">{user.email}</span></p>

                <div className="space-y-3 mb-8">
                    {ALL_ROLES.map(role => (
                        <label key={role} className="flex items-center text-white cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedRoles.includes(role)}
                                onChange={() => handleRoleChange(role)}
                                className="h-5 w-5 rounded bg-gray-700 border-gray-600 text-brand-primary focus:ring-brand-primary"
                            />
                            <span className="ml-3">{role}</span>
                        </label>
                    ))}
                </div>

                <div className="flex justify-end gap-4">
                    <button onClick={onClose} className="py-2 px-4 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="py-2 px-4 bg-brand-primary hover:bg-amber-300 text-brand-dark font-semibold rounded-lg">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};
