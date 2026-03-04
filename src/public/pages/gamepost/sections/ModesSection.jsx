export default function ModesSection({ modes }) {
    // Duplicate modes array to ensure seamless infinite looping with CSS translateX(-50%)
    const carouselItems = modes ? [...modes, ...modes, ...modes] : [];

    return (
        <section className="w-full section-padding overflow-hidden relative">

            <div className="container-global text-center mb-16 gp-animate-in">
                <span className="gp-section-label flex items-center justify-center gap-3">
                    <span className="w-6 h-[2px] bg-[var(--gp-primary)]"></span>
                    CHOOSE YOUR PATH
                    <span className="w-6 h-[2px] bg-[var(--gp-primary)]"></span>
                </span>
                <h2 className="gp-hero-title text-6xl md:text-7xl text-[var(--theme-text)]">
                    GAME MODES
                </h2>
            </div>

            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[var(--gp-bg-page)] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[var(--gp-bg-page)] to-transparent z-10 pointer-events-none" />

            <div className="flex gap-8 items-stretch animate-continuous-scroll w-max hover:pause px-4 pb-8">
                {carouselItems.map((m, i) => (
                    <div
                        key={i}
                        className="w-[300px] md:w-[350px] shrink-0 bg-white/80 backdrop-blur-md border border-[var(--gp-border)]
                       rounded-2xl p-10 text-center cursor-pointer group relative overflow-hidden transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1"
                    >
                        {/* Background glow on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--gp-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Top decorative line */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--gp-primary)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                        {/* Diamond icon with hover effect */}
                        <div
                            className="w-16 h-16 mx-auto mb-8 rotate-45 rounded-xl
                         border-2 border-[var(--gp-primary)] flex items-center justify-center transition-all duration-500 group-hover:bg-[var(--gp-primary)] group-hover:shadow-[0_0_15px_var(--gp-primary-alpha)] group-hover:rotate-[225deg]"
                        >
                            <div className="w-5 h-5 bg-[var(--gp-primary)] -rotate-45 group-hover:bg-white transition-colors duration-500" />
                        </div>

                        <h3 className="gp-hero-title text-2xl mb-4 text-[var(--theme-text)] group-hover:text-[var(--gp-primaryDark)] transition-colors relative z-10">
                            {m.mode_title}
                        </h3>
                        <p className="gzs-body text-[var(--theme-text)]/70 text-base font-bold leading-relaxed relative z-10 group-hover:text-[var(--theme-text)] transition-colors">
                            {m.mode_desc || "Engage in this exciting game mode and prove your skills on the battlefield."}
                        </p>
                    </div>
                ))}
            </div>

            {/* Adding an inverse scroll for a second row if modes are many, but sticking to one row for simplicity */}
        </section>
    );
}
