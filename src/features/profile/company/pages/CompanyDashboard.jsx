import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiBriefcase, FiPlus, FiUsers, FiTrendingUp, FiSearch, 
  FiLayers, FiActivity, FiChevronRight, FiCommand 
} from 'react-icons/fi';
import { useCompany } from '@/services/mutators/useCompany';
import { Helmet } from 'react-helmet-async';

const AnalyticTile = ({ label, value, trend, icon: Icon }) => (
    <div className="bg-[var(--theme-card)] p-10 rounded-3xl border-2 border-[var(--theme-border)] shadow-sm group hover:border-[var(--theme-primary)]/40 transition-all">
        <div className="flex items-center justify-between mb-8 opacity-30 group-hover:opacity-100 transition-opacity">
            <p className="text-xs font-black uppercase tracking-wider text-[var(--theme-text-muted)] italic">{label}</p>
            <div className="p-3 bg-[var(--theme-bg-alt)] border border-[var(--theme-border)] rounded-2xl">
                <Icon size={16} className="text-[var(--theme-primary)]" />
            </div>
        </div>
        <div className="flex items-baseline gap-4">
            <p className="text-6xl font-black text-[var(--theme-text)] italic tracking-tighter leading-none">{value}</p>
            <div className="flex flex-col gap-1">
                <span className="text-xs font-black text-[var(--status-success)] uppercase tracking-widest animate-pulse">{trend}</span>
                <div className="h-1 w-full bg-[var(--status-success)] opacity-20 rounded-full" />
            </div>
        </div>
    </div>
);

