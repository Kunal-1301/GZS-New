import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { FiSearch, FiEdit2, FiCheck, FiMoreHorizontal, FiZap, FiPlusCircle, FiActivity, FiGlobe, FiShield, FiUser, FiTerminal, FiCpu, FiHash } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, usePageTheme } from '@/app/providers/ThemeProvider';
import ConversationsList from './ConversationsList';

export default function MessagingHub() {
    usePageTheme('profile');
    const { userId } = useParams();
    const navigate = useNavigate();
    const { setThemeVariant } = useTheme();

    useEffect(() => {
        setThemeVariant('profile');
    }, [setThemeVariant]);

    return (
        <div className="bg-[var(--theme-bg)] min-h-screen text-[var(--theme-text)] font-body flex overflow-hidden fixed inset-0 top-[var(--header-height,64px)] selection:bg-[var(--theme-primary)]/30">
            
            {/* Sidebar: Synchronicity Manifest */}
            <aside className={`
                w-full md:w-[450px] lg:w-[480px] bg-[var(--theme-card)] border-r-2 border-[var(--theme-border)] flex flex-col shrink-0 transition-all duration-700 z-30 shadow-2xl relative overflow-hidden
                ${userId ? '-translate-x-full md:translate-x-0 absolute md:relative' : 'translate-x-0'}
            `}>
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--theme-primary)]/5 blur-[100px] rounded-full pointer-events-none -mr-48 -mt-48" />
                
                <header className="p-10 border-b-2 border-dashed border-[var(--theme-border)] space-y-12 bg-[var(--theme-card)]/80 backdrop-blur-3xl sticky top-0 z-10">
                    <div className="flex items-center justify-between">
                        <div className="space-y-6">
                            <div className="flex items-center gap-5">
                                <div className="w-3 h-3 bg-[var(--theme-primary)] rounded-full animate-ping" />
                                <span className="text-sm font-black uppercase tracking-widest text-[var(--theme-primary)] italic leading-none opacity-80">COMMS_CHANNEL_v4</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter italic leading-none text-[var(--theme-text)]">Uplink <span className="text-transparent opacity-20">HUB</span></h1>
                        </div>
                        <button className="group w-20 h-20 bg-[var(--theme-text)] text-[var(--theme-bg)] rounded-3xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-2xl hover:bg-[var(--theme-primary)] hover:text-white border-2 border-white/5 relative overflow-hidden">
                            <FiPlusCircle size={36} strokeWidth={2.5} className="relative z-10 group-hover:rotate-90 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </div>

                    <div className="flex gap-4 p-2 bg-[var(--theme-bg-alt)]/50 backdrop-blur-md rounded-3xl border-2 border-[var(--theme-border)] h-20 shadow-inner">
                        <button className="flex-1 flex items-center justify-center gap-4 bg-[var(--theme-card)] shadow-2xl border-2 border-[var(--theme-border)] rounded-2xl text-xs font-black uppercase tracking-wider italic text-[var(--theme-primary)] hover:scale-102 transition-transform">
                             <FiUser size={18} strokeWidth={3} /> DIRECT_SYNC
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-4 text-[var(--theme-text-muted)] text-xs font-black uppercase tracking-wider italic hover:text-[var(--theme-text)] transition-all opacity-40 hover:opacity-100">
                             <FiActivity size={18} strokeWidth={3} /> GROUP_NODE
                        </button>
                    </div>

                    <div className="relative group">
                        <div className="absolute left-8 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)] group-focus-within:text-[var(--theme-primary)] transition-colors z-10 opacity-40 group-focus-within:opacity-100">
                             <FiSearch size={22} strokeWidth={3} />
                        </div>
                        <input 
                            type="text" 
                            placeholder="TRACE CONVERSATION_SIGNATURE..."
                            className="w-full bg-[var(--theme-bg-alt)]/50 border-2 border-[var(--theme-border)] rounded-2xl pl-20 pr-10 py-6 text-sm font-black uppercase tracking-widest focus:ring-8 focus:ring-[var(--theme-primary)]/5 focus:border-[var(--theme-primary)]/40 outline-none transition-all placeholder:text-[var(--theme-text-muted)] placeholder:opacity-20 shadow-inner italic"
                        />
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto scrollbar-thin bg-transparent relative z-10">
                    <ConversationsList activeId={userId} />
                </div>
                
                <footer className="p-10 border-t-2 border-dashed border-[var(--theme-border)] bg-[var(--theme-bg-alt)]/40 flex items-center justify-between relative z-10 backdrop-blur-xl">
                    <div className="flex items-center gap-6 text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] italic opacity-40 hover:opacity-100 transition-opacity cursor-help group">
                        <FiGlobe size={18} className="group-hover:rotate-180 transition-transform duration-1000" /> ONLINE_STATUS: ACTIVE
                    </div>
                    <div className="flex items-center gap-6 text-xs font-black uppercase tracking-widest text-[var(--status-success)] italic animate-pulse">
                        <FiShield size={18} strokeWidth={3} /> E2E_CRYPTO_LOCK
                    </div>
                </footer>
                
                <FiTerminal size={400} className="absolute bottom-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 opacity-[0.01] text-[var(--theme-text)] pointer-events-none rotate-12" />
            </aside>

            {/* Main Chat Area: The Synergy Deck */}
            <main className="flex-1 flex flex-col bg-[var(--theme-bg)] overflow-hidden relative">
                {userId ? (
                    <Outlet context={{ hideOnMobile: true }} />
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-32 text-center space-y-16 relative overflow-hidden bg-[var(--theme-bg-alt)]/20">
                        {/* Cinematic Backdrop */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--theme-primary)]/5 to-transparent pointer-events-none" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[var(--theme-primary)]/[0.03] rounded-full blur-3xl pointer-events-none animate-pulse" />

                        <div className="relative group/orb">
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                                className="w-80 h-80 border-2 border-dashed border-[var(--theme-primary)]/20 rounded-full flex items-center justify-center group-hover/orb:border-[var(--theme-primary)]/40 transition-colors"
                            >
                                <div className="w-64 h-64 border-2 border-dashed border-[var(--theme-primary)]/10 rounded-full animate-spin-slow" />
                            </motion.div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-48 h-48 bg-[var(--theme-text)] rounded-full border-4 border-white/5 flex items-center justify-center text-[var(--theme-primary)] shadow-2xl group-hover/orb:scale-110 group-hover/orb:rotate-12 transition-all duration-1000 relative overflow-hidden">
                                    <FiZap size={80} className="animate-pulse relative z-10" strokeWidth={2.5} />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--theme-primary)]/20 to-transparent" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8 max-w-lg relative z-10">
                            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter italic text-[var(--theme-text)] leading-[0.8]">ESTABLISH <br/><span className="text-transparent opacity-30">ENCRYPTED_LINK.</span></h2>
                            <div className="h-1 w-24 bg-[var(--theme-primary)] mx-auto rounded-full opacity-40" />
                            <p className="text-sm font-black uppercase text-[var(--theme-text-muted)] tracking-widest leading-relaxed italic opacity-30">CHOOSE_CONVERSATION_NODE FROM_DOMAIN_SIDECAR TO_INITIATE_SYNERGY_SYNC.</p>
                        </div>
                        
                        <div className="flex items-center gap-12 pt-16 opacity-10">
                             <FiCpu size={48} className="animate-spin-slow" />
                             <FiGlobe size={48} className="animate-pulse" />
                             <FiTerminal size={48} className="animate-bounce" />
                        </div>
                        
                        <FiHash size={600} className="absolute bottom-[-100px] right-[-100px] opacity-[0.015] text-[var(--theme-text)] -rotate-12 pointer-events-none" />
                    </div>
                )}
            </main>
        </div>
    );
}








