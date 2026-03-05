import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import Breadcrumb from '@components/Breadcrumb';
import { usePageTheme } from '@context/ThemeContext';
import { FiArrowUpRight, FiUsers, FiMapPin, FiCalendar, FiAward } from 'react-icons/fi';
import { images } from '@data/images';

/* ── Tournament Data ─────────────────────────────────────── */
const TOURNAMENTS = {
    '6': {
        id: '6',
        isSolo: true,
        heroImage: images.fifa,
        title: 'FIFA 26 SOLO KNOCKOUT CUP',
        badges: ['FINALIST', 'KNOCKOUT', 'ONLINE'],
        subtitle: 'The ultimate solo FIFA 26 tournament — show your skill, claim the crown.',
        prizePool: '15,000 INR',
        slots: 11,
        slotsUsed: 4,
        startDate: 'Mar 15, 2026',
        registrationEnds: 'Mar 14, 2026',
        game: 'FIFA 26',
        platform: 'EA App (PC / PS5)',
        region: 'South Asia',
        format: 'Solo',
        about: `The FIFA 26 Solo Knockout Cup is GzoneSphere's premier individual football tournament for 2026. 
                Players will compete in a knockout format across multiple rounds, testing their skill, 
                strategy, and composure under pressure. All matches are scheduled with fixed timings 
                to ensure fair play and maximum competitive integrity. This tournament is designed for 
                dedicated FIFA players who want to prove themselves on a competitive stage.`,
        highlights: [
            'Knockout format — every match counts, no second chances',
            'Registered players play from their own setups (PC or console)',
            'Match coordinator assigned prior to each match',
            'Anti-cheat and fair-play rules strictly enforced',
        ],
        organizer: {
            name: 'GzoneSphere Official',
            contact: 'esports@gzonesphere.com',
            discord: 'discord.gg/gzonesphere',
        },
        rules: [
            'Players must join the official Discord before match day',
            'Any use of cheats or hacks results in immediate disqualification',
            'No-show after 10 minutes results in walkover to opponent',
            'All disputes are final when resolved by admin',
        ],
        schedule: {
            timeline: [
                { label: 'Registration Opens', date: 'Feb 28, 2026' },
                { label: 'Registration Closes', date: 'Mar 14, 2026 — 11:59 PM IST' },
            ],
            stages: ['Round of 16', 'Quarterfinals', 'Semifinals', 'Final'],
        },
        matchTiming: [
            'Initial schedules are generated after registration closes',
            'Players receive match timing and opponent details via email platform',
            'Players must be available 15 minutes before the scheduled match time',
            'Failure to report results in a 10-minute forfeit window',
            'Match replays may be requested in disputed results',
            'Admin has the right to reschedule in emergency situations',
            'All times are in IST (India Standard Time)',
        ],
        prizeDistribution: [
            { place: '1st Place', tier: 'Champion', amount: '₹7,500' },
            { place: '2nd Place', tier: 'Runner Up', amount: '₹4,500' },
            { place: '3rd Place', tier: 'Third Place', amount: '₹2,000' },
        ],
        prizePolicy: [
            'Prizes are distributed within 7 working days of the Final',
            'Winners must submit valid UPI or banking information',
            'Any disputed placement will be subject to admin review',
            'Payout timeline will be communicated after tournament completes',
        ],
        importantNotes: [
            'Seats may close before the registration deadline',
            'Substitution is not permitted in the solo format',
            'GzoneSphere reserves the right to modify existing rules',
        ],
        registeredPlayers: [
            { name: 'PlayerOne', avatar: 'P' },
            { name: 'Striker99', avatar: 'S' },
            { name: 'GhostKicker', avatar: 'G' },
            { name: 'AceGoal', avatar: 'A' },
        ],
    },
    '1': {
        id: '1',
        isSolo: false,
        heroImage: images.valorant,
        title: 'VALORANT WINTER SHOWDOWN II 2026',
        badges: ['TEAM 5V5', 'DOUBLE ELIM', 'ONLINE'],
        subtitle: 'The ultimate 5v5 tactical shooter battle. Gather your squad and claim the championship.',
        prizePool: '50,000 INR',
        slots: 32,
        slotsUsed: 18,
        startDate: 'Dec 20, 2026',
        registrationEnds: 'Dec 15, 2026',
        game: 'Valorant',
        platform: 'PC (Riot Client)',
        region: 'India (Mumbai)',
        format: 'Team 5v5',
        about: `Prepare for the largest Valorant community tournament of the season! The Winter Showdown II 
                brings together 32 teams competing in a high-stakes, double-elimination bracket format.
                Matches will be played on Mumbai servers ensuring low ping for South Asian participants.`,
        highlights: [
            'Double elimination bracket format',
            '32 team slots with balanced seeding',
            'Mumbai server priority for all matches',
            'Live commentary for Finals match',
        ],
        organizer: {
            name: 'GzoneSphere Esports',
            contact: 'esports@gzonesphere.com',
            discord: 'discord.gg/gzonesphere',
        },
        rules: [
            'All participants must join the official Tournament Discord server',
            'Check-in is required 30 minutes before scheduled match time',
            'Use of any third-party cheating software results in permanent ban',
            'Teams have a maximum of 10 minutes wait time before forced forfeit',
        ],
        schedule: {
            timeline: [
                { label: 'Registration Opens', date: 'Nov 01, 2026' },
                { label: 'Registration Closes', date: 'Dec 15, 2026 — 11:59 PM IST' },
            ],
            stages: ['Round of 32', 'Round of 16', 'Quarterfinals', 'Semifinals', 'Grand Final'],
        },
        matchTiming: [
            'Initial schedules generated after registration closes',
            'Players receive match timings via the GzoneSphere dashboard',
            'Players must be available 30 minutes before scheduled match time',
            'Failure to check in results in a forfeit after 10 minutes',
            'Match date changes require 24-hour advance admin notice',
            'All matches are Best of 1 until Semifinals (Best of 3)',
            'All times are in IST (India Standard Time)',
        ],
        prizeDistribution: [
            { place: '1st Place', tier: 'Champion', amount: '₹30,000' },
            { place: '2nd Place', tier: 'Runner Up', amount: '₹15,000' },
            { place: '3rd Place', tier: 'Third Place', amount: '₹5,000' },
        ],
        prizePolicy: [
            'Prizes distributed within 7 working days of the Grand Final',
            'Team captain collects prize on behalf of the team',
            'Any disputed placement is subject to admin review',
            'Payout timeline communicated after tournament completes',
        ],
        importantNotes: [
            'Seats may close before the registration deadline',
            'One substitute player allowed per team',
            'GzoneSphere reserves the right to modify existing rules',
        ],
        registeredPlayers: [
            { name: 'SentinelsFive', avatar: 'S' },
            { name: 'NightOwls', avatar: 'N' },
            { name: 'PhantomFC', avatar: 'P' },
            { name: 'IronSight', avatar: 'I' },
        ],
    },
};

