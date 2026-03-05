import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    FiPlus, FiVideo, FiEdit3, FiPackage, FiCalendar, FiTrendingUp,
    FiDollarSign, FiUsers, FiAward, FiSettings, FiActivity,
    FiPlusSquare, FiGrid, FiList, FiTrash2, FiEye, FiCheckCircle, FiZap
} from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';
import { mockApiService } from '@services/mockApiService';

const CREATION_MODES = [
    { id: 'reel', label: 'Short Reel', icon: FiVideo, sub: 'Vertical Gaming Clips', color: 'bg-rose-500' },
    { id: 'blog', label: 'Full Insight', icon: FiEdit3, sub: 'Detailed Articles & News', color: 'bg-blue-500' },
    { id: 'asset', label: 'Game Asset', icon: FiPackage, sub: '3D Models & UI Kits', color: 'bg-emerald-500' },
    { id: 'event', label: 'Community Event', icon: FiCalendar, sub: 'Tournaments & AMAs', color: 'bg-amber-500' },
];

const CreatorStudio = () => {
    const [viewMode, setViewMode] = useState('grid');
    const queryClient = useQueryClient();

    // Queries
    const { data: myContent = [], isLoading } = useQuery({
        queryKey: ['creator', 'my-content'],
        queryFn: async () => {
            // Mocking user-generated content
            return [
                { id: 1, type: 'reel', title: 'Unreal Engine 5 Water Physics', status: 'Published', views: '24.5k', earnings: '$120' },
                { id: 2, type: 'blog', title: 'Top 10 Metroidvanias of 2026', status: 'In Review', views: '1.2k', earnings: '$0' },
                { id: 3, type: 'asset', title: 'Cyberpunk HUD UI Kit', status: 'Published', views: '5k', earnings: '$450' },
                { id: 4, type: 'event', title: 'Weekly Valorant Scrims', status: 'Completed', views: '150 participants', earnings: '$75' },
            ];
        }
    });

    const stats = {
        totalEarnings: '$2,450',
        totalViews: '1.2M',
        activeSubs: '124',
        trustLevel: 'Lvl 4 Grandmaster'
    };

    if (isLoading) return <div className="p-20 text-center animate-pulse text-xs font-black uppercase tracking-widest text-neutral-400">LOADING STUDIO CORE...</div>;

    return (
        <div className="animate-[fadeIn_0.5s_ease-out] bg-neutral-50/50 min-h-screen">
            <Helmet>
                <title>Creator Studio | GzoneSphere Universe</title>
                <meta name="description" content="GzoneSphere Creator Studio - The ultimate UGC generation hub for gaming professionals." />
            </Helmet>

            {/* --- STUDIO HEADER --- */}
            <div className="bg-white border-b border-neutral-100 px-12 py-10">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-600/30">
                            <FiActivity size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-neutral-900 tracking-tight uppercase italic leading-none mb-2">CREATOR STUDIO</h1>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{stats.trustLevel}</span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> MONETIZATION ACTIVE
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
                        {[
                            { label: 'Total Volume', val: stats.totalViews, icon: <FiEye /> },
                            { label: 'Total Rev', val: stats.totalEarnings, icon: <FiDollarSign /> },
                            { label: 'Network', val: stats.activeSubs, icon: <FiUsers /> },
                            { label: 'System Cert', val: 'Verified', icon: <FiAward /> }
                        ].map((s, i) => (
                            <div key={i} className="text-left border-l-2 border-neutral-100 pl-4">
                                <span className="text-[8px] font-black uppercase tracking-widest text-neutral-400 mb-1 flex items-center gap-1">{s.icon} {s.label}</span>
                                <p className="text-lg font-black text-neutral-900 leading-none">{s.val}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">

                {/* --- CREATION MODES --- */}
                <div className="mb-16">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400 mb-8 ml-1">Universal System Creation Suite</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {CREATION_MODES.map((mode) => (
                            <button
                                key={mode.id}
                                className="bg-white p-8 rounded-[2.5rem] border border-neutral-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group relative overflow-hidden text-left"
                            >
                                <div className={`w-12 h-12 ${mode.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-black/10 transition-transform group-hover:scale-110`}>
                                    <mode.icon size={22} />
                                </div>
                                <h3 className="text-lg font-black text-neutral-900 uppercase italic mb-1">{mode.label}</h3>
                                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest leading-relaxed">{mode.sub}</p>

                                <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                                    <FiPlusSquare size={18} className="text-neutral-300" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- CONTENT MANAGEMENT --- */}
                <div className="space-y-8">
                    <div className="flex items-center justify-between border-b border-neutral-100 pb-8">
                        <div>
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-900 mb-1">DATA STREAMS</h2>
                            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Tracking current active deployments</p>
                        </div>
                        <div className="flex bg-white p-1 rounded-2xl border border-neutral-100 shadow-sm">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-lg' : 'text-neutral-400 hover:text-neutral-600'}`}>
                                <FiGrid size={16} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-indigo-600 text-white shadow-lg' : 'text-neutral-400 hover:text-neutral-600'}`}>
                                <FiList size={16} />
                            </button>
                        </div>
                    </div>

                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {myContent.map((item) => (
                                <div key={item.id} className="bg-white rounded-[3rem] border border-neutral-100 p-8 shadow-sm hover:shadow-xl transition-all group">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${{
                                            Published: 'bg-green-50 text-green-600',
                                            'In Review': 'bg-yellow-50 text-yellow-600',
                                            Completed: 'bg-indigo-50 text-indigo-600'
                                        }[item.status]
                                            }`}>
                                            {item.status}
                                        </div>
                                        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-neutral-300">{item.type}</span>
                                    </div>
                                    <h4 className="text-sm font-black text-neutral-900 uppercase italic mb-6 leading-relaxed line-clamp-2 min-h-[2.8rem]">{item.title}</h4>

                                    <div className="grid grid-cols-2 gap-4 border-t border-neutral-50 pt-6 mb-8">
                                        <div>
                                            <span className="text-[8px] font-black uppercase tracking-widest text-neutral-400 block mb-1">Engagement</span>
                                            <span className="text-xs font-black text-neutral-900">{item.views}</span>
                                        </div>
                                        <div>
                                            <span className="text-[8px] font-black uppercase tracking-widest text-neutral-400 block mb-1">Rev Share</span>
                                            <span className="text-xs font-black text-green-600">{item.earnings}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                        <button className="flex-1 py-3 bg-neutral-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black">ANALYZE</button>
                                        <button className="p-3 border border-neutral-100 text-neutral-400 rounded-2xl hover:text-red-500 hover:bg-red-50 hover:border-red-100"><FiTrash2 size={16} /></button>
                                    </div>
                                </div>
                            ))}

                            {/* Empty/Add Slot */}
                            <button className="border-2 border-dashed border-neutral-200 rounded-[3rem] p-12 flex flex-col items-center justify-center text-neutral-300 hover:border-indigo-300 hover:text-indigo-400 transition-all group">
                                <FiPlus className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">INITIALIZE NEW TRANSMISSION</span>
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white rounded-[3rem] border border-neutral-100 overflow-hidden shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-neutral-50/50">
                                    <tr className="border-b border-neutral-100">
                                        <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-neutral-400">Content Identifier</th>
                                        <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-neutral-400">Layer</th>
                                        <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-neutral-400">Status</th>
                                        <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-neutral-400 text-right">Yield</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myContent.map((item) => (
                                        <tr key={item.id} className="border-b border-neutral-50 hover:bg-neutral-50/20 transition-colors group">
                                            <td className="px-10 py-6">
                                                <div className="text-xs font-black text-neutral-900 uppercase italic">{item.title}</div>
                                                <div className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest mt-1">Ref ID: #TX-{item.id}O42</div>
                                            </td>
                                            <td className="px-10 py-6 text-[10px] font-black text-indigo-500 uppercase tracking-widest">{item.type}</td>
                                            <td className="px-10 py-6">
                                                <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${{
                                                    Published: 'bg-green-50 text-green-600',
                                                    'In Review': 'bg-yellow-50 text-yellow-600',
                                                    Completed: 'bg-indigo-50 text-indigo-600'
                                                }[item.status]
                                                    }`}>{item.status}</span>
                                            </td>
                                            <td className="px-10 py-6 text-right">
                                                <div className="text-xs font-black text-green-600">{item.earnings}</div>
                                                <div className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest mt-1">{item.views} Signals</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* --- SYSTEM NOTIFICATION: PREMIUM UPGRADE --- */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
                <div className="bg-neutral-900 rounded-[3rem] p-12 relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 blur-[100px] rounded-full pointer-events-none"></div>
                    <div className="relative z-10 max-w-xl">
                        <div className="inline-block px-3 py-1 bg-white/10 text-white/60 text-[8px] font-black uppercase tracking-[0.4em] rounded-full border border-white/5 mb-6">PRO MISSION ACCELERATOR</div>
                        <h3 className="text-3xl font-black text-white uppercase italic leading-none mb-4">SCALE YOUR REACH <br /><span className="text-white/20">TO BILLIONS.</span></h3>
                        <p className="text-sm font-medium text-neutral-400 leading-relaxed uppercase tracking-wider">
                            Unlock the Gzone Pro Tier to access high-bandwidth SSE streaming, priority algorithmic pushes, and advanced revenue multipliers.
                        </p>
                    </div>
                    <div className="relative z-10">
                        <button className="px-12 py-5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-2xl transition-all hover:-translate-y-1">
                            UPGRADE TO GZONE PRO
                        </button>
                    </div>
                </div>
            </div>

            {/* --- MOBILE QUICK CREATE DOCK --- */}
            <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 bg-neutral-900/90 backdrop-blur-xl p-2 rounded-full border border-white/10 shadow-2xl">
                {CREATION_MODES.map((mode) => (
                    <button key={mode.id} className={`p-4 rounded-full text-white ${mode.color} shadow-lg active:scale-95 transition-all`}>
                        <mode.icon size={20} />
                    </button>
                ))}
                <div className="w-px h-6 bg-white/10 mx-1"></div>
                <button className="p-4 rounded-full bg-white text-black shadow-lg">
                    <FiZap size={20} />
                </button>
            </div>
        </div>
    );
};

export default CreatorStudio;
