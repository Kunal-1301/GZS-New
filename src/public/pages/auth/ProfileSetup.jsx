import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function ProfileSetup() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        dob: '',
        gender: '',
        origin: '',
        about: '',
    });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (step === 1) setStep(2);
        else setShowModal(true);
    };

    const completeSetup = () => {
        setShowModal(false);
        navigate('/profile');
    };

    return (
        <AuthLayout
            title="YOUR SPACE BECOMING A PAGE"
            subtitle="Create your profile to continue."
        >
            <form onSubmit={handleNext} className="flex flex-col gap-4">

                {step === 1 ? (
                    <>
                        {/* Username */}
                        <div className="flex flex-col gap-1.5">
                            <label className="au-label">Your Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                placeholder="Ex. PlayerOne"
                                className="au-input"
                            />
                        </div>

                        {/* Date of Birth */}
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

                        {/* Gender */}
                        <div className="flex flex-col gap-1.5">
                            <label className="au-label">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                                className="au-input appearance-none cursor-pointer"
                            >
                                <option value="" disabled className="text-gray-800">Select Gender</option>
                                <option value="male" className="text-gray-800">Male</option>
                                <option value="female" className="text-gray-800">Female</option>
                                <option value="other" className="text-gray-800">Other</option>
                            </select>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Origin */}
                        <div className="flex flex-col gap-1.5">
                            <label className="au-label">Origin Point</label>
                            <input
                                type="text"
                                name="origin"
                                value={formData.origin}
                                onChange={handleChange}
                                required
                                placeholder="City, Country"
                                className="au-input"
                            />
                        </div>

                        {/* About */}
                        <div className="flex flex-col gap-1.5">
                            <label className="au-label">About</label>
                            <textarea
                                name="about"
                                value={formData.about}
                                onChange={handleChange}
                                required
                                rows={3}
                                placeholder="Tell us about yourself"
                                className="au-input resize-none"
                            />
                        </div>
                    </>
                )}

                <div className="mt-3">
                    <button type="submit" className="au-btn-white">
                        {step === 1 ? 'NEXT' : 'DONE'}
                    </button>
                </div>

            </form>

            {/* ── Welcome Modal ──────────────────────────────── */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
                    <div className="bg-white rounded-lg shadow-2xl max-w-sm w-full text-center overflow-hidden">
                        {/* Modal top accent */}
                        <div className="h-1.5 bg-[#085c7a]" />
                        <div className="p-8">
                            <div className="w-14 h-14 rounded-full bg-[#085c7a]/10 flex items-center justify-center mx-auto mb-5">
                                <svg className="w-7 h-7 text-[#085c7a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-black text-[#085c7a] uppercase tracking-wide mb-3 font-heading">
                                WELCOME TO GZONESPHERE
                            </h3>
                            <p className="text-sm text-neutral-500 mb-7 leading-relaxed">
                                Account Created Successfully.<br />Redirecting to Dashboard.
                            </p>
                            <button
                                onClick={completeSetup}
                                className="bg-[#085c7a] text-white text-sm font-black uppercase tracking-widest px-8 py-3 rounded transition-colors hover:bg-[#064d68]"
                            >
                                ENTER
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </AuthLayout>
    );
}
