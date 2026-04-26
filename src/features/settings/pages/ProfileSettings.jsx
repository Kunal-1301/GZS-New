import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiEyeOff, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import { usePageTheme } from '@/app/providers/ThemeProvider';

const SUB_PROFILES = [
    { id: 'dev', label: 'Game Dev' },
    { id: 'art', label: 'Game Art' },
    { id: 'audio', label: 'Audio' },
    { id: 'writing', label: 'Writing' },
    { id: 'esports', label: 'Esports' },
    { id: 'content', label: 'Content' },
    { id: 'business', label: 'Business' },
];

const AVAILABILITY_OPTIONS = ['Active', 'Open to Work', 'Not Available'];
const ENGAGEMENT_TYPES = ['Full-time', 'Contract', 'Freelance', 'Project-based'];

export default function ProfileSettings() {
    usePageTheme('profile');
    const navigate = useNavigate();
    const [blindMode, setBlindMode] = useState(false);
    const [ndaReady, setNdaReady] = useState(false);
    const [availability, setAvailability] = useState('Active');
    const [engagement, setEngagement] = useState('Contract');
    const [visibleProfiles, setVisibleProfiles] = useState({ dev: true, art: true, audio: false, writing: false, esports: false, content: false, business: false });

    const toggleProfile = (id) => setVisibleProfiles(prev => ({ ...prev, [id]: !prev[id] }));

    return (
        <div className="min-h-screen bg-[var(--theme-bg)] font-body pb-24 lg:pb-8">

            <div className="bg-[var(--theme-card)] border-b border-[var(--theme-border)] px-6 py-8">
                <div className="max-w-2xl mx-auto flex items-center gap-3">
                    <button onClick={() => navigate('/settings')} className="flex items-center gap-1.5 text-xs font-black text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] transition-colors uppercase tracking-tight italic">
                        <FiChevronLeft size={14} strokeWidth={3} /> SETTINGS
                    </button>
                    <span className="text-[var(--theme-border)]">/</span>
                    <span className="text-xs font-black uppercase tracking-tight text-[var(--theme-text)] italic">CORE IDENTITY</span>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 md:px-8 py-12 space-y-8">

                {/* Blind Mode */}
                <ToggleCard
                    title="Blind Mode"
                    desc="Hides your name, photo, and demographic information on company challenge applications. Companies see only your verified skill scores."
                    icon={FiEyeOff}
                    value={blindMode}
                    onChange={setBlindMode}
                />

                {/* NDA Ready */}
                <ToggleCard
                    title="NDA-Ready"
                    desc="Specifies to companies that you are willing to sign NDAs before seeing confidential project briefs."
                    value={ndaReady}
                    onChange={setNdaReady}
                />

                {/* Availability */}
                <div className="bg-[var(--theme-card)] rounded-3xl border border-[var(--theme-border)] p-8 shadow-sm">
                    <p className="text-xs font-black uppercase tracking-tight text-[var(--theme-text-muted)] mb-6 italic">Availability Protocol</p>
                    <div className="flex flex-wrap gap-3">
                        {AVAILABILITY_OPTIONS.map(opt => (
                            <button
                                key={opt}
                                onClick={() => setAvailability(opt)}
                                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all italic border ${
                                    availability === opt 
                                        ? 'bg-[var(--theme-primary)] text-white border-[var(--theme-primary)] shadow-lg shadow-[var(--theme-primary)]/20' 
                                        : 'bg-[var(--theme-bg-alt)] text-[var(--theme-text-muted)] border-[var(--theme-border)] hover:bg-[var(--theme-card)]'
                                }`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Engagement type */}
                <div className="bg-[var(--theme-card)] rounded-3xl border border-[var(--theme-border)] p-8 shadow-sm">
                    <p className="text-xs font-black uppercase tracking-tight text-[var(--theme-text-muted)] mb-6 italic">Engagement Configuration</p>
                    <div className="flex flex-wrap gap-3">
                        {ENGAGEMENT_TYPES.map(opt => (
                            <button
                                key={opt}
                                onClick={() => setEngagement(opt)}
                                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all italic border ${
                                    engagement === opt 
                                        ? 'bg-[var(--theme-primary)] text-white border-[var(--theme-primary)] shadow-lg shadow-[var(--theme-primary)]/20' 
                                        : 'bg-[var(--theme-bg-alt)] text-[var(--theme-text-muted)] border-[var(--theme-border)] hover:bg-[var(--theme-card)]'
                                }`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sub-profile visibility */}
                <div className="bg-[var(--theme-card)] rounded-3xl border border-[var(--theme-border)] p-8 shadow-sm">
                    <p className="text-xs font-black uppercase tracking-tight text-[var(--theme-text)] mb-1 italic">Fragment Visibility</p>
                    <p className="text-xs font-medium text-[var(--theme-text-muted)] mb-8 italic">Control which fragments appear in the global directory.</p>
                    <div className="space-y-2">
                        {SUB_PROFILES.map(p => (
                            <div key={p.id} className="flex items-center justify-between py-4 border-b border-[var(--theme-border)] last:border-0">
                                <span className="text-sm font-bold text-[var(--theme-text)] uppercase tracking-tight italic">{p.label}</span>
                                <button onClick={() => toggleProfile(p.id)} className="text-[var(--theme-primary)]">
                                    {visibleProfiles[p.id] ? <FiToggleRight size={32} /> : <FiToggleLeft size={32} className="text-[var(--theme-text-muted)] opacity-30" />}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={() => navigate('/onboarding/profile-select')}
                    className="w-full py-5 rounded-3xl text-xs font-black uppercase tracking-tight text-[var(--theme-primary)] border-2 border-dashed border-[var(--theme-primary)]/20 hover:border-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/5 transition-all italic"
                >
                    + INITIALIZE NEW FRAGMENT
                </button>
            </div>
        </div>
    );
}

function ToggleCard({ title, desc, icon: Icon, value, onChange }) {
    return (
        <div className={`bg-[var(--theme-card)] rounded-3xl border-2 p-8 transition-all shadow-sm ${value ? 'border-[var(--theme-primary)]/40 bg-[var(--theme-primary)]/5' : 'border-[var(--theme-border)]'}`}>
            <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        {Icon && <Icon size={16} className="text-[var(--theme-primary)]" />}
                        <p className="text-xs font-black uppercase tracking-tight text-[var(--theme-text)] italic">{title}</p>
                    </div>
                    <p className="text-xs text-[var(--theme-text-muted)] leading-relaxed font-medium italic opacity-80">{desc}</p>
                </div>
                <button onClick={() => onChange(!value)} className="shrink-0 text-[var(--theme-primary)] mt-1">
                    {value ? <FiToggleRight size={36} /> : <FiToggleLeft size={36} className="text-[var(--theme-text-muted)] opacity-30" />}
                </button>
            </div>
        </div>
    );
}








