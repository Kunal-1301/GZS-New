import { Link, NavLink } from 'react-router-dom';
import {
  FiBookOpen,
  FiBriefcase,
  FiCode,
  FiEdit3,
  FiFeather,
  FiHeadphones,
  FiImage,
  FiMessageCircle,
  FiShield,
  FiUsers,
} from 'react-icons/fi';
import GzsLogo from '@/shared/components/GzsLogo';

const BRANCH_META = {
  dev: { icon: FiCode, label: 'Dev', color: '#6366F1', unread: false },
  esports: { icon: FiShield, label: 'Esports', color: '#EF4444', unread: true },
  content: { icon: FiImage, label: 'Content', color: '#0EA5E9', unread: false },
  business: { icon: FiBriefcase, label: 'Business', color: '#F59E0B', unread: true },
  art: { icon: FiEdit3, label: 'Art', color: '#EC4899', unread: false },
  writing: { icon: FiFeather, label: 'Writing', color: '#14B8A6', unread: false },
  audio: { icon: FiHeadphones, label: 'Audio', color: '#8B5CF6', unread: true },
  general: { icon: FiUsers, label: 'General', color: '#64748B', unread: false },
  newcomers: { icon: FiBookOpen, label: 'Newcomers', color: '#22C55E', unread: true },
};

export default function BranchNavSidebar({ branches = [] }) {
  return (
    <aside className="hidden min-h-screen w-[240px] shrink-0 border-r border-slate-800 bg-slate-950 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:flex-col">
      <div className="border-b border-slate-800 px-5 py-5">
        <div className="flex items-center gap-3">
          <GzsLogo variant="light" size={28} />
          <div>
            <p className="text-sm font-semibold text-white">Community</p>
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">GzoneSphere</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-4">
        {branches.map((branch) => {
          const meta = BRANCH_META[branch.slug] || BRANCH_META.general;
          const Icon = meta.icon;

          return (
            <NavLink
              key={branch.id}
              to={`/community/${branch.slug}`}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl border px-3 py-3 transition ${
                  isActive
                    ? 'border-slate-700 bg-slate-900 text-white'
                    : 'border-transparent text-slate-300 hover:border-slate-800 hover:bg-slate-900/80 hover:text-white'
                }`
              }
              style={({ isActive }) => (isActive ? { borderLeft: `4px solid ${meta.color}` } : undefined)}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${meta.color}18`, color: meta.color }}
              >
                <Icon />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{meta.label}</div>
                <div className="truncate text-xs text-slate-500">{branch.member_count.toLocaleString()} members</div>
              </div>
              {meta.unread ? <span className="h-2.5 w-2.5 rounded-full bg-indigo-400" /> : null}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <Link
          to="/messages"
          className="flex items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-indigo-500/50 hover:text-white"
        >
          <FiMessageCircle />
          Direct messages
        </Link>
      </div>
    </aside>
  );
}
