export default function QuickControlSection({ controls }) {
    if (!controls) return null;
    return (
        <section className="container-global section-padding relative">

            {/* Background elements */}
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[var(--gp-primary)]/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>

            <div className="text-center mb-16 gp-animate-in relative z-10">
                <span className="gp-section-label flex items-center justify-center gap-3">
                    <span className="w-8 h-[2px] bg-[var(--gp-primary)]"></span>
                    THE BASICS
                    <span className="w-8 h-[2px] bg-[var(--gp-primary)]"></span>
                </span>
                <h2 className="gp-hero-title text-6xl md:text-7xl text-[var(--theme-text)]">
                    QUICK CONTROLS
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 relative z-10">
                {controls.map((c, i) => (
                    <div
                        key={i}
                        className="bg-white/80 backdrop-blur-xl border border-[var(--gp-border)] rounded-2xl p-8 flex gap-8 items-center gp-card-hover gp-animate-in group hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-[var(--gp-primary)] transition-all duration-500 overflow-hidden relative"
                        style={{ animationDelay: `${i * 100}ms` }}
                    >
                        {/* Shimmer effect */}
                        <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[var(--gp-primary)]/10 to-transparent skew-x-[-20deg] group-hover:animate-[shimmer_1.5s_infinite]"></div>

                        {/* Diamond Icon Container */}
                        <div className="w-16 h-16 shrink-0 flex items-center justify-center relative group-hover:scale-110 transition-transform duration-300">
                            <div className="absolute inset-0 border-2 border-[var(--gp-primary)] opacity-20 rotate-45 rounded-sm group-hover:opacity-100 transition-all duration-300 shadow-sm" />
                            <div className="absolute inset-2 border border-[var(--gp-primary)] rotate-45 rounded-sm group-hover:rotate-[135deg] transition-all duration-700" />
                            {/* Icon Placeholder */}
                            <div className="relative z-10 w-6 h-6 bg-[var(--gp-primary)] opacity-40 rounded-full group-hover:opacity-100 shadow-sm transition-opacity duration-300" />
                        </div>

                        <div className="relative z-10">
                            <h3 className="gp-hero-title text-2xl mb-2 tracking-widest text-[var(--theme-text)] group-hover:text-[var(--gp-primaryDark)] transition-colors duration-300">
                                {c.qco_title}
                            </h3>
                            <p className="gzs-body text-[var(--theme-text)]/80 font-bold text-lg group-hover:text-[var(--theme-text)] transition-colors">
                                {c.qco_title_desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}