const CompanyDashboard = () => {
    const navigate = useNavigate();
    const { useMyCompany, useCompanyAnalytics } = useCompany();
    const { data: company } = useMyCompany();
    const { data: analytics } = useCompanyAnalytics(company?.slug);

    const stats = [
        { label: 'Uplink_Discovery', value: '412', trend: '+12%', icon: FiActivity },
        { label: 'Profile_Intersects', value: '82', trend: '+5%', icon: FiSearch },
        { label: 'Verified_Assets', value: company?.verified_hires || '14', trend: 'STABLE', icon: FiUsers },
    ];

    return (
        <div className="min-h-screen bg-[var(--theme-bg)] theme-community font-body flex flex-col selection:bg-[var(--theme-primary)]/30">
            <Helmet>
                <title>Ops Board | GzoneSphere</title>
            </Helmet>

            <div className="bg-[var(--theme-card)]/50 backdrop-blur-3xl border-b-2 border-[var(--theme-border)] sticky top-0 z-20 px-6 lg:px-12 py-6">
                <div className="max-w-[1700px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-[1.8rem] bg-[var(--theme-text)] text-[var(--theme-bg)] flex items-center justify-center shadow-xl shadow-black/10">
                            <FiBriefcase size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest text-[var(--theme-primary)] italic leading-none mb-2">Operational_Command.v1</p>
                            <h1 className="text-2xl font-black uppercase text-[var(--theme-text)] italic tracking-tighter leading-none">{company?.name || 'INITIALIZING...'}</h1>
                        </div>
                    </div>
                    <button 
                        onClick={() => navigate('/company/challenges/new')}
                        className="gzs-btn-primary !px-10 !py-4 flex items-center gap-4 italic"
                    >
                        <FiPlus size={16} strokeWidth={3} /> INITIALIZE_HIRE_CHALLENGE
                    </button>
                </div>
            </div>

            <main className="flex-1 max-w-[1700px] mx-auto w-full pb-48 px-6 lg:px-12 pt-16 space-y-24">
                {/* custom container: max-w-[1700px] — intentionally wider than 1280px page-container standard */}

                {/* Analytics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map(stat => <AnalyticTile key={stat.label} {...stat} />)}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Active Missions (Left/8) */}
                    <div className="lg:col-span-8 space-y-12">
                        <div className="flex items-center justify-between px-4">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-6 bg-[var(--theme-secondary)] rounded-full" />
                                <h3 className="text-2xl font-black uppercase tracking-tighter text-[var(--theme-text)] italic leading-none">Active_Hiring_Matrix</h3>
                            </div>
                            <button className="text-xs font-black text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] uppercase tracking-wider italic transition-colors">HISTORY_LOGS_04.RC</button>
                        </div>

                        <div className="space-y-6">
                            {[1, 2].map((i) => (
                                <div 
                                    key={i}
                                    onClick={() => navigate(`/company/challenges/CHG-00${i}`)}
                                    className="p-10 bg-[var(--theme-card)]/50 border-2 border-[var(--theme-border)] rounded-[4rem] group cursor-pointer hover:border-[var(--theme-primary)]/40 hover:bg-[var(--theme-card)] transition-all shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-12"
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <span className="px-3 py-1 rounded-lg bg-[var(--theme-primary)]/5 border border-[var(--theme-primary)]/20 text-xs font-black uppercase text-[var(--theme-primary)]">DEV_ARCHITECTURE</span>
                                            <span className="w-1 h-1 rounded-full bg-[var(--theme-border)]" />
                                            <span className="text-xs font-black uppercase text-[var(--theme-text-muted)] italic opacity-60">ID: SHG-00{i}-X9</span>
                                        </div>
                                        <h3 className="text-3xl font-black uppercase text-[var(--theme-text)] group-hover:text-[var(--theme-primary)] transition-colors italic tracking-tighter leading-none">UI_Systems_Architect_Lead</h3>
                                        <div className="flex items-center gap-8">
                                            <div className="flex items-center gap-3">
                                                <FiActivity size={14} className="text-[var(--theme-primary)]" />
                                                <span className="text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] italic opacity-60">24 SUBMISSIONS</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <FiUsers size={14} className="text-[var(--theme-primary)]" />
                                                <span className="text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] italic opacity-60">12 SHORTLISTED</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <span className="block text-xs font-black text-[var(--status-success)] uppercase tracking-wide italic mb-1">EVALUATING.exe</span>
                                            <div className="h-1 w-24 bg-[var(--status-success)]/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-[var(--status-success)] w-3/4 animate-pulse" />
                                            </div>
                                        </div>
                                        <div className="w-16 h-16 rounded-3xl bg-[var(--theme-bg-alt)] border-2 border-[var(--theme-border)] flex items-center justify-center text-[var(--theme-text-muted)] group-hover:bg-[var(--theme-primary)] group-hover:text-white group-hover:scale-110 transition-all">
                                            <FiChevronRight size={24} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Tactics (Right/4) */}
                    <div className="lg:col-span-4 space-y-12">
                         <div className="flex items-center gap-4 px-4">
                                <div className="w-1.5 h-6 bg-[var(--theme-text)] rounded-full" />
                                <h3 className="text-2xl font-black uppercase tracking-tighter text-[var(--theme-text)] italic leading-none">Tactical_Shortcuts</h3>
                        </div>

                        <div className="space-y-6">
                             <div 
                                onClick={() => navigate('/discover/talent')}
                                className="p-10 bg-[var(--theme-text)] rounded-3xl text-[var(--theme-bg)] group cursor-pointer hover:scale-[1.02] transition-all shadow-2xl shadow-black/20 relative overflow-hidden"
                             >
                                <div className="relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-8 border border-white/10 group-hover:rotate-12 transition-transform">
                                        <FiSearch size={24} />
                                    </div>
                                    <h3 className="text-xl font-black uppercase text-white mb-2 italic tracking-tight">Talent_Uplink</h3>
                                    <p className="text-sm text-white/40 mb-8 font-medium italic leading-relaxed">Execute advanced search queries for verified domain specialists.</p>
                                    <p className="text-xs font-black text-[var(--theme-primary)] uppercase tracking-wider italic leading-none group-hover:translate-x-2 transition-transform">INITIATE_SESSION →</p>
                                </div>
                                <FiCommand size={200} className="absolute bottom-[-50px] right-[-50px] text-white/5 -rotate-12" />
                             </div>

                             <div 
                                onClick={() => navigate('/company/team-builder')}
                                className="p-10 bg-[var(--theme-card)]/50 border-2 border-[var(--theme-border)] rounded-3xl group cursor-pointer hover:border-[var(--theme-primary)]/40 hover:bg-[var(--theme-card)] transition-all shadow-sm relative overflow-hidden"
                             >
                                <div className="w-14 h-14 rounded-2xl bg-[var(--theme-primary)] text-white flex items-center justify-center mb-8 shadow-xl shadow-[var(--theme-primary)]/20 group-hover:-rotate-12 transition-transform">
                                    <FiLayers size={24} />
                                </div>
                                <h3 className="text-xl font-black uppercase text-[var(--theme-text)] mb-2 italic tracking-tight">Team_Assembler</h3>
                                <p className="text-sm text-[var(--theme-text-muted)] mb-8 font-medium italic leading-relaxed">Model high-performance teams through cross-domain skill synchronization.</p>
                                <p className="text-xs font-black text-[var(--theme-primary)] uppercase tracking-wider italic leading-none group-hover:translate-x-2 transition-transform">EXECUTE_SIMULATION →</p>
                             </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CompanyDashboard;








