import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SUB_PROFILES } from '@data/profileSkillData';

export default function Discovery() {
    const navigate = useNavigate();
    const [selectedSubProfile, setSelectedSubProfile] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProfiles = SUB_PROFILES; // Placeholder for actual talent results

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-inter">
            <Navbar />

            {/* ── HEADER SECTION ────────────────────────────── */}
            <div className="bg-gray-900 py-16 px-6 sm:px-12">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4 leading-tight">
                        TALENT DISCOVERY
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed uppercase tracking-widest font-bold">
                        The world's first skill-based verification engine for the gaming ecosystem.
                    </p>
                </div>
            </div>

            {/* ── SEARCH & FILTER BAR ───────────────────────── */}
            <div className="relative z-10 -mt-8 max-w-5xl mx-auto w-full px-4">
                <div className="bg-white rounded-2xl shadow-xl p-4 flex flex-col md:flex-row gap-4 border border-gray-100">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="SEARCH BY ATOMIC SKILLS (e.g. UNREAL ENGINE 5, C++ TRADING, LOW-POLY)..."
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-xl text-xs font-bold uppercase tracking-widest focus:ring-2 focus:ring-[#7C3AED] transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="bg-[#7C3AED] text-white px-8 py-4 rounded-xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-[#6D28D9] transition-all shadow-lg shadow-[#7C3AED]/30">
                        <FiZap className="w-4 h-4" />
                        FIND TALENT
                    </button>
                    <button className="bg-white border-2 border-gray-100 text-gray-600 px-6 py-4 rounded-xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-all">
                        <FiFilter className="w-4 h-4" />
                        ADVANCED
                    </button>
                </div>
            </div>

            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 flex flex-col md:flex-row gap-12">

                {/* ── SIDEBAR FILTERS ─────────────────────────── */}
                <aside className="w-full md:w-72 shrink-0">
                    <div className="sticky top-24 space-y-8">
                        <div>
                            <h3 className="text-[11px] font-black uppercase tracking-widest text-[#7C3AED] mb-4">PROFILE CATEGORIES</h3>
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => setSelectedSubProfile('all')}
                                    className={`text-left px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedSubProfile === 'all' ? 'bg-[#7C3AED] text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'}`}
                                >
                                    ALL SPECIALIZATIONS
                                </button>
                                {SUB_PROFILES.map((sub) => (
                                    <button
                                        key={sub.id}
                                        onClick={() => setSelectedSubProfile(sub.id)}
                                        className={`text-left px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedSubProfile === sub.id ? 'bg-[#7C3AED] text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'}`}
                                    >
                                        {sub.title}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[11px] font-black uppercase tracking-widest text-[#7C3AED] mb-4">VERIFICATION LEVEL</h3>
                            <div className="space-y-3">
                                {['VERIFIED SKILLS ONLY', 'L2 PROOF SUBMITTED', 'L4 EXPERT VERIFIED'].map(lvl => (
                                    <label key={lvl} className="flex items-center gap-3 cursor-pointer group">
                                        <div className="w-5 h-5 border-2 border-gray-200 rounded flex items-center justify-center group-hover:border-[#7C3AED] transition-all">
                                            <div className="w-2 h-2 bg-[#7C3AED] rounded-sm opacity-0 group-checked:opacity-100"></div>
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{lvl}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* ── TALENT LISTING ──────────────────────────── */}
                <section className="flex-1">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-black uppercase text-gray-900 tracking-tight">FEATURED TALENT ({filteredProfiles.length})</h2>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase">SORT BY:</span>
                            <select className="bg-transparent border-none text-[10px] font-black uppercase text-[#7C3AED] focus:ring-0">
                                <option>LATEST ACTIVE</option>
                                <option>MOST VERIFIED</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {/* Dummy Result Cards */}
                        {[1, 2, 3, 4].map(idx => (
                            <div key={idx} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#7C3AED]/20 transition-all group overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#7C3AED]/5 rounded-bl-full -mr-16 -mt-16 group-hover:bg-[#7C3AED]/10 transition-all"></div>

                                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                                    <div className="w-24 h-24 bg-gradient-to-br from-[#7C3AED] to-[#9333EA] rounded-full flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-purple-200">
                                        {idx === 1 ? 'K' : idx === 2 ? 'M' : 'S'}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                            <h3 className="text-2xl font-black uppercase text-gray-900 leading-none">TALENT NAME {idx}</h3>
                                            <div className="flex items-center gap-1 text-[9px] font-black uppercase bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-200">
                                                <FiCheckCircle />
                                                EXPERT VERIFIED
                                            </div>
                                        </div>
                                        <p className="text-[10px] font-black uppercase text-[#7C3AED] tracking-[0.2em] mb-4">ART & VISUAL • CONCEPT ARTIST</p>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {['2D Anatomy', 'Environment Design', 'Lighting'].map(skill => (
                                                <span key={skill} className="bg-gray-100 px-3 py-1 rounded-full text-[9px] font-bold uppercase text-gray-500 border border-gray-200">
                                                    {skill}
                                                </span>
                                            ))}
                                            <span className="bg-white border border-[#7C3AED] text-[#7C3AED] px-3 py-1 rounded-full text-[9px] font-black uppercase">
                                                +8 MORE
                                            </span>
                                        </div>

                                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-6 max-w-2xl">
                                            Experienced character designer with a focus on stylized anatomy and modular assets. Shipped 3 indie titles and collaborated on over 50 concept sets.
                                        </p>

                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => navigate('/profile/overview')}
                                                className="bg-gray-900 text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#7C3AED] transition-all"
                                            >
                                                VIEW PROFILE
                                            </button>
                                            <button className="text-[10px] font-black uppercase text-gray-400 tracking-widest hover:text-[#7C3AED] transition-all">
                                                SAVE FOR LATER
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 flex justify-center">
                        <button className="bg-white border border-gray-200 px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:bg-gray-50 transition-all">
                            LOAD MORE TALENT
                        </button>
                    </div>
                </section>
            </main>

            {/* ── FOOTER SECTION ────────────────────────────── */}
            <div className="bg-[#7C3AED] py-20 px-6 text-center text-white">
                <h2 className="text-3xl font-black uppercase mb-4 tracking-tight">READY TO COLLABORATE?</h2>
                <p className="text-white/70 max-w-xl mx-auto mb-10 text-sm leading-relaxed font-bold uppercase tracking-widest">
                    Post your capability requirements and let verified talent find you.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="bg-white text-[#7C3AED] px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:bg-gray-50 transition-all">
                        POST A COMMISSION
                    </button>
                    <button className="bg-gray-900 text-white px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all">
                        HIRE TALENT
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
}
