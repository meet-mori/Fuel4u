import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { SpinnerIcon, EnvelopeIcon, LockClosedIcon, UserIcon } from '../icons';
import { UserRole } from '../../types';

export const SignupForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<UserRole>('RIDER');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { signup } = useAppContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await signup(email, password, role);
        } catch (err: any) {
            setError(err.message || 'Failed to sign up. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="email-signup" className="sr-only">Email address</label>
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        id="email-signup"
                        type="email"
                        autoComplete="email"
                        required
                        className="w-full bg-gray-700 text-white rounded-md border-gray-600 pl-10 p-3 focus:border-brand-primary focus:ring-brand-primary"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>
            <div>
                 <label htmlFor="password-signup" className="sr-only">Password</label>
                 <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <LockClosedIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        id="password-signup"
                        type="password"
                        autoComplete="new-password"
                        required
                        className="w-full bg-gray-700 text-white rounded-md border-gray-600 pl-10 p-3 focus:border-brand-primary focus:ring-brand-primary"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                 </div>
            </div>
            <div>
                <label htmlFor="role-select" className="sr-only">Role</label>
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                        id="role-select"
                        value={role}
                        onChange={(e) => setRole(e.target.value as UserRole)}
                        className="w-full bg-gray-700 text-white rounded-md border-gray-600 pl-10 p-3 focus:border-brand-primary focus:ring-brand-primary appearance-none"
                    >
                        <option value="RIDER">Rider</option>
                        <option value="ADMIN">Supplier/Admin</option>
                    </select>
                </div>
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center bg-brand-primary text-brand-dark font-bold py-3 px-4 rounded-lg hover:bg-amber-300 transition-colors duration-300 disabled:bg-gray-500"
            >
                {isLoading ? <SpinnerIcon className="animate-spin h-5 w-5" /> : 'Create Account'}
            </button>
        </form>
    );
};
