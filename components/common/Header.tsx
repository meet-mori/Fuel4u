import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { FuelPumpIcon } from '../icons';
import { UserRole } from '../../types';

export const Header: React.FC = () => {
    const { user, logout, selectedRole, selectRole } = useAppContext();

    if (!user) return null;

    return (
        <header className="w-full max-w-6xl p-4 flex justify-between items-center sticky top-0 bg-brand-dark z-10">
            <div className="flex items-center gap-2">
                <FuelPumpIcon className="h-8 w-8 text-brand-primary" />
                <span className="text-xl font-bold text-white">FuelFast</span>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-gray-300 text-sm hidden sm:block">{user.email}</span>
                {user.roles.length > 1 && (
                    <select
                        value={selectedRole || ''}
                        onChange={(e) => selectRole(e.target.value as UserRole)}
                        className="bg-gray-700 text-white rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    >
                        {user.roles.map(role => <option key={role} value={role}>{role.charAt(0) + role.slice(1).toLowerCase()}</option>)}
                    </select>
                )}
                <button
                    onClick={logout}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};
