import { Navigate } from 'react-router-dom';
import { usePermissions, AppModule } from '@/hooks/usePermissions';

interface ModuleProtectedRouteProps {
  children: React.ReactNode;
  module: AppModule;
}

export function ModuleProtectedRoute({ children, module }: ModuleProtectedRouteProps) {
  const { permissions, isLoading } = usePermissions();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!permissions.includes(module)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
