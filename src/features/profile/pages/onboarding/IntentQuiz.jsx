import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCode, FiShield, FiVideo, FiArrowRight, FiZap } from 'react-icons/fi';
import { motion } from 'framer-motion';

const INTENT_OPTIONS = [
  {
    id: 'builder',
    icon: FiCode,
    title: 'Builder & Creator',
    subtitle: 'Dev · Art · Audio · Writing',
    desc: 'You build the worlds, characters, sounds, and stories that define games.',
    color: 'var(--theme-primary)',
  },
  {
    id: 'competitor',
    icon: FiShield,
    title: 'Competitor & Player',
    subtitle: 'Esports · Performance',
    desc: 'You play at the highest level. Pro players, coaches, analysts, and casters.',
    color: 'var(--status-error)',
  },
  {
    id: 'creator',
    icon: FiVideo,
    title: 'Content & Business',
    subtitle: 'Media · Strategy · Ops',
    desc: 'You grow communities, build brands, and run the business side of gaming.',
    color: 'var(--status-warning)',
  },
];

export default function IntentQuiz() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-[var(--theme-bg)] flex flex-col items-center justify-center px-6 py-16 font-body theme-profile">
      <div className="w-full max-w-2xl space-y-8">

        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--theme-primary)]/10 border border-[var(--theme-primary)]/20 rounded-full text-xs font-black uppercase tracking-widest text-[var(--theme-primary)]">
            <FiZap size={12} /> Step 1 of 2
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-[var(--theme-text)]">
            Who are you in gaming?
          </h1>
          <p className="text-[var(--theme-text-muted)]">Pick the category that fits you best.</p>
        </div>

        <div className="space-y-4">
          {INTENT_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const isActive = selected === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelected(opt.id)}
                className={`w-full flex items-center gap-6 p-6 rounded-2xl border-2 text-left transition-all ${
                  isActive
                    ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/5 scale-[1.01]'
                    : 'border-[var(--theme-border)] bg-[var(--theme-card)] hover:border-[var(--theme-primary)]/40'
                }`}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-[var(--theme-bg-alt)]"
                  style={{ color: opt.color }}
                >
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <p className="font-black text-[var(--theme-text)] text-base">{opt.title}</p>
                  <p className="text-xs font-bold text-[var(--theme-text-muted)] uppercase tracking-wide mb-1">{opt.subtitle}</p>
                  <p className="text-sm text-[var(--theme-text-muted)]">{opt.desc}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 shrink-0 transition-all ${
                  isActive ? 'bg-[var(--theme-primary)] border-[var(--theme-primary)]' : 'border-[var(--theme-border)]'
                }`} />
              </button>
            );
          })}
        </div>

        <button
          onClick={() => selected && navigate(`/onboarding/profile-select?intent=${selected}`)}
          disabled={!selected}
          className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${
            selected
              ? 'bg-[var(--theme-primary)] text-white hover:opacity-90'
              : 'bg-[var(--theme-bg-alt)] text-[var(--theme-text-muted)] cursor-not-allowed opacity-50'
          }`}
        >
          Continue <FiArrowRight size={16} />
        </button>

      </div>
    </div>
  );
}
