import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowUpRight, FiArrowRight, FiUsers, FiCalendar, FiAward, FiActivity, FiFilter } from 'react-icons/fi';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import { images } from '@/shared/data/images';
import { useTournaments } from '@/services/mutators/useTournaments';
import { Helmet } from 'react-helmet-async';
import { adaptTournamentRecord } from '@/shared/adapters/contentAdapters';
import TournamentCard from '@/shared/components/TournamentCard';

const DOMAIN_FILTERS   = ['All', 'Esports', 'Dev', 'Art', 'Writing', 'Music'];
const PLATFORM_FILTERS = ['All', 'PC', 'Mobile', 'Console'];
const STATUS_FILTERS   = ['Live', 'Open', 'Upcoming'];
const SORT_OPTIONS     = [
  { label: 'Most Recent',    value: 'recent' },
  { label: 'Prize High-Low', value: 'prize'  },
  { label: 'Slots Available', value: 'slots'  },
];

export default function TournamentHub() {
  const navigate = useNavigate();
  usePageTheme('tournaments-page');

  const [domain,   setDomain]   = useState('All');
  const [platform, setPlatform] = useState('All');
  const [statuses, setStatuses] = useState(new Set());
  const [sort,     setSort]     = useState('recent');

  const { data: raw = [], isLoading } = useTournaments();
  const all = useMemo(() => raw.map(adaptTournamentRecord), [raw]);

  const featured = useMemo(() =>
    all.filter(t => t.status === 'live' || t.status === 'registration_open').slice(0, 3),
    [all]);

  const filtered = useMemo(() => {
    return all
      .filter(t => {
        const matchDomain   = domain === 'All' || (t.tournament_type || '').toLowerCase() === domain.toLowerCase();
        const matchStatus   = statuses.size === 0 || statuses.has(mapStatus(t.status));
        return matchDomain && matchStatus;
      })
      .sort((a, b) => {
        if (sort === 'prize') {
          const pa = parseInt(String(a.prize || '0').replace(/[^0-9]/g, ''), 10) || 0;
          const pb = parseInt(String(b.prize || '0').replace(/[^0-9]/g, ''), 10) || 0;
          return pb - pa;
        }
        if (sort === 'slots') {
          const sa = (a.max_participants || 0) - (a.current_participants || 0);
          const sb = (b.max_participants || 0) - (b.current_participants || 0);
          return sb - sa;
        }
        return new Date(b.start_date || b.date || 0) - new Date(a.start_date || a.date || 0);
      });
  }, [all, domain, statuses, sort]);

  const toggleStatus = (s) => {
    setStatuses(prev => {
      const next = new Set(prev);
      next.has(s) ? next.delete(s) : next.add(s);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] flex flex-col">
      <Helmet>
        <title>Tournament Hub | GzoneSphere</title>
        <meta name="description" content="Compete in live esports tournaments. Win real rewards on GzoneSphere." />
      </Helmet>

      {/* TICKER */}
      <div className="w-full bg-[#052005] py-2.5 px-6 overflow-hidden border-b border-green-900/40 shrink-0">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[0, 1].map(k => (
            <span key={k} className="text-xs font-black uppercase tracking-wide text-green-400">
              🔴 <span className="text-white">LIVE</span> — Valorant Winter Showdown II — 24/32 slots · CS2 Masters LIVE NOW · Art Jam registrations close Apr 30 · Join 1,200+ competitors
            </span>
          ))}
        </div>
      </div>

      {/* BLOCK 1: HERO */}
      <section
        className="relative flex flex-col justify-center overflow-hidden"
        style={{ minHeight: '380px', background: 'linear-gradient(135deg, #052005, #1A3D1A)' }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `url(${images.tournamentHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#052005]/90 via-[#052005]/60 to-transparent" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />

        <div className="relative z-10 container-global px-6 md:px-10 py-16">
          <p className="text-xs font-black uppercase tracking-widest text-green-400 mb-4">GzoneSphere Esports Arena</p>
          <h1 className="text-5xl md:text-7xl font-black uppercase text-white tracking-tighter leading-none mb-5">
            Enter the<br />
            <span className="text-[#379730]">Arena</span>
          </h1>
          <p className="text-white/70 text-base md:text-lg font-bold mb-8 max-w-xl">
            Compete in live esports tournaments. Win real rewards.
          </p>

          {/* Stats strip */}
          <div className="flex flex-wrap gap-6 mb-10">
            {[
              { label: '12 Active' },
              { label: '₹5L+ Prize Pool' },
              { label: '1,200 Participants' },
            ].map((s, i) => (
              <span key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white text-xs font-black uppercase tracking-wider backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                {s.label}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="/tournaments/browse"
              className="flex items-center gap-2 px-8 py-4 bg-white text-green-950 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-green-50 transition-all shadow-lg"
            >
              Browse All Tournaments <FiArrowUpRight size={15} />
            </Link>
            <Link
              to={`/tournaments/${all[0]?.slug || 'valorant-winter-showdown-ii'}/brackets`}
              className="flex items-center gap-2 px-8 py-4 border-2 border-white/25 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              View Brackets
            </Link>
          </div>
        </div>
      </section>

      {/* BLOCK 2: FILTER BAR */}
      <div className="sticky top-0 z-50 bg-[#0a1a0d] border-b border-green-900/40 py-4 px-6 backdrop-blur-md shadow-lg">
        <div className="container-global flex flex-wrap items-center gap-6">
          {/* Domain */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-black uppercase tracking-widest text-green-500/60 shrink-0">Domain:</span>
            {DOMAIN_FILTERS.map(d => (
              <button
                key={d}
                onClick={() => setDomain(d)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wide transition-all ${
                  domain === d
                    ? 'bg-[#379730] text-white shadow-md shadow-green-900/50'
                    : 'bg-green-900/30 text-green-300/70 hover:bg-green-900/50 border border-green-900/40'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="w-px h-5 bg-green-900/50 hidden md:block" />

          {/* Status */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-black uppercase tracking-widest text-green-500/60 shrink-0">Status:</span>
            {STATUS_FILTERS.map(s => (
              <button
                key={s}
                onClick={() => toggleStatus(s)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wide transition-all ${
                  statuses.has(s)
                    ? s === 'Live' ? 'bg-red-600 text-white' : 'bg-[#379730] text-white'
                    : 'bg-green-900/30 text-green-300/70 hover:bg-green-900/50 border border-green-900/40'
                }`}
              >
                {s === 'Live' && statuses.has(s) && <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse mr-1" />}
                {s}
              </button>
            ))}
          </div>

          <div className="hidden md:block w-px h-5 bg-green-900/50" />

          {/* Sort */}
          <div className="flex items-center gap-2 shrink-0 ml-auto">
            <span className="text-[10px] font-black uppercase tracking-widest text-green-500/60">Sort:</span>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="bg-green-900/30 border border-green-900/40 text-green-200 text-[10px] font-black uppercase rounded-lg px-3 py-1.5 outline-none cursor-pointer tracking-wide"
            >
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* BLOCK 3: FEATURED / LIVE TOURNAMENTS */}
      {(isLoading || featured.length > 0) && (
        <section className="bg-[#021a05] border-b border-green-900/30 py-14">
          <div className="container-global px-6 md:px-10">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-xl font-black uppercase tracking-tighter text-white">Featured & Live</h2>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-[10px] font-black uppercase text-red-400 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Live
              </span>
            </div>

            <div className="flex flex-col gap-5">
              {isLoading
                ? Array(2).fill(0).map((_, i) => (
                    <div key={i} className="h-40 rounded-2xl bg-green-900/20 animate-pulse border border-green-900/30" />
                  ))
                : featured.map(t => <FeaturedCard key={t.id} t={t} navigate={navigate} />)
              }
            </div>
          </div>
        </section>
      )}

      {/* BLOCK 4: ALL TOURNAMENTS GRID */}
      <section className="flex-1 py-16">
        <div className="container-global px-6 md:px-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black uppercase tracking-tighter text-[var(--theme-text)]">
              All Tournaments
              <span className="ml-3 text-sm font-bold text-[var(--theme-text-muted)] normal-case tracking-normal">
                ({filtered.length})
              </span>
            </h2>
            <Link to="/tournaments/browse" className="text-xs font-black uppercase tracking-wider text-[var(--theme-primary)] hover:underline flex items-center gap-1">
              View All <FiArrowRight size={13} />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-[300px] rounded-2xl bg-[var(--theme-card)] animate-pulse border border-[var(--theme-border)]" />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(t => <TournamentCard key={t.id} tournament={t} />)}
            </div>
          ) : (
            <div className="py-20 text-center border border-dashed border-[var(--theme-border)] rounded-2xl">
              <p className="text-[var(--theme-text-muted)] font-black uppercase text-sm tracking-wider">No tournaments match these filters.</p>
              <button
                onClick={() => { setDomain('All'); setStatuses(new Set()); }}
                className="mt-4 text-[var(--theme-primary)] text-xs font-black uppercase tracking-widest hover:underline"
              >
                Reset Filters →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* BLOCK 5: HOST A TOURNAMENT CTA */}
      <section className="py-16 bg-[#052005] border-t border-green-900/40">
        <div className="container-global px-6 md:px-10 text-center">
          <p className="text-xs font-black uppercase tracking-widest text-green-400 mb-3">For Organizers</p>
          <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-3">
            Running a tournament? Host it on GzoneSphere.
          </h3>
          <p className="text-green-200/60 text-sm font-bold mb-6 max-w-md mx-auto">
            Contact the admin team to list your official tournament and reach thousands of competitors.
          </p>
          <a
            href="mailto:tournaments@gzonesphere.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#379730] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#2f8626] transition-colors shadow-lg shadow-green-900/50"
          >
            Contact Admin Team <FiArrowUpRight size={14} />
          </a>
        </div>
      </section>
    </div>
  );
}

