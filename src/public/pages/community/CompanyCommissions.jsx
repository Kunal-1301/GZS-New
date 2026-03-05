import { useState } from 'react';
import { FiDollarSign, FiClock, FiFileText, FiShield, FiCheck } from 'react-icons/fi';

const ACTIVE_COMMISSIONS = [
    {
        id: 'COM-001',
        individual: 'Khali',
        skill: 'Character Modeling',
        amount: '$1,200',
        status: 'ESCROW FUNDED',
        deadline: 'Mar 25, 2026',
        progress: 65,
        truthLayer: 'L3 Collaborative'
    },
    {
        id: 'COM-002',
        individual: 'Marcus Bell',
        skill: 'Sound FX Pack',
        amount: '$650',
        status: 'AWAITING APPROVAL',
        deadline: 'Mar 15, 2026',
        progress: 100,
        truthLayer: 'L2 Validation'
    }
];

export default function CompanyCommissions() {
    return (
        <div className="flex flex-col h-full bg-[var(--theme-bg)] theme-community overflow-y-auto font-body">
            {/* ── Header ── */}
            <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[var(--theme-border)] px-8 py-6 shadow-sm">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="gzs-h1 !text-2xl uppercase tracking-tight font-black">Commission & Escrow Management</h1>
                        <p className="gzs-body-sm !text-xs mt-1">Smart-contracts backed by platform trust scores.</p>
                    </div>
                    <button className="gzs-btn-primary !px-6 !py-2.5 !rounded-xl !text-[11px]">
                        + NEW COMMISSION BRIEF
                    </button>
                </div>
            </div>

            <div className="p-8 max-w-6xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* ── Active Gigs ── */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="gzs-h2 !text-lg !tracking-tight uppercase">In-Progress Verticals</h2>

                        <div className="space-y-4">
                            {ACTIVE_COMMISSIONS.map(gig => (
                                <div key={gig.id} className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={`text-[9px] font-black px-2 py-1 rounded border uppercase tracking-widest ${gig.status === 'ESCROW FUNDED' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-orange-50 text-orange-700 border-orange-100'}`}>
                                                    {gig.status}
                                                </span>
                                                <span className="text-[9px] font-black bg-purple-100 text-[var(--theme-primary)] px-2 py-1 rounded border border-purple-200 uppercase">{gig.truthLayer}</span>
                                            </div>
                                            <h3 className="text-xl font-black">{gig.individual}</h3>
                                            <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">{gig.skill}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-black text-gray-900">{gig.amount}</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase mt-1 tracking-widest">Budget Locked</p>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mb-6">
                                        <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase mb-2">
                                            <span>Milestones</span>
                                            <span>{gig.progress}% Complete</span>
                                        </div>
                                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                            <div className="bg-[var(--theme-primary)] h-full transition-all duration-1000" style={{ width: `${gig.progress}%` }} />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-500">
                                                <FiClock className="w-3 h-3" /> {gig.deadline}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-500">
                                                <FiFileText className="w-3 h-3" /> VIEW DOCS
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <button className="px-5 py-2 bg-gray-50 text-[10px] font-black rounded-lg border border-gray-100 uppercase hover:bg-gray-100 transition-colors">Message</button>
                                            {gig.status === 'AWAITING APPROVAL' && (
                                                <button className="px-5 py-2 bg-green-600 text-white text-[10px] font-black rounded-lg uppercase shadow-lg shadow-green-500/20 flex items-center gap-2">
                                                    <FiCheck className="w-3 h-3" /> RELEASE FUNDS
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Escrow Sidebar ── */}
                    <div className="space-y-6">
                        <div className="bg-[var(--theme-primary)] rounded-[2rem] p-8 text-white shadow-xl shadow-[var(--theme-primary)]/30">
                            <div className="flex items-center gap-3 mb-6">
                                <FiShield className="w-6 h-6" />
                                <h3 className="text-sm font-black uppercase tracking-widest">Escrow Security</h3>
                            </div>
                            <p className="text-5xl font-black mb-2">$1,850</p>
                            <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Total Funds Held</p>

                            <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                    <span>Trust Yield Earned</span>
                                    <span className="text-green-300">+4.2 pts</span>
                                </div>
                                <p className="text-[10px] text-white/50 italic leading-relaxed">
                                    Your trust score increases as you successfully release funds for verified milestones.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
                            <h3 className="text-xs font-black uppercase tracking-widest mb-6">Platform Reputation</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <p className="text-[11px] font-bold">12 Verified Platform Hires</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    <p className="text-[11px] font-bold">0 Active Disputes</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
