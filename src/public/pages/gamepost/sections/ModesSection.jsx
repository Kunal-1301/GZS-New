export default function ModesSection({ modes }) {
    return (
        <section className="container-global section-padding">

            <div className="text-center mb-16 gp-animate-in">
                <span className="gp-section-label">CHOOSE YOUR PATH</span>
                <h2 className="gp-hero-title text-4xl">
                    GAME MODES
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {modes?.map((m, i) => (
                    <div
                        key={i}
                        className="bg-white border border-[var(--gp-border)]
                       rounded-2xl p-10 text-center cursor-pointer gp-card-hover gp-animate-in group"
                        style={{ animationDelay: `${i * 100}ms` }}
                    >
                        {/* Diamond icon with hover effect */}
                        <div
                            className="w-14 h-14 mx-auto mb-8 rotate-45 rounded-lg
                         border-2 border-[var(--gp-primary)] flex items-center justify-center transition-all duration-300 group-hover:bg-[var(--gp-primary)]"
                        >
                            <div className="w-4 h-4 bg-[var(--gp-primary)] -rotate-45 group-hover:bg-white transition-colors" />
                        </div>

                        <h3 className="gp-hero-title text-xl mb-4 group-hover:text-[var(--gp-primary)] transition-colors">
                            {m.mode_title}
                        </h3>
                        <p className="gzs-body text-[var(--gp-text-body)]/60 text-sm font-medium leading-relaxed">
                            {m.mode_desc || "Engage in this exciting game mode and prove your skills on the battlefield."}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
