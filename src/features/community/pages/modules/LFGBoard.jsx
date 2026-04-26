import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    FiUsers, FiUser, FiAward, FiPlus, FiSearch, FiFilter,
    FiBriefcase, FiCheckCircle, FiGrid, FiEdit3, FiMusic, FiCode, FiSmartphone, FiX,
    FiActivity, FiTarget, FiTerminal, FiHash, FiClock, FiGlobe, FiZap, FiArrowRight
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommunity } from '@/services/mutators/useCommunity';

const BRANCH_ICONS = {
    dev: FiCode,
    esports: FiActivity,
    art: FiEdit3,
    writing: FiTerminal,
    audio: FiMusic,
    business: FiBriefcase,
    content: FiSmartphone,
};

const STATUS_COLORS = {
    open: 'bg-[var(--status-success)]/5 text-[var(--status-success)] border-[var(--status-success)]/20 shadow-[0_0_10px_rgba(var(--status-success-rgb),0.1)]',
    filled: 'bg-[var(--theme-bg-alt)] text-[var(--theme-text-muted)] border-[var(--theme-border)] opacity-50',
    closed: 'bg-[var(--status-error)]/5 text-[var(--status-error)] border-[var(--status-error)]/20 opacity-50',
};

export default function LFGBoard() {
    const { branch: branchParam } = useParams();
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState(branchParam || 'all');
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const { useBranches, useLFGPosts } = useCommunity();
    const { data: branches = [] } = useBranches();
    // If activeFilter is 'all', we pass null to get all posts (mockApiService handles this if branchSlug is falsy)
    const { data: posts = [], isLoading } = useLFGPosts(activeFilter === 'all' ? null : activeFilter);

    const filtered = posts.filter(p => {
        const matchesSearch = !search ||
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            (p.description && p.description.toLowerCase().includes(search.toLowerCase()));
        return matchesSearch;
    });

    return (
        <div className="flex-1 p-10 lg:p-20 space-y-24 bg-[var(--theme-bg)] relative overflow-hidden selection:bg-[var(--theme-primary)]/30">
            
            {/* Cinematic Background Artifacts */}
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[var(--theme-primary)]/5 blur-[120px] rounded-full pointer-events-none" />

            {/* ── HEADER ── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 relative z-10 border-b-2 border-dashed border-[var(--theme-border)]/50 pb-16">
                <div className="space-y-6">
                    <div className="flex items-center gap-5">
                        <FiTarget className="text-[var(--theme-primary)] animate-pulse shadow-xl" size={24} />
                        <span className="text-sm font-black uppercase tracking-widest text-[var(--theme-text-muted)] italic opacity-30">MISSION_CONTROL_V4.08</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic text-[var(--theme-text)] leading-[0.85]">
                        BOUNTY <br/> <span className="opacity-10">BOARDS</span>
                    </h1>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative group w-full sm:w-auto">
                        <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)] group-focus-within:text-[var(--theme-primary)] transition-colors" />
                        <input
                            type="text"
                            placeholder="SEARCH_OPERATIONS..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full sm:w-72 pl-16 pr-8 py-5 bg-[var(--theme-card)]/40 border-2 border-[var(--theme-border)] rounded-2xl text-xs font-black uppercase tracking-tight outline-none focus:border-[var(--theme-primary)]/40 hover:bg-[var(--theme-bg-alt)]/40 transition-all italic text-[var(--theme-text)]"
                        />
                    </div>
                    <button
                        onClick={() => setIsCreateOpen(true)}
                        className="w-full sm:w-auto px-10 py-5 bg-[var(--theme-text)] text-[var(--theme-bg)] hover:bg-[var(--theme-primary)] hover:text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all italic flex items-center justify-center gap-5 shadow-2xl active:scale-95 group "
                    >
                        <FiPlus strokeWidth={4} className="group-hover:rotate-90 transition-transform" /> INITIATE_MISSION
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10 pb-32">
                {/* ── FILTER SIDEBAR ── */}
                <aside className="lg:col-span-3 space-y-8 h-fit sticky top-32">
                    <div className="bg-[var(--theme-card)]/40 backdrop-blur-3xl border-2 border-[var(--theme-border)] rounded-3xl p-10 space-y-10 group shadow-sm">
                        <div className="flex items-center gap-4 border-b-2 border-dashed border-[var(--theme-border)] pb-8 opacity-30">
                            <FiFilter size={14} className="text-[var(--theme-primary)]" />
                            <h3 className="text-xs font-black uppercase tracking-wider text-[var(--theme-text-muted)] italic leading-none">SECTOR_FILTER</h3>
                        </div>
                        <div className="space-y-2">
                            <button
                                onClick={() => setActiveFilter('all')}
                                className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-tight transition-all italic border-2 ${
                                    activeFilter === 'all'
                                        ? 'bg-[var(--theme-primary)] text-white border-[var(--theme-primary)] shadow-xl translate-x-1'
                                        : 'text-[var(--theme-text-muted)] border-transparent hover:bg-[var(--theme-bg-alt)] hover:text-[var(--theme-text)] hover:translate-x-1'
                                }`}
                            >
                                <span className="flex items-center gap-4"><FiGrid size={14} /> ALL_SECTORS</span>
                                {activeFilter === 'all' && <FiCheckCircle size={14} strokeWidth={3} />}
                            </button>
                            {branches.map(b => {
                                const Icon = BRANCH_ICONS[b.slug] || FiGrid;
                                return (
                                    <button
                                        key={b.id || b.slug}
                                        onClick={() => setActiveFilter(b.slug)}
                                        className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-tight transition-all italic border-2 ${
                                            activeFilter === b.slug
                                                ? 'bg-[var(--theme-primary)] text-white border-[var(--theme-primary)] shadow-xl translate-x-1'
                                                : 'text-[var(--theme-text-muted)] border-transparent hover:bg-[var(--theme-bg-alt)] hover:text-[var(--theme-text)] hover:translate-x-1'
                                        }`}
                                    >
                                        <span className="flex items-center gap-4"><Icon size={14} /> {b.name.replace(/ /g, '_')}</span>
                                        {activeFilter === b.slug && <FiCheckCircle size={14} strokeWidth={3} />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Stats Widget */}
                    <div className="bg-[var(--theme-text)] rounded-3xl p-10 text-[var(--theme-bg)] space-y-8 shadow-2xl relative overflow-hidden group">
                         <div className="relative z-10 space-y-2">
                            <p className="text-xs font-black uppercase tracking-widest text-white/30 italic">ACTIVE_BOUNTIES</p>
                            <h4 className="text-5xl font-black italic tracking-tighter text-white">124</h4>
                         </div>
                         <div className="relative z-10 pt-6 border-t border-white/10">
                            <p className="text-xs font-black uppercase tracking-wide text-white/40 italic leading-relaxed">
                                Missions auto_expire in 7.0 solar days if not renewed.
                            </p>
                         </div>
                         <FiClock size={150} className="absolute bottom-[-40px] right-[-40px] opacity-[0.05] text-[var(--theme-primary)] group-hover:rotate-45 transition-transform duration-[10s]" />
                    </div>
                </aside>

                {/* ── POSTS GRID ── */}
                <div className="lg:col-span-9">
                    {filtered.length === 0 ? (
                        <div className="py-64 text-center bg-[var(--theme-card)]/40 backdrop-blur-3xl border-2 border-dashed border-[var(--theme-border)] rounded-full flex flex-col items-center justify-center space-y-12 opacity-20">
                            <FiHash size={120} className="animate-pulse" />
                            <div className="space-y-4">
                                <p className="text-4xl font-black uppercase tracking-tighter italic text-[var(--theme-text)]">No_Missions_Found</p>
                                <p className="text-xs uppercase font-black tracking-widest italic">RECONFIGURE_UPLINK_SEARCH</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <AnimatePresence>
                                {filtered.map((post, idx) => (
                                    <motion.div
                                        key={post.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="bg-[var(--theme-card)]/60 backdrop-blur-3xl border-2 border-[var(--theme-border)] rounded-full p-12 flex flex-col hover:border-[var(--theme-primary)]/40 hover:shadow-6xl transition-all group cursor-pointer overflow-hidden h-full relative"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--theme-primary)]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        
                                        <div className="flex items-start justify-between mb-10 relative z-10">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 bg-[var(--theme-bg-alt)] rounded-[1.8rem] border-2 border-[var(--theme-border)] flex items-center justify-center text-xl font-black text-[var(--theme-text-muted)] group-hover:bg-[var(--theme-text)] group-hover:text-[var(--theme-bg)] transition-all shadow-xl overflow-hidden relative">
                                                    {post.user?.avatar_url ? (
                                                        <img src={post.user.avatar_url} className="w-full h-full object-cover" />
                                                    ) : post.user?.display_name?.[0].toUpperCase()}
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-lg font-black text-[var(--theme-text)] group-hover:text-[var(--theme-primary)] transition-colors italic uppercase tracking-tighter leading-none">
                                                        @{post.user?.display_name || 'ANON_OPS'}
                                                    </p>
                                                    <p className="text-xs font-black text-[var(--theme-text-muted)] uppercase tracking-wide italic opacity-30">
                                                        UPLINK: {post.created_at ? new Date(post.created_at).toLocaleDateString() : 'REALTIME'}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider italic border-2 transition-all ${STATUS_COLORS[post.status] || STATUS_COLORS.open}`}>
                                                {post.lfg_type?.toUpperCase() || post.status.toUpperCase()}
                                            </span>
                                        </div>

                                        <div className="flex-1 space-y-6 relative z-10">
                                            <h3 className="text-4xl font-black uppercase tracking-tighter text-[var(--theme-text)] group-hover:text-[var(--theme-primary)] transition-colors leading-[0.9] italic">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm font-bold text-[var(--theme-text-muted)] italic leading-relaxed opacity-40 group-hover:opacity-100 transition-opacity line-clamp-3">
                                                {post.description}
                                            </p>

                                            {post.requirements && (
                                                <div className="bg-[var(--theme-bg-alt)]/40 p-6 rounded-2xl border-2 border-[var(--theme-border)] space-y-3">
                                                    <span className="text-xs font-black text-[var(--theme-primary)] uppercase tracking-widest italic">REQ_SPEC:</span>
                                                    <p className="text-xs font-bold text-[var(--theme-text)] italic leading-relaxed line-clamp-1">{post.requirements}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-16 pt-10 border-t-2 border-dashed border-[var(--theme-border)] flex items-center justify-between relative z-10">
                                            <div className="flex items-center gap-6">
                                                <div className="flex -space-x-4">
                                                    {[...Array(post.slots)].map((_, i) => (
                                                        <div key={i} className={`w-10 h-10 rounded-xl border-2 border-[var(--theme-card)] ${i < post.filled_slots ? 'bg-[var(--theme-primary)] shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.5)]' : 'bg-[var(--theme-bg-alt)] opacity-20'} transition-all`} />
                                                    ))}
                                                </div>
                                                <span className="text-xs font-black uppercase tracking-wide text-[var(--theme-text-muted)] italic">
                                                    {post.filled_slots}/{post.slots} SLOTS
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-5 group-hover:translate-x-4 transition-transform duration-500">
                                                <span className="text-xs font-black text-[var(--theme-primary)] uppercase tracking-widest italic opacity-0 group-hover:opacity-100 transition-all">SYNC_REQUEST</span>
                                                <div className="w-16 h-16 bg-[var(--theme-text)] text-[var(--theme-bg)] rounded-[1.5rem] flex items-center justify-center group-hover:bg-[var(--theme-primary)] group-hover:text-white transition-all shadow-2xl">
                                                    <FiArrowRight size={28} strokeWidth={4} />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <FiActivity size={300} className="absolute bottom-[-100px] left-[-100px] opacity-[0.01] text-[var(--theme-primary)] rotate-12 group-hover:scale-125 transition-transform duration-[12s] pointer-events-none" />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>

            {/* ── CREATE MODAL ── */}
            <AnimatePresence>
                {isCreateOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[var(--theme-bg)]/80 backdrop-blur-xl"
                            onClick={() => setIsCreateOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            className="bg-[var(--theme-card)] border-4 border-[var(--theme-border)] w-full max-w-3xl rounded-full relative z-10 overflow-hidden shadow-6xl"
                        >
                            <div className="p-16 space-y-12">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-2">
                                        <h2 className="text-4xl font-black uppercase tracking-tighter text-[var(--theme-text)] italic leading-none">INITIATE_MISSION</h2>
                                        <p className="text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] italic opacity-40">LFG_TRANSMISSION_PROTOCOL</p>
                                    </div>
                                    <button onClick={() => setIsCreateOpen(false)} className="w-16 h-16 flex items-center justify-center bg-[var(--theme-bg-alt)] hover:bg-[var(--theme-primary)] hover:text-white rounded-[1.8rem] border-2 border-[var(--theme-border)] text-[var(--theme-text-muted)] group transition-all">
                                        <FiX size={32} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
                                    </button>
                                </div>
                                <form className="space-y-8" onSubmit={e => { e.preventDefault(); setIsCreateOpen(false); }}>
                                    <div className="space-y-4">
                                        <label className="text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] italic block ml-6">MISSION_IDENTITY</label>
                                        <input required type="text" placeholder="ENTER_MISSION_TITLE..." className="w-full px-12 py-8 bg-[var(--theme-bg-alt)] border-2 border-[var(--theme-border)] rounded-3xl text-base font-black uppercase tracking-[0.1em] outline-none focus:border-[var(--theme-primary)]/60 transition-all italic text-[var(--theme-text)] placeholder:opacity-20" />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] italic block ml-6">MISSION_BRIEFING</label>
                                        <textarea rows={4} placeholder="DEFINE_OBJECTIVE_AND_REQUIREMENTS..." className="w-full px-12 py-8 bg-[var(--theme-bg-alt)] border-2 border-[var(--theme-border)] rounded-3xl text-base font-black uppercase tracking-[0.1em] outline-none focus:border-[var(--theme-primary)]/60 transition-all italic text-[var(--theme-text)] placeholder:opacity-20 resize-none" />
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <label className="text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] italic block ml-6">SLOT_ALLOCATION</label>
                                            <input type="number" min="1" max="10" placeholder="MAX_SLOTS (1-10)" className="w-full px-12 py-8 bg-[var(--theme-bg-alt)] border-2 border-[var(--theme-border)] rounded-3xl text-base font-black uppercase tracking-[0.1em] outline-none focus:border-[var(--theme-primary)]/60 transition-all italic text-[var(--theme-text)] placeholder:opacity-20" />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] italic block ml-6">AUTO_EXPIRE</label>
                                            <div className="p-8 bg-[var(--theme-bg-alt)] border-2 border-[var(--theme-border)] rounded-3xl flex items-center justify-between">
                                                <span className="text-sm font-black uppercase text-[var(--theme-text-muted)] italic">7.0_SOLAR_DAYS</span>
                                                <FiZap className="text-[var(--status-warning)]" />
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" className="w-full py-10 bg-[var(--theme-text)] text-[var(--theme-bg)] hover:bg-[var(--theme-primary)] hover:text-white rounded-3xl text-base font-black uppercase tracking-widest transition-all italic shadow-6xl active:scale-95 group mt-8 ">
                                        DEPLOY_MISSION_NODE_V1
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}









