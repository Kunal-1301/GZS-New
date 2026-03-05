import { useState } from 'react';
import { useCommunityPermissions } from '@context/CommunityPermissionsContext';    
import { useNavigate } from 'react-router-dom';
import { FiUser, FiFilter, FiSearch, FiPlusCircle, FiMessageCircle, FiShield} from 'react-icons/fi';

const MOCK_USERS = [
    { id: 1, name: 'Alex_Dev', rank: 'Master', level: 'Lvl 5', branch: 'Game Dev', trust: 'High', online: true, letter: 'A', bg: 'bg-blue-100 text-blue-600 border-blue-200' },
    { id: 2, name: 'ConceptArt_Maya', rank: 'Expert', level: 'Lvl 3', branch: 'Art & Design', trust: 'High', online: true, letter: 'C', bg: 'bg-[#7C3AED]/20 text-[#7C3AED] border-[#7C3AED]/30' },
    { id: 3, name: 'OmegaPlayer', rank: 'Hustler', level: 'Lvl 2', branch: 'Esports', trust: 'Medium', online: false, letter: 'O', bg: 'bg-yellow-100 text-yellow-600 border-yellow-200' },
    { id: 4, name: 'Zack Dev', rank: 'Grandmaster', level: 'Lvl 8', branch: 'Game Dev', trust: 'Max', online: true, letter: 'Z', bg: 'bg-green-100 text-green-600 border-green-200' },
    { id: 5, name: 'NVIDIA Crew', rank: 'Company', level: '', branch: 'Sponsor', trust: 'Verified', online: true, letter: 'N', bg: 'bg-neutral-800 text-white border-neutral-900' },
];

const MOCK_MESSAGES = [
    { id: 1, senderId: 1, text: "Hey! Saw your reel on rendering optimization. Brilliant work.", time: "10:30 AM" },
    { id: 2, senderId: 'me', text: "Thanks Alex! It took a while to nail down the frame pacing.", time: "10:32 AM" },
    { id: 3, senderId: 1, text: "Are you open to a quick chat about how you handled the memory leaks?", time: "10:35 AM" },
];

