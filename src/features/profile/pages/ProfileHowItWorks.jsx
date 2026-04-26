import { useNavigate } from 'react-router-dom';
import { FiTarget, FiCheckCircle, FiActivity } from 'react-icons/fi';
import { motion } from 'framer-motion';

const GROWTH_STEPS = [
    { num: '1.', label: 'ADD SKILLS', desc: 'Declare your core competencies and goals' },
    { num: '2.', label: 'GET VERIFIED', desc: 'Submit proof to get your skills peer-reviewed and verified' },
    { num: '3.', label: 'BUILD PROJECTS', desc: 'Showcase your work with project portfolios' },
    { num: '4.', label: 'GET HIRED', desc: 'Connect with companies via verified skill profiles' },
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
        <>
            {/* ── HOW PROFILES WORK hero ─────────────────────────── */}
            {/* ── CINEMATIC SYSTEM OVERVIEW ── */}
            <section className="relative w-full max-w-6xl mx-auto px-10 pt-24 pb-16 text-center font-heading">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-5 mb-10 bg-[var(--status-success)]/10 w-fit mx-auto px-8 py-3 rounded-full border-2 border-[var(--status-success)]/20 shadow-[0_0_30px_rgba(var(--status-success-rgb),0.1)] group cursor-help"
                >
                    <div className="w-3 h-3 rounded-full bg-[var(--status-success)] animate-pulse shadow-[0_0_15px_rgba(var(--status-success-rgb),1)]" />
                    <span className="text-sm font-black text-[var(--status-success)] uppercase tracking-wider italic drop-shadow-sm">142_ENTITIES_SYNK_AUTHED_THIS_CYCLE</span>
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter text-[var(--theme-text)] mb-8 leading-[0.75] italic"
                >
                    VERIFY_PROOF <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-text)] opacity-40">SECURE_FUTURE</span>
                </motion.h1>

                <p className="text-xl md:text-3xl font-black uppercase tracking-widest text-[var(--theme-text-muted)] max-w-2xl mx-auto opacity-40 italic border-l-4 border-r-4 border-[var(--theme-primary)]/40 px-12 leading-tight">
                    THE FIRST SKILL-BASED CAREER OPERATING SYSTEM. <br/> BUILT FOR TRUTH.
                </p>
            </section>

            {/* ── YOUR MASTER PROFILE ────────────────────────────── */}
            {/* ── THE MASTER IDENTITY CORE ── */}
            <section className="w-full bg-[var(--theme-card)]/40 backdrop-blur-3xl py-24 border-y-2 border-dashed border-[var(--theme-border)] relative overflow-hidden group">
                <div className="max-w-[1400px] mx-auto px-10 grid lg:grid-cols-2 gap-24 items-center relative z-10">
                    {/* Visual Shard */}
                    <div className="aspect-square bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-secondary)] rounded-[6rem] shadow-6xl flex flex-col items-center justify-center p-20 relative overflow-hidden group/shard">
                        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
                        <div className="absolute inset-0 opacity-20" style={{ 
                            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, 
                            backgroundSize: '30px 30px' 
                        }} />
                        <FiTarget className="text-[12rem] mb-8 text-white relative z-10 group-hover/shard:rotate-12 group-hover/shard:scale-110 transition-transform duration-[5s]" strokeWidth={1} />
                        <span className="text-base font-black uppercase tracking-widest text-white relative z-10 italic">AUTO_GEN_ID_CORE</span>
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                            {[0,1,2].map(i => <div key={i} className="w-2 h-2 rounded-full bg-white opacity-40 animate-pulse" style={{ animationDelay: `${i*300}ms` }} />)}
                        </div>
                    </div>

                    <div className="space-y-16">
                        <div className="space-y-6">
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-[var(--theme-text)] leading-none">
                                THE MASTER_IDENTITY
                            </h2>
                            <p className="text-2xl font-black uppercase tracking-widest text-[var(--theme-text-muted)] opacity-40 italic">UNIVERSAL_OPERATOR_SYNC</p>
                        </div>
                        
                        <div className="p-10 bg-[var(--theme-bg-alt)]/60 rounded-[4rem] border-2 border-dashed border-[var(--theme-primary)]/30 relative overflow-hidden group/box">
                            <p className="text-base font-black text-[var(--theme-primary)] uppercase tracking-wider leading-relaxed italic relative z-10">
                                <span className="text-[var(--theme-text)] opacity-100">CRITICAL_LOG:</span> YOUR MASTER PROFILE IS AUTO-SYNCHRONIZED UPON INITIAL SHARD SELECTION. NO MANUAL INITIALIZATION REQUIRED.
                            </p>
                            <div className="absolute inset-0 bg-[var(--theme-primary)] opacity-0 group-hover/box:opacity-5 transition-opacity" />
                        </div>

                        <div className="space-y-8">
                            {[
                                'TRACKS GLOBAL DOMAIN AUTHORITY',
                                'CONSOLIDATES CROSS-SHARD FEEDBACK',
                                'MAINTAINS SYSTEM-VERIFIED TRUST',
                                'ELIMINATES LEGACY RESUME PROTOCOLS'
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-8 group/list"
                                >
                                    <div className="w-12 h-12 bg-[var(--theme-text)] text-[var(--theme-bg)] rounded-2xl flex items-center justify-center group-hover/list:bg-[var(--theme-primary)] group-hover/list:text-white transition-all shadow-2xl group-hover/list:rotate-12">
                                        <FiCheckCircle size={24} strokeWidth={3} />
                                    </div>
                                    <span className="text-xl font-black uppercase tracking-tighter text-[var(--theme-text)] italic group-hover/list:translate-x-3 transition-transform">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
                <FiActivity size={800} className="absolute inset-0 m-auto opacity-[0.01] text-[var(--theme-primary)] pointer-events-none group-hover:scale-110 transition-transform duration-[20s]" />
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
                        ['1', 'Dev_Engine'],
                        ['2', 'Combat_Nexus'],
                        ['3', 'Broadcast_Shard'],
                        ['4', 'Business_Protocol'],
                        ['5', 'Visual_Burst'],
                        ['6', 'Lore_Blocks'],
                        ['7', 'Sonic_Landscapes'],
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
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--status-error)] shrink-0" /> {item}
                                </li>
                            ))}
                        </ul>
                        <p className="gzs-body-sm !text-xs !text-[var(--theme-text-muted)] mt-10 !italic border-l-2 border-[var(--theme-primary)] pl-4">
                            GZONESPHERE: Reinforces seriousness and trust.
                        </p>
                    </div>
                    <div className="h-64 bg-[var(--theme-border)] rounded-2xl shadow-inner flex items-center justify-center text-[var(--theme-text-muted)] text-xs font-black uppercase tracking-widest">
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
                        className="gzs-btn-outline !border-white !text-white !px-12 !py-4 !rounded-xl !bg-white/10 hover:!bg-white hover:!text-[var(--theme-primary)] transition-all font-black uppercase tracking-tight"
                    >
                        CREATE NOW
                    </button>
                </div>
            </section>
        </>
    );
}








