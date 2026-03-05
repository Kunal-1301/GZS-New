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
            <section className="w-full max-w-4xl mx-auto px-6 pt-14 pb-10 text-center font-body">
                <h1 className="gzs-h1 !text-3xl md:!text-4xl !text-[var(--theme-primary)] mb-4">
                    HOW PROFILES WORK ON<br />GZONESPHERE
                </h1>
                <p className="gzs-body-sm max-w-lg mx-auto !text-sm">
                    GzoneSphere is built around skills, trust, and long-term growth — not resumes, titles, or social popularity.
                </p>
            </section>

            {/* ── YOUR MASTER PROFILE ────────────────────────────── */}
            <section className="w-full bg-[var(--theme-bg-alt)] py-14 font-body">
                <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
                    {/* Placeholder image left */}
                    <div className="h-64 bg-[var(--theme-border)] rounded-2xl shadow-inner flex items-center justify-center text-[var(--theme-text-muted)] text-[10px] font-black uppercase tracking-widest">
                        MASTER PROFILE PREVIEW
                    </div>
                    {/* Text right */}
                    <div>
                        <h2 className="gzs-h2 !text-xl mb-4">
                            YOUR MASTER PROFILE
                        </h2>
                        <p className="gzs-body-sm mb-6 !leading-relaxed">
                            Every user on GzoneSphere has one Master Profile. It represents you as a person, not a role or job.
                        </p>
                        <p className="gzs-label !text-[var(--theme-text)] mb-3">What it does?</p>
                        <ol className="space-y-2 gzs-body-sm list-decimal list-inside !text-sm">
                            <li>Tracks your overall growth</li>
                            <li>Aggregates skills across profiles</li>
                            <li>Holds trust & reputation</li>
                            <li>Records verified activity</li>
                        </ol>
                        <p className="gzs-body-sm !text-xs !text-[var(--theme-text-muted)] mt-8 !italic bg-white/50 p-4 rounded-xl border border-white/50">
                            Your Master Profile is your foundation. It's the first thing you built, and it grows automatically as you add specialized Sub-Profiles.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── SUB-PROFILES ──────────────────────────────────────── */}
            <section className="w-full max-w-4xl mx-auto px-6 py-16 text-center font-body">
                <h2 className="gzs-h1 !text-2xl mb-4 uppercase tracking-tight">
                    SUB-PROFILES: HOW YOU PARTICIPATE
                </h2>
                <p className="gzs-body-sm mb-10 max-w-xl mx-auto">
                    Sub-Profiles represent what you do. You choose them based on how you want to participate on the platform.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-left mb-10">
                    {[
                        ['1', 'Game Creation & Development'],
                        ['2', 'Esports, Play & Performance'],
                        ['3', 'Content, Media & Community'],
                        ['4', 'Business Strategy & Future Systems'],
                        ['5', 'Art, Visual & Character Design'],
                        ['6', 'Writing, Narrative & Editorial'],
                        ['7', 'Music, Audio & Sound Design'],
                    ].map(([n, label]) => (
                        <div key={n} className="flex items-center gap-3 border border-[var(--theme-border)] rounded-xl px-4 py-3 gzs-body-sm !text-[var(--theme-text)] bg-white hover:border-[var(--theme-primary)]/30 transition-colors group">
                            <span className="w-6 h-6 flex items-center justify-center rounded-lg bg-[var(--theme-bg-alt)] gzs-label !text-[var(--theme-text-muted)] shrink-0 group-hover:bg-[var(--theme-primary)] group-hover:text-white transition-colors">{n}</span>
                            <span className="font-bold text-xs">{label}</span>
                        </div>
                    ))}
                </div>

                <p className="gzs-body-sm !text-xs !text-[var(--theme-text-muted)] !italic">
                    You'll start with one sub-profile and can add more anytime.
                </p>
            </section>

            {/* ── HOW GROWTH & OPPORTUNITIES HAPPEN ─────────────── */}
            <section className="w-full bg-[var(--theme-bg-alt)] py-16 font-body">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="gzs-h1 !text-2xl mb-4 uppercase tracking-tight">
                        HOW GROWTH & OPPORTUNITIES HAPPEN
                    </h2>
                    <p className="gzs-body-sm mb-12 max-w-xl mx-auto">
                        GzoneSphere handles the complexity of skill tracking so you can focus on building.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {GROWTH_STEPS.map((step) => (
                            <div key={step.num} className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 bg-[var(--theme-bg-section)] rounded-xl mb-4 flex items-center justify-center gzs-body-sm !text-[var(--theme-primary)] font-black">
                                    {step.num.replace('.', '')}
                                </div>
                                <p className="gzs-h3 !text-xs mb-2 uppercase tracking-widest font-black">
                                    {step.label}
                                </p>
                                <p className="gzs-body-sm !text-xs !leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── WHAT GZONESPHERE IS NOT ────────────────────────── */}
            <section className="w-full max-w-4xl mx-auto px-6 py-16 font-body">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="gzs-h1 !text-2xl mb-6 uppercase tracking-tight">
                            WHAT GZONESPHERE IS NOT
                        </h2>
                        <ul className="space-y-4">
                            {NOT_LIST.map((item) => (
                                <li key={item} className="flex items-center gap-3 gzs-body-sm !text-[var(--theme-text)] !text-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" /> {item}
                                </li>
                            ))}
                        </ul>
                        <p className="gzs-body-sm !text-xs !text-[var(--theme-text-muted)] mt-10 !italic border-l-2 border-[var(--theme-primary)] pl-4">
                            GZONESPHERE: Reinforces seriousness and trust.
                        </p>
                    </div>
                    <div className="h-64 bg-[var(--theme-border)] rounded-2xl shadow-inner flex items-center justify-center text-[var(--theme-text-muted)] text-[10px] font-black uppercase tracking-widest">
                        VISUAL METAPHOR
                    </div>
                </div>
            </section>

            {/* ── CTA ────────────────────────────────────────────── */}
            <section className="w-full max-w-4xl mx-auto px-6 pb-16 font-body">
                <div className="bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-primary-dark)] rounded-3xl p-14 text-center shadow-xl shadow-[var(--theme-primary)]/20">
                    <h2 className="gzs-h1 !text-2xl text-white mb-3 tracking-tight">
                        NOW, CHOOSE YOUR FIRST SUB-PROFILE
                    </h2>
                    <p className="gzs-body-sm text-white/80 mb-8 !text-sm">Connect your Master Profile to specific activities.</p>
                    <button
                        onClick={() => navigate('/profile/choose-subprofile')}
                        className="gzs-btn-outline !border-white !text-white !px-12 !py-4 !rounded-xl !bg-white/10 hover:!bg-white hover:!text-[var(--theme-primary)] transition-all font-black uppercase tracking-[0.2em]"
                    >
                        CREATE NOW
                    </button>
                </div>
            </section>
        </ProfileSkillLayout>
    );
}
