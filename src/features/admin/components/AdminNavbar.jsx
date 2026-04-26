import { FiBell, FiChevronDown, FiSearch } from 'react-icons/fi';
import GzsLogo from '@/shared/components/GzsLogo';

const PAGE_TITLES = {
  '/admin': 'Dashboard',
  '/admin/games': 'Games',
  '/admin/games/create': 'Create Game',
  '/admin/blogs': 'Blogs',
  '/admin/blogs/create': 'Create Blog',
  '/admin/tournaments': 'Tournaments',
  '/admin/tournaments/create': 'Create Tournament',
  '/admin/users': 'Users',
  '/admin/verification': 'Skill Verifications',
  '/admin/community': 'Community',
  '/admin/analytics': 'Analytics',
  '/admin/audit-logs': 'Audit Logs',
  '/admin/media': 'Media Library',
  '/admin/settings': 'Settings',
};

function resolvePageTitle(pathname) {
  if (PAGE_TITLES[pathname]) {
    return PAGE_TITLES[pathname];
  }

  if (/^\/admin\/games\/.+\/edit$/.test(pathname)) {
    return 'Edit Game';
  }

  if (/^\/admin\/blogs\/.+\/edit$/.test(pathname)) {
    return 'Edit Blog';
  }

  if (/^\/admin\/tournaments\/.+\/edit$/.test(pathname)) {
    return 'Edit Tournament';
  }

  if (/^\/admin\/users\/.+/.test(pathname)) {
    return 'User Profile';
  }

  return 'Admin Panel';
}

const AdminNavbar = ({ pathname }) => {
  return (
    <header className="admin-navbar">
      <div className="flex min-w-0 items-center gap-3">
        <GzsLogo variant="light" size={28} />
        <p className="admin-navbar-logo hidden sm:block">Admin Control</p>
      </div>

      <h1 className="admin-navbar-title text-center">{resolvePageTitle(pathname)}</h1>

      <div className="admin-navbar-actions">
        <button
          type="button"
          className="hidden h-9 items-center gap-2 rounded-full border border-slate-600 bg-slate-700/60 px-3 text-xs font-semibold text-slate-100 md:inline-flex"
          aria-label="Quick search"
        >
          <FiSearch size={14} />
          Search
        </button>
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-600 bg-slate-700/60 text-slate-100"
          aria-label="Notifications"
        >
          <FiBell size={18} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-400" />
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-slate-600 bg-slate-700/60 px-2 py-1 text-left text-slate-100"
          aria-label="Admin account"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
            AD
          </span>
          <span className="hidden md:block">
            <span className="block text-xs font-semibold leading-tight">Admin User</span>
            <span className="block text-[11px] text-slate-300">Super Admin</span>
          </span>
          <FiChevronDown size={14} className="hidden text-slate-300 md:block" />
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;
