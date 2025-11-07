import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import * as api from '../services/apiService';

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
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const currentUser = await api.fetchCurrentUser();
                setUser(currentUser);
            } catch (error) {
                console.error("Failed to fetch user", error);
            } finally {
                setIsLoading(false);
            }
        };
        checkUser();
    }, []);

    const login = async (email: string, password: string) => {
        const loggedInUser = await api.login(email, password);
        setUser(loggedInUser);
        setSelectedRole(null); // Reset role on new login
    };

    const signup = async (email: string, password: string, role: UserRole) => {
        const signedUpUser = await api.signup(email, password, role);
        setUser(signedUpUser);
        setSelectedRole(null);
    };

    const logout = async () => {
        await api.logout();
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
