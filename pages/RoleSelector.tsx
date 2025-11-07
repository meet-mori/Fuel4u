import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { UserRole } from '../types';

export const RoleSelector: React.FC = () => {
    const { user, selectRole } = useAppContext();

    if (!user || user.roles.length <= 1) {
        // This page should not be reachable in this case, but as a fallback:
        return <p>Loading user roles...</p>;
    }
    
    return (
        <div className="bg-brand-secondary p-8 rounded-xl shadow-2xl animate-fade-in w-full max-w-sm">
            <h2 className="text-2xl font-bold text-center text-white mb-2">Select Your Role</h2>
            <p className="text-center text-gray-400 mb-6">You have multiple roles. Please choose one to continue.</p>
            <div className="flex flex-col space-y-4">
                {user.roles.map((role: UserRole) => (
                    <button
                        key={role}
                        onClick={() => selectRole(role)}
                        className="w-full bg-brand-primary text-brand-dark font-bold py-3 px-4 rounded-lg hover:bg-amber-300 transition-all duration-300"
                    >
                        Continue as {role.charAt(0) + role.slice(1).toLowerCase()}
                    </button>
                ))}
            </div>
        </div>
    );
};