const DEFAULT_TOURNAMENT = TOURNAMENTS['1'];

/* ── Component ───────────────────────────────────────────── */
export default function TournamentDetails() {
    const { id } = useParams();
    usePageTheme('esports');

    const t = TOURNAMENTS[id] || DEFAULT_TOURNAMENT;

    return (
        <div className="theme-esports min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] font-inter flex flex-col">
            <Navbar />

            {/* ── HERO ──────────────────────────────────────── */}
            <section className="relative pt-28 pb-20 flex flex-col items-center justify-center text-center overflow-hidden min-h-[380px]">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `linear-gradient(rgba(2,15,5,0.70),rgba(5,30,10,0.85)), url(${t.heroImage})`,
                    }}
                    aria-hidden="true"
                />
                <div className="absolute top-0 left-0 w-full h-1 bg-[var(--theme-primary)]" aria-hidden="true" />

                <div className="relative z-10 px-6 md:px-16 max-w-5xl mx-auto">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
                        {t.badges.map((b, i) => (
                            <span key={i} className="text-[10px] font-bold uppercase tracking-widest text-white/80 border-r border-white/30 pr-2 last:border-0 last:pr-0">
                                {b}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-none mb-6 font-heading">
                        {t.title}
                    </h1>
                    <p className="text-[var(--theme-primary-light)] text-sm tracking-widest uppercase font-bold mb-8 max-w-2xl mx-auto">
                        {t.subtitle}
                    </p>
                    <Link to={`/esports/tournament/${id}/register`} className="gzs-btn-secondary no-underline">
                        REGISTER NOW <FiArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* ── CONTENT ───────────────────────────────────── */}
            <section className="flex-1 py-12 md:py-16 bg-[var(--theme-bg)]">
                <div className="container-global">
                    <Breadcrumb items={[
                        { label: 'Home', to: '/' },
                        { label: 'Esports', to: '/esports' },
                        { label: 'Tournaments', to: '/esports/tournaments' },
                        { label: 'Details' },
                    ]} />

                    <div className="flex flex-col lg:flex-row gap-10">

                        {/* ── LEFT COLUMN (2/3) ────────────────────── */}
                        <div className="lg:w-2/3 space-y-10">

                            {/* About */}
                            <ContentBlock title="ABOUT THE TOURNAMENT">
                                <p className="text-sm text-[var(--theme-text-muted)] leading-relaxed">{t.about}</p>
                            </ContentBlock>

                            {/* Highlights */}
                            <ContentBlock title="TOURNAMENT HIGHLIGHTS">
                                <ul className="space-y-2">
                                    {t.highlights.map((h, i) => (
                                        <li key={i} className="flex gap-2 text-sm text-[var(--theme-text-muted)]">
                                            <span className="text-[var(--theme-primary)] font-black mt-0.5">▸</span> {h}
                                        </li>
                                    ))}
                                </ul>
                            </ContentBlock>

                            {/* Organizer */}
                            <ContentBlock title="ORGANIZER">
                                <div className="space-y-1 text-sm text-[var(--theme-text-muted)]">
                                    <p><span className="font-bold text-[var(--theme-text)]">Organizer:</span> {t.organizer.name}</p>
                                    <p><span className="font-bold text-[var(--theme-text)]">Contact:</span> {t.organizer.contact}</p>
                                    <p><span className="font-bold text-[var(--theme-text)]">Discord:</span> {t.organizer.discord}</p>
                                </div>
                            </ContentBlock>

                            {/* Platform & Region */}
                            <ContentBlock title="PLATFORM & REGION">
                                <div className="space-y-1 text-sm text-[var(--theme-text-muted)]">
                                    <p><span className="font-bold text-[var(--theme-text)]">Platform:</span> {t.platform}</p>
                                    <p><span className="font-bold text-[var(--theme-text)]">Region:</span> {t.region} (play from own setup)</p>
                                </div>
                            </ContentBlock>

                            {/* Rules Summary */}
                            <ContentBlock title="RULES SUMMARY">
                                <ul className="space-y-2 mb-4">
                                    {t.rules.map((r, i) => (
                                        <li key={i} className="flex gap-2 text-sm text-[var(--theme-text-muted)]">
                                            <span className="text-[var(--theme-primary)] font-black mt-0.5">▸</span> {r}
                                        </li>
                                    ))}
                                </ul>
                                <button className="text-[11px] font-bold uppercase tracking-widest text-[var(--theme-primary)] hover:underline underline-offset-4">
                                    View Full Tournament Rules →
                                </button>
                            </ContentBlock>

                            {/* Tournament Schedule */}
                            <div>
                                <SectionHeading>TOURNAMENT SCHEDULE</SectionHeading>

                                <div className="space-y-6">
                                    {/* Registration Timeline */}
                                    <div>
                                        <h5 className="text-[11px] font-black uppercase tracking-widest text-[var(--theme-text-muted)] mb-3">Registration Timeline</h5>
                                        <ul className="space-y-1.5">
                                            {t.schedule.timeline.map((item, i) => (
                                                <li key={i} className="text-sm text-[var(--theme-text-muted)] flex gap-2">
                                                    <span className="text-[var(--theme-primary)] mt-0.5">•</span>
                                                    <span><span className="font-bold text-[var(--theme-text)]">{item.label}:</span> {item.date}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Tournament Stages */}
                                    <div>
                                        <h5 className="text-[11px] font-black uppercase tracking-widest text-[var(--theme-text-muted)] mb-3">Tournament Stages</h5>
                                        <p className="text-[12px] text-[var(--theme-text-muted)] mb-2">All matches are best of 1 (3 for Finals):</p>
                                        <ul className="space-y-1.5 pl-4">
                                            {t.schedule.stages.map((stage, i) => (
                                                <li key={i} className="text-sm text-[var(--theme-text-muted)] list-disc">{stage}</li>
                                            ))}
                                        </ul>
                                        <p className="text-[11px] text-[var(--theme-text-muted)] mt-3 italic">
                                            Additions of rounds will depend on the total number of participants.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Match Timing */}
                            <ContentBlock title="MATCH TIMING INFORMATION">
                                <ul className="space-y-2">
                                    {t.matchTiming.map((item, i) => (
                                        <li key={i} className="flex gap-2 text-[13px] text-[var(--theme-text-muted)]">
                                            <span className="text-[var(--theme-primary)] font-black mt-0.5 shrink-0">▸</span> {item}
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-[11px] text-[var(--theme-text-muted)] mt-3 italic">
                                    Match timings may be adjusted if there are issues on our end. We will notify all participants.
                                </p>
                            </ContentBlock>

                            {/* Prize Pool */}
                            <div>
                                <SectionHeading>PRIZE POOL</SectionHeading>

                                <p className="text-sm font-bold text-[var(--theme-text)] mb-4">
                                    Total Prize Pool: {t.prizePool}
                                </p>
                                <p className="text-[12px] text-[var(--theme-text-muted)] mb-5">
                                    The Prize Pool is subject to change based on registration numbers and sponsor contributions.
                                </p>

                                {/* Prize Table */}
                                <div className="bg-[var(--theme-card)] rounded-xl border border-[var(--theme-border)] overflow-hidden mb-6 shadow-sm">
                                    <div className="grid grid-cols-3 bg-[var(--theme-bg-section)] px-5 py-3 border-b border-[var(--theme-border)]">
                                        {['Place', 'Tier', 'Prize (INR)'].map((h) => (
                                            <span key={h} className="text-[10px] font-black uppercase tracking-widest text-[var(--theme-text-muted)]">{h}</span>
                                        ))}
                                    </div>
                                    {t.prizeDistribution.map((row, i) => (
                                        <div key={i} className={`grid grid-cols-3 px-5 py-3.5 border-b border-[var(--theme-border)] last:border-0 ${i === 0 ? 'bg-yellow-500/5' : i === 1 ? 'bg-gray-400/5' : 'bg-orange-600/5'}`}>
                                            <span className={`text-sm font-black uppercase ${i === 0 ? 'text-yellow-600' : i === 1 ? 'text-gray-500' : 'text-orange-600'}`}>{row.place}</span>
                                            <span className="text-sm text-[var(--theme-text-muted)]">{row.tier}</span>
                                            <span className="text-sm font-bold text-[var(--theme-text)]">{row.amount}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Prize Policy */}
                                <h5 className="text-[11px] font-black uppercase tracking-widest text-[var(--theme-text-muted)] mb-3">Prize Distribution Policy</h5>
                                <ul className="space-y-1.5 mb-6">
                                    {t.prizePolicy.map((p, i) => (
                                        <li key={i} className="flex gap-2 text-[13px] text-[var(--theme-text-muted)]">
                                            <span className="text-[var(--theme-primary)] mt-0.5 shrink-0">▸</span> {p}
                                        </li>
                                    ))}
                                </ul>

                                {/* Important Notes */}
                                <h5 className="text-[11px] font-black uppercase tracking-widest text-[var(--theme-text-muted)] mb-3">Important Notes</h5>
                                <ul className="space-y-1.5">
                                    {t.importantNotes.map((n, i) => (
                                        <li key={i} className="flex gap-2 text-[13px] text-[var(--theme-text-muted)]">
                                            <span className="text-[var(--theme-primary)] mt-0.5 shrink-0">•</span> {n}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>

                        {/* ── RIGHT SIDEBAR (1/3) ───────────────────── */}
                        <div className="lg:w-1/3">
                            <div className="sticky top-24 bg-[var(--theme-card)] rounded-xl border border-[var(--theme-border)] shadow-lg overflow-hidden">

                                {/* Header */}
                                <div className="p-5 bg-[var(--theme-bg-section)] border-b border-[var(--theme-border)]">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--theme-primary)] block mb-1">
                                        Current Status
                                    </span>
                                    <h3 className="text-base font-black uppercase tracking-wider text-[var(--theme-text)]">
                                        REGISTERED {t.isSolo ? 'PLAYERS' : 'TEAMS'}
                                    </h3>
                                </div>

                                {/* Registered player avatars */}
                                <div className="p-5 border-b border-[var(--theme-border)]">
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {t.registeredPlayers.map((p, i) => (
                                            <div
                                                key={i}
                                                className="w-9 h-9 rounded-full bg-[var(--theme-primary)] flex items-center justify-center text-white text-xs font-black border-2 border-[var(--theme-card)]"
                                                title={p.name}
                                            >
                                                {p.avatar}
                                            </div>
                                        ))}
                                        {(t.slots - t.registeredPlayers.length) > 0 && (
                                            <div className="w-9 h-9 rounded-full border-2 border-dashed border-[var(--theme-border)] flex items-center justify-center text-[var(--theme-text-muted)] text-[10px]">
                                                +{t.slots - t.registeredPlayers.length}
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-[11px] text-[var(--theme-text-muted)] font-bold uppercase tracking-wider">
                                        {t.slotsUsed} / {t.slots} Slots filled
                                    </p>
                                    {/* Progress bar */}
                                    <div className="w-full bg-[var(--theme-bg-section)] rounded-full h-1.5 mt-2">
                                        <div
                                            className="bg-[var(--theme-primary)] h-1.5 rounded-full transition-all"
                                            style={{ width: `${(t.slotsUsed / t.slots) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Info Grid */}
                                <div className="p-5 space-y-4 border-b border-[var(--theme-border)]">
                                    {[
                                        { label: 'Game', value: t.game },
                                        { label: 'Platform', value: t.platform },
                                        { label: 'Game ID', value: t.isSolo ? 'EA / XBOX / PS' : 'Riot ID' },
                                        { label: 'Starting', value: t.startDate },
                                        { label: 'Format', value: t.format },
                                        { label: 'Registration Ends', value: t.registrationEnds },
                                    ].map(({ label, value }) => (
                                        <div key={label}>
                                            <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--theme-text-muted)] block mb-0.5">{label}</span>
                                            <span className="text-[12px] font-bold text-[var(--theme-text)]">{value}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <div className="p-5">
                                    <Link
                                        to={`/esports/tournament/${id}/register`}
                                        className="gzs-btn-secondary w-full shadow-md no-underline"
                                    >
                                        REGISTER NOW <FiArrowUpRight className="w-4 h-4" />
                                    </Link>
                                    <p className="text-[9px] text-center text-[var(--theme-text-muted)] mt-3 uppercase tracking-wider">
                                        Registration closes {t.registrationEnds}
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

/* ── Sub-components ──────────────────────────────────────── */
function SectionHeading({ children }) {
    return (
        <h3 className="text-lg font-black uppercase tracking-wider text-[var(--theme-text)] mb-4 border-l-4 border-[var(--theme-primary)] pl-3">
            {children}
        </h3>
    );
}

function ContentBlock({ title, children }) {
    return (
        <div>
            <SectionHeading>{title}</SectionHeading>
            <div className="bg-[var(--theme-card)] p-6 rounded-xl border border-[var(--theme-border)] shadow-sm">
                {children}
            </div>
        </div>
    );
}
