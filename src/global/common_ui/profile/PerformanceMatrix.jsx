import { useNavigate } from 'react-router-dom';
import { FiPlus, FiShield } from 'react-icons/fi';

export default function PerformanceMatrix({ skillMatrix }) {
    const navigate = useNavigate();

    return (
        <div className="mb-12 font-body">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="gzs-h2 !text-xl">PERFORMANCE MATRIX</h2>
                    <p className="gzs-label !text-[var(--theme-text-muted)] mt-1 tracking-widest">TACTICAL & MECHANICAL RATINGS</p>
                </div>
                <button onClick={() => navigate('/profile/skill-add')} className="gzs-btn-primary !px-8 !py-3 !rounded-xl !flex !items-center !gap-2">
                    <FiPlus /> ADD PERFORMANCE SKILL
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {['Mechanical Skill', 'Game Sense & Strategy', 'Communication & Teamplay'].map((group) => (
                    <div key={group} className="flex flex-col gap-3">
                        <h3 className="gzs-label !text-[var(--theme-text-muted)] mb-1 px-2">{group}</h3>
                        {skillMatrix.filter(s => s.group === group).map((s, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-xl hover:border-[var(--theme-primary)]/30 transition-all group">
                                <div className="flex flex-col">
                                    <span className="gzs-h3 !text-xs !text-[var(--theme-text)] !mb-1">{s.name}</span>
                                    <div className="flex items-center gap-2">
                                        {s.verified === 'verified' && <span className="flex items-center gap-1 text-[8px] font-black text-green-600 uppercase tracking-tighter"><FiShield /> TRUTH L2: VERIFIED</span>}
                                        {s.verified === 'proof_submitted' && <span className="flex items-center gap-1 text-[8px] font-black text-blue-500 uppercase tracking-tighter">PROOF SUBMITTED</span>}
                                        {s.verified === 'unverified' && <span className="flex items-center gap-1 text-[8px] font-black text-gray-400 uppercase tracking-tighter">UNVERIFIED</span>}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(l => (
                                            <div key={l} className={`w-1.5 h-4 rounded-full transition-all duration-500 ${l <= s.level ? (s.verified === 'verified' ? 'bg-[var(--theme-primary)]' : 'bg-[var(--theme-primary)]/40') : 'bg-[var(--theme-bg-alt)]'}`}></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
