import { useNavigate, useLocation } from 'react-router-dom';
import ProfileSkillLayout from './ProfileSkillLayout';
import { PROFILE_STATUS_ITEMS, SUB_PROFILES } from '@data/profileSkillData';

export default function ProfileOverview() {
    const navigate = useNavigate();
    const location = useLocation();
    const profileId = location.state?.profileId || 'art-visual';
    const activeProfile = SUB_PROFILES.find(p => p.id === profileId) || SUB_PROFILES[4];

    return (
        <ProfileSkillLayout
            title={activeProfile.title}
            subtitle={activeProfile.description}
            badge="setup"
            footer="Your profile grows with your work — not with speed."
        >
            {/* ── THIS PROFILE WILL INCLUDE ─────────────────── */}
            <div className="mb-14 font-body">
                <h2 className="gzs-h2 !text-xl text-center mb-8 uppercase tracking-widest font-black">
                    THIS PROFILE WILL INCLUDE
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {PROFILE_STATUS_ITEMS.map((item) => (
                        <div
                            key={item.label}
                            className="flex items-center justify-between bg-[#F9FAFB] border border-[#F3F4F6] rounded-2xl px-6 py-5 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <span className="text-[11px] font-black uppercase tracking-widest text-[var(--theme-text)]">
                                {item.label}
                            </span>
                            <span className="text-[10px] font-black text-[#A1A1AA] uppercase tracking-wider">
                                {item.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── ADD SKILLS ────────────────────────────────── */}
            <div className="mb-14 font-body border-t border-[var(--theme-border)] pt-12">
                <h2 className="gzs-h1 !text-2xl mb-3 uppercase tracking-tight">
                    ADD SKILLS TO YOUR PROFILE
                </h2>
                <p className="gzs-body-sm !text-sm mb-8 !leading-relaxed max-w-2xl">
                    Skills are the foundation of your profile. They show what you can actually do and how companies discover you.
                </p>
                <button
                    onClick={() => navigate('/profile/skill-add', { state: { profileId } })}
                    className="gzs-btn-primary !px-10 !py-3.5 !rounded-xl shadow-lg shadow-[var(--theme-primary)]/20"
                >
                    ADD SKILLS
                </button>
            </div>

            {/* ── YOU'RE IN CONTROL ─────────────────────────── */}
            <div className="bg-[#F3E8FF] rounded-3xl p-12 text-center font-body border-2 border-[var(--theme-primary)]/10 shadow-xl shadow-purple-500/5 mb-10">
                <h3 className="gzs-h1 !text-2xl !text-[var(--theme-primary)] mb-4 tracking-tight">
                    YOU'RE IN CONTROL
                </h3>
                <p className="gzs-body-sm !text-sm mb-8 max-w-md mx-auto !text-purple-900/70 !leading-relaxed">
                    You don't need to complete everything right now. Start with one skill, and build your profile over time as you gain experience.
                </p>
                <button
                    onClick={() => navigate('/profile/skill-add', { state: { profileId } })}
                    className="gzs-btn-primary !px-12 !py-4 shadow-lg shadow-[var(--theme-primary)]/30 !rounded-xl font-black uppercase tracking-widest"
                >
                    ADD SKILL
                </button>
            </div>
        </ProfileSkillLayout>
    );
}
