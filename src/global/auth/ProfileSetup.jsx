import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { FiUser, FiBriefcase, FiArrowRight } from 'react-icons/fi';

export default function ProfileSetup() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);

    const handleNext = () => {
        if (selected === 'individual') {
            navigate('/profile/master-setup');
        } else if (selected === 'organization') {
            navigate('/profile/org-setup');
        }
    };

    return (
        <AuthLayout
            title="CHOOSE YOUR PATH"
            subtitle="Are you joining as an individual player or represent an organization?"
        >
            <div className="flex flex-col gap-6 font-body">
                {/* Individual Option */}
                <button
                    onClick={() => setSelected('individual')}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center gap-6 group ${selected === 'individual'
                            ? 'bg-white border-[#085c7a] shadow-xl'
                            : 'bg-white/5 border-white/20 hover:border-white/40 hover:bg-white/10'
                        }`}
                >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${selected === 'individual' ? 'bg-[#085c7a] text-white' : 'bg-white/10 text-white/60'
                        }`}>
                        <FiUser className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h3 className={`text-base font-black uppercase tracking-wider ${selected === 'individual' ? 'text-[#085c7a]' : 'text-white'
                            }`}>Individual Player</h3>
                        <p className={`text-xs mt-1 ${selected === 'individual' ? 'text-gray-600' : 'text-white/50'
                            }`}>Build your career, verify skills, and compete.</p>
                    </div>
                    <FiArrowRight className={`w-5 h-5 transition-transform ${selected === 'individual' ? 'text-[#085c7a] translate-x-1' : 'text-white/20'
                        }`} />
                </button>

                {/* Organization Option */}
                <button
                    onClick={() => setSelected('organization')}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center gap-6 group ${selected === 'organization'
                            ? 'bg-white border-[#085c7a] shadow-xl'
                            : 'bg-white/5 border-white/20 hover:border-white/40 hover:bg-white/10'
                        }`}
                >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${selected === 'organization' ? 'bg-[#085c7a] text-white' : 'bg-white/10 text-white/60'
                        }`}>
                        <FiBriefcase className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h3 className={`text-base font-black uppercase tracking-wider ${selected === 'organization' ? 'text-[#085c7a]' : 'text-white'
                            }`}>Organization / Studio</h3>
                        <p className={`text-xs mt-1 ${selected === 'organization' ? 'text-gray-600' : 'text-white/50'
                            }`}>Discover talent, manage teams, and publish games.</p>
                    </div>
                    <FiArrowRight className={`w-5 h-5 transition-transform ${selected === 'organization' ? 'text-[#085c7a] translate-x-1' : 'text-white/20'
                        }`} />
                </button>

                <div className="mt-8">
                    <button
                        onClick={handleNext}
                        disabled={!selected}
                        className={`w-full py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${selected
                                ? 'bg-white text-[#085c7a] shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                                : 'bg-white/10 text-white/20 cursor-not-allowed'
                            }`}
                    >
                        CONTINUE SETUP
                    </button>
                </div>
            </div>
        </AuthLayout>
    );
}
