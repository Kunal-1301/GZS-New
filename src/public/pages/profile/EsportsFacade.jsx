import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FiZap, FiShield, FiActivity, FiTool, FiBriefcase,
    FiCheckCircle, FiInfo, FiPlus, FiStar, FiTrendingUp,
    FiUser, FiMessageSquare, FiExternalLink, FiPlayCircle,
    FiHeart, FiArrowRight, FiTarget, FiAward, FiEye
} from 'react-icons/fi';
import ProfileSkillLayout from './ProfileSkillLayout';
import { SUB_PROFILES } from '@data/profileSkillData';

export default function EsportsFacade() {
    const navigate = useNavigate();
    const [isFacadeOnline, setIsFacadeOnline] = useState(true);
    const profile = SUB_PROFILES.find(p => p.id === 'esports');

    return (
        <ProfileSkillLayout
            title="ESPORTS & PERFORMANCE FACADE"
            subtitle="Projecting your tactical expertise and competitive legacy."
            badge="OVERRIDE ACTIVE"
            footer={`Managing localized competitive persona for ${profile.title}.`}
        >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 font-body pb-20">

                {/* ── LEFT: Competitive Pillar (1 Col) ── */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Persona Card */}
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <FiShield size={48} />
                        </div>
                        <div className="relative z-10 text-center">
                            <div className="relative inline-block mb-8">
                                <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl mx-auto flex items-center justify-center text-white text-4xl font-black shadow-xl shadow-indigo-500/20">
                                    S
                                </div>
                                <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center ${isFacadeOnline ? 'bg-green-500' : 'bg-gray-400'}`}>
                                    <FiZap className="w-4 h-4 text-white" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-black text-gray-950 leading-tight mb-2">SLAYER99</h2>
                            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-10">PRO GAMER FACADE</p>

                            <div className="space-y-4 pt-10 border-t border-gray-50 text-left">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                    <FiAward className="text-purple-600" size={14} />
                                    <div className="text-right">
                                        <p className="text-[8px] font-black text-gray-400 uppercase">TIER SCORE</p>
                                        <p className="text-[12px] font-black text-gray-950 uppercase">88/100</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                    <FiTarget className="text-red-500" size={14} />
                                    <div className="text-right">
                                        <p className="text-[8px] font-black text-gray-400 uppercase">RANKING</p>
                                        <p className="text-[12px] font-black text-gray-950 uppercase">RADIANT #241</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsFacadeOnline(!isFacadeOnline)}
                                className="w-full mt-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-gray-100 hover:bg-gray-50 transition-all"
                            >
                                {isFacadeOnline ? 'STATUS: LFG ACTIVE' : 'STATUS: HIDDEN'}
                            </button>
                        </div>
                    </div>

                    {/* Opportunity Dock */}
                    <div className="bg-gray-950 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                        <FiStar className="absolute -top-4 -right-4 w-32 h-32 opacity-10 rotate-12 group-hover:scale-110 transition-transform" />
                        <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-6">OPPORTUNITY DOCK</h4>
                        <div className="space-y-3">
                            {['Open for Team Tryouts', 'Available for Coaching', 'Scrim Partner LFG'].map(action => (
                                <button key={action} className="w-full bg-white/5 hover:bg-white/10 p-4 rounded-xl flex justify-between items-center group/btn transition-all">
                                    <span className="text-[9px] font-black uppercase">{action}</span>
                                    <FiArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: Deep Dive (3 Cols) ── */}
                <div className="lg:col-span-3 space-y-8">

                    {/* Competitive Stack */}
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-8">COMPETITIVE STACK OVERRIDE</h3>
                        <div className="flex flex-wrap gap-3">
                            {['Valorant (Pro Tier)', 'CS2 (Faceit L10)', 'Tactical Shotcalling', 'Entry Fragger', 'Team Captain'].map(tag => (
                                <span key={tag} className="bg-gray-50 text-gray-950 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-gray-100 hover:border-indigo-400 transition-colors cursor-default">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Performance Signals */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h3 className="text-2xl font-black text-gray-950 uppercase tracking-tighter">SIGNAL PERFORMANCE</h3>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Real-time mechanical analytics</p>
                                </div>
                                <FiTrendingUp className="text-green-500" size={24} />
                            </div>
                            <div className="space-y-4">
                                {[
                                    { label: 'Aim Precision (Avg)', val: '24.2%', trend: '+1.2%' },
                                    { label: 'Win Rate (Ranked)', val: '68%', trend: 'Stable' },
                                    { label: 'K/D Ratio', val: '1.42', trend: '+0.08' }
                                ].map(sig => (
                                    <div key={sig.label} className="flex justify-between items-center p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-tight">{sig.label}</span>
                                        <div className="text-right">
                                            <p className="text-[14px] font-black text-gray-950 uppercase leading-none mb-1">{sig.val}</p>
                                            <p className="text-[9px] font-bold text-green-600 uppercase">{sig.trend}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tactical History (Simplified Milestone) */}
                        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-8">TACTICAL HISTORY</h3>
                            <div className="space-y-8">
                                {[
                                    { event: 'Won ESL Pro League Qualifier', date: 'Jan 2024', badge: 'Gold' },
                                    { event: 'Joined "Alpha Squad" Pro Team', date: 'Nov 2023', badge: 'Contract' },
                                    { event: 'Reached Radiant Rank', date: 'Aug 2023', badge: 'Skill' }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 relative">
                                        {i !== 2 && <div className="absolute left-[7px] top-6 bottom-[-32px] w-[1px] bg-gray-100" />}
                                        <div className="w-4 h-4 rounded-full border-2 border-indigo-500 bg-white z-10" />
                                        <div>
                                            <p className="text-xs font-black text-gray-950 mb-1">{item.event}</p>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[9px] font-bold text-gray-400 uppercase">{item.date}</span>
                                                <span className="text-[8px] font-black bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded uppercase">{item.badge}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Media Highlights (High Quality Grid) */}
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-2xl font-black text-gray-950 uppercase tracking-tighter">VERIFIED HIGHLIGHTS</h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Clips synced via integrated platform proof</p>
                            </div>
                            <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">BROWSE LIBRARY</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[1, 2, 6].map(i => (
                                <div key={i} className="aspect-video bg-gray-100 rounded-[2rem] overflow-hidden group relative cursor-pointer shadow-inner">
                                    <img src={`https://picsum.photos/800/450?random=${i + 20}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Highlight" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                                        <div className="bg-white/20 backdrop-blur-xl p-4 rounded-full border border-white/20 mb-4">
                                            <FiPlayCircle size={32} />
                                        </div>
                                        <span className="text-[9px] font-black uppercase tracking-widest">WATCH CLUTCH</span>
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                        <span className="text-[8px] font-black bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur text-white uppercase">SENS: 0.8 / 1600DPI</span>
                                        <div className="flex gap-2">
                                            <FiHeart size={14} className="text-white" />
                                            <FiMessageSquare size={14} className="text-white" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </ProfileSkillLayout>
    );
}
