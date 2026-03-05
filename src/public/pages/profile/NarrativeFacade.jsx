import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FiPlus, FiActivity, FiBriefcase, FiBookOpen, FiEdit3,
    FiMessageCircle, FiAlignLeft, FiCheckCircle, FiExternalLink, FiTool,
    FiFileText, FiBook, FiInfo, FiLayers
} from 'react-icons/fi';
import ProfileSkillLayout from './ProfileSkillLayout';
import { SUB_PROFILES } from '@data/profileSkillData';

export default function NarrativeFacade() {
    const navigate = useNavigate();
    const profile = SUB_PROFILES.find(p => p.id === 'writing-narrative');

    return (
        <ProfileSkillLayout
            title="WRITING & NARRATIVE FACADE"
            subtitle="Projecting your storytelling architecture, dialogue crafting, and worldbuilding."
            badge="NARRATIVE OVERRIDE"
            footer={`Managing localized narrative identity for ${profile.title}. Activity contributes to Global Creative Score.`}
        >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 font-body pb-20">

                {/* ── LEFT: Narrative Pillar (1 Col) ── */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <FiBookOpen size={48} />
                        </div>
                        <div className="w-24 h-24 bg-indigo-600 text-white rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-xl">
                            <FiEdit3 size={32} />
                        </div>
                        <h3 className="text-xl font-black text-gray-950 uppercase leading-tight mb-2">NARRATIVE DESIGNER</h3>
                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-10">SENIOR WRITER FACADE</p>

                        <div className="space-y-4 pt-10 border-t border-gray-50 text-left">
                            {[
                                { label: 'WORDS PUBLISHED', val: '150K+', icon: FiAlignLeft, color: 'text-purple-500' },
                                { label: 'BRANCHING LOGIC', val: 'EXPERT', icon: FiLayers, color: 'text-indigo-500' },
                                { label: 'SHIPPED GAMES', val: '2 MAJOR', icon: FiBook, color: 'text-blue-500' }
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

                    <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group">
                        <h4 className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-4">AVAILABILITY</h4>
                        <p className="text-sm font-bold leading-relaxed mb-6">Open for contract narrative design, worldbuilding bibles, or dialogue punching.</p>
                        <button className="w-full bg-white text-indigo-600 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-colors">
                            READ SAMPLES
                        </button>
                    </div>
                </div>

                {/* ── RIGHT: Deep Dive (3 Cols) ── */}
                <div className="lg:col-span-3 space-y-8">

                    {/* Narrative Focus */}
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
                        <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8">TONE & GENRE DOMAIN</h2>
                        <div className="flex flex-wrap gap-3">
                            {['Dark Fantasy', 'Branching CRPG Dialogue', 'Environmental Lore', 'Banter Scripts', 'Worldbuilding Bibles'].map(tag => (
                                <span key={tag} className="bg-gray-50 text-gray-950 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-gray-100 hover:border-indigo-400 transition-colors cursor-default">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Writing Capability Matrix */}
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-2xl font-black text-gray-950 uppercase tracking-tighter">WRITING CAPABILITY MATRIX</h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Verified storytelling & narrative architecture skills</p>
                            </div>
                            <button className="bg-gray-950 text-white flex items-center gap-3 px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest">
                                <FiPlus /> ADD WRITING SKILL
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { name: 'Branching Dialogue (Twine)', level: 'Expert', status: 'Verified' },
                                { name: 'Worldbuilding & Lore', level: 'Advanced', status: 'Verified' },
                                { name: 'Quest Logic Design', level: 'Intermediate', status: 'In-Review' },
                                { name: 'VO Script formatting', level: 'Advanced', status: 'Verified' }
                            ].map(skill => (
                                <div key={skill.name} className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem] border border-gray-100 hover:bg-white transition-all shadow-sm hover:shadow-md">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
                                            <FiMessageCircle />
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

                    {/* Writing Tools */}
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
                        <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8">WRITING PIPELINE & TOOLS</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            {['Twine', 'Articy: Draft', 'Ink', 'Google Docs', 'Miro'].map(tool => (
                                <div key={tool} className="bg-gray-50 border border-gray-100 p-6 rounded-2xl flex flex-col items-center hover:border-indigo-400 transition-all cursor-default group">
                                    <div className="w-10 h-10 bg-white rounded-xl mb-3 flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors shadow-sm">
                                        <FiTool />
                                    </div>
                                    <span className="text-[10px] font-black text-gray-950 uppercase text-center">{tool}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shipped Narratives */}
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
                        <h3 className="text-2xl font-black text-gray-950 uppercase tracking-tighter mb-10">SHIPPED NARRATIVES & IPS</h3>
                        <div className="space-y-6">
                            <div className="bg-gray-50 border border-gray-100 rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-10 items-center group">
                                <div className="w-48 h-32 bg-gray-200 rounded-[2rem] overflow-hidden relative flex items-center justify-center">
                                    <img src="https://picsum.photos/400/300?random=90" className="absolute inset-0 w-full h-full object-cover opacity-80" alt="Narrative Project" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h4 className="text-lg font-black text-gray-950 uppercase">Crimson Protocol (CRPG)</h4>
                                        <span className="text-[9px] font-black bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded uppercase">LEAD WRITER - SHIPPED 2024</span>
                                    </div>
                                    <p className="text-xs text-gray-500 leading-relaxed mb-6">Architected the core narrative tree using Articy: Draft. Wrote over 80,000 words of branching dialogue, companion banters, and item lore descriptions.</p>
                                    <div className="flex gap-4">
                                        <button className="text-[9px] font-black text-gray-950 uppercase tracking-widest border-b-2 border-indigo-400">READ DIALOGUE EXCERPT</button>
                                        <FiExternalLink size={12} className="text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Narrative Scope Context */}
                    <div className="bg-gray-950 rounded-[2.5rem] p-12 text-white relative overflow-hidden">
                        <FiInfo className="absolute -bottom-10 -right-10 w-64 h-64 opacity-5" />
                        <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-10">NARRATIVE SCOPE & ARCHITECTURE</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div>
                                <p className="text-[8px] font-black text-indigo-400 uppercase tracking-widest mb-2">DIALOGUE SYSTEM</p>
                                <p className="text-sm font-black uppercase">CRPG BRANCHING TREES</p>
                                <p className="text-[9px] text-gray-500 font-bold uppercase mt-1">HIGH REACTIVITY</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-indigo-400 uppercase tracking-widest mb-2">LORE INTEGRATION</p>
                                <p className="text-sm font-black uppercase">ITEM & ENVIRONMENT</p>
                                <p className="text-[9px] text-gray-500 font-bold uppercase mt-1">SOULS-LIKE STORYTELLING</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-indigo-400 uppercase tracking-widest mb-2">VOICEOVER DIRECTION</p>
                                <p className="text-sm font-black uppercase">VO SCRIPTING PREPPED</p>
                                <p className="text-[9px] text-gray-500 font-bold uppercase mt-1">ACTOR READY FORMATS</p>
                            </div>
                        </div>
                    </div>

                    {/* Collaborative Spotlight */}
                    <div className="bg-indigo-50 rounded-[2.5rem] p-10 border border-indigo-100 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-black text-indigo-900 uppercase tracking-tight mb-2">CROSS-DISCIPLINE COLLABORATOR</h3>
                            <p className="text-sm text-indigo-700 max-w-lg">Experienced in working tightly with level designers to ensure narrative beats align perfectly with spatial pacing and gameplay mechanics.</p>
                        </div>
                        <div className="hidden md:flex bg-indigo-100 w-16 h-16 rounded-2xl items-center justify-center text-indigo-600">
                            <FiFileText size={32} />
                        </div>
                    </div>

                </div>
            </div>
        </ProfileSkillLayout>
    );
}
