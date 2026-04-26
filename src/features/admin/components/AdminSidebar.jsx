import { NavLink } from 'react-router-dom';
import {
  FiBarChart2,
  FiBookOpen,
  FiCheckCircle,
  FiCodepen,
  FiAward,
  FiFilm,
  FiFlag,
  FiGrid,
  FiImage,
  FiMessageSquare,
  FiSettings,
  FiShield,
  FiUsers,
} from 'react-icons/fi';
import GzsLogo from '@/shared/components/GzsLogo';

const NAV_SECTIONS = [
  {
    heading: 'Overview',
    items: [{ label: 'Dashboard', to: '/admin', icon: FiGrid, end: true }],
  },
  {
    heading: 'Content',
    items: [
      { label: 'Games', to: '/admin/games', icon: FiCodepen },
      { label: 'Blogs', to: '/admin/blogs', icon: FiBookOpen },
      { label: 'Media Library', to: '/admin/media', icon: FiImage },
    ],
  },
  {
    heading: 'Competitions',
    items: [{ label: 'Tournaments', to: '/admin/tournaments', icon: FiAward }],
  },
  {
    heading: 'Users',
    items: [
      { label: 'Users', to: '/admin/users', icon: FiUsers },
      { label: 'Skill Verifications', to: '/admin/verification', icon: FiCheckCircle },
    ],
  },
  {
    heading: 'Platform',
    items: [
      { label: 'Community', to: '/admin/community', icon: FiMessageSquare },
      { label: 'Analytics', to: '/admin/analytics', icon: FiBarChart2 },
      { label: 'Audit Logs', to: '/admin/audit-logs', icon: FiShield },
      { label: 'Settings', to: '/admin/settings', icon: FiSettings },
    ],
  },
];

const AdminSidebar = () => (
  <aside className="admin-sidebar">
    <div className="mb-6 flex items-center gap-3 px-3">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
        <GzsLogo variant="light" size={26} showText={false} />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-black text-white">Admin Panel</p>
        <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">GzoneSphere</p>
      </div>
    </div>

    <div className="flex-1 space-y-5 overflow-y-auto pr-1">
      {NAV_SECTIONS.map((section) => (
        <div key={section.heading}>
          <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
            {section.heading}
          </p>
          <div className="space-y-1">
            {section.items.map(({ label, to, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={16} />
                <span className="truncate">{label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      ))}
    </div>

    <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
          <FiFilm size={16} />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-white">Moderation Pulse</p>
          <p className="text-[11px] text-slate-400">12 items need review today</p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-300">
        <FiFlag size={12} className="text-amber-300" />
        Stable, with pending approvals queued.
      </div>
    </div>
  </aside>
);

export default AdminSidebar;
