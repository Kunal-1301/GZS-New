import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FiPlus, FiTool, FiActivity, FiShield, FiBriefcase,
    FiTrendingUp, FiTarget, FiDollarSign, FiCheckCircle, FiExternalLink,
    FiBarChart2, FiPieChart, FiInfo, FiLayers
} from 'react-icons/fi';
import ProfileSkillLayout from './ProfileSkillLayout';
import { SUB_PROFILES } from '@data/profileSkillData';

export default function StrategyFacade() {
    const navigate = useNavigate();
    const profile = SUB_PROFILES.find(p => p.id === 'business-strategy');

    return (
        <ProfileSkillLayout
            title="BUSINESS & STRATEGY FACADE"
            subtitle="Projecting your leadership, production scale, and market impact."
            badge="LEADERSHIP OVERRIDE"
            footer={`Managing localized strategy identity for ${profile.title}. Activity contributes to Global Governance Score.`}
        >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 font-body pb-20">

                {/* ── LEFT: Leadership Pillar (1 Col) ── */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <FiBriefcase size={48} />
                        </div>
                        <div className="w-24 h-24 bg-blue-900 text-white rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-xl">
                            <FiTarget size={32} />
                        </div>
                        <h3 className="text-xl font-black text-gray-950 uppercase leading-tight mb-2">GAME PRODUCER</h3>
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-10">EXECUTIVE STRATEGY FACADE</p>

                        <div className="space-y-4 pt-10 border-t border-gray-50 text-left">
                            {[
                                { label: 'TEAMS MANAGED', val: '50+ STAFF', icon: FiUsers, color: 'text-purple-500' },
                                { label: 'BUDGET SCOPE', val: '$10M+', icon: FiDollarSign, color: 'text-green-500' },
                                { label: 'SHIPPED TITLES', val: '4 MAJOR', icon: FiLayers, color: 'text-blue-500' }
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

                    <div className="bg-blue-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group">
                        <h4 className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-4">AVAILABILITY</h4>
                        <p className="text-sm font-bold leading-relaxed mb-6">Open for executive advisory or full-cycle studio leadership roles in AA/AAA spaces.</p>
                        <button className="w-full bg-white text-blue-900 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-colors">
                            REQUEST PORTFOLIO
                        </button>
                    </div>
                </div>

                {/* ── RIGHT: Deep Dive (3 Cols) ── */}
                <div className="lg:col-span-3 space-y-8">

                    {/* Strategy Focus */}
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
                        <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8">STRATEGIC EXPERTISE CORE</h2>
                        <div className="flex flex-wrap gap-3">
                            {['Risk & Scope Management', 'Live-Ops Monetization', 'Cross-Discipline Agile', 'Publishing Negotiations', 'Studio P&L'].map(tag => (
                                <span key={tag} className="bg-gray-50 text-gray-950 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-gray-100 hover:border-blue-400 transition-colors cursor-default">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Operations Matrix */}
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-2xl font-black text-gray-950 uppercase tracking-tighter">OPERATIONS MATRIX</h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Verified management & financial capabilities</p>
                            </div>
                            <button className="bg-gray-950 text-white flex items-center gap-3 px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest">
                                <FiPlus /> ADD STRATEGIC SKILL
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { name: 'Macro-Budget Allocation', level: 'Master', status: 'Verified' },
                                { name: 'Live-Ops Monetization', level: 'Advanced', status: 'Verified' },
                                { name: 'Publishing Contracts', level: 'Intermediate', status: 'In-Review' },
                                { name: 'Agile Transition (Jira)', level: 'Advanced', status: 'Verified' }
                            ].map(skill => (
                                <div key={skill.name} className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem] border border-gray-100 hover:bg-white transition-all shadow-sm hover:shadow-md">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                                            <FiBarChart2 />
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

                    {/* Products & Impact */}
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
                        <h3 className="text-2xl font-black text-gray-950 uppercase tracking-tighter mb-10">SHIPPED TITLES & IMPACT</h3>
                        <div className="space-y-6">
                            <div className="bg-gray-50 border border-gray-100 rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-10 items-center group">
                                <div className="w-48 h-32 bg-gray-200 rounded-[2rem] overflow-hidden">
                                    <img src="https://picsum.photos/400/300?random=70" className="w-full h-full object-cover" alt="Product" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h4 className="text-lg font-black text-gray-950 uppercase">Project Aethos (MMORPG)</h4>
                                        <span className="text-[9px] font-black bg-blue-100 text-blue-700 px-2 py-0.5 rounded uppercase">LEAD PRODUCER</span>
                                    </div>
                                    <p className="text-xs text-gray-500 leading-relaxed mb-6">Directed the transition from pre-production to full-production for a 50-person distributed studio, re-aligning budget tracks and establishing clear sprint deliverables.</p>
                                    <div className="flex gap-4">
                                        <button className="text-[9px] font-black text-gray-950 uppercase tracking-widest border-b-2 border-blue-400">VIEW CASE STUDY</button>
                                        <FiExternalLink size={12} className="text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decision Scope Context */}
                    <div className="bg-gray-950 rounded-[2.5rem] p-12 text-white relative overflow-hidden">
                        <FiInfo className="absolute -bottom-10 -right-10 w-64 h-64 opacity-5" />
                        <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-10">DECISION SCOPE & SCALE CONTEXT</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div>
                                <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest mb-2">MANAGEMENT TIER</p>
                                <p className="text-sm font-black uppercase">CROSS-DEPARTMENT LEAD</p>
                                <p className="text-[9px] text-gray-500 font-bold uppercase mt-1">DIRECT OVERSIGHT: 50+</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest mb-2">FINANCIAL OVERSIGHT</p>
                                <p className="text-sm font-black uppercase">$5M - $10M ALLOCATIONS</p>
                                <p className="text-[9px] text-gray-500 font-bold uppercase mt-1">PROD & MARKETING HYBRID</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest mb-2">RISK TOLERANCE</p>
                                <p className="text-sm font-black uppercase text-amber-400">HIGH-RISK PROTOTYPING</p>
                                <p className="text-[9px] text-gray-500 font-bold uppercase mt-1">COMFORTABLE PIVOTING</p>
                            </div>
                        </div>
                    </div>

                    {/* Economy & Compliance Spotlight */}
                    <div className="bg-blue-50 rounded-[2.5rem] p-10 border border-blue-100 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-black text-blue-900 uppercase tracking-tight mb-2">ECONOMY & COMPLIANCE SPECIALIST</h3>
                            <p className="text-sm text-blue-700 max-w-lg">In-depth experience balancing free-to-play economics, designing rewarding loops, and maintaining compliance with global microtransaction laws.</p>
                        </div>
                        <div className="hidden md:flex bg-blue-100 w-16 h-16 rounded-2xl items-center justify-center text-blue-600">
                            <FiPieChart size={32} />
                        </div>
                    </div>

                </div>
            </div>
        </ProfileSkillLayout>
    );
}

// NOTE: Please define FiUsers import at top if it was missing in base file. Assume it is added.
