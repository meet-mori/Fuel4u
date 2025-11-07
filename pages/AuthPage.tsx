import React, { useState } from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { SignupForm } from '../components/auth/SignupForm';
import { FuelPumpIcon } from '../components/icons';

type AuthView = 'login' | 'signup';

export const AuthPage: React.FC = () => {
    const [view, setView] = useState<AuthView>('login');

    const toggleView = () => {
        setView(current => current === 'login' ? 'signup' : 'login');
    }

    return (
        <div className="w-full max-w-sm mx-auto animate-fade-in">
             <div className="flex flex-col items-center mb-8">
                <FuelPumpIcon className="h-12 w-12 text-brand-primary" />
                <h1 className="text-3xl font-bold text-white mt-2">Welcome to FuelFast</h1>
                <p className="text-gray-400">
                    {view === 'login' ? 'Sign in to continue' : 'Create an account to get started'}
                </p>
            </div>

            <div className="bg-brand-secondary p-8 rounded-xl shadow-2xl">
                {view === 'login' ? <LoginForm /> : <SignupForm />}
                <p className="mt-6 text-center text-sm text-gray-400">
                    {view === 'login' ? "Don't have an account? " : "Already have an account? "}
                    <button onClick={toggleView} className="font-semibold text-brand-primary hover:text-amber-300 focus:outline-none">
                        {view === 'login' ? 'Sign up' : 'Sign in'}
                    </button>
                </p>
            </div>
        </div>
    );
};