import { useState } from 'react';
import { FiBriefcase, FiTarget, FiVideo, FiShield, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';


const CompanyBriefBuilder = () => {
    const [step, setStep] = useState(1);
    const [briefType, setBriefType] = useState('hiring');

    const TYPES = [
        { id: 'hiring', icon: FiBriefcase, title: 'Hiring Post', desc: 'Recruit for specific roles based on verifiable portfolio skills.', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
        { id: 'playtest', icon: FiTarget, title: 'Closed Playtest', desc: 'Filter players by Trust Score and specialized genre expertise.', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
        { id: 'sponsor', icon: FiVideo, title: 'Creator Sponsorship', desc: 'Access Master/Grandmaster creators for brief-based content.', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
    ];

    return (
        <div className="flex flex-col h-full bg-[var(--theme-bg)] theme-community overflow-y-auto font-body">

            {/* Header */}
            <div className="bg-[var(--theme-card)] border-b border-[var(--theme-border)] px-8 py-8 flex items-center justify-between shrink-0 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <Link to="/community/company-dashboard" className="text-xs font-bold text-neutral-400 hover:text-neutral-900 uppercase tracking-widest transition-colors">
                            Dashboard
                        </Link>
                        <span className="text-neutral-300">/</span>
                        <span className="text-[10px] bg-blue-600/10 text-blue-600 px-1.5 py-0.5 rounded font-black tracking-widest uppercase border border-blue-600/20">Brief Builder</span>
                    </div>
                    <h1 className="gzs-h1 !text-3xl flex items-center gap-3">
                        Structured Engagement Builder
                    </h1>
                    <p className="gzs-body-sm mt-1">Design intent-driven opportunities to broadcast across the community.</p>
                </div>
            </div>

            <div className="p-8 max-w-4xl mx-auto w-full">

                {/* Progress Tracker */}
                <div className="flex items-center justify-between mb-12">
                    {['Select Type', 'Targeting Rules', 'Content & Details', 'Review & Pay'].map((label, idx) => (
                        <div key={idx} className="flex flex-col items-center relative z-10">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm transition-colors shadow-sm
                                ${step > idx + 1 ? 'bg-blue-600 text-white' : step === idx + 1 ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 'bg-white border-2 border-neutral-200 text-neutral-400'}
                            `}>
                                {step > idx + 1 ? <FiCheckCircle className="w-4 h-4" /> : idx + 1}
                            </div>
                            <span className={`text-[10px] uppercase tracking-widest font-bold mt-3 ${step >= idx + 1 ? 'text-neutral-900' : 'text-neutral-400'}`}>
                                {label}
                            </span>
                        </div>
                    ))}
                    {/* Progress Bar Background */}
                    <div className="absolute left-[15%] right-[15%] h-0.5 bg-[var(--theme-border)] top-[188px] md:top-[172px] -z-0 hidden md:block">
                        <div className="h-full bg-[var(--theme-primary)] transition-all duration-300" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
                    </div>
                </div>

                <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl shadow-sm p-8 pb-10">

                    {/* Step 1: Type Selection */}
                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="gzs-h2 !text-xl mb-6">What type of engagement are you creating?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {TYPES.map(t => {
                                    const Icon = t.icon;
                                    const isSelected = briefType === t.id;
                                    return (
                                        <div
                                            key={t.id}
                                            onClick={() => setBriefType(t.id)}
                                            className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${isSelected ? `border-blue-600 ring-4 ring-blue-50 bg-blue-50/50` : 'border-neutral-200 hover:border-blue-300'}`}
                                        >
                                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${t.bg} ${t.color} border ${t.border}`}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <h3 className="font-black text-neutral-900 mb-2">{t.title}</h3>
                                            <p className="text-xs text-neutral-500 font-medium leading-relaxed">{t.desc}</p>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="mt-8 p-4 bg-neutral-50 rounded-lg border border-neutral-200 flex items-start gap-3">
                                <FiShield className="text-blue-600 w-5 h-5 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-bold text-neutral-900">Enterprise Compliance</h4>
                                    <p className="text-xs text-neutral-500 mt-1">All briefs must adhere to the community guidelines. Highly rated briefs improve your Company Trust Score.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Targeting Rules */}
                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                            <div>
                                <h2 className="text-xl font-black text-neutral-900 mb-2">Target Audience Configuration</h2>
                                <p className="text-sm text-neutral-500 font-medium">Define exactly who can see and apply for this brief.</p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="gzs-label block mb-2">Required Sub-Profile Domain</label>
                                    <select className="w-full bg-[var(--theme-bg-alt)] border border-[var(--theme-border)] rounded-lg p-3 text-sm font-bold text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-primary)]">
                                        <option>Game Development</option>
                                        <option>Esports</option>
                                        <option>Art & Design</option>
                                        <option>Audio & Music</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-[10px] font-black tracking-widest text-neutral-500 uppercase block mb-2">Minimum Activity Level</label>
                                        <select className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-sm font-bold text-neutral-900 focus:outline-none focus:border-blue-500">
                                            <option>Any (Beginner+)</option>
                                            <option>Hustler (Lvl 2+)</option>
                                            <option>Expert (Lvl 3+)</option>
                                            <option>Master (Lvl 5+)</option>
                                            <option>Grandmaster (Lvl 8+)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black tracking-widest text-neutral-500 uppercase block mb-2">Required Trust Standing</label>
                                        <select className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-sm font-bold text-neutral-900 focus:outline-none focus:border-blue-500">
                                            <option>Good Standing</option>
                                            <option>Excellent Standing Only</option>
                                        </select>
                                    </div>
                                </div>

                                {briefType === 'sponsor' && (
                                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                                        <label className="text-[10px] font-black tracking-widest text-purple-600 uppercase block mb-2">Creator Engagement Minimum</label>
                                        <input type="number" placeholder="e.g. 5000 Avg views" className="w-full bg-white border border-purple-200 rounded p-2 text-sm focus:outline-none focus:border-purple-500" />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Content */}
                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                            <div>
                                <h2 className="text-xl font-black text-neutral-900 mb-2">Brief Specifics</h2>
                                <p className="text-sm text-neutral-500 font-medium">Write clear requirements to ensure high-quality applications.</p>
                            </div>

                            <div>
                                <label className="text-[10px] font-black tracking-widest text-neutral-500 uppercase block mb-2">Opportunity Title</label>
                                <input type="text" placeholder="e.g. Senior Gameplay Programmer needed for AAA FPS" className="w-full bg-white border border-neutral-200 rounded-lg p-3 text-sm font-bold text-neutral-900 focus:outline-none focus:border-blue-500" />
                            </div>

                            <div>
                                <label className="text-[10px] font-black tracking-widest text-neutral-500 uppercase block mb-2">Full Description & Deliverables</label>
                                <textarea rows="6" placeholder="Describe the role, the project, and what the candidate needs to deliver..." className="w-full bg-white border border-neutral-200 rounded-lg p-3 text-sm text-neutral-900 focus:outline-none focus:border-blue-500 resize-none"></textarea>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[10px] font-black tracking-widest text-neutral-500 uppercase block mb-2">Compensation / Bounty ($)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 font-bold">$</span>
                                        <input type="number" placeholder="5,000" className="w-full bg-white border border-neutral-200 rounded-lg p-3 pl-8 text-sm font-bold text-neutral-900 focus:outline-none focus:border-blue-500" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black tracking-widest text-neutral-500 uppercase block mb-2">Application Deadline</label>
                                    <input type="date" className="w-full bg-white border border-neutral-200 rounded-lg p-3 text-sm font-bold text-neutral-900 focus:outline-none focus:border-blue-500" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Review */}
                    {step === 4 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 text-center py-8">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FiCheckCircle className="w-10 h-10" />
                            </div>
                            <h2 className="text-2xl font-black text-neutral-900">Brief Ready for Broadcast</h2>
                            <p className="text-sm text-neutral-500 font-medium max-w-md mx-auto">
                                Your brief meets all Community Trust standards. It will be pushed to the active feeds of matching candidates immediately upon payment/verification.
                            </p>

                            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 max-w-sm mx-auto text-left">
                                <div className="flex justify-between items-center mb-4 pb-4 border-b border-neutral-200">
                                    <span className="text-sm font-bold text-neutral-600">Platform Broadcast Fee</span>
                                    <span className="font-black text-neutral-900">$250.00</span>
                                </div>
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-black tracking-widest uppercase text-sm shadow-md transition-colors">
                                    Confirm & Publish
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    {step < 4 && (
                        <div className="flex justify-end gap-4 mt-12 pt-6 border-t border-neutral-100">
                            {step > 1 && (
                                <button
                                    onClick={() => setStep(s => s - 1)}
                                    className="px-6 py-2.5 text-sm font-bold text-neutral-500 hover:text-neutral-900 transition-colors"
                                >
                                    Back
                                </button>
                            )}
                            <button
                                onClick={() => setStep(s => s + 1)}
                                className="gzs-btn-primary px-8"
                            >
                                Continue <FiChevronRight />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompanyBriefBuilder;
