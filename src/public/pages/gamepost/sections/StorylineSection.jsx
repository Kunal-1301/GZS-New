function Meta({ label, value }) {
    return (
        <div className="flex justify-between items-center gap-4">
            <span className="text-[11px] font-bold text-[var(--gp-text-muted)] tracking-wider">{label}</span>
            <span className="text-[13px] font-black text-[var(--gp-text-body)] text-right uppercase">{value}</span>
        </div>
    );
}

export default function StorylineSection({ storyline, info }) {
    return (
        <section className="container-global section-padding grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-20">

            {/* Storyline */}
            <div className="gp-animate-in">
                <span className="gp-section-label">THE WORLD</span>
                <h2 className="gp-hero-title text-5xl mb-8">
                    STORYLINE
                </h2>
                <div className="space-y-6">
                    {storyline.paragraphs.split('\n').map((p, i) => (
                        <p key={i} className="gzs-body text-lg leading-relaxed text-[var(--gp-text-body)]/80">
                            {p}
                        </p>
                    ))}
                </div>
            </div>

            {/* Metadata card */}
            <div className="gp-meta-card gp-card-hover gp-animate-right">
                <div className="pb-4 mb-8 border-b border-[var(--gp-border)]">
                    <p className="text-[12px] uppercase tracking-[0.2em] font-bold text-[var(--gp-primary)]">Game Details</p>
                </div>
                <div className="space-y-6">
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
