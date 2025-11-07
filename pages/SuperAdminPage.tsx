import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { UserManagementTable } from '../components/admin/UserManagementTable';
import { EditUserModal } from '../components/admin/EditUserModal';
import { SpinnerIcon } from '../components/icons';

// Mock data now lives inside the component
const MOCK_USERS: User[] = [
    { id: 'user-1', email: 'rider@example.com', roles: ['RIDER'] },
    { id: 'user-2', email: 'admin@example.com', roles: ['ADMIN'] },
    { id: 'user-3', email: 'superadmin@example.com', roles: ['SUPER_ADMIN'] },
    { id: 'user-4', email: 'multi@example.com', roles: ['RIDER', 'ADMIN'] },
];

export const SuperAdminPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>(MOCK_USERS);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // No data fetching needed, just stop loading
        setIsLoading(false);
    }, []);

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
    };

    const handleSaveRoles = (userId: string, roles: UserRole[]) => {
        // Update local state directly instead of an API call
        setUsers(prevUsers => 
            prevUsers.map(u => u.id === userId ? { ...u, roles } : u)
        );
        handleCloseModal();
    };

    if (isLoading) {
        return <SpinnerIcon className="h-8 w-8 animate-spin text-brand-primary" />;
    }

    return (
        <div className="w-full max-w-4xl p-4 animate-fade-in">
            <h1 className="text-3xl font-bold text-white mb-6">User Management</h1>
            <div className="bg-brand-secondary p-6 rounded-xl">
                <UserManagementTable users={users} onEditUser={handleEditUser} />
            </div>
            {selectedUser && (
                <EditUserModal 
                    user={selectedUser}
                    onClose={handleCloseModal}
                    onSave={handleSaveRoles}
                />
            )}
        </div>
    );
};