const CommunityNetwork = () => {
    const { persona } = useCommunityPermissions();
    const [activeTab, setActiveTab] = useState('directory'); // 'directory' or 'messages'
    const [searchQuery, setSearchQuery] = useState('');
    const [activeChatUser, setActiveChatUser] = useState(null);

    const filteredUsers = MOCK_USERS.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.branch.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleStartChat = (user) => {
        setActiveChatUser(user);
        setActiveTab('messages'); // switch to messages tab implicitly if on mobile or split view
    };

    return (
        <div className="flex flex-col h-full bg-[var(--theme-bg)] theme-community font-body">
            {/* ── Header ── */}
            <div className="sticky top-0 z-40 bg-[var(--theme-card)]/95 backdrop-blur-md border-b border-[var(--theme-border)] px-6 py-4 flex items-center justify-between shadow-sm shrink-0">
                <div>
                    <h1 className="gzs-h1 !text-xl flex items-center gap-2">
                        <FiUser className="text-[var(--theme-primary)]" /> Player Network & Messages
                    </h1>
                    <p className="gzs-body-sm mt-1">Discover peers, connect with experts, and manage private chats.</p>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden max-w-[1600px] mx-auto w-full">
                {/* ── Left Sidebar: Directory & Chat List ── */}
                <aside className={`w-full md:w-80 lg:w-96 bg-[var(--theme-card)] border-r border-[var(--theme-border)] flex flex-col shrink-0 overflow-hidden ${activeChatUser ? 'hidden md:flex' : 'flex'}`}>

                    {/* Tabs */}
                    <div className="flex border-b border-[var(--theme-border)] shrink-0">
                        <button
                            className={`flex-1 py-4 text-xs font-black tracking-widest uppercase transition-colors border-b-2 ${activeTab === 'directory' ? 'text-[var(--theme-primary)] border-[var(--theme-primary)]' : 'text-[var(--theme-text-muted)] border-transparent hover:text-[var(--theme-text)]'}`}
                            onClick={() => setActiveTab('directory')}
                        >
                            Directory
                        </button>
                        <button
                            className={`flex-1 py-4 text-xs font-black tracking-widest uppercase transition-colors border-b-2 ${activeTab === 'messages' ? 'text-[var(--theme-primary)] border-[var(--theme-primary)]' : 'text-[var(--theme-text-muted)] border-transparent hover:text-[var(--theme-text)]'}`}
                            onClick={() => setActiveTab('messages')}
                        >
                            Messages
                        </button>
                    </div>

                    {/* Search */}
                    {activeTab === 'directory' && (
                        <div className="p-4 border-b border-neutral-100 shrink-0 bg-neutral-50/50">
                            <div className="relative">
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name, rank, or branch..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white border border-neutral-200 rounded-lg py-2 pl-9 pr-4 text-sm font-medium focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-shadow"
                                />
                            </div>
                            <div className="flex gap-2 mt-3 overflow-x-auto pb-1 hide-scrollbar">
                                <span className="bg-white border border-neutral-200 text-neutral-600 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest shadow-sm whitespace-nowrap cursor-pointer hover:border-[#7C3AED] transition-colors"><FiFilter className="inline mr-1" /> Experts Only</span>
                                <span className="bg-white border border-neutral-200 text-neutral-600 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest shadow-sm whitespace-nowrap cursor-pointer hover:border-[#7C3AED] transition-colors">Game Dev</span>
                            </div>
                        </div>
                    )}

                    {/* List Content */}
                    <div className="flex-1 overflow-y-auto p-2">
                        {activeTab === 'directory' ? (
                            <div className="space-y-1">
                                {filteredUsers.map(user => (
                                    <div key={user.id} onClick={() => handleStartChat(user)} className="flex items-center gap-3 p-3 hover:bg-neutral-50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-neutral-100 group">
                                        <div className="relative">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black border shadow-sm ${user.bg}`}>
                                                {user.letter}
                                            </div>
                                            {user.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-sm font-bold text-[var(--theme-text)] truncate group-hover:text-[var(--theme-primary)] transition-colors">{user.name}</h4>
                                                {user.rank === 'Company' ?
                                                    <span className="text-[10px] bg-neutral-800 text-white px-1.5 py-0.5 rounded font-black tracking-widest uppercase ml-2 shrink-0"><FiShield className="inline w-3 h-3 mr-0.5" /> Verified</span>
                                                    : <span className="gzs-label shrink-0">{user.level}</span>
                                                }
                                            </div>
                                            <p className="gzs-body-sm truncate mt-0.5">
                                                <span className={user.rank === 'Company' ? 'text-[var(--theme-text-muted)]' : 'text-[var(--theme-primary)]'}>{user.rank}</span> • {user.branch}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {/* Mock Recent Chat */}
                                <div onClick={() => handleStartChat(MOCK_USERS[0])} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors border ${activeChatUser?.id === 1 ? 'bg-purple-50 border-purple-100' : 'border-transparent hover:bg-neutral-50 hover:border-neutral-100'}`}>
                                    <div className="relative">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black border shadow-sm ${MOCK_USERS[0].bg}`}>
                                            {MOCK_USERS[0].letter}
                                        </div>
                                        {MOCK_USERS[0].online && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <h4 className="text-sm font-bold text-neutral-900 truncate">{MOCK_USERS[0].name}</h4>
                                            <span className="text-[10px] font-bold text-neutral-400">10:35 AM</span>
                                        </div>
                                        <p className="text-xs text-neutral-600 font-medium truncate">Are you open to a quick chat about how...</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </aside>

                {/* ── Main Chat Area ── */}
                <main className={`flex-1 bg-white flex flex-col relative ${!activeChatUser ? 'hidden md:flex' : 'flex'}`}>
                    {activeChatUser ? (
                        <>
                            {/* Chat Header */}
                            <div className="border-b border-neutral-100 px-6 py-4 flex items-center justify-between bg-white/80 backdrop-blur z-10 shrink-0 shadow-sm">
                                <div className="flex items-center gap-4">
                                    {/* Mobile Back Button */}
                                    <button className="md:hidden p-2 -ml-2 text-neutral-500 hover:text-neutral-900" onClick={() => setActiveChatUser(null)}>
                                        &larr;
                                    </button>
                                    <div className="relative hidden sm:block">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black border shadow-sm ${activeChatUser.bg}`}>
                                            {activeChatUser.letter}
                                        </div>
                                        {activeChatUser.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-black text-neutral-900 leading-tight">{activeChatUser.name}</h2>
                                        <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-0.5 max-w-[250px] truncate sm:max-w-none">
                                            {activeChatUser.rank} • {activeChatUser.branch}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 text-neutral-400 hover:text-neutral-800 transition-colors tooltip" title="View Full Profile"><FiUser className="w-5 h-5" /></button>
                                    <button className="p-2 text-neutral-400 hover:text-neutral-800 transition-colors tooltip" title="Options"><FiMoreVertical className="w-5 h-5" /></button>
                                </div>
                            </div>

                            {/* Chat Messages */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-neutral-50">
                                <div className="text-center mb-8">
                                    <div className={`w-20 h-20 rounded-full flex items-center justify-center font-black text-3xl border shadow-sm mx-auto mb-3 ${activeChatUser.bg}`}>
                                        {activeChatUser.letter}
                                    </div>
                                    <h3 className="text-lg font-black text-neutral-900">{activeChatUser.name}</h3>
                                    <p className="text-xs text-neutral-500 font-medium">This is the beginning of your direct message history.</p>
                                </div>

                                {activeChatUser.id === 1 ? MOCK_MESSAGES.map(msg => (
                                    <div key={msg.id} className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-sm ${msg.senderId === 'me' ? 'bg-[var(--theme-primary)] text-[var(--theme-text-inverse)] rounded-br-none' : 'bg-[var(--theme-card)] border border-[var(--theme-border)] text-[var(--theme-text)] rounded-bl-none'}`}>
                                            <p className="text-sm leading-relaxed">{msg.text}</p>
                                            <span className={`text-[9px] font-bold block mt-2 text-right ${msg.senderId === 'me' ? 'text-[var(--theme-text-inverse)]/70' : 'text-[var(--theme-text-muted)]'}`}>{msg.time}</span>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="flex-1 flex items-center justify-center text-neutral-400 text-sm font-medium">
                                        No messages yet. Say hello!
                                    </div>
                                )}
                            </div>

                            {/* Chat Input */}
                            <div className="p-4 bg-white border-t border-neutral-200 shrink-0">
                                <div className="flex flex-col bg-neutral-50 border border-neutral-200 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-[#7C3AED] focus-within:border-[#7C3AED] transition-colors shadow-sm">
                                    <textarea
                                        className="w-full bg-transparent p-3 text-sm text-neutral-900 outline-none resize-none max-h-32"
                                        rows="2"
                                        placeholder={`Message ${activeChatUser.name}...`}
                                    ></textarea>
                                    <div className="bg-white px-3 py-2 border-t border-neutral-100 flex justify-between items-center">
                                        <div className="flex gap-2 text-neutral-400">
                                            {/* Toolbar items can go here */}
                                        </div>
                                        <button className="gzs-btn-primary !px-6 !py-2 !rounded !text-xs">
                                            SEND <FiSend className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                            <div className="w-24 h-24 bg-neutral-50 rounded-full flex items-center justify-center mb-6">
                                <FiMessageCircle className="w-10 h-10 text-neutral-300" />
                            </div>
                            <h2 className="text-2xl font-black text-neutral-900 mb-2">Your Professional Network</h2>
                            <p className="text-neutral-500 font-medium max-w-sm">
                                Select a profile from the directory to view details or start a private conversation. Your trust level governs connection limits.
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default CommunityNetwork;
