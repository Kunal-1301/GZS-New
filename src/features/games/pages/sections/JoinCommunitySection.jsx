export default function JoinCommunitySection({ community, criticRating }) {
  if (!community) return null;

  const score = criticRating?.score ?? null;
  const label = criticRating?.label ?? null;

  return (
    <section className="container-global section-padding !pt-0 pb-32">

      {/* Critic score strip */}
      {score !== null && (
        <div
          className="rounded-2xl px-8 py-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 gp-animate-in"
          style={{
            background: 'var(--gp-primary-alpha)',
            border: '1px solid var(--gp-primary)',
          }}
        >
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-[var(--gp-text-muted)] mb-1">
              GzoneSphere Critic Score
            </p>
            <p className="text-sm font-bold text-[var(--theme-text)]">
              Aggregated from expert reviews and community feedback
            </p>
          </div>
          <div className="flex items-baseline gap-2 shrink-0">
            <span
              className="gp-hero-title leading-none"
              style={{ fontSize: '4rem', color: 'var(--gp-primary)' }}
            >
              {score}
            </span>
            <span className="text-xl font-bold text-[var(--gp-text-muted)]">/10</span>
            {label && (
              <span
                className="ml-3 text-sm font-black uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ background: 'var(--gp-primary)', color: '#fff' }}
              >
                {label}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Join CTA banner */}
      <div className="relative bg-[var(--gp-primary)] rounded-3xl px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-8 gp-animate-in overflow-hidden shadow-[0_15px_40px_var(--gp-primary-alpha)] hover:shadow-[0_20px_50px_var(--gp-primary-alpha)] hover:-translate-y-1 transition-all duration-500 group border border-white/20">

        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[40px] translate-x-1/3 -translate-y-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-1000" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none opacity-40" />

        {/* Left: title */}
        <div className="relative z-10 text-center md:text-left">
          <span className="text-white/80 text-sm font-black uppercase tracking-wide mb-2 block border-l-2 border-white pl-3 ml-1">
            STAY CONNECTED
          </span>
          <h2 className="gp-hero-title text-5xl md:text-6xl text-white tracking-widest drop-shadow-sm">
            {community.title || 'JOIN OUR COMMUNITY'}
          </h2>
          {community.subtitle && (
            <p className="text-white/70 text-sm font-black uppercase tracking-tight mt-4 max-w-2xl">
              {community.subtitle}
            </p>
          )}
          {/* GZS Community CTA */}
          <a
            href="/community"
            className="inline-flex items-center gap-2 mt-6 px-8 py-3 rounded-full bg-white text-sm font-black uppercase tracking-wide transition-all hover:scale-105 shadow-md hover:shadow-xl"
            style={{ color: 'var(--gp-primary)' }}
          >
            Join on GzoneSphere <span className="font-serif text-lg leading-none">→</span>
          </a>
        </div>

        {/* Right: social icons */}
        <div className="flex items-center gap-4 md:gap-6 relative z-10 flex-wrap justify-center">
          {(community.links || []).map((social, idx) => (
            <a
              key={social.key}
              href={social.href}
              title={social.key}
              className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl flex items-center justify-center cursor-pointer group/icon relative overflow-hidden shadow-sm hover:shadow-lg transition-all"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover/icon:opacity-10 transition-opacity"
                style={{ backgroundColor: social.color }}
              />
              <span
                className="relative z-10 text-xs font-black group-hover/icon:scale-110 transition-transform"
                style={{ color: social.color || 'var(--gp-primary)' }}
              >
                {social.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
