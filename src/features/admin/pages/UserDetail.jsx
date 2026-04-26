import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    FiArrowLeft, FiUser, FiShield, FiActivity, FiMessageSquare,
    FiAlertTriangle, FiCheckCircle, FiXCircle, FiLoader,
    FiEdit2, FiEye, FiLock, FiSlash, FiAward, FiCpu, FiGlobe, FiTerminal, FiHash, FiZap
} from 'react-icons/fi';
import { useToast } from '@/shared/components/Toast';
import { mockApiService } from '@services/mockApiService';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_ACTIVITY, MOCK_POSTS } from '@/shared/data/profileData';

const SUB_PROFILE_TYPES = [
    { id: 'dev', label: 'GAME_DEV_v4', icon: '⚙️', color: 'bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]' },
    { id: 'esports', label: 'GZONESPHERE_ATHLETE', icon: '🏆', color: 'bg-[var(--theme-secondary)]/10 text-[var(--theme-secondary)]' },
    { id: 'content', label: 'SIGNAL_CONTENT', icon: '🎥', color: 'bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]' },
    { id: 'business', label: 'DOMAIN_OPS', icon: '📊', color: 'bg-[var(--status-success-soft)] text-[var(--status-success)]' },
    { id: 'art', label: 'ARTISAN_SHARD', icon: '🎨', color: 'bg-[var(--theme-secondary)]/10 text-[var(--theme-secondary)]' },
    { id: 'writing', label: 'TRUTH_SCRIBE', icon: '✍️', color: 'bg-[var(--status-warning-soft)] text-[var(--status-warning)]' },
    { id: 'audio', label: 'SONIC_WAVE', icon: '🎵', color: 'bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]' },
];

