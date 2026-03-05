import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import { usePageTheme } from '@context/ThemeContext';
import { images } from '@data/images';
import { mockApiService } from '@services/mockApiService';
import { Helmet } from 'react-helmet-async';


/* ── Static Data ─────────────────────────────────────────── */
const LIVE_BATTLES = [
  { id: 1, label: 'GAME 1', name: 'VALORANT', teams: 8, round: 'Round of 16' },
  { id: 2, label: 'GAME 2', name: 'CS2', teams: 4, round: 'Quarterfinals' },
  { id: 3, label: 'GAME 3', name: 'BGMI', teams: 16, round: 'Semi-Finals', featured: true, scoreA: 12, scoreB: 9 },
  { id: 4, label: 'GAME 4', name: 'APEX LEGENDS', teams: 8, round: 'Round of 16' },
  { id: 5, label: 'GAME 5', name: 'FREE FIRE', teams: 4, round: 'Quarterfinals' },
];

const FEATURES = [
  { icon: '✦', title: 'FAIR PLAY GUARANTEED', desc: 'Strict admin moderation ensures skill decides the winner. Zero tolerance for cheating.' },
  { icon: '◈', title: 'SMART BRACKETS & MATCHMAKING', desc: 'Auto-generated brackets with balanced seeding. Zero chaos, maximum competition.' },
  { icon: '◉', title: 'TOURNAMENT-GRADE EXPERIENCE', desc: 'From registration to finals, every match feels professional and seamlessly managed.' },
  { icon: '⬡', title: 'REAL REWARDS. REAL WINS.', desc: 'Cash prizes, exclusive rewards, and bragging rights delivered securely to winners.' },
];

