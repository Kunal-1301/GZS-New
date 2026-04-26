export default function GameplaySection({ gameplay = [], screenshots = [] }) {
  const overviewText = gameplay[0]?.paragraph
    || gameplay[0]?.gameplay_title_desc
    || null;

  return (
    <section className="container-global section-padding">
      <div className="gp-animate-in">

        <span className="gp-section-label flex items-center gap-3">
          <span className="w-8 h-[2px] bg-[var(--gp-primary)]" />
          THE EXPERIENCE
        </span>
        <h2 className="gp-hero-title text-6xl md:text-7xl mb-10 text-[var(--theme-text)]">
          GAMEPLAY
        </h2>

        {/* Overview paragraph from data */}
        {overviewText && (
          <p className="gzs-body text-xl !leading-relaxed max-w-4xl mb-16 text-[var(--gp-text-body)] border-l-4 border-dashed border-[var(--gp-primary)] pl-6">
            {overviewText}
          </p>
        )}

        {/* Key mechanics grid */}
        {gameplay.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {gameplay.map((g, i) => (
              <div
                key={i}
                className="group relative gp-animate-in p-10 bg-white/80 backdrop-blur-xl border border-[var(--gp-border)] rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-[var(--gp-primary)] shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="absolute -right-4 -bottom-8 text-[120px] font-black text-[var(--gp-primary)] opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 gp-hero-title">
                  0{i + 1}
                </span>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-1 bg-[var(--gp-primary)] group-hover:w-16 transition-all duration-300" />
                    <h3 className="gp-hero-title text-3xl tracking-widest text-[var(--theme-text)] group-hover:text-[var(--gp-primaryDark)] transition-colors duration-300">
                      {g.gameplay_title}
                    </h3>
                  </div>
                  <p className="gzs-body text-[var(--theme-text)]/80 leading-relaxed font-bold text-lg group-hover:text-[var(--theme-text)] transition-colors duration-300">
                    {g.gameplay_title_desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Video embed placeholder */}
        <div className="mb-16">
          <p className="gp-section-label flex items-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-[var(--gp-primary)]" />
            WATCH GAMEPLAY
          </p>
          <div
            className="relative w-full rounded-2xl overflow-hidden flex items-center justify-center bg-black/30 border border-[var(--gp-border)]"
            style={{ aspectRatio: '16/9' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--gp-primary)]/10 to-transparent pointer-events-none" />
            <div className="flex flex-col items-center gap-4 relative z-10">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                style={{ background: 'var(--gp-primary)', boxShadow: '0 0 40px var(--gp-primary-alpha-high)' }}
              >
                <span className="text-white text-2xl ml-1">▶</span>
              </div>
              <p className="text-white/60 text-sm font-semibold uppercase tracking-widest">
                Official Gameplay Trailer
              </p>
            </div>
          </div>
        </div>

        {/* Screenshot gallery */}
        {screenshots.length > 0 && (
          <div>
            <p className="gp-section-label flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[var(--gp-primary)]" />
              SCREENSHOTS
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {screenshots.slice(0, 6).map((src, i) => (
                <div
                  key={i}
                  className="relative rounded-xl overflow-hidden aspect-video bg-black/20 group cursor-pointer"
                >
                  <img
                    src={typeof src === 'string' ? src : src.url || src.image}
                    alt={`Screenshot ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
