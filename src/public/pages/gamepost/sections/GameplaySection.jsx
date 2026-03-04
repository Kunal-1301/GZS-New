export default function GameplaySection({ gameplay }) {
    return (
        <section className="container-global section-padding">

            <div className="gp-animate-in">
                <span className="gp-section-label flex items-center gap-3">
                    <span className="w-8 h-[2px] bg-[var(--gp-primary)]"></span>
                    THE EXPERIENCE
                </span>
                <h2 className="gp-hero-title text-6xl md:text-7xl mb-10 text-[var(--theme-text)]">
                    GAMEPLAY
                </h2>

                <p className="gzs-body text-xl !leading-relaxed max-w-4xl mb-16 text-[var(--gp-text-body)] border-l-4 border-dashed border-[var(--gp-primary)] pl-6">
                    VALORANT is a tactical 5v5 first-person shooter that emphasizes precision,
                    strategy, and teamwork. Every match is divided into rounds where players
                    take on the role of attackers or defenders, with success depending on
                    coordination, positioning, and smart decision-making rather than raw
                    firepower alone.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {gameplay.map((g, i) => (
                        <div key={i} className="group relative gp-animate-in p-10 bg-white/80 backdrop-blur-xl border border-[var(--gp-border)] rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-[var(--gp-primary)] shadow-[0_10px_30px_rgba(0,0,0,0.03)]" style={{ animationDelay: `${i * 100}ms` }}>

                            {/* Decorative background number */}
                            <span className="absolute -right-4 -bottom-8 text-[120px] font-black text-[var(--gp-primary)] opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 gp-hero-title">
                                0{i + 1}
                            </span>

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-1 bg-[var(--gp-primary)] group-hover:w-16 transition-all duration-300" />
                                    <h3 className="gp-hero-title text-3xl tracking-widest text-[var(--theme-text)] group-hover:text-[var(--gp-primaryDark)] transition-colors duration-300">{g.gameplay_title}</h3>
                                </div>
                                <p className="gzs-body text-[var(--theme-text)]/80 leading-relaxed font-bold text-lg group-hover:text-[var(--theme-text)] transition-colors duration-300">
                                    {g.gameplay_title_desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
