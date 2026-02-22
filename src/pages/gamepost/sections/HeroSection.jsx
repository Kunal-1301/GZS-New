import { useNavigate } from "react-router-dom";
import placeholderWhite from "../../../assets/images/placeholderWhite.svg";

export default function HeroSection({ hero }) {
    const navigate = useNavigate();

    return (
        <section className="relative h-[540px] bg-black overflow-hidden">

            {/* Background */}
            <img
                src={hero.background_img || placeholderWhite}
                alt="hero"
                className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay — uses runtime CSS var set by GameThemeContext */}
            <div
                className="absolute inset-0"
                style={{ background: "var(--gp-hero-overlay)" }}
            />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 text-white font-jetmono">
                <h1 className="text-[clamp(3rem,8vw,5.5rem)] font-black uppercase tracking-tight leading-none mb-4">
                    {hero.game_title}
                </h1>
                <p className="max-w-[32rem] text-white/80 text-[15px] leading-relaxed mb-10">
                    {hero.game_desc_short}
                </p>

                <div className="flex gap-4">
                    <button className="px-8 py-3 border border-white/60 text-[11px] font-bold uppercase
                             tracking-[0.12em] bg-transparent text-white rounded-[4px] cursor-pointer
                             transition hover:bg-white/10">
                        Watch Trailer
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="px-8 py-3 text-[11px] font-bold uppercase tracking-[0.12em]
                       rounded-[4px] cursor-pointer border-none transition
                       bg-[var(--gp-primary)] text-[var(--gp-text-on-accent)]
                       hover:bg-[var(--gp-btn-hover)]"
                    >
                        Get The Game →
                    </button>
                </div>
            </div>
        </section>
    );
}
