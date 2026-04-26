import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiBell, FiClock, FiLink2, FiLock, FiShield, FiUser } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import { SettingsShell } from '../components/SettingsShell';

export default function SettingsHome() {
  usePageTheme('profile');
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Account',
      description: 'Profile identity, avatar, banner, and account type settings.',
      icon: FiUser,
      to: '/settings/account',
    },
    {
      title: 'Security',
      description: 'Passwords, 2FA, active sessions, and sign-in history.',
      icon: FiLock,
      to: '/settings/security',
    },
    {
      title: 'Notifications',
      description: 'Email and in-app alerts plus digest preferences.',
      icon: FiBell,
      to: '/settings/notifications',
    },
    {
      title: 'Privacy',
      description: 'Visibility rules for profile, messages, and discovery.',
      icon: FiShield,
      to: '/settings/privacy',
    },
    {
      title: 'Linked Accounts',
      description: 'Manage external services connected to your GzoneSphere account.',
      icon: FiLink2,
      to: '/settings/linked',
    },
    {
      title: 'Trust History',
      description: 'Review verification activity and reputation timeline.',
      icon: FiClock,
      to: '/settings/trust',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Settings | GzoneSphere</title>
      </Helmet>
      <SettingsShell
        title="Settings"
        subtitle="Manage your account, security, alerts, and privacy defaults from one shared control hub."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map(({ title, description, icon: Icon, to }) => (
            <div key={to} className="gzs-card-elevated rounded-3xl p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]">
                <Icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-[var(--theme-text)]">{title}</h3>
              <p className="mt-3 min-h-16 text-sm leading-7 text-[var(--theme-text-muted)]">{description}</p>
              <button
                type="button"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--theme-primary)]"
                onClick={() => navigate(to)}
              >
                Manage
                <FiArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </SettingsShell>
    </>
  );
}
