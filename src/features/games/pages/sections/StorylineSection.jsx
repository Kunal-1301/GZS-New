function Meta({ label, value }) {
    return (
        <div className="flex justify-between items-center gap-4 group border-b border-[var(--gp-border)] pb-2 last:border-0 last:pb-0">
            <span className="text-xs font-bold text-[var(--gp-text-muted)] tracking-widest uppercase">{label}</span>
            <span className="text-sm font-black text-[var(--theme-text)] text-right uppercase group-hover:text-[var(--gp-primaryDark)] transition-colors">{value}</span>
        </div>
    );
}

export default function StorylineSection({ storyline, info }) {
    if (!storyline || !info) return null;
    const paragraphs = storyline.paragraphs || storyline.summary || "";
    return (
        <section className="container-global section-padding grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-20">

            {/* Storyline */}
            <div className="gp-animate-in">
                <span className="gp-section-label flex items-center gap-3">
                    <span className="w-8 h-[2px] bg-[var(--gp-primary)]"></span>
                    THE WORLD
                </span>
                <h2 className="gp-hero-title text-6xl md:text-7xl mb-8 text-[var(--theme-text)]">
                    STORYLINE
                </h2>
                <div className="space-y-6 relative pl-6 border-l-2 border-[var(--gp-border)]">
                    {/* Primary colored segment indicator */}
                    <div className="absolute top-0 left-[-2px] h-1/3 w-1 bg-[var(--gp-primary)]"></div>

                    {paragraphs.split('\n').map((p, i) => (
                        <p key={i} className="gzs-body text-xl leading-relaxed text-[var(--gp-text-body)]">
                            {p}
                        </p>
                    ))}
                </div>
            </div>

            {/* Metadata card */}
            <div className="bg-white/80 backdrop-blur-xl border border-[var(--gp-border)] rounded-2xl p-8 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] gp-card-hover gp-animate-right relative overflow-hidden transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--gp-primary)]/5 blur-[40px] pointer-events-none rounded-full"></div>

                <div className="pb-4 mb-6 border-b-2 border-[var(--gp-border)] relative z-10">
                    <p className="text-base uppercase tracking-tight font-black text-[var(--gp-primary)]">Game Details</p>
                </div>
                <div className="space-y-5 relative z-10">
                    <Meta label="DEVELOPER" value={info.developer} />
                    <Meta label="UPDATED ON" value={"MARCH 04, 2024"} />
                    <Meta label="RELEASED BY" value={info.publisher} />
                    <Meta label="GENRES" value={info.genres} />
                    <Meta label="PLATFORMS" value={info.platforms} />
                </div>
            </div>
        </section>
    );
}








