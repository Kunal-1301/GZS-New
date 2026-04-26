import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/shared/components/Navbar';
import MobileBottomTabs from '@/shared/components/MobileBottomTabs';
import PageLoader from '@/shared/components/PageLoader';

/**
 * Layout Component
 * ────────────────────────
 * Persistent navbar for all authenticated / platform routes.
 * Mobile bottom tab bar is part of the Navbar component itself.
 */
const Layout = () => {
    return (
        <div className="app-shell">
            <Navbar />
            <main className="app-main has-fixed-nav" role="main">
                <Suspense fallback={<PageLoader />}>
                    <Outlet />
                </Suspense>
            </main>
            <MobileBottomTabs />
        </div>
    );
};

export default Layout;





