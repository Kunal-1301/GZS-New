import { useNavigate } from "react-router-dom";
import placeholderWhite from "../../../assets/images/placeholderWhite.svg";

export default function HeroSection({ hero }) {
    const navigate = useNavigate();

    return (
        <section className="relative h-[650px] bg-black overflow-hidden flex items-end pb-20">

            {/* Background Image / Character */}
            <div className="absolute inset-0 z-0">
                <img
                    src={hero.background_img || placeholderWhite}
                    alt="hero"
                    className="w-full h-full object-cover scale-105"
                />
                {/* Overlay — uses runtime CSS var set by GameThemeContext */}
                <div
                    className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent"
                    style={{ background: "var(--gp-hero-overlay)" }}
                />
            </div>

            {/* Content */}
            <div className="container-global relative z-10 w-full px-6">
                <div className="max-w-4xl gp-animate-in">
                    <span className="gp-section-label !text-white opacity-80 mb-2">NOW PLAYING</span>
                    <h1 className="gp-hero-title text-8xl md:text-9xl text-white mb-6" style={{ textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                        {hero.game_title}
                    </h1>
                    <p className="gzs-body max-w-xl mb-12 text-white/70 text-lg leading-relaxed">
                        {hero.game_desc_short}
                    </p>

                    <div className="flex flex-wrap gap-6 gp-animate-in" style={{ animationDelay: '200ms' }}>
                        <button className="gzs-btn-primary px-10 py-4 !rounded-full text-lg font-bold gp-btn-transition">
                            Get The Game
                        </button>
                        <button className="gzs-btn-outline !text-white !border-white/40 hover:!bg-white/10 px-10 py-4 !rounded-full text-lg font-bold gp-btn-transition">
                            Watch Trailer
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
