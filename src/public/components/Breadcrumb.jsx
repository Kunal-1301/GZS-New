import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight, FiHome } from 'react-icons/fi';

/**
 * Breadcrumb
 * ──────────
 * A reusable breadcrumb navigation component that automatically derives
 * its trail from the current URL, or accepts a custom `items` override.
 *
 * Usage:
 *   <Breadcrumb />                          ← auto from URL
 *   <Breadcrumb items={[ { label: 'Blog', to: '/blog' }, { label: 'Post Title' } ]} />
 */

const ROUTE_LABELS = {
    '': 'Home',
    games: 'Games',
    esports: 'Esports',
    tournaments: 'Tournaments',
    tournament: 'Tournament',
    register: 'Register',
    blog: 'Blog',
    'write-blog': 'Write Blog',
    about: 'About',
    details: 'Details',
    origin: 'Our Story',
    contact: 'Contact',
    profile: 'Profile',
    'profile-setup': 'Profile Setup',
    career: 'Career',
    login: 'Login',
    signup: 'Sign Up',
    'verify-email': 'Verify Email',
    'game-collection': 'Games',
};

export default function Breadcrumb({ items, className = '' }) {
    const location = useLocation();

    // If custom items provided, use them directly
    const trail = items || buildTrail(location.pathname);

    if (!trail || trail.length <= 1) return null;

    return (
        <nav
            aria-label="Breadcrumb"
            className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider py-3 ${className}`}
        >
            {trail.map((crumb, i) => {
                const isLast = i === trail.length - 1;
                return (
                    <span key={i} className="flex items-center gap-1.5">
                        {i > 0 && (
                            <FiChevronRight className="w-3 h-3 text-[var(--theme-text-muted)] opacity-60" />
                        )}
                        {isLast ? (
                            <span className="text-[var(--theme-text)] opacity-70 truncate max-w-[200px]">
                                {crumb.label}
                            </span>
                        ) : (
                            <Link
                                to={crumb.to}
                                className="text-[var(--theme-primary)] hover:underline underline-offset-4 transition-colors"
                            >
                                {i === 0 ? (
                                    <span className="flex items-center gap-1">
                                        <FiHome className="w-3 h-3" />
                                        {crumb.label}
                                    </span>
                                ) : (
                                    crumb.label
                                )}
                            </Link>
                        )}
                    </span>
                );
            })}
        </nav>
    );
}

function buildTrail(pathname) {
    const segments = pathname.split('/').filter(Boolean);
    const trail = [{ label: 'Home', to: '/' }];

    let path = '';
    for (const seg of segments) {
        path += `/${seg}`;
        // Skip dynamic segments like IDs (pure numbers or UUIDs)
        const isId = /^[0-9a-f-]+$/i.test(seg) && seg.length > 2;
        const label = isId ? `#${seg.slice(0, 6)}` : (ROUTE_LABELS[seg] || seg.replace(/-/g, ' '));
        trail.push({ label, to: path });
    }

    return trail;
}
