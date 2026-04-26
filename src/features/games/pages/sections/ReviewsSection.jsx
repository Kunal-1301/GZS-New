import { useState } from 'react';

const SORT_OPTIONS = ['Most Recent', 'Highest Rated', 'Lowest Rated'];

export default function ReviewsSection({ expert, user }) {
  const [sortOrder, setSortOrder] = useState('Most Recent');

  if (!expert && !user) return null;

  const sortedUser = [...(user || [])].sort((a, b) => {
    if (sortOrder === 'Highest Rated') return Number(b.rating) - Number(a.rating);
    if (sortOrder === 'Lowest Rated')  return Number(a.rating) - Number(b.rating);
    return 0;
  });

  return (
    <section className="container-global section-padding relative">

      {/* Ambient glow */}
      <div className="absolute top-0 right-[20%] w-[300px] h-[300px] bg-[var(--gp-primary)]/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="mb-20 gp-animate-in relative z-10">
        <span className="gp-section-label flex items-center gap-3">
          <span className="w-8 h-[2px] bg-[var(--gp-primary)]" />
          THE FEEDBACK
        </span>
        <h2 className="gp-hero-title text-6xl md:text-7xl mb-16 text-[var(--theme-text)]">
          REVIEWS
        </h2>

        {/* Expert Reviews */}
        <div className="flex items-center gap-4 mb-10 pl-6 border-l-4 border-[var(--gp-primary)]">
          <h3 className="gp-hero-title text-3xl tracking-widest text-[var(--theme-text)]">EXPERT CRITICS</h3>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-[var(--gp-border)] to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 items-center">
          {expert?.map((r, i) => (
            <div
              key={i}
              className={`rounded-3xl p-10 backdrop-blur-2xl transition-all duration-500 gp-animate-in relative group overflow-hidden
                ${i === 1
                  ? 'bg-[var(--gp-primary)] text-white shadow-[0_15px_40px_var(--gp-primary-alpha)] scale-105 z-10 border border-white/20'
                  : 'bg-white/80 text-[var(--theme-text)] border border-[var(--gp-border)] hover:border-[var(--gp-primary)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:scale-[1.02]'
                }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className={`text-[120px] font-serif mb-6 absolute top-[-40px] left-4 leading-none select-none gp-hero-title ${i === 1 ? 'text-white/20' : 'text-[var(--gp-primary)]/10'}`}>"</span>
              <p className={`gzs-body mt-8 mb-10 text-xl font-bold leading-relaxed italic z-10 relative ${i === 1 ? 'text-white' : 'text-[var(--theme-text)]'}`}>
                "{r.quote}"
              </p>
              <div className="flex justify-between items-end relative z-10 border-t border-current pt-6 opacity-80">
                <div>
                  <p className={`font-black uppercase tracking-widest text-base ${i === 1 ? 'text-white drop-shadow-sm' : 'text-[var(--gp-primary)] font-bold'}`}>{r.site}</p>
                  <p className={`text-xs font-bold tracking-widest mt-1 ${i === 1 ? 'text-white/80' : 'text-[var(--gp-text-muted)]'}`}>VERIFIED EXPERT</p>
                </div>
                <div className={`text-5xl gp-hero-title drop-shadow-sm ${i === 1 ? 'text-white' : 'text-[var(--theme-text)]'}`}>
                  {r.rating}
                  <span className={`text-2xl ml-1 ${i === 1 ? 'opacity-60 text-white' : 'text-[var(--gp-text-muted)]'}`}>/{r.max_rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* User Reviews header + sort */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4 pl-6 border-l-4 border-[var(--gp-primary)]">
            <h3 className="gp-hero-title text-3xl tracking-widest text-[var(--theme-text)]">COMMUNITY VOICES</h3>
            <div className="h-[1px] w-24 bg-gradient-to-r from-[var(--gp-border)] to-transparent" />
          </div>

          {/* Sort options */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--gp-text-muted)] hidden sm:block">Sort:</span>
            <div className="flex gap-1">
              {SORT_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => setSortOrder(opt)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all"
                  style={sortOrder === opt
                    ? { background: 'var(--gp-primary)', color: '#fff' }
                    : { background: 'rgba(255,255,255,0.6)', color: 'var(--gp-text-muted)', border: '1px solid var(--gp-border)' }
                  }
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sortedUser.map((r, i) => (
            <div
              key={i}
              className="rounded-3xl p-10 border border-[var(--gp-border)] bg-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] backdrop-blur-md hover:border-[var(--gp-primary)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-all duration-300 gp-animate-in relative"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <span className="text-[80px] font-serif mb-6 absolute top-[-20px] left-6 leading-none text-[var(--gp-primary)]/10 gp-hero-title select-none">"</span>
              <p className="gzs-body mt-4 mb-10 text-lg font-semibold leading-relaxed relative z-10 text-[var(--theme-text)]/90">"{r.comment}"</p>

              <div className="flex justify-between items-end border-t border-[var(--gp-border)] pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded bg-[var(--gp-primary)] flex items-center justify-center font-black text-white text-xl gp-hero-title shadow-sm">
                    {r.username?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div>
                    <p className="font-black text-sm uppercase text-[var(--theme-text)] tracking-widest mb-1">{r.username}</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, starIdx) => (
                        <div
                          key={starIdx}
                          className={`w-3 h-3 rotate-45 ${starIdx < Math.round((parseInt(r.rating) / 10) * 5) ? 'bg-[var(--gp-primary)]' : 'bg-[var(--gp-bg-page)] shadow-sm'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="gp-hero-title text-3xl text-[var(--gp-primary)]">{r.rating}</span>
                  <span className="text-sm font-bold text-[var(--gp-text-muted)]">/10</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
