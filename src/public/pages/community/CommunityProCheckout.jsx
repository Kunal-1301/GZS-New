import { useState } from 'react';
import { FiCheckCircle, FiStar, FiZap, FiShield, FiTrendingUp } from 'react-icons/fi';

const CommunityProCheckout = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');

    return (
        <div className="flex flex-col h-full bg-neutral-50 overflow-y-auto font-sans">

            {/* ── Header ── */}
            <div className="bg-white border-b border-neutral-200 px-8 py-16 text-center relative overflow-hidden shrink-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#7C3AED]/10 blur-[100px] rounded-full pointer-events-none"></div>
                <div className="relative z-10">
                    <span className="inline-block px-3 py-1 bg-[#7C3AED] text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-sm mb-4">
                        Platform Upgrade
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tight mb-4">
                        GzoneSphere <span className="text-[#7C3AED]">PRO</span>
                    </h1>
                    <p className="text-lg text-neutral-500 max-w-2xl mx-auto font-medium">
                        Unlock advanced career tools, priority pacing, and powerful analytics.
                        Levels and Reputation cannot be bought—Pro strictly amplifies your utility.
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <span className={`text-sm font-bold ${billingCycle === 'monthly' ? 'text-neutral-900' : 'text-neutral-400'}`}>Monthly</span>
                        <button
                            onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
                            className="w-14 h-7 bg-[#7C3AED] rounded-full relative transition-colors focus:outline-none"
                        >
                            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${billingCycle === 'yearly' ? 'left-8' : 'left-1'}`}></div>
                        </button>
                        <span className={`text-sm font-bold flex items-center gap-2 ${billingCycle === 'yearly' ? 'text-neutral-900' : 'text-neutral-400'}`}>
                            Yearly <span className="bg-[#e53935]/10 text-[#e53935] text-[10px] px-2 py-0.5 rounded font-black tracking-widest uppercase">Save 20%</span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="p-8 max-w-6xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 -mt-12">

                    {/* ── Basic Tier (Free) ── */}
                    <div className="bg-white border text-left border-neutral-200 p-8 rounded-2xl shadow-sm flex flex-col pt-12">
                        <h3 className="text-xl font-black text-neutral-900 mb-2">Standard Access</h3>
                        <p className="text-neutral-500 text-sm font-medium mb-6">The core platform for all professionals.</p>
                        <div className="mb-8">
                            <span className="text-4xl font-black text-neutral-900">Free</span>
                        </div>

                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-start gap-3">
                                <FiCheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <span className="text-sm text-neutral-700 font-medium">Global Server Navigation</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FiCheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <span className="text-sm text-neutral-700 font-medium">Earn Levels & Reputation</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FiCheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <span className="text-sm text-neutral-700 font-medium">Standard LFG & Job Boards</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FiCheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <span className="text-sm text-neutral-700 font-medium">Upload up to 2 Creators clips/day</span>
                            </li>
                        </ul>

                        <button className="w-full bg-neutral-100 text-neutral-500 py-3 rounded-lg font-bold uppercase tracking-widest text-sm cursor-not-allowed">
                            Current Plan
                        </button>
                    </div>

                    {/* ── User Pro Tier ── */}
                    <div className="bg-white border-2 text-left border-[#7C3AED] p-8 rounded-2xl shadow-xl flex flex-col relative transform md:-translate-y-4">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#7C3AED] text-white px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow border border-[#6D28D9]">
                            Most Popular
                        </div>

                        <h3 className="text-xl font-black text-[#7C3AED] mb-2 flex items-center gap-2"><FiStar /> User Pro</h3>
                        <p className="text-neutral-500 text-sm font-medium mb-6">For aggressive career growth and creator expansion.</p>
                        <div className="mb-8">
                            <span className="text-4xl font-black text-neutral-900">{billingCycle === 'monthly' ? '$12' : '$115'}</span>
                            <span className="text-neutral-500 font-semibold text-sm"> / {billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                        </div>

                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-start gap-3">
                                <FiZap className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
                                <span className="text-sm text-neutral-700 font-medium">Prior Notifications for Elite Hiring/LFG (1hr head start)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FiZap className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
                                <span className="text-sm text-neutral-700 font-medium">Advanced Portfolio Analytics & Traffic Sources</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FiZap className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
                                <span className="text-sm text-neutral-700 font-medium">Expanded Creator Upload Limits (up to 5/day)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FiZap className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
                                <span className="text-sm text-neutral-700 font-medium">Unlock Direct Earning Features (If Master Rank Reached)</span>
                            </li>
                        </ul>

                        <button className="w-full bg-[#7C3AED] hover:bg-purple-600 text-white py-3 rounded-lg font-black uppercase tracking-widest text-sm transition-colors shadow-md">
                            Upgrade to Pro
                        </button>
                    </div>

                    {/* ── Company Pro Tier ── */}
                    <div className="bg-white border text-left border-blue-200 p-8 rounded-2xl shadow-sm flex flex-col pt-12">
                        <h3 className="text-xl font-black text-blue-600 mb-2 flex items-center gap-2"><FiShield /> Company Pro</h3>
                        <p className="text-neutral-500 text-sm font-medium mb-6">Enterprise talent discovery and premium brand presence.</p>
                        <div className="mb-8">
                            <span className="text-4xl font-black text-neutral-900">{billingCycle === 'monthly' ? '$199' : '$1,900'}</span>
                            <span className="text-neutral-500 font-semibold text-sm"> / {billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                        </div>

                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-start gap-3">
                                <FiTrendingUp className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span className="text-sm text-neutral-700 font-medium">Priority Placement in Opportunity Highlights</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FiTrendingUp className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span className="text-sm text-neutral-700 font-medium">Unlimited Active Hiring & Playtest Cards</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FiTrendingUp className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span className="text-sm text-neutral-700 font-medium">Advanced Talent Filtering by Granular verified skills</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FiTrendingUp className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span className="text-sm text-neutral-700 font-medium">Sponsorship Brief Builder Access</span>
                            </li>
                        </ul>

                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-black uppercase tracking-widest text-sm transition-colors shadow">
                            Upgrade Company
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CommunityProCheckout;
