import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLink, FiCpu, FiGlobe, FiUser, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import AuthLayout from './AuthLayout';

export default function MasterIdentitySetup() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        dob: '',
        gender: '',
        nationality: '',
        languages: '',
        origin: '',
        about: '',
        discord: '',
        linkedin: '',
        github: '',
        behance: '',
    });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (step < 3) setStep(prev => prev + 1);
        else setShowModal(true);
    };

    const completeSetup = () => {
        setShowModal(false);
        navigate('/profile/choose-subprofile'); // Directly to facade switcher
    };

    return (
        <AuthLayout
            title="CREATE MASTER IDENTITY"
            subtitle="The definitive source of truth for your professional gaming persona."
        >
            {/* Step Indicator */}
            <div className="flex gap-2 mb-8">
                {[1, 2, 3].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-purple-500' : 'bg-white/10'}`} />
                ))}
            </div>

            <form onSubmit={handleNext} className="flex flex-col gap-5">

                {step === 1 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="flex flex-col gap-1.5">
                            <label className="au-label flex items-center gap-2"><FiUser className="text-purple-400" /> Platform Identity Name</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                placeholder="The name that defines you globally"
                                className="au-input"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="au-label">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    required
                                    className="au-input [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-50"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="au-label">Gender</label>
                                <select name="gender" value={formData.gender} onChange={handleChange} required className="au-input appearance-none cursor-pointer">
                                    <option value="" disabled className="text-gray-800">Select</option>
                                    <option value="male" className="text-gray-800">Male</option>
                                    <option value="female" className="text-gray-800">Female</option>
                                    <option value="other" className="text-gray-800">Other / Prefer not to say</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="au-label flex items-center gap-2"><FiGlobe className="text-purple-400" /> Nationality</label>
                                <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} required placeholder="Ex. Indian" className="au-input" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="au-label">Languages</label>
                                <input type="text" name="languages" value={formData.languages} onChange={handleChange} required placeholder="English, Hindi" className="au-input" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="au-label">Professional Overview</label>
                            <textarea
                                name="about"
                                value={formData.about}
                                onChange={handleChange}
                                required
                                rows={4}
                                placeholder="Briefly describe your core expertise and gaming background..."
                                className="au-input resize-none"
                            />
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-2 flex items-center gap-2"><FiLink /> Connect Social Proof</p>
                        <div className="grid grid-cols-1 gap-3">
                            <div className="relative group">
                                <input type="text" name="discord" value={formData.discord} onChange={handleChange} placeholder="Discord Tag (Khali#0001)" className="au-input pl-10" />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-indigo-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="relative group">
                                <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="LinkedIn URL" className="au-input pl-10" />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-600 opacity-50 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="relative group">
                                <input type="text" name="github" value={formData.github} onChange={handleChange} placeholder="GitHub Username" className="au-input pl-10" />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gray-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-4 flex flex-col gap-3">
                    <button type="submit" className="au-btn-white flex items-center justify-center gap-2">
                        {step < 3 ? 'CONTINUE' : 'FINALIZE IDENTITY'} <FiArrowRight />
                    </button>
                    {step > 1 && (
                        <button type="button" onClick={() => setStep(prev => prev - 1)} className="w-full text-white/50 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors flex items-center justify-center gap-2">
                            <FiArrowLeft /> Previous Step
                        </button>
                    )}
                </div>

            </form>

            {/* ── Welcome Modal ──────────────────────────────── */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-body">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-sm w-full text-center overflow-hidden border border-white/20">
                        <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-600" />
                        <div className="p-12">
                            <div className="w-20 h-20 rounded-3xl bg-purple-100 flex items-center justify-center mx-auto mb-8 shadow-inner">
                                <FiCpu className="w-10 h-10 text-purple-600" />
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-4 leading-tight">
                                IDENTITY SECURED
                            </h3>
                            <p className="text-sm text-gray-500 mb-10 leading-relaxed font-medium">
                                Your Master Identity is now the anchor for your reputation. Ready to project your specialized **Facades**?
                            </p>
                            <button
                                onClick={completeSetup}
                                className="w-full bg-gray-950 text-white text-sm font-black uppercase tracking-widest px-8 py-5 rounded-[1.5rem] transition-all hover:bg-black hover:scale-[1.02] shadow-xl"
                            >
                                ACTIVATE FACADES
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </AuthLayout>
    );
}
