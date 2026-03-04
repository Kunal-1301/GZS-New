export default function CriticRatingSection() {
    return (
        <section className="container-global section-padding relative">

            <div className="bg-white/60 backdrop-blur-3xl border border-[var(--gp-border)] rounded-[3rem] px-12 py-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-shadow duration-500 relative overflow-hidden gp-animate-in group">

                {/* Diagonal slice effect */}
                <div className="absolute top-0 left-0 w-[150%] h-full bg-gradient-to-r from-[var(--gp-primary)]/5 to-transparent skew-x-[-35deg] translate-x-[-20%] pointer-events-none" />

                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(var(--gp-border)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-50"></div>

                {/* Left Content */}
                <div className="relative z-10 text-center lg:text-left flex-1 pl-4 border-l-4 border-[var(--gp-primary)]/30 hidden md:block group-hover:border-[var(--gp-primary)] transition-colors">
                    <h2 className="gp-hero-title text-4xl lg:text-5xl text-[var(--theme-text)] mb-4 tracking-widest">
                        CRITIC RATING
                    </h2>

                    <p className="text-sm font-black text-[var(--gp-primary)] uppercase tracking-[0.3em]">
                        Login as a certified critic to contribute to the score
                    </p>
                </div>

                {/* Mobile version without border */}
                <div className="relative z-10 text-center md:hidden w-full">
                    <h2 className="gp-hero-title text-4xl text-[var(--theme-text)] mb-4 tracking-widest">
                        CRITIC RATING
                    </h2>
                    <p className="text-[11px] font-black text-[var(--gp-primary)] uppercase tracking-[0.2em]">
                        Login as a certified critic to contribute
                    </p>
                </div>

                {/* Right Side (Form Area) */}
                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">

                    {/* Email Input */}
                    <div className="relative w-full sm:w-[350px] group/input">
                        <input
                            type="email"
                            placeholder="CRITIC EMAIL"
                            className="relative bg-white/80 border border-[var(--gp-border)] text-[var(--theme-text)] placeholder-[var(--theme-text)]/40 rounded-full px-8 py-5 text-sm font-bold uppercase tracking-widest outline-none w-full backdrop-blur-xl focus:bg-white focus:border-[var(--gp-primary)] transition-all shadow-sm focus:shadow-md"
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--gp-primary)] animate-pulse"></div>
                    </div>

                    {/* Login Button */}
                    <button className="relative bg-[var(--gp-primary)] text-white text-sm font-black uppercase tracking-[0.3em] px-12 py-5 rounded-full transition-all shadow-[0_10px_20px_var(--gp-primary-alpha)] hover:shadow-[0_15px_30px_var(--gp-primary-alpha)] w-full sm:w-auto hover:scale-105 border-2 border-transparent">
                        LOGIN <span className="ml-2 font-serif text-lg leading-none">→</span>
                    </button>

                </div>

            </div>

        </section>
    );
}
