import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileSkillLayout from './ProfileSkillLayout';
import { DUMMY_SKILLS, DUMMY_PROJECTS, DUMMY_ACTIVITY } from '../../data/profileSkillData';

/* ── Verified/Unverified badge ─────────────────────────────────── */
function SkillBadge({ verified }) {
    return verified ? (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
            <span>✓</span> Verified
        </span>
    ) : (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 rounded-full px-2 py-0.5">
            <span>✕</span> Unverified
        </span>
    );
}

/* ── Project Expanded Modal ────────────────────────────────────── */
function ProjectModal({ projects, initialIndex, onClose }) {
    const [idx, setIdx] = useState(initialIndex);
    const project = projects[idx];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={onClose}
        >
            {/* Left arrow */}
            {idx > 0 && (
                <button
                    onClick={(e) => { e.stopPropagation(); setIdx(idx - 1); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors z-10"
                >
                    ‹
                </button>
            )}

            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-y-auto max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Image carousel placeholder */}
                <div className="h-56 bg-gray-200 rounded-t-2xl" />
                {/* Carousel dots */}
                <div className="flex justify-center gap-1.5 mt-3 mb-4">
                    {[0, 1, 2].map((d) => (
                        <span key={d} className={`w-1.5 h-1.5 rounded-full ${d === 0 ? 'bg-gray-700' : 'bg-gray-300'}`} />
                    ))}
                </div>

                <div className="px-8 pb-8">
                    {/* Badges */}
                    <div className="flex gap-2 mb-3">
                        <span className="text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 rounded-full px-2.5 py-1">
                            ✓ {project.type}
                        </span>
                        <span className={`text-[10px] font-bold rounded-full px-2.5 py-1 border ${project.status === 'Completed'
                                ? 'text-green-700 bg-green-50 border-green-200'
                                : 'text-yellow-700 bg-yellow-50 border-yellow-200'
                            }`}>
                            ✓ {project.status}
                        </span>
                    </div>

                    <h2 className="text-lg font-black uppercase text-gray-900 mb-3">
                        {project.title}
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{project.description}</p>

                    <p className="text-xs font-bold text-gray-700 mb-2">Skills added</p>
                    <ul className="space-y-1 mb-4">
                        {project.skills.map((s) => (
                            <li key={s} className="text-xs text-gray-600 flex items-center gap-1.5">
                                <span className="text-gray-300">•</span> {s}
                            </li>
                        ))}
                    </ul>

                    {project.contact && (
                        <p className="text-xs text-gray-500">Contact details for the project<br />{project.contact}</p>
                    )}
                </div>
            </div>

            {/* Right arrow */}
            {idx < projects.length - 1 && (
                <button
                    onClick={(e) => { e.stopPropagation(); setIdx(idx + 1); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#7C3AED] rounded-full shadow flex items-center justify-center text-white hover:bg-[#6D28D9] transition-colors z-10"
                >
                    →
                </button>
            )}
        </div>
    );
}

/* ── Page ──────────────────────────────────────────────────────── */
export default function ProfileSkillDashboard() {
    const navigate = useNavigate();
    const [expandedProjectIdx, setExpandedProjectIdx] = useState(null);

    return (
        <>
            <ProfileSkillLayout
                title="ART, VISUAL & CHARACTER DESIGN"
                subtitle="Create the visual identity and assets of games."
                badge="active"
                footer="Most users start unverified. Trust builds naturally as you add proof and complete real work."
            >
                {/* ── Stats row ────────────────────────────────── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
                    <div className="border border-gray-200 rounded-xl p-5">
                        <p className="text-3xl font-black text-gray-900">12</p>
                        <p className="text-[11px] font-bold uppercase text-gray-400 mt-1 tracking-wide">SKILL ADDED</p>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-5">
                        <p className="text-3xl font-black text-gray-900">8</p>
                        <p className="text-[11px] font-bold uppercase text-gray-400 mt-1 tracking-wide">SKILLS VERIFIED</p>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-5 flex items-center justify-between">
                        <p className="text-[11px] font-black uppercase text-gray-600 tracking-wide">SKILL VERIFICATION</p>
                        <button
                            onClick={() => navigate('/profile/skill-verify')}
                            className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors shrink-0"
                        >
                            GO TO SKILLS
                        </button>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-5 flex items-center justify-between">
                        <p className="text-[11px] font-black uppercase text-gray-600 tracking-wide">PENDING APPROVALS</p>
                        <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors shrink-0">
                            VIEW MORE
                        </button>
                    </div>
                </div>

                {/* ── SKILLS ───────────────────────────────────── */}
                <div className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-black uppercase text-gray-900 tracking-wide">SKILLS</h2>
                        <button
                            onClick={() => navigate('/profile/skill-add')}
                            className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[10px] font-black uppercase tracking-wider px-4 py-2 rounded-lg transition-colors"
                        >
                            ADD SKILL
                        </button>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                        {DUMMY_SKILLS.map((skill) => (
                            <div
                                key={skill.id}
                                className={`text-left p-4 rounded-xl border ${skill.verified ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                                    }`}
                            >
                                <div className="mb-2"><SkillBadge verified={skill.verified} /></div>
                                <p className="text-[11px] font-black uppercase text-gray-800 tracking-wide mb-1">SKILL CATEGORY</p>
                                <p className="text-xs text-gray-500">{skill.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── PROJECTS ─────────────────────────────────── */}
                <div className="border border-gray-200 rounded-2xl p-6 mb-10">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h2 className="text-base font-black uppercase text-gray-900 tracking-wide">PROJECTS</h2>
                            <p className="text-xs text-gray-500 mt-0.5">Projects connect your skills to real work. You can add them when you're ready.</p>
                        </div>
                        <button className="border border-[#7C3AED] text-[#7C3AED] text-[10px] font-black uppercase tracking-wider px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors">
                            ADD A PROJECT
                        </button>
                    </div>

                    <div className="space-y-5 mt-5">
                        {DUMMY_PROJECTS.map((project, i) => (
                            <div key={project.id} className="grid md:grid-cols-2 gap-4 items-start">
                                <div>
                                    {/* Badges */}
                                    <div className="flex gap-2 mb-2">
                                        <span className="text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 rounded-full px-2.5 py-1">
                                            ✓ {project.type}
                                        </span>
                                        <span className={`text-[10px] font-bold rounded-full px-2.5 py-1 border ${project.status === 'Completed'
                                                ? 'text-green-700 bg-green-50 border-green-200'
                                                : 'text-yellow-700 bg-yellow-50 border-yellow-200'
                                            }`}>
                                            ✓ {project.status}
                                        </span>
                                    </div>

                                    <h3 className="text-sm font-black uppercase text-gray-900 mb-1">{project.title}</h3>
                                    <p className="text-xs text-gray-500 mb-3 leading-relaxed">{project.description}</p>

                                    <p className="text-[10px] font-bold text-gray-700 mb-1">Skills added</p>
                                    <ul className="space-y-0.5 mb-3">
                                        {project.skills.map((s) => (
                                            <li key={s} className="text-xs text-gray-500">• {s}</li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() => setExpandedProjectIdx(i)}
                                        className="border border-[#7C3AED] text-[#7C3AED] text-[10px] font-black uppercase tracking-wider px-4 py-1.5 rounded-lg hover:bg-purple-50 transition-colors"
                                    >
                                        VIEW
                                    </button>
                                </div>

                                {/* Image placeholder + dots */}
                                <div>
                                    <div className="h-36 bg-gray-200 rounded-xl mb-2" />
                                    <div className="flex justify-center gap-1.5">
                                        {[0, 1, 2].map((d) => (
                                            <span key={d} className={`w-1.5 h-1.5 rounded-full ${d === 0 ? 'bg-gray-600' : 'bg-gray-300'}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── ACTIVITY ─────────────────────────────────── */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-black uppercase text-gray-900 tracking-wide">ACTIVITY</h2>
                        <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[10px] font-black uppercase tracking-wider px-4 py-2 rounded-lg transition-colors">
                            MAKE A POST
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {DUMMY_ACTIVITY.map((item) => (
                            <div key={item.id}>
                                <div className="h-36 bg-gray-200 rounded-xl mb-2" />
                                <p className="text-[10px] font-black uppercase text-gray-700 tracking-wide leading-tight">{item.title}</p>
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
        </>
    );
}
