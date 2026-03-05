import { useCommunityPermissions } from '@context/CommunityPermissionsContext';
import { Link } from 'react-router-dom';
import { FiThumbsUp, FiMessageSquare, FiBookmark, FiZap, FiBriefcase, FiShield, FiActivity } from 'react-icons/fi';

const CommunityGlobalNews = () => {
    const { persona } = useCommunityPermissions();
    return (
        <div className="flex flex-col h-full bg-neutral-50 overflow-y-auto">
            {/* Top Banner */}
            <div className="relative bg-white border-b border-neutral-200 h-64 shrink-0 flex items-center justify-center overflow-hidden">
                {/* Subtle decorative background */}
                <div className="absolute inset-0 bg-neutral-50 opacity-50" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #e5e5e5 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                <div className="absolute top-[-50%] left-[-10%] w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-[-50%] right-[-10%] w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>

                <div className="relative z-10 text-center space-y-4 max-w-2xl px-4">
                    <span className="inline-block px-3 py-1 bg-[#7C3AED]/10 text-[#7C3AED] text-[10px] font-black rounded-full border border-[#7C3AED]/20 uppercase tracking-widest">Global Broadcast</span>
                    <h1 className="text-4xl md:text-5xl font-black text-neutral-900 leading-tight">GzoneSphere v2.0 Platform Integration</h1>
                    <p className="text-neutral-500 text-lg">Cross-disciplinary ecosystem goes live. Unlock new discovery tools across all 7 Career Branches.</p>
                    <button className="mt-4 bg-neutral-900 text-white px-6 py-2.5 rounded shadow-md font-bold hover:bg-[#e53935] transition-colors text-sm tracking-wide">
                        READ FULL PATCH NOTES
                    </button>
                </div>
            </div>

            <div className="p-8 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Feed Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                        <h2 className="text-lg font-black text-neutral-900 flex items-center gap-2 tracking-wide uppercase">
                            <span className="w-2 h-2 rounded-full bg-[#e53935]"></span> All Active News Channel
                        </h2>
                        <select className="bg-white border border-neutral-200 text-neutral-600 rounded text-xs font-bold uppercase tracking-wider px-3 py-1.5 focus:ring-1 focus:ring-[#7C3AED] outline-none">
                            <option>Latest First</option>
                            <option>Highest Impact</option>
                        </select>
                    </div>

                    {/* Dummy Post 1 */}
                    <article className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-neutral-100 rounded flex items-center justify-center font-black text-neutral-800 border border-neutral-200">EG</div>
                            <div>
                                <h3 className="text-neutral-900 font-bold text-sm flex items-center gap-1">Epic Games <span className="text-[#e53935]">✓</span></h3>
                                <p className="text-neutral-500 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 mt-0.5">
                                    <span className="text-purple-600">Cross-Branch Announcement</span> • 2h ago
                                </p>
                            </div>
                        </div>
                        <h4 className="text-xl font-black text-neutral-900 mb-2">Unreal Engine 6 Technical Demo goes Live </h4>
                        <p className="text-neutral-600 mb-5 leading-relaxed text-sm">
                            We are excited to share the upcoming technical demo for UE6. This update bridges the gap between realtime rendering for Game Devs and cinematic pacing for Video Creators. Watch the global livestream here inside GzoneSphere.
                        </p>
                        <div className="flex items-center gap-4 text-xs font-bold text-neutral-500 border-t border-neutral-100 pt-3">
                            <button className="flex items-center gap-1.5 hover:text-[#e53935] transition-colors">
                                <FiThumbsUp className="w-4 h-4" /> 12.4k
                            </button>
                            <button className="flex items-center gap-1.5 hover:text-[#7C3AED] transition-colors">
                                <FiMessageSquare className="w-4 h-4" /> 3.1k
                            </button>
                            <button className="flex items-center gap-1.5 hover:text-neutral-900 transition-colors ml-auto text-neutral-400">
                                <FiBookmark className="w-4 h-4" /> Save Update
                            </button>
                        </div>
                    </article>

                    {/* Dummy Post 2 */}
                    <article className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-[#e53935]/10 rounded flex items-center justify-center font-bold text-[#e53935] border border-[#e53935]/20">
                                <FiZap className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-neutral-900 font-bold text-sm flex items-center gap-1">GzoneSphere Official <span className="text-[#e53935]">✓</span></h3>
                                <p className="text-neutral-500 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 mt-0.5">
                                    <span className="text-[#e53935]">Platform Update</span> • 12h ago
                                </p>
                            </div>
                        </div>
                        <h4 className="text-xl font-black text-neutral-900 mb-2">New Company Sponsorship Flow is active in the Creators Lounge</h4>
                        <p className="text-neutral-600 mb-5 leading-relaxed text-sm">
                            Companies can now structure sponsorship briefs directly through the platform. Influencers/Creators, review the new mandatory tagging rules implemented across the Reels feed to maintain your reliability score.
                        </p>
                        <div className="flex items-center gap-4 text-xs font-bold text-neutral-500 border-t border-neutral-100 pt-3">
                            <button className="flex items-center gap-1.5 hover:text-[#e53935] transition-colors">
                                <FiThumbsUp className="w-4 h-4" /> 4.2k
                            </button>
                            <button className="flex items-center gap-1.5 hover:text-[#7C3AED] transition-colors">
                                <FiMessageSquare className="w-4 h-4" /> 890
                            </button>
                            <button className="flex items-center gap-1.5 hover:text-neutral-900 transition-colors ml-auto text-neutral-400">
                                <FiBookmark className="w-4 h-4" /> Save Update
                            </button>
                        </div>
                    </article>
                </div>

                {/* Right Sidebar - Trending / Opportunities */}
                <div className="space-y-6">

                    <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
                        <h3 className="text-neutral-900 uppercase tracking-widest text-[11px] font-black mb-4 flex items-center gap-2">
                            <FiBriefcase className="w-4 h-4 text-[#7C3AED]" /> CROSS-DISCIPLINE OPPORTUNITIES
                        </h3>

                        <div className="space-y-4">
                            <div className="group cursor-pointer">
                                <span className="text-[10px] font-black tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded uppercase">Hiring</span>
                                <p className="text-neutral-800 text-sm mt-2 font-bold group-hover:text-[#7C3AED] transition-colors leading-snug">Riot Games looking for UE5 Environment Artists & Narrative Directors</p>
                                <p className="text-neutral-400 text-xs mt-1 font-medium">Ends in 3 days</p>
                            </div>

                            <div className="h-px bg-neutral-100 my-4"></div>

                            <div className="group cursor-pointer">
                                <span className="text-[10px] font-black tracking-widest text-purple-600 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded uppercase">Playtest</span>
                                <p className="text-neutral-800 text-sm mt-2 font-bold group-hover:text-[#e53935] transition-colors leading-snug">Closed Beta 2: Project Chronos requires 50 Esports players and 10 Strategy Analysts</p>
                                <p className="text-neutral-400 text-xs mt-1 font-medium">Registration open globally</p>
                            </div>
                        </div>
                    </div>

                    {persona.type === 'company' ? (
                        <div className="bg-blue-600 rounded-xl p-6 border border-blue-700 relative overflow-hidden shadow-lg">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-2xl rounded-full"></div>

                            <h3 className="text-white/80 font-bold text-xs uppercase tracking-widest mb-3 relative z-10 flex items-center gap-2">
                                <FiShield className="w-4 h-4" /> COMPANY TRUST SCORE
                            </h3>
                            <div className="flex items-end gap-2 relative z-10 mb-4">
                                <span className="text-4xl font-black text-white">96</span>
                                <span className="text-blue-200 text-sm font-bold mb-1 uppercase tracking-widest">/100</span>
                            </div>

                            <div className="mt-4 bg-blue-900 rounded-full h-1.5 relative z-10 overflow-hidden">
                                <div className="bg-white h-full w-[96%]"></div>
                            </div>
                            <p className="text-blue-200 text-[10px] mt-3 relative z-10 font-medium tracking-wide">High trust enables Priority Hiring privileges.</p>
                        </div>
                    ) : (
                        <Link to="/community/activity-guide" className="block transform hover:-translate-y-1 transition-transform bg-[#7C3AED] rounded-xl p-6 border border-[#6D28D9] relative overflow-hidden shadow-lg cursor-pointer">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-2xl rounded-full"></div>

                            <h3 className="text-white/80 font-bold text-xs uppercase tracking-widest mb-3 relative z-10 flex items-center gap-2">
                                <FiActivity className="w-4 h-4" /> GLOBAL ACTIVITY SCORE
                            </h3>
                            <div className="flex items-end gap-2 relative z-10 mb-4">
                                <span className="text-4xl font-black text-white">{persona.level || 'Lvl 0'}</span>
                                <span className="text-purple-200 text-sm font-bold mb-1 uppercase tracking-widest">{persona.level || 'Novice'}</span>
                            </div>

                            <div className="mt-4 bg-purple-900 rounded-full h-1.5 relative z-10 overflow-hidden">
                                <div className="bg-white h-full w-2/3"></div>
                            </div>
                            <p className="text-purple-200 text-[10px] mt-3 relative z-10 font-medium tracking-wide">Consistency ensures visibility. Click to view Level Guide.</p>
                        </Link>
                    )}

                </div>

            </div>
        </div>
    );
};

export default CommunityGlobalNews;
