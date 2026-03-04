import { useNavigate } from 'react-router-dom';
import ProfileSkillLayout from './ProfileSkillLayout';
import { PROFILE_STATUS_ITEMS } from '../../data/profileSkillData';

export default function ProfileOverview() {
    const navigate = useNavigate();

    return (
        <ProfileSkillLayout
            title="ART, VISUAL & CHARACTER DESIGN"
            subtitle="Create the visual identity and assets of games."
            badge="setup"
            footer="Your profile grows with your work — not with speed."
        >
            {/* ── THIS PROFILE WILL INCLUDE ─────────────────── */}
            <div className="mb-10">
                <h2 className="text-lg font-black uppercase text-gray-900 text-center mb-6">
                    THIS PROFILE WILL INCLUDE
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {PROFILE_STATUS_ITEMS.map((item) => (
                        <div
                            key={item.label}
                            className="flex items-center justify-between bg-[#F3F4F6] rounded-lg px-5 py-3.5"
                        >
                            <span className="text-[11px] font-black uppercase tracking-wide text-gray-700">
                                {item.label}
                            </span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                {item.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── ADD SKILLS ────────────────────────────────── */}
            <div className="mb-10">
                <h2 className="text-lg font-black uppercase text-gray-900 mb-2">
                    ADD SKILLS TO YOUR PROFILE
                </h2>
                <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    Skills are the foundation of your profile. They show what you can actually do and how companies discover you.
                </p>
                <button
                    onClick={() => navigate('/profile/skill-add')}
                    className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-black uppercase tracking-widest px-6 py-2.5 rounded-lg transition-colors"
                >
                    ADD SKILLS
                </button>
            </div>

            {/* ── YOU'RE IN CONTROL ─────────────────────────── */}
            <div className="bg-[#F3F4F6] rounded-2xl p-10 text-center">
                <h3 className="text-xl font-black uppercase text-[#7C3AED] mb-3">
                    YOU'RE IN CONTROL
                </h3>
                <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto leading-relaxed">
                    You don't need to complete everything right now. Start with one skill, and build your profile over time as you gain experience.
                </p>
                <button
                    onClick={() => navigate('/profile/skill-add')}
                    className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-black uppercase tracking-widest px-8 py-3 rounded-lg transition-colors"
                >
                    ADD SKILL
                </button>
            </div>
        </ProfileSkillLayout>
    );
}
