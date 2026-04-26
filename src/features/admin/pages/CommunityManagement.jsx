import React, { useState } from 'react';
import { 
    FiMessageSquare, FiToggleLeft, FiToggleRight, FiTrash2, FiCheck, FiX, FiAlertTriangle, 
    FiTerminal, FiActivity, FiGlobe, FiHash, FiZap, FiCpu, FiUsers, FiLayers, FiShield, FiAlertCircle
} from 'react-icons/fi';
import { useToast } from '@/shared/components/Toast';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';

const BRANCHES = [
    { slug: 'dev', name: 'Game Development', icon: '⚙️', members: 4821, enabled: true },
    { slug: 'esports', name: 'Esports & Competitive', icon: '🏆', members: 8342, enabled: true },
    { slug: 'content', name: 'Content & Media', icon: '🎬', members: 3100, enabled: true },
    { slug: 'business', name: 'Business & Strategy', icon: '📊', members: 1890, enabled: true },
    { slug: 'art', name: 'Art & Design', icon: '🎨', members: 2740, enabled: true },
    { slug: 'writing', name: 'Writing & Narrative', icon: '✍️', members: 1420, enabled: false },
    { slug: 'audio', name: 'Music & Audio', icon: '🎵', members: 980, enabled: true },
];

const CHANNELS_BY_BRANCH = {
    dev: ['general', 'showcase', 'help', 'lfg', 'announcements'],
    esports: ['general', 'recruitment', 'vods', 'tournaments', 'announcements'],
    content: ['general', 'collab', 'feedback', 'events'],
    business: ['general', 'jobs', 'pitches', 'networking'],
    art: ['general', 'showcase', 'critique', 'tutorials'],
    writing: ['general', 'workshop', 'showcase', 'resources'],
    audio: ['general', 'showcase', 'collab', 'resources'],
};

const MOCK_REPORTS = [
    { id: 'r1', reporter: 'artisan_flux', reported_user: 'toxic123', message: 'kys noob get out of this server', branch: 'esports', channel: 'general', time: '5 min ago' },
    { id: 'r2', reporter: 'sync_master', reported_user: 'spammer_bot', message: 'BUY CHEAP SKINS @ best-skins.ru', branch: 'dev', channel: 'general', time: '12 min ago' },
    { id: 'r3', reporter: 'rapid_fire', reported_user: 'hateful_user', message: 'This community is trash full of amateurs', branch: 'dev', channel: 'showcase', time: '1 hr ago' },
];

const MOCK_GROUPS = [
    { id: 'g1', name: 'UE5 Dev Squad', branch: 'dev', visibility: 'public', members: 45, owner: 'archit3ct_node' },
    { id: 'g2', name: 'Valorant Champions', branch: 'esports', visibility: 'public', members: 128, owner: 'viper_vlr' },
    { id: 'g3', name: 'Indie Art Collective', branch: 'art', visibility: 'private', members: 22, owner: 'artisan_flux' },
];

const TABS = ['Branches', 'Channels', 'Moderation', 'Groups'];

