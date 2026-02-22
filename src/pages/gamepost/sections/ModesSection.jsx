export default function ModesSection({ modes }) {
    return (
        <section className="max-w-[1440px] mx-auto px-6 py-20">
            <h2 className="text-center text-[2.25rem] font-black uppercase tracking-[0.08em]
                     mb-16 text-[var(--gp-text-heading)]">
                Game Modes
            </h2>

            <div className="grid md:grid-cols-3 gap-6 lg:grid-cols-4">
                {modes?.map((m, i) => (
                    <div
                        key={i}
                        className="bg-[var(--gp-bg-card-alt)] border border-[var(--gp-border)]
                       rounded-2xl p-10 text-center transition-shadow cursor-pointer
                       hover:shadow-md"
                    >
                        {/* Diamond icon */}
                        <div
                            className="w-12 h-12 mx-auto mb-8 rotate-45 rounded-[4px]
                         border-2 border-[var(--gp-primary)]"
                        />
                        <h3 className="text-base font-black uppercase tracking-[0.1em] mb-3
                           text-[var(--gp-text-body)]">
                            {m.mode_title}
                        </h3>
                        <p className="text-[13px] text-[var(--gp-text-muted)] leading-relaxed">
                            {m.mode_desc || "Engage in this exciting game mode."}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
