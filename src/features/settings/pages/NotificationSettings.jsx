import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import { SettingsSection, SettingsShell } from '../components/SettingsShell';

const EMAIL_NOTIFICATIONS = [
  { key: 'tournamentUpdates', label: 'Tournament updates', description: 'Bracket changes, registration reminders, and result notices.' },
  { key: 'newFollowers', label: 'New followers', description: 'Get emailed when someone follows your account.' },
  { key: 'skillVerifications', label: 'Skill verifications', description: 'Review outcomes for submitted proof and endorsements.' },
  { key: 'platformNews', label: 'Platform news', description: 'Product updates, launches, and release announcements.' },
];

const IN_APP_NOTIFICATIONS = [
  { key: 'messages', label: 'Messages', description: 'Direct messages and inbox updates.' },
  { key: 'mentions', label: 'Mentions', description: 'When someone tags you in posts or threads.' },
  { key: 'friendRequests', label: 'Friend requests', description: 'Incoming connection requests from other members.' },
  { key: 'achievements', label: 'Achievements', description: 'Milestones, verification badges, and progress unlocks.' },
];

function ToggleRow({ label, description, checked, onChange }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg-alt)] p-4">
      <div className="min-w-0">
        <p className="font-semibold text-[var(--theme-text)]">{label}</p>
        <p className="mt-1 text-sm text-[var(--theme-text-muted)]">{description}</p>
      </div>
      <button
        type="button"
        className={`relative h-7 w-12 rounded-full transition-colors ${checked ? 'bg-[var(--theme-primary)]' : 'bg-slate-300'}`}
        onClick={onChange}
      >
        <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  );
}

export default function NotificationSettings() {
  usePageTheme('profile');

  const [settings, setSettings] = useState({
    tournamentUpdates: true,
    newFollowers: true,
    skillVerifications: true,
    platformNews: false,
    messages: true,
    mentions: true,
    friendRequests: true,
    achievements: false,
    digestFrequency: 'Weekly',
  });

  function toggle(key) {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
  }

  return (
    <>
      <Helmet>
        <title>Notification Settings | GzoneSphere</title>
      </Helmet>
      <SettingsShell
        title="Notification Settings"
        subtitle="Choose how often GzoneSphere contacts you and which events should create alerts."
      >
        <SettingsSection
          title="Email Notifications"
          description="Control which important platform updates should reach your inbox."
        >
          <div className="space-y-4">
            {EMAIL_NOTIFICATIONS.map((item) => (
              <ToggleRow key={item.key} {...item} checked={settings[item.key]} onChange={() => toggle(item.key)} />
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button type="button" className="gzs-btn-primary">Save Changes</button>
          </div>
        </SettingsSection>

        <SettingsSection
          title="In-App Notifications"
          description="Choose which activity should appear in your notification center."
        >
          <div className="space-y-4">
            {IN_APP_NOTIFICATIONS.map((item) => (
              <ToggleRow key={item.key} {...item} checked={settings[item.key]} onChange={() => toggle(item.key)} />
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button type="button" className="gzs-btn-primary">Save Changes</button>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Digest Frequency"
          description="Set how often you want a summary email when individual alerts are not urgent."
        >
          <div className="grid gap-3 md:grid-cols-3">
            {['Daily', 'Weekly', 'Never'].map((option) => (
              <button
                key={option}
                type="button"
                className={`rounded-2xl border px-4 py-4 text-sm font-semibold transition-colors ${
                  settings.digestFrequency === option
                    ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)] text-white'
                    : 'border-[var(--theme-border)] bg-[var(--theme-bg-alt)] text-[var(--theme-text)]'
                }`}
                onClick={() => setSettings((current) => ({ ...current, digestFrequency: option }))}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button type="button" className="gzs-btn-primary">Save Changes</button>
          </div>
        </SettingsSection>
      </SettingsShell>
    </>
  );
}
