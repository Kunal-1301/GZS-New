
/**
 * Basic Auth Guard for the Admin Panel.
 * Checks for a mock session in LocalStorage.
 */
const ProtectedRoute = () => {
    // In a real app, this would check a JWT or context state
    const isAuthenticated = localStorage.getItem('gz_admin_session') === 'active';

    if (!isAuthenticated) {
        // You might want to redirect to /login?redirect=/content-admin
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
