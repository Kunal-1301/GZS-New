import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FiPlus, FiTool, FiActivity, FiShield, FiCode,
    FiServer, FiCpu, FiAward, FiCheckCircle, FiExternalLink,
    FiGithub, FiCpu as FiEngine, FiLayers, FiInfo
} from 'react-icons/fi';
import ProfileSkillLayout from './ProfileSkillLayout';
import { SUB_PROFILES } from '@data/profileSkillData';

export default function DeveloperFacade() {
    const navigate = useNavigate();
    const profile = SUB_PROFILES.find(p => p.id === 'game-creation');

    return (
        <ProfileSkillLayout
            title="DEVELOPMENT & ENGINEERING FACADE"
            subtitle="Projecting your technical architecture and production history."
            badge="ENGINEERING OVERRIDE"
            footer={`Managing localized technical identity for ${profile.title}. Activity contributes to Global Trust Score.`}
        >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 font-body pb-20">

                {/* ── LEFT: Technical Pillar (1 Col) ── */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <FiCode size={48} />
                        </div>
                        <div className="w-24 h-24 bg-gray-950 text-white rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-xl">
                            <FiCpu size={32} />
                        </div>
                        <h3 className="text-xl font-black text-gray-950 uppercase leading-tight mb-2">GAMEPLAY PROGRAMMER</h3>
                        <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-10">SENIOR TECHNICAL FACADE</p>

                        <div className="space-y-4 pt-10 border-t border-gray-50 text-left">
                            {[
                                { label: 'TRUST SCORE', val: '96/100', icon: FiShield, color: 'text-green-500' },
                                { label: 'SHIPPED ASSETS', val: '12 PACKS', icon: FiLayers, color: 'text-blue-500' },
                                { label: 'GITHUB INTEGRATED', val: 'ACTIVE', icon: FiGithub, color: 'text-gray-950' }
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

                    <div className="bg-purple-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group">
                        <h4 className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-4">AVAILABILITY</h4>
                        <p className="text-sm font-bold leading-relaxed mb-6">Open for high-stakes systems refactoring or engine-level optimization contracts.</p>
                        <button className="w-full bg-white text-purple-600 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-colors">
                            REQUEST CV / REPO
                        </button>
                    </div>
                </div>

                {/* ── RIGHT: Deep Dive (3 Cols) ── */}
                <div className="lg:col-span-3 space-y-8">

                    {/* Specialized Core */}
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
                        <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8">ENGINEERING SPECIALIZATION CORE</h2>
                        <div className="flex flex-wrap gap-3">
                            {['Systems Architecture', 'C++ Performance', 'Network Replication', 'Shaders & VFX', 'Tooling & CI/CD'].map(tag => (
                                <span key={tag} className="bg-gray-50 text-gray-950 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-gray-100 hover:border-purple-400 transition-colors cursor-default">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Atomic Skill Matrix */}
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-2xl font-black text-gray-950 uppercase tracking-tighter">ATOMIC SKILL MATRIX</h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Technical proof-of-knowledge layers</p>
                            </div>
                            <button className="bg-gray-950 text-white flex items-center gap-3 px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest">
                                <FiPlus /> ADD TECHNICAL SKILL
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { name: 'C++ Memory Management', level: 'Master', status: 'Verified' },
                                { name: 'UE5 Blueprint Architecture', level: 'Advanced', status: 'In-Review' },
                                { name: 'SQL Database Design', level: 'Intermediate', status: 'Unverified' },
                                { name: 'GLSL/HLSL Programming', level: 'Advanced', status: 'Verified' }
                            ].map(skill => (
                                <div key={skill.name} className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem] border border-gray-100 hover:bg-white transition-all shadow-sm hover:shadow-md">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-purple-600 shadow-sm">
                                            <FiCode />
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

                    {/* Shipped Work */}
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
                        <h3 className="text-2xl font-black text-gray-950 uppercase tracking-tighter mb-10">SHIPPED PROJECTS & TITLES</h3>
                        <div className="space-y-6">
                            <div className="bg-gray-50 border border-gray-100 rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-10 items-center group">
                                <div className="w-48 h-32 bg-gray-200 rounded-[2rem] overflow-hidden">
                                    <img src="https://picsum.photos/400/300?random=50" className="w-full h-full object-cover" alt="Project" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h4 className="text-lg font-black text-gray-950 uppercase">Neon Shift (Indie)</h4>
                                        <span className="text-[9px] font-black bg-purple-100 text-purple-600 px-2 py-0.5 rounded uppercase">LEAD TECHNICAL</span>
                                    </div>
                                    <p className="text-xs text-gray-500 leading-relaxed mb-6">Engineered core movement networking and 3C logic. Refactored server-authoritative components to support high-latency stability.</p>
                                    <div className="flex gap-4">
                                        <button className="text-[9px] font-black text-gray-950 uppercase tracking-widest border-b-2 border-purple-400">VIEW REPO CASE STUDY</button>
                                        <FiExternalLink size={12} className="text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Experience Context */}
                    <div className="bg-gray-950 rounded-[2.5rem] p-12 text-white relative overflow-hidden">
                        <FiInfo className="absolute -bottom-10 -right-10 w-64 h-64 opacity-5" />
                        <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-10">PRODUCTION SCALE CONTEXT</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div>
                                <p className="text-[8px] font-black text-purple-400 uppercase tracking-widest mb-2">TEAM COHESION</p>
                                <p className="text-sm font-black uppercase">MID-SIZE INDIE (20-40)</p>
                                <p className="text-[9px] text-gray-500 font-bold uppercase mt-1">AGILE SCRUM EXPOSURE</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-purple-400 uppercase tracking-widest mb-2">REVENUE IMPACT</p>
                                <p className="text-sm font-black uppercase">$500K+ REVENUE GENERATED</p>
                                <p className="text-[9px] text-gray-500 font-bold uppercase mt-1">COMMERCIAL SUCCESS</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-purple-400 uppercase tracking-widest mb-2">ARCH. FOCUS</p>
                                <p className="text-sm font-black uppercase">CLIENT-SERVER P2P</p>
                                <p className="text-[9px] text-gray-500 font-bold uppercase mt-1">OPTIMIZED FOR SCALE</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </ProfileSkillLayout>
    );
}
