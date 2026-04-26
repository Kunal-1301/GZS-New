import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';
import PageLoader from '@/shared/components/PageLoader';

/**
 * ProtectedRoute Component
 * ────────────────────────
 * Guards routes based on authentication status and roles.
 * Supports an optional 'adminOnly' prop for specialized access.
 */
const ProtectedRoute = ({ adminOnly = false }) => {
    const { isAuthenticated, isAdmin, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <PageLoader />;
    }

    if (!isAuthenticated) {
        // Redirect to login but save the attempted URL
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (adminOnly && !isAdmin) {
        // Logged in but not an admin - redirect to home or unauthorized page
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;





