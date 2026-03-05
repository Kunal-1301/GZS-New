import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiChevronDown, HiChevronRight } from 'react-icons/hi';

/* ── Sidebar navigation definition ─────────────────────────
   Uses a tree structure so Esports shows nested sub-items.
   ────────────────────────────────────────────────────────── */
const NAV_TREE = [
    { label: 'DASHBOARD', to: '/content-admin', end: true },
    { label: 'GAMES', to: '/content-admin/game-posts' },
    {
        label: 'ESPORTS',
        to: '/content-admin/esports',
        children: [
            { label: 'Brackets & Matches', to: '/content-admin/esports/brackets' },
            { label: 'Result & Stats', to: '/content-admin/esports/results' },
            { label: 'Sponsorships', to: '/content-admin/esports/sponsors' },
        ],
    },
    { label: 'NEWS & BLOGS', to: '/content-admin/news' },
    {
        label: 'PROFILES',
        to: '/content-admin/profiles',
        children: [
            { label: 'Users & Sub-Profiles', to: '/content-admin/profiles' },
            { label: 'Skill Proof Approvals', to: '/content-admin/profiles/proofs' },
            { label: 'Activity & Posts', to: '/content-admin/profiles/activity' },
        ],
    },
    { label: 'COMMUNITY', to: '/content-admin/community' },
    { label: 'REVIEWS', to: '/content-admin/reviews' },
    { label: 'SETTINGS', to: '/content-admin/settings' },
];

/* ── Single depth nav link ──────────────────────────────── */
function SidebarLink({ to, end, label, sub = false }) {
    return (
        <NavLink
            to={to}
            end={end}
            className={({ isActive }) =>
                `admin-nav-link${isActive ? ' active' : ''}${sub ? ' pl-6 text-xs opacity-80' : ''}`
            }
        >
            {label}
        </NavLink>
    );
}

/* ── Collapsible section ─────────────────────────────────── */
function SidebarGroup({ item }) {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <div className="flex items-center">
                <NavLink
                    to={item.to}
                    className={({ isActive }) => `admin-nav-link flex-1${isActive ? ' active' : ''}`}
                >
                    {item.label}
                </NavLink>
                <button
                    onClick={() => setOpen(o => !o)}
                    className="p-1 text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] transition-colors"
                    aria-label="Toggle submenu"
                >
                    {open ? <HiChevronDown size={14} /> : <HiChevronRight size={14} />}
                </button>
            </div>

            {open && (
                <div className="mt-1 space-y-0.5 border-l border-[var(--theme-border)] ml-3">
                    {item.children.map(child => (
                        <SidebarLink key={child.to} to={child.to} label={child.label} sub />
                    ))}
                </div>
            )}
        </div>
    );
}

/* ── Main Sidebar ─────────────────────────────────────────── */
const ContentAdminSidebar = () => (
    <aside className="admin-sidebar">
        {NAV_TREE.map(item =>
            item.children ? (
                <SidebarGroup key={item.to} item={item} />
            ) : (
                <SidebarLink key={item.to} to={item.to} end={item.end} label={item.label} />
            )
        )}
    </aside>
);

export default ContentAdminSidebar;
