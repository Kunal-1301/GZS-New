export default function StoreExtrasSection() {
    return (
        <section className="container-global section-padding !pt-0 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Pro Features Card */}
            <div className="bg-[var(--gp-primary)] p-12 rounded-[2.5rem] relative overflow-hidden shadow-2xl gp-card-hover gp-animate-in">
                <div className="absolute top-0 right-0 w-[50%] h-full bg-white/5 skew-x-[-20deg] translate-x-12" />

                <h4 className="gp-hero-title text-2xl text-white mb-8 relative z-10 border-b border-white/20 pb-4">
                    PRO FEATURES
                </h4>

                <div className="space-y-6 relative z-10">
                    {[
                        "Unlocks all agents natively (Up to level 5).",
                        "Premium Battlepass instantly applied for current season.",
                        "Includes exclusive 'Champion' Player Card."
                    ].map((text, i) => (
                        <div key={i} className="flex items-start gap-4 text-white/90">
                            <div className="w-2 h-2 rounded-full bg-white mt-2 shrink-0 shadow-[0_0_10px_white]" />
                            <p className="gzs-body text-sm font-bold uppercase tracking-wider">{text}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 relative z-10">
                    <button className="px-10 py-4 bg-white text-[var(--gp-primary)] text-xs font-black uppercase tracking-[0.2em] rounded-full transition-all hover:bg-white/90 hover:shadow-xl shadow-lg">
                        LEARN MORE
                    </button>
                </div>
            </div>

            {/* Included Bonuses Card */}
            <div className="bg-white/40 backdrop-blur-md border border-[var(--gp-border)] p-12 rounded-[2.5rem] relative overflow-hidden shadow-xl gp-card-hover gp-animate-in" style={{ animationDelay: '150ms' }}>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-[var(--gp-primary-alpha-low)] rounded-full translate-x-12 translate-y-12 blur-3xl" />

                <h4 className="gp-hero-title text-2xl text-[var(--gp-primary)] mb-8 relative z-10 border-b border-[var(--gp-border)] pb-4">
                    INCLUDED BONUSES
                </h4>

                <div className="space-y-6 relative z-10">
                    {[
                        "1,000 Valorant Points (VP) for store purchases.",
                        "XP Boost token (+20% for 24 hours).",
                        "Limited Edition Weapon Charm."
                    ].map((text, i) => (
                        <div key={i} className="flex items-start gap-4 text-[var(--gp-text-body)]/80">
                            <div className="w-2 h-2 rounded-full bg-[var(--gp-primary)] mt-2 shrink-0 shadow-lg" />
                            <p className="gzs-body text-sm font-bold uppercase tracking-wider">{text}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 opacity-40">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">MEMBER EXCLUSIVE</span>
                </div>
            </div>
        </section>
    );
}
