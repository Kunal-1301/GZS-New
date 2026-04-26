import { NavLink } from 'react-router-dom';
import {
  FiBell,
  FiClock,
  FiLink2,
  FiLock,
  FiShield,
  FiUser,
} from 'react-icons/fi';

const SETTINGS_NAV = [
  { label: 'Account', to: '/settings/account', icon: FiUser },
  { label: 'Security', to: '/settings/security', icon: FiLock },
  { label: 'Notifications', to: '/settings/notifications', icon: FiBell },
  { label: 'Privacy', to: '/settings/privacy', icon: FiShield },
  { label: 'Linked Accounts', to: '/settings/linked', icon: FiLink2 },
  { label: 'Trust History', to: '/settings/trust', icon: FiClock },
];

export function SettingsShell({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)]">
      <div className="container-global px-6 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[200px_minmax(0,1fr)]">
          <aside className="gzs-card-elevated h-fit rounded-3xl p-4">
            <p className="px-3 pb-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--theme-text-muted)]">
              Settings
            </p>
            <nav className="space-y-1">
              {SETTINGS_NAV.map(({ label, to, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) => (
                    `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-[var(--theme-primary)] text-white'
                        : 'text-[var(--theme-text-muted)] hover:bg-[var(--theme-bg-alt)] hover:text-[var(--theme-text)]'
                    }`
                  )}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>
          </aside>

          <main className="min-w-0">
            <header className="mb-8">
              <h2 className="text-3xl font-black text-[var(--theme-text)] md:text-4xl">{title}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--theme-text-muted)] md:text-base">
                {subtitle}
              </p>
            </header>
            <div className="space-y-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export function SettingsSection({ title, description, children, danger = false }) {
  return (
    <section className={`gzs-card-elevated rounded-3xl p-6 md:p-8 ${danger ? 'border-red-200 bg-red-50/70' : ''}`}>
      <div className="mb-6">
        <h3 className={`text-xl font-bold ${danger ? 'text-red-700' : 'text-[var(--theme-text)]'}`}>{title}</h3>
        <p className={`mt-2 text-sm leading-7 ${danger ? 'text-red-600/80' : 'text-[var(--theme-text-muted)]'}`}>{description}</p>
      </div>
      {children}
    </section>
  );
}

export function SettingsField({ label, hint, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[var(--theme-text)]">{label}</span>
      {children}
      {hint ? <span className="mt-2 block text-xs text-[var(--theme-text-muted)]">{hint}</span> : null}
    </label>
  );
}
