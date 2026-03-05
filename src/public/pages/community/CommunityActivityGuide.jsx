import { FiClock, FiStar, FiShield, FiCheckSquare, FiAward  } from 'react-icons/fi';

const RANKS = [
    { level: 'Level 1-2', name: 'Beginner', perks: 'Viewing, basic chat.', color: 'text-neutral-500', bg: 'bg-neutral-100', border: 'border-neutral-200' },
    { level: 'Level 3-4', name: 'Hustler', perks: 'Can apply for casual playtests & LFGs.', color: 'text-blue-500', bg: 'bg-blue-100', border: 'border-blue-200' },
    { level: 'Level 5-7', name: 'Expert', perks: 'Can create rooms & accept sponsorships.', color: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-200' },
    { level: 'Level 8-9', name: 'Master', perks: 'Direct monetization & ticketed events.', color: 'text-[#e53935]', bg: 'bg-[#e53935]/10', border: 'border-[#e53935]/20' },
    { level: 'Level 10', name: 'Grandmaster', perks: 'Maximum platform rev-share multiplier.', color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-200' },
];

const CommunityActivityGuide = () => {
    return (
        <div className="flex flex-col h-full bg-neutral-50 overflow-y-auto font-sans">

            {/* ── Header ── */}
            <div className="bg-white border-b border-neutral-200 px-8 py-12 text-center relative overflow-hidden shrink-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-50 blur-[100px] rounded-full pointer-events-none"></div>
                <div className="relative z-10">
                    <span className="inline-block px-3 py-1 bg-[#7C3AED]/10 text-[#7C3AED] text-[10px] font-black rounded-full uppercase tracking-widest shadow-sm mb-4 border border-[#7C3AED]/20">
                        Time & Activity Engine
                    </span>
                    <h1 className="text-4xl font-black text-neutral-900 tracking-tight mb-4">
                        Your Professional Merit
                    </h1>
                    <p className="text-sm text-neutral-500 max-w-xl mx-auto font-medium">
                        Reputation on GzoneSphere cannot be bought with a Pro subscription. It is exclusively earned through consistent engagement and providing value to the community.
                    </p>
                </div>
            </div>

            <div className="p-8 max-w-6xl mx-auto w-full space-y-8">

                {/* ── How it works Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    <div className="bg-white border text-left border-neutral-200 p-6 rounded-xl shadow-sm">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4"><FiClock className="w-5 h-5" /></div>
                        <h3 className="text-base font-black text-neutral-900 mb-2">Time-Weighted</h3>
                        <p className="text-sm text-neutral-500 font-medium leading-relaxed">Passive XP is earned by actively reading, watching reels, and participating in rooms over time. Botting is heavily penalized.</p>
                    </div>
                    <div className="bg-white border text-left border-neutral-200 p-6 rounded-xl shadow-sm">
                        <div className="w-10 h-10 rounded-lg bg-purple-50 text-[#7C3AED] flex items-center justify-center mb-4"><FiStar className="w-5 h-5" /></div>
                        <h3 className="text-base font-black text-neutral-900 mb-2">Peer Validation</h3>
                        <p className="text-sm text-neutral-500 font-medium leading-relaxed">Receiving 'Insightful' or 'Useful' tags on your posts drastically increases your multiplier. Spamming low-effort replies degrades it.</p>
                    </div>
                    <div className="bg-white border text-left border-neutral-200 p-6 rounded-xl shadow-sm">
                        <div className="w-10 h-10 rounded-lg bg-red-50 text-[#e53935] flex items-center justify-center mb-4"><FiShield className="w-5 h-5" /></div>
                        <h3 className="text-base font-black text-neutral-900 mb-2">Gated Mechanics</h3>
                        <p className="text-sm text-neutral-500 font-medium leading-relaxed">Pivotal platform tools—like hosting ticketed groups or accepting brand sponsorships—are hard-locked behind the Expert & Master tiers.</p>
                    </div>
                </div>

                {/* ── Level Progress Example ── */}
                <div className="bg-white border border-neutral-200 p-8 rounded-2xl shadow-sm mt-8 pb-10">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-xl font-black text-neutral-900">Current Rank Tracking</h2>
                            <p className="text-xs text-neutral-500 mt-1 font-bold">This is a global metric across all your active sub-profiles.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-3xl font-black text-[#7C3AED]">LVL 4</span>
                            <span className="text-sm border border-neutral-200 px-2 py-1 bg-neutral-50 rounded font-black tracking-widest uppercase text-neutral-600">Hustler</span>
                        </div>
                    </div>

                    <div className="relative pt-1 pb-4">
                        <div className="overflow-hidden h-3 mb-2 text-xs flex rounded-full bg-neutral-100">
                            <div style={{ width: "65%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#7C3AED] bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.15)_25%,rgba(255,255,255,0.15)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.15)_75%,rgba(255,255,255,0.15)_100%)] bg-[length:1rem_1rem]"></div>
                        </div>
                        <div className="flex items-center justify-between text-xs font-bold text-neutral-400">
                            <span>0 XP</span>
                            <span className="text-[#7C3AED]">1,250 XP to Expert</span>
                            <span>5,000 XP</span>
                        </div>
                    </div>

                    {/* Breakdown */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-neutral-100 text-center">
                        <div>
                            <p className="text-xl font-black text-neutral-900">124</p>
                            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Hours Active</p>
                        </div>
                        <div>
                            <p className="text-xl font-black text-neutral-900">89</p>
                            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Insightful Tags</p>
                        </div>
                        <div>
                            <p className="text-xl font-black text-neutral-900">1.2x</p>
                            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Current Multiplier</p>
                        </div>
                        <div>
                            <p className="text-xl font-black text-neutral-900">12</p>
                            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Rooms Joined</p>
                        </div>
                    </div>
                </div>

                {/* ── Rank ladder ── */}
                <h2 className="text-xl font-black text-neutral-900 mt-12 mb-6 text-center">Platform Rank Journey</h2>
                <div className="space-y-4 max-w-3xl mx-auto">
                    {RANKS.map((rank, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row md:items-center gap-4 bg-white border border-neutral-200 p-4 rounded-xl shadow-sm hover:border-[#7C3AED]/30 transition-colors">
                            <div className={`w-16 h-16 shrink-0 rounded-lg flex items-center justify-center font-black text-xl border ${rank.bg} ${rank.color} ${rank.border}`}>
                                {rank.level.replace('Level ', '')}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-black text-neutral-900 text-lg">{rank.name}</h4>
                                <p className="text-xs text-neutral-500 font-medium">{rank.perks}</p>
                            </div>
                            <div className="shrink-0 flex items-center">
                                {idx <= 1 ? (
                                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded font-black tracking-widest uppercase"><FiCheckSquare className="inline mr-1" /> Unlocked</span>
                                ) : (
                                    <span className="text-[10px] bg-neutral-100 text-neutral-400 px-2 py-1 rounded font-black tracking-widest uppercase"><FiAward className="inline mr-1" /> Locked</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default CommunityActivityGuide;
