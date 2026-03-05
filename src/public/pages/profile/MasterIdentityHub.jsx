import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FiMapPin, FiGlobe, FiCalendar, FiShield, FiTrendingUp,
    FiExternalLink, FiPlus, FiCheckCircle, FiArrowRight,
    FiEye, FiMessageSquare, FiShare2, FiMoreVertical,
    FiEdit2, FiEyeOff, FiActivity, FiZap, FiTarget, FiStar
} from 'react-icons/fi';
import {
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
    Tooltip, CartesianGrid, BarChart, Bar, Cell
} from 'recharts';
import ProfileSkillLayout from './ProfileSkillLayout';
import {
    SUB_PROFILES, DUMMY_SKILLS, DUMMY_PROJECTS,
    DUMMY_FACADE_STATS, DUMMY_PLATFORM_HISTORY
} from '@data/profileSkillData';

// Analytics Constants
const ENGAGEMENT_DATA = [
    { name: 'Mon', views: 400, interactions: 240 },
    { name: 'Tue', views: 700, interactions: 380 },
    { name: 'Wed', views: 600, interactions: 320 },
    { name: 'Thu', views: 900, interactions: 550 },
    { name: 'Fri', views: 1100, interactions: 720 },
    { name: 'Sat', views: 1500, interactions: 980 },
    { name: 'Sun', views: 1300, interactions: 850 },
];

