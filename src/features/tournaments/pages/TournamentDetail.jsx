import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
    FiArrowUpRight, FiUsers, FiMapPin, FiCalendar, FiAward,
    FiInfo, FiLayers, FiShield, FiExternalLink, FiClock, FiGitBranch,
    FiCheckCircle, FiShare2, FiTrendingUp, FiZap, FiActivity, FiGlobe, FiTerminal, FiAlertCircle, FiStar
} from 'react-icons/fi';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import { images } from '@/shared/data/images';
import { useTournament } from '@/services/mutators/useTournaments';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { adaptTournamentRecord } from '@/shared/adapters/contentAdapters';

const FALLBACK_METADATA = {
    badges: ['SOLO/TEAM', 'GZONE VERIFIED', 'LIVE FEED'],
    organizer: {
        name: 'GzoneSphere Official',
        contact: 'tournaments@gzonesphere.com',
        discord: 'discord.gg/gzonesphere'
    },
    prizeDistribution: [
        { place: '1st Place', tier: 'Champion', amount: '₹10,000' },
        { place: '2nd Place', tier: 'Runner Up', amount: '₹5,000' },
        { place: '3rd Place', tier: 'Third Place', amount: '₹2,500' }
    ],
    schedule: [
        { phase: 'Registration', date: 'Closed on Dec 12', status: 'Completed' },
        { phase: 'Brackets Reveal', date: 'Dec 14, 10:00 AM', status: 'Upcoming' },
        { phase: 'Main Event', date: 'Dec 15 - Dec 18', status: 'Upcoming' },
        { phase: 'Grand Finals', date: 'Dec 20, 18:00 PM', status: 'Upcoming' },
    ],
    sponsors: [
        { name: 'CoreSphere', logo: 'https://via.placeholder.com/150x80?text=CoreSphere' },
        { name: 'Delta Logic', logo: 'https://via.placeholder.com/150x80?text=DeltaLogic' },
        { name: 'ViperX', logo: 'https://via.placeholder.com/150x80?text=ViperX' },
    ]
};

const BRACKET_DATA = {
    rounds: [
        {
            title: 'QUARTER_FINALS',
            matches: [
                { id: 'QF1', t1: 'ALPHA_SQUAD', t2: 'BETA_KNIGHTS', s1: 2, s2: 1, status: 'completed' },
                { id: 'QF2', t1: 'DELTA_FORCE', t2: 'GAMMA_RAY', s1: 0, s2: 2, status: 'completed' },
                { id: 'QF3', t1: 'EPSILON_PRO', t2: 'ZETA_GZONE', s1: 2, s2: 0, status: 'live' },
                { id: 'QF4', t1: 'THETA_ELITE', t2: 'SIGMA_PLAY', s1: null, s2: null, status: 'upcoming' },
            ],
        },
        {
            title: 'SEMI_FINALS',
            matches: [
                { id: 'SF1', t1: 'ALPHA_SQUAD', t2: 'GAMMA_RAY', s1: null, s2: null, status: 'upcoming' },
                { id: 'SF2', t1: 'EPSILON_PRO', t2: 'TBD', s1: null, s2: null, status: 'upcoming' },
            ],
        },
        {
            title: 'GRAND_FINALS',
            matches: [
                { id: 'GF1', t1: 'TBD', t2: 'TBD', s1: null, s2: null, status: 'upcoming' },
            ],
        },
    ],
};

const Countdown = ({ targetDate }) => {
    const calculate = () => {
        const now = new Date();
        const target = new Date(targetDate);
        const diff = target - now;
        if (diff <= 0) return '0d 0h 0m 0s';
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);
        return `${d}d ${h}h ${m}m ${s}s`;
    };
    const [timeLeft, setTimeLeft] = useState(() => calculate());
    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(calculate()), 1000);
        return () => clearInterval(timer);
    }, [targetDate]);
    return <span className="font-black text-[var(--theme-primary)]">{timeLeft}</span>;
};

