import React from 'react';
import { Link } from 'react-router-dom';
import {
    FiArrowRight, FiShield, FiZap, FiUsers, FiTrendingUp,
    FiCheckCircle, FiStar, FiGrid, FiBriefcase, FiArrowUpRight, FiGlobe, FiTarget, FiBox, FiActivity
} from 'react-icons/fi';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col font-body overflow-x-hidden selection:bg-indigo-600 selection:text-white">
            <Helmet>
                <title>GzoneSphere | The Global Gaming Universe & Professional Identity Engine</title>
                <meta name="description" content="GzoneSphere is the world's first verified multi-profile ecosystem for the gaming industry. Build your professional identity, verify skills, and connect with global opportunities." />
                <meta property="og:title" content="GzoneSphere | Gaming Professional Identity Engine" />
                <meta property="og:description" content="One Master Identity. Infinite verified facades for building, playing, and leading in the gaming world." />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://gzonesphere.com/" />
            </Helmet>
            <Navbar />

            {/* ── HERO SECTION: THE COMMAND CENTER ── */}
            <section className="relative w-full py-32 lg:py-52 bg-[#050505] overflow-hidden">
                {/* Background Articulations */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 blur-[160px] rounded-full -mr-64 -mt-64 pointer-events-none animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full -ml-40 -mb-40 pointer-events-none"></div>

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>

                <div className="container-global px-6 lg:px-16 relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
                    <div className="max-w-5xl">
                        <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 backdrop-blur-md text-white/80 text-[10px] font-black uppercase tracking-[0.4em] rounded-full border border-white/10 mb-10 animate-[fadeIn_0.5s_ease-out]">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></span>
                            PROTOCOL v3.0 // LIVE NETWORK
                        </div>

                        <h1 className="text-6xl lg:text-[10rem] font-black text-white leading-[0.8] tracking-tighter mb-10 uppercase italic selection:bg-white selection:text-black">
                            DOMAIN <br />
                            <span className="text-indigo-600">MASTERY</span> <br />
                            <span className="text-white/20">STARTS HERE.</span>
                        </h1>

                        <p className="text-xl lg:text-2xl text-neutral-400 font-medium leading-relaxed max-w-2xl mb-14">
                            The world's first verified multi-profile ecosystem for the global gaming industry.
                            One Master Identity. Infinite verified facades for building, playing, and leading.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
                            <Link to="/signup" className="w-full sm:w-auto px-16 py-6 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-indigo-600/20 transition-all hover:-translate-y-1 flex items-center justify-center gap-4 group">
                                ESTABLISH IDENTITY
                                <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                            <Link to="/profile/how-it-works" className="w-full sm:w-auto px-12 py-6 text-white text-sm font-black uppercase tracking-[0.2em] border border-white/10 rounded-2xl hover:bg-white/5 transition-all text-center">
                                HOW PROFILE OS WORKS
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Live Feed Ticker (Mock) */}
                <div className="absolute bottom-0 left-0 w-full bg-white/5 backdrop-blur-3xl border-t border-white/5 px-8 py-4 overflow-hidden">
                    <div className="flex items-center gap-52 text-[10px] font-black text-indigo-400 uppercase tracking-widest whitespace-nowrap animate-[marquee_40s_linear_infinite]">
                        <span>[ SYSTEM ] NEW TALENT VERIFIED: KHALI (ART) - TRUST L4</span>
                        <span>[ EVENT ] VALORANT WINTER CUP STARTS IN 48HRS - 32 SLOTS LOCKED</span>
                        <span>[ NETWORK ] HYDRA STUDIO RELEASING PLAYTEST BRIEF - ESCROW $2.5K</span>
                        <span>[ SYSTEM ] 1,284 NODES ACTIVE IN COMMUNITY SOCIAL LOBBY</span>
                        <span>[ SYSTEM ] NEW TALENT VERIFIED: KHALI (ART) - TRUST L4</span>
                    </div>
                </div>
            </section>

            {/* ── THE ECOSYSTEM DUALITY ── */}
            <section className="py-32 bg-white relative overflow-hidden">
                <div className="container-global px-6 lg:px-16 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-10 order-2 lg:order-1">
                            <div className="space-y-4">
                                <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none">
                                    FOR THE <br />
                                    <span className="text-indigo-600">INDIVIDUAL.</span>
                                </h2>
                                <p className="text-xl text-neutral-500 font-medium leading-relaxed">
                                    Your gaming presence is fragmented. GzoneSphere unifies it under a Master Profile with specialized facades for every facet of your career.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="p-8 bg-neutral-50 rounded-[2rem] border border-neutral-100 hover:border-indigo-100 transition-colors group">
                                    <FiGrid className="w-10 h-10 text-indigo-600 mb-6 group-hover:scale-110 transition-transform" />
                                    <h4 className="text-lg font-black uppercase mb-2">Facade System</h4>
                                    <p className="text-xs font-bold text-neutral-400 leading-relaxed uppercase tracking-widest">Toggle profiles for dev, play, or design.</p>
                                </div>
                                <div className="p-8 bg-neutral-50 rounded-[2rem] border border-neutral-100 hover:border-indigo-100 transition-colors group">
                                    <FiShield className="w-10 h-10 text-indigo-600 mb-6 group-hover:scale-110 transition-transform" />
                                    <h4 className="text-lg font-black uppercase mb-2">Atomic Proof</h4>
                                    <p className="text-xs font-bold text-neutral-400 leading-relaxed uppercase tracking-widest">Verify individual skills with undeniable evidence.</p>
                                </div>
                            </div>

                            <Link to="/signup" className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-widest bg-neutral-900 text-white px-10 py-5 rounded-2xl hover:bg-neutral-800 transition-all">
                                START INDIVIDUAL SETUP <FiArrowRight />
                            </Link>
                        </div>
                        <div className="relative order-1 lg:order-2">
                            {/* High Fidelity Card Mockup */}
                            <div className="bg-indigo-600 rounded-[3rem] p-1 shadow-[0_50px_100px_-20px_rgba(79,70,229,0.3)] rotate-3">
                                <div className="bg-white rounded-[3rem] p-12 translate-x-3 -translate-y-3">
                                    <div className="flex justify-between items-start mb-10">
                                        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 text-3xl font-black">M</div>
                                        <div className="text-right">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Reputation</div>
                                            <div className="text-2xl font-black text-indigo-600">Lvl 42</div>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-black tracking-tighter uppercase mb-2">Marcus Dev</h3>
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400 mb-10">Master Profile Hub</p>

                                    <div className="space-y-6">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">G-creation Facade</span>
                                            <span className="text-[10px] font-black">9.2 Verified</span>
                                        </div>
                                        <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                                            <div className="w-4/5 h-full bg-indigo-600" />
                                        </div>
                                        <div className="flex justify-between items-end pt-2">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Esports Facade</span>
                                            <span className="text-[10px] font-black">4.5 Verified</span>
                                        </div>
                                        <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                                            <div className="w-1/2 h-full bg-purple-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── THE ORGANIZATION HUB ── */}
            <section className="py-32 bg-[#050505] text-white relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <div className="container-global px-6 lg:px-16 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="flex-1 w-full max-w-xl">
                            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 text-left relative overflow-hidden group">
                                <div className="absolute -right-10 -top-10 text-white/5 group-hover:rotate-12 transition-transform duration-700"><FiBriefcase size={240} /></div>
                                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-indigo-500 mb-8">HUB OPERATIONS</h3>
                                <div className="space-y-8">
                                    <div className="flex gap-6">
                                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg border border-white/5"><FiTarget /></div>
                                        <div>
                                            <h5 className="font-black uppercase tracking-widest mb-1">Precision Hiring</h5>
                                            <p className="text-[10px] font-bold text-white/40 leading-relaxed italic">"Filter 10,000 profiles by Truth Level 2 C++ verification in 0.4s."</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6">
                                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg border border-white/5"><FiBox /></div>
                                        <div>
                                            <h5 className="font-black uppercase tracking-widest mb-1">Brief Escrow</h5>
                                            <p className="text-[10px] font-bold text-white/40 leading-relaxed italic">"Secure billion-dollar talent collaborations with automated fund release."</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 space-y-10">
                            <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none">
                                FOR THE <br />
                                <span className="text-white/20">ORGANIZATION.</span>
                            </h2>
                            <p className="text-xl text-neutral-400 font-medium leading-relaxed">
                                Build, hire, and scale with verifiable trust. From indie studios to global publishers, GzoneSphere provides the infrastructure for professional growth.
                            </p>
                            <Link to="/community/company-dashboard" className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-widest bg-white text-black px-10 py-5 rounded-2xl hover:bg-neutral-200 transition-all">
                                ACCESS COMPANY DASHBOARD <FiArrowRight />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── STATS SECTION ── */}
            <section className="py-32 bg-white">
                <div className="container-global px-6 lg:px-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: 'Active Nodes', val: '142k+', icon: <FiActivity /> },
                            { label: 'Verified Skills', val: '1.2M', icon: <FiCheckCircle /> },
                            { label: 'Funds Escrowed', val: '$8.4M', icon: <FiBox /> },
                            { label: 'Total Branches', val: '1,280', icon: <FiGlobe /> }
                        ].map((stat, i) => (
                            <div key={i} className="text-center group">
                                <div className="inline-flex p-4 bg-indigo-50 text-indigo-600 rounded-2xl mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">{stat.icon}</div>
                                <div className="text-4xl lg:text-5xl font-black tracking-tighter mb-2">{stat.val}</div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FINAL CTA ── */}
            <section className="py-24 bg-indigo-600 text-white relative overflow-hidden">
                <div className="absolute -right-40 -top-40 w-[600px] h-[600px] bg-white/10 blur-[100px] rounded-full"></div>
                <div className="container-global px-6 lg:px-16 text-center relative z-10">
                    <h2 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter mb-12 leading-[0.9]">
                        SECURE YOUR <br />
                        LEGACY <span className="text-white/30">TODAY.</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link to="/signup" className="px-16 py-7 bg-white text-indigo-600 text-sm font-black uppercase tracking-widest rounded-3xl shadow-2xl shadow-white/20 transition-all hover:scale-105">
                            START MASTER SETUP
                        </Link>
                        <Link to="/about" className="px-16 py-7 border border-white/20 text-white text-sm font-black uppercase tracking-widest rounded-3xl hover:bg-white/10 transition-all">
                            SYSTEM PHILOSOPHY
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}} />
        </div>
    );
};

export default Home;
