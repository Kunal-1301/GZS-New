import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { usePageTheme } from '../../context/ThemeContext';

// Sub-components
import ProfileSettings from './ProfileSettings';
import SecurityPassword from './SecurityPassword';
import PrivacyDefaults from './PrivacyDefaults';
import LinkedAccounts from './LinkedAccounts';
import Subscriptions from './Subscriptions';
import ProfileEsports from './ProfileEsports';

export default function Profile() {
    const [activeTab, setActiveTab] = useState('Profile & Settings');
    usePageTheme('profile');

    const TABS = [
        'Profile & Settings',
        'Security & Password',
        'Privacy & Defaults',
        'Linked Accounts',
        'Subscriptions',
        'Esports Profile'
    ];

    return (
        <div className="theme-profile min-h-screen flex flex-col bg-[var(--theme-bg)] font-inter w-full overflow-x-hidden">
            <Navbar />

            {/* Top Purple Banner Area */}
            <div className="w-full h-40 md:h-56 bg-[var(--theme-primary)] relative overflow-hidden">
                {/* Subtle pattern or gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-primary-dark)] to-[var(--theme-primary)] opacity-90" />
            </div>

            <main className="flex-1 w-full container-global px-4 sm:px-6 lg:px-8 xl:px-12 py-8 md:py-12 -mt-20 md:-mt-28 relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12">

                {/* SIDEBAR */}
                <div className="w-full md:w-64 lg:w-72 shrink-0">
                    <div className="flex flex-col items-center mb-8 bg-[var(--theme-card)] p-6 rounded-2xl shadow-sm border border-[var(--theme-border)]">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-[var(--theme-bg-section)] rounded-full border-4 border-[var(--theme-card)] overflow-hidden shadow-md mb-4 flex items-center justify-center -mt-16 bg-gradient-to-br from-[var(--theme-primary-light)] to-[var(--theme-primary)]">
                            <span className="text-4xl font-black text-[var(--theme-text-inverse)]">K</span>
                        </div>
                        <h2 className="gzs-h2 !text-xl md:!text-2xl mt-4">
                            KHALI
                        </h2>
                        <p className="gzs-label !text-[10px] mt-1 bg-[var(--theme-bg-section)] px-3 py-1 rounded-full text-[var(--theme-primary)]">
                            GZONESPHERE PLAYER
                        </p>
                    </div>

                    <div className="flex flex-col gap-1 w-full bg-[var(--theme-card)] p-4 rounded-2xl shadow-sm border border-[var(--theme-border)]">
                        {TABS.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-black uppercase tracking-widest transition-colors ${activeTab === tab
                                    ? 'bg-[var(--theme-bg-section)] text-[var(--theme-primary)]'
                                    : 'text-[var(--theme-text-muted)] hover:bg-[var(--theme-bg-alt)] hover:text-[var(--theme-text)]'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}

                        <button className="gzs-btn-outline w-full !text-[10px] !py-2 justify-center">
                            Log out
                        </button>
                    </div>
                </div>

                {/* CONTENT AREA */}
                <div className="flex-1 min-w-0 bg-[var(--theme-card)] rounded-2xl shadow-sm border border-[var(--theme-border)] p-6 md:p-8 lg:p-10 mb-12">
                    {activeTab === 'Profile & Settings' && <ProfileSettings />}
                    {activeTab === 'Security & Password' && <SecurityPassword />}
                    {activeTab === 'Privacy & Defaults' && <PrivacyDefaults />}
                    {activeTab === 'Linked Accounts' && <LinkedAccounts />}
                    {activeTab === 'Subscriptions' && <Subscriptions />}
                    {activeTab === 'Esports Profile' && <ProfileEsports />}
                </div>

            </main>

            <Footer />
        </div>
    );
}
