import { useState } from 'react';

export default function PrivacyDefaults() {
    const [switches, setSwitches] = useState({
        profileVisibility: true,
        showOnlineStatus: true,
        allowMessages: false,
        showGameLibrary: true,
        receiveNewsletters: false,
        tournamentNotifications: true,
    });

    const toggleSwitch = (key) => setSwitches(s => ({ ...s, [key]: !s[key] }));

    const Switch = ({ label, description, stateKey }) => (
        <div className="flex items-center justify-between p-4 border border-pr-border rounded-xl bg-pr-surface hover:bg-white transition-colors cursor-pointer" onClick={() => toggleSwitch(stateKey)}>
            <div className="mr-6">
                <h4 className="text-sm font-bold uppercase tracking-widest text-pr-text mb-1">{label}</h4>
                <p className="text-[11px] text-pr-text-muted leading-relaxed">{description}</p>
            </div>
            <div className={`relative w-11 h-6 shrink-0 rounded-full transition-colors ${switches[stateKey] ? 'bg-pr-primary' : 'bg-gray-300'}`}>
                <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${switches[stateKey] ? 'translate-x-5' : 'translate-x-0'}`} />
            </div>
        </div>
    );

    return (
        <div className="flex flex-col gap-10 font-inter">
            {/* Privacy Settings Section */}
            <section>
                <h3 className="text-base font-black uppercase tracking-widest text-pr-text mb-6 border-b border-pr-border pb-3">
                    Privacy Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Switch
                        label="Profile Visibility"
                        description="Allow other users and friends to view your GzoneSphere profile page."
                        stateKey="profileVisibility"
                    />
                    <Switch
                        label="Online Status"
                        description="Show when you are currently online and active on the platform."
                        stateKey="showOnlineStatus"
                    />
                    <Switch
                        label="Direct Messages"
                        description="Allow direct messages from people who are not on your friend list."
                        stateKey="allowMessages"
                    />
                    <Switch
                        label="Game Library"
                        description="Make your connected game libraries and statistics public."
                        stateKey="showGameLibrary"
                    />
                </div>
            </section>

            {/* Notifications Section */}
            <section>
                <h3 className="text-base font-black uppercase tracking-widest text-pr-text mb-6 border-b border-pr-border pb-3">
                    Notification Preferences
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Switch
                        label="Newsletters"
                        description="Receive promotional emails and updates about GzoneSphere."
                        stateKey="receiveNewsletters"
                    />
                    <Switch
                        label="Tournaments"
                        description="Get notified about upcoming esports tournaments and bracket updates."
                        stateKey="tournamentNotifications"
                    />
                </div>
            </section>

            {/* Account Deletion */}
            <section className="mt-4 pt-8 border-t border-pr-border">
                <h3 className="text-base font-black uppercase tracking-widest text-red-600 mb-2">
                    Danger Zone
                </h3>
                <p className="text-xs text-pr-text-muted mb-4 max-w-xl">
                    Once you delete your account, there is no going back. Please be certain. All your data, tournament history, and subscriptions will be permanently erased.
                </p>
                <button className="px-6 py-2.5 border border-red-200 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white text-xs font-black uppercase tracking-widest rounded-lg transition-colors">
                    Delete Account
                </button>
            </section>
        </div>
    );
}
