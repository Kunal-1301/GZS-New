import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiAward, FiUsers } from 'react-icons/fi';

const DOMAIN_GRADIENT = {
  esports: 'from-green-950 to-[#052005]',
  art:     'from-purple-950 to-indigo-950',
  writing: 'from-blue-950 to-sky-950',
  music:   'from-rose-950 to-pink-950',
  audio:   'from-rose-950 to-pink-950',
  dev:     'from-indigo-950 to-violet-950',
  general: 'from-gray-900 to-gray-950',
};

const STATUS_CFG = {
  live:               { label: 'LIVE', cls: 'bg-red-600 text-white', dot: true },
  registration_open:  { label: 'Open', cls: 'bg-green-600/90 text-white', dot: false },
  upcoming:           { label: 'Upcoming', cls: 'bg-gray-700/80 text-white', dot: false },
  completed:          { label: 'Completed', cls: 'bg-slate-600/70 text-white', dot: false },
  registration_closed:{ label: 'Closed', cls: 'bg-gray-600/70 text-gray-200', dot: false },
};

export default function TournamentCard({ tournament, onClick }) {
  const t = tournament;
  if (!t) return null;

  const status = (t.status || '').toLowerCase();
  const type   = (t.tournament_type || t.type || 'general').toLowerCase();
  const grad   = DOMAIN_GRADIENT[type] || DOMAIN_GRADIENT.general;
  const sCfg   = STATUS_CFG[status] || { label: status, cls: 'bg-gray-700 text-white', dot: false };
  const pct    = t.max_participants > 0
    ? Math.min(100, Math.round(((t.current_participants || 0) / t.max_participants) * 100))
    : 0;

  return (
    <Link
      to={`/tournaments/${t.slug || t.id}`}
      onClick={onClick}
      className="block group rounded-2xl overflow-hidden border border-[var(--theme-border)] bg-[var(--theme-card)] hover:border-[var(--theme-primary)]/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--theme-primary)]/5 transition-all duration-300"
    >
      {/* Banner */}
      <div className={`relative h-44 bg-gradient-to-br ${grad} flex items-end p-5`}>
        {t.banner_url && (
          <img
            src={t.banner_url}
            alt={t.name || t.title}
            className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700"
          />
        )}

        {/* Status badge */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide ${sCfg.cls}`}>
            {sCfg.dot && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
            {sCfg.label}
          </span>
        </div>

        {/* Format badge */}
        <span className="relative z-10 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-[10px] font-black uppercase tracking-wider text-white border border-white/10">
          {(t.bracket_format || t.format || type).replace(/_/g, ' ')}
        </span>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="text-sm font-black uppercase tracking-tight text-[var(--theme-text)] leading-tight mb-4 group-hover:text-[var(--theme-primary)] transition-colors line-clamp-2">
          {t.name || t.title}
        </h3>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--theme-text-muted)] mb-0.5 opacity-60">Prize Pool</p>
            <p className="text-sm font-black text-[#379730] flex items-center gap-1">
              <FiAward size={11} /> {t.prize || '—'}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--theme-text-muted)] mb-0.5 opacity-60">Start Date</p>
            <p className="text-xs font-bold text-[var(--theme-text)] flex items-center gap-1">
              <FiCalendar size={10} /> {t.date || '—'}
            </p>
          </div>
        </div>

        {/* Slots progress */}
        {t.max_participants > 0 && (
          <div>
            <div className="flex justify-between text-[10px] font-black uppercase text-[var(--theme-text-muted)] mb-1 opacity-60">
              <span className="flex items-center gap-1">
                <FiUsers size={9} /> {t.current_participants || 0} registered
              </span>
              <span>{t.max_participants} max</span>
            </div>
            <div className="h-1.5 rounded-full bg-[var(--theme-border)]">
              <div
                className="h-full rounded-full bg-[#379730] transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
