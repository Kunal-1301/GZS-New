import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import { usePageTheme } from '@context/ThemeContext';
import { images } from '../../data/images';

/* ── Static Data ─────────────────────────────────────────── */
const GAMES = [
  { id: 1, name: 'VALORANT', tag: 'Game 1', img: images.valorant },
  { id: 2, name: 'CS2', tag: 'Game 2', img: images.pc },
  { id: 3, name: 'BGMI', tag: 'Game 3', img: images.mobile },
  { id: 4, name: 'FREE FIRE', tag: 'Game 4', img: images.mobile },
  { id: 5, name: 'APEX', tag: 'Game 5', img: images.valorant },
];

const GAME_DETAILS = {
  1: { prize: '50,000 INR', type: 'Team (5v5)', slots: '32', mode: 'Double Elim' },
  2: { prize: '30,000 INR', type: 'Team (5v5)', slots: '16', mode: 'Single Elim' },
  3: { prize: '25,000 INR', type: 'Squad (4)', slots: '64', mode: 'Battle Royale' },
  4: { prize: '20,000 INR', type: 'Squad (4)', slots: '48', mode: 'Battle Royale' },
  5: { prize: '15,000 INR', type: 'Squad (3)', slots: '32', mode: 'Single Elim' },
};

const UPCOMING = [
  { id: 1, name: 'VALORANT MLEAGUE CHAMPIONSHIP', prize: '50,000 INR', type: 'OPEN' },
  { id: 2, name: 'BGMI WINTER INVITATIONAL', prize: '25,000 INR', type: 'INVITATIONAL' },
  { id: 3, name: 'CS2 MASTERS SERIES', prize: '30,000 INR', type: 'OPEN' },
];

const FEATURES = [
  { title: 'FAIR PLAY GUARANTEED', desc: 'Strict admin moderation ensures skill decides the winner.' },
  { title: 'SMART BRACKETS & MATCHMAKING', desc: 'Auto-generated brackets. Balanced seeding. Zero chaos.' },
  { title: 'TOURNAMENT-GRADE EXPERIENCE', desc: 'From registration to finals, every match feels professional.' },
  { title: 'REAL REWARDS. REAL WINS.', desc: 'Cash prizes and bragging rights delivered securely.' },
];

