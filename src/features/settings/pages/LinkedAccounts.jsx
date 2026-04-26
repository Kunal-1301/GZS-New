import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiLink, FiTwitter, FiTwitch, FiCheck, FiX, FiRefreshCw, FiChevronLeft, FiGithub, FiYoutube, FiCommand, FiActivity, FiHash, FiArrowRight, FiShield } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/shared/components/Toast';
import { usePageTheme } from '@/app/providers/ThemeProvider';

const ACCOUNTS = [
    {
        id: 'twitter',
        name: 'Twitter / X',
        icon: <FiTwitter size={22} />,
        description: 'Synchronize highlights and transmit domain updates.',
        color: 'var(--theme-primary)',
        connected: false,
        handle: null,
    },
    {
        id: 'discord',
        name: 'Discord Nexus',
        icon: <FiCommand size={22} />,
        description: 'Coordinate with squads and bridge community hubs.',
        color: '#7289da',
        connected: true,
        handle: 'NexusGuard#1337',
    },
    {
        id: 'twitch',
        name: 'Twitch TV',
        icon: <FiTwitch size={22} />,
        description: 'Broadcast live shards and synchronize audience telemetry.',
        color: '#9146ff',
        connected: true,
        handle: 'nexus_lead',
    },
    {
        id: 'github',
        name: 'Github',
        icon: <FiGithub size={22} />,
        description: 'Verify technical proofs and code contributions.',
        color: 'var(--theme-text)',
        connected: false,
        handle: null,
    },
    {
        id: 'youtube',
        name: 'Youtube',
        icon: <FiYoutube size={22} />,
        description: 'Link VOD shards for cinematic portfolio integration.',
        color: 'var(--status-error)',
        connected: false,
        handle: null,
    },
];

