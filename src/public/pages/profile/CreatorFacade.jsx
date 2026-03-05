import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FiPlus, FiTool, FiActivity, FiShield, FiVideo,
    FiUsers, FiAward, FiCheckCircle, FiExternalLink,
    FiYoutube, FiTwitter, FiMessageSquare, FiInfo,
    FiTrendingUp, FiLayers, FiCamera
} from 'react-icons/fi';
import ProfileSkillLayout from './ProfileSkillLayout';
import { SUB_PROFILES } from '@data/profileSkillData';

export default function CreatorFacade() {
    const navigate = useNavigate();
    const profile = SUB_PROFILES.find(p => p.id === 'content-media');

    return (
        <ProfileSkillLayout
            title="CONTENT & COMMUNITY FACADE"
            subtitle="Projecting your digital influence, broadast reach, and community impact."
            badge="CREATOR OVERRIDE"
            footer={`Managing localized influence identity for ${profile.title}. Activity contributes to Global Reach Score.`}
        >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 font-body pb-20">

                {/* ── LEFT: Influence Pillar (1 Col) ── */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <FiVideo size={48} />
                        </div>
                        <div className="w-24 h-24 bg-red-600 text-white rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-xl">
                            <FiCamera size={32} />
                        </div>
                        <h3 className="text-xl font-black text-gray-950 uppercase leading-tight mb-2">BROADCAST HOST</h3>
                        <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-10">SENIOR CREATOR FACADE</p>

                        <div className="space-y-4 pt-10 border-t border-gray-50 text-left">
                            {[
                                { label: 'TOTAL REACH', val: '240K+', icon: FiUsers, color: 'text-blue-500' },
                                { label: 'PEAK CCV', val: '8.4K', icon: FiTrendingUp, color: 'text-green-500' },
                                { label: 'VERIFIED BRAND', val: 'PARTNER', icon: FiAward, color: 'text-orange-500' }
                            ].map((stat, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                    <stat.icon className={stat.color} size={14} />
                                    <div className="text-right">
                                        <p className="text-[8px] font-black text-gray-400 uppercase">{stat.label}</p>
                                        <p className="text-[11px] font-black text-gray-950 uppercase">{stat.val}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-red-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group">
                        <h4 className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-4">AVAILABILITY</h4>
                        <p className="text-sm font-bold leading-relaxed mb-6">Open for high-tier event hosting or dedicated brand ambassadorship contracts.</p>
                        <button className="w-full bg-white text-red-600 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-colors">
                            CONTACT FOR COLLAB
                        </button>
                    </div>
                </div>

                {/* ── RIGHT: Deep Dive (3 Cols) ── */}
                <div className="lg:col-span-3 space-y-8">

                    {/* Content Specialization */}
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
                        <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8">CONTENT FOCUS & FORMAT</h2>
                        <div className="flex flex-wrap gap-3">
                            {['Live Broadcasting', 'Tactical Analysis', 'Community Dev', 'IRL Event Hosting', 'Podcast Production'].map(tag => (
                                <span key={tag} className="bg-gray-50 text-gray-950 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-gray-100 hover:border-red-400 transition-colors cursor-default">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Capability Matrix */}
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-2xl font-black text-gray-950 uppercase tracking-tighter">CAPABILITY MATRIX</h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Verified production & performance layers</p>
                            </div>
                            <button className="bg-gray-950 text-white flex items-center gap-3 px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest">
                                <FiPlus /> ADD EXPERTISE
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { name: 'Real-time Broadcasting', level: 'Expert', status: 'Verified' },
                                { name: 'Crowd Retention Strategies', level: 'Advanced', status: 'Verified' },
                                { name: 'Discord Architecture', level: 'Intermediate', status: 'In-Review' },
                                { name: 'Live Event Anchoring', level: 'Advanced', status: 'Verified' }
                            ].map(skill => (
                                <div key={skill.name} className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem] border border-gray-100 hover:bg-white transition-all shadow-sm hover:shadow-md">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-600 shadow-sm">
                                            <FiVideo />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-gray-950 uppercase">{skill.name}</p>
                                            <p className="text-[9px] font-bold text-gray-400 uppercase">{skill.level}</p>
                                        </div>
                                    </div>
                                    <span className={`text-[8px] font-black px-3 py-1 rounded-full ${skill.status === 'Verified' ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>
                                        {skill.status.toUpperCase()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Brand & Event Showcase */}
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
                        <h3 className="text-2xl font-black text-gray-950 uppercase tracking-tighter mb-10">BRAND PARTNERSHIPS & EVENTS</h3>
                        <div className="space-y-6">
                            <div className="bg-gray-50 border border-gray-100 rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-10 items-center group">
                                <div className="w-48 h-32 bg-gray-200 rounded-[2rem] overflow-hidden">
                                    <img src="https://picsum.photos/400/300?random=60" className="w-full h-full object-cover" alt="Event" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h4 className="text-lg font-black text-gray-950 uppercase">Gzone Pro Finals 2024</h4>
                                        <span className="text-[9px] font-black bg-red-100 text-red-600 px-2 py-0.5 rounded uppercase">MAIN DESK HOST</span>
                                    </div>
                                    <p className="text-xs text-gray-500 leading-relaxed mb-6">Anchored the analyst desk for the Tier 1 global final. Managed live transitions, interviews, and strategic breakdowns.</p>
                                    <div className="flex gap-4">
                                        <button className="text-[9px] font-black text-gray-950 uppercase tracking-widest border-b-2 border-red-400">VIEW BROADCAST CLIP</button>
                                        <FiExternalLink size={12} className="text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Distribution & Reach Context */}
                    <div className="bg-gray-950 rounded-[2.5rem] p-12 text-white relative overflow-hidden">
                        <FiInfo className="absolute -bottom-10 -right-10 w-64 h-64 opacity-5" />
                        <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-10">DISTRIBUTION & REACH CONTEXT</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div>
                                <p className="text-[8px] font-black text-red-400 uppercase tracking-widest mb-2">PRIMARY PLATFORM</p>
                                <p className="text-sm font-black uppercase">TWITCH PARTNER (120K+)</p>
                                <p className="text-[9px] text-gray-500 font-bold uppercase mt-1">HIGH CHAT VELOCITY</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-red-400 uppercase tracking-widest mb-2">ENGAGEMENT RATE</p>
                                <p className="text-sm font-black uppercase">8.4% (INDUSTRY HIGH)</p>
                                <p className="text-[9px] text-gray-500 font-bold uppercase mt-1">ORGANIC GROWTH DEPTH</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-red-400 uppercase tracking-widest mb-2">TARGET AUDIENCE</p>
                                <p className="text-sm font-black uppercase">COMPETITIVE PC GAMERS</p>
                                <p className="text-[9px] text-gray-500 font-bold uppercase mt-1">GEN-Z / MILLENNIAL MIX</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </ProfileSkillLayout>
    );
}