/* ── Component ───────────────────────────────────────────── */
export default function EsportsHome() {
  const [activeGame, setActiveGame] = useState(1);
  const detail = GAME_DETAILS[activeGame];
  usePageTheme('esports');

  return (
    <div className="theme-esports min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] font-inter">

      {/* ── Navbar ────────────────────────────────────────── */}
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center overflow-hidden">
        {/* bg gradient overlay on dark */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              `linear-gradient(rgba(5,40,15,0.8),rgba(10,45,20,0.9)), url(${images.esportsHero})`,
          }}
          aria-hidden="true"
        />
        {/* Teal top accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[var(--theme-primary)]" aria-hidden="true" />

        <div className="relative z-10 px-6 md:px-16">
          <span className="inline-block mb-4 px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-[var(--theme-primary)]/20 text-[var(--theme-primary)] border border-[var(--theme-primary)]/30">
            GzoneSphere Esports
          </span>
          <h1 className="gzs-h1 !text-5xl sm:!text-6xl md:!text-7xl lg:!text-8xl mb-6 text-white">
            ENTER THE ARENA
          </h1>
          <p className="gzs-label mb-10 text-white/70">
            COMPETE IN LIVE ESPORTS TOURNAMENTS. WIN REAL REWARDS.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/esports/tournaments"
              className="gzs-btn-primary no-underline"
            >
              BROWSE TOURNAMENTS <FiArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="gzs-btn-outline !text-white !border-white/50 hover:!bg-white/10 no-underline"
            >
              REGISTER NOW
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED TOURNAMENT TABS ────────────────────────── */}
      <section className="section-padding md:py-20 bg-[var(--theme-bg-section)]">
        <div className="container-global">
          {/* Section title */}
          <div className="mb-10 text-center">
            <h2 className="gzs-h2 mb-3">
              YOUR GAME. YOUR TOURNAMENT.
            </h2>
            <p className="gzs-body-sm">
              Select your game — claim your slot in the next battleground.
            </p>
          </div>

          {/* Game Tabs */}
          <div className="flex justify-center gap-2 sm:gap-3 flex-wrap mb-10">
            {GAMES.map((g) => (
              <button
                key={g.id}
                onClick={() => setActiveGame(g.id)}
                className={`es-tab-btn ${activeGame === g.id ? 'es-tab-btn-active' : 'es-tab-btn-inactive'}`}
              >
                {g.name}
              </button>
            ))}
          </div>

          {/* Active Game Card */}
          <div className="grid md:grid-cols-2 gap-8 items-center bg-[var(--theme-card)] rounded-xl border border-[var(--theme-border)] overflow-hidden">
            {/* Left: image placeholder */}
            <div className="h-56 md:h-full min-h-[280px] overflow-hidden">
              <img
                src={GAMES.find(g => g.id === activeGame)?.img || images.placeholderWhite}
                alt="game thumbnail"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right: details */}
            <div className="p-8 md:p-10">
              <span className="text-xs font-bold tracking-widest uppercase text-[var(--theme-accent)] mb-2 block">
                Active Tournament
              </span>
              <h3 className="gzs-h3 mb-6">
                {GAMES.find(g => g.id === activeGame)?.name} · CHAMPIONSHIP
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Prize Pool', value: detail.prize },
                  { label: 'Format', value: detail.type },
                  { label: 'Total Slots', value: detail.slots },
                  { label: 'Bracket Mode', value: detail.mode },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[var(--theme-bg-section)] rounded-md p-3 border border-[var(--theme-border)]">
                    <p className="text-[var(--theme-text-muted)] text-xs uppercase tracking-wider mb-1">{label}</p>
                    <p className="text-[var(--theme-text)] text-sm font-bold">{value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to="/esports/tournament/1/register" className="gzs-btn-primary no-underline">
                  REGISTER <FiArrowUpRight className="w-4 h-4" />
                </Link>
                <Link to="/esports/tournament/1" className="gzs-btn-outline no-underline shadow-sm">
                  VIEW DETAILS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── UPCOMING TOURNAMENTS ─────────────────────────────── */}
      <section className="section-padding md:py-20 bg-[var(--theme-bg)]">
        <div className="container-global">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="gzs-h2">
                UPCOMING TOURNAMENTS
              </h2>
              <p className="text-[var(--theme-text-muted)] text-sm mt-2">
                Train harder. Register faster. Slots are limited — legends are not.
              </p>
            </div>
            <Link to="/esports/tournaments" className="text-[var(--theme-accent)] text-sm font-medium hover:underline underline-offset-4 shrink-0">
              View all →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {UPCOMING.map((t) => (
              <div
                key={t.id}
                className="card-standard group"
              >
                {/* Thumbnail */}
                <div className="h-44 overflow-hidden relative">
                  <img src={images.tournamentHero} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest ${t.type === 'OPEN' ? 'bg-[#379730] text-white' : 'bg-neutral-800 text-white'}`}>
                      {t.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 bg-[var(--theme-card)]">
                  <h4 className="gzs-h3 !text-base mb-2">
                    {t.name}
                  </h4>
                  <div className="space-y-1 mb-6">
                    <p className="text-[var(--theme-text-muted)] text-[11px] uppercase tracking-wider">Prize Pool: <span className="text-[var(--theme-text)] font-bold">{t.prize}</span></p>
                    <p className="text-[var(--theme-text-muted)] text-[11px] uppercase tracking-wider italic">Slots filling fast</p>
                  </div>

                  <Link to={`/esports/tournament/${t.id}`} className="gzs-btn-primary !px-5 !py-2.5 !text-[10px] w-full no-underline">
                    VIEW DETAILS <FiArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section className="section-padding md:py-20 bg-[var(--theme-bg-section)]">
        <div className="container-global grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <h2 className="gzs-h2 mb-10">
              BUILT FOR REAL COMPETITORS
            </h2>
            <div className="space-y-6">
              {FEATURES.map((f, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 w-5 h-5 rounded-full bg-[var(--theme-primary)] flex-shrink-0" />
                  <div>
                    <h4 className="text-[var(--theme-text)] font-black text-sm uppercase tracking-wide mb-1">{f.title}</h4>
                    <p className="text-[var(--theme-text-muted)] text-sm">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right: video / image placeholder */}
          <div className="h-80 md:h-[420px] bg-[var(--theme-card)] rounded-xl border border-[var(--theme-border)] flex items-center justify-center text-[var(--theme-text-muted)] text-sm">
            Tournament Highlights Video
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ─────────────────────────────────────────── */}
      <section className="bg-[var(--theme-primary)] section-padding md:py-20">
        <div className="container-global text-center">
          <h2 className="gzs-h2 mb-5 text-white">
            THE ARENA IS OPEN. ARE YOU READY?
          </h2>
          <p className="text-white/80 text-sm sm:text-base mb-10 max-w-xl mx-auto">
            Thousands compete. Few dominate. Step in and make your name known.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/esports/tournaments"
              className="gzs-btn-outline !bg-white !text-neutral-900 !border-none no-underline shadow-lg"
            >
              BROWSE TOURNAMENTS <FiArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="gzs-btn-outline !border-white !text-white hover:!bg-white/10 no-underline"
            >
              REGISTER FOR TOURNAMENT
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
