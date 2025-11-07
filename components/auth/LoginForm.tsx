import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { SpinnerIcon, EnvelopeIcon, LockClosedIcon } from '../icons';

export const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAppContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await login(email, password);
        } catch (err: any) {
            setError(err.message || 'Failed to login. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="email-login" className="sr-only">Email address</label>
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        id="email-login"
                        name="email"
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
                 <label htmlFor="password-login" className="sr-only">Password</label>
                 <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <LockClosedIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        id="password-login"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="w-full bg-gray-700 text-white rounded-md border-gray-600 pl-10 p-3 focus:border-brand-primary focus:ring-brand-primary"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                 </div>
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center bg-brand-primary text-brand-dark font-bold py-3 px-4 rounded-lg hover:bg-amber-300 transition-colors duration-300 disabled:bg-gray-500"
            >
                {isLoading ? <SpinnerIcon className="animate-spin h-5 w-5" /> : 'Sign In'}
            </button>
        </form>
    );
};