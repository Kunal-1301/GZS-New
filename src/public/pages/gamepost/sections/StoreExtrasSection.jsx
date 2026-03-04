export default function StoreExtrasSection() {
    return (
        <section className="container-global section-padding !pt-0 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Pro Features Card */}
            <div className="bg-[var(--gp-primary)] p-12 rounded-[2.5rem] relative overflow-hidden shadow-[0_15px_30px_var(--gp-primary-alpha)] hover:shadow-[0_20px_50px_var(--gp-primary-alpha)] transition-all duration-500 hover:-translate-y-2 gp-card-hover gp-animate-in group border border-white/20">

                {/* Visual decorations */}
                <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-white/10 to-transparent skew-x-[-30deg] translate-x-20 origin-top-right group-hover:scale-110 transition-transform duration-700 opacity-60" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>

                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/40 group-hover:border-white transition-colors"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/40 group-hover:border-white transition-colors"></div>

                <h4 className="gp-hero-title text-3xl text-white mb-10 relative z-10 border-b border-white/30 pb-6 drop-shadow-sm">
                    PRO FEATURES
                </h4>

                <div className="space-y-8 relative z-10">
                    {[
                        "Unlocks all agents natively (Up to level 5).",
                        "Premium Battlepass instantly applied for current season.",
                        "Includes exclusive 'Champion' Player Card."
                    ].map((text, i) => (
                        <div key={i} className="flex items-start gap-5 text-white/90 group/item">
                            <div className="w-2.5 h-2.5 rounded-full bg-white mt-2 shrink-0 group-hover/item:scale-150 transition-transform shadow-sm" />
                            <p className="gzs-body text-[15px] font-bold uppercase tracking-wider leading-relaxed group-hover/item:text-white transition-colors">{text}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-14 relative z-10">
                    <button className="px-10 py-5 bg-white text-[var(--gp-primary)] text-sm font-black uppercase tracking-[0.3em] rounded-full transition-all hover:scale-[1.05] shadow-md hover:shadow-xl flex items-center gap-3 w-fit border-2 border-transparent">
                        LEARN MORE <span className="font-serif text-lg leading-none">→</span>
                    </button>
                </div>
            </div>

            {/* Included Bonuses Card */}
            <div className="bg-white/80 backdrop-blur-xl border border-[var(--gp-border)] p-12 rounded-[2.5rem] relative overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] hover:border-[var(--gp-primary)] transition-all duration-500 hover:-translate-y-2 gp-card-hover gp-animate-in group text-[var(--theme-text)]" style={{ animationDelay: '150ms' }}>

                {/* Visual decorations */}
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--gp-primary)]/5 rounded-full translate-x-1/3 translate-y-1/3 blur-[60px] group-hover:bg-[var(--gp-primary)]/10 transition-colors duration-700" />
                <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[length:15px_15px] pointer-events-none"></div>

                {/* Corner accents */}
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[var(--gp-border)] group-hover:border-[var(--gp-primary)] transition-colors"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[var(--gp-border)] group-hover:border-[var(--gp-primary)] transition-colors"></div>

                <div className="flex items-center gap-4 mb-10 border-b border-[var(--gp-border)] pb-6 relative z-10">
                    <span className="w-8 h-[2px] bg-[var(--gp-primary)]"></span>
                    <h4 className="gp-hero-title text-3xl text-[var(--theme-text)] drop-shadow-sm">
                        INCLUDED BONUSES
                    </h4>
                </div>

                <div className="space-y-8 relative z-10">
                    {[
                        "1,000 Valorant Points (VP) for store purchases.",
                        "XP Boost token (+20% for 24 hours).",
                        "Limited Edition Weapon Charm."
                    ].map((text, i) => (
                        <div key={i} className="flex items-start gap-5 text-[var(--gp-text-body)] group/item">
                            <div className="w-2.5 h-2.5 rounded-sm bg-[var(--gp-primary)] mt-2 shrink-0 rotate-45 group-hover/item:rotate-90 group-hover/item:scale-125 transition-all duration-300 shadow-sm" />
                            <p className="gzs-body text-[15px] font-bold uppercase tracking-wider leading-relaxed group-hover/item:text-[var(--theme-text)] transition-colors">{text}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-14 relative z-10 flex items-center justify-between border-t border-[var(--gp-border)] pt-8">
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-[var(--gp-primary)]">MEMBER EXCLUSIVE</span>
                    <div className="w-2 h-2 bg-[var(--gp-primary)] rounded-full animate-ping"></div>
                </div>
            </div>
        </section>
    );
}