export default function CommunityManagement() {
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState(0);
    const [branches, setBranches] = useState(BRANCHES);
    const [selectedBranch, setSelectedBranch] = useState('dev');
    const [channels, setChannels] = useState(CHANNELS_BY_BRANCH);
    const [newChannel, setNewChannel] = useState('');
    const [reports, setReports] = useState(MOCK_REPORTS);
    const [groups, setGroups] = useState(MOCK_GROUPS);

    const toggleBranch = (slug) => {
        setBranches(prev => prev.map(b => b.slug === slug ? { ...b, enabled: !b.enabled } : b));
        showToast('Branch status updated', 'success');
    };

    const handleAddChannel = () => {
        if (!newChannel.trim()) return;
        const slug = newChannel.toLowerCase().replace(/\s+/g, '-');
        setChannels(prev => ({ ...prev, [selectedBranch]: [...(prev[selectedBranch] || []), slug] }));
        setNewChannel('');
        showToast('Channel added', 'success');
    };

    const handleRemoveChannel = (branch, channel) => {
        setChannels(prev => ({ ...prev, [branch]: prev[branch].filter(c => c !== channel) }));
        showToast('Channel removed', 'info');
    };

    const handleReportAction = (id, action) => {
        setReports(prev => prev.filter(r => r.id !== id));
        showToast(action === 'remove' ? 'Message removed' : action === 'warn' ? 'User warned' : 'Report dismissed', 'success');
    };

    const handleDisableGroup = (id) => {
        setGroups(prev => prev.filter(g => g.id !== id));
        showToast('Group disabled', 'success');
    };

    const inputClass = "w-full bg-[var(--theme-bg-alt)]/50 border-2 border-[var(--theme-border)] rounded-2xl px-6 py-4 text-sm font-black italic text-[var(--theme-text)] outline-none focus:border-[var(--theme-primary)] focus:ring-4 focus:ring-[var(--theme-primary)]/10 transition-all placeholder:text-[var(--theme-text-muted)] placeholder:opacity-20 uppercase tracking-widest";
    const labelClass = "block text-xs  uppercase tracking-widest text-[var(--theme-text-muted)] mb-2.5 italic opacity-40 leading-none";

    return (
        <div className="admin-page space-y-16 pb-40 relative min-h-screen">
            <Helmet><title>Social Nexus Command | GzoneSphere Admin</title></Helmet>
            
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] right-[-5%] w-[60%] h-[60%] bg-[var(--theme-primary)]/5 blur-[180px] rounded-full" />
                <div className="absolute bottom-[5%] left-[-10%] w-[50%] h-[50%] bg-[var(--theme-secondary)]/5 blur-3xl rounded-full" />
            </div>

            <header className="flex flex-col md:flex-row md:items-end justify-between gap-12 relative z-10 px-2">
                <div className="space-y-8">
                    <div className="flex items-center gap-6 group">
                        <div className="w-16 h-1 bg-[var(--theme-primary)] rounded-full animate-pulse shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.5)]" />
                        <span className="text-sm font-black uppercase tracking-widest text-[var(--theme-primary)] italic leading-none opacity-80">v4.08_SOCIAL_COMMAND</span>
                    </div>
                    <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter italic leading-[0.8] text-[var(--theme-text)]">Pulse <br/><span className="text-transparent opacity-20">NEXUS</span></h1>
                </div>

                <div className="flex bg-[var(--theme-card)]/80 backdrop-blur-3xl p-3 rounded-3xl border-2 border-[var(--theme-border)] shadow-2xl gap-4 relative z-10">
                    {reports.length > 0 && (
                        <div className="bg-[var(--status-error)] text-white px-8 py-5 rounded-[1.8rem] text-xs font-black uppercase tracking-wider italic flex items-center gap-4 animate-pulse">
                            <FiAlertTriangle size={16} strokeWidth={3} /> {reports.length}_THREATS_DETECTED
                        </div>
                    )}
                    <div className="bg-[var(--theme-bg-alt)]/50 px-8 py-5 rounded-[1.8rem] text-xs font-black uppercase tracking-wider text-[var(--theme-text-muted)] italic leading-none flex items-center gap-4">
                        <FiUsers size={16} strokeWidth={3} className="text-[var(--theme-primary)]" /> 22.4K_NODES_ACTIVE
                    </div>
                </div>
            </header>

            <div className="flex flex-wrap gap-2 mb-10 bg-[var(--theme-bg-alt)]/50 backdrop-blur-3xl rounded-3xl p-2 border-2 border-[var(--theme-border)] shadow-inner relative z-10 mx-2 overflow-x-auto no-scrollbar">
                {TABS.map((tab, i) => (
                    <button key={tab} onClick={() => setActiveTab(i)}
                        className={`shrink-0 px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all italic leading-none flex items-center gap-4 ${activeTab === i ? 'bg-[var(--theme-text)] text-[var(--theme-bg)] shadow-2xl scale-105' : 'text-[var(--theme-text-muted)] opacity-40 hover:opacity-100 hover:bg-[var(--theme-bg-alt)]'}`}>
                        {tab.toUpperCase()}
                        {tab === 'Moderation' && reports.length > 0 && (
                            <span className="bg-[var(--status-error)] text-white px-2 py-0.5 rounded-full text-xs animate-pulse shadow-[0_0_10px_rgba(var(--status-error-rgb),0.5)]">{reports.length}</span>
                        )}
                    </button>
                ))}
            </div>

            <main className="relative z-10 mx-2">
                <AnimatePresence mode="wait">
                    {activeTab === 0 && (
                        <motion.div 
                            key="branches"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-[var(--theme-card)]/80 backdrop-blur-3xl rounded-[4rem] border-2 border-[var(--theme-border)] overflow-hidden shadow-2xl"
                        >
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b-2 border-dashed border-[var(--theme-border)]/50">
                                        <th className="pl-16 py-10 text-xs font-black uppercase tracking-wider text-[var(--theme-text-muted)] opacity-35 italic">BRANCH_IDENTITY</th>
                                        <th className="py-10 text-xs font-black uppercase tracking-wider text-[var(--theme-text-muted)] opacity-35 italic">UPLINK_PATH</th>
                                        <th className="py-10 text-xs font-black uppercase tracking-wider text-[var(--theme-text-muted)] opacity-35 italic text-center">POPULATION</th>
                                        <th className="py-10 text-xs font-black uppercase tracking-wider text-[var(--theme-text-muted)] opacity-35 italic text-center">SYST_STATE</th>
                                        <th className="pr-16 py-10 text-right text-xs font-black uppercase tracking-wider text-[var(--theme-text-muted)] opacity-35 italic text-center">PROTOCOL</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y-2 divide-dashed divide-[var(--theme-border)]/30">
                                    {branches.map((b, idx) => (
                                        <tr key={b.slug} className="group hover:bg-[var(--theme-bg-alt)]/50 transition-all">
                                            <td className="pl-16 py-8">
                                                <div className="flex items-center gap-6">
                                                    <span className="text-4xl filter group-hover:scale-125 transition-transform">{b.icon}</span>
                                                    <span className="text-xl font-black italic tracking-tighter uppercase text-[var(--theme-text)] group-hover:text-[var(--theme-primary)] transition-colors">{b.name}</span>
                                                </div>
                                            </td>
                                            <td><code className="text-xs text-[var(--theme-text-muted)] font-mono bg-[var(--theme-bg-alt)] px-4 py-2 rounded-xl border border-[var(--theme-border)] opacity-60">/community/{b.slug}</code></td>
                                            <td className="text-center font-black italic text-[var(--theme-text)] tabular-nums">{b.members.toLocaleString()}</td>
                                            <td className="text-center">
                                                <span className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-wider italic border-2 leading-none ${b.enabled ? 'bg-[var(--status-success-soft)] text-[var(--status-success)] border-[var(--status-success)]/10' : 'bg-[var(--status-error-soft)] text-[var(--status-error)] border-[var(--status-error)]/10 opacity-40'}`}>
                                                    {b.enabled ? 'LIVE_STREAM' : 'NULL_VOID'}
                                                </span>
                                            </td>
                                            <td className="pr-16 text-center">
                                                <button onClick={() => toggleBranch(b.slug)} className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto border-2 transition-all ${b.enabled ? 'text-[var(--status-success)] border-[var(--status-success)]/20 hover:text-[var(--status-error)] hover:border-[var(--status-error)]' : 'text-[var(--theme-text-muted)] border-[var(--theme-border)] hover:text-[var(--status-success)] hover:border-[var(--status-success)]'}`}>
                                                    {b.enabled ? <FiToggleRight size={28} strokeWidth={1} /> : <FiToggleLeft size={28} strokeWidth={1} />}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>
                    )}

                    {activeTab === 1 && (
                        <motion.div 
                            key="channels"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-10"
                        >
                            <div className="bg-[var(--theme-card)]/80 backdrop-blur-3xl rounded-3xl border-2 border-[var(--theme-border)] p-10 shadow-2xl space-y-8">
                                <h3 className={labelClass}>DOMAIN_SELECTOR</h3>
                                <div className="space-y-3">
                                    {branches.map(b => (
                                        <button key={b.slug} onClick={() => setSelectedBranch(b.slug)}
                                            className={`w-full flex items-center gap-6 px-8 py-5 rounded-[1.8rem] text-sm font-black uppercase tracking-tight italic text-left transition-all border-2 ${selectedBranch === b.slug ? 'bg-[var(--theme-primary)] text-white border-[var(--theme-primary)] shadow-2xl scale-105' : 'bg-transparent text-[var(--theme-text-muted)] border-[var(--theme-border)] opacity-40 hover:opacity-100 hover:border-[var(--theme-primary)]/30'}`}>
                                            <span className="text-xl">{b.icon}</span> {b.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="lg:col-span-2 bg-[var(--theme-card)]/80 backdrop-blur-3xl rounded-[4rem] border-2 border-[var(--theme-border)] p-12 md:p-16 shadow-2xl relative overflow-hidden group/forge">
                                <FiTerminal size={600} className="absolute bottom-[-150px] left-[-250px] text-[var(--theme-text)] opacity-[0.01] -rotate-12 group-hover/forge:rotate-0 transition-transform duration-[20s] pointer-events-none" />
                                <div className="flex justify-between items-center mb-12">
                                    <div className="space-y-2">
                                        <h3 className="text-4xl font-black italic text-[var(--theme-text)] uppercase tracking-tighter">{branches.find(b => b.slug === selectedBranch)?.name} <span className="text-[var(--theme-primary)]">CHANNELS</span></h3>
                                        <p className="text-xs font-black text-[var(--theme-text-muted)] uppercase tracking-widest opacity-40 italic">{(channels[selectedBranch] || []).length}_UPLINK_STREAMS_ACTIVE</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 relative z-10">
                                    <AnimatePresence>
                                        {(channels[selectedBranch] || []).map((ch, idx) => (
                                            <motion.div 
                                                key={ch}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="flex items-center justify-between px-10 py-6 bg-[var(--theme-bg-alt)]/50 rounded-[1.8rem] border-2 border-[var(--theme-border)] hover:border-[var(--theme-primary)]/30 transition-all shadow-inner group/ch"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <span className="text-[var(--theme-primary)] font-black italic text-xl opacity-30 group-hover/ch:opacity-100">#</span>
                                                    <span className="text-sm font-black italic text-[var(--theme-text)] uppercase tracking-widest">{ch}</span>
                                                </div>
                                                <button onClick={() => handleRemoveChannel(selectedBranch, ch)} className="w-10 h-10 rounded-xl flex items-center justify-center text-[var(--theme-text-muted)] hover:text-[var(--status-error)] transition-colors opacity-0 group-hover/ch:opacity-100">
                                                    <FiTrash2 size={16} strokeWidth={3} />
                                                </button>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                                <div className="flex gap-4 relative z-10 p-4 bg-[var(--theme-bg-alt)] rounded-3xl border-2 border-[var(--theme-border)] shadow-inner">
                                    <input
                                        className="flex-1 bg-transparent px-8 py-5 text-sm font-black italic text-[var(--theme-text)] outline-none placeholder:text-[var(--theme-text-muted)] placeholder:opacity-20 uppercase tracking-wide"
                                        value={newChannel}
                                        onChange={e => setNewChannel(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && handleAddChannel()}
                                        placeholder="NEW_UPLINK_IDENTIFIER..."
                                    />
                                    <button onClick={handleAddChannel} className="bg-[var(--theme-text)] text-[var(--theme-bg)] px-10 py-5 rounded-[1.5rem] text-xs font-black uppercase tracking-widest italic hover:bg-[var(--theme-primary)] hover:text-white transition-all shadow-2xl flex items-center gap-4 border-4 border-white/5">
                                        <FiPlus size={18} strokeWidth={3} /> ADD_SYST_NODE
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 2 && (
                        <motion.div 
                            key="moderation"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            {reports.length === 0 ? (
                                <div className="bg-[var(--theme-card)] border-2 border-[var(--theme-border)] rounded-[4rem] p-32 text-center shadow-2xl">
                                    <FiCheck size={100} strokeWidth={1} className="mx-auto mb-12 text-[var(--status-success)] opacity-20" />
                                    <p className="text-4xl font-black italic text-[var(--theme-text)] uppercase tracking-tighter mb-4">THREAT_LEVEL: <span className="text-[var(--status-success)] underline">ZERO</span></p>
                                    <p className="text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] opacity-30 italic">NO_VIOLATIONS_DETECTED_IN_CORE_REAMS</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-8">
                                    {reports.map((r, idx) => (
                                        <motion.div 
                                            key={r.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="bg-[var(--theme-card)]/80 backdrop-blur-3xl rounded-full border-2 border-[var(--status-error)]/20 p-12 shadow-2xl flex flex-col md:flex-row gap-12 relative overflow-hidden group/report"
                                        >
                                            <div className="absolute top-0 left-0 w-2 h-full bg-[var(--status-error)] opacity-40 shadow-[0_0_20px_rgba(var(--status-error-rgb),0.5)]" />
                                            <div className="flex-1 space-y-8 relative z-10">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-6">
                                                        <div className="w-14 h-14 bg-[var(--status-error-soft)] rounded-2xl flex items-center justify-center text-[var(--status-error)] border-2 border-[var(--status-error)]/20 shadow-2xl">
                                                            <FiAlertCircle size={24} strokeWidth={3} className="animate-pulse" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <h4 className="text-xs font-black uppercase tracking-widest text-[var(--status-error)] italic leading-none">THREAT_ID:_{r.id}</h4>
                                                            <p className="text-sm font-black uppercase tracking-widest text-[var(--theme-text-muted)] opacity-40 italic">{r.time.toUpperCase()}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-xs font-black uppercase tracking-wide px-6 py-2 bg-[var(--theme-bg-alt)] border-2 border-[var(--theme-border)] rounded-full italic opacity-60">
                                                        TRANS_UPLINK: <span className="text-[var(--theme-primary)]">#{r.branch}/{r.channel}</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="p-10 bg-[var(--status-error-soft)]/5 rounded-3xl border-2 border-[var(--status-error)]/10 shadow-inner group-hover/report:border-[var(--status-error)]/30 transition-all">
                                                    <p className="text-2xl font-black italic tracking-tighter text-[var(--theme-text)] uppercase leading-tight">
                                                        <span className="text-[var(--status-error)]">@{r.reported_user}:</span> "{r.message}"
                                                    </p>
                                                    <div className="mt-6 flex items-center gap-4 text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] opacity-40 italic">
                                                        PROCTOR_REPORTER: @{r.reporter}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex md:flex-col gap-4 justify-center relative z-10 min-w-[280px]">
                                                <button onClick={() => handleReportAction(r.id, 'remove')} className="flex-1 bg-[var(--status-error)] text-white p-6 rounded-[1.8rem] text-xs font-black uppercase tracking-wider italic hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-4">
                                                    <FiTrash2 size={16} strokeWidth={3} /> REMOVE_MOD
                                                </button>
                                                <button onClick={() => handleReportAction(r.id, 'warn')} className="flex-1 bg-[var(--status-warning)] text-white p-6 rounded-[1.8rem] text-xs font-black uppercase tracking-wider italic hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-4">
                                                    <FiAlertTriangle size={16} strokeWidth={3} /> WARN_SYST
                                                </button>
                                                <button onClick={() => handleReportAction(r.id, 'dismiss')} className="flex-1 bg-[var(--theme-bg-alt)] text-[var(--theme-text-muted)] p-6 rounded-[1.8rem] text-xs font-black uppercase tracking-wider italic border-2 border-[var(--theme-border)] hover:bg-[var(--theme-card)] hover:text-[var(--theme-text)] transition-all">
                                                    DISMISS_LOG
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 3 && (
                        <motion.div 
                            key="groups"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[var(--theme-card)]/80 backdrop-blur-3xl rounded-[4rem] border-2 border-[var(--theme-border)] overflow-hidden shadow-2xl"
                        >
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b-2 border-dashed border-[var(--theme-border)]/50">
                                        <th className="pl-16 py-10 text-xs font-black uppercase tracking-wider text-[var(--theme-text-muted)] opacity-35 italic">GROUP_SIGNATURE</th>
                                        <th className="py-10 text-xs font-black uppercase tracking-wider text-[var(--theme-text-muted)] opacity-35 italic text-center">DOMAIN</th>
                                        <th className="py-10 text-xs font-black uppercase tracking-wider text-[var(--theme-text-muted)] opacity-35 italic text-center">PRIVACY_STAMP</th>
                                        <th className="py-10 text-xs font-black uppercase tracking-wider text-[var(--theme-text-muted)] opacity-35 italic text-center">POPULATION</th>
                                        <th className="py-10 text-xs font-black uppercase tracking-wider text-[var(--theme-text-muted)] opacity-35 italic">MASTER_NODE</th>
                                        <th className="pr-16 py-10 text-right text-xs font-black uppercase tracking-wider text-[var(--theme-text-muted)] opacity-35 italic">PROTOCOL</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y-2 divide-dashed divide-[var(--theme-border)]/30">
                                    {groups.map((g, idx) => (
                                        <tr key={g.id} className="group hover:bg-[var(--theme-bg-alt)]/50 transition-all">
                                            <td className="pl-16 py-8">
                                                <div className="text-3xl font-black italic tracking-tighter uppercase text-[var(--theme-text)] group-hover:text-[var(--theme-primary)] transition-colors line-clamp-1">{g.name}</div>
                                            </td>
                                            <td className="text-center">
                                                <span className="text-xs font-black uppercase tracking-tight px-5 py-2 bg-[var(--theme-bg-alt)] text-[var(--theme-text-muted)] border-2 border-[var(--theme-border)] rounded-xl italic leading-none opacity-60">
                                                    {g.branch.toUpperCase()}_UNIT
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <span className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider italic leading-none border-2 ${g.visibility === 'public' ? 'bg-[var(--status-success-soft)] text-[var(--status-success)] border-[var(--status-success)]/10' : 'bg-[var(--status-warning-soft)] text-[var(--status-warning)] border-[var(--status-warning)]/10 opacity-70'}`}>
                                                    {g.visibility === 'public' ? 'OPEN_OS' : 'SECURE_OS'}
                                                </span>
                                            </td>
                                            <td className="text-center font-black italic text-[var(--theme-text)] tabular-nums">{g.members}</td>
                                            <td className="font-black italic text-[var(--theme-primary)] opacity-60 uppercase tracking-widest text-xs">@{g.owner}</td>
                                            <td className="pr-16 text-right">
                                                <button onClick={() => handleDisableGroup(g.id)}
                                                    className="px-8 py-3 bg-[var(--status-error-soft)] text-[var(--status-error)] text-xs font-black uppercase tracking-widest italic rounded-[1.2rem] border-2 border-[var(--status-error)]/10 hover:bg-[var(--status-error)] hover:text-white transition-all shadow-2xl">
                                                    KILL_SYNC
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mx-2 relative z-10">
                 <TelemetryCard label="SOCIAL_SYST_HEALTH" value="OPTIMAL" icon={<FiActivity />} color="var(--status-success)" />
                 <TelemetryCard label="HUMAN_TRAFFIC" value="2.8 TB/S" icon={<FiGlobe />} color="var(--theme-primary)" />
                 <TelemetryCard label="MOD_EFFICIENCY" value="99.2%" icon={<FiShield />} color="var(--status-warning)" />
                 <TelemetryCard label="REGISTRY_STAMP" value="v4.0_MOD" icon={<FiHash />} color="var(--theme-secondary)" />
            </div>
        </div>
    );
}

function TelemetryCard({ label, value, icon, color }) {
    return (
        <div className="bg-[var(--theme-card)]/80 backdrop-blur-3xl rounded-3xl border-2 border-[var(--theme-border)] p-10 shadow-2xl space-y-4 hover:border-[var(--theme-primary)]/40 hover:-translate-y-2 transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--theme-primary)] opacity-5 rounded-full blur-[40px] -mr-16 -mt-16" />
            <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] italic opacity-30 leading-none group-hover:text-[var(--theme-primary)] transition-colors group-hover:opacity-60">
                 {React.cloneElement(icon, { size: 16, strokeWidth: 3, className: 'animate-pulse' })} {label}
            </div>
            <p className="text-3xl font-black uppercase tracking-tighter italic text-[var(--theme-text)] leading-none relative z-10" style={{ color: color }}>{value}</p>
        </div>
    );
}








