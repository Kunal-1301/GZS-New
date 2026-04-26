import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import { SettingsField, SettingsSection, SettingsShell } from '../components/SettingsShell';

export default function AccountSettings() {
  usePageTheme('profile');

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [form, setForm] = useState({
    displayName: 'Khali Gaming',
    username: 'khali_gaming',
    email: 'khali@gzonesphere.dev',
    location: 'Mumbai, India',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
    bannerUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200',
    accountType: 'Individual',
  });

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  return (
    <>
      <Helmet>
        <title>Account Settings | GzoneSphere</title>
      </Helmet>
      <SettingsShell
        title="Account Settings"
        subtitle="Update your public profile details, visual identity, and account-level information."
      >
        <SettingsSection
          title="Profile Information"
          description="Control the core identity information shown across your profile and account records."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <SettingsField label="Display Name">
              <input className="w-full rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-input)] px-4 py-3" value={form.displayName} onChange={(event) => updateField('displayName', event.target.value)} />
            </SettingsField>
            <SettingsField label="Username" hint="Last changed 18 days ago">
              <input className="w-full rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-input)] px-4 py-3" value={form.username} onChange={(event) => updateField('username', event.target.value)} />
            </SettingsField>
            <SettingsField label="Email">
              <input className="w-full rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-input)] px-4 py-3" value={form.email} onChange={(event) => updateField('email', event.target.value)} />
            </SettingsField>
            <SettingsField label="Location">
              <input className="w-full rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-input)] px-4 py-3" value={form.location} onChange={(event) => updateField('location', event.target.value)} />
            </SettingsField>
          </div>
          <div className="mt-6 flex justify-end">
            <button type="button" className="gzs-btn-primary">Save Changes</button>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Avatar & Banner"
          description="Provide image URLs for your profile avatar and banner. Real uploads arrive in Phase F."
        >
          <div className="grid gap-5">
            <SettingsField label="Avatar Image URL">
              <input className="w-full rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-input)] px-4 py-3" value={form.avatarUrl} onChange={(event) => updateField('avatarUrl', event.target.value)} />
            </SettingsField>
            <SettingsField label="Banner Image URL">
              <input className="w-full rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-input)] px-4 py-3" value={form.bannerUrl} onChange={(event) => updateField('bannerUrl', event.target.value)} />
            </SettingsField>
          </div>
          <div className="mt-6 flex justify-end">
            <button type="button" className="gzs-btn-primary">Save Changes</button>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Account Type"
          description="Choose whether this account represents an individual or an organisation. This becomes read-only after setup."
        >
          <SettingsField label="Account Type">
            <select className="w-full rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-input)] px-4 py-3" value={form.accountType} disabled>
              <option>Individual</option>
              <option>Organisation</option>
            </select>
          </SettingsField>
          <div className="mt-6 flex justify-end">
            <button type="button" className="gzs-btn-primary">Save Changes</button>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Danger Zone"
          description="Delete your account and permanently remove associated profile data from the platform."
          danger
        >
          <div className="flex flex-col gap-4 rounded-2xl border border-red-200 bg-white p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-semibold text-red-700">Delete Account</p>
              <p className="mt-1 text-sm text-red-600/80">This action is irreversible and requires confirmation.</p>
            </div>
            <button type="button" className="rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white" onClick={() => setShowDeleteConfirm(true)}>
              Delete Account
            </button>
          </div>
        </SettingsSection>
      </SettingsShell>

      {showDeleteConfirm ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-red-700">Confirm account deletion</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Deleting your account will remove profile data, linked settings, and visibility across the ecosystem.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </button>
              <button type="button" className="rounded-2xl bg-red-600 px-4 py-2 text-sm font-semibold text-white" onClick={() => setShowDeleteConfirm(false)}>
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
