import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/user-auth-store";
import type { UserRole } from "@/types/types";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

export const ProtectedRoute = ({
  allowedRoles,
  redirectTo = "/login",
}: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  const isAuthChecked = useAuthStore((state) => state.isAuthChecked);
  const user = useAuthStore((state) => state.user);

  if (!isAuthChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check role-based access
  if (allowedRoles && allowedRoles.length > 0 && user) {
    const hasAccess = allowedRoles.includes(user.role);

    if (!hasAccess) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Access Denied
            </h1>
            <p className="text-gray-600 mb-6">
              You don't have permission to access this page.
            </p>
            <p className="text-sm text-gray-500">
              Your role: <span className="font-semibold">{user.role}</span>
            </p>
            <button
              onClick={() => window.history.back()}
              className="mt-6 px-6 py-2 bg-light-brown-medium text-white rounded-lg hover:bg-light-brown transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }
  }

  return <Outlet />;
};
