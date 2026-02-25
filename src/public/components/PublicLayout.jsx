import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * PublicLayout — Shared layout wrapper for all public-facing pages.
 * Renders a Navbar on top and Footer at the bottom around the page content.
 *
 * @param {string} navAccent     - Navbar accent color ('yellow'|'green'|'red'|'blue')
 * @param {string} navLogoVariant - Logo color variant ('yellow'|'green'|'red'|'blue'|'white')
 * @param {string} navLoginVariant - Login button color variant
 * @param {boolean} navIsDark    - Whether the navbar background is dark
 * @param {string} footerAccent  - Footer accent color ('yellow'|'green'|'red'|'blue')
 * @param {string} footerVariant - Footer variant ('light'|'dark')
 * @param {React.ReactNode} children - Page content (or use as wrapping layout via Outlet)
 */
function PublicLayout({
    navAccent = 'yellow',
    navLogoVariant,
    navLoginVariant,
    navIsDark = false,
    footerAccent = 'yellow',
    footerVariant = 'light',
    children,
}) {
    return (
        <>
            <Navbar
                accent={navAccent}
                logoVariant={navLogoVariant ?? navAccent}
                loginVariant={navLoginVariant ?? navAccent}
                isDark={navIsDark}
            />
            <main>{children ?? <Outlet />}</main>
            <Footer accent={footerAccent} variant={footerVariant} />
        </>
    );
}

export default PublicLayout;
