import { useState } from 'react';
import {
    FiUser, FiShield, FiLock, FiCreditCard,
    FiLink, FiActivity, FiImage, FiSettings,
    FiHeart, FiMessageCircle, FiRepeat, FiShare2,
    FiMoreHorizontal, FiPlus, FiCheckCircle, FiBell,
    FiSearch, FiTrendingUp, FiVideo, FiCamera
} from 'react-icons/fi';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import { usePageTheme } from '@context/ThemeContext';

// Sub-components
import IdentityCMS from './IdentityCMS';
import SecurityPassword from './SecurityPassword';
import PrivacyDefaults from './PrivacyDefaults';
import LinkedAccounts from './LinkedAccounts';
import Subscriptions from './Subscriptions';
import EsportsFacade from './EsportsFacade';

// Mock Social Data
const FEED_POSTS = [
    {
        id: 1,
        author: 'Khali',
        handle: '@khali_art',
        role: 'Artist Facade',
        content: 'Just finished the environmental concept for the new Cyber-RPG playtest! Feedback welcome. #GameArt #GzoneDesign',
        image: 'https://picsum.photos/800/600?random=101',
        likes: 245,
        comments: 12,
        time: '2h ago',
        avatarColor: 'bg-teal-500'
    },
    {
        id: 2,
        author: 'Khali',
        handle: '@Slayer99',
        role: 'Esports Facade',
        content: 'GGs to the squad in the Gzone Pro Invitational. Level 4 verified skill showing its worth! Our tactical sync was at an all-time high today. 🏆',
        likes: 1202,
        comments: 45,
        time: '5h ago',
        avatarColor: 'bg-indigo-600'
    }
];

const GALLERY_ITEMS = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    url: `https://picsum.photos/500/500?random=${i + 200}`,
    type: i % 4 === 0 ? 'video' : 'image',
    likes: Math.floor(Math.random() * 500)
}));

