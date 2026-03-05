import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiPlus, FiArrowRight, FiLock, FiStar, FiActivity, FiSearch, FiCode, FiLayers, FiRadio } from 'react-icons/fi';
import ProfileSkillLayout from './ProfileSkillLayout';
import { SUB_PROFILES, DUMMY_SKILLS, DUMMY_PROJECTS, DUMMY_ACTIVITY } from '@data/profileSkillData';

/* ── Verified/Unverified badge ─────────────────────────────────── */
function SkillBadge({ verified }) {
    return verified ? (
        <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#16A34A] bg-[#DCFCE7] border border-[#BBF7D0] rounded-full px-2.5 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" /> Verified
        </span>
    ) : (
        <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#DC2626] bg-[#FEE2E2] border border-[#FECACA] rounded-full px-2.5 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" /> Unverified
        </span>
    );
}

/* ── Project Expanded Modal ────────────────────────────────────── */
function ProjectModal({ projects, initialIndex, onClose }) {
    const [idx, setIdx] = useState(initialIndex);
    const project = projects[idx];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md transition-all"
            onClick={onClose}
        >
            {/* Left arrow */}
            {idx > 0 && (
                <button
                    onClick={(e) => { e.stopPropagation(); setIdx(idx - 1); }}
                    className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center text-white transition-all z-10 border border-white/30"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            )}

            <div
                className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl mx-4 overflow-hidden border border-[var(--theme-border)] relative animate-in fade-in zoom-in duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors z-20"
                >
                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="grid md:grid-cols-2">
                    {/* Image carousel placeholder */}
                    <div className="bg-[#F9FAFB] flex flex-col items-center justify-center min-h-[400px] border-r border-[#F3F4F6]">
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">PROJECT MEDIA</div>
                        {/* Carousel dots */}
                        <div className="absolute bottom-6 flex justify-center gap-2">
                            {[0, 1, 2].map((d) => (
                                <span key={d} className={`w-2 h-2 rounded-full border border-white/50 ${d === 0 ? 'bg-[var(--theme-primary)]' : 'bg-gray-300'}`} />
                            ))}
                        </div>
                    </div>

                    <div className="p-12 overflow-y-auto max-h-[80vh]">
                        {/* Badges */}
                        <div className="flex gap-3 mb-6">
                            <span className="text-[10px] font-black uppercase tracking-widest text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5 shadow-sm">
                                ✓ {project.type}
                            </span>
                            <span className={`text-[10px] font-black uppercase tracking-widest rounded-lg px-3 py-1.5 border shadow-sm ${project.status === 'Completed'
                                ? 'text-teal-700 bg-teal-50 border-teal-200'
                                : 'text-yellow-700 bg-yellow-50 border-yellow-200'
                                }`}>
                                ✓ {project.status}
                            </span>
                        </div>

                        <h2 className="gzs-h1 !text-2xl mb-4 tracking-tight">
                            {project.title}
                        </h2>
                        <p className="gzs-body-sm !text-sm mb-8 !leading-relaxed text-[var(--theme-text-muted)] font-medium">
                            {project.description}
                        </p>

                        <div className="border-t border-gray-100 pt-8 mb-8">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--theme-text)] mb-4">SKILLS ADDED</p>
                            <ul className="space-y-3">
                                {project.skills.map((s) => (
                                    <li key={s} className="text-sm font-bold text-gray-700 flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary)] mb-0.5" /> {s}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {project.contact && (
                            <div className="bg-[#F9FAFB] rounded-2xl p-6 border border-[#F3F4F6]">
                                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--theme-text-muted)] mb-2">CONTACT DETAILS</p>
                                <p className="text-xs font-black text-[var(--theme-primary)] tracking-tight">{project.contact}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right arrow */}
            {idx < projects.length - 1 && (
                <button
                    onClick={(e) => { e.stopPropagation(); setIdx(idx + 1); }}
                    className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-dark)] text-white backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center transition-all z-10 border border-white/20 shadow-[var(--theme-primary)]/40"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            )}
        </div>
    );
}

/* ── Faceted Publishing Modal ──────────────────────────────────── */
function PostModal({ onClose }) {
    const [selectedFacade, setSelectedFacade] = useState('Art, Visual & Character Design');
    const FACADES = [
        'Art, Visual & Character Design',
        'Game Creation & Development',
        'Esports & Performance'
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl p-12 border border-[var(--theme-border)] font-body relative overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="gzs-h1 !text-2xl mb-2 tracking-tight">FACETED PUBLISHING</h2>
                <p className="gzs-body-sm !text-xs mb-10 font-medium text-[var(--theme-text-muted)]">Target your insight to a specific community vertical.</p>

                <div className="mb-8">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--theme-text)] mb-4 block">Select Facade</label>
                    <div className="flex flex-wrap gap-3">
                        {FACADES.map(f => (
                            <button
                                key={f}
                                onClick={() => setSelectedFacade(f)}
                                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${selectedFacade === f ? 'bg-[var(--theme-primary)] text-white border-[var(--theme-primary)] shadow-lg shadow-[var(--theme-primary)]/20' : 'bg-gray-50 text-gray-400 border-gray-100 hover:border-gray-200'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-8">
                    <textarea
                        placeholder="Share your development update, insight, or showcase..."
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-6 text-sm font-medium focus:outline-none focus:border-[var(--theme-primary)] h-40 resize-none transition-all"
                    />
                </div>

                <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6 mb-10">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-[var(--theme-primary)]/10 rounded-xl flex items-center justify-center text-[var(--theme-primary)] shrink-0 mt-1">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--theme-primary)] mb-1">Truth-Weighted Distribution</p>
                            <p className="text-[11px] font-bold text-purple-900/60 leading-relaxed">
                                Because you have <strong>Verified Skills</strong> in this facade, your post will receive a visibility boost in the "Game Narrative" discovery vertical.
                            </p>
                        </div>
                    </div>
                </div>

                <button className="gzs-btn-primary !w-full !py-4 !rounded-2xl !text-[11px]">
                    PUBLISH TO VERTICAL TIMELINE
                </button>
            </div>
        </div>
    );
}

/* ── Page ──────────────────────────────────────────────────────── */
export default function ProfileSkillDashboard() {
    const navigate = useNavigate();
    const { profileId } = useParams();
    const [expandedProjectIdx, setExpandedProjectIdx] = useState(null);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);

    const activeProfile = SUB_PROFILES.find(p => p.id === profileId) || SUB_PROFILES[4]; // Default to Art if not found

    return (
        <>
            <ProfileSkillLayout
                title={activeProfile.title}
                subtitle={activeProfile.description}
                badge="active"
                footer="Most users start unverified. Trust builds naturally as you add proof and complete real work."
            >
                {/* ── Stats row ────────────────────────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-14 font-body">
                    <div className="border-2 border-[#F3F4F6] rounded-3xl p-8 bg-white shadow-sm hover:border-[var(--theme-primary)]/20 transition-all">
                        <p className="text-4xl font-black text-[var(--theme-text)] tracking-tight">12</p>
                        <p className="gzs-label !text-[10px] !text-[var(--theme-text-muted)] mt-2 uppercase tracking-[0.2em]">SKILL ADDED</p>
                    </div>
                    <div className="border-2 border-[#F3F4F6] rounded-3xl p-8 bg-white shadow-sm hover:border-[var(--theme-primary)]/20 transition-all">
                        <p className="text-4xl font-black text-[var(--theme-text)] tracking-tight">8</p>
                        <p className="gzs-label !text-[10px] !text-[var(--theme-text-muted)] mt-2 uppercase tracking-[0.2em]">SKILLS VERIFIED</p>
                    </div>
                    <div className="border-2 border-[#F3F4F6] rounded-3xl p-8 flex flex-col justify-between bg-white shadow-sm hover:border-[var(--theme-primary)]/20 transition-all">
                        <p className="gzs-label !text-[10px] !text-[var(--theme-text)] uppercase tracking-widest font-black leading-tight">SKILL VERIFICATION</p>
                        <button
                            onClick={() => navigate('/profile/skill-verify')}
                            className="gzs-btn-primary !text-[9px] !px-4 !py-2.5 !rounded-lg shrink-0 mt-4 shadow-lg shadow-[var(--theme-primary)]/20"
                        >
                            GO TO SKILLS
                        </button>
                    </div>
                    <div className="border-2 border-[#F3F4F6] rounded-3xl p-8 flex flex-col justify-between bg-white shadow-sm hover:border-[var(--theme-primary)]/20 transition-all">
                        <p className="gzs-label !text-[10px] !text-[var(--theme-text)] uppercase tracking-widest font-black leading-tight">PENDING APPROVALS</p>
                        <button className="gzs-btn-outline !text-[9px] !px-4 !py-2.5 !rounded-lg shrink-0 mt-4 border-[#F3F4F6] hover:!border-[var(--theme-primary)] hover:!text-[var(--theme-primary)]">
                            VIEW MORE
                        </button>
                    </div>
                </div>

                {/* ── INCOMING INTERACTION REQUESTS ── */}
                <div className="mb-14 font-body border-2 border-purple-100 rounded-[2rem] p-8 bg-purple-50/30">
                    <h2 className="gzs-label !text-[11px] !text-[var(--theme-primary)] mb-6 uppercase tracking-[0.2em] font-black">Incoming Opportunities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
                            <span className="text-[9px] font-black bg-blue-100 text-blue-700 px-2 py-1 rounded-md uppercase tracking-widest">Hire Request</span>
                            <h3 className="text-sm font-black mt-3">Intel Gaming</h3>
                            <p className="text-[11px] text-[var(--theme-text-muted)] mt-1">Targeting: Character Anatomy</p>
                            <div className="flex gap-2 mt-4">
                                <button className="text-[10px] font-black text-[var(--theme-primary)] hover:underline uppercase">Accept</button>
                                <button className="text-[10px] font-black text-gray-400 hover:text-gray-600 uppercase">Decline</button>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm opacity-60">
                            <span className="text-[9px] font-black bg-teal-100 text-teal-700 px-2 py-1 rounded-md uppercase tracking-widest">Commission</span>
                            <h3 className="text-sm font-black mt-3">Indie Dev Studio</h3>
                            <p className="text-[11px] text-[var(--theme-text-muted)] mt-1">3D Stylized Models</p>
                            <p className="text-[9px] mt-2 font-bold text-teal-600 uppercase italic">Awaiting Escrow...</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm">
                            <span className="text-[9px] font-black bg-orange-100 text-orange-700 px-2 py-1 rounded-md uppercase tracking-widest">Playtest</span>
                            <h3 className="text-sm font-black mt-3">Riot Games (Internal)</h3>
                            <p className="text-[11px] text-[var(--theme-text-muted)] mt-1">FPS Combat System</p>
                            <button className="gzs-btn-primary !text-[9px] !px-4 !py-1.5 !rounded-lg mt-4 w-full">Sign NDA</button>
                        </div>
                    </div>
                </div>

                {/* ── SKILLS ───────────────────────────────────── */}
                <div className="mb-14 font-body">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="gzs-h1 !text-xl uppercase tracking-tight">SKILLS</h2>
                        <button
                            onClick={() => navigate('/profile/skill-add')}
                            className="gzs-btn-primary !text-[10px] !px-6 !py-3 !rounded-xl shadow-lg shadow-[var(--theme-primary)]/20"
                        >
                            ADD SKILL
                        </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {DUMMY_SKILLS.map((skill) => (
                            <div
                                key={skill.id}
                                className={`text-left p-6 rounded-3xl border-2 transition-all ${skill.verified ? 'border-[#BBF7D0] bg-[#F0FDF4]' : 'border-[#F3F4F6] bg-white'
                                    }`}
                            >
                                <div className="mb-4"><SkillBadge verified={skill.verified} /></div>
                                <p className="gzs-label !text-[9px] !text-[var(--theme-text-muted)] mb-1.5 uppercase tracking-widest opacity-60">CHARACTER & ART</p>
                                <p className="font-bold text-xs uppercase tracking-tight text-[var(--theme-text)]">{skill.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── PROJECTS ─────────────────────────────────── */}
                <div className="border-t border-[var(--theme-border)] pt-14 mb-14 font-body">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="gzs-h1 !text-xl uppercase tracking-tight">PROJECTS</h2>
                            <p className="gzs-body-sm !text-xs mt-2 text-[var(--theme-text-muted)] font-medium">Projects connect your skills to real work. You can add them when you're ready.</p>
                        </div>
                        <button className="gzs-btn-outline !text-[10px] !px-6 !py-3 !rounded-xl !border-[var(--theme-primary)] !text-[var(--theme-primary)] hover:!bg-[var(--theme-primary)]/5 font-black tracking-widest uppercase">
                            ADD A PROJECT
                        </button>
                    </div>

                    <div className="space-y-6">
                        {DUMMY_PROJECTS.map((project, i) => (
                            <div key={project.id} className="grid md:grid-cols-2 gap-10 items-center bg-[#F9FAFB] rounded-[2.5rem] p-10 border border-[#F3F4F6] hover:bg-white hover:shadow-xl transition-all group">
                                <div>
                                    {/* Badges */}
                                    <div className="flex gap-3 mb-4">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-green-700 bg-green-50 border border-green-200 rounded-lg px-2.5 py-1.5 shadow-sm">
                                            ✓ {project.type}
                                        </span>
                                        <span className={`text-[9px] font-black uppercase tracking-widest rounded-lg px-2.5 py-1.5 border shadow-sm ${project.status === 'Completed'
                                            ? 'text-teal-700 bg-teal-50 border-teal-200'
                                            : 'text-yellow-700 bg-yellow-50 border-yellow-200'
                                            }`}>
                                            ✓ {project.status}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-black uppercase text-[var(--theme-text)] mb-3 tracking-tight">{project.title}</h3>
                                    <p className="gzs-body-sm !text-sm mb-6 !leading-relaxed text-[var(--theme-text-muted)] font-medium">{project.description}</p>

                                    <p className="text-[10px] font-black uppercase tracking-widest text-[var(--theme-text)] mb-3 border-l-2 border-[var(--theme-primary)] pl-3">Skills added</p>
                                    <ul className="space-y-1.5 mb-8 pl-3">
                                        {project.skills.map((s) => (
                                            <li key={s} className="text-xs font-bold text-gray-700"> {s}</li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() => setExpandedProjectIdx(i)}
                                        className="gzs-btn-primary !text-[11px] !px-10 !py-3 !rounded-xl font-black uppercase tracking-[0.2em] shadow-lg shadow-[var(--theme-primary)]/20"
                                    >
                                        VIEW
                                    </button>
                                </div>

                                {/* Image placeholder + dots */}
                                <div className="relative">
                                    <div className="h-64 bg-gray-200 rounded-3xl mb-4 group-hover:scale-[1.02] transition-transform duration-500 shadow-inner flex items-center justify-center text-[10px] font-black opacity-30 tracking-[0.3em]">PROJECT MEDIA</div>
                                    <div className="flex justify-center gap-2">
                                        {[0, 1, 2].map((d) => (
                                            <span key={d} className={`w-2 h-2 rounded-full border border-white/50 ${d === 0 ? 'bg-[var(--theme-primary)]' : 'bg-gray-300'}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── ACTIVITY ─────────────────────────────────── */}
                <div className="border-t border-[var(--theme-border)] pt-14 pb-14 font-body">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="gzs-h1 !text-xl uppercase tracking-tight">ACTIVITY</h2>
                        <button
                            onClick={() => setIsPostModalOpen(true)}
                            className="gzs-btn-primary !text-[10px] !px-6 !py-3 !rounded-xl shadow-lg shadow-[var(--theme-primary)]/20"
                        >
                            MAKE A POST
                        </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {DUMMY_ACTIVITY.map((item) => (
                            <div key={item.id} className="group cursor-pointer">
                                <div className="h-48 bg-[#F9FAFB] border border-[#F3F4F6] rounded-2xl mb-4 group-hover:bg-white group-hover:shadow-lg transition-all flex items-center justify-center text-[9px] font-black opacity-30 tracking-[0.2em]">POST MEDIA</div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--theme-text)] !leading-tight group-hover:text-[var(--theme-primary)] transition-colors">{item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </ProfileSkillLayout>

            {/* ── Project expanded modal ───────────────────────── */}
            {expandedProjectIdx !== null && (
                <ProjectModal
                    projects={DUMMY_PROJECTS}
                    initialIndex={expandedProjectIdx}
                    onClose={() => setExpandedProjectIdx(null)}
                />
            )}
            {/* ── Post Faceted Publishing Modal ─────────────── */}
            {isPostModalOpen && (
                <PostModal onClose={() => setIsPostModalOpen(false)} />
            )}
        </>
    );
}
