export default function CriticRatingSection() {
    return (
        <section className="container-global section-padding">

            <div className="bg-[var(--gp-primary)] rounded-[2.5rem] px-12 py-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden gp-animate-in">
                <div className="absolute top-0 left-0 w-full h-full bg-white/5 skew-y-[-5deg] origin-top-left -translate-y-12" />

                {/* Left Content */}
                <div className="relative z-10 text-center lg:text-left">
                    <h2 className="gp-hero-title text-4xl text-white mb-4 tracking-widest">
                        CRITIC RATING
                    </h2>

                    <p className="text-sm font-bold text-white/70 uppercase tracking-[0.2em]">
                        Login as a certified critic to contribute to the score
                    </p>
                </div>

                {/* Right Side (Form Area) */}
                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">

                    {/* Email Input */}
                    <div className="relative w-full sm:w-[320px]">
                        <input
                            type="email"
                            placeholder="CRITIC EMAIL"
                            className="bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-full px-8 py-5 text-sm font-bold uppercase tracking-widest outline-none w-full backdrop-blur-md focus:bg-white/20 transition-all"
                        />
                    </div>

                    {/* Login Button */}
                    <button className="bg-white text-[var(--gp-primary)] text-sm font-black uppercase tracking-[0.2em] px-12 py-5 rounded-full hover:bg-white/90 transition-all shadow-xl gp-btn-transition w-full sm:w-auto">
                        LOGIN →
                    </button>

                </div>

            </div>

        </section>
    );
}