/* ── Component ───────────────────────────────────────────── */
export default function EsportsHome() {
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  usePageTheme('esports');

  useEffect(() => {
    const load = async () => {
      const data = await mockApiService.getPublicTournaments();
      setTournaments(data);
      setLoading(false);
    };
    load();
  }, []);

  const featured = tournaments[featuredIdx] || null;

  const prevFeatured = () => setFeaturedIdx((i) => (i - 1 + tournaments.length) % tournaments.length);
  const nextFeatured = () => setFeaturedIdx((i) => (i + 1) % tournaments.length);

  return (
    <div className="theme-esports min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] font-inter">
      <Helmet>
        <title>Esports Arena | GzoneSphere Competitive Universe</title>
        <meta name="description" content="Enter the GzoneSphere Esports Arena. Compete in live tournaments, track rankings, and win real rewards in the ultimate competitive gaming ecosystem." />
        <meta property="og:title" content="GzoneSphere Esports | Compete & Win" />
        <meta property="og:description" content="Fair play, pro-grade tournaments, and real rewards. Join the GzoneSphere competitive network today." />
        <link rel="canonical" href="https://gzonesphere.com/esports" />
      </Helmet>
      <Navbar />

      {/* ── HERO ──────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(5,40,15,0.75),rgba(10,45,20,0.88)), url(${images.esportsHero})`,
          }}
          aria-hidden="true"
        />
        <div className="absolute top-0 left-0 w-full h-1 bg-[var(--theme-primary)]" aria-hidden="true" />

        <div className="relative z-10 px-6 md:px-16">
          <span className="inline-block mb-5 px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-[var(--theme-primary)]/20 text-[var(--theme-primary)] border border-[var(--theme-primary)]/30">
            GzoneSphere Esports
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none mb-6 font-heading">
            ENTER THE ARENA
          </h1>
          <p className="text-white/70 text-sm md:text-base tracking-widest uppercase mb-10 font-bold">
            COMPETE IN LIVE ESPORTS TOURNAMENTS. WIN REAL REWARDS.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/esports/tournaments" className="gzs-btn-primary no-underline">
              BROWSE TOURNAMENTS <FiArrowUpRight className="w-4 h-4" />
            </Link>
            <Link to="/login" className="gzs-btn-outline !text-white !border-white/50 hover:!bg-white/10 no-underline">
              REGISTER NOW
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED TOURNAMENT CAROUSEL ──────────────── */}
      <section className="bg-[var(--theme-bg-section)] section-padding md:py-12">
        <div className="container-global">
          {loading ? (
            <div className="h-[200px] bg-[var(--theme-card)] animate-pulse rounded-xl" />
          ) : featured ? (
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              {/* Card */}
              <div className="bg-[var(--theme-primary)] p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 min-h-[160px]">
                {/* Left: Prev arrow */}
                <button
                  onClick={prevFeatured}
                  className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 items-center justify-center transition-colors z-10"
                >
                  <HiArrowLeft className="w-4 h-4 text-white" />
                </button>

                <div className="md:pl-10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/70 block mb-1">{featured.game} · CHAMPIONSHIP</span>
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white leading-tight mb-2 font-heading">
                    {featured.name}
                  </h3>
                  <p className="text-white/70 text-xs tracking-wide">Prize Pool: {featured.prize}</p>
                  <p className="text-white/60 text-xs mt-0.5">Slots: {featured.slots || '32 Teams'}</p>
                </div>

                <div className="flex items-center gap-4 md:pr-10 shrink-0">
                  <span className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-sm bg-white/20 text-white border border-white/30">
                    {featured.type}
                  </span>
                  <Link
                    to={`/esports/tournament/${featured.id}`}
                    className="gzs-btn-outline !bg-white !text-[var(--theme-primary)] !border-none no-underline shadow-md hover:!bg-white/90 !text-xs"
                  >
                    SEE DETAILS <FiArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Right: Next arrow */}
                <button
                  onClick={nextFeatured}
                  className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 items-center justify-center transition-colors z-10"
                >
                  <HiArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 py-3 bg-[var(--theme-primary)]/10">
                {tournaments.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setFeaturedIdx(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === featuredIdx ? 'bg-[var(--theme-primary)] w-5' : 'bg-[var(--theme-border)]'}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="p-10 text-center text-[var(--theme-text-muted)] italic">No featured tournaments at the moment.</div>
          )}
        </div>
      </section>

      {/* ... keeping live battles ... */}

      {/* ── UPCOMING TOURNAMENTS ──────────────────────── */}
      <section className="section-padding md:py-20 bg-[var(--theme-bg-section)]">
        <div className="container-global">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="gzs-h2">UPCOMING TOURNAMENTS</h2>
              <p className="text-[var(--theme-text-muted)] text-sm mt-2">
                Train harder. Register faster. Slots are limited — legends are not.
              </p>
            </div>
            <Link to="/esports/tournaments" className="text-[var(--theme-primary)] text-sm font-bold hover:underline underline-offset-4 shrink-0">
              View all →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.slice(0, 3).map((t) => (
              <div key={t.id} className="card-standard group">
                <div className="h-44 overflow-hidden relative">
                  <img src={images.tournamentHero} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest ${t.type === 'OPEN' ? 'bg-[#379730] text-white' : 'bg-neutral-800 text-white'}`}>
                      {t.type}
                    </span>
                  </div>
                </div>
                <div className="p-6 bg-[var(--theme-card)]">
                  <h4 className="gzs-h3 !text-base mb-2">{t.name}</h4>
                  <div className="space-y-1 mb-2">
                    <p className="text-[var(--theme-text-muted)] text-[11px] uppercase tracking-wider">Prize Pool: <span className="text-[var(--theme-text)] font-bold">{t.prize}</span></p>
                    <p className="text-[var(--theme-text-muted)] text-[11px] uppercase tracking-wider">Date: <span className="text-[var(--theme-text)] font-bold">{t.date}</span></p>
                    <p className="text-[var(--theme-text-muted)] text-[11px] uppercase tracking-wider">Slots: <span className="text-[var(--theme-text)] font-bold">{t.slots || '32 Teams'}</span></p>
                  </div>
                  <div className="mt-4">
                    <Link to={`/esports/tournament/${t.id}`} className="gzs-btn-primary !px-5 !py-2.5 !text-[10px] w-full no-underline">
                      VIEW DETAILS <FiArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUILT FOR REAL COMPETITORS ────────────────── */}
      <section className="section-padding md:py-20 bg-[var(--theme-bg)]">
        <div className="container-global grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="gzs-h2 mb-10">BUILT FOR REAL COMPETITORS</h2>
            <div className="space-y-7">
              {FEATURES.map((f, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="mt-0.5 w-8 h-8 rounded-full bg-[var(--theme-primary)] flex-shrink-0 flex items-center justify-center text-white text-sm font-black">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="text-[var(--theme-text)] font-black text-sm uppercase tracking-wide mb-1 group-hover:text-[var(--theme-primary)] transition-colors">
                      {f.title}
                    </h4>
                    <p className="text-[var(--theme-text-muted)] text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-80 md:h-[420px] bg-[var(--theme-card)] rounded-xl border border-[var(--theme-border)] overflow-hidden relative">
            <img src={images.tournamentHero} alt="Tournament highlights" className="w-full h-full object-cover opacity-70" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[var(--theme-text-muted)] text-sm font-bold uppercase tracking-wider bg-[var(--theme-card)]/80 px-4 py-2 rounded-md">
                Tournament Highlights Video
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ─────────────────────────────────── */}
      <section className="bg-[var(--theme-primary)] section-padding md:py-20">
        <div className="container-global text-center">
          <h2 className="gzs-h2 mb-5 text-white">THE ARENA IS OPEN. ARE YOU READY?</h2>
          <p className="text-white/80 text-sm sm:text-base mb-10 max-w-xl mx-auto">
            Thousands compete. Few dominate. Step in and make your name known across the leaderboards.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/esports/tournaments" className="gzs-btn-outline !bg-white !text-neutral-900 !border-none no-underline shadow-lg">
              BROWSE TOURNAMENTS <FiArrowUpRight className="w-4 h-4" />
            </Link>
            <Link to="/login" className="gzs-btn-outline !border-white !text-white hover:!bg-white/10 no-underline">
              REGISTER FOR TOURNAMENT
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
