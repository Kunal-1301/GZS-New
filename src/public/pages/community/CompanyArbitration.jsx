import { useState } from 'react';
import { FiAlertCircle, FiFileText, FiMessageSquare, FiShield } from 'react-icons/fi';
import { FaGavel } from 'react-icons/fa';

const DISPUTES = [
    {
        id: 'DSP-771',
        type: 'MISSING DELIVERABLES',
        party: 'Marcus Bell',
        commission: 'COM-002',
        date: 'Mar 02, 2026',
        status: 'UNDER REVIEW',
        priority: 'HIGH'
    }
];

export default function CompanyArbitration() {
    return (
        <div className="flex flex-col h-full bg-[var(--theme-bg)] theme-community overflow-y-auto font-body">
            {/* ── Header ── */}
            <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[var(--theme-border)] px-8 py-6 shadow-sm">
                <div className="max-w-4xl mx-auto">
                    <h1 className="gzs-h1 !text-2xl uppercase tracking-tight font-black flex items-center gap-3">
                        Arbitration Council <span className="text-xs font-black text-white bg-gray-900 px-2 py-1 rounded">FORCE TRUTH</span>
                    </h1>
                    <p className="gzs-body-sm !text-xs mt-1">Resolution enforcement for gig-based and communal disputes.</p>
                </div>
            </div>

            <div className="p-8 max-w-4xl mx-auto w-full">

                {/* ── Active Disputes ── */}
                <div className="mb-12">
                    <h2 className="gzs-h2 !text-lg !tracking-tight uppercase mb-6">Active Flagged Transactions</h2>

                    <div className="space-y-4">
                        {DISPUTES.map(dsp => (
                            <div key={dsp.id} className="bg-white border-2 border-red-50 rounded-3xl p-8 shadow-sm">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 shrink-0">
                                            <FiAlertCircle className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <span className="text-[9px] font-black bg-red-50 text-red-700 px-2 py-1 rounded border border-red-100 uppercase tracking-widest">{dsp.priority} PRIORITY</span>
                                            <h3 className="text-xl font-black mt-2">{dsp.type}</h3>
                                            <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Dispute with {dsp.party} • {dsp.commission}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Opened: {dsp.date}</span>
                                        <p className="text-[10px] font-black text-orange-600 uppercase mt-2 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">{dsp.status}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                    <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-3 opacity-60">
                                        <FiFileText className="w-4 h-4 text-gray-400" />
                                        <p className="text-[10px] font-black uppercase tracking-widest">Scope Contract</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-3 opacity-60">
                                        <FiMessageSquare className="w-4 h-4 text-gray-400" />
                                        <p className="text-[10px] font-black uppercase tracking-widest">Chat History</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-3 opacity-60">
                                        <FiShield className="w-4 h-4 text-gray-400" />
                                        <p className="text-[10px] font-black uppercase tracking-widest">Escrow Logs</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button className="flex-1 gzs-btn-primary !py-3 !text-[10px] !rounded-xl !flex items-center justify-center gap-2">
                                        <FaGavel className="w-4 h-4" /> SUBMIT EVIDENCE FOR ARBITRATION
                                    </button>
                                    <button className="px-8 py-3 bg-gray-50 text-[10px] font-black rounded-xl border border-gray-100 uppercase hover:bg-gray-100 transition-colors">Resolve Amicably</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Reputation Impact ── */}
                <div className="bg-gray-900 rounded-[2.5rem] p-12 text-white shadow-2xl">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-600/20">
                            <FiAlertCircle className="w-7 h-7 text-white" />
                        </div>
                        <h2 className="text-xl font-black uppercase tracking-tight">Reputation Penalty System</h2>
                    </div>

                    <div className="space-y-8">
                        <p className="text-sm font-medium text-white/60 leading-relaxed">
                            Parties found at fault in the Arbitration Council receive a permanent "Strike" recorded in the Audit layer. This degrades visibility in Discovery and locks Commission privileges for 30 days.
                        </p>

                        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-2">Standard Strike</p>
                                <p className="text-xs font-bold text-white/80">-15% Visibility • Lock Commissions</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-700 mb-2">Final Strike</p>
                                <p className="text-xs font-bold text-white/80">Permanent Delisting • Asset Freeze</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
