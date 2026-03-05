import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileTypeSelection() {
    const [selected, setSelected] = useState(null);
    const navigate = useNavigate();

    const handleContinue = () => {
        if (selected === 'individual') {
            navigate('/profile/choose-sub-profile');
        } else if (selected === 'company') {
            navigate('/profile/company-setup');
        }
    };

    return (
        <ProfileSkillLayout
            footer="Your Master Profile represents you. Choose how you want to interact with the GzoneSphere ecosystem."
            noPadding
        >
            {/* ── Heading ─────────────────────────────────────── */}
            <div className="max-w-4xl mx-auto px-6 pt-14 pb-10 text-center">
                <h1 className="text-3xl md:text-4xl font-black uppercase text-[#7C3AED] leading-tight mb-4">
                    CHOOSE YOUR PROFILE TYPE
                </h1>
                <p className="text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto">
                    Are you a player/content creator looking to build your identity, or an organization looking to hire, sponsor, and grow your brand?
                </p>
            </div>

            {/* ── Selection Cards ──────────────────────────────── */}
            <div className="max-w-4xl mx-auto px-6 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

                    {/* Individual / Sub-Profile Option */}
                    <button
                        onClick={() => setSelected('individual')}
                        className={`text-left rounded-2xl p-8 transition-all border-2 flex flex-col items-center text-center ${selected === 'individual'
                                ? 'border-[#7C3AED] bg-white shadow-xl scale-[1.02]'
                                : 'border-transparent bg-[#F3F4F6] hover:border-gray-300'
                            }`}
                    >
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-colors ${selected === 'individual' ? 'bg-[#7C3AED] text-white' : 'bg-gray-200 text-gray-500'
                            }`}>
                            <FiUser className="w-10 h-10" />
                        </div>
                        <h2 className={`text-xl font-black uppercase tracking-wide mb-3 ${selected === 'individual' ? 'text-gray-900' : 'text-gray-700'}`}>
                            Player / Creator
                        </h2>
                        <p className={`text-sm leading-relaxed ${selected === 'individual' ? 'text-gray-600' : 'text-gray-500'}`}>
                            I want to build my gaming identity, showcase my skills across different sub-profiles (Esports, Art, Content, etc.), and connect with others.
                        </p>
                    </button>

                    {/* Company / Organization Option */}
                    <button
                        onClick={() => setSelected('company')}
                        className={`text-left rounded-2xl p-8 transition-all border-2 flex flex-col items-center text-center ${selected === 'company'
                                ? 'border-[#10B981] bg-white shadow-xl scale-[1.02]'
                                : 'border-transparent bg-[#F3F4F6] hover:border-gray-300'
                            }`}
                    >
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-colors ${selected === 'company' ? 'bg-[#10B981] text-white' : 'bg-gray-200 text-gray-500'
                            }`}>
                            <FiBriefcase className="w-10 h-10" />
                        </div>
                        <h2 className={`text-xl font-black uppercase tracking-wide mb-3 ${selected === 'company' ? 'text-gray-900' : 'text-gray-700'}`}>
                            Organization / Brand
                        </h2>
                        <p className={`text-sm leading-relaxed ${selected === 'company' ? 'text-gray-600' : 'text-gray-500'}`}>
                            I represent a studio, team, or brand. I want to hire talent, organize tournaments, sponsor creators, and showcase our products.
                        </p>
                    </button>

                </div>

                {/* ── CONTINUE button ─────────────────────────── */}
                <div className="flex justify-center pb-14">
                    <button
                        disabled={!selected}
                        onClick={handleContinue}
                        className={`text-white text-sm font-black uppercase tracking-widest px-12 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 ${selected === 'company' ? 'bg-[#10B981] hover:bg-[#059669] shadow-[#10B981]/20' : 'bg-[#7C3AED] hover:bg-[#6D28D9] shadow-[#7C3AED]/20'
                            }`}
                    >
                        CONTINUE
                    </button>
                </div>
            </div>
        </ProfileSkillLayout>
    );
}