export default function UserDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { showToast } = useToast();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [actionLoading, setActionLoading] = useState(null);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const users = await mockApiService.getAllUsers();
                const found = users.find(u => String(u.id) === String(id));
                if (found) setUser(found);
                else setUser(null);
            } catch {
                showToast('Failed to load node', 'error');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    const handleAction = async (action) => {
        setActionLoading(action);
        try {
            const statusMap = { suspend: 'Suspended', activate: 'Active', ban: 'Banned', verify: 'Active' };
            if (action !== 'verify') {
                await mockApiService.updateUser(user.id, { status: statusMap[action] });
                setUser(prev => ({ ...prev, status: statusMap[action] }));
            }
            const msgs = {
                suspend: 'Node transmission suspended.',
                activate: 'Node transmission activated.',
                ban: 'Node banished from nexus.',
                verify: 'Verified shard badge granted.',
            };
            showToast(msgs[action], 'success');
        } catch {
            showToast('Protocol action failed', 'error');
        } finally {
            setActionLoading(null);
        }
    };

    const statusStyles = (s) => {
        if (s === 'Active') return 'bg-[var(--status-success-soft)] text-[var(--status-success)] border-[var(--status-success)]/10';
        if (s === 'Suspended') return 'bg-[var(--status-warning-soft)] text-[var(--status-warning)] border-[var(--status-warning)]/10';
        if (s === 'Banned') return 'bg-[var(--status-error-soft)] text-[var(--status-error)] border-[var(--status-error)]/10';
        return 'bg-[var(--theme-bg-alt)] text-[var(--theme-text-muted)] border-[var(--theme-border)]';
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-[600px] gap-8 bg-[var(--theme-bg)] rounded-3xl border-2 border-[var(--theme-border)]">
            <div className="relative">
                <FiCpu size={60} className="animate-spin-slow text-[var(--theme-primary)] opacity-40" />
                <FiLoader size={30} className="absolute inset-x-0 inset-y-0 m-auto animate-spin text-[var(--theme-primary)]" />
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] italic animate-pulse">INITIATING_NODE_SYNC_v4</p>
        </div>
    );

    if (!user) return (
        <div className="flex flex-col items-center justify-center h-[600px] gap-12 bg-[var(--theme-bg)] rounded-3xl border-2 border-[var(--theme-border)] text-center px-12">
            <FiZapOff size={80} className="text-[var(--status-error)] opacity-40 animate-bounce" />
            <div className="space-y-4">
                <h3 className="text-4xl font-black uppercase tracking-tighter italic text-[var(--theme-text)]">NODE_RECOR_NOT_IDENTIFIED</h3>
                <p className="text-xs font-black uppercase tracking-wide text-[var(--theme-text-muted)] opacity-30 italic leading-relaxed">The requested signature is not present in the global identity buffer.</p>
            </div>
            <button onClick={() => navigate('/admin/users')} className="px-12 py-5 bg-[var(--theme-text)] text-[var(--theme-bg)] rounded-3xl text-xs font-black uppercase tracking-widest italic hover:bg-[var(--theme-primary)] hover:text-white hover:scale-105 active:scale-95 transition-all flex items-center gap-6 shadow-2xl border-4 border-white/5">
                <FiArrowLeft strokeWidth={3} /> REVERT_TO_MASTER_INDEX
            </button>
        </div>
    );

    const TABS = [
        { id: 'overview', label: 'NODE_OVERVIEW', icon: FiUser },
        { id: 'activity', label: 'PULSE_ACTIVITY', icon: FiActivity },
        { id: 'posts', label: 'DOMAIN_POSTS', icon: FiMessageSquare },
        { id: 'reports', label: 'ANOMALY_REPORTS', icon: FiAlertTriangle },
    ];

    return (
        <div className="admin-page space-y-12 pb-32 relative min-h-screen selection:bg-[var(--theme-primary)]/30">
            <Helmet><title>Node Audit — @{user.user} | Admin Nexus</title></Helmet>
            
            {/* Cinematic Background Artifacts */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--theme-primary)]/5 blur-3xl rounded-full pointer-events-none opacity-40" />

            <header className="flex flex-col md:flex-row md:items-end justify-between gap-10 relative z-10 px-2">
                <div className="flex items-center gap-8">
                    <button
                        onClick={() => navigate('/admin/users')}
                        className="w-16 h-16 bg-[var(--theme-card)]/80 backdrop-blur-3xl rounded-[1.8rem] border-2 border-[var(--theme-border)] flex items-center justify-center text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] hover:border-[var(--theme-primary)]/30 transition-all shadow-2xl hover:scale-110 active:scale-95 group"
                    >
                        <FiArrowLeft size={24} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div className="space-y-3">
                        <div className="flex items-center gap-4">
                            <h1 className="text-sm font-black uppercase tracking-widest text-[var(--theme-primary)] italic leading-none">FORENSIC_NODE_AUDIT_v4</h1>
                            <div className="w-2 h-2 bg-[var(--status-success)] rounded-full animate-ping" />
                        </div>
                        <p className="text-5xl font-black uppercase tracking-tighter italic text-[var(--theme-text)] leading-none">@{user.user} <span className="text-transparent opacity-20">SIGNATURE</span></p>
                    </div>
                </div>
                
                <div className="flex flex-wrap gap-4 bg-[var(--theme-card)]/80 backdrop-blur-3xl p-4 rounded-3xl border-2 border-[var(--theme-border)] shadow-2xl">
                    <ActionButton
                        onClick={() => handleAction('verify')}
                        loading={actionLoading === 'verify'}
                        icon={<FiAward />}
                        label="GRANT_VERIFIED"
                        color="var(--status-warning)"
                    />
                    {user.status !== 'Active' ? (
                        <ActionButton
                            onClick={() => handleAction('activate')}
                            loading={actionLoading === 'activate'}
                            icon={<FiCheckCircle />}
                            label="ACTIVATE_NODE"
                            color="var(--status-success)"
                        />
                    ) : (
                        <ActionButton
                            onClick={() => handleAction('suspend')}
                            loading={actionLoading === 'suspend'}
                            icon={<FiLock />}
                            label="SUSPEND_LINK"
                            color="var(--status-warning)"
                        />
                    )}
                    <ActionButton
                        onClick={() => handleAction('ban')}
                        loading={actionLoading === 'ban'}
                        icon={<FiSlash />}
                        label="BANISH_NODE"
                        color="var(--status-error)"
                        disabled={user.status === 'Banned'}
                    />
                </div>
            </header>

            {/* Core Identity Shard */}
            <div className="bg-[var(--theme-card)]/80 backdrop-blur-3xl rounded-[4rem] border-2 border-[var(--theme-border)] p-12 shadow-2xl relative overflow-hidden group/card z-10">
                <div className="flex items-start gap-12 flex-wrap relative z-10">
                    <div className="w-32 h-32 rounded-full bg-[var(--theme-text)] text-[var(--theme-bg)] flex items-center justify-center text-5xl font-black italic shadow-2xl relative group/ava border-4 border-white/5 transition-transform duration-700 hover:rotate-6">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--theme-primary)]/20 to-transparent" />
                        {user.user?.charAt(0)?.toUpperCase()}
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[var(--theme-card)] rounded-2xl flex items-center justify-center shadow-xl border-2 border-[var(--theme-border)]">
                            <FiShield className="text-[var(--theme-primary)]" size={20} strokeWidth={3} />
                        </div>
                    </div>
                    
                    <div className="flex-1 min-w-[300px] space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-6 flex-wrap">
                                <h2 className="text-4xl font-black text-[var(--theme-text)] italic tracking-tighter leading-none group-hover/card:text-[var(--theme-primary)] transition-colors">@{user.user}</h2>
                                <span className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider border-2 italic shadow-inner ${statusStyles(user.status)}`}>
                                    ID_STATUS: {user.status}
                                </span>
                            </div>
                            <p className="text-sm text-[var(--theme-text-muted)] font-black uppercase tracking-tight italic opacity-40 leading-none">{user.type} // NETWORK_CITIZEN</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-10 pt-4">
                            <StatMetric label="DOMAIN_POSTS" value="0" icon={<FiMessageSquare />} />
                            <StatMetric label="NODE_FOLLOWERS" value="0" icon={<FiActivity />} />
                            <StatMetric label="SIGNAL_FOLLOWING" value="0" icon={<FiGlobe />} />
                        </div>
                    </div>

                    <div className="bg-[var(--theme-bg-alt)]/60 rounded-3xl p-8 border-2 border-[var(--theme-border)] shadow-inner space-y-4 text-right min-w-[280px]">
                        <p className="text-xs font-black text-[var(--theme-text-muted)] uppercase tracking-widest italic opacity-30 leading-none flex justify-between items-center gap-4">NODE_UUID: <span className="text-[var(--theme-text)] opacity-60 tabular-nums">0X_{user.id}</span></p>
                        <div className="h-[1px] bg-gradient-to-r from-transparent via-[var(--theme-border)] to-transparent" />
                        <p className="text-xs font-black text-[var(--theme-text-muted)] uppercase tracking-widest italic opacity-30 leading-none flex justify-between items-center gap-4">SYNC_STAMP: <span className="text-[var(--theme-text)] opacity-60 tabular-nums">{user.created}</span></p>
                        <div className="h-[1px] bg-gradient-to-r from-transparent via-[var(--theme-border)] to-transparent" />
                        <p className="text-xs font-black text-[var(--theme-text-muted)] uppercase tracking-widest italic opacity-30 leading-none flex justify-between items-center gap-4">ENTITY_TYPE: <span className="text-[var(--theme-text)] opacity-60 tabular-nums">INDIVIDUAL</span></p>
                    </div>
                </div>
                <FiTerminal size={400} className="absolute bottom-[-100px] left-[-100px] text-[var(--theme-text)] opacity-[0.015] -rotate-12 pointer-events-none group-hover/card:rotate-0 transition-transform duration-[15s]" />
            </div>

            {/* Tactical Navigation Deck */}
            <div className="flex flex-wrap gap-4 bg-[var(--theme-bg-alt)]/50 backdrop-blur-xl rounded-3xl p-3 border-2 border-[var(--theme-border)] shadow-inner relative z-10">
                {TABS.map(({ id: tabId, label, icon: Icon }) => (
                    <button
                        key={tabId}
                        onClick={() => setActiveTab(tabId)}
                        className={`flex-1 flex items-center justify-center gap-6 px-10 py-6 rounded-[2.2rem] text-xs font-black uppercase tracking-wider transition-all italic leading-none group ${activeTab === tabId ? 'bg-[var(--theme-card)] text-[var(--theme-primary)] shadow-2xl border-2 border-[var(--theme-border)]' : 'text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] opacity-40 hover:opacity-100'}`}
                    >
                        <Icon size={20} strokeWidth={3} className={`${activeTab === tabId ? 'animate-pulse' : 'group-hover:scale-125 transition-transform'}`} /> {label}
                    </button>
                ))}
            </div>

            <main className="relative z-10">
                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div 
                            key="overview"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-12"
                        >
                            <div className="bg-[var(--theme-card)]/80 backdrop-blur-3xl rounded-[4rem] border-2 border-[var(--theme-border)] p-12 shadow-2xl relative overflow-hidden group/nexus">
                                <div className="flex items-center justify-between mb-12 border-b-2 border-dashed border-[var(--theme-border)] pb-8">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-[var(--theme-text-muted)] italic leading-none opacity-40 flex items-center gap-4"><FiLayers className="text-[var(--theme-primary)]" /> IDENTITY_SHARD_MATRIX</h3>
                                    <span className="text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] opacity-20">7 TOTAL_DEFINITIONS</span>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
                                    {SUB_PROFILE_TYPES.map(t => (
                                        <div key={t.id} className={`flex flex-col items-center gap-6 p-8 rounded-3xl border-2 border-dashed transition-all cursor-crosshair group/shard ${t.color.split(' ')[0]} border-[var(--theme-border)] hover:border-[var(--theme-primary)]/40 hover:-translate-y-2`}>
                                            <span className="text-4xl group-hover/shard:scale-125 transition-transform duration-500">{t.icon}</span>
                                            <div className="space-y-2 text-center">
                                                <span className="text-xs font-black uppercase tracking-tight italic leading-none">{t.label}</span>
                                                <p className="text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] opacity-30 italic leading-none">IDLE_STATE</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <FiCpu size={300} className="absolute bottom-[-100px] right-[-100px] text-[var(--theme-text)] opacity-[0.01] -rotate-12 group-hover/nexus:rotate-0 transition-transform duration-[20s] pointer-events-none" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <QuickInfoCard label="SYNCHRONICITY_STATUS" value={user.status} color={statusStyles(user.status).split(' ')[1]} />
                                <QuickInfoCard label="REGISTRATION_STAMP" value={user.created} />
                                <QuickInfoCard label="PRIMARY_DOMAIN_CLASS" value={user.type} />
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'activity' && (
                        <motion.div 
                            key="activity"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[var(--theme-card)]/80 backdrop-blur-3xl rounded-[4rem] border-2 border-[var(--theme-border)] shadow-2xl overflow-hidden relative"
                        >
                            <div className="p-12 border-b-2 border-dashed border-[var(--theme-border)]">
                                <h3 className="text-sm font-black uppercase tracking-widest text-[var(--theme-text-muted)] italic leading-none opacity-40 flex items-center gap-4"><FiActivity className="text-[var(--theme-primary)]" /> SECURE_PULSE_ACTIVITY_LOG</h3>
                            </div>
                            <div className="divide-y-2 divide-dashed divide-[var(--theme-border)]/50">
                                {MOCK_ACTIVITY.map((item, idx) => (
                                    <div key={item.id} className="px-12 py-8 flex items-start gap-10 hover:bg-[var(--theme-bg-alt)]/50 transition-all group/row cursor-default">
                                        <div className="w-14 h-14 rounded-2xl bg-[var(--theme-bg-alt)] border-2 border-[var(--theme-border)] flex items-center justify-center text-[var(--theme-primary)] group-hover/row:scale-110 group-hover/row:rotate-6 transition-all shadow-inner">
                                            <FiActivity size={24} strokeWidth={3} className="animate-pulse" />
                                        </div>
                                        <div className="flex-1 min-w-0 space-y-2">
                                            <p className="text-xl font-black text-[var(--theme-text)] italic tracking-tighter group-hover/row:text-[var(--theme-primary)] transition-colors leading-none uppercase">{item.action}</p>
                                            <p className="text-sm text-[var(--theme-text-muted)] font-black italic opacity-40 leading-none">{item.detail.toUpperCase()}</p>
                                        </div>
                                        <span className="text-xs font-black text-[var(--theme-text-muted)] opacity-20 uppercase tracking-wider italic tabular-nums group-hover/row:opacity-60 transition-opacity">{item.time.toUpperCase()}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'posts' && (
                        <motion.div 
                            key="posts"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            {MOCK_POSTS.map((post, idx) => (
                                <div key={post.id} className="bg-[var(--theme-card)]/80 backdrop-blur-3xl rounded-3xl border-2 border-[var(--theme-border)] p-10 shadow-2xl hover:border-[var(--theme-primary)]/40 transition-all group/post relative overflow-hidden">
                                    <div className="flex items-start justify-between gap-12 relative z-10">
                                        <p className="text-2xl font-black text-[var(--theme-text)] italic tracking-tighter flex-1 leading-snug group-hover/post:text-[var(--theme-primary)] transition-colors uppercase">{post.content}</p>
                                        <div className="flex gap-4">
                                            <button className="w-14 h-14 bg-[var(--theme-bg-alt)] border-2 border-[var(--theme-border)] rounded-2xl flex items-center justify-center text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] hover:border-[var(--theme-primary)]/30 transition-all shadow-inner">
                                                <FiEye size={22} strokeWidth={2.5} />
                                            </button>
                                            <button className="w-14 h-14 bg-[var(--status-error-soft)] border-2 border-[var(--status-error)]/10 rounded-2xl flex items-center justify-center text-[var(--status-error)] hover:bg-[var(--status-error)] hover:text-white transition-all shadow-inner">
                                                <FiXCircle size={22} strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-8 mt-10 relative z-10 pt-8 border-t-2 border-dashed border-[var(--theme-border)]/50">
                                        <span className="text-sm font-black text-[var(--theme-text-muted)] opacity-40 italic flex items-center gap-4"><FiActivity className="text-[var(--theme-primary)]" /> {post.likes} LIKES // {post.comments} COMMENTS</span>
                                        <span className="px-6 py-2 rounded-full bg-[var(--theme-bg-alt)] text-xs font-black uppercase tracking-wider text-[var(--theme-primary)] italic border-2 border-[var(--theme-border)] shadow-inner">{post.visibility.toUpperCase()}</span>
                                        <span className="text-xs font-black text-[var(--theme-text-muted)] opacity-20 ml-auto italic tabular-nums">{post.time.toUpperCase()}</span>
                                    </div>
                                    <FiHash size={200} className="absolute bottom-[-50px] right-[-50px] text-[var(--theme-text)] opacity-[0.015] -rotate-12 group-hover/post:rotate-0 transition-transform duration-700 pointer-events-none" />
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {activeTab === 'reports' && (
                        <motion.div 
                            key="reports"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[var(--theme-card)]/80 backdrop-blur-3xl rounded-[4rem] border-2 border-[var(--theme-border)] p-20 shadow-2xl text-center relative overflow-hidden group/shield"
                        >
                            <div className="w-32 h-32 mx-auto rounded-full bg-[var(--status-success-soft)] flex items-center justify-center mb-10 border-4 border-[var(--status-success)]/10 shadow-2xl relative overflow-hidden group/ava-shield">
                                <FiShield size={50} className="text-[var(--status-success)] relative z-10 animate-pulse" strokeWidth={3} />
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
                            </div>
                            <h3 className="text-4xl font-black text-[var(--theme-text)] uppercase tracking-tighter italic leading-none mb-4">NO_ANOMALIES_DETECTED</h3>
                            <p className="text-sm text-[var(--theme-text-muted)] font-black uppercase tracking-widest italic opacity-40 leading-relaxed border-t-2 border-dashed border-[var(--theme-border)]/50 pt-8 mx-12">User node maintains absolute architectural integrity within the sphere protocols.</p>
                            <FiHash size={400} className="absolute bottom-[-100px] left-[-100px] text-[var(--theme-text)] opacity-[0.01] -rotate-12 group-hover/shield:rotate-0 transition-transform duration-[15s] pointer-events-none" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

function ActionButton({ onClick, loading, icon, label, color, disabled }) {
    return (
        <button
            onClick={onClick}
            disabled={loading || disabled}
            className={`flex-1 min-w-[180px] px-8 py-5 rounded-2xl border-2 flex items-center justify-center gap-6 text-xs font-black uppercase tracking-wider italic shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-20 disabled:grayscale`}
            style={{ 
                color: color, 
                borderColor: `${color}40`, 
                backgroundColor: `${color}08`,
                boxShadow: loading ? `0 0 20px ${color}40` : 'none'
            }}
        >
            {loading ? <FiLoader className="animate-spin" size={16} strokeWidth={3} /> : React.cloneElement(icon, { size: 18, strokeWidth: 3 })}
            {label}
        </button>
    );
}

function StatMetric({ label, value, icon }) {
    return (
        <div className="space-y-2 group/metric">
            <div className="flex items-center gap-4 text-xs font-black text-[var(--theme-text-muted)] opacity-30 uppercase tracking-widest italic group-hover/metric:opacity-60 transition-opacity">
                {React.cloneElement(icon, { size: 14, strokeWidth: 3, className: 'text-[var(--theme-primary)]' })} {label}
            </div>
            <p className="text-3xl font-black text-[var(--theme-text)] italic tracking-tighter group-hover/metric:text-[var(--theme-primary)] transition-colors leading-none">{value}</p>
        </div>
    );
}

function QuickInfoCard({ label, value, color }) {
    return (
        <div className="bg-[var(--theme-card)]/80 backdrop-blur-3xl rounded-3xl border-2 border-[var(--theme-border)] p-10 shadow-2xl space-y-4 hover:border-[var(--theme-primary)]/40 transition-all group">
            <p className="text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] italic opacity-30 leading-none group-hover:text-[var(--theme-primary)] transition-colors">{label}</p>
            <div className="flex items-center gap-4">
                 <p className="text-2xl font-black uppercase tracking-tighter italic text-[var(--theme-text)] leading-none" style={{ color: color }}>{value.toUpperCase()}</p>
                 {color && <div className="w-2.5 h-2.5 rounded-full animate-pulse shadow-2xl" style={{ backgroundColor: color }} />}
            </div>
        </div>
    );
}








