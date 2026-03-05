import { useState } from 'react';
import { useCommunityPermissions } from '@context/CommunityPermissionsContext';

const CreatorReels = () => {
    const [activeTab, setActiveTab] = useState('Featured');
    const { can } = useCommunityPermissions();

    return (
        <div className="flex flex-col h-full bg-neutral-50 overflow-y-auto text-neutral-900 font-sans">

            {/* 1. Sticky Context Bar */}
            <div className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-neutral-200 p-3 flex justify-between items-center px-6 shadow-sm">
                <div className="flex items-center gap-3">
                    <span className="text-xl font-black bg-gradient-to-r from-[#7C3AED] to-purple-400 bg-clip-text text-transparent uppercase tracking-widest">CREATORS</span>
                    <span className="text-neutral-500 text-xs font-semibold uppercase tracking-widest border-l border-neutral-200 pl-3">Proof-Based Engine</span>
                </div>
                <div className="text-[10px] font-black tracking-widest text-neutral-400 flex flex-col items-end uppercase">
                    <span>Daily Limit: <span className="text-[#e53935]">2/3 Uploaded</span></span>
                    <span className="text-neutral-500">Expert Level Cap</span>
                </div>
            </div>

            {/* 2. Menu / Filters */}
            <div className="flex px-6 pt-4 pb-2 border-b border-neutral-200 gap-4 bg-white shadow-sm">
                {['Featured', 'Breakdowns', 'Process', 'Opportunities'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded text-[10px] uppercase font-black tracking-widest transition-colors ${activeTab === tab
                            ? 'bg-[#7C3AED] text-white shadow-md'
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* 3. The Feed Structure */}
            <div className="flex flex-col items-center py-10 space-y-14">

                {/* Mock Reel Component 1 - Educational Breakdown */}
                <div className="relative w-full max-w-sm md:max-w-md aspect-[9/16] bg-neutral-900 rounded-3xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] flex flex-col justify-end border-4 border-white">

                    <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />

                    <div className="absolute top-4 right-4 flex flex-col gap-4 z-20">
                        <button
                            disabled={!can('engage')}
                            className={`shadow-md p-3.5 rounded-full transition-colors tooltip ${can('engage') ? 'bg-white/90 hover:text-[#7C3AED] text-neutral-600' : 'bg-white/50 text-neutral-400 cursor-not-allowed'}`}
                            title={can('engage') ? "Mark Useful" : "Read-only mode"}
                        >
                            <FiThumbsUp className="w-5 h-5" />
                        </button>
                        <button
                            disabled={!can('engage')}
                            className={`shadow-md p-3.5 rounded-full transition-colors tooltip ${can('engage') ? 'bg-white/90 hover:text-[#e53935] text-neutral-600' : 'bg-white/50 text-neutral-400 cursor-not-allowed'}`}
                            title={can('engage') ? "Insightful" : "Read-only mode"}
                        >
                            <FiTarget className="w-5 h-5" />
                        </button>
                        <button
                            className="bg-white/90 shadow-md p-3.5 rounded-full hover:text-blue-500 text-neutral-600 transition-colors tooltip" title="Save to Vault"
                        >
                            <FiBookmark className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Overlay UI */}
                    <div className="relative z-10 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                        {/* Category */}
                        <span className="inline-block px-2 py-1 bg-[#7C3AED] text-white rounded text-[10px] font-black uppercase tracking-widest mb-3 shadow">
                            BREAKDOWN
                        </span>
                        <h3 className="text-xl font-black mb-1 line-clamp-2 text-white leading-tight">How to optimize collision networks in Unreal Engine 5.2</h3>

                        <p className="text-sm text-neutral-300 font-medium mb-4 line-clamp-2">Using Chaos Physics vs legacy systems to double client-side frame pacing.</p>

                        <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black">Z</div>
                            <div>
                                <p className="font-bold flex items-center gap-1 text-sm text-white">Zack Dev <span className="text-blue-400 text-xs">✓</span></p>
                                <div className="text-[10px] text-neutral-400 flex items-center gap-1 uppercase tracking-widest font-black">
                                    <span className="text-[#7C3AED]">Master</span> • Game Dev
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Opportunity Card (Injected natively into feed) */}
                <div className="w-full max-w-sm md:max-w-md bg-white border-2 border-[#7C3AED]/20 hover:border-[#7C3AED] rounded-3xl p-8 transition-all shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 blur-3xl rounded-full"></div>
                    <div className="relative z-10">
                        <span className="text-[#7C3AED] text-[10px] font-black uppercase tracking-widest mb-3 block border border-[#7C3AED]/30 inline-block px-2 py-1 rounded">Campaign Broadcast</span>
                        <h3 className="text-2xl font-black mb-2 text-neutral-900 leading-tight">Looking for 5 Unity Devlog Creators</h3>
                        <p className="text-neutral-500 text-sm mb-6 font-medium">Epic Games is seeking "Hustler" level devs to document their transition to our new API package.</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="bg-neutral-100 text-neutral-700 text-[10px] tracking-widest uppercase font-black px-3 py-1.5 rounded shadow-sm border border-neutral-200">Dev Profile</span>
                            <span className="bg-neutral-100 text-neutral-700 text-[10px] tracking-widest uppercase font-black px-3 py-1.5 rounded shadow-sm border border-neutral-200">Unity API</span>
                        </div>
                        <button
                            disabled={!can('chat')}
                            className={`w-full shadow-md py-3.5 rounded-lg font-black tracking-widest uppercase text-white transition-colors 
                                ${can('chat') ? 'bg-[#7C3AED] hover:bg-purple-600' : 'bg-neutral-300 cursor-not-allowed'}`}
                            title={!can('chat') ? "You cannot apply without the right sub-profile" : ""}
                        >
                            {can('chat') ? 'Apply for Brief' : 'Profile Required'}
                        </button>
                    </div>
                </div>

                {/* Mock Reel Component 2 - Sponsored Tag Example */}
                <div className="relative w-full max-w-sm md:max-w-md aspect-[9/16] bg-neutral-900 rounded-3xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] flex flex-col justify-end border-4 border-white">

                    <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"></div>

                    {/* Hardcoded Sponsored Banner */}
                    <div className="absolute top-0 left-0 right-0 bg-[#e53935] text-white shadow-md text-center py-2.5 font-black tracking-widest text-[10px] uppercase z-30 flex items-center justify-center gap-2">
                        🤝 Sponsored by Intel Gaming
                    </div>

                    <div className="absolute top-16 right-4 flex flex-col gap-4 z-20">
                        <button
                            disabled={!can('engage')}
                            className={`shadow-md p-3.5 rounded-full transition-colors tooltip ${can('engage') ? 'bg-white/90 hover:text-[#7C3AED] text-neutral-600' : 'bg-white/50 text-neutral-400 cursor-not-allowed'}`}
                            title={can('engage') ? "Mark Useful" : "Read-only mode"}
                        >
                            <FiThumbsUp className="w-5 h-5" />
                        </button>
                        <button
                            disabled={!can('engage')}
                            className={`shadow-md p-3.5 rounded-full transition-colors tooltip ${can('engage') ? 'bg-white/90 hover:text-[#e53935] text-neutral-600' : 'bg-white/50 text-neutral-400 cursor-not-allowed'}`}
                            title={can('engage') ? "Insightful" : "Read-only mode"}
                        >
                            <FiTarget className="w-5 h-5" />
                        </button>
                        <button
                            className="bg-white/90 shadow-md p-3.5 rounded-full hover:text-blue-500 text-neutral-600 transition-colors tooltip" title="Save to Vault"
                        >
                            <FiBookmark className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="relative z-10 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                        <span className="inline-block px-2 py-1 bg-blue-600 text-white rounded text-[10px] font-black uppercase tracking-widest mb-3 shadow">
                            PROCESS
                        </span>
                        <h3 className="text-xl font-black mb-1 line-clamp-2 text-white leading-tight">How we achieved 240FPS on the Intel 14th Gen Arc system</h3>
                        <p className="text-sm text-neutral-300 font-medium mb-4 line-clamp-2">A technical dive into hardware rendering optimizations.</p>

                        <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                            <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-black">N</div>
                            <div>
                                <p className="font-bold flex items-center gap-1 text-sm text-white">NVIDIA Crew <span className="text-blue-400 text-xs">✓</span></p>
                                <div className="text-[10px] text-neutral-400 flex items-center gap-1 uppercase tracking-widest font-black">
                                    <span className="text-[#e53935]">Grandmaster</span> • Creator
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CreatorReels;
