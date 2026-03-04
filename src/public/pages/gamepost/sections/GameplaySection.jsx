export default function GameplaySection({ gameplay }) {
    return (
        <section className="container-global section-padding">

            <div className="gp-animate-in">
                <span className="gp-section-label">THE EXPERIENCE</span>
                <h2 className="gp-hero-title text-5xl mb-10">
                    GAMEPLAY
                </h2>

                <p className="gzs-body text-xl !leading-relaxed max-w-4xl mb-16 text-[var(--gp-text-body)]">
                    VALORANT is a tactical 5v5 first-person shooter that emphasizes precision,
                    strategy, and teamwork. Every match is divided into rounds where players
                    take on the role of attackers or defenders, with success depending on
                    coordination, positioning, and smart decision-making rather than raw
                    firepower alone.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {gameplay.map((g, i) => (
                        <div key={i} className="gp-animate-in p-8 bg-white/40 backdrop-blur-sm border border-[var(--gp-border)] rounded-2xl gp-card-hover" style={{ animationDelay: `${i * 100}ms` }}>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-[2px] bg-[var(--gp-primary)]" />
                                <h3 className="gp-hero-title text-2xl tracking-wide">{g.gameplay_title}</h3>
                            </div>
                            <p className="gzs-body text-[var(--gp-text-body)]/70 leading-relaxed font-medium">
                                {g.gameplay_title_desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
