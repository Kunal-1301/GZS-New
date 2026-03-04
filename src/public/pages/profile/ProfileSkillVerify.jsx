import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileSkillLayout from './ProfileSkillLayout';
import { DUMMY_SKILLS, PROOF_TYPES } from '../../data/profileSkillData';

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

/* ── Skill card ────────────────────────────────────────────────── */
function SkillCard({ skill, selectable, selected, onClick }) {
    const isVer = skill.verified;
    return (
        <button
            onClick={onClick}
            className={`text-left p-4 rounded-xl border transition-all w-full ${selectable
                    ? selected
                        ? 'border-[#7C3AED] border-2 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    : isVer
                        ? 'border-green-200 bg-green-50'
                        : 'border-red-200 bg-red-50'
                }`}
        >
            <div className="mb-2">
                <SkillBadge verified={isVer} />
            </div>
            <p className="text-[11px] font-black uppercase text-gray-800 tracking-wide mb-1">
                SKILL CATEGORY
            </p>
            <p className="text-xs text-gray-500">{skill.name}</p>
        </button>
    );
}

/* ── Modal A: SELECT A SKILL TO VERIFY ────────────────────────── */
function SelectSkillModal({ onContinue, onCancel }) {
    const [selectedId, setSelectedId] = useState(null);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
                <h2 className="text-2xl font-black uppercase text-gray-900 text-center mb-1">
                    SELECT A SKILL TO VERIFY
                </h2>
                <p className="text-sm text-gray-400 text-center mb-6">
                    Choose the skill you want to add proof for
                </p>

                <div className="grid grid-cols-4 gap-3 mb-8">
                    {DUMMY_SKILLS.map((skill) => (
                        <SkillCard
                            key={skill.id}
                            skill={skill}
                            selectable
                            selected={selectedId === skill.id}
                            onClick={() => setSelectedId(skill.id)}
                        />
                    ))}
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        disabled={!selectedId}
                        onClick={() => onContinue(DUMMY_SKILLS.find((s) => s.id === selectedId))}
                        className="bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-50 text-white text-xs font-black uppercase tracking-widest px-8 py-2.5 rounded-lg transition-colors"
                    >
                        CONTINUE
                    </button>
                    <button
                        onClick={onCancel}
                        className="border border-gray-300 text-gray-700 text-xs font-black uppercase tracking-widest px-8 py-2.5 rounded-lg hover:border-gray-400 transition-colors"
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ── Modal B: ADD PROOF FOR SKILL ─────────────────────────────── */
function AddProofModal({ skill, onSubmit, onCancel }) {
    const [loading, setLoading] = useState(false);
    const [selectedProof, setSelectedProof] = useState('Portfolio link');
    const [link, setLink] = useState('');
    const [desc, setDesc] = useState('');

    const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onSubmit();
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
                <h2 className="text-2xl font-black uppercase text-gray-900 text-center mb-1">
                    ADD PROOF FOR SKILL
                </h2>
                <p className="text-sm text-gray-400 text-center mb-6">
                    Choose the skill you want to add proof for
                </p>

                <div className="mb-5">
                    <p className="text-base font-black uppercase text-gray-900">CHARACTER &amp; ART</p>
                    <p className="text-sm font-black uppercase text-gray-700">
                        {skill?.name || 'STYLIZED CHARACTER ANATOMY'}
                    </p>
                </div>

                {/* Proof type */}
                <div className="mb-5">
                    <label className="text-sm font-semibold text-gray-800 block mb-2">
                        Choose Proof Type
                    </label>
                    <div className="flex flex-wrap gap-4">
                        {PROOF_TYPES.map((pt) => (
                            <label key={pt} className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer">
                                <input
                                    type="radio"
                                    name="proofType"
                                    checked={selectedProof === pt}
                                    onChange={() => setSelectedProof(pt)}
                                    className="accent-[#7C3AED]"
                                />
                                {pt}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Link input */}
                <div className="mb-4">
                    <label className="text-sm font-semibold text-gray-800 block mb-2">Add Links</label>
                    <input
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="Input/paste the suitable link here"
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#7C3AED] transition-colors bg-[#F9FAFB]"
                    />
                </div>

                {/* Description textarea */}
                <div className="mb-4">
                    <label className="text-sm font-semibold text-gray-800 block mb-2">
                        Description for proof (optional)
                    </label>
                    <textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="Briefly explain what this proof shows (1–2 lines)"
                        rows={3}
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#7C3AED] transition-colors bg-[#F9FAFB] resize-none"
                    />
                </div>

                <p className="text-xs italic text-gray-500 mb-6">
                    Make sure this proof clearly demonstrates the selected skill.
                </p>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-80 text-white text-xs font-black uppercase tracking-widest px-10 py-3 rounded-lg transition-colors flex items-center gap-2 min-w-[120px] justify-center"
                    >
                        {loading ? (
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="40 60" strokeLinecap="round" />
                            </svg>
                        ) : 'SUBMIT'}
                    </button>
                    <button
                        onClick={onCancel}
                        className="border border-gray-300 text-gray-700 text-xs font-black uppercase tracking-widest px-10 py-3 rounded-lg hover:border-gray-400 transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10 text-center">
                {/* Green checkmark */}
                <div className="flex justify-center mb-5">
                    <svg viewBox="0 0 80 80" className="w-20 h-20" fill="none">
                        <circle cx="40" cy="40" r="36" stroke="#16A34A" strokeWidth="4" />
                        <path d="M24 40l12 12 20-22" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <h2 className="text-2xl font-black uppercase text-gray-900 mb-4">
                    PROOF SUBMITTED
                </h2>
                <p className="text-sm italic text-gray-600 mb-6">
                    Your proof has been attached to the selected skill.<br />
                    It will be reviewed or verified through platform activity.
                </p>
                <button
                    onClick={onContinue}
                    className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-black uppercase tracking-widest px-10 py-3 rounded-lg transition-colors"
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
    const [modal, setModal] = useState(null); // null | 'select' | 'proof' | 'submitted'
    const [selectedSkill, setSelectedSkill] = useState(null);

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
                title="ART, VISUAL & CHARACTER DESIGN"
                subtitle="Create the visual identity and assets of games."
                badge="setup"
                footer="Most users start unverified. Trust builds naturally as you add proof and complete real work."
            >
                {/* ── Skill cards grid 4×2 ─────────────────────── */}
                <div className="grid grid-cols-4 gap-4 mb-10">
                    {DUMMY_SKILLS.map((skill) => (
                        <SkillCard key={skill.id} skill={skill} selectable={false} onClick={() => { }} />
                    ))}
                </div>

                {/* ── WHAT DOES VERIFICATION MEAN? ─────────────── */}
                <div className="grid md:grid-cols-2 gap-8 mb-10 bg-gray-50 rounded-2xl p-8">
                    <div>
                        <h2 className="text-base font-black uppercase text-gray-900 mb-4">
                            WHAT DOES VERIFICATION MEAN?
                        </h2>
                        <p className="text-xs text-gray-500 mb-4">Verification happens per skill, not per profile</p>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-xs font-bold text-gray-700 mb-2">Skills are verified using:</p>
                                <ul className="space-y-1 text-xs text-gray-500">
                                    <li>• Proof you submit</li>
                                    <li>• Real platform activity</li>
                                </ul>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-700 mb-2">Verified skills are:</p>
                                <ul className="space-y-1 text-xs text-gray-500">
                                    <li>• Trusted by companies</li>
                                    <li>• Searchable in talent discovery</li>
                                    <li>• Prioritized in opportunities</li>
                                </ul>
                            </div>
                        </div>
                        <p className="text-xs italic text-gray-400 mt-5">
                            Verification is based on proof – not titles, degrees, or years.
                        </p>
                    </div>
                    {/* Placeholder image */}
                    <div className="h-44 bg-gray-200 rounded-xl" />
                </div>

                {/* ── HOW TO VERIFY THIS SKILL? ─────────────────── */}
                <div className="mb-10">
                    <h2 className="text-base font-black uppercase text-gray-900 text-center mb-6">
                        HOW TO VERIFY THIS SKILL?
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { step: 'STEP 1', label: 'ADD PROOF', desc: 'Portfolio, demo, link, or file', active: true },
                            { step: 'STEP 2', label: 'SUBMIT FOR REVIEW', desc: 'Manual or automatic verification', active: false },
                            { step: 'STEP 3', label: 'STATUS UPDATES', desc: 'Your skill updates once verified', active: false },
                        ].map((s) => (
                            <div
                                key={s.step}
                                className={`rounded-xl border-2 p-5 ${s.active ? 'border-gray-900 bg-white' : 'border-gray-200 bg-[#F9FAFB]'}`}
                            >
                                <p className={`text-sm font-black uppercase mb-1 ${s.active ? 'text-gray-900' : 'text-gray-400'}`}>
                                    {s.step}
                                </p>
                                <p className={`text-xs font-black uppercase mb-2 ${s.active ? 'text-gray-900' : 'text-gray-400'}`}>
                                    {s.label}
                                </p>
                                <p className={`text-xs ${s.active ? 'text-gray-600' : 'text-gray-400'}`}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── WHAT WOULD YOU LIKE TO DO NEXT? ──────────── */}
                <div>
                    <h2 className="text-base font-black uppercase text-gray-900 text-center mb-6">
                        WHAT WOULD YOU LIKE TO DO NEXT?
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                        {/* ADD PROOF */}
                        <div className="border border-gray-200 rounded-xl p-5">
                            <p className="text-xs font-black uppercase text-gray-900 mb-1">ADD PROOF TO SKILL</p>
                            <p className="text-xs text-gray-500 mb-4">Increase trust and visibility</p>
                            <button
                                onClick={() => setModal('select')}
                                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white w-10 h-10 rounded-lg flex items-center justify-center transition-colors text-sm font-bold"
                            >
                                ↑
                            </button>
                        </div>
                        {/* ADD ANOTHER SKILL */}
                        <div className="border border-gray-200 rounded-xl p-5">
                            <p className="text-xs font-black uppercase text-gray-900 mb-1">ADD ANOTHER SKILL</p>
                            <p className="text-xs text-gray-500 mb-4">Continue building your profile</p>
                            <button
                                onClick={() => navigate('/profile/skill-add')}
                                className="border border-gray-200 text-gray-600 text-xs font-black uppercase tracking-widest px-5 py-2 rounded-lg hover:border-gray-400 transition-colors"
                            >
                                ADD
                            </button>
                        </div>
                        {/* VIEW PROFILE */}
                        <div className="border border-gray-200 rounded-xl p-5">
                            <p className="text-xs font-black uppercase text-gray-900 mb-1">VIEW YOUR PROFILE</p>
                            <p className="text-xs text-gray-500 mb-4">See how your profile looks so far</p>
                            <button
                                onClick={() => navigate('/profile/skill-dashboard')}
                                className="border border-gray-200 text-gray-600 text-xs font-black uppercase tracking-widest px-5 py-2 rounded-lg hover:border-gray-400 transition-colors"
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
                    onContinue={handleSelectContinue}
                    onCancel={() => setModal(null)}
                />
            )}
            {modal === 'proof' && (
                <AddProofModal
                    skill={selectedSkill}
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
