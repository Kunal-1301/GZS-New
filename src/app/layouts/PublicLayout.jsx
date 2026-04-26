import { Outlet } from 'react-router-dom';
import Navbar from '@/shared/components/Navbar';
import Footer from '@/shared/components/Footer';

/**
 * PublicLayout — wraps all public-facing pages.
 * Renders Navbar + page content (Outlet) + Footer.
 * Page themes applied via usePageTheme() inside each page component.
 */
const PublicLayout = () => (
    <div className="app-shell">
        <Navbar />
        <main className="app-main has-fixed-nav" role="main">
            <Outlet />
        </main>
        <Footer />
    </div>
);

export default PublicLayout;





