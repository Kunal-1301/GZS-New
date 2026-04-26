import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiArrowRight, FiArrowLeft, FiZap } from 'react-icons/fi';
import { motion } from 'framer-motion';

const PROFILE_OPTIONS = [
  {
    id: 'personal',
    title: 'Personal Profile',
    subtitle: 'Your main gaming identity',
    desc: 'Build your core reputation across all gaming activities.',
  },
  {
    id: 'specialized',
    title: 'Specialized Sub-Profile',
    subtitle: 'Focus on one domain',
    desc: 'Deep dive into Dev, Esports, Content, or another specialty.',
  },
];

export default function ProfileTypeSelection() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const intent = searchParams.get('intent') || 'builder';
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-[var(--theme-bg)] flex flex-col items-center justify-center px-6 py-16 font-body theme-profile">
      <div className="w-full max-w-2xl space-y-8">

        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--theme-primary)]/10 border border-[var(--theme-primary)]/20 rounded-full text-xs font-black uppercase tracking-widest text-[var(--theme-primary)]">
            <FiZap size={12} /> Step 2 of 2
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-[var(--theme-text)]">
            Choose your profile setup
          </h1>
          <p className="text-[var(--theme-text-muted)]">How would you like to organize your presence?</p>
        </div>

        <div className="space-y-4">
          {PROFILE_OPTIONS.map((opt) => {
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

        <div className="flex items-center gap-3 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest border-2 border-[var(--theme-border)] text-[var(--theme-text-muted)] hover:border-[var(--theme-primary)]/40 transition-all"
          >
            <FiArrowLeft size={16} /> Back
          </button>
          <button
            onClick={() => selected && navigate(`/profile?intent=${intent}&profile=${selected}`)}
            disabled={!selected}
            className={`flex-1 flex items-center justify-center gap-3 py-3 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${
              selected
                ? 'bg-[var(--theme-primary)] text-white hover:opacity-90'
                : 'bg-[var(--theme-bg-alt)] text-[var(--theme-text-muted)] cursor-not-allowed opacity-50'
            }`}
          >
            Continue <FiArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}
