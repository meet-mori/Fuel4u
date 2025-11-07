import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, UserRole } from '../types';

// Mock user data that would have been in the API service
const MOCK_USERS: User[] = [
    { id: 'user-1', email: 'rider@example.com', roles: ['RIDER'] },
    { id: 'user-2', email: 'admin@example.com', roles: ['ADMIN'] },
    { id: 'user-3', email: 'superadmin@example.com', roles: ['SUPER_ADMIN'] },
    { id: 'user-4', email: 'multi@example.com', roles: ['RIDER', 'ADMIN'] },
];

interface AppContextType {
    user: User | null;
    isLoading: boolean;
    selectedRole: UserRole | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, role: UserRole) => Promise<void>;
    logout: () => void;
    selectRole: (role: UserRole) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false); // No initial loading needed
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

    const login = async (email: string, password_unused: string) => {
        const foundUser = MOCK_USERS.find(u => u.email === email);
        if (foundUser) {
            setUser(foundUser);
            setSelectedRole(null);
        } else {
            throw new Error('Invalid credentials');
        }
    };

    const signup = async (email: string, password_unused: string, role: UserRole) => {
        if (MOCK_USERS.some(u => u.email === email)) {
            throw new Error('User already exists');
        }
        const newUser: User = { id: `user-${Date.now()}`, email, roles: [role] };
        MOCK_USERS.push(newUser); // Add to our mock in-memory DB
        setUser(newUser);
        setSelectedRole(null);
    };

    const logout = () => { // No longer needs to be async
        setUser(null);
        setSelectedRole(null);
    };
    
    const selectRole = (role: UserRole) => {
        if (user && user.roles.includes(role)) {
            setSelectedRole(role);
        }
    };

    return (
        <AppContext.Provider value={{ user, isLoading, login, logout, signup, selectedRole, selectRole }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
