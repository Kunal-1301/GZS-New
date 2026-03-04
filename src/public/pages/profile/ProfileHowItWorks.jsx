import { useNavigate } from 'react-router-dom';
import ProfileSkillLayout from './ProfileSkillLayout';

const GROWTH_STEPS = [
    { num: '1.', label: 'ADD SKILLS', desc: 'Specific things you can do' },
    { num: '2.', label: 'ATTACH PROOF', desc: 'Show real work' },
    { num: '3.', label: 'UNLOCK OPPORTUNITIES', desc: 'Verification happens per skill' },
    { num: '4.', label: 'UNLOCK OPPORTUNITIES', desc: 'Hiring, commissions, playtests' },
];

const NOT_LIST = [
    'Not a resume platform',
    'Not a social media feed',
    'Not follower-driven',
    'Not hype-based',
];

export default function ProfileHowItWorks() {
    const navigate = useNavigate();

    return (
        <ProfileSkillLayout
            footer="GZONESPHERE: Reinforces seriousness and trust."
            noPadding
        >
            {/* ── HOW PROFILES WORK hero ─────────────────────────── */}
            <section className="w-full max-w-4xl mx-auto px-6 pt-14 pb-10 text-center">
                <h1 className="text-3xl md:text-4xl font-black uppercase text-[#7C3AED] leading-tight mb-4">
                    HOW PROFILES WORK ON<br />GZONESPHERE
                </h1>
                <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
                    GzoneSphere is built around skills, trust, and long-term growth — not resumes, titles, or social popularity.
                </p>
            </section>

            {/* ── YOUR MASTER PROFILE ────────────────────────────── */}
            <section className="w-full bg-gray-50 py-10">
                <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">
                    {/* Placeholder image left */}
                    <div className="h-52 bg-gray-200 rounded-xl" />
                    {/* Text right */}
                    <div>
                        <h2 className="text-xl font-black uppercase text-gray-900 mb-3">
                            YOUR MASTER PROFILE
                        </h2>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            Every user on GzoneSphere has one Master Profile. It represents you as a person, not a role or job.
                        </p>
                        <p className="text-sm font-bold text-gray-800 mb-2">What it does?</p>
                        <ol className="space-y-1 text-sm text-gray-600 list-decimal list-inside">
                            <li>Tracks your overall growth</li>
                            <li>Aggregates skills across profiles</li>
                            <li>Holds trust &amp; reputation</li>
                            <li>Records verified activity</li>
                        </ol>
                        <p className="text-xs text-gray-400 mt-5 italic leading-relaxed">
                            You don't create or edit your Master Profile. It becomes visible automatically after you create your first sub-profile.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── SUB-PROFILES ──────────────────────────────────────── */}
            <section className="w-full max-w-4xl mx-auto px-6 py-12 text-center">
                <h2 className="text-2xl font-black uppercase text-gray-900 mb-2">
                    SUB-PROFILES: HOW YOU PARTICIPATE
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                    Sub-Profiles represent what you do. You choose them based on
                </p>
                <p className="text-sm text-gray-500 mb-8">
                    how you want to participate on the platform.
                </p>

                <div className="grid grid-cols-3 gap-3 text-left mb-6">
                    {[
                        ['1', 'Game Creation & Development'],
                        ['2', 'Esports, Play & Performance'],
                        ['3', 'Content, Media & Community'],
                        ['4', 'Business Strategy & Future Systems'],
                        ['5', 'Art, Visual & Character Design'],
                        ['6', 'Writing, Narrative & Editorial'],
                    ].map(([n, label]) => (
                        <div key={n} className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700">
                            <span className="font-bold text-gray-400 shrink-0">{n}</span>
                            {label}
                        </div>
                    ))}
                    <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 col-span-1">
                        <span className="font-bold text-gray-400 shrink-0">7</span>
                        Music, Audio &amp; Sound Design
                    </div>
                </div>

                <p className="text-xs text-gray-400 italic">
                    You'll start with one sub-profile and can add more anytime.
                </p>
            </section>

            {/* ── HOW GROWTH & OPPORTUNITIES HAPPEN ─────────────── */}
            <section className="w-full bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-2xl font-black uppercase text-gray-900 mb-2">
                        HOW GROWTH &amp; OPPORTUNITIES HAPPEN
                    </h2>
                    <p className="text-sm text-gray-500 mb-8">
                        Sub-Profiles represent what you do. You choose them based on how you want to participate on the platform.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {GROWTH_STEPS.map((step) => (
                            <div key={step.num} className="bg-white border border-gray-200 rounded-xl p-5 text-left">
                                <div className="w-8 h-8 bg-gray-100 rounded-lg mb-3 flex items-center justify-center text-xs text-gray-400 font-bold">
                                    ICN
                                </div>
                                <p className="text-xs font-black text-gray-900 mb-1">
                                    {step.num} {step.label}
                                </p>
                                <p className="text-xs text-gray-500">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── WHAT GZONESPHERE IS NOT ────────────────────────── */}
            <section className="w-full max-w-4xl mx-auto px-6 py-12">
                <div className="grid md:grid-cols-2 gap-10 items-start">
                    <div>
                        <h2 className="text-2xl font-black uppercase text-gray-900 mb-5">
                            WHAT GZONESPHERE IS NOT
                        </h2>
                        <ul className="space-y-2">
                            {NOT_LIST.map((item) => (
                                <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                                    <span className="text-gray-300">•</span> {item}
                                </li>
                            ))}
                        </ul>
                        <p className="text-sm font-bold text-gray-700 mt-5">
                            GZONESPHERE: Reinforces seriousness and trust.
                        </p>
                    </div>
                    <div className="h-52 bg-gray-200 rounded-xl" />
                </div>
            </section>

            {/* ── CTA ────────────────────────────────────────────── */}
            <section className="w-full max-w-4xl mx-auto px-6 pb-14">
                <div className="bg-gray-100 rounded-2xl p-12 text-center">
                    <h2 className="text-2xl font-black uppercase text-[#7C3AED] mb-3">
                        CREATE YOUR FIRST SUB-PROFILE
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">This will activate your Master Profile.</p>
                    <button
                        onClick={() => navigate('/profile/choose-subprofile')}
                        className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-black uppercase tracking-widest px-8 py-3 rounded-lg transition-colors"
                    >
                        CREATE NOW
                    </button>
                </div>
            </section>
        </ProfileSkillLayout>
    );
}