export default function LinkedAccounts() {
    usePageTheme('profile');
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [accounts, setAccounts] = useState(ACCOUNTS);

    const handleConnect = (id) => {
        setAccounts(prev => prev.map(a => a.id === id ? { ...a, connected: true, handle: `${a.name.toLowerCase().replace(/\s/g, '_')}_nexus` } : a));
        showToast(`${accounts.find(a => a.id === id)?.name} link established.`, 'success');
    };

    const handleDisconnect = (id) => {
        setAccounts(prev => prev.map(a => a.id === id ? { ...a, connected: false, handle: null } : a));
        showToast('Nexus link terminated.', 'info');
    };

    const handleSync = (name) => {
        showToast(`Syncing telemetry from ${name}...`, 'info');
        setTimeout(() => showToast(`${name} shards synchronized!`, 'success'), 1500);
    };

    return (
        <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] font-body selection:bg-[var(--theme-primary)]/30 pb-32">
            <Helmet><title>External Shards | GzoneSphere</title></Helmet>

            <main className="max-w-4xl mx-auto px-6 pt-32 space-y-20">
                
                {/* ── BREADCRUMB + HEADER ── */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="flex items-center gap-8">
                        <button 
                            onClick={() => navigate('/settings')} 
                            className="w-14 h-14 rounded-2xl bg-[var(--theme-card)] border border-[var(--theme-border)] flex items-center justify-center text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] hover:border-[var(--theme-primary)]/30 transition-all shadow-sm group"
                        >
                            <FiChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <div>
                            <div className="flex items-center gap-4 mb-3 px-4 py-1.5 bg-[var(--theme-primary)]/5 border border-[var(--theme-primary)]/10 rounded-full w-fit">
                                <FiLink className="text-[var(--theme-primary)]" />
                                <span className="text-xs font-black uppercase tracking-widest text-[var(--theme-primary)] italic leading-none">Protocol Nexus v1.0</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter italic leading-[0.85] text-[var(--theme-text)]">External <br/><span className="text-[var(--theme-text-muted)] opacity-20">Shard Links</span></h1>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 gap-8">
                    {accounts.map(acc => (
                        <div key={acc.id} className={`bg-[var(--theme-card)] rounded-full border p-12 transition-all duration-700 overflow-hidden relative group ${acc.connected ? 'border-[var(--theme-primary)]/40 bg-[var(--theme-primary)]/[0.04] shadow-2xl' : 'border-[var(--theme-border)] hover:bg-[var(--theme-bg-alt)] shadow-sm'}`}>
                            
                            {/* Animated Background Artifacts */}
                            {acc.connected && (
                                <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--theme-primary)] opacity-[0.03] blur-[100px] rounded-full group-hover:scale-125 transition-transform duration-1000" />
                            )}

                            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-10 relative z-10">
                                <div className="flex items-center gap-8">
                                    <div className={`w-20 h-20 rounded-2xl bg-[var(--theme-bg-alt)] border-2 border-[var(--theme-border)] flex items-center justify-center transition-all duration-700 group-hover:rotate-12 group-hover:scale-110 shadow-inner overflow-hidden relative ${acc.connected ? 'bg-white/5 border-[var(--theme-primary)] shadow-[var(--theme-primary)]/20 shadow-2xl' : ''}`} style={{ color: acc.color }}>
                                        <div className="relative z-10 scale-[1.5]">{acc.icon}</div>
                                        {acc.connected && (
                                            <div className="absolute inset-0 bg-current opacity-[0.08]" />
                                        )}
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex flex-wrap items-center gap-4">
                                            <h3 className="text-2xl font-black uppercase tracking-tighter italic text-[var(--theme-text)] leading-none">{acc.name}</h3>
                                            {acc.connected && (
                                                <div className="flex items-center gap-3 px-4 py-1.5 bg-[var(--status-success)]/10 text-[var(--status-success)] rounded-full border border-[var(--status-success)]/20 text-xs font-black uppercase tracking-wide italic leading-none">
                                                    <FiCheck size={12} strokeWidth={4} className="animate-pulse" /> SYNCHRONIZED
                                                </div>
                                            )}
                                        </div>
                                        <p className={`text-sm font-medium leading-relaxed italic max-w-lg ${acc.connected ? 'text-[var(--theme-text)]' : 'text-[var(--theme-text-muted)] opacity-50'}`}>
                                            {acc.connected ? (
                                                <span className="flex items-center gap-4">
                                                    <FiHash className="text-[var(--theme-primary)]" />
                                                    {acc.handle}
                                                </span>
                                            ) : acc.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    {acc.connected ? (
                                        <>
                                            <button
                                                onClick={() => handleSync(acc.name)}
                                                className="w-14 h-14 flex items-center justify-center bg-[var(--theme-card)] border border-[var(--theme-border)] text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] hover:border-[var(--theme-primary)]/30 rounded-2xl transition-all shadow-sm group/sync"
                                                title="Re-sync Telemetry"
                                            >
                                                <FiRefreshCw size={22} className="group-hover/sync:rotate-180 transition-transform duration-[1.5s]" />
                                            </button>
                                            <button
                                                onClick={() => handleDisconnect(acc.id)}
                                                className="px-10 py-5 bg-[var(--theme-bg-alt)] text-[var(--status-error)] border border-[var(--theme-border)] rounded-[1.8rem] text-xs font-black uppercase tracking-wider italic hover:bg-[var(--status-error)] hover:text-white hover:border-transparent transition-all shadow-sm active:scale-95"
                                            >
                                                DISCONNECT
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => handleConnect(acc.id)}
                                            className="px-12 py-6 bg-[var(--theme-text)] text-[var(--theme-bg)] hover:bg-[var(--theme-primary)] hover:text-white rounded-2xl text-xs font-black uppercase tracking-widest italic transition-all shadow-3xl hover:scale-105 active:scale-95 shadow-black/10 flex items-center gap-4 group/btn"
                                        >
                                            ESTABLISH LINK <FiArrowRight className="group-hover/btn:translate-x-2 transition-transform" strokeWidth={3} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Technical Protocol Footer */}
                <div className="p-12 bg-[var(--theme-bg-alt)]/50 rounded-[4rem] border-2 border-dashed border-[var(--theme-border)] space-y-8 relative overflow-hidden group">
                    <div className="flex items-center gap-6 relative z-10">
                        <div className="w-14 h-14 bg-[var(--theme-card)] rounded-2xl border border-[var(--theme-border)] flex items-center justify-center text-[var(--status-warning)] shadow-inner">
                            <FiActivity size={28} className="animate-pulse" />
                        </div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-[var(--status-warning)] italic">Synchronicity Protocol v4.2</h4>
                    </div>
                    <p className="text-xs font-black text-[var(--theme-text-muted)] italic leading-relaxed uppercase tracking-wide opacity-40 max-w-3xl relative z-10">
                        Linked shards are utilized for identity verification and cross-domain reputation scoring via GzoneSphere Truth Protocol. Communications are strictly bridge-mediated via high-frequency encrypted OAuth headers.
                    </p>
                    <FiShield size={150} className="absolute bottom-[-50px] right-[-50px] opacity-[0.02] text-[var(--theme-text)] group-hover:scale-125 transition-transform duration-[10s]" />
                </div>
            </main>

        </div>
    );
}








