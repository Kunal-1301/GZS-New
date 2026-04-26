import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight, FiHome, FiCpu } from 'react-icons/fi';
import React from 'react';

/**
 * Breadcrumb — Nexus Hub Traversal Component
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

const memoizedBreadcrumb = React.memo(function Breadcrumb({ items, className = '' }) {
    const location = useLocation();

    // If custom items provided, use them directly
    const trail = items || buildTrail(location.pathname);

    if (!trail || trail.length <= 1) return null;

    return (
        <nav
            aria-label="Breadcrumb"
            className={`flex items-center gap-4 py-8 px-2 border-b border-[var(--theme-border)]/50 mb-12 ${className}`}
        >
            <div className="flex items-center gap-2 text-[var(--theme-primary)] opacity-40">
                <FiCpu size={14} className="animate-spin-slow" />
                <div className="w-px h-4 bg-[var(--theme-border)]" />
            </div>

            <div className="flex items-center gap-3">
                {trail.map((crumb, i) => {
                    const isLast = i === trail.length - 1;
                    return (
                        <div key={i} className="flex items-center gap-3">
                            {i > 0 && (
                                <span className="text-[var(--theme-text-muted)] opacity-20 font-black italic">/</span>
                            )}
                            
                            {isLast ? (
                                <span className="text-xs font-black uppercase tracking-tight text-[var(--theme-text)] italic opacity-100">
                                    {crumb.label}
                                </span>
                            ) : (
                                <Link
                                    to={crumb.to}
                                    className="text-xs font-black uppercase tracking-tight italic text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] transition-all opacity-40 hover:opacity-100 flex items-center gap-2"
                                >
                                    {i === 0 ? (
                                        <FiHome className="w-3.5 h-3.5" />
                                    ) : null}
                                    {crumb.label}
                                </Link>
                            )}
                        </div>
                    );
                })}
            </div>
        </nav>
    );
}, (prevProps, nextProps) => {
  return (
    prevProps.className === nextProps.className &&
    JSON.stringify(prevProps.items) === JSON.stringify(nextProps.items)
  );
});

function buildTrail(pathname) {
    const segments = pathname.split('/').filter(Boolean);
    const trail = [{ label: 'HUB', to: '/' }];

    let path = '';
    for (const seg of segments) {
        path += `/${seg}`;
        // Skip dynamic segments like IDs (pure numbers or UUIDs)
        const isId = /^[0-9a-f-]+$/i.test(seg) && seg.length > 2;
        const label = isId ? `#${seg.slice(0, 6)}` : (ROUTE_LABELS[seg] || seg.replace(/-/g, ' '));
        trail.push({ label: label.toUpperCase(), to: path });
    }

    return trail;
}

export default memoizedBreadcrumb;







