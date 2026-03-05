import { useNavigate } from "react-router-dom";
import placeholderWhite from '@assets/images/placeholderWhite.svg';

export default function HeroSection({ hero }) {
    const navigate = useNavigate();

    return (
        <section className="relative h-[750px] bg-[var(--theme-bg)] overflow-hidden flex items-end pb-24">

            {/* Background Image / Character */}
            <div className="absolute inset-0 z-0">
                <img
                    src={hero.background_img || placeholderWhite}
                    alt="hero"
                    className="w-full h-full object-cover animate-hero-breathe"
                />
                {/* Overlay — uses runtime CSS var set by GameThemeContext */}
                <div
                    className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg)] via-[var(--theme-bg)]/80 to-transparent"
                />

                {/* Extra dynamic noise/flare overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_50%)] pointer-events-none mix-blend-overlay"></div>
            </div>

            {/* Content */}
            <div className="container-global relative z-10 w-full px-6">
                <div className="max-w-4xl gp-animate-in">
                    <span className="gp-section-label !text-[var(--theme-text)] opacity-90 mb-4 tracking-[0.3em] font-extrabold flex items-center gap-3">
                        <span className="w-12 h-[2px] bg-[var(--gp-primary)]"></span>
                        NOW PLAYING
                    </span>

                    <h1 className="gp-hero-title text-8xl md:text-9xl text-[var(--theme-text)] mb-6 tracking-tighter drop-shadow-sm">
                        {hero.game_title}
                    </h1>

                    <p className="gzs-body max-w-xl mb-12 text-[var(--theme-text)]/90 text-xl font-medium leading-relaxed border-l-4 border-[var(--gp-primary)] pl-6">
                        {hero.game_desc_short}
                    </p>

                    <div className="flex flex-wrap gap-6 gp-animate-in" style={{ animationDelay: '200ms' }}>
                        <button className="bg-[var(--gp-primary)] text-white px-12 py-5 !rounded-lg text-lg font-bold gp-btn-transition uppercase tracking-widest shadow-[0_10px_20px_var(--gp-primary-alpha)] hover:shadow-[0_15px_30px_var(--gp-primary-alpha)] hover:-translate-y-1 hover:scale-[1.02] border border-transparent">
                            Get The Game
                        </button>
                        <button className="bg-white/50 text-[var(--theme-text)] border border-[var(--gp-border)] hover:bg-white/90 hover:border-[var(--gp-primary)] hover:text-[var(--gp-primaryDark)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] px-12 py-5 !rounded-lg text-lg font-bold gp-btn-transition uppercase tracking-widest backdrop-blur-md">
                            Watch Trailer
                        </button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-bounce">
                <span className="text-[var(--theme-text)] text-xs tracking-[0.2em] font-bold uppercase">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--theme-text)] to-transparent"></div>
            </div>
        </section>
    );
}
