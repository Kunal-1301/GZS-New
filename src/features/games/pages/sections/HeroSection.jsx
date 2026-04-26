import { useNavigate } from 'react-router-dom';
import placeholderWhite from '@assets/images/placeholderWhite.svg';

export default function HeroSection({ hero, genres = [], platforms = [] }) {
  const navigate = useNavigate();
  if (!hero) return null;

  return (
    <section className="relative h-[750px] bg-[var(--theme-bg)] overflow-hidden flex items-end pb-24">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero.background_img || placeholderWhite}
          alt="hero"
          className="w-full h-full object-cover animate-hero-breathe"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg)] via-[var(--theme-bg)]/80 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_50%)] pointer-events-none mix-blend-overlay" />
      </div>

      {/* Content */}
      <div className="container-global relative z-10 w-full px-6">
        <div className="max-w-4xl gp-animate-in">

          <span className="gp-section-label !text-[var(--theme-text)] opacity-90 mb-4 tracking-wide font-extrabold flex items-center gap-3">
            <span className="w-12 h-[2px] bg-[var(--gp-primary)]" />
            NOW PLAYING
          </span>

          {/* Genre tags */}
          {genres.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {genres.map(g => (
                <span
                  key={g}
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    background: 'var(--gp-tag-bg)',
                    border: '1px solid var(--gp-tag-border)',
                    color: 'var(--gp-tag-text)',
                  }}
                >
                  {g}
                </span>
              ))}
            </div>
          )}

          <h1 className="gp-hero-title text-8xl md:text-9xl text-[var(--theme-text)] mb-4 tracking-tighter drop-shadow-sm">
            {hero.game_title}
          </h1>

          {/* Platform icons */}
          {platforms.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {platforms.map(p => (
                <span
                  key={p}
                  className="text-xs font-bold px-3 py-1.5 rounded"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          )}

          <p className="gzs-body max-w-xl mb-12 text-[var(--theme-text)]/90 text-xl font-medium leading-relaxed border-l-4 border-[var(--gp-primary)] pl-6">
            {hero.game_desc_short}
          </p>

          <div className="flex flex-wrap gap-6 gp-animate-in" style={{ animationDelay: '200ms' }}>
            <button
              className="bg-[var(--gp-primary)] text-white px-12 py-5 rounded-lg text-lg font-bold uppercase tracking-widest shadow-[0_10px_20px_var(--gp-primary-alpha)] hover:shadow-[0_15px_30px_var(--gp-primary-alpha)] hover:-translate-y-1 hover:scale-[1.02] transition-all border border-transparent"
              onClick={() => navigate('#get-game')}
            >
              Get The Game
            </button>
            <button
              className="bg-white/50 text-[var(--theme-text)] border border-[var(--gp-border)] hover:bg-white/90 hover:border-[var(--gp-primary)] px-12 py-5 rounded-lg text-lg font-bold uppercase tracking-widest transition-all backdrop-blur-md"
            >
              Watch Trailer
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-bounce">
        <span className="text-[var(--theme-text)] text-xs tracking-tight font-bold uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--theme-text)] to-transparent" />
      </div>
    </section>
  );
}