export default function IdentitySocialView() {
    const [activeTab, setActiveTab] = useState('Social Feed');
    usePageTheme('profile');

    const SOCIAL_TABS = [
        { id: 'Social Feed', icon: FiActivity, count: 24 },
        { id: 'Media Gallery', icon: FiImage, count: 142 },
        { id: 'Esports Stats', icon: FiShield, count: 8 },
    ];

    const MANAGEMENT_TABS = [
        { id: 'Identity CMS', icon: FiSettings },
        { id: 'Security & Auth', icon: FiLock },
        { id: 'Billing', icon: FiCreditCard },
        { id: 'Linked Accounts', icon: FiLink },
    ];

    return (
        <div className="theme-profile min-h-screen flex flex-col bg-gray-50 font-body w-full overflow-x-hidden">
            <Navbar />

            {/* PRESTIGIOUS DYNAMIC HEADER */}
            <div className="w-full h-64 md:h-80 bg-gray-950 relative overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    <img src="https://picsum.photos/1920/600?random=Header" className="w-full h-full object-cover blur-[2px]" alt="Banner" />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-transparent to-gray-950" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent" />
                </div>

                <div className="absolute bottom-12 right-12 flex gap-4">
                    <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-2">
                        <FiCamera /> CHANGE COVER
                    </button>
                </div>
            </div>

            <main className="flex-1 w-full container-global px-4 sm:px-6 lg:px-8 xl:px-12 py-8 -mt-24 md:-mt-32 relative z-10 flex flex-col lg:flex-row gap-8">

                {/* SIDEBAR: Personal Branding & Tiered Nav */}
                <div className="w-full lg:w-80 shrink-0 space-y-6">
                    {/* Prestigious Identity Snapshot Card */}
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 text-center relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500" />

                        <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-50 rounded-[3rem] border-[8px] border-white overflow-hidden shadow-2xl mx-auto -mt-20 md:-mt-24 relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-800 flex items-center justify-center text-5xl font-black text-white group-hover:scale-110 transition-transform duration-500"> K </div>
                            <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-lg" />
                        </div>

                        <div className="mt-8">
                            <h2 className="text-2xl font-black text-gray-950 uppercase tracking-tighter flex items-center justify-center gap-2">
                                KHALI <FiCheckCircle className="text-blue-500 w-5 h-5 fill-blue-50" />
                            </h2>
                            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mt-2 bg-indigo-50 inline-block px-4 py-1.5 rounded-full">MASTER IDENTITY HUB</p>
                        </div>

                        <div className="flex justify-center gap-8 mt-10 pt-10 border-t border-gray-50">
                            <div>
                                <p className="text-2xl font-black text-gray-950 leading-none">2.4K</p>
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-2">Follows</p>
                            </div>
                            <div className="w-px h-10 bg-gray-100" />
                            <div>
                                <p className="text-2xl font-black text-gray-950 leading-none">98</p>
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-2">Health</p>
                            </div>
                        </div>

                        <button className="bg-gray-950 text-white w-full mt-10 p-5 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl hover:-translate-y-1">
                            <FiPlus /> CREATE NEW PROJECTION
                        </button>
                    </div>

                    {/* Tiered Navigation Hub */}
                    <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-gray-100 space-y-10">
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] px-4 mb-6">SOCIAL EXPERIENCE</p>
                            <nav className="space-y-1.5">
                                {SOCIAL_TABS.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id
                                            ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20'
                                            : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <tab.icon size={16} /> {tab.id}
                                        </div>
                                        {tab.count && (
                                            <span className={`text-[8px] px-2 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100'}`}>
                                                {tab.count}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] px-4 mb-6">MANAGEMENT HUB</p>
                            <nav className="space-y-1.5">
                                {MANAGEMENT_TABS.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id
                                            ? 'bg-gray-950 text-white shadow-xl'
                                            : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'}`}
                                    >
                                        <tab.icon size={16} /> {tab.id}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>

                {/* CONTENT AREA: Dynamic Social/CMS View */}
                <div className="flex-1 min-w-0">

                    {/* Unified Social Feed View */}
                    {activeTab === 'Social Feed' && (
                        <div className="space-y-8 max-w-2xl">
                            {/* Feed Creator Dock */}
                            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex items-center gap-6 group hover:border-indigo-200 transition-colors">
                                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                                    <FiActivity size={24} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Project a new activity update..."
                                    className="flex-1 bg-transparent border-none focus:outline-none text-sm font-medium text-gray-900 placeholder-gray-400"
                                />
                                <div className="flex gap-2">
                                    <button className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"><FiImage size={18} /></button>
                                    <button className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"><FiVideo size={18} /></button>
                                </div>
                            </div>

                            {FEED_POSTS.map(post => (
                                <div key={post.id} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:border-indigo-100 transition-all group">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-14 h-14 ${post.avatarColor} rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg`}>K</div>
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <h4 className="font-black text-gray-950 uppercase tracking-tight text-sm">{post.author}</h4>
                                                    <span className="text-[9px] font-black bg-gray-50 text-gray-400 px-3 py-1 rounded-full uppercase group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">{post.role}</span>
                                                </div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{post.handle} • {post.time}</p>
                                            </div>
                                        </div>
                                        <button className="text-gray-300 p-2 hover:bg-gray-50 rounded-xl transition-colors"><FiMoreHorizontal /></button>
                                    </div>

                                    <p className="text-lg font-medium text-gray-800 mb-8 leading-relaxed px-2">
                                        {post.content}
                                    </p>

                                    {post.image && (
                                        <div className="rounded-[2rem] overflow-hidden mb-8 border border-gray-50 shadow-inner relative group/image">
                                            <img src={post.image} className="w-full h-auto object-cover max-h-[600px] grayscale group-hover/image:grayscale-0 transition-all duration-700" alt="Post content" />
                                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/image:opacity-100 transition-opacity" />
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between pt-8 border-t border-gray-50 px-2">
                                        <div className="flex items-center gap-10">
                                            <button className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-all font-black text-[11px] group/btn">
                                                <div className="p-2 group-hover/btn:bg-red-50 rounded-lg transition-colors"><FiHeart size={20} /></div>
                                                {post.likes}
                                            </button>
                                            <button className="flex items-center gap-3 text-gray-400 hover:text-blue-500 transition-all font-black text-[11px] group/btn">
                                                <div className="p-2 group-hover/btn:bg-blue-50 rounded-lg transition-colors"><FiMessageCircle size={20} /></div>
                                                {post.comments}
                                            </button>
                                            <button className="flex items-center gap-3 text-gray-400 hover:text-indigo-600 transition-all font-black text-[11px] group/btn">
                                                <div className="p-2 group-hover/btn:bg-indigo-50 rounded-lg transition-colors"><FiRepeat size={20} /></div>
                                                PROJECT
                                            </button>
                                        </div>
                                        <div className="p-2 hover:bg-gray-50 rounded-lg transition-colors text-gray-300 cursor-pointer">
                                            <FiShare2 size={18} />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="py-10 text-center">
                                <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">YOU ARE UP TO DATE</p>
                            </div>
                        </div>
                    )}

                    {/* Aggregated Media Gallery (Instagram x Behance Style) */}
                    {activeTab === 'Media Gallery' && (
                        <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-12">
                                <div>
                                    <h3 className="text-3xl font-black text-gray-950 tracking-tighter uppercase">COLLECTIVE GALLERY</h3>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Aggregated projections from ${FEED_POSTS.length} active facades</p>
                                </div>
                                <div className="flex gap-3">
                                    <button className="bg-gray-50 p-4 rounded-2xl text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all"><FiImage size={20} /></button>
                                    <button className="bg-gray-50 p-4 rounded-2xl text-gray-400 hover:bg-orange-50 hover:text-orange-600 transition-all"><FiVideo size={20} /></button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {GALLERY_ITEMS.map(item => (
                                    <div key={item.id} className="aspect-square bg-gray-50 rounded-[2rem] overflow-hidden relative group cursor-pointer border border-gray-100">
                                        <img src={item.url} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:grayscale grayscale-[0.5]" alt="Gallery item" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-8">
                                            <div className="flex items-center gap-6 text-white">
                                                <div className="flex items-center gap-2 text-[12px] font-black"><FiHeart className="fill-white" /> {item.likes}</div>
                                                <div className="flex items-center gap-2 text-[12px] font-black"><FiMessageCircle /> {Math.floor(item.likes / 10)}</div>
                                            </div>
                                            <p className="text-[9px] font-black text-white/60 uppercase tracking-widest mt-4">@KHALI_ART • CONCEPT</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-12 py-5 bg-gray-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-100 hover:text-gray-950 transition-all border border-gray-100">
                                LOAD RECENT CREATIONS
                            </button>
                        </div>
                    )}

                    {/* CMS & Settings Hub (Passes to IdentityCMS) */}
                    <div className="max-w-4xl">
                        {activeTab === 'Identity CMS' && <IdentityCMS />}
                        {activeTab === 'Security & Auth' && <SecurityPassword />}
                        {activeTab === 'Linked Accounts' && <LinkedAccounts />}
                        {activeTab === 'Billing' && <Subscriptions />}
                        {activeTab === 'Esports Stats' && <EsportsFacade />}
                    </div>

                </div>

                {/* RIGHT SIDEBAR: Trending & Suggestions (Desktop Only) */}
                <div className="hidden xl:block w-80 shrink-0 space-y-6">
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">IDENTITY ALERTS</h3>
                            <FiBell className="text-gray-300" />
                        </div>
                        <div className="space-y-6">
                            {[
                                { title: 'New Skill Verified', type: 'Trust', time: '2h ago' },
                                { title: 'Squad Invite: Team Alpha', type: 'Esports', time: '5h ago' }
                            ].map((alert, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-2 h-2 mt-1.5 rounded-full bg-indigo-500" />
                                    <div>
                                        <p className="text-xs font-black text-gray-950 leading-tight">{alert.title}</p>
                                        <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">{alert.type} • {alert.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-950 p-10 rounded-[2.5rem] text-white relative overflow-hidden group">
                        <FiTrendingUp className="absolute -top-6 -right-6 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-black uppercase tracking-tighter mb-4">GZONE TRENDING</h3>
                        <p className="text-xs text-white/50 mb-8 leading-relaxed">Relevant communities and builders matching your active facades.</p>
                        <div className="space-y-4">
                            {['#ProceduralArt', '#ValorantPro', '#UnityDev'].map(tag => (
                                <div key={tag} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 cursor-pointer">
                                    <span className="text-[10px] font-black text-white/80">{tag}</span>
                                    <FiPlus size={12} className="text-white/40" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}
