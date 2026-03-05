import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProfileSkillLayout from './ProfileSkillLayout';
import { SUB_PROFILES, DUMMY_SKILLS, PROOF_TYPES } from '@data/profileSkillData';
import { mockApiService } from '@services/mockApiService';

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

/* ── Skill card ────────────────────────────────────────────────── */
function SkillCard({ skill, selectable, selected, onClick, activeProfile }) {
    const isVer = skill.verified;
    return (
        <button
            onClick={onClick}
            className={`text-left p-5 rounded-2xl border transition-all w-full relative group ${selectable
                ? selected
                    ? 'border-[var(--theme-primary)] border-2 shadow-lg bg-white ring-4 ring-[var(--theme-primary)]/5'
                    : 'border-[var(--theme-border)] hover:border-[var(--theme-primary)]/50 bg-[#F9FAFB] hover:bg-white'
                : isVer
                    ? 'border-[#BBF7D0] bg-[#F0FDF4]'
                    : 'border-[#FECACA] bg-[#FEF2F2]'
                }`}
        >
            <div className="mb-4">
                <SkillBadge verified={isVer} />
            </div>
            <p className="gzs-label !text-[var(--theme-text)] !text-[9px] mb-1.5 opacity-60 uppercase">
                {activeProfile?.title || 'CHARACTER & ART'}
            </p>
            <p className="font-bold text-xs !leading-tight uppercase tracking-tight text-[var(--theme-text)]">{skill.name}</p>
        </button>
    );
}

/* ── Modal A: SELECT A SKILL TO VERIFY ────────────────────────── */
function SelectSkillModal({ skills, activeProfile, onContinue, onCancel }) {
    const [selectedId, setSelectedId] = useState(null);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-12 border border-[var(--theme-border)] font-body max-h-[90vh] overflow-y-auto">
                <h2 className="gzs-h1 !text-2xl text-center mb-2 tracking-tight">
                    SELECT A SKILL TO VERIFY
                </h2>
                <p className="gzs-body-sm text-center mb-10 text-[var(--theme-text-muted)] font-medium">
                    Choose the skill you want to add proof for
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
                    {skills.map((skill) => (
                        <SkillCard
                            key={skill.id}
                            skill={skill}
                            activeProfile={activeProfile}
                            selectable
                            selected={selectedId === skill.id}
                            onClick={() => setSelectedId(skill.id)}
                        />
                    ))}
                </div>

                <div className="flex justify-center gap-4 pt-8 border-t border-gray-100">
                    <button
                        disabled={!selectedId}
                        onClick={() => onContinue(skills.find((s) => s.id === selectedId))}
                        className="gzs-btn-primary !px-12 !py-3.5 !rounded-xl shadow-lg shadow-[var(--theme-primary)]/20 disabled:opacity-50 disabled:shadow-none"
                    >
                        CONTINUE
                    </button>
                    <button
                        onClick={onCancel}
                        className="gzs-btn-outline !px-12 !py-3.5 !rounded-xl"
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>
    );
}


