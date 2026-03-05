import { FiSettings, FiDollarSign, FiUsers, FiPieChart, FiLock } from 'react-icons/fi';

const CommunityCreatorStudio = () => {
    return (
        <div className="flex flex-col h-full bg-neutral-50 overflow-y-auto font-sans">

            {/* ── Studio Header ── */}
            <div className="bg-white border-b border-neutral-200 px-8 py-8 flex items-end justify-between shadow-sm shrink-0">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] bg-[#7C3AED]/10 text-[#7C3AED] px-1.5 py-0.5 rounded font-black tracking-widest uppercase border border-[#7C3AED]/20">Grandmaster</span>
                        <span className="text-[10px] bg-green-500/10 text-green-600 px-1.5 py-0.5 rounded font-black tracking-widest uppercase border border-green-500/20">Monetization Active</span>
                    </div>
                    <h1 className="text-3xl font-black text-neutral-900 tracking-tight flex items-center gap-3">
                        Creator Earnings Studio
                    </h1>
                    <p className="text-neutral-500 text-sm font-medium tracking-wide mt-1">Manage ticketed rooms, direct subscriptions, and platform revenue share.</p>
                </div>
                <button className="hidden md:flex bg-neutral-100 text-neutral-600 hover:text-neutral-900 px-4 py-2 rounded-lg text-xs font-bold tracking-widest transition-colors border border-neutral-200 shadow-sm items-center gap-2">
                    <FiSettings className="w-4 h-4" /> PAYOUT SETTINGS
                </button>
            </div>

            <div className="p-8 max-w-7xl mx-auto w-full space-y-8">

                {/* ── Top Level Payout Metrics ── */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white border text-left border-neutral-200 p-6 rounded-xl shadow-sm col-span-1 md:col-span-2 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-green-50 rounded-full blur-3xl"></div>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded bg-green-100 text-green-600 flex items-center justify-center"><FiDollarSign className="w-4 h-4" /></div>
                                <h3 className="text-[10px] font-black tracking-widest text-neutral-500 uppercase">Current Balance</h3>
                            </div>
                            <div>
                                <h2 className="text-5xl font-black text-neutral-900">$2,450.00</h2>
                                <p className="text-sm font-bold text-neutral-500 mt-2">Next Payout: <span className="text-neutral-900">Nov 1st</span> (via Stripe Connect)</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border text-left border-neutral-200 p-6 rounded-xl shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#7C3AED]/5 rounded-full blur-2xl"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center"><FiUsers className="w-4 h-4" /></div>
                                <h3 className="text-[10px] font-black tracking-widest text-neutral-500 uppercase">Direct Subs</h3>
                            </div>
                            <h2 className="text-3xl font-black text-neutral-900 mt-4">124</h2>
                            <p className="text-xs font-bold text-green-600 mt-1">+12 this month</p>
                        </div>
                    </div>

                    <div className="bg-white border text-left border-neutral-200 p-6 rounded-xl shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center"><FiPieChart className="w-4 h-4" /></div>
                                <h3 className="text-[10px] font-black tracking-widest text-neutral-500 uppercase">Rev Share</h3>
                            </div>
                            <h2 className="text-3xl font-black text-neutral-900 mt-4">+ $450</h2>
                            <p className="text-xs font-bold text-neutral-500 mt-1">Platform Engagement Cut</p>
                        </div>
                    </div>
                </div>

                {/* ── Two Column Layout ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Direct Subscription & Rooms */}
                    <div className="bg-white border text-left border-neutral-200 p-8 rounded-xl shadow-sm pb-10">
                        <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
                            <h3 className="text-lg font-black text-neutral-900">Subscription & Locked Rooms</h3>
                            <button className="text-xs text-[#7C3AED] font-bold uppercase tracking-widest hover:underline">+ New Room</button>
                        </div>

                        <p className="text-sm text-neutral-500 font-medium leading-relaxed mb-6">
                            As a Grandmaster, you can lock strategy rooms or host exclusive AMAs behind a $5/month direct subscription.
                            GzoneSphere takes a 10% fee.
                        </p>

                        <div className="space-y-4">
                            <div className="border border-[#7C3AED]/30 bg-purple-50/30 p-4 rounded-lg flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-[#7C3AED] text-white flex items-center justify-center rounded"><FiLock className="w-4 h-4" /></div>
                                    <div>
                                        <h4 className="font-bold text-neutral-900 text-sm">Elite Portfolio Review Group</h4>
                                        <p className="text-[10px] font-black tracking-widest uppercase text-neutral-500">108 Active Subs • $5.00/mo</p>
                                    </div>
                                </div>
                                <span className="text-green-600 font-black text-sm">+$540/mo</span>
                            </div>

                            <div className="border border-neutral-200 bg-neutral-50 p-4 rounded-lg flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-neutral-200 text-neutral-500 flex items-center justify-center rounded"><FiLock className="w-4 h-4" /></div>
                                    <div>
                                        <h4 className="font-bold text-neutral-900 text-sm">Private Strategy Mentorship</h4>
                                        <p className="text-[10px] font-black tracking-widest uppercase text-neutral-500">16 Active Subs • $20.00/mo</p>
                                    </div>
                                </div>
                                <span className="text-green-600 font-black text-sm">+$320/mo</span>
                            </div>
                        </div>
                    </div>

                    {/* Platform Revenue Share Analytics */}
                    <div className="bg-white border text-left border-neutral-200 p-8 rounded-xl shadow-sm pb-10">
                        <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
                            <h3 className="text-lg font-black text-neutral-900">Platform Engagement Share</h3>
                            <span className="text-[10px] bg-neutral-100 text-neutral-600 px-2 py-1 rounded font-black tracking-widest uppercase">AUTO-CALCULATED</span>
                        </div>

                        <p className="text-sm text-neutral-500 font-medium leading-relaxed mb-6">
                            You hosted the <strong className="text-neutral-700">UE5 Network Systems Architecture</strong> room this month, keeping 1,400 users engaged. GzoneSphere allocates standard platform revenue back to you based on total attention minutes.
                        </p>

                        <div className="bg-neutral-900 rounded-xl p-6 relative overflow-hidden mt-6">
                            {/* Chart Graphic mock */}
                            <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end opacity-20 px-4 space-x-2">
                                <div className="w-1/6 bg-[#7C3AED] h-3"></div>
                                <div className="w-1/6 bg-[#7C3AED] h-6"></div>
                                <div className="w-1/6 bg-[#7C3AED] h-12"></div>
                                <div className="w-1/6 bg-[#7C3AED] h-16"></div>
                                <div className="w-1/6 bg-[#7C3AED] h-10"></div>
                                <div className="w-1/6 bg-[#7C3AED] h-14"></div>
                            </div>

                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Total Engaged Hours</h4>
                                    <p className="text-3xl font-black text-white mt-1">12,405<span className="text-sm text-neutral-500 ml-1 font-bold">hrs</span></p>
                                </div>
                                <div className="text-right">
                                    <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Share Value</h4>
                                    <p className="text-3xl font-black text-green-400 mt-1">+$450</p>
                                </div>
                            </div>
                            <button className="relative z-10 mt-6 w-full text-center border border-neutral-700 text-neutral-300 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors">
                                View Full Analytic Report
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default CommunityCreatorStudio;