function FeaturedCard({ t, navigate }) {
  const status = (t.status || '').toLowerCase();
  const isLive = status === 'live';
  const pct = t.max_participants > 0
    ? Math.min(100, Math.round(((t.current_participants || 0) / t.max_participants) * 100))
    : 0;

  return (
    <div className="group flex flex-col md:flex-row rounded-2xl overflow-hidden border border-green-900/30 bg-[#031507] hover:border-[#379730]/40 transition-all duration-300 hover:shadow-xl hover:shadow-green-900/30">
      {/* Game art */}
      <div className="relative md:w-72 h-48 md:h-auto shrink-0 bg-[#052005] overflow-hidden">
        {t.heroImage && (
          <img
            src={t.heroImage}
            alt={t.name}
            className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#031507]" />
        <div className="absolute top-4 left-4">
          {isLive ? (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wide animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-white" /> LIVE
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-[#379730]/80 text-white text-[10px] font-black uppercase tracking-wide">
              Registration Open
            </span>
          )}
        </div>
        {t.game && (
          <div className="absolute bottom-4 left-4">
            <span className="px-2.5 py-1 rounded-lg bg-black/60 text-[10px] font-black uppercase tracking-wider text-green-300 border border-green-900/40">
              {t.game}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-[#379730] transition-colors leading-tight">
              {t.name}
            </h3>
            <span className="shrink-0 px-3 py-1 rounded-lg bg-green-900/30 text-[10px] font-black uppercase text-green-300 border border-green-900/30">
              {(t.bracket_format || t.format || t.type || '').replace(/_/g, ' ')}
            </span>
          </div>

          <div className="flex flex-wrap gap-6 mb-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-green-500/60 mb-0.5">Prize Pool</p>
              <p className="text-xl font-black text-[#379730]">{t.prize}</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-green-500/60 mb-0.5">Start Date</p>
              <p className="text-sm font-bold text-green-200 flex items-center gap-1">
                <FiCalendar size={11} /> {t.date}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-green-500/60 mb-0.5">Registered</p>
              <p className="text-sm font-bold text-green-200 flex items-center gap-1">
                <FiUsers size={11} /> {t.current_participants || 0} / {t.max_participants || '—'}
              </p>
            </div>
          </div>

          {/* Progress */}
          {t.max_participants > 0 && (
            <div className="mb-4">
              <div className="h-1.5 rounded-full bg-green-900/40">
                <div className="h-full rounded-full bg-[#379730] transition-all" style={{ width: `${pct}%` }} />
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="flex gap-3">
          {status === 'registration_open' ? (
            <button
              onClick={() => navigate(`/tournaments/${t.slug}/register`)}
              className="px-6 py-3 bg-[#379730] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#2f8626] transition-colors shadow-md flex items-center gap-2"
            >
              Register → <FiArrowUpRight size={13} />
            </button>
          ) : (
            <button
              onClick={() => navigate(`/tournaments/${t.slug}`)}
              className="px-6 py-3 bg-green-900/40 text-green-200 border border-green-900/40 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-green-900/60 transition-colors flex items-center gap-2"
            >
              View → <FiArrowUpRight size={13} />
            </button>
          )}
          <button
            onClick={() => navigate(`/tournaments/${t.slug}`)}
            className="px-6 py-3 border border-green-900/40 text-green-300 rounded-xl text-xs font-black uppercase tracking-widest hover:border-[#379730]/40 transition-colors"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

function mapStatus(s) {
  const v = (s || '').toLowerCase();
  if (v === 'live') return 'Live';
  if (v === 'registration_open') return 'Open';
  if (v === 'upcoming') return 'Upcoming';
  return v;
}
