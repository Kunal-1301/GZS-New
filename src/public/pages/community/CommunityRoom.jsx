import { useParams, Link } from 'react-router-dom';
import { useCommunityPermissions } from '@context/CommunityPermissionsContext';
import { FiArrowLeft, FiUsers, FiStar, FiMessageCircle, FiLock } from 'react-icons/fi';
const CommunityRoom = () => {
    const { branchId, roomId } = useParams();
    const { persona, can } = useCommunityPermissions();

    // For this specific 'Expert+ Gated' room example
    const meetsRoomLevel = ['Expert', 'Master', 'Grandmaster'].includes(persona.level);
    const canChatInThisRoom = can('chat') && meetsRoomLevel;

    return (
        <div className="flex flex-col h-full bg-neutral-50 font-sans">
            {/* ── Room Header ── */}
            <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 px-6 py-4 flex items-center justify-between shadow-sm shrink-0">
                <div className="flex items-center gap-4">
                    <Link to={`/community/${branchId}`} className="w-8 h-8 flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-lg transition-colors">
                        <FiArrowLeft />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] bg-[#7C3AED]/10 text-[#7C3AED] px-1.5 py-0.5 rounded font-black tracking-widest uppercase border border-[#7C3AED]/20">Expert+ Gated</span>
                            <h1 className="text-xl font-black text-neutral-900 tracking-tight">Gameplay Systems Breakdown</h1>
                        </div>
                        <p className="text-neutral-500 text-xs font-semibold tracking-wide mt-1 flex items-center gap-2">
                            <span>Host: <span className="text-[#7C3AED]">Master Dev</span></span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><FiUsers className="w-3 h-3" /> 124 Participants</span>
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="hidden md:flex bg-neutral-100 text-neutral-600 hover:text-neutral-900 px-4 py-2 rounded-lg text-xs font-bold tracking-widest transition-colors border border-neutral-200 shadow-sm items-center gap-2">
                        <FiStar className="w-4 h-4" /> WATCH TOPIC
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden max-w-7xl mx-auto w-full">
                {/* ── Main Chat Area ── */}
                <main className="flex-1 bg-white flex flex-col border-x border-neutral-200 shadow-sm">
                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {/* System Message */}
                        <div className="text-center">
                            <span className="bg-purple-50 text-[#7C3AED] text-xs font-bold px-3 py-1 rounded-full border border-purple-100">
                                This is an Expert-level room. Low-effort posts will result in level demerits.
                            </span>
                        </div>

                        {/* Message 1 */}
                        <div className="flex gap-4 group mt-8">
                            <div className="w-10 h-10 rounded-full bg-[#7C3AED] flex items-center justify-center text-white font-black shrink-0 border border-[#6D28D9] shadow-sm">
                                MD
                            </div>
                            <div>
                                <div className="flex items-baseline gap-2 mb-0.5">
                                    <h4 className="font-bold text-neutral-900 text-sm flex items-center gap-1">Master Dev <span className="text-[10px] text-blue-500" title="Host">👑</span></h4>
                                    <span className="text-[10px] bg-[#7C3AED]/10 text-[#7C3AED] px-1.5 py-0.5 rounded font-black tracking-widest uppercase border border-[#7C3AED]/20">Master</span>
                                    <span className="text-xs text-neutral-400 font-medium ml-1">Today at 1:00 PM</span>
                                </div>
                                <div className="text-neutral-700 text-sm leading-relaxed p-4 bg-neutral-50 rounded-lg border border-neutral-100 mt-2">
                                    <p className="font-bold text-neutral-900 mb-2">Topic Starter:</p>
                                    I wanted to open a discussion about managing collision networks dynamically. We've seen a massive performance hit when instantiating over 1,000 projectiles concurrently using legacy physics components.
                                    <br /><br />
                                    Is anyone currently leveraging Chaos Physics in production for this scale?
                                </div>
                            </div>
                        </div>

                        {/* Message 2 */}
                        <div className="flex gap-4 group mt-4">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black shrink-0 border border-blue-200">
                                A
                            </div>
                            <div>
                                <div className="flex items-baseline gap-2 mb-0.5">
                                    <h4 className="font-bold text-neutral-900 text-sm">Alex_Senior</h4>
                                    <span className="text-[10px] bg-neutral-100 text-neutral-500 px-1.5 py-0.5 rounded font-black tracking-widest uppercase">Expert</span>
                                    <span className="text-xs text-neutral-400 font-medium ml-1">Today at 1:15 PM</span>
                                </div>
                                <p className="text-neutral-700 text-sm leading-relaxed mt-1">
                                    Yes, we dropped legacy last month. The key is configuring the solver iterations per tick. If you leave them at default for 1k+ instances, you'll still hit a CPU bottleneck. We cap position iterations to 4 and velocity to 1.
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        disabled={!can('engage')}
                                        className={`px-2 py-0.5 rounded text-xs font-bold transition-colors flex items-center gap-1 border 
                                            ${can('engage') ? 'bg-neutral-50 border-neutral-200 text-neutral-500 hover:bg-neutral-100' : 'bg-transparent border-transparent text-neutral-400 cursor-not-allowed'}`}
                                        title={!can('engage') ? 'You cannot engage in this branch.' : 'Mark as Insightful'}
                                    >
                                        <FiStar className={`w-3 h-3 ${can('engage') ? 'text-yellow-500' : 'text-neutral-300'}`} /> Insightful (12)
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Chat Input */}
                    <div className="p-4 bg-white border-t border-neutral-200 shrink-0">
                        {canChatInThisRoom ? (
                            <div className="flex flex-col bg-neutral-50 border border-neutral-200 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-[#7C3AED] focus-within:border-[#7C3AED] transition-colors shadow-sm">
                                <textarea
                                    className="w-full bg-transparent p-3 text-sm text-neutral-900 outline-none resize-none max-h-32"
                                    rows="2"
                                    placeholder="Contribute to the discussion..."
                                ></textarea>
                                <div className="bg-white px-3 py-2 border-t border-neutral-100 flex justify-between items-center">
                                    <div className="flex gap-2 text-neutral-400">
                                        <button className="hover:text-neutral-700 p-1 tooltip" title="Attach Blueprint/Code Snippet"><FiMessageCircle className="w-4 h-4" /></button>
                                    </div>
                                    <button className="bg-neutral-900 hover:bg-[#e53935] text-white px-6 py-1.5 rounded text-xs font-bold tracking-widest transition-colors">
                                        POST REPLY
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center p-6 bg-neutral-50 border border-neutral-200 border-dashed rounded-lg text-center">
                                <FiLock className="w-5 h-5 text-neutral-400 mb-2" />
                                <h4 className="text-sm font-bold text-neutral-900">
                                    {!can('chat') ? 'Read-Only Mode' : 'Level Requirement Not Met'}
                                </h4>
                                <p className="text-xs text-neutral-500 mt-1 max-w-sm">
                                    {!can('chat')
                                        ? 'You must hold the active sub-profile matching this community to post messages.'
                                        : 'You must be Expert level or higher to post in this specific room.'}
                                </p>
                            </div>
                        )}
                    </div>

                </main>

                {/* ── Room Information / Participants Sidebar ── */}
                <aside className="w-72 bg-neutral-50 border-r border-neutral-200 hidden lg:flex flex-col shrink-0 overflow-y-auto">
                    <div className="p-6">
                        <h3 className="text-[10px] font-black tracking-widest text-neutral-400 uppercase mb-4">Room Info</h3>
                        <p className="text-sm text-neutral-600 font-medium leading-relaxed mb-6">
                            Discussion dedicated to logic, mechanics, and backend systems of game development. Strictly no general rendering talk here.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 bg-white border border-neutral-200 p-3 rounded-lg shadow-sm">
                                <div className="w-8 h-8 rounded bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center"><FiLock className="w-4 h-4" /></div>
                                <div>
                                    <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wide">Expert Required</h4>
                                    <p className="text-[10px] text-neutral-500 font-medium">To post messages</p>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-[10px] font-black tracking-widest text-neutral-400 uppercase mt-8 mb-4">Participants — 124</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#7C3AED] shrink-0 border border-[#6D28D9]"></div>
                                <div>
                                    <p className="text-sm font-bold text-neutral-900 leading-none">Master Dev</p>
                                    <span className="text-[10px] text-[#7C3AED] uppercase tracking-widest font-black">Master</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-100 shrink-0 border border-blue-200"></div>
                                <div>
                                    <p className="text-sm font-bold text-neutral-900 leading-none">Alex_Senior</p>
                                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-black">Expert</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 opacity-60">
                                <div className="w-8 h-8 rounded-full bg-neutral-200 shrink-0 border border-neutral-300"></div>
                                <div>
                                    <p className="text-sm font-bold text-neutral-900 leading-none">Junior_Code</p>
                                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-black">Beginner</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

            </div>
        </div>
    );
};

export default CommunityRoom;