export default function TournamentDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('OVERVIEW');
    usePageTheme('tournaments-page');

    const { data: apiTournament, isLoading } = useTournament(slug);

    const tournament = useMemo(() => {
        if (!apiTournament) return null;
        return {
            ...FALLBACK_METADATA,
            ...adaptTournamentRecord(apiTournament),
            heroImage: apiTournament.banner_url || apiTournament.heroImage || images.tournamentHero,
            highlights: apiTournament.highlights || [
                { label: "Top Competitors", desc: "Showcase your skills against the best players in the domain." },
                { label: "Fair Competition", desc: "Anti-cheat and verified seeding for a balanced experience." },
                { label: "Real Prizes", desc: "Get rewarded with cash and exclusive digital assets." }
            ],
            notes: apiTournament.notes || "Participants must be 18+ and have a verified GzoneSphere profile. Any form of spectral manipulation or external scripting will result in an immediate domain ban. Appeal process is available through the Mission Control Discord hub.",
            registeredCount: apiTournament.registered_count || 24,
            maxSlots: apiTournament.slots || 32,
            recentPlayers: [
                { name: "Operator_Alpha", avatar: "https://i.pravatar.cc/100?u=1" },
                { name: "User_Sigma", avatar: "https://i.pravatar.cc/100?u=2" },
                { name: "Delta_Nine", avatar: "https://i.pravatar.cc/100?u=3" },
                { name: "Zeta_Flux", avatar: "https://i.pravatar.cc/100?u=4" },
                { name: "Ether_01", avatar: "https://i.pravatar.cc/100?u=5" },
            ],
            extendedPrizes: [
                { placement: '1st Place', prize: apiTournament.prize || '₹10,000', reward: 'CHAMPION_BADGE + 500 XP' },
                { placement: '2nd Place', prize: '₹5,000', reward: 'ELITE_BADGE + 300 XP' },
                { placement: '3rd Place', prize: '₹2,500', reward: 'STABLE_BADGE + 150 XP' },
                { placement: 'Top 10', prize: '₹500', reward: 'DOMAIN_XP' },
                { placement: 'Participants', prize: '₹0', reward: 'DOMAIN_BADGE' },
            ],
            timeline: [
                { stage: 'Registration Opens', time: 'Jan 01, 10:00', status: 'Done' },
                { stage: 'Registration Closes', time: apiTournament.date || 'Jan 10, 18:00', status: 'Done' },
                { stage: 'Bracket Announcement', time: 'Jan 11, 12:00', status: 'Done' },
                { stage: 'Check-in Window', time: 'Feb 12, 09:00', status: 'Live' },
                { stage: 'Tournament Start', time: 'Feb 12, 14:00', status: 'Upcoming' },
                { stage: 'Finals', time: 'Feb 15, 20:00', status: 'Upcoming' },
                { stage: 'Results Announced', time: 'Feb 16, 12:00', status: 'Upcoming' },
            ],
            entryExpiry: '2026-12-30T18:00:00Z',
            winner: { name: 'Operator_Zero_One', avatar: 'https://i.pravatar.cc/150?u=winner', prize: '₹50,000' }
        };
    }, [apiTournament]);

    if (isLoading) return <DetailSkeleton />;
    if (!tournament) return <TournamentNotFound />;

    const status = tournament.status?.toLowerCase() || 'registration_open';
    const isCompleted = status === 'completed';

    return (
        <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] font-body selection:bg-[var(--theme-primary)]/30 theme-tournaments pb-32">
            <Helmet>
                <title>{`${tournament.name} | GzoneSphere Tournaments`}</title>
            </Helmet>

            {/* Cinematic Hero: Mission Objective */}
            <section className="relative min-h-[75vh] flex items-center overflow-hidden pt-32">
                <motion.div
                    initial={{ opacity: 0, scale: 1.2 }}
                    animate={{ opacity: 0.3, scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute inset-0 bg-cover bg-center grayscale"
                    style={{ backgroundImage: `url(${tournament.heroImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg)] via-[var(--theme-bg)]/80 to-transparent" />
                <div className="relative z-10 container mx-auto px-8 lg:px-12">
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-6xl space-y-12">
                        <div className="flex flex-wrap items-center gap-6">
                             <div className={`flex items-center gap-4 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider italic shadow-2xl border border-white/20 ${status === 'live' ? 'bg-red-600' : 'bg-[var(--theme-primary)]'}`}>
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]" />
                                {status.toUpperCase()}
                            </div>
                            {tournament.badges.map((b, i) => (
                                <span key={i} className="text-xs font-black uppercase tracking-wide text-[var(--theme-text-muted)] bg-[var(--theme-card)]/40 border border-[var(--theme-border)] px-6 py-2.5 rounded-full backdrop-blur-3xl italic">
                                    {b}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-[var(--theme-text)] leading-[0.8] italic">
                           {tournament.name}
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8">
                            <HeroStat icon={<FiAward />} label="ASSET_POOL" value={tournament.prize} color="text-[var(--theme-primary)]" />
                            <HeroStat icon={<FiCalendar />} label="DOMAIN_START" value={tournament.date} color="text-[var(--status-success)]" />
                            <HeroStat icon={<FiTerminal />} label="SYNC_MODE" value={tournament.type || 'PROTOCOL_ALPHA'} color="text-[var(--theme-primary)]" />
                        </div>

                        <div className="flex flex-wrap gap-4 pt-2">
                            {status === 'registration_open' && (
                                <button onClick={() => navigate(`/tournaments/${slug}/register`)} className="flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--theme-primary)] text-white text-xs font-black uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-[var(--theme-primary)]/30">
                                    Register Now <FiArrowUpRight size={14} />
                                </button>
                            )}
                            {status === 'live' && (
                                <button onClick={() => setActiveTab('BRACKET')} className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white text-xs font-black uppercase tracking-wider hover:bg-white/10 transition-all">
                                    View Bracket <FiArrowUpRight size={14} />
                                </button>
                            )}
                            {status === 'completed' && (
                                <button onClick={() => setActiveTab('RESULTS')} className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white text-xs font-black uppercase tracking-wider hover:bg-white/10 transition-all">
                                    View Results <FiArrowUpRight size={14} />
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* BLOCK 7: Post-completion Winner Highlight */}
            {isCompleted && (
                <section className="container mx-auto px-8 lg:px-12 -mt-32 relative z-[20] mb-20">
                    <div className="bg-gradient-to-r from-amber-400 to-amber-600 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl shadow-amber-500/20">
                         <div className="flex items-center gap-10">
                            <div className="w-32 h-32 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center text-7xl text-white shadow-2xl relative overflow-hidden">
                                <FiAward className="relative z-10" />
                                <div className="absolute inset-0 bg-white/10 animate-pulse" />
                            </div>
                            <div className="space-y-3">
                                <p className="text-xs font-black uppercase tracking-widest text-white/60 italic leading-none">DOMAIN_WINNER_VALIDATED</p>
                                <h2 className="text-5xl font-black uppercase tracking-tighter text-white italic leading-none">{tournament.winner.name}</h2>
                            </div>
                         </div>
                         <div className="text-center md:text-right space-y-2">
                             <p className="text-xs font-black uppercase tracking-wider text-white/60 italic">TOTAL_BOUNTY_CLAIMED</p>
                             <p className="text-6xl font-black text-white italic tracking-tighter leading-none">{tournament.winner.prize}</p>
                         </div>
                    </div>
                </section>
            )}

            {/* BLOCK 1: About the Tournament */}
            <section className="container mx-auto px-8 lg:px-12 page-section">
                <div className="bg-[var(--theme-card)] border-2 border-[var(--theme-border)] rounded-[4rem] p-12 overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--theme-primary)]/5 blur-[80px] rounded-full" />
                    <div className="relative z-10 flex flex-col lg:flex-row gap-20">
                        <div className="flex-1 space-y-10">
                            <h3 className="text-2xl font-black uppercase tracking-tighter italic flex items-center gap-4">
                                <FiInfo className="text-[var(--theme-primary)]" /> ABOUT_THE_ENGAGEMENT
                            </h3>
                            <div className="divide-y divide-[var(--theme-border)]/50">
                                <AboutRow label="Tournament Name" value={tournament.name} />
                                <AboutRow label="Category" value={tournament.type || 'Official Match'} />
                                <AboutRow label="Entry Deadline" value={<Countdown targetDate={tournament.entryExpiry} />} />
                                <AboutRow label="Tournament Format" value="Single Elimination" />
                                <AboutRow label="Domain Registry" value={tournament.game || 'Global Nexus'} />
                            </div>
                        </div>
                        <div className="lg:w-1/3 bg-[var(--theme-bg-alt)] border-2 border-[var(--theme-border)] rounded-3xl p-10 flex flex-col items-center justify-center text-center space-y-6">
                            <div className="w-20 h-20 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] rounded-full flex items-center justify-center text-3xl">
                                <FiClock />
                            </div>
                            <h4 className="text-lg font-black uppercase tracking-widest italic leading-none">MISSION_EXPIRY</h4>
                            <div className="text-4xl font-black italic tracking-tighter">
                                <Countdown targetDate={tournament.entryExpiry} />
                            </div>
                            <p className="text-xs font-black uppercase opacity-40 italic tracking-wide">REMAINING_WINDOW_CYCLES</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Protocol Navigation: Mission Tabs */}
            <nav className="sticky top-20 z-50 bg-[var(--theme-bg)]/80 border-y-2 border-[var(--theme-border)] backdrop-blur-3xl">
                <div className="container mx-auto flex overflow-x-auto hide-scrollbar gap-16 px-8 lg:px-12">
                    {[
                        { label: 'Overview', key: 'OVERVIEW' },
                        { label: 'Schedule', key: 'SCHEDULE' },
                        { label: 'Bracket', key: 'BRACKET' },
                        { label: 'Results', key: 'RESULTS' },
                        { label: 'Rules', key: 'RULES' },
                    ].map(({ label, key }) => (
                        <button key={key} onClick={() => setActiveTab(key)}
                            className={`py-10 text-xs font-black uppercase tracking-widest transition-all relative shrink-0
                                ${activeTab === key ? 'text-[var(--theme-primary)]' : 'text-[var(--theme-text-muted)] hover:text-[var(--theme-text)]'}
                            `}
                        >
                            {label}
                            {activeTab === key && (
                                <motion.span layoutId="tab-indicator-alt" className="absolute bottom-0 left-0 w-full h-1.5 bg-[var(--theme-primary)] rounded-full shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.8)]" />
                            )}
                        </button>
                    ))}
                </div>
            </nav>

            <main className="py-24 bg-[var(--theme-bg-alt)]/50">
                <div className="container mx-auto px-8 lg:px-12">
                    <div className="flex flex-col xl:flex-row gap-24">
                        <div className="flex-1 space-y-24">
                            <AnimatePresence mode="wait">
                                {activeTab === 'OVERVIEW' && (
                                    <motion.div key="overview" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} className="space-y-24">
                                        <div className="space-y-12">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-[3px] bg-[var(--theme-primary)] rounded-full" />
                                                <h2 className="text-4xl font-black uppercase tracking-tighter italic flex items-center gap-6 text-[var(--theme-text)]">
                                                    <FiTerminal className="text-[var(--theme-primary)]" /> MISSION_PROTOCOL
                                                </h2>
                                            </div>
                                            <p className="text-2xl text-[var(--theme-text-muted)] font-bold leading-relaxed max-w-5xl border-l-4 border-dashed border-[var(--theme-border)] pl-12 italic uppercase tracking-wider opacity-80">
                                                {tournament.description}
                                            </p>
                                        </div>

                                        {/* BLOCK 2: Tournament Highlights */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                            {tournament.highlights.map((h, i) => (
                                                <div key={i} className="p-10 rounded-3xl bg-[var(--theme-card)] border-2 border-[var(--theme-border)] hover:border-[var(--theme-primary)]/30 transition-all group shadow-sm">
                                                    <div className="w-12 h-12 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:bg-[var(--theme-primary)] group-hover:text-white transition-all">
                                                        <FiZap />
                                                    </div>
                                                    <h4 className="text-xl font-black uppercase tracking-tight italic mb-3">{h.label}</h4>
                                                    <p className="text-xs text-[var(--theme-text-muted)] font-bold leading-relaxed opacity-60 uppercase tracking-widest">{h.desc}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-16">
                                            <div className="p-12 bg-[var(--theme-card)] border-2 border-[var(--theme-border)] rounded-[4rem] flex flex-col items-center justify-center p-16 space-y-8 group hover:border-[var(--theme-primary)] transition-all">
                                                 <FiShield size={48} className="text-[var(--theme-primary)]" />
                                                 <div className="text-center">
                                                     <p className="text-xs font-black uppercase tracking-wider opacity-40 italic mb-2">VERIFIED_SOURCE</p>
                                                     <h3 className="text-3xl font-black uppercase tracking-tighter italic">{tournament.organizer.name}</h3>
                                                 </div>
                                                 <a href={`https://${tournament.organizer.discord}`} target="_blank" className="gzs-btn-primary !px-8 !py-3 !text-xs">SYNC_HUB</a>
                                            </div>
                                            
                                            {/* Important Notes */}
                                            {tournament.notes && (
                                                <div className="mt-10 bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-8">
                                                    <p className="text-xs font-black uppercase tracking-wider text-[#16A34A] mb-4">Important Notes</p>
                                                    <p className="text-xs text-[#374151] leading-relaxed">{tournament.notes}</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Sponsors */}
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 pt-10">
                                            {tournament.sponsors.map((s, i) => (
                                                <div key={i} className="h-40 bg-[var(--theme-card)] rounded-[4rem] border-2 border-[var(--theme-border)] flex items-center justify-center opacity-40 hover:opacity-100 transition-all grayscale hover:grayscale-0">
                                                    <img src={s.logo} alt={s.name} className="h-10 max-w-[80%]" />
                                                </div>
                                            ))}
                                        </div>

                                        {/* About the Tournament */}
                                        <div className="bg-[var(--theme-card)] border-2 border-[var(--theme-border)] rounded-3xl p-10 space-y-8 mt-10">
                                            <p className="text-xs font-black uppercase tracking-wider text-[var(--theme-primary)] opacity-70">About the Tournament</p>
                                            <div className="space-y-4">
                                            {[
                                                { label: 'Category', value: tournament.category || tournament.tournament_type },
                                                { label: 'Format', value: tournament.bracket_format || tournament.format },
                                                { label: 'Team Size', value: tournament.team_size === 1 ? 'Solo' : `${tournament.team_size}v${tournament.team_size}` },
                                                { label: 'Platform', value: tournament.platform || 'PC / Cross-platform' },
                                                { label: 'Region', value: tournament.region || 'All regions' },
                                                { label: 'Entry Fee', value: tournament.entry_fee_type === 'free' ? 'Free Entry' : (tournament.entry_fee || '—') },
                                                { label: 'Last Entry Date', value: tournament.registration_close ? (
                                                <span>
                                                    {new Date(tournament.registration_close).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                    {' '}<span className="text-[var(--theme-primary)] font-black">[<Countdown targetDate={tournament.registration_close} />]</span>
                                                </span>
                                                ) : '—' },
                                            ].filter(r => r.value).map(row => (
                                                <div key={row.label} className="flex gap-6 py-3 border-b border-[var(--theme-border)] last:border-0">
                                                <span className="text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] opacity-50 w-40 shrink-0 italic">{row.label}</span>
                                                <span className="text-sm font-black text-[var(--theme-text)] flex-1">{row.value}</span>
                                                </div>
                                            ))}
                                            </div>
                                        </div>

                                        {/* Tournament Highlights */}
                                        {tournament.highlights?.length > 0 && (
                                            <div className="mt-10 space-y-6">
                                            <p className="text-xs font-black uppercase tracking-wider text-[var(--theme-primary)] opacity-70">Tournament Highlights</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {tournament.highlights.map((h, i) => (
                                                <div key={i} className="bg-[var(--theme-card)] border-2 border-[var(--theme-border)] rounded-2xl p-8">
                                                    <p className="text-sm font-black uppercase text-[var(--theme-text)] mb-2 italic">{h.label}</p>
                                                    <p className="text-xs text-[var(--theme-text-muted)] leading-relaxed italic opacity-70">{h.desc}</p>
                                                </div>
                                                ))}
                                            </div>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {activeTab === 'SCHEDULE' && (
                                    <motion.div key="schedule" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
                                        <h2 className="text-3xl font-black uppercase tracking-tighter italic flex items-center gap-8"><FiClock className="text-[var(--theme-primary)]" /> TEMPORAL_SEQUENCE</h2>
                                        <div className="relative pl-12 space-y-10 border-l-4 border-dashed border-[var(--theme-border)]">
                                            {tournament.timeline.map((step, i) => (
                                                <div key={i} className="relative">
                                                    <div className={`absolute -left-[3.7rem] top-4 w-10 h-10 rounded-2xl border-4 border-[var(--theme-bg)] flex items-center justify-center z-10 ${step.status === 'Done' ? 'bg-[var(--status-success)]' : step.status === 'Live' ? 'bg-red-600' : 'bg-gray-300'}`}>
                                                        {step.status === 'Done' ? <FiCheckCircle className="text-white" size={20} /> : <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
                                                    </div>
                                                    <div className="p-10 rounded-3xl bg-[var(--theme-card)] border-2 border-[var(--theme-border)] hover:border-[var(--theme-primary)] transition-all flex items-center justify-between gap-10">
                                                        <div className="space-y-2">
                                                            <p className="text-xs font-black uppercase tracking-wider opacity-40 italic">{step.time}</p>
                                                            <h4 className="text-3xl font-black uppercase tracking-tighter italic">{step.stage}</h4>
                                                        </div>
                                                        <span className={`px-5 py-2 rounded-full text-xs font-black uppercase italic tracking-wider ${step.status === 'Live' ? 'bg-red-600 text-white animate-pulse' : 'bg-[var(--theme-bg-alt)] opacity-60'}`}>{step.status}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'BRACKET' && (
                                    <motion.div key="bracket" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                                        <div className="flex flex-wrap items-center gap-6">
                                            <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
                                                <FiGitBranch className="text-[var(--theme-primary)]" /> Bracket
                                            </h2>
                                            <div className="ml-auto flex items-center gap-6 text-[10px] font-black uppercase tracking-wider text-[var(--theme-text-muted)]">
                                                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" /> Live</span>
                                                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[var(--theme-primary)] inline-block" /> Completed</span>
                                                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-gray-500 inline-block" /> Upcoming</span>
                                            </div>
                                        </div>
                                        <div className="overflow-x-auto rounded-2xl">
                                            <div className="flex gap-16 min-w-max px-4 pb-8 pt-4 items-start">
                                                {BRACKET_DATA.rounds.map((round) => (
                                                    <div key={round.title} className="flex flex-col gap-6">
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--theme-text-muted)] opacity-50 text-center">{round.title.replace(/_/g, ' ')}</p>
                                                        <div className="flex flex-col gap-8">
                                                            {round.matches.map((match) => (
                                                                <BracketMatch key={match.id} match={match} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'RESULTS' && (
                                    <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                                        <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
                                            <FiAward className="text-[var(--theme-primary)]" /> Results
                                        </h2>

                                        {/* Champion Card */}
                                        <div className="flex flex-col md:flex-row items-center gap-10 p-10 rounded-3xl bg-gradient-to-r from-[#052005] to-[#1A3D1A] border-2 border-[var(--theme-primary)]/30 shadow-xl shadow-[var(--theme-primary)]/10">
                                            <div className="w-24 h-24 bg-[var(--theme-primary)]/20 rounded-3xl flex items-center justify-center text-[var(--theme-primary)] shrink-0">
                                                <FiAward size={52} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--theme-primary)] opacity-80 mb-2">Champion — 1st Place</p>
                                                <h2 className="text-4xl font-black uppercase tracking-tighter text-white leading-none">
                                                    {tournament.winner?.name || tournament.extendedPrizes[0]?.placement}
                                                </h2>
                                                <p className="text-2xl font-black text-[var(--theme-primary)] mt-2">{tournament.extendedPrizes[0]?.prize}</p>
                                                <p className="text-xs text-white/50 font-black uppercase tracking-widest mt-1">{tournament.extendedPrizes[0]?.reward}</p>
                                            </div>
                                        </div>

                                        {/* Podium: 2nd and 3rd */}
                                        <div className="grid grid-cols-2 gap-6">
                                            {[1, 2].map((i) => tournament.extendedPrizes[i] && (
                                                <div key={i} className="p-8 rounded-2xl bg-[var(--theme-card)] border-2 border-[var(--theme-border)] hover:border-[var(--theme-primary)]/30 transition-all">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-[var(--theme-text-muted)] opacity-50 mb-3">{tournament.extendedPrizes[i].placement}</p>
                                                    <p className="text-2xl font-black text-[var(--theme-primary)]">{tournament.extendedPrizes[i].prize}</p>
                                                    <p className="text-xs text-[var(--theme-text-muted)] font-black uppercase tracking-widest mt-1 opacity-50">{tournament.extendedPrizes[i].reward}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Full Results Table */}
                                        <div className="bg-[var(--theme-card)] border-2 border-[var(--theme-border)] rounded-3xl overflow-hidden">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-[var(--theme-bg-alt)] border-b-2 border-[var(--theme-border)]">
                                                        <th className="px-8 py-6 text-xs font-black uppercase tracking-widest opacity-50">Place</th>
                                                        <th className="px-8 py-6 text-xs font-black uppercase tracking-widest opacity-50">Prize</th>
                                                        <th className="px-8 py-6 text-xs font-black uppercase tracking-widest opacity-50">Domain Credits</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-[var(--theme-border)]/50">
                                                    {tournament.extendedPrizes.map((p, i) => (
                                                        <tr key={i} className="hover:bg-[var(--theme-primary)]/5 transition-colors">
                                                            <td className="px-8 py-5 font-black text-lg uppercase italic tracking-tight">{p.placement}</td>
                                                            <td className="px-8 py-5 font-black text-xl text-[var(--theme-primary)]">{p.prize}</td>
                                                            <td className="px-8 py-5 text-xs font-black uppercase tracking-widest opacity-40">{p.reward}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === 'RULES' && (
                                    <motion.div key="rules" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                        <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
                                            <FiShield className="text-[var(--theme-primary)]" /> Rules & Guidelines
                                        </h2>

                                        <div className="bg-[var(--theme-card)] border-2 border-[var(--theme-border)] rounded-3xl p-10 space-y-4">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--theme-primary)] opacity-70">Tournament Rules</p>
                                            <p className="text-sm text-[var(--theme-text-muted)] leading-relaxed">
                                                {tournament.rules || tournament.notes || 'Tournament rules will be published before registration closes.'}
                                            </p>
                                        </div>

                                        <div className="bg-[var(--theme-card)] border-2 border-[var(--theme-border)] rounded-3xl p-10 space-y-6">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--theme-primary)] opacity-70">Eligibility Requirements</p>
                                            <ul className="space-y-4">
                                                {[
                                                    'Must be 18+ or have parental/guardian consent',
                                                    'Verified GzoneSphere account required before registration',
                                                    'No active bans or platform disqualifications',
                                                    'Must complete registration before the deadline',
                                                    'Teams must submit complete rosters with verified in-game IDs',
                                                ].map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-sm text-[var(--theme-text-muted)]">
                                                        <FiCheckCircle size={14} className="text-[var(--theme-primary)] mt-0.5 shrink-0" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="bg-[var(--theme-card)] border-2 border-[var(--theme-border)] rounded-3xl p-10 space-y-4">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--theme-primary)] opacity-70">Code of Conduct</p>
                                            <p className="text-sm text-[var(--theme-text-muted)] leading-relaxed">
                                                {tournament.notes || 'Participants are expected to maintain respectful conduct at all times. Any form of cheating, match-fixing, or external scripting will result in immediate disqualification and a platform ban. Harassment of other players or organizers will not be tolerated. The tournament organizer\'s decisions are final. Appeals must be submitted via the Mission Control Discord hub within 48 hours of the ruling.'}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Sidebar Sector */}
                        <aside className="xl:w-[450px] space-y-16">
                            {/* BLOCK 6: Registered Players Panel */}
                            <div className="bg-white border-2 border-[var(--theme-border)] rounded-[4rem] p-12 shadow-xl space-y-10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--status-success)]/5 blur-[40px] rounded-full" />
                                <div className="space-y-4">
                                     <div className="flex items-center justify-between mb-4">
                                        <p className="text-xs font-black uppercase tracking-widest text-gray-400">SYNCED_NODES</p>
                                        <p className="text-sm font-black italic">{tournament.registeredCount} / {tournament.maxSlots}</p>
                                     </div>
                                     <div className="h-4 bg-gray-100 rounded-full overflow-hidden border border-gray-100">
                                         <div className="h-full bg-[var(--status-success)] rounded-full shadow-[0_0_10px_rgba(var(--status-success-rgb),0.5)] transition-all duration-1000" style={{ width: `${(tournament.registeredCount/tournament.maxSlots)*100}%` }} />
                                     </div>
                                </div>
                                <div className="space-y-6 pt-6 border-t border-gray-100">
                                     <p className="text-xs font-black uppercase tracking-widest text-gray-400 italic">LAST_SIGNAL_ENTRIES</p>
                                     <div className="flex flex-col gap-6">
                                         {tournament.recentPlayers.map((player, i) => (
                                             <div key={i} className="flex items-center gap-6 group/player">
                                                 <img src={player.avatar} className="w-12 h-12 rounded-2xl border-2 border-gray-100 group-hover/player:rotate-12 transition-all" alt={player.name} />
                                                 <div className="min-w-0">
                                                     <p className="text-xs font-black uppercase tracking-widest italic truncate">{player.name}</p>
                                                     <p className="text-xs font-black text-gray-300 italic tracking-wider">INITVAL_0.24SEC</p>
                                                 </div>
                                             </div>
                                         ))}
                                     </div>
                                </div>
                                <div className="pt-6">
                                     {status === 'registration_open' ? (
                                        <button onClick={() => navigate(`/tournaments/${slug}/register`)} className="gzs-btn-primary w-full !py-6 !text-sm !rounded-2xl shadow-2xl shadow-[var(--theme-primary)]/30">INITIALIZE_ENTRY</button>
                                     ) : (
                                         <div className="w-full py-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl text-center text-xs font-black uppercase tracking-widest text-gray-300 opacity-60">ACCESS_RESTRICTED</div>
                                     )}
                                </div>
                            </div>

                            <div className="space-y-12">
                                <div className="flex items-center gap-6 px-4">
                                    <FiActivity className="text-[var(--theme-primary)]" />
                                    <h3 className="text-sm font-black uppercase tracking-widest text-[var(--theme-text-muted)] italic opacity-50">PROXIMITY_NODES</h3>
                                </div>
                                <div className="space-y-12">
                                    {(tournament.related?.length ? tournament.related : [null, null]).map((item, i) => (
                                        <Link key={item?.id || i} to={item ? `/tournaments/${item.slug}` : '/tournaments/browse'} className="block group p-8 rounded-[4rem] border-2 border-transparent hover:border-[var(--theme-border)] hover:bg-[var(--theme-bg-alt)] transition-all">
                                            <div className="aspect-[16/10] w-full bg-[var(--theme-card)] rounded-full mb-8 overflow-hidden border-2 border-[var(--theme-border)] group-hover:border-[var(--theme-primary)]/30 transition-all relative shadow-sm">
                                                <img src={item?.heroImage || images.tournamentHero} alt="Tournament" className="w-full h-full object-cover opacity-20 grayscale" />
                                            </div>
                                            <h4 className="text-3xl font-black uppercase tracking-tighter italic leading-none group-hover:text-[var(--theme-primary)] transition-colors">{item?.name || `NEO_ENGAGEMENT_${i + 1}`}</h4>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        </div>
    );
}

function HeroStat({ icon, label, value, color }) {
    return (
        <div className="flex items-center gap-8 bg-[var(--theme-card)]/50 p-6 rounded-full border-2 border-transparent hover:border-[var(--theme-border)] transition-all">
            <div className={`w-16 h-16 rounded-2xl bg-[var(--theme-bg-alt)] flex items-center justify-center ${color} text-3xl border border-[var(--theme-border)] group-hover:scale-110 transition-all shadow-inner`}>{icon}</div>
            <div className="space-y-1">
                <p className="text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] mb-1 italic opacity-40 leading-none">{label}</p>
                <p className="text-2xl font-black uppercase tracking-tighter text-[var(--theme-text)] italic leading-none">{value}</p>
            </div>
        </div>
    );
}

const AboutRow = ({ label, value }) => (
    <div className="flex items-center justify-between py-6">
        <span className="text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] italic opacity-40">{label}</span>
        <span className="text-xl font-black italic tracking-tighter uppercase">{value}</span>
    </div>
);

function DetailSkeleton() {
    return (
        <div className="min-h-screen bg-[var(--theme-bg)] flex flex-col items-center justify-center animate-pulse p-20">
            <div className="w-48 h-48 bg-[var(--theme-bg-alt)] rounded-[4rem] mb-12" />
            <div className="h-16 w-full max-w-4xl bg-[var(--theme-bg-alt)] rounded-2xl mb-8" />
            <div className="h-40 w-full max-w-4xl bg-[var(--theme-bg-alt)] rounded-3xl" />
        </div>
    );
}

function BracketMatch({ match }) {
    const w1 = match.s1 !== null && match.s2 !== null && match.s1 > match.s2;
    const w2 = match.s1 !== null && match.s2 !== null && match.s2 > match.s1;
    const borderCls = match.status === 'live' ? 'border-red-500' : match.status === 'completed' ? 'border-[var(--theme-primary)]/40' : 'border-[var(--theme-border)]';
    return (
        <div className={`w-60 rounded-2xl bg-[var(--theme-card)] border-2 ${borderCls} overflow-hidden shadow-lg relative`}>
            {match.status === 'live' && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
            <div className="px-4 py-1.5 border-b border-[var(--theme-border)]/50 flex justify-between">
                <span className="text-[9px] font-black uppercase tracking-widest text-[var(--theme-text-muted)] opacity-40">{match.id}</span>
                <span className={`text-[9px] font-black uppercase tracking-wider ${match.status === 'live' ? 'text-red-500' : match.status === 'completed' ? 'text-[var(--theme-primary)]' : 'opacity-30'}`}>{match.status}</span>
            </div>
            <div className="p-3 space-y-2">
                <BracketTeam name={match.t1} score={match.s1} isWinner={w1} />
                <p className="text-center text-[9px] font-black uppercase text-[var(--theme-text-muted)] opacity-30 tracking-widest">VS</p>
                <BracketTeam name={match.t2} score={match.s2} isWinner={w2} />
            </div>
        </div>
    );
}

function BracketTeam({ name, score, isWinner }) {
    return (
        <div className={`flex items-center justify-between px-3 py-2 rounded-xl ${isWinner ? 'bg-[var(--theme-primary)]/10 border border-[var(--theme-primary)]/20' : 'bg-[var(--theme-bg-alt)]'}`}>
            <span className={`text-xs font-black uppercase tracking-tight truncate max-w-[130px] ${isWinner ? 'text-[var(--theme-text)]' : 'text-[var(--theme-text-muted)] opacity-60'}`}>{name}</span>
            <span className={`text-sm font-black shrink-0 ml-2 ${isWinner ? 'text-[var(--theme-primary)]' : 'text-[var(--theme-text-muted)] opacity-40'}`}>{score ?? '—'}</span>
        </div>
    );
}

function TournamentNotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--theme-bg)] text-[var(--theme-text)] p-32 text-center space-y-16">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic">SHARD_MISMATCH</h1>
            <Link to="/tournaments" className="gzs-btn-primary px-12 py-6">BACK_TO_HUB</Link>
        </div>
    );
}








