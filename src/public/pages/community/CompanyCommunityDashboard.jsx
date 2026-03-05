import { FiCheckCircle, FiShield, FiActivity, FiTrendingUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const CompanyCommunityDashboard = () => {
    return (
        <div className="flex flex-col h-full bg-[var(--theme-bg)] theme-community overflow-y-auto font-body">
            <Helmet>
                <title>Company Dashboard | GzoneSphere Partner Hub</title>
                <meta name="description" content="Manage your company's presence, hiring opportunities, and sponsorship briefs within the GzoneSphere ecosystem. Connect with verified talent today." />
            </Helmet>
            {/* ── Dashboard Header ── */}
            <div className="sticky top-0 z-40 bg-[var(--theme-card)]/95 backdrop-blur-md border-b border-[var(--theme-border)] px-8 py-6 flex items-center justify-between shadow-sm shrink-0">
                <div>
                    <h1 className="gzs-h1 !text-2xl flex items-center gap-3">
                        Intel Gaming
                        <span className="text-[10px] bg-[#e53935]/10 text-[#e53935] px-2 py-1 rounded font-black tracking-widest uppercase border border-[#e53935]/20 flex items-center gap-1">
                            <FiCheckCircle className="w-3 h-3" /> VERIFIED PARTNER
                        </span>
                    </h1>
                    <p className="gzs-body-sm !font-semibold mt-1">Community Activity & Sponsorship Dashboard</p>
                </div>
            </div>

            <div className="p-8 max-w-6xl mx-auto w-full space-y-8">
                {/* ── Key Metrics Row ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[var(--theme-card)] border text-left border-[var(--theme-border)] border-t-4 border-t-[var(--theme-primary)] p-6 rounded-xl shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] flex items-center justify-center"><FiShield className="w-4 h-4" /></div>
                            <h3 className="gzs-label">Trust Score</h3>
                        </div>
                        <p className="text-3xl font-black text-[var(--theme-text)]">Excellent</p>
                        <p className="text-xs text-green-600 font-bold mt-2">+12 Points this month (No Penalties)</p>
                    </div>

                    <div className="bg-white border text-left border-neutral-200 border-t-4 border-t-blue-500 p-6 rounded-xl shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center"><FiActivity className="w-4 h-4" /></div>
                            <h3 className="text-[10px] font-black tracking-widest text-neutral-500 uppercase">Active Engagements</h3>
                        </div>
                        <p className="text-3xl font-black text-neutral-900">3</p>
                        <p className="text-xs text-neutral-500 font-bold mt-2">2 LFG Posts • 1 Sponsorship Brief</p>
                    </div>

                    <div className="bg-white border text-left border-neutral-200 border-t-4 border-t-green-500 p-6 rounded-xl shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded bg-green-50 text-green-600 flex items-center justify-center"><FiTrendingUp className="w-4 h-4" /></div>
                            <h3 className="gzs-label">Truth Velocity</h3>
                        </div>
                        <p className="text-3xl font-black text-neutral-900">8.4k</p>
                        <p className="text-xs text-neutral-500 font-bold mt-2">Weighted Interaction distribution</p>
                    </div>
                </div>

                {/* ── INTERACTION LOOPS ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link to="/community/talent-discovery" className="p-4 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-xl hover:border-[var(--theme-primary)] transition-all group">
                        <p className="text-[10px] font-black uppercase text-[var(--theme-text-muted)] group-hover:text-[var(--theme-primary)]">Talent Discovery</p>
                        <p className="text-lg font-black mt-1">Hire Creators</p>
                    </Link>
                    <Link to="/community/commissions" className="p-4 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-xl hover:border-[var(--theme-primary)] transition-all group">
                        <p className="text-[10px] font-black uppercase text-[var(--theme-text-muted)] group-hover:text-[var(--theme-primary)]">Commissions</p>
                        <p className="text-lg font-black mt-1">Gig Marketplace</p>
                    </Link>
                    <Link to="/community/playtests" className="p-4 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-xl hover:border-[var(--theme-primary)] transition-all group">
                        <p className="text-[10px] font-black uppercase text-[var(--theme-text-muted)] group-hover:text-[var(--theme-primary)]">Playtests & QA</p>
                        <p className="text-lg font-black mt-1">User Testing</p>
                    </Link>
                    <Link to="/community/arbitration" className="p-4 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-xl hover:border-[var(--theme-primary)] transition-all group">
                        <p className="text-[10px] font-black uppercase text-[var(--theme-text-muted)] group-hover:text-[var(--theme-primary)]">Disputes</p>
                        <p className="text-lg font-black mt-1">Center of Truth</p>
                    </Link>
                </div>

                {/* ── Main Dashboard Content ── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="gzs-h2 !text-lg !tracking-tight">Active Opportunities</h2>

                        <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-xl shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-[var(--theme-border)] flex items-center justify-between hover:bg-[var(--theme-bg-alt)] transition-colors">
                                <div>
                                    <span className="text-[10px] font-black tracking-widest text-[var(--theme-primary)] bg-[var(--theme-primary)]/10 px-2 py-0.5 rounded border border-[var(--theme-primary)]/20 uppercase">Sponsorship Brief</span>
                                    <h3 className="text-[var(--theme-text)] font-bold mt-2 text-lg">Intel 14th Gen Arc Coverage</h3>
                                    <p className="gzs-body-sm mt-1">Creator Reels • Targeting Grandmaster Level</p>
                                </div>
                                <div className="text-right">
                                    <span className="block text-2xl font-black text-[var(--theme-text)] leading-none">4</span>
                                    <span className="text-[10px] font-bold text-[var(--theme-text-muted)] uppercase tracking-widest">Applications</span>
                                </div>
                            </div>

                            <div className="p-6 flex items-center justify-between hover:bg-[var(--theme-bg-alt)] transition-colors">
                                <div>
                                    <span className="text-[10px] font-black tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase">Hiring</span>
                                    <h3 className="text-[var(--theme-text)] font-bold mt-2 text-lg">Hardware Engineer</h3>
                                    <p className="gzs-body-sm mt-1">Game Dev Branch • Targeting Expert Level</p>
                                </div>
                                <div className="text-right">
                                    <span className="block text-2xl font-black text-[var(--theme-text)] leading-none">12</span>
                                    <span className="text-[10px] font-bold text-[var(--theme-text-muted)] uppercase tracking-widest">Resumes</span>
                                </div>
                            </div>
                        </div>

                        <Link to="/community/brief-builder" className="gzs-btn-primary block w-full mt-4 text-center">
                            + Create New Opportunity
                        </Link>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-lg font-black text-neutral-900 tracking-tight">Compliance Log</h2>
                        <div className="bg-neutral-100 border border-neutral-200 rounded-xl p-6">
                            <p className="text-xs text-neutral-500 font-medium mb-4">
                                Companies cannot participate in social chatter. This log tracks automated engagements.
                            </p>
                            <div className="space-y-4">
                                <div className="relative pl-4 border-l-2 border-green-500">
                                    <p className="text-xs font-bold text-neutral-900">Sponsorship Approved</p>
                                    <p className="text-[10px] text-neutral-500">NVIDIA Crew accepted brief. Sub-Profile attached.</p>
                                    <span className="text-[10px] text-neutral-400 top-0 right-0 absolute">2d ago</span>
                                </div>
                                <div className="relative pl-4 border-l-2 border-blue-500">
                                    <p className="text-xs font-bold text-neutral-900">Hiring Post Live</p>
                                    <p className="text-[10px] text-neutral-500">Hardware Engineer card pushed to Game Dev branch.</p>
                                    <span className="text-[10px] text-neutral-400 top-0 right-0 absolute">4d ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyCommunityDashboard;