/* ── Modal B: ADD PROOF FOR SKILL ─────────────────────────────── */
function AddProofModal({ skill, activeProfile, onSubmit, onCancel }) {
    const [loading, setLoading] = useState(false);
    const [selectedProofs, setSelectedProofs] = useState(['Portfolio link']);
    const [link, setLink] = useState('');
    const [desc, setDesc] = useState('');

    const toggleProof = (pt) => {
        setSelectedProofs((prev) =>
            prev.includes(pt) ? prev.filter((p) => p !== pt) : [...prev, pt]
        );
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // 1. Add the proof record
            await mockApiService.addSkillProof({
                user: 'Current User', // Placeholder for logged in user
                subType: activeProfile?.title || 'Unknown',
                group: skill?.category || 'General',
                skill: skill?.name || 'Unknown',
                proofType: selectedProofs.join(', '),
                links: link,
                description: desc
            });

            // 2. Log activity
            await mockApiService.addActivity({
                user: 'Current User',
                content: `Submitted proof for skill: ${skill?.name}`,
                profile: activeProfile?.title || 'Profile'
            });

            onSubmit();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-12 border border-[var(--theme-border)] font-body">
                <h2 className="gzs-h1 !text-2xl text-center mb-2 tracking-tight">
                    ADD PROOF FOR SKILL
                </h2>
                <p className="gzs-body-sm text-center mb-10 text-[var(--theme-text-muted)] font-medium">
                    Attach evidence of your work to build trust.
                </p>

                <div className="mb-10 p-6 bg-[#F3E8FF] rounded-2xl border-2 border-[var(--theme-primary)]/10">
                    <p className="gzs-label !text-[var(--theme-primary)] !text-[10px] mb-2">TARGET SKILL</p>
                    <p className="text-sm font-black text-[var(--theme-text)] uppercase tracking-tight">
                        {skill?.category || 'CHARACTER & ART'} / {skill?.name || 'STYLIZED CHARACTER ANATOMY'}
                    </p>
                </div>

                {/* Proof type */}
                <div className="mb-8">
                    <label className="gzs-label !text-[var(--theme-text)] block mb-4 uppercase tracking-widest text-[10px] font-black">
                        Choose Proof Type
                    </label>
                    <div className="flex flex-wrap gap-x-8 gap-y-4">
                        {PROOF_TYPES.map((pt) => (
                            <label key={pt} className="flex items-center gap-2.5 gzs-body-sm cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={selectedProofs.includes(pt)}
                                    onChange={() => toggleProof(pt)}
                                    className="w-4 h-4 rounded-md text-[var(--theme-primary)] accent-[var(--theme-primary)]"
                                />
                                <span className={`text-xs font-bold uppercase tracking-tight transition-colors ${selectedProofs.includes(pt) ? 'text-[var(--theme-text)]' : 'text-[var(--theme-text-muted)] group-hover:text-[var(--theme-text)]'}`}>{pt}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Link input */}
                <div className="mb-6">
                    <label className="gzs-label !text-[var(--theme-text)] block mb-3 uppercase tracking-widest text-[10px] font-black">Add Links</label>
                    <input
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="Input/paste the suitable link here"
                        className="w-full border border-[var(--theme-border)] rounded-xl px-5 py-4 gzs-body-sm focus:outline-none focus:border-[var(--theme-primary)] transition-colors bg-[#F9FAFB] font-medium"
                    />
                </div>

                {/* Description textarea */}
                <div className="mb-6">
                    <label className="gzs-label !text-[var(--theme-text)] block mb-3 uppercase tracking-widest text-[10px] font-black">
                        Description for proof (optional)
                    </label>
                    <textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="Briefly explain what this proof shows (1–2 lines)"
                        rows={3}
                        className="w-full border border-[var(--theme-border)] rounded-xl px-5 py-4 gzs-body-sm focus:outline-none focus:border-[var(--theme-primary)] transition-colors bg-[#F9FAFB] resize-none font-medium"
                    />
                </div>

                <p className="text-[11px] italic text-[var(--theme-text-muted)] mb-10 font-medium">
                    Make sure this proof clearly demonstrates the selected skill.
                </p>

                <div className="flex justify-center gap-4 pt-8 border-t border-gray-100">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="gzs-btn-primary !px-12 !py-3.5 !rounded-xl !flex !items-center !gap-3 !justify-center shadow-lg shadow-[var(--theme-primary)]/20 disabled:opacity-80"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="40 60" strokeLinecap="round" />
                                </svg>
                                <span>SUBMITTING...</span>
                            </>
                        ) : 'SUBMIT'}
                    </button>
                    <button
                        onClick={onCancel}
                        className="gzs-btn-outline !px-12 !py-3.5 !rounded-xl"
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ── Modal C: PROOF SUBMITTED ─────────────────────────────────── */
function ProofSubmittedModal({ onContinue }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-12 text-center border border-[var(--theme-border)] font-body">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 text-[#16A34A]">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="gzs-h1 !text-2xl mb-4 tracking-tight">
                    PROOF SUBMITTED
                </h2>
                <p className="gzs-body-sm !italic !font-bold mb-6 !text-green-900/70 !text-sm">
                    Your proof has been attached to the selected skill.<br />
                    It will be reviewed or verified through platform activity.
                </p>
                <button
                    onClick={onContinue}
                    className="gzs-btn-primary !px-12 !py-3.5 !rounded-xl shadow-lg shadow-green-500/20"
                >
                    CONTINUE
                </button>
            </div>
        </div>
    );
}

/* ── Page ──────────────────────────────────────────────────────── */
export default function ProfileSkillVerify() {
    const navigate = useNavigate();
    const location = useLocation();
    const [modal, setModal] = useState(null); // null | 'select' | 'proof' | 'submitted'
    const [selectedSkill, setSelectedSkill] = useState(null);

    const profileId = location.state?.profileId || 'art-visual';
    const activeProfile = SUB_PROFILES.find(p => p.id === profileId) || SUB_PROFILES[4];
    const filteredSkills = DUMMY_SKILLS.filter(s => s.profileId === profileId);

    const handleSelectContinue = (skill) => {
        setSelectedSkill(skill);
        setModal('proof');
    };
    const handleProofSubmit = () => setModal('submitted');
    const handleDone = () => {
        setModal(null);
        setSelectedSkill(null);
    };

    return (
        <>
            <ProfileSkillLayout
                title={activeProfile.title}
                subtitle={activeProfile.description}
                badge="setup"
                footer="Most users start unverified. Trust builds naturally as you add proof and complete real work."
            >
                {/* ── Skill cards grid 4×2 ─────────────────────── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 font-body">
                    {filteredSkills.map((skill) => (
                        <SkillCard key={skill.id} skill={skill} activeProfile={activeProfile} selectable={false} onClick={() => { }} />
                    ))}
                </div>

                {/* ── WHAT DOES VERIFICATION MEAN? ─────────────── */}
                <div className="grid md:grid-cols-2 gap-12 mb-14 bg-[#F9FAFB] rounded-3xl p-10 font-body border border-[#F3F4F6]">
                    <div>
                        <h2 className="gzs-h1 !text-xl mb-6 uppercase tracking-tight">
                            WHAT DOES VERIFICATION MEAN?
                        </h2>
                        <p className="gzs-body-sm !text-sm mb-8 !font-bold !text-[var(--theme-primary)]">Verification happens per skill, not per profile.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div>
                                <p className="gzs-label !text-[var(--theme-text)] !text-[10px] mb-3 uppercase tracking-widest font-black border-l-2 border-[var(--theme-primary)] pl-3">Skills are verified using:</p>
                                <ul className="space-y-2 gzs-body-sm !text-xs font-semibold pl-3">
                                    <li>• Proof you submit</li>
                                    <li>• Real platform activity</li>
                                </ul>
                            </div>
                            <div>
                                <p className="gzs-label !text-[var(--theme-text)] !text-[10px] mb-3 uppercase tracking-widest font-black border-l-2 border-[var(--theme-primary)] pl-3">Verified skills are:</p>
                                <ul className="space-y-2 gzs-body-sm !text-xs font-semibold pl-3">
                                    <li>• Trusted by companies</li>
                                    <li>• Searchable in discovery</li>
                                    <li>• Prioritized in opportunities</li>
                                </ul>
                            </div>
                        </div>
                        <p className="gzs-body-sm italic !text-[var(--theme-text-muted)] mt-10 !text-xs font-medium">
                            Verification is based on proof – not titles, degrees, or years.
                        </p>
                    </div>
                    {/* Placeholder image */}
                    <div className="h-64 bg-white border border-[#F3F4F6] rounded-2xl flex items-center justify-center text-[var(--theme-text-muted)] text-[10px] font-black uppercase tracking-widest">
                        VERIFICATION VISUAL
                    </div>
                </div>

                {/* ── HOW TO VERIFY THIS SKILL? ─────────────────── */}
                <div className="mb-14 font-body">
                    <h2 className="gzs-h1 !text-xl text-center mb-8 uppercase tracking-tight font-black">
                        HOW TO VERIFY THIS SKILL?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {[
                            { step: '1', label: 'ADD PROOF', desc: 'Portfolio, demo, link, or file', active: true },
                            { step: '2', label: 'SUBMIT FOR REVIEW', desc: 'Manual or automatic verification', active: false },
                            { step: '3', label: 'STATUS UPDATES', desc: 'Your skill updates once verified', active: false },
                        ].map((s) => (
                            <div
                                key={s.step}
                                className={`rounded-2xl border-2 p-8 flex flex-col items-center text-center transition-all ${s.active ? 'border-[var(--theme-primary)] bg-white shadow-lg ring-4 ring-[var(--theme-primary)]/5' : 'border-[#F3F4F6] bg-[#F9FAFB]'}`}
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black mb-4 ${s.active ? 'bg-[var(--theme-primary)] text-white' : 'bg-[var(--theme-border)] text-[var(--theme-text-muted)]'}`}>
                                    {s.step}
                                </div>
                                <h3 className={`text-xs font-black uppercase tracking-widest mb-3 ${s.active ? 'text-[var(--theme-text)]' : 'text-[var(--theme-text-muted)]'}`}>
                                    {s.label}
                                </h3>
                                <p className={`gzs-body-sm !text-xs !leading-relaxed ${s.active ? 'text-[var(--theme-text)] font-medium' : 'text-[var(--theme-text-muted)] font-medium'}`}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── WHAT WOULD YOU LIKE TO DO NEXT? ──────────── */}
                <div className="mb-14 font-body">
                    <h2 className="gzs-h1 !text-xl text-center mb-8 uppercase tracking-tight font-black">
                        WHAT WOULD YOU LIKE TO DO NEXT?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {/* ADD PROOF */}
                        <div className="border border-[var(--theme-border)] rounded-2xl p-8 bg-white shadow-sm flex flex-col items-center text-center">
                            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--theme-text)] mb-2">ADD PROOF TO SKILL</p>
                            <p className="gzs-body-sm !text-xs mb-6 font-medium text-[var(--theme-text-muted)]">Increase trust and visibility</p>
                            <button
                                onClick={() => setModal('select')}
                                className="gzs-btn-primary !w-12 !h-12 !p-0 !rounded-xl flex items-center justify-center transition-all shadow-lg shadow-[var(--theme-primary)]/20 hover:scale-110 active:scale-95"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                            </button>
                        </div>
                        {/* ADD ANOTHER SKILL */}
                        <div className="border border-[var(--theme-border)] rounded-2xl p-8 bg-white shadow-sm flex flex-col items-center text-center">
                            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--theme-text)] mb-2">ADD ANOTHER SKILL</p>
                            <p className="gzs-body-sm !text-xs mb-6 font-medium text-[var(--theme-text-muted)]">Register more capabilities</p>
                            <button
                                onClick={() => navigate('/profile/skill-add', { state: { profileId } })}
                                className="gzs-btn-outline !px-10 !py-3 !rounded-xl !text-[11px] font-black uppercase tracking-widest border-[#F3F4F6] hover:!border-[var(--theme-primary)]/30 hover:!bg-[var(--theme-primary)]/5"
                            >
                                ADD
                            </button>
                        </div>
                        {/* VIEW PROFILE */}
                        <div className="border border-[var(--theme-border)] rounded-2xl p-8 bg-white shadow-sm flex flex-col items-center text-center">
                            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--theme-text)] mb-2">VIEW YOUR PROFILE</p>
                            <p className="gzs-body-sm !text-xs mb-6 font-medium text-[var(--theme-text-muted)]">Check your progress</p>
                            <button
                                onClick={() => navigate(`/profile/dashboard/${profileId}`)}
                                className="gzs-btn-outline !px-10 !py-3 !rounded-xl !text-[11px] font-black uppercase tracking-widest border-[#F3F4F6] hover:!border-[var(--theme-primary)]/30 hover:!bg-[var(--theme-primary)]/5"
                            >
                                CONTINUE
                            </button>
                        </div>
                    </div>
                </div>
            </ProfileSkillLayout>

            {/* ── Modals ──────────────────────────────────────── */}
            {modal === 'select' && (
                <SelectSkillModal
                    skills={filteredSkills}
                    activeProfile={activeProfile}
                    onContinue={handleSelectContinue}
                    onCancel={() => setModal(null)}
                />
            )}
            {modal === 'proof' && (
                <AddProofModal
                    skill={selectedSkill}
                    activeProfile={activeProfile}
                    onSubmit={handleProofSubmit}
                    onCancel={() => setModal('select')}
                />
            )}
            {modal === 'submitted' && (
                <ProofSubmittedModal onContinue={handleDone} />
            )}
        </>
    );
}
