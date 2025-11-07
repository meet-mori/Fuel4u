import React from 'react';
import { useAppContext } from './contexts/AppContext';
import { AuthPage } from './pages/AuthPage';
import { RiderPage } from './pages/RiderPage';
import { AdminPage } from './pages/AdminPage';
import { SuperAdminPage } from './pages/SuperAdminPage';
import { SpinnerIcon } from './components/icons';
import { RoleSelector } from './pages/RoleSelector';
import { Header } from './components/common/Header';

const App: React.FC = () => {
  const { user, isLoading, selectedRole } = useAppContext();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <SpinnerIcon className="h-10 w-10 animate-spin text-brand-primary" />
        </div>
      );
    }

    if (!user) {
      return <AuthPage />;
    }

    if (user.roles.length > 1 && !selectedRole) {
      return <RoleSelector />;
    }

    const roleToRender = selectedRole || user.roles[0];

    switch (roleToRender) {
      case 'RIDER':
        return <RiderPage />;
      case 'ADMIN':
        return <AdminPage />;
      case 'SUPER_ADMIN':
        return <SuperAdminPage />;
      default:
        return <p>Invalid role selected.</p>;
    }
  };

  return (
    <div className="bg-brand-dark min-h-screen text-white flex flex-col items-center p-4 font-sans">
        {user && <Header />}
        <main className="w-full flex flex-col items-center justify-center flex-grow">
            {renderContent()}
        </main>
    </div>
  );
};

export default App;
