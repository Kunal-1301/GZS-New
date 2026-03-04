export default function QuickControlSection({ controls }) {
    return (
        <section className="container-global section-padding">

            <div className="text-center mb-16 gp-animate-in">
                <span className="gp-section-label">THE BASICS</span>
                <h2 className="gp-hero-title text-4xl">
                    QUICK CONTROL OVERVIEW
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {controls.map((c, i) => (
                    <div
                        key={i}
                        className="bg-white/60 backdrop-blur-sm border border-[var(--gp-border)] rounded-2xl p-8 flex gap-8 items-center gp-card-hover gp-animate-in"
                        style={{ animationDelay: `${i * 100}ms` }}
                    >
                        {/* Diamond Icon Container */}
                        <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center relative">
                            <div className="absolute inset-0 border-2 border-[var(--gp-primary)] opacity-20 rotate-45 rounded-sm" />
                            <div className="absolute inset-2 border border-[var(--gp-primary)] rotate-45 rounded-sm" />
                            {/* Icon Placeholder */}
                            <div className="relative z-10 w-6 h-6 bg-[var(--gp-primary)] opacity-40 rounded-full" />
                        </div>

                        <div>
                            <h3 className="gp-hero-title text-xl mb-2 tracking-wide text-[var(--gp-primary)]">
                                {c.qco_title}
                            </h3>
                            <p className="gzs-body text-[var(--gp-text-body)]/70 font-medium">
                                {c.qco_title_desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
