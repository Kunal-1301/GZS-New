import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CompanyProfileSetup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        industry: '',
        size: '',
        location: '',
        bio: '',
        website: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send data to backend to create company profile
        // After success, navigate to the newly created company profile
        navigate('/company/new');
    };

    return (
        <ProfileSkillLayout
            title="ORGANIZATION SETUP"
            subtitle="Establish your brand's presence in the ecosystem."
            badge="COMPANY PROFILE"
            footer="You can update these details later from your dashboard."
        >
            <div className="max-w-3xl mx-auto my-8 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    {/* Company Name */}
                    <div>
                        <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 mb-2">
                            <FiBriefcase className="text-[#10B981]" /> Organization Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Epic Games, Team Liquid..."
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#10B981] focus:bg-white transition-colors text-gray-900"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Industry */}
                        <div>
                            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 mb-2">
                                <FiTag className="text-[#10B981]" /> Primary Focus
                            </label>
                            <select
                                name="industry"
                                required
                                value={formData.industry}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#10B981] focus:bg-white transition-colors text-gray-900 appearance-none cursor-pointer"
                            >
                                <option value="" disabled>Select Focus Area</option>
                                <option value="game-development">Game Development Studio</option>
                                <option value="esports-org">Esports Organization</option>
                                <option value="publisher">Publisher / Distributor</option>
                                <option value="hardware">Hardware / Peripherals</option>
                                <option value="agency">Talent / Marketing Agency</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Team Size */}
                        <div>
                            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 mb-2">
                                <FiUsers className="text-[#10B981]" /> Organization Size
                            </label>
                            <select
                                name="size"
                                required
                                value={formData.size}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#10B981] focus:bg-white transition-colors text-gray-900 appearance-none cursor-pointer"
                            >
                                <option value="" disabled>Select Team Size</option>
                                <option value="1-10">1-10 employees</option>
                                <option value="11-50">11-50 employees</option>
                                <option value="51-200">51-200 employees</option>
                                <option value="201-500">201-500 employees</option>
                                <option value="500+">500+ employees</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Headquarters / Location */}
                        <div>
                            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 mb-2">
                                <FiMapPin className="text-[#10B981]" /> Headquarters Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                required
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="City, Country"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#10B981] focus:bg-white transition-colors text-gray-900"
                            />
                        </div>

                        {/* Website */}
                        <div>
                            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 mb-2">
                                Website (Optional)
                            </label>
                            <input
                                type="url"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#10B981] focus:bg-white transition-colors text-gray-900"
                            />
                        </div>
                    </div>

                    {/* Bio / Description */}
                    <div>
                        <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 mb-2">
                            Short Bio / Description
                        </label>
                        <textarea
                            name="bio"
                            required
                            value={formData.bio}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Tell us about your organization's mission, goals, and history..."
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#10B981] focus:bg-white transition-colors text-gray-900 resize-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 mt-2 border-t border-gray-100 flex justify-end">
                        <button
                            type="submit"
                            className="bg-[#10B981] text-white text-sm font-black uppercase tracking-widest px-10 py-4 rounded-xl shadow-lg shadow-[#10B981]/20 hover:-translate-y-1 transition-all"
                        >
                            CREATE COMPANY PROFILE
                        </button>
                    </div>

                </form>
            </div>
        </ProfileSkillLayout>
    );
}
