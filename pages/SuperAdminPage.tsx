import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { fetchAllUsers, updateUserRoles } from '../services/apiService';
import { UserManagementTable } from '../components/admin/UserManagementTable';
import { EditUserModal } from '../components/admin/EditUserModal';
import { SpinnerIcon } from '../components/icons';

export const SuperAdminPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadUsers = async () => {
        setIsLoading(true);
        const fetchedUsers = await fetchAllUsers();
        setUsers(fetchedUsers);
        setIsLoading(false);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
    };

    const handleSaveRoles = async (userId: string, roles: UserRole[]) => {
        await updateUserRoles(userId, roles);
        await loadUsers(); // Refresh user list
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
