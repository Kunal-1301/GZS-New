import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

/* ── Static Data ─────────────────────────────────────────── */
const GAMES = [
  { id: 1, name: 'VALORANT', tag: 'Game 1', img: '' },
  { id: 2, name: 'CS2', tag: 'Game 2', img: '' },
  { id: 3, name: 'BGMI', tag: 'Game 3', img: '' },
  { id: 4, name: 'FREE FIRE', tag: 'Game 4', img: '' },
  { id: 5, name: 'APEX', tag: 'Game 5', img: '' },
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

  return (
    <div className="min-h-screen bg-es-bg text-es-text font-inter">

      {/* ── Navbar ────────────────────────────────────────── */}
      <Navbar logoVariant="esports" loginVariant="esports" accent="esports" />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center overflow-hidden">
        {/* bg gradient overlay on dark */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "linear-gradient(rgba(5,40,15,0.8),rgba(10,45,20,0.9)), url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920')",
          }}
          aria-hidden="true"
        />
        {/* Teal top accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-es-primary" aria-hidden="true" />

        <div className="relative z-10 px-6 md:px-16">
          <span className="inline-block mb-4 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-es-primary/20 text-es-accent border border-es-border">
            GzoneSphere Esports
          </span>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none mb-6"
            style={{ fontFamily: 'Impact, "Arial Narrow", sans-serif' }}
          >
            ENTER THE ARENA
          </h1>
          <p className="text-es-text-muted text-sm sm:text-base md:text-lg tracking-widest uppercase mb-10">
            COMPETE IN LIVE ESPORTS TOURNAMENTS. WIN REAL REWARDS.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/esports/tournaments"
              className="inline-flex items-center gap-2 px-7 py-3 bg-es-primary hover:bg-es-primary-dark text-white text-sm font-bold uppercase tracking-wider rounded-sm transition-colors"
            >
              BROWSE TOURNAMENTS <FiArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="px-7 py-3 border border-es-border text-es-text hover:bg-es-card text-sm font-bold uppercase tracking-wider rounded-sm transition-colors"
            >
              REGISTER NOW
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED TOURNAMENT TABS ────────────────────────── */}
      <section className="section-padding md:py-20 bg-es-bg-section">
        <div className="container-global">
          {/* Section title */}
          <div className="mb-10 text-center">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-es-text mb-3"
              style={{ fontFamily: 'Impact, "Arial Narrow", sans-serif' }}
            >
              YOUR GAME. YOUR TOURNAMENT.
            </h2>
            <p className="text-es-text-muted text-sm sm:text-base">
              Select your game — claim your slot in the next battleground.
            </p>
          </div>

          {/* Game Tabs */}
          <div className="flex justify-center gap-2 sm:gap-3 flex-wrap mb-10">
            {GAMES.map((g) => (
              <button
                key={g.id}
                onClick={() => setActiveGame(g.id)}
                className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-sm border transition-all duration-200 ${activeGame === g.id
                  ? 'bg-es-primary border-es-primary text-white shadow-lg'
                  : 'bg-transparent border-es-border text-es-text-muted hover:border-es-primary hover:text-white'
                  }`}
              >
                {g.name}
              </button>
            ))}
          </div>

          {/* Active Game Card */}
          <div className="grid md:grid-cols-2 gap-8 items-center bg-es-card rounded-xl border border-es-border overflow-hidden">
            {/* Left: image placeholder */}
            <div className="h-56 md:h-full min-h-[280px] bg-es-bg-section flex items-center justify-center">
              <span className="text-es-text-muted text-xs uppercase tracking-widest">
                {GAMES.find(g => g.id === activeGame)?.name} — Thumbnail
              </span>
            </div>

            {/* Right: details */}
            <div className="p-8 md:p-10">
              <span className="text-xs font-bold tracking-widest uppercase text-es-accent mb-2 block">
                Active Tournament
              </span>
              <h3
                className="text-2xl sm:text-3xl font-black uppercase text-es-text mb-6"
                style={{ fontFamily: 'Impact, "Arial Narrow", sans-serif' }}
              >
                {GAMES.find(g => g.id === activeGame)?.name} · CHAMPIONSHIP
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Prize Pool', value: detail.prize },
                  { label: 'Format', value: detail.type },
                  { label: 'Total Slots', value: detail.slots },
                  { label: 'Bracket Mode', value: detail.mode },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-es-bg-section rounded-md p-3 border border-es-border">
                    <p className="text-es-text-muted text-xs uppercase tracking-wider mb-1">{label}</p>
                    <p className="text-es-text text-sm font-bold">{value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/esports/tournament/1/register"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-es-primary hover:bg-es-primary-dark text-white text-sm font-bold uppercase tracking-wider rounded-sm transition-colors"
                >
                  REGISTER <FiArrowUpRight className="w-4 h-4" />
                </Link>
                <Link to="/esports/tournament/1" className="px-6 py-3 border border-es-border text-es-text text-sm font-bold uppercase tracking-wider rounded-sm hover:bg-es-card-alt transition-colors">
                  VIEW DETAILS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── UPCOMING TOURNAMENTS ─────────────────────────────── */}
      <section className="section-padding md:py-20 bg-es-bg">
        <div className="container-global">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-es-text"
                style={{ fontFamily: 'Impact, "Arial Narrow", sans-serif' }}
              >
                UPCOMING TOURNAMENTS
              </h2>
              <p className="text-es-text-muted text-sm mt-2">
                Train harder. Register faster. Slots are limited — legends are not.
              </p>
            </div>
            <Link to="/esports/tournaments" className="text-es-accent text-sm font-medium hover:underline underline-offset-4 shrink-0">
              View all →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {UPCOMING.map((t) => (
              <div
                key={t.id}
                className="bg-es-card border border-es-border rounded-xl overflow-hidden hover:border-es-primary transition-colors group"
              >
                {/* Thumbnail */}
                <div className="h-44 bg-es-bg-section flex items-center justify-center">
                  <span className="text-es-text-muted text-xs uppercase tracking-widest">{t.name}</span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className={`inline-block px-2 py-0.5 text-xs font-bold uppercase tracking-widest rounded-sm mb-3 ${t.type === 'OPEN'
                    ? 'bg-es-primary/20 text-es-accent'
                    : 'bg-neutral-700/40 text-neutral-300'
                    }`}>
                    {t.type}
                  </span>
                  <h4 className="text-es-text font-black text-base uppercase mb-1 leading-tight">
                    {t.name}
                  </h4>
                  <p className="text-es-text-muted text-xs mb-1">Prize Pool: {t.prize}</p>
                  <p className="text-es-text-muted text-xs mb-5">Limited Slots Available</p>

                  <Link
                    to={`/esports/tournament/${t.id}`}
                    className="inline-flex items-center gap-1 px-5 py-2.5 bg-es-primary hover:bg-es-primary-dark text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-colors group-hover:shadow-md"
                  >
                    VIEW DETAILS <FiArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section className="section-padding md:py-20 bg-es-bg-section">
        <div className="container-global grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-es-text mb-10"
              style={{ fontFamily: 'Impact, "Arial Narrow", sans-serif' }}
            >
              BUILT FOR REAL COMPETITORS
            </h2>
            <div className="space-y-6">
              {FEATURES.map((f, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 w-5 h-5 rounded-full bg-es-primary flex-shrink-0" />
                  <div>
                    <h4 className="text-es-text font-black text-sm uppercase tracking-wide mb-1">{f.title}</h4>
                    <p className="text-es-text-muted text-sm">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right: video / image placeholder */}
          <div className="h-80 md:h-[420px] bg-es-card rounded-xl border border-es-border flex items-center justify-center text-es-text-muted text-sm">
            Tournament Highlights Video
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ─────────────────────────────────────────── */}
      <section className="bg-es-primary section-padding md:py-20">
        <div className="container-global text-center">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white mb-5"
            style={{ fontFamily: 'Impact, "Arial Narrow", sans-serif' }}
          >
            THE ARENA IS OPEN. ARE YOU READY?
          </h2>
          <p className="text-white/80 text-sm sm:text-base mb-10 max-w-xl mx-auto">
            Thousands compete. Few dominate. Step in and make your name known.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/esports/tournaments"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-es-primary hover:bg-neutral-100 text-sm font-black uppercase tracking-wider rounded-sm transition-colors"
            >
              BROWSE TOURNAMENTS <FiArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="px-8 py-3.5 border-2 border-white text-white hover:bg-white/10 text-sm font-black uppercase tracking-wider rounded-sm transition-colors"
            >
              REGISTER FOR TOURNAMENT
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <Footer variant="light" accent="esports" />
    </div>
  );
}
