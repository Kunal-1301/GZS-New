import { useState } from 'react';
import { FiUsers, FiClock, FiShield, FiSend, FiFileText, FiChevronRight } from 'react-icons/fi';

const PLAYTEST_EVENTS = [
    {
        id: 'PT-902',
        title: 'Extraction Map Beta B',
        date: 'Mar 10 - Mar 12',
        compensation: '50 G-Tokens / Hr',
        testersNeeded: 50,
        testersJoined: 42,
        requirements: 'Diamond Rank in FPS Sub-Profile',
        status: 'ENROLLING'
    },
    {
        id: 'PT-899',
        title: 'Character Ability Balance',
        date: 'Mar 5 - Mar 6',
        compensation: '$25 Cash / Hr',
        testersNeeded: 20,
        testersJoined: 20,
        requirements: '200+ Hours in Competitive Play',
        status: 'ACTIVE'
    }
];

export default function CompanyPlaytests() {
    return (
        <div className="flex flex-col h-full bg-[var(--theme-bg)] theme-community overflow-y-auto font-body">
            {/* ── Header ── */}
            <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[var(--theme-border)] px-8 py-6 shadow-sm">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="gzs-h1 !text-2xl uppercase tracking-tight font-black">Events & Playtests</h1>
                        <p className="gzs-body-sm !text-xs mt-1">Connect with verified players for structured QA & Feedback.</p>
                    </div>
                    <button className="gzs-btn-primary !px-6 !py-2.5 !rounded-xl !text-[11px]">
                        + CREATE TEST CAMPAIGN
                    </button>
                </div>
            </div>

            <div className="p-8 max-w-6xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* ── Campaigns ── */}
                    <div className="space-y-6">
                        <h2 className="gzs-h2 !text-lg !tracking-tight uppercase">Live Campaigns</h2>

                        <div className="space-y-4">
                            {PLAYTEST_EVENTS.map(ev => (
                                <div key={ev.id} className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <span className={`text-[9px] font-black px-2 py-1 rounded border uppercase tracking-widest ${ev.status === 'ENROLLING' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-green-50 text-green-700 border-green-100'}`}>
                                                {ev.status}
                                            </span>
                                            <h3 className="text-xl font-black mt-3">{ev.title}</h3>
                                            <div className="flex items-center gap-3 mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                <span className="flex items-center gap-1.5"><FiClock className="w-3 h-3" /> {ev.date}</span>
                                                <span className="flex items-center gap-1.5"><FiUsers className="w-3 h-3" /> {ev.testersJoined} / {ev.testersNeeded} Testbed</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                                        <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Requirements</p>
                                        <p className="text-xs font-bold text-[var(--theme-text)]">{ev.requirements}</p>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Compensation</p>
                                            <p className="text-sm font-black text-teal-600 uppercase tracking-tight">{ev.compensation}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="px-4 py-2 bg-gray-50 text-[10px] font-black rounded-lg border border-gray-100 uppercase hover:bg-gray-100 transition-colors">Manage Testers</button>
                                            <button className="px-4 py-2 bg-[var(--theme-primary)] text-white text-[10px] font-black rounded-lg uppercase shadow-lg shadow-[var(--theme-primary)]/20">Invite Match</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Automation & NDA Section ── */}
                    <div className="space-y-8">
                        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-[var(--theme-primary)] mb-6">
                                    <FiShield className="w-6 h-6" />
                                </div>
                                <h2 className="gzs-h2 !text-lg mb-4 uppercase tracking-tight">Standardized NDAs</h2>
                                <p className="gzs-body-sm !text-xs font-medium leading-relaxed mb-8">
                                    All testers are required to digitally sign the GzoneSphere Standard NDA. NDA proof is anchored to their Master Profile upon acceptance.
                                </p>
                                <button className="flex items-center gap-3 text-[10px] font-black text-[var(--theme-primary)] uppercase tracking-widest hover:underline">
                                    View Template <FiChevronRight className="w-3 h-3" />
                                </button>
                            </div>
                            {/* Decorative background element */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-50 rounded-full opacity-50" />
                        </div>

                        <div className="bg-gray-950 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <FiSend className="w-5 h-5 text-teal-400" />
                                    <h3 className="text-xs font-black uppercase tracking-widest text-teal-400">Targeted Invitations</h3>
                                </div>
                                <p className="text-2xl font-black mb-4 tracking-tight leading-tight">Match Your Physics & Play-style</p>
                                <p className="text-xs text-white/50 font-medium leading-relaxed mb-8">
                                    Our engine identifies users whose Esports and Play performance data match your game's demographic targets. Higher verified ranks receive priority invites.
                                </p>
                                <div className="flex items-center gap-6">
                                    <div>
                                        <p className="text-xl font-black">1.2k</p>
                                        <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mt-1">Matched Players</p>
                                    </div>
                                    <div className="w-[1px] h-8 bg-white/10" />
                                    <div>
                                        <p className="text-xl font-black">94%</p>
                                        <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mt-1">Response Rate</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