export default function MasterIdentityHub({ isOrg = false }) {
    const navigate = useNavigate();

    const REPUTATION_DATA = DUMMY_FACADE_STATS.map(s => ({
        facade: s.id.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' '),
        value: s.score,
        color: s.id === 'esports' ? '#6366f1' : s.id === 'art-visual' ? '#14b8a6' : '#f59e0b'
    }));

    return (
        <ProfileSkillLayout
            title="MASTER IDENTITY HUB"
            subtitle="The executive command center for your collective GzoneSphere growth."
            footer="Aggregate your reputation, manage your public facades, and track platform-wide growth."
        >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 font-body pb-20">

                {/* ── LEFT: Identity Snapshot ── */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Identity Core */}
                    <div className="bg-white border border-gray-50 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <FiActivity size={48} />
                        </div>
                        <div className="relative z-10 text-center">
                            <div className="w-28 h-28 bg-gradient-to-br from-purple-500 to-indigo-700 rounded-[2.5rem] mx-auto flex items-center justify-center text-white text-5xl font-black mb-8 shadow-2xl shadow-purple-500/30 transform group-hover:rotate-3 transition-transform">
                                {isOrg ? 'I' : 'K'}
                            </div>
                            <h2 className="text-3xl font-black text-gray-950 leading-tight mb-2">
                                {isOrg ? 'Intel Gaming' : 'Khali'}
                            </h2>
                            <span className="text-[10px] font-black bg-purple-100 text-purple-600 px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
                                {isOrg ? 'OFFICIAL ENTITY' : 'MASTER IDENTITY'}
                            </span>

                            <div className="space-y-4 mt-10 pt-10 border-t border-gray-50">
                                <div className="flex items-center justify-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    <FiMapPin className="text-purple-500" /> {isOrg ? 'California, USA' : 'Bangalore, India'}
                                </div>
                                <div className="flex items-center justify-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    <FiGlobe className="text-purple-500" /> {isOrg ? 'Global Enterprise' : 'English, Hindi'}
                                </div>
                                <button className="w-full bg-gray-50 hover:bg-gray-100 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-colors mt-6">
                                    EDIT MASTER IDENTITY
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-950 rounded-[2rem] p-6 text-white shadow-xl">
                            <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">REPUTATION</p>
                            <p className="text-2xl font-black text-teal-400">9.6</p>
                        </div>
                        <div className="bg-gray-950 rounded-[2rem] p-6 text-white shadow-xl">
                            <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">NETWORK</p>
                            <p className="text-2xl font-black text-purple-400">1.2K</p>
                        </div>
                    </div>

                    {/* Recent Milestones (Small history) */}
                    <div className="bg-white border border-gray-50 rounded-[2rem] p-8 shadow-sm">
                        <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <FiTarget className="text-red-500" /> RECENT SUCCESS
                        </h4>
                        <div className="space-y-4">
                            {DUMMY_PLATFORM_HISTORY.slice(0, 2).map(milestone => (
                                <div key={milestone.id} className="border-l-2 border-purple-200 pl-4 py-1">
                                    <p className="text-[10px] font-bold text-gray-900 leading-tight">{milestone.text}</p>
                                    <p className="text-[9px] font-black text-purple-500 uppercase mt-1">{milestone.facade}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: CMS & Aggregated Activity ── */}
                <div className="lg:col-span-3 space-y-8">

                    {/* Top Analytics Bar */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white border border-gray-50 rounded-[2.5rem] p-8 md:col-span-2 shadow-sm">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                    <FiTrendingUp className="text-green-500" /> COLLECTIVE ENGAGEMENT
                                </h3>
                                <div className="flex gap-4">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">WTD</span>
                                    <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest underline decoration-2 underline-offset-4">MTD</span>
                                </div>
                            </div>
                            <div className="h-40 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={ENGAGEMENT_DATA}>
                                        <defs>
                                            <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.15} />
                                                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f9fafb" />
                                        <XAxis dataKey="name" hide />
                                        <Area type="monotone" dataKey="views" stroke="#7C3AED" fillOpacity={1} fill="url(#colorVisits)" strokeWidth={4} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-gray-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl">
                            <FiStar className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
                            <h3 className="text-sm font-black uppercase tracking-widest mb-10 text-white/60">IDENTITY VALUE</h3>
                            <div>
                                <p className="text-[10px] font-black text-teal-400 uppercase tracking-[0.2em] mb-2">REPUTATION STANDING</p>
                                <p className="text-5xl font-black text-white tracking-tighter">Gold+</p>
                                <div className="mt-8 flex items-center gap-3">
                                    <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-teal-400 w-[82%]" />
                                    </div>
                                    <span className="text-[10px] font-black text-teal-400">82%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CMS MANAGER ── Table of Facades with integrated stats */}
                    <div className="bg-white border border-gray-50 rounded-[2.5rem] p-10 shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-2xl font-black text-gray-950 uppercase tracking-tighter">FACADE ORCHESTRATOR</h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 italic">Central CMS for all public-facing projections</p>
                            </div>
                            <button className="bg-gray-950 text-white flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 hover:bg-purple-600 transition-all shadow-lg shadow-purple-200">
                                <FiPlus /> ACTIVATE NEW FACADE
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-50">
                                        <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Projection Surface</th>
                                        <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Reach</th>
                                        <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                                        <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">TrustScore</th>
                                        <th className="pb-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Settings</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {DUMMY_FACADE_STATS.map((stat, idx) => {
                                        const sub = SUB_PROFILES.find(p => p.id === stat.id);
                                        return (
                                            <tr key={stat.id} className="group hover:bg-gray-50/80 transition-all">
                                                <td className="py-8 min-w-[220px]">
                                                    <div className="flex items-center gap-5">
                                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black shadow-inner ${idx === 0 ? 'bg-indigo-50 text-indigo-600' : 'bg-teal-50 text-teal-600'}`}>
                                                            {sub?.title[0]}
                                                        </div>
                                                        <div>
                                                            <p className="text-[13px] font-black text-gray-950 uppercase leading-none mb-1.5">{sub?.title}</p>
                                                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">ID: {idx + 1024}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-8">
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-[12px] font-black text-gray-950">{(stat.views / 1000).toFixed(1)}K</p>
                                                        <span className="text-[8px] font-black text-green-500">+{2 + idx * 3}%</span>
                                                    </div>
                                                </td>
                                                <td className="py-8 text-center">
                                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-colors ${stat.status === 'Active' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-gray-50 text-gray-400 border-gray-100'
                                                        }`}>
                                                        {stat.status}
                                                    </span>
                                                </td>
                                                <td className="py-8 text-center">
                                                    <div className="inline-flex items-center gap-1.5 font-black text-xs text-purple-600 px-3 py-1 bg-purple-50 rounded-lg">
                                                        <FiCheckCircle size={12} /> {stat.score}
                                                    </div>
                                                </td>
                                                <td className="py-8 text-right">
                                                    <button className="p-3 hover:bg-white hover:text-purple-600 rounded-xl text-gray-300 transition-all border border-transparent hover:border-gray-100 shadow-sm">
                                                        <FiMoreVertical size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* PLATFORM PULSE ── Aggregated Activity Feed */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* History Feed */}
                        <div className="bg-white border border-gray-50 rounded-[2.5rem] p-10 shadow-sm">
                            <div className="flex items-center justify-between mb-10">
                                <h3 className="text-xl font-black text-gray-950 uppercase tracking-tighter flex items-center gap-3">
                                    <FiActivity className="text-purple-500" /> PLATFORM PULSE
                                </h3>
                                <button className="text-[9px] font-black text-gray-400 uppercase tracking-widest hover:text-purple-600">FILTER PULSE</button>
                            </div>
                            <div className="space-y-8">
                                {DUMMY_PLATFORM_HISTORY.map((item, idx) => (
                                    <div key={item.id} className="relative flex gap-6 group">
                                        {/* Connector Line */}
                                        {idx !== DUMMY_PLATFORM_HISTORY.length - 1 && (
                                            <div className="absolute left-[11px] top-6 bottom-[-32px] w-[2px] bg-gray-50" />
                                        )}
                                        <div className={`w-6 h-6 rounded-full flex-shrink-0 border-4 border-white shadow-sm z-10 ${item.type === 'milestone' ? 'bg-indigo-500' : item.type === 'upload' ? 'bg-teal-400' : 'bg-purple-600'
                                            }`} />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <p className="text-[10px] font-black text-gray-950 uppercase tracking-tight">{item.text}</p>
                                                <span className="text-[9px] font-bold text-gray-400 uppercase">{item.date}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[9px] font-black text-purple-600 uppercase tracking-[0.2em]">{item.facade} Facade</span>
                                                <FiArrowRight size={10} className="text-gray-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Visual Footprint (Instagram Grid Style) */}
                        <div className="bg-white border border-gray-50 rounded-[2.5rem] p-10 shadow-sm">
                            <div className="flex items-center justify-between mb-10">
                                <h3 className="text-xl font-black text-gray-950 uppercase tracking-tighter">CROSS-FACADE MEDIA</h3>
                                <FiShare2 className="text-gray-400" />
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="aspect-square bg-gray-50 rounded-2xl overflow-hidden group relative cursor-pointer shadow-inner">
                                        <img src={`https://picsum.photos/400/400?random=${i + 40}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Activity media" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                                            <span className="text-[8px] font-black uppercase tracking-widest mb-1">VIEW PROOF</span>
                                            <FiEye size={16} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-8 bg-gray-50 hover:bg-white hover:border-purple-200 border border-transparent py-4 rounded-2xl text-[10px] font-black text-gray-500 uppercase tracking-widest transition-all">
                                MANAGE FULL ASSET LIBRARY
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </ProfileSkillLayout>
    );
}
