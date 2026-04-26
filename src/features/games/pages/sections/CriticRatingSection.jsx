export default function CriticRatingSection({ criticRating }) {
    if (!criticRating) return null;

    return (
        <section className="container-global section-padding relative">

            <div className="bg-white/60 backdrop-blur-3xl border border-[var(--gp-border)] rounded-3xl px-12 py-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-shadow duration-500 relative overflow-hidden gp-animate-in group">

                {/* Diagonal slice effect */}
                <div className="absolute top-0 left-0 w-[150%] h-full bg-gradient-to-r from-[var(--gp-primary)]/5 to-transparent skew-x-[-35deg] translate-x-[-20%] pointer-events-none" />

                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(var(--gp-border)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-50"></div>

                {/* Left Content */}
                <div className="relative z-10 text-center lg:text-left flex-1 pl-4 border-l-4 border-[var(--gp-primary)]/30 hidden md:block group-hover:border-[var(--gp-primary)] transition-colors">
                    <h2 className="gp-hero-title text-4xl lg:text-5xl text-[var(--theme-text)] mb-4 tracking-widest">
                        CRITIC RATING
                    </h2>

                    <p className="text-sm font-black text-[var(--gp-primary)] uppercase tracking-wide">
                        Login as a certified critic to contribute to the score
                    </p>
                </div>

                {/* Mobile version without border */}
                <div className="relative z-10 text-center md:hidden w-full">
                    <h2 className="gp-hero-title text-4xl text-[var(--theme-text)] mb-4 tracking-widest">
                        CRITIC RATING
                    </h2>
                    <p className="text-xs font-black text-[var(--gp-primary)] uppercase tracking-tight">
                        Login as a certified critic to contribute
                    </p>
                </div>

                {/* GZS Score Display */}
                <div className="relative z-10 flex flex-col items-center gap-6">
                    <div className="text-center">
                        <p className="text-xs font-black uppercase tracking-wider text-[var(--gp-primary)] mb-3 opacity-70">GZS Score</p>
                        <div className="flex items-end gap-3 justify-center">
                            <span className="text-7xl font-black text-[var(--theme-text)] leading-none">{criticRating.score}</span>
                            <span className="text-2xl text-[var(--theme-text-muted)] mb-2">/10</span>
                        </div>
                        <p className="text-sm font-bold text-[var(--gp-primary)] mt-2 uppercase tracking-wider">{criticRating.label}</p>
                        <div className="flex gap-1 justify-center mt-3">
                            {[1, 2, 3, 4, 5].map(i => (
                                <span key={i} className="text-xl" style={{ color: i <= 4 ? 'var(--gp-primary)' : '#e5e7eb' }}>★</span>
                            ))}
                        </div>
                    </div>
                    <a href={criticRating.signupHref || '/signup'} className="px-6 py-3 bg-[var(--gp-primary)] text-white text-xs font-bold rounded-xl hover:bg-[var(--gp-primaryDark)] transition-all uppercase tracking-wider">
                        Sign Up to Write a Critics Review
                    </a>
                </div>

            </div>

        </section>
    );
}








