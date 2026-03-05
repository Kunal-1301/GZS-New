import { useState } from 'react';
import { useCommunityPermissions } from '@context/CommunityPermissionsContext';
import { FiMessageSquare, FiHash, FiUsers, FiTrendingUp } from 'react-icons/fi';

const LOBBY_CHANNELS = [
    { id: 'general', name: 'general-chat', category: 'Global Lounge', activeText: '1.2k Online' },
    { id: 'lfg-casual', name: 'lfg-casual-play', category: 'Global Lounge', activeText: '340 Online' },
    { id: 'industry-gossip', name: 'industry-gossip', category: 'Discussions', activeText: '580 Online' },
    { id: 'memes', name: 'memes-and-media', category: 'Discussions', activeText: '890 Online' },
];

const CommunitySocialLobby = () => {
    const [activeChannel, setActiveChannel] = useState('general');
    const { persona } = useCommunityPermissions();
    const canChatInLobby = persona.type !== 'company';

    return (
        <div className="flex flex-col h-full bg-neutral-50 font-sans">
            {/* ── Top Nav Header ── */}
            <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 px-6 py-4 flex items-center justify-between shadow-sm shrink-0">
                <div>
                    <h1 className="text-xl font-black text-neutral-900 tracking-tight flex items-center gap-2">
                        <FiMessageSquare className="text-[#7C3AED]" /> Global Social Lobby
                    </h1>
                    <p className="text-neutral-500 text-xs font-semibold tracking-wide mt-1">Cross-profile casual networking & chat. No professional gates.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="bg-[#7C3AED]/10 text-[#7C3AED] px-3 py-1.5 rounded text-[10px] font-black tracking-widest uppercase border border-[#7C3AED]/20">
                        24,592 Online
                    </span>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* ── Left Sidebar: Channel List ── */}
                <aside className="w-64 bg-neutral-50 border-r border-neutral-200 flex flex-col shrink-0 overflow-y-auto">
                    <div className="p-4">
                        {['Global Lounge', 'Discussions'].map(category => (
                            <div key={category} className="mb-6">
                                <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2 px-2">{category}</h3>
                                <div className="space-y-1">
                                    {LOBBY_CHANNELS.filter(c => c.category === category).map(channel => (
                                        <button
                                            key={channel.id}
                                            onClick={() => setActiveChannel(channel.id)}
                                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-bold tracking-wide transition-colors ${activeChannel === channel.id
                                                ? 'bg-neutral-200 text-neutral-900'
                                                : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800'
                                                }`}
                                        >
                                            <span className="flex items-center gap-2">
                                                <FiHash className="w-4 h-4 text-neutral-400" />
                                                {channel.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* ── Main Chat Area ── */}
                <main className="flex-1 bg-white flex flex-col relative">

                    {/* Chat Header */}
                    <div className="border-b border-neutral-100 p-4 flex items-center justify-between bg-white/80 backdrop-blur z-10 shrink-0">
                        <div className="flex items-center gap-2">
                            <FiHash className="text-neutral-400 w-5 h-5" />
                            <h2 className="text-lg font-black text-neutral-900">{LOBBY_CHANNELS.find(c => c.id === activeChannel)?.name}</h2>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-bold text-neutral-500 flex-wrap">
                            <span className="flex items-center gap-1.5"><FiUsers className="w-4 h-4" /> {LOBBY_CHANNELS.find(c => c.id === activeChannel)?.activeText}</span>
                            <span className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-2 py-1 rounded"><FiTrendingUp className="w-4 h-4" /> High Activity</span>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {/* System Message */}
                        <div className="text-center">
                            <span className="bg-neutral-100 text-neutral-500 text-xs font-bold px-3 py-1 rounded-full border border-neutral-200">
                                Welcome to the Global Social Lobby. Professional rules still apply.
                            </span>
                        </div>

                        {/* Message 1 */}
                        <div className="flex gap-4 group">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black shrink-0 border border-blue-200">
                                A
                            </div>
                            <div>
                                <div className="flex items-baseline gap-2 mb-0.5">
                                    <h4 className="font-bold text-neutral-900 text-sm">Alex_Dev</h4>
                                    <span className="text-[10px] bg-neutral-100 text-neutral-500 px-1.5 py-0.5 rounded font-black tracking-widest uppercase">Lvl 3</span>
                                    <span className="text-xs text-neutral-400 font-medium ml-1">Today at 2:34 PM</span>
                                </div>
                                <p className="text-neutral-700 text-sm leading-relaxed">
                                    Has anyone tried the new 240FPS workaround for the latest UE5 patch? It's blowing my mind right now.
                                </p>
                            </div>
                        </div>

                        {/* Message 2 */}
                        <div className="flex gap-4 group mt-4">
                            <div className="w-10 h-10 rounded-full bg-[#7C3AED]/20 flex items-center justify-center text-[#7C3AED] font-black shrink-0 border border-[#7C3AED]/30">
                                C
                            </div>
                            <div>
                                <div className="flex items-baseline gap-2 mb-0.5">
                                    <h4 className="font-bold text-neutral-900 text-sm">ConceptArt_Maya <span className="text-[#e53935] text-[10px]" title="Platform Verified">✓</span></h4>
                                    <span className="text-[10px] bg-[#7C3AED]/10 text-[#7C3AED] px-1.5 py-0.5 rounded font-black tracking-widest uppercase border border-[#7C3AED]/20">Grandmaster</span>
                                    <span className="text-xs text-neutral-400 font-medium ml-1">Today at 2:35 PM</span>
                                </div>
                                <p className="text-neutral-700 text-sm leading-relaxed">
                                    Yeah! We actually used it for our latest cinematic pass. Incredible optimization. Dropping some screenshots in the Art Lounge later today.
                                </p>
                            </div>
                        </div>

                        {/* Message 3 */}
                        <div className="flex gap-4 group mt-4">
                            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-black shrink-0 border border-yellow-200">
                                O
                            </div>
                            <div>
                                <div className="flex items-baseline gap-2 mb-0.5">
                                    <h4 className="font-bold text-neutral-900 text-sm">OmegaPlayer</h4>
                                    <span className="text-[10px] bg-neutral-100 text-neutral-500 px-1.5 py-0.5 rounded font-black tracking-widest uppercase">Lvl 1</span>
                                    <span className="text-xs text-neutral-400 font-medium ml-1">Today at 2:38 PM</span>
                                </div>
                                <p className="text-neutral-700 text-sm leading-relaxed">
                                    Anyone down for some casual Apex matches? Need 1 more.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 bg-neutral-50 border-t border-neutral-200 shrink-0">
                        {canChatInLobby ? (
                            <div className="flex flex-col bg-white border border-neutral-200 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-[#7C3AED] focus-within:border-[#7C3AED] transition-colors shadow-sm">
                                <textarea
                                    className="w-full bg-transparent p-3 text-sm text-neutral-900 outline-none resize-none max-h-32"
                                    rows="2"
                                    placeholder={`Message #${LOBBY_CHANNELS.find(c => c.id === activeChannel)?.name}...`}
                                ></textarea>
                                <div className="bg-neutral-50 px-3 py-2 border-t border-neutral-100 flex justify-between items-center">
                                    <div className="flex gap-2 text-neutral-400">
                                        <button className="hover:text-neutral-700 p-1"><FiHash className="w-4 h-4" /></button>
                                    </div>
                                    <button className="bg-neutral-900 hover:bg-[#e53935] text-white px-4 py-1.5 rounded text-xs font-bold tracking-widest transition-colors">
                                        SEND
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center p-4 bg-white border border-neutral-200 border-dashed rounded-lg text-center">
                                <FiLock className="w-5 h-5 text-neutral-400 mb-2" />
                                <h4 className="text-sm font-bold text-neutral-900">Companies & Brands Restricted</h4>
                                <p className="text-xs text-neutral-500 mt-1 max-w-sm">
                                    You cannot participate in casual social chat. Please return to the Company Dashboard to manage structured engagements.
                                </p>
                            </div>
                        )}
                    </div>

                </main>
            </div>
        </div>
    );
};

export default CommunitySocialLobby;
