import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import { SettingsField, SettingsSection, SettingsShell } from '../components/SettingsShell';

const OPTIONS = {
  profileVisibility: ['Everyone', 'Connections only', 'Nobody'],
  friendRequests: ['Everyone', 'Mutual connections only', 'Nobody'],
  messages: ['Everyone', 'Connections only', 'Nobody'],
  talentDiscovery: ['Yes', 'No'],
  onlineStatus: ['Yes', 'No'],
};

export default function PrivacyDefaults() {
  usePageTheme('profile');

  const [values, setValues] = useState({
    profileVisibility: 'Everyone',
    friendRequests: 'Mutual connections only',
    messages: 'Connections only',
    talentDiscovery: 'Yes',
    onlineStatus: 'Yes',
  });

  function update(key, value) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  return (
    <>
      <Helmet>
        <title>Privacy Settings | GzoneSphere</title>
      </Helmet>
      <SettingsShell
        title="Privacy Defaults"
        subtitle="Set the default audience and contact rules that shape how others can find and interact with you."
      >
        <SettingsSection
          title="Privacy Rules"
          description="These defaults affect profile visibility, discovery, direct contact, and online presence."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <SettingsField label="Who can see my profile">
              <select className="w-full rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-input)] px-4 py-3" value={values.profileVisibility} onChange={(event) => update('profileVisibility', event.target.value)}>
                {OPTIONS.profileVisibility.map((option) => <option key={option}>{option}</option>)}
              </select>
            </SettingsField>
            <SettingsField label="Who can send me friend requests">
              <select className="w-full rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-input)] px-4 py-3" value={values.friendRequests} onChange={(event) => update('friendRequests', event.target.value)}>
                {OPTIONS.friendRequests.map((option) => <option key={option}>{option}</option>)}
              </select>
            </SettingsField>
            <SettingsField label="Who can message me">
              <select className="w-full rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-input)] px-4 py-3" value={values.messages} onChange={(event) => update('messages', event.target.value)}>
                {OPTIONS.messages.map((option) => <option key={option}>{option}</option>)}
              </select>
            </SettingsField>
            <SettingsField label="Show in talent discovery">
              <select className="w-full rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-input)] px-4 py-3" value={values.talentDiscovery} onChange={(event) => update('talentDiscovery', event.target.value)}>
                {OPTIONS.talentDiscovery.map((option) => <option key={option}>{option}</option>)}
              </select>
            </SettingsField>
            <SettingsField label="Show online status">
              <select className="w-full rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-input)] px-4 py-3" value={values.onlineStatus} onChange={(event) => update('onlineStatus', event.target.value)}>
                {OPTIONS.onlineStatus.map((option) => <option key={option}>{option}</option>)}
              </select>
            </SettingsField>
          </div>
          <div className="mt-6 flex justify-end">
            <button type="button" className="gzs-btn-primary">Save Changes</button>
          </div>
        </SettingsSection>
      </SettingsShell>
    </>
  );
}
