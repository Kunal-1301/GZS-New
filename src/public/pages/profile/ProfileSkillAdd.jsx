import { useNavigate, useLocation } from 'react-router-dom';
import ProfileSkillLayout from './ProfileSkillLayout';
import { SUB_PROFILES, SKILL_LEVELS, PROOF_TYPES } from '@data/profileSkillData';

/* ── Reusable skill form block ─────────────────────────────────── */
function SkillFormBlock({ index, skillGroups, onSave, onAddNew }) {
    const [selectedLevel, setSelectedLevel] = useState('Competent');
    const [selectedProofs, setSelectedProofs] = useState([]);
    const [category, setCategory] = useState('');

    const toggleProof = (pt) => {
        setSelectedProofs((prev) =>
            prev.includes(pt) ? prev.filter((p) => p !== pt) : [...prev, pt]
        );
    };

    return (
        <div className="border border-[var(--theme-border)] rounded-3xl p-8 mb-8 bg-white shadow-sm font-body">
            {/* Row: dropdown + skill levels */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Skill group dropdown */}
                <div>
                    <label className="gzs-label !text-[var(--theme-text)] block mb-3 uppercase tracking-widest text-[10px] font-black">
                        Select a Skill Group
                    </label>
                    <div className="relative">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full border border-[var(--theme-border)] rounded-xl px-5 py-4 gzs-body-sm appearance-none bg-[#F9FAFB] focus:outline-none focus:border-[var(--theme-primary)] transition-colors pr-10 text-[var(--theme-text)] font-medium"
                        >
                            <option value="" disabled>Choose the category that best fits this skill.</option>
                            {skillGroups.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)] text-sm">▾</span>
                    </div>
                </div>

                {/* Skill level pills */}
                <div>
                    <label className="gzs-label !text-[var(--theme-text)] block mb-3 uppercase tracking-widest text-[10px] font-black">
                        Your Skill Level
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {SKILL_LEVELS.map((lvl) => (
                            <button
                                key={lvl}
                                onClick={() => setSelectedLevel(lvl)}
                                className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-all ${selectedLevel === lvl
                                    ? 'border-[var(--theme-primary)] text-[var(--theme-primary)] bg-purple-50 ring-2 ring-[var(--theme-primary)]/10'
                                    : 'border-[var(--theme-border)] text-[var(--theme-text-muted)] bg-[var(--theme-bg-alt)] hover:border-[var(--theme-border-alt)]'
                                    }`}
                            >
                                {lvl}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Proof checkboxes */}
            <div className="mb-6">
                <label className="gzs-label !text-[var(--theme-text)] block mb-3 uppercase tracking-widest text-[10px] font-black">
                    Add Proof (Optional for Now)
                </label>
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                    {PROOF_TYPES.map((pt) => (
                        <label key={pt} className="flex items-center gap-2.5 gzs-body-sm cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={selectedProofs.includes(pt)}
                                onChange={() => toggleProof(pt)}
                                className="w-4 h-4 rounded-md border-gray-300 text-[var(--theme-primary)] focus:ring-[var(--theme-primary)] accent-[var(--theme-primary)]"
                            />
                            <span className={`text-xs font-bold uppercase tracking-tight transition-colors ${selectedProofs.includes(pt) ? 'text-[var(--theme-text)]' : 'text-[var(--theme-text-muted)] group-hover:text-[var(--theme-text)]'}`}>{pt}</span>
                        </label>
                    ))}
                </div>
            </div>

            <p className="gzs-body-sm !italic !font-bold !text-[var(--theme-primary)] mb-8 text-[11px]">You can add more skills after this.</p>

            {/* Action buttons */}
            <div className="flex items-center gap-4 border-t border-[var(--theme-border)] pt-8">
                <button
                    onClick={onSave}
                    className="gzs-btn-primary !px-10 !rounded-xl shadow-lg shadow-[var(--theme-primary)]/20"
                >
                    SAVE SKILL
                </button>
                <button
                    onClick={onAddNew}
                    className="gzs-btn-outline !px-10 !rounded-xl !border-[var(--theme-border)] hover:!border-[var(--theme-primary)]/50"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-12 text-center border border-[var(--theme-border)] font-body">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 text-[var(--theme-primary)]">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="gzs-h1 !text-2xl mb-4 tracking-tight">
                    SKILL ADDED SUCCESSFULLY
                </h2>
                <p className="gzs-body-sm !italic !font-bold mb-4 !text-purple-900/70 !text-sm">
                    Your skill has been added to your profile.<br />
                    It's visible, but not verified yet.
                </p>
                <p className="gzs-body-sm !text-xs mb-10 text-[var(--theme-text-muted)] border-t border-gray-100 pt-6">
                    Verification happens after proof is submitted or platform activity is completed.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={onContinue}
                        className="gzs-btn-primary !w-full sm:!w-auto !px-10 !py-3.5 !rounded-xl"
                    >
                        CONTINUE
                    </button>
                    <button
                        onClick={onAddMore}
                        className="gzs-btn-outline !w-full sm:!w-auto !px-10 !py-3.5 !rounded-xl"
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
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);
    const [formBlocks, setFormBlocks] = useState([0]);

    const profileId = location.state?.profileId || 'art-visual';
    const activeProfile = SUB_PROFILES.find(p => p.id === profileId) || SUB_PROFILES[4];

    const handleSave = () => setShowModal(true);
    const handleContinue = () => navigate('/profile/skill-verify', { state: { profileId } });
    const handleAddMore = () => {
        setShowModal(false);
        setFormBlocks((prev) => [...prev, prev.length]);
    };
    const handleAddNew = () => {
        setFormBlocks((prev) => [...prev, prev.length]);
    };

    return (
        <>
            <ProfileSkillLayout
                title={activeProfile.title}
                subtitle={activeProfile.description}
                badge="setup"
                footer="Your profile grows with your work — not with speed."
            >
                <div className="pb-10">
                    {formBlocks.map((id, i) => (
                        <SkillFormBlock
                            key={id}
                            index={i}
                            skillGroups={activeProfile.skillGroups}
                            onSave={handleSave}
                            onAddNew={handleAddNew}
                        />
                    ))}
                </div>
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
