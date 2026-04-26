import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FiChevronLeft, FiArrowRight, FiCheckCircle, FiClock, 
    FiXCircle, FiTrendingUp, FiShield, FiActivity, FiAlertCircle, FiCpu, FiHash, FiZap, FiTerminal
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const HISTORY = [
    { id: 1, text: 'Gained verified status for "Technical Art Pipeline"', date: '25 Mar 2026', type: 'increase' },
    { id: 2, text: 'Third-party endorsement approved for "Esports Strategy"', date: '22 Mar 2026', type: 'increase' },
    { id: 3, text: 'Platform maintenance update: Trust Protocol v3.2 applied', date: '20 Mar 2026', type: 'system' },
    { id: 4, text: 'Proof submitted for Character Design — pending reviewer approval', date: '15 Mar 2026', type: 'pending' },
    { id: 5, text: 'Profile updated: verified skill count increased to 3', date: '10 Mar 2026', type: 'system' },
];

export default function TrustHistory() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] font-body selection:bg-[var(--theme-primary)]/30 pb-32">
            <Helmet><title>Reputation Ledger | GzoneSphere</title></Helmet>

            {/* Cinematic Background Artifacts */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-15%] right-[-10%] w-[800px] h-[800px] bg-[var(--theme-primary)]/5 blur-[160px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[var(--status-success)]/5 blur-[120px] rounded-full" />
            </div>

            <main className="max-w-[1400px] mx-auto px-8 lg:px-12 py-32 space-y-24 relative z-10">
                
                {/* ── BREADCRUMB + HEADER ── */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16">
                    <div className="space-y-8">
                        <div className="flex items-center gap-6">
                            <button 
                                onClick={() => navigate('/profile')} 
                                className="w-14 h-14 rounded-2xl bg-[var(--theme-card)] border border-[var(--theme-border)] flex items-center justify-center text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] hover:border-[var(--theme-primary)]/30 transition-all shadow-sm group"
                            >
                                <FiChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                            </button>
                            <div className="flex items-center gap-4 px-5 py-2 bg-[var(--status-success)]/5 border border-[var(--status-success)]/20 rounded-full">
                                <div className="w-2 h-2 bg-[var(--status-success)] rounded-full animate-pulse shadow-[0_0_10px_rgba(var(--status-success-rgb),0.8)]" />
                                <span className="text-xs font-black uppercase tracking-widest text-[var(--status-success)] italic leading-none">Global Trust Protocol v1.4.08</span>
                            </div>
                        </div>
                        <h1 className="text-7xl lg:text-9xl font-black uppercase tracking-tighter italic leading-[0.8] text-[var(--theme-text)]">Trust <br/><span className="text-transparent-white opacity-20">HISTORY</span></h1>
                        <p className="text-base font-bold text-[var(--theme-text-muted)] italic leading-relaxed uppercase tracking-tight opacity-50 max-w-2xl">
                            SYNCHRONIZED REPOSITORY OF VERIFIED TECHNICAL PROOFS, INDUSTRY ENDORSEMENTS, AND PLATFORM INTEGRITY TELEMETRY.
                        </p>
                    </div>

                    <div className="p-12 bg-[var(--theme-card)] rounded-[4rem] border border-[var(--theme-border)] shadow-2xl flex items-center gap-12 relative overflow-hidden group">
                        <div className="text-right space-y-2 relative z-10">
                            <p className="text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] opacity-30 italic leading-none">CORE_VERSION</p>
                            <h2 className="text-6xl font-black text-[var(--status-success)] italic leading-none tracking-tighter">v1.4</h2>
                        </div>
                        <div className="h-20 w-px bg-[var(--theme-border)] relative z-10 opacity-50" />
                        <div className="text-right space-y-2 relative z-10">
                            <p className="text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] opacity-30 italic leading-none">REPUTATION_XP</p>
                            <h2 className="text-6xl font-black text-[var(--theme-text)] italic leading-none tracking-tighter">820</h2>
                        </div>
                        <FiCpu className="absolute bottom-[-40px] left-[-40px] w-64 h-64 text-[var(--theme-primary)] opacity-[0.03] rotate-12 group-hover:rotate-45 transition-transform duration-[8s]" />
                    </div>
                </div>

                {/* Tactical Status Clusters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        { label: 'Technical Proofs', value: '3 Verified', color: 'text-[var(--status-success)]', icon: FiCheckCircle, bg: 'bg-[var(--status-success)]/5' },
                        { label: 'Community Shards', value: '820 Rep', color: 'text-[var(--theme-primary)]', icon: FiActivity, bg: 'bg-[var(--theme-primary)]/5' },
                        { label: 'Cipher Sync', value: 'ACTIVE 100%', color: 'text-sky-500', icon: FiShield, bg: 'bg-sky-500/5' },
                    ].map((stat, i) => (
                        <div key={i} className={`p-12 ${stat.bg} rounded-[4rem] border-2 border-[var(--theme-border)] group hover:border-[var(--theme-primary)]/40 transition-all shadow-sm relative overflow-hidden`}>
                            <div className="flex justify-between items-start mb-10 relative z-10">
                                <p className="text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] opacity-30 italic leading-none">{stat.label}</p>
                                <stat.icon className={`${stat.color} opacity-20 group-hover:opacity-100 transition-all group-hover:scale-125 group-hover:rotate-12 duration-700`} size={28} strokeWidth={2.5} />
                            </div>
                            <h3 className={`text-5xl font-black italic tracking-tighter leading-none relative z-10 ${stat.color}`}>{stat.value}</h3>
                            <div className="absolute top-[-50%] right-[-50%] w-64 h-64 border-[var(--theme-border)] border-[1px] rounded-full group-hover:scale-150 transition-transform duration-1000 opacity-20" />
                        </div>
                    ))}
                </div>

                {/* ── CENTRAL LEDGER ── */}
                <div className="bg-[var(--theme-card)] border-2 border-[var(--theme-border)] rounded-full p-12 lg:p-20 shadow-sm relative overflow-hidden group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-20 border-b-2 border-dashed border-[var(--theme-border)] pb-12">
                        <div className="space-y-4">
                            <h3 className="text-4xl font-black uppercase tracking-tighter italic flex items-center gap-6 text-[var(--theme-text)] leading-none">
                                <FiTerminal className="text-[var(--status-success)]" /> REPUTATION LEDGER
                            </h3>
                            <p className="text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] opacity-40 italic leading-none">FORENSIC_PROTOCOL_LOG // ACCESS_PUBLIC</p>
                        </div>
                        <div className="flex items-center gap-5 px-8 py-3 bg-[var(--theme-bg-alt)] border border-[var(--theme-border)] rounded-full text-xs font-black uppercase tracking-widest italic text-[var(--theme-text-muted)] shadow-inner">
                            <FiActivity size={14} className="text-[var(--status-success)] animate-pulse" />
                            CORE_INTEGRITY: OPTIMAL
                        </div>
                    </div>

                    <div className="space-y-6">
                        {HISTORY.map((event, idx) => (
                            <motion.div 
                                key={event.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative group p-12 hover:bg-[var(--theme-bg-alt)] rounded-[4rem] transition-all flex flex-col md:flex-row md:items-center gap-12 border-2 border-transparent hover:border-[var(--theme-border)]/50 shadow-sm hover:shadow-2xl"
                            >
                                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center border-2 z-10 transition-all duration-700 group-hover:rotate-12 group-hover:scale-110 shadow-inner ${
                                    event.type === 'increase' ? 'bg-[var(--status-success)]/10 border-[var(--status-success)]/30 text-[var(--status-success)] shadow-[var(--status-success)]/20 shadow-2xl' : 
                                    event.type === 'pending' ? 'bg-[var(--theme-primary)]/10 border-[var(--theme-primary)]/30 text-[var(--theme-primary)]' :
                                    'bg-[var(--theme-bg-alt)] border-[var(--theme-border)] text-[var(--theme-text-muted)] opacity-30 shadow-none'
                                }`}>
                                    {event.type === 'increase' ? <FiTrendingUp size={32} strokeWidth={3} /> : 
                                     event.type === 'pending' ? <FiClock size={32} strokeWidth={3} /> :
                                     <FiShield size={32} strokeWidth={3} />}
                                </div>
                                
                                <div className="flex-1 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <FiHash className="text-[var(--theme-primary)]" size={14} />
                                            <span className="text-xs font-black text-[var(--theme-text-muted)] opacity-40 uppercase tracking-widest italic leading-none">{event.date}</span>
                                        </div>
                                        <span className={`text-xs font-black uppercase tracking-wider px-6 py-2 rounded-2xl italic leading-none ${
                                            event.type === 'increase' ? 'bg-[var(--status-success)] text-white shadow-xl shadow-[var(--status-success)]/30' : 
                                            event.type === 'pending' ? 'bg-[var(--theme-primary)] text-white shadow-xl shadow-[var(--theme-primary)]/30' : 
                                            'bg-[var(--theme-bg-alt)] border border-[var(--theme-border)] text-[var(--theme-text-muted)] opacity-50'
                                        }`}>
                                            {event.type.toUpperCase()}
                                        </span>
                                    </div>
                                    <h4 className="text-3xl font-black uppercase tracking-tighter group-hover:text-[var(--theme-primary)] transition-colors italic leading-none text-[var(--theme-text)]">
                                        {event.text}
                                    </h4>
                                </div>
                                <FiArrowRight size={32} className="text-[var(--theme-primary)] opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all hidden md:block" strokeWidth={3} />
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-24 pt-12 border-t-2 border-[var(--theme-border)]/50 border-dashed flex flex-col md:flex-row items-center justify-center gap-10">
                        <button 
                            onClick={() => navigate('/profile/how-it-works')}
                            className="w-full md:w-auto px-12 py-8 bg-[var(--theme-card)] border-2 border-[var(--theme-border)] text-[var(--theme-text)] rounded-3xl text-xs font-black uppercase tracking-widest hover:bg-[var(--theme-text)] hover:text-[var(--theme-bg)] hover:border-transparent transition-all active:scale-95 shadow-lg italic"
                        >
                            REVIEW_PROTOCOL_V4
                        </button>
                         <button 
                            onClick={() => navigate('/onboarding/persona')}
                            className="w-full md:w-auto px-12 py-8 bg-[var(--status-success)] text-white rounded-3xl text-xs font-black uppercase tracking-widest hover:bg-black hover:scale-105 transition-all active:scale-95 shadow-2xl shadow-[var(--status-success)]/30 italic flex items-center justify-center gap-6"
                        >
                            ENCODE_NEW_PROOF <FiZap strokeWidth={3} />
                        </button>
                    </div>
                    
                    {/* Decorative Background Icon */}
                    <FiActivity size={300} className="absolute inset-0 m-auto opacity-[0.01] text-[var(--theme-text)] pointer-events-none" />
                </div>
            </main>

        </div>
    );
}








