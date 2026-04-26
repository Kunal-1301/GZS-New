import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import { SettingsField, SettingsSection, SettingsShell } from '../components/SettingsShell';

const ACTIVE_SESSIONS = [
  { id: 'session-1', device: 'Chrome on Windows 11', ip: '103.42.18.11', location: 'Mumbai, India', current: true, lastSeen: 'Active now' },
  { id: 'session-2', device: 'Safari on iPhone 15', ip: '103.42.18.11', location: 'Mumbai, India', current: false, lastSeen: '2 hours ago' },
  { id: 'session-3', device: 'Edge on Surface Pro', ip: '182.74.88.204', location: 'Pune, India', current: false, lastSeen: 'Yesterday' },
];

const LOGIN_HISTORY = [
  { id: 'login-1', ip: '103.42.18.11', device: 'Chrome on Windows 11', time: '2026-04-26 10:12 IST', location: 'Mumbai, India' },
  { id: 'login-2', ip: '103.42.18.11', device: 'Safari on iPhone 15', time: '2026-04-25 21:03 IST', location: 'Mumbai, India' },
  { id: 'login-3', ip: '182.74.88.204', device: 'Edge on Surface Pro', time: '2026-04-24 08:18 IST', location: 'Pune, India' },
  { id: 'login-4', ip: '45.113.12.90', device: 'Firefox on Linux', time: '2026-04-23 19:42 IST', location: 'Bengaluru, India' },
];

function getStrengthLabel(score) {
  if (score < 2) return { text: 'Weak', color: 'bg-red-500' };
  if (score < 4) return { text: 'Medium', color: 'bg-amber-500' };
  return { text: 'Strong', color: 'bg-emerald-500' };
}

export default function SecurityPassword() {
  usePageTheme('profile');

  const [form, setForm] = useState({ current: '', next: '', confirm: '' });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessions, setSessions] = useState(ACTIVE_SESSIONS);

  const strengthScore = useMemo(() => {
    let score = 0;
    if (form.next.length >= 8) score += 1;
    if (/[A-Z]/.test(form.next)) score += 1;
    if (/[0-9]/.test(form.next)) score += 1;
    if (/[^A-Za-z0-9]/.test(form.next)) score += 1;
    return score;
  }, [form.next]);

  const strength = getStrengthLabel(strengthScore);

  return (
    <>
      <Helmet>
        <title>Security Settings | GzoneSphere</title>
      </Helmet>
      <SettingsShell
        title="Security & Password"
        subtitle="Manage password hygiene, two-factor authentication, and account access history."
      >
        <SettingsSection
          title="Change Password"
          description="Update your password and review its strength before saving."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <SettingsField label="Current Password">
              <input type="password" className="w-full rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-input)] px-4 py-3" value={form.current} onChange={(event) => setForm((current) => ({ ...current, current: event.target.value }))} />
            </SettingsField>
            <div />
            <SettingsField label="New Password">
              <input type="password" className="w-full rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-input)] px-4 py-3" value={form.next} onChange={(event) => setForm((current) => ({ ...current, next: event.target.value }))} />
            </SettingsField>
            <SettingsField label="Confirm New Password">
              <input type="password" className="w-full rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-input)] px-4 py-3" value={form.confirm} onChange={(event) => setForm((current) => ({ ...current, confirm: event.target.value }))} />
            </SettingsField>
          </div>
          <div className="mt-5 rounded-2xl bg-[var(--theme-bg-alt)] p-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-[var(--theme-text)]">Password strength</span>
              <span className="text-sm text-[var(--theme-text-muted)]">{strength.text}</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
              <div className={`${strength.color} h-full rounded-full transition-all`} style={{ width: `${Math.max(8, strengthScore * 25)}%` }} />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button type="button" className="gzs-btn-primary">Save Changes</button>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Two-Factor Authentication"
          description="Add an extra verification step to strengthen account protection during sign-in."
        >
          <div className="flex flex-col gap-4 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg-alt)] p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-semibold text-[var(--theme-text)]">{twoFactorEnabled ? '2FA is enabled' : '2FA is disabled'}</p>
              <p className="mt-1 text-sm text-[var(--theme-text-muted)]">Setup flow will connect an authenticator app in a later phase. For now this is a mock toggle.</p>
            </div>
            <button
              type="button"
              className={`rounded-full px-4 py-2 text-sm font-semibold ${twoFactorEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'}`}
              onClick={() => setTwoFactorEnabled((value) => !value)}
            >
              {twoFactorEnabled ? 'Disable' : 'Enable'}
            </button>
          </div>
          <div className="mt-6 flex justify-end">
            <button type="button" className="gzs-btn-primary">Save Changes</button>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Active Sessions"
          description="Review devices currently signed in to your account and revoke access when needed."
        >
          <div className="space-y-4">
            {sessions.map((session) => (
              <div key={session.id} className="flex flex-col gap-4 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg-alt)] p-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold text-[var(--theme-text)]">{session.device}</p>
                  <p className="mt-1 text-sm text-[var(--theme-text-muted)]">{session.location} | {session.ip} | {session.lastSeen}</p>
                </div>
                <button
                  type="button"
                  className="rounded-2xl border border-[var(--theme-border)] px-4 py-2 text-sm font-semibold text-[var(--theme-text)]"
                  disabled={session.current}
                  onClick={() => setSessions((current) => current.filter((item) => item.id !== session.id))}
                >
                  {session.current ? 'Current Session' : 'Revoke'}
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button type="button" className="gzs-btn-primary">Save Changes</button>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Login History"
          description="Last 10 sign-in events including IP address, device, time, and location."
        >
          <div className="overflow-hidden rounded-2xl border border-[var(--theme-border)]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--theme-bg-alt)]">
                <tr>
                  <th className="px-4 py-3 font-semibold text-[var(--theme-text-muted)]">IP</th>
                  <th className="px-4 py-3 font-semibold text-[var(--theme-text-muted)]">Device</th>
                  <th className="px-4 py-3 font-semibold text-[var(--theme-text-muted)]">Time</th>
                  <th className="px-4 py-3 font-semibold text-[var(--theme-text-muted)]">Location</th>
                </tr>
              </thead>
              <tbody>
                {LOGIN_HISTORY.map((item) => (
                  <tr key={item.id} className="border-t border-[var(--theme-border)]">
                    <td className="px-4 py-3">{item.ip}</td>
                    <td className="px-4 py-3">{item.device}</td>
                    <td className="px-4 py-3">{item.time}</td>
                    <td className="px-4 py-3">{item.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-end">
            <button type="button" className="gzs-btn-primary">Save Changes</button>
          </div>
        </SettingsSection>
      </SettingsShell>
    </>
  );
}
