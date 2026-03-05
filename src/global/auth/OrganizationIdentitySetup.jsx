import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBriefcase, FiMapPin, FiGlobe, FiUsers, FiArrowRight, FiArrowLeft, FiFeather } from 'react-icons/fi';
import AuthLayout from './AuthLayout';

export default function OrganizationIdentitySetup() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        orgName: '',
        industry: '',
        size: '',
        foundationDate: '',
        location: '',
        bio: '',
        website: '',
        twitter: '',
        linkedin: '',
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
        navigate('/profile/master');
    };

    return (
        <AuthLayout
            title="REGISTER ORGANIZATION"
            subtitle="Establish your professional presence in the GzoneSphere network."
        >
            {/* Step Indicator */}
            <div className="flex gap-2 mb-8">
                {[1, 2, 3].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-[#10B981]' : 'bg-white/10'}`} />
                ))}
            </div>

            <form onSubmit={handleNext} className="flex flex-col gap-5">

                {step === 1 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="flex flex-col gap-1.5">
                            <label className="au-label flex items-center gap-2"><FiBriefcase className="text-green-400" /> Registered Name</label>
                            <input
                                type="text"
                                name="orgName"
                                value={formData.orgName}
                                onChange={handleChange}
                                required
                                placeholder="Legal name of your studio or organization"
                                className="au-input focus:border-green-500/50"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="au-label">Industry Sector</label>
                                <select name="industry" value={formData.industry} onChange={handleChange} required className="au-input appearance-none cursor-pointer">
                                    <option value="" disabled className="text-gray-800">Select Sector</option>
                                    <option value="studio" className="text-gray-800">Game Development</option>
                                    <option value="esports" className="text-gray-800">Esports Org</option>
                                    <option value="media" className="text-gray-800">Media / Publishing</option>
                                    <option value="hardware" className="text-gray-800">Gaming Hardware</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="au-label">Entity Size</label>
                                <select name="size" value={formData.size} onChange={handleChange} required className="au-input appearance-none cursor-pointer">
                                    <option value="" disabled className="text-gray-800">Size</option>
                                    <option value="1-10" className="text-gray-800">1-10 (Boutique)</option>
                                    <option value="11-50" className="text-gray-800">11-50 (Mid-level)</option>
                                    <option value="51-200" className="text-gray-800">51-200 (Large)</option>
                                    <option value="200+" className="text-gray-800">200+ (Enterprise)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="flex flex-col gap-1.5">
                            <label className="au-label flex items-center gap-2"><FiMapPin className="text-green-400" /> Headquarters</label>
                            <input type="text" name="location" value={formData.location} onChange={handleChange} required placeholder="City, Country" className="au-input" />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="au-label flex items-center gap-2"><FiFeather className="text-green-400" /> Mission Statement</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                required
                                rows={4}
                                placeholder="Describe your organization's vision and platform goals..."
                                className="au-input resize-none"
                            />
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        <p className="text-[10px] font-black text-green-400 uppercase tracking-widest mb-2 flex items-center gap-2"><FiGlobe /> Online Footprint</p>
                        <div className="grid grid-cols-1 gap-3">
                            <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="Official Website (Optional)" className="au-input" />
                            <input type="text" name="twitter" value={formData.twitter} onChange={handleChange} placeholder="X / Twitter Handle" className="au-input" />
                            <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="LinkedIn Company Page" className="au-input" />
                        </div>
                    </div>
                )}

                <div className="mt-4 flex flex-col gap-3">
                    <button type="submit" className="au-btn-white !text-green-600 !border-green-600/20 hover:!bg-green-50 flex items-center justify-center gap-2">
                        {step < 3 ? 'NEXT' : 'CREATE ORGANIZATION'} <FiArrowRight />
                    </button>
                    {step > 1 && (
                        <button type="button" onClick={() => setStep(prev => prev - 1)} className="w-full text-white/50 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors flex items-center justify-center gap-2">
                            <FiArrowLeft /> Back
                        </button>
                    )}
                </div>

            </form>

            {/* ── Welcome Modal ──────────────────────────────── */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-body">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-sm w-full text-center overflow-hidden border border-white/20">
                        <div className="h-2 bg-[#10B981]" />
                        <div className="p-12">
                            <div className="w-20 h-20 rounded-3xl bg-green-50 flex items-center justify-center mx-auto mb-8 shadow-inner">
                                <FiUsers className="w-10 h-10 text-[#10B981]" />
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-4 leading-tight">
                                ENTITY VERIFIED
                            </h3>
                            <p className="text-sm text-gray-500 mb-10 leading-relaxed font-medium">
                                Your organization is now a verified node. You can start hiring talent, managing commissions, or posting playtests.
                            </p>
                            <button
                                onClick={completeSetup}
                                className="w-full bg-gray-950 text-white text-sm font-black uppercase tracking-widest px-8 py-5 rounded-[1.5rem] transition-all hover:bg-black hover:scale-[1.02] shadow-xl"
                            >
                                GO TO DASHBOARD
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </AuthLayout>
    );
}
