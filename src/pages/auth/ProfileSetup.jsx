import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function ProfileSetup() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [showModal, setShowModal] = useState(false);

    // Form State
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
        navigate('/profile'); // To profile dashboard
    };

    return (
        <AuthLayout
            title="YOUR BASE IN GZONESPHERE"
            subtitle="Create your profile to continue."
        >
            <form onSubmit={handleNext} className="flex flex-col gap-4">

                {step === 1 ? (
                    <>
                        {/* Username */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-[#a6d8e8]">
                                Your Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                placeholder="Ex. PlayerOne"
                                className="bg-au-input-bg border border-au-input-border text-white text-sm rounded-[4px] px-3.5 py-2.5 focus:border-white focus:outline-none placeholder-white/40 transition-colors"
                            />
                        </div>

                        {/* Date Of Birth */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-[#a6d8e8]">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                required
                                className="bg-au-input-bg border border-au-input-border text-white text-sm rounded-[4px] px-3.5 py-2.5 focus:border-white focus:outline-none placeholder-white/40 transition-colors [&::-webkit-calendar-picker-indicator]:filter-invert"
                            />
                        </div>

                        {/* Gender */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-[#a6d8e8]">
                                Gender
                            </label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                                className="bg-au-input-bg border border-au-input-border text-white text-sm rounded-[4px] px-3.5 py-2.5 focus:border-white focus:outline-none transition-colors appearance-none cursor-pointer"
                            >
                                <option value="" disabled className="text-white/40">Select Gender</option>
                                <option value="male" className="bg-au-card">Male</option>
                                <option value="female" className="bg-au-card">Female</option>
                                <option value="other" className="bg-au-card">Other</option>
                            </select>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Origin Point */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-[#a6d8e8]">
                                Origin Point
                            </label>
                            <input
                                type="text"
                                name="origin"
                                value={formData.origin}
                                onChange={handleChange}
                                required
                                placeholder="City, Country"
                                className="bg-au-input-bg border border-au-input-border text-white text-sm rounded-[4px] px-3.5 py-2.5 focus:border-white focus:outline-none placeholder-white/40 transition-colors"
                            />
                        </div>

                        {/* About */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-[#a6d8e8]">
                                About
                            </label>
                            <textarea
                                name="about"
                                value={formData.about}
                                onChange={handleChange}
                                required
                                rows={3}
                                placeholder="Tell us about yourself"
                                className="bg-au-input-bg border border-au-input-border text-white text-sm rounded-[4px] px-3.5 py-2.5 focus:border-white focus:outline-none placeholder-white/40 transition-colors resize-none"
                            />
                        </div>
                    </>
                )}

                {/* Actions spacer */}
                <div className="h-4" />

                {/* Action Button */}
                <div>
                    <button
                        type="submit"
                        className="bg-white text-au-card px-8 py-2.5 text-xs font-black uppercase tracking-wider rounded-sm transition-opacity hover:opacity-90"
                    >
                        {step === 1 ? 'NEXT' : 'DONE'}
                    </button>
                </div>
            </form>

            {/* SUCCESS MODAL */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="bg-white p-8 max-w-sm w-full rounded-md shadow-2xl text-center">
                        <h3 className="text-xl font-black text-[#085c7a] uppercase tracking-wide mb-3">
                            WELCOME TO GZONESPHERE
                        </h3>
                        <p className="text-sm text-neutral-600 mb-6">
                            Account Created Successfully.<br /> Redirecting to Dashboard.
                        </p>
                        <button
                            onClick={completeSetup}
                            className="px-8 py-2.5 bg-[#085c7a] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors hover:bg-[#05445c]"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

        </AuthLayout>
    );
}
