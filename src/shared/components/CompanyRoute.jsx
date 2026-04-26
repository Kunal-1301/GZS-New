import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthProvider';

/**
 * CompanyRoute
 * ─────────────────────────────────────────────────────────
 * Route guard for company-only zones (/company/*).
 * Per spec: "Company routes redirect standard user accounts to /home
 * with no error — they simply never see the company section."
 *
 * isCompany is derived from user.role === 'company'.
 * For dev/dummy sessions, add role: 'company' to dummyLogin() userData
 * to test company flows.
 */
const CompanyRoute = () => {
    const { user } = useAuth();

    // Derive company status from JWT role field
    const isCompany = user?.role === 'company' || user?.accountType === 'company';

    if (!isCompany) {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
};

export default CompanyRoute;





