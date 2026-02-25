import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Sub-components
import ProfileSettings from './ProfileSettings';
import SecurityPassword from './SecurityPassword';
import PrivacyDefaults from './PrivacyDefaults';
import LinkedAccounts from './LinkedAccounts';
import Subscriptions from './Subscriptions';
import ProfileEsports from './ProfileEsports';

export default function Profile() {
    const [activeTab, setActiveTab] = useState('Profile & Settings');

    const TABS = [
        'Profile & Settings',
        'Security & Password',
        'Privacy & Defaults',
        'Linked Accounts',
        'Subscriptions',
        'Esports Profile'
    ];

    return (
        <div className="min-h-screen flex flex-col bg-pr-bg font-inter w-full overflow-x-hidden">
            <Navbar logoVariant="blue" loginVariant="blue" accent="blue" />

            {/* Top Purple Banner Area */}
            <div className="w-full h-40 md:h-56 bg-pr-primary relative overflow-hidden">
                {/* Subtle pattern or gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-pr-primary-dark to-pr-primary opacity-90" />
            </div>

            <main className="flex-1 w-full container-global px-4 sm:px-6 lg:px-8 xl:px-12 py-8 md:py-12 -mt-20 md:-mt-28 relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12">

                {/* SIDEBAR */}
                <div className="w-full md:w-64 lg:w-72 shrink-0">
                    <div className="flex flex-col items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-pr-border">
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-pr-surface rounded-full border-4 border-white overflow-hidden shadow-md mb-4 flex items-center justify-center -mt-16 bg-gradient-to-br from-pr-primary-light to-pr-primary">
                            <span className="text-4xl font-black text-white">K</span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-black text-pr-text tracking-wider uppercase">
                            KHALI
                        </h2>
                        <p className="text-pr-text-muted text-xs md:text-[10px] uppercase tracking-widest font-bold mt-1 bg-pr-surface px-3 py-1 rounded-full text-pr-primary">
                            GZONESPHERE PLAYER
                        </p>
                    </div>

                    <div className="flex flex-col gap-1 w-full bg-white p-4 rounded-2xl shadow-sm border border-pr-border">
                        {TABS.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-black uppercase tracking-widest transition-colors ${activeTab === tab
                                        ? 'bg-pr-surface text-pr-primary'
                                        : 'text-pr-text-muted hover:bg-gray-50 hover:text-pr-text'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}

                        <button className="w-full text-left px-4 py-3 rounded-lg text-sm font-black uppercase tracking-widest text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors mt-4 border border-transparent hover:border-red-100">
                            Log out
                        </button>
                    </div>
                </div>

                {/* CONTENT AREA */}
                <div className="flex-1 min-w-0 bg-white rounded-2xl shadow-sm border border-pr-border p-6 md:p-8 lg:p-10 mb-12">
                    {activeTab === 'Profile & Settings' && <ProfileSettings />}
                    {activeTab === 'Security & Password' && <SecurityPassword />}
                    {activeTab === 'Privacy & Defaults' && <PrivacyDefaults />}
                    {activeTab === 'Linked Accounts' && <LinkedAccounts />}
                    {activeTab === 'Subscriptions' && <Subscriptions />}
                    {activeTab === 'Esports Profile' && <ProfileEsports />}
                </div>

            </main>

            <Footer variant="light" accent="blue" />
        </div>
    );
}
