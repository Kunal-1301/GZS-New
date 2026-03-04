import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileSkillLayout from './ProfileSkillLayout';
import { SUB_PROFILES } from '../../data/profileSkillData';

export default function ProfileChooseSubProfile() {
    const [selected, setSelected] = useState('art-visual'); // default selected per Figma
    const navigate = useNavigate();

    return (
        <ProfileSkillLayout
            footer="You can create additional sub-profiles at any time. Your Master Profile will grow as you add skills."
            noPadding
        >
            {/* ── Heading ─────────────────────────────────────── */}
            <div className="max-w-4xl mx-auto px-6 pt-14 pb-10 text-center">
                <h1 className="text-3xl md:text-4xl font-black uppercase text-[#7C3AED] leading-tight mb-4">
                    CHOOSE YOUR FIRST SUB-PROFILE
                </h1>
                <p className="text-sm text-gray-500 leading-relaxed">
                    This helps us understand how you want to participate.<br />
                    You can add more profiles later as you grow.
                </p>
            </div>

            {/* ── 7 Option cards ──────────────────────────────── */}
            <div className="max-w-4xl mx-auto px-6 pb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                    {SUB_PROFILES.map((sp) => {
                        const isSelected = selected === sp.id;
                        return (
                            <button
                                key={sp.id}
                                onClick={() => setSelected(sp.id)}
                                className={`text-left rounded-xl px-5 py-5 transition-all border-2 ${isSelected
                                        ? 'border-[#7C3AED] bg-white shadow-sm'
                                        : 'border-transparent bg-[#F3F4F6] hover:border-gray-200'
                                    }`}
                            >
                                <p className={`text-xs font-black uppercase tracking-wide mb-1.5 ${isSelected ? 'text-[#7C3AED]' : 'text-gray-700'
                                    }`}>
                                    {sp.title}
                                </p>
                                <p className={`text-xs leading-relaxed ${isSelected ? 'text-[#7C3AED]' : 'text-gray-500'
                                    }`}>
                                    {sp.description}
                                </p>
                            </button>
                        );
                    })}
                </div>

                {/* ── CONTINUE button ─────────────────────────── */}
                <div className="flex justify-center pb-14">
                    <button
                        disabled={!selected}
                        onClick={() => navigate('/profile/overview')}
                        className="bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-50 text-white text-xs font-black uppercase tracking-widest px-10 py-3 rounded-lg transition-colors"
                    >
                        CONTINUE
                    </button>
                </div>
            </div>
        </ProfileSkillLayout>
    );
}
