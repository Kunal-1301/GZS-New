import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FiPlus, FiActivity, FiBriefcase, FiHeadphones, FiRadio,
    FiMusic, FiSliders, FiCheckCircle, FiExternalLink, FiTool,
    FiMic, FiPlayCircle, FiInfo, FiLayers
} from 'react-icons/fi';
import ProfileSkillLayout from './ProfileSkillLayout';
import { SUB_PROFILES } from '@data/profileSkillData';

export default function AudioFacade() {
    const navigate = useNavigate();
    const profile = SUB_PROFILES.find(p => p.id === 'music-audio');

    return (
        <ProfileSkillLayout
            title="MUSIC & AUDIO FACADE"
            subtitle="Projecting your sonic identity, sound design expertise, and composition portfolio."
            badge="AUDIO OVERRIDE"
            footer={`Managing localized audio identity for ${profile.title}. Activity contributes to Global Creative Score.`}
        >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 font-body pb-20">

                {/* ── LEFT: Sonic Pillar (1 Col) ── */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <FiHeadphones size={48} />
                        </div>
                        <div className="w-24 h-24 bg-teal-600 text-white rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-xl">
                            <FiRadio size={32} />
                        </div>
                        <h3 className="text-xl font-black text-gray-950 uppercase leading-tight mb-2">SOUND DESIGNER</h3>
                        <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest mb-10">AUDIO ENGINEER FACADE</p>

                        <div className="space-y-4 pt-10 border-t border-gray-50 text-left">
                            {[
                                { label: 'TRACKS / SFX', val: '2.4K+', icon: FiMusic, color: 'text-purple-500' },
                                { label: 'MIDDLEWARE SKILLS', val: 'EXPERT', icon: FiSliders, color: 'text-blue-500' },
                                { label: 'SHIPPED GAMES', val: '6 INDIE', icon: FiLayers, color: 'text-teal-500' }
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

                    <div className="bg-teal-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group">
                        <h4 className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-4">AVAILABILITY</h4>
                        <p className="text-sm font-bold leading-relaxed mb-6">Open for freelance sound design, foley recording, or contract music composition.</p>
                        <button className="w-full bg-white text-teal-600 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-colors">
                            HEAR REEL
                        </button>
                    </div>
                </div>

                {/* ── RIGHT: Deep Dive (3 Cols) ── */}
                <div className="lg:col-span-3 space-y-8">

                    {/* Sonic Focus */}
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
                        <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8">SONIC LANDSCAPE & PHILOSOPHY</h2>
                        <div className="flex flex-wrap gap-3">
                            {['Dark Synthwave', 'Weapon Foley', 'Spatial Audio (HRTF)', 'Adaptive Scoring', 'Voice Over Directing'].map(tag => (
                                <span key={tag} className="bg-gray-50 text-gray-950 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-gray-100 hover:border-teal-400 transition-colors cursor-default">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Audio Capability Matrix */}
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-2xl font-black text-gray-950 uppercase tracking-tighter">AUDIO CAPABILITY MATRIX</h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Verified audio engineering & music production skills</p>
                            </div>
                            <button className="bg-gray-950 text-white flex items-center gap-3 px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest">
                                <FiPlus /> ADD AUDIO SKILL
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { name: 'Weapon SFX Design', level: 'Expert', status: 'Verified' },
                                { name: 'Interactive Music (Wwise)', level: 'Advanced', status: 'Verified' },
                                { name: 'Foley Recording', level: 'Intermediate', status: 'In-Review' },
                                { name: 'Audio Optimization / Mixing', level: 'Advanced', status: 'Verified' }
                            ].map(skill => (
                                <div key={skill.name} className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem] border border-gray-100 hover:bg-white transition-all shadow-sm hover:shadow-md">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-teal-600 shadow-sm">
                                            <FiMic />
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

                    {/* DAW & Middleware Tools */}
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
                        <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8">TOOLS & MIDDLEWARE</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            {['FMOD', 'Wwise', 'Ableton Live', 'Pro Tools', 'Reaper'].map(tool => (
                                <div key={tool} className="bg-gray-50 border border-gray-100 p-6 rounded-2xl flex flex-col items-center hover:border-teal-400 transition-all cursor-default group">
                                    <div className="w-10 h-10 bg-white rounded-xl mb-3 flex items-center justify-center text-gray-400 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors shadow-sm">
                                        <FiTool />
                                    </div>
                                    <span className="text-[10px] font-black text-gray-950 uppercase text-center">{tool}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Discography & Integration */}
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
                        <h3 className="text-2xl font-black text-gray-950 uppercase tracking-tighter mb-10">SHIPPED AUDIO & DISCOGRAPHY</h3>
                        <div className="space-y-6">
                            <div className="bg-gray-50 border border-gray-100 rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-10 items-center group">
                                <div className="w-48 h-32 bg-gray-200 rounded-[2rem] overflow-hidden relative flex items-center justify-center">
                                    <img src="https://picsum.photos/400/300?random=80" className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Audio Project" />
                                    <FiPlayCircle size={40} className="relative z-10 text-white drop-shadow-lg" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h4 className="text-lg font-black text-gray-950 uppercase">Neon Horizon OST & SFX</h4>
                                        <span className="text-[9px] font-black bg-teal-100 text-teal-700 px-2 py-0.5 rounded uppercase">LEAD AUDIO - SHIPPED 2023</span>
                                    </div>
                                    <p className="text-xs text-gray-500 leading-relaxed mb-6">Composed 45 minutes of dynamic synthwave music and designed over 500 bespoke sound effects, implemented fully via FMOD into a custom Unity pipeline.</p>
                                    <div className="flex gap-4">
                                        <button className="text-[9px] font-black text-gray-950 uppercase tracking-widest border-b-2 border-teal-400">LISTEN ON SPOTIFY</button>
                                        <FiExternalLink size={12} className="text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sonic Branding Context */}
                    <div className="bg-gray-950 rounded-[2.5rem] p-12 text-white relative overflow-hidden">
                        <FiInfo className="absolute -bottom-10 -right-10 w-64 h-64 opacity-5" />
                        <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-10">SONIC BRANDING & CONTEXT</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div>
                                <p className="text-[8px] font-black text-teal-400 uppercase tracking-widest mb-2">GENRE SPECIALTY</p>
                                <p className="text-sm font-black uppercase">ELECTRONIC / HDR METALLIC</p>
                                <p className="text-[9px] text-gray-500 font-bold uppercase mt-1">PRIMARY VIBE</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-teal-400 uppercase tracking-widest mb-2">MIDDLEWARE PROFICIENCY</p>
                                <p className="text-sm font-black uppercase">FMOD STUDIO TIER 3</p>
                                <p className="text-[9px] text-gray-500 font-bold uppercase mt-1">CUSTOM DSP C# IMPLEMENTATION</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-teal-400 uppercase tracking-widest mb-2">RECORDING SETUP</p>
                                <p className="text-sm font-black uppercase">TREATED HOME STUDIO</p>
                                <p className="text-[9px] text-gray-500 font-bold uppercase mt-1">AVAILABLE FOR REMOTE FOLEY</p>
                            </div>
                        </div>
                    </div>

                    {/* Licensing & Compliance Spotlight */}
                    <div className="bg-teal-50 rounded-[2.5rem] p-10 border border-teal-100 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-black text-teal-900 uppercase tracking-tight mb-2">LICENSING & ROYALTY PREFERENCES</h3>
                            <p className="text-sm text-teal-700 max-w-lg">Prefers custom exclusive licensing for game projects. All portfolio works are original compositions actively registered with PROs (BMI/ASCAP).</p>
                        </div>
                        <div className="hidden md:flex bg-teal-100 w-16 h-16 rounded-2xl items-center justify-center text-teal-600">
                            <FiMusic size={32} />
                        </div>
                    </div>

                </div>
            </div>
        </ProfileSkillLayout>
    );
}

