function Meta({ label, value }) {
    return (
        <div className="mb-5">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--gp-text-muted)] mb-1">{label}</p>
            <p className="font-semibold text-[var(--gp-text-body)] text-[15px]">{value}</p>
        </div>
    );
}

export default function StorylineSection({ storyline, info }) {
    return (
        <section className="max-w-[1200px] mx-auto px-6 py-20 grid grid-cols-2 gap-16">

            {/* Storyline */}
            <div>
                <h2 className="text-[2rem] font-black uppercase tracking-wide mb-6
                       text-[var(--gp-text-heading)]">
                    Storyline
                </h2>
                <p className="text-[15px] leading-[1.8] text-[var(--gp-text-body)]">
                    {storyline.paragraphs}
                </p>
            </div>

            {/* Metadata card */}
            <div className="bg-[var(--gp-bg-card)] border border-[var(--gp-border)] rounded-xl p-8">
                <div className="pl-4 mb-6" style={{ borderLeft: "var(--gp-accent-bar)" }}>
                    <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--gp-text-muted)]">Game Info</p>
                </div>
                <Meta label="Developer" value={info.developer} />
                <Meta label="Publisher" value={info.publisher} />
                <Meta label="Release Date" value={info.release_date} />
                <Meta label="Genres" value={info.genres} />
                <Meta label="Platforms" value={info.platforms} />
            </div>
        </section>
    );
}
