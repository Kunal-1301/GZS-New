import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileSkillLayout from './ProfileSkillLayout';
import { SKILL_GROUPS, SKILL_LEVELS, PROOF_TYPES } from '../../data/profileSkillData';

/* ── Reusable skill form block ─────────────────────────────────── */
function SkillFormBlock({ index, onSave }) {
    const [selectedLevel, setSelectedLevel] = useState('Competent');
    const [selectedProofs, setSelectedProofs] = useState([]);
    const [group, setGroup] = useState('');

    const toggleProof = (pt) => {
        setSelectedProofs((prev) =>
            prev.includes(pt) ? prev.filter((p) => p !== pt) : [...prev, pt]
        );
    };

    return (
        <div className="border border-gray-200 rounded-xl p-6 mb-6 bg-white">
            {/* Row: dropdown + skill levels */}
            <div className="grid md:grid-cols-2 gap-6 mb-5">
                {/* Skill group dropdown */}
                <div>
                    <label className="text-xs font-bold text-gray-700 block mb-2">
                        Select a Skill Group
                    </label>
                    <div className="relative">
                        <select
                            value={group}
                            onChange={(e) => setGroup(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-500 appearance-none bg-[#F9FAFB] focus:outline-none focus:border-[#7C3AED] transition-colors pr-8"
                        >
                            <option value="">Choose the category that best fits this skill.</option>
                            {SKILL_GROUPS.map((g) => (
                                <option key={g} value={g}>{g}</option>
                            ))}
                        </select>
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</span>
                    </div>
                </div>

                {/* Skill level pills */}
                <div>
                    <label className="text-xs font-bold text-gray-700 block mb-2">
                        Your Skill Level
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {SKILL_LEVELS.map((lvl) => (
                            <button
                                key={lvl}
                                onClick={() => setSelectedLevel(lvl)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-medium border transition-all ${selectedLevel === lvl
                                        ? 'border-[#7C3AED] text-[#7C3AED] bg-white'
                                        : 'border-gray-200 text-gray-500 bg-[#F9FAFB] hover:border-gray-300'
                                    }`}
                            >
                                {lvl}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Proof checkboxes */}
            <div className="mb-4">
                <label className="text-xs font-bold text-gray-700 block mb-2">
                    Add Proof (Optional for Now)
                </label>
                <div className="flex flex-wrap gap-x-5 gap-y-1">
                    {PROOF_TYPES.map((pt) => (
                        <label key={pt} className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedProofs.includes(pt)}
                                onChange={() => toggleProof(pt)}
                                className="w-3 h-3 accent-[#7C3AED]"
                            />
                            {pt}
                        </label>
                    ))}
                </div>
            </div>

            <p className="text-xs italic text-[#7C3AED] mb-4">You can add more skills after this.</p>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onSave}
                    className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-black uppercase tracking-widest px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2"
                >
                    SAVE SKILL
                </button>
                <button
                    onClick={onSave}
                    className="border border-gray-300 text-gray-700 text-xs font-black uppercase tracking-widest px-6 py-2.5 rounded-lg hover:border-gray-400 transition-colors"
                >
                    ADD NEW
                </button>
            </div>
        </div>
    );
}

/* ── Skill Added Success Modal ─────────────────────────────────── */
function SkillAddedModal({ onContinue, onAddMore }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10 text-center">
                <h2 className="text-2xl font-black uppercase text-gray-900 mb-4">
                    SKILL ADDED SUCCESSFULLY
                </h2>
                <p className="text-sm italic font-semibold text-gray-700 mb-3">
                    Your skill has been added to your profile.<br />
                    It's visible, but not verified yet.
                </p>
                <p className="text-sm text-gray-400 mb-8">
                    Verification happens after proof is submitted or platform activity is completed.
                </p>
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={onContinue}
                        className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-black uppercase tracking-widest px-8 py-3 rounded-lg transition-colors"
                    >
                        CONTINUE
                    </button>
                    <button
                        onClick={onAddMore}
                        className="border border-gray-300 text-gray-700 text-xs font-black uppercase tracking-widest px-8 py-3 rounded-lg hover:border-gray-400 transition-colors"
                    >
                        ADD MORE
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ── Page ──────────────────────────────────────────────────────── */
export default function ProfileSkillAdd() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [formCount, setFormCount] = useState(2); // start with 2 forms per Figma

    const handleSave = () => setShowModal(true);
    const handleContinue = () => navigate('/profile/skill-verify');
    const handleAddMore = () => {
        setShowModal(false);
        setFormCount((c) => c + 1);
    };

    return (
        <>
            <ProfileSkillLayout
                title="ART, VISUAL & CHARACTER DESIGN"
                subtitle="Create the visual identity and assets of games."
                badge="setup"
                footer="Your profile grows with your work — not with speed."
            >
                {Array.from({ length: formCount }).map((_, i) => (
                    <SkillFormBlock key={i} index={i} onSave={handleSave} />
                ))}
            </ProfileSkillLayout>

            {showModal && (
                <SkillAddedModal
                    onContinue={handleContinue}
                    onAddMore={handleAddMore}
                />
            )}
        </>
    );
}
