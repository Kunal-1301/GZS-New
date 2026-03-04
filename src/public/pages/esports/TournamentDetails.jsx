import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';
import { usePageTheme } from '../../context/ThemeContext';
import { FiClock, FiUsers, FiDollarSign, FiInfo, FiServer } from 'react-icons/fi';

export default function TournamentDetails() {
    const { id } = useParams();
    usePageTheme('esports');

    return (
        <div className="theme-esports min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] font-inter flex flex-col">
            <Navbar />

            {/* ── HERO ──────────────────────────────────────────── */}
            <section className="relative pt-32 pb-20 flex flex-col items-center justify-center text-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "linear-gradient(rgba(5,40,15,0.8),rgba(10,45,20,0.9)), url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920')",
                    }}
                    aria-hidden="true"
                />
                <div className="absolute top-0 left-0 w-full h-1 bg-[var(--theme-primary)]" aria-hidden="true" />

                <div className="relative z-10 px-6 md:px-16 max-w-5xl mx-auto">
                    <span className="es-badge es-badge-primary backdrop-blur-sm mb-4">
                        REGISTRATION OPEN
                    </span>
                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[var(--theme-text-inverse)] leading-none mb-6 font-heading"
                    >
                        VALORANT WINTER SHOWDOWN II 2026
                    </h1>
                    <p className="text-[var(--theme-primary-light)] text-sm sm:text-base tracking-widest uppercase mb-10 font-bold max-w-2xl mx-auto">
                        The ultimate 5v5 tactical shooter battle. Gather your squad and claim the championship.
                    </p>
                </div>
            </section>

            {/* ── CONTENT ───────────────────────────────────────── */}
            <section className="flex-1 py-12 md:py-20 bg-[var(--theme-bg)]">
                <div className="container-global">
                    <Breadcrumb items={[
                        { label: 'Home', to: '/' },
                        { label: 'Esports', to: '/esports' },
                        { label: 'Tournaments', to: '/esports/tournaments' },
                        { label: 'Tournament Details' },
                    ]} />
                    <div className="flex flex-col lg:flex-row gap-10">

                        {/* ── LEFT COLUMN ── */}
                        <div className="lg:w-2/3 space-y-12">

                            {/* About */}
                            <div className="bg-[var(--theme-card)] p-8 rounded-xl border border-[var(--theme-border)] shadow-sm">
                                <h3 className="text-xl font-black uppercase tracking-wider text-[var(--theme-text)] mb-4 border-l-4 border-[var(--theme-primary)] pl-3">
                                    ABOUT THE TOURNAMENT
                                </h3>
                                <p className="text-sm text-[var(--theme-text-muted)] leading-relaxed">
                                    Prepare for the largest Valorant community tournament of the season! The Winter Showdown II brings together 32 teams competing in a high-stakes, double-elimination bracket format.
                                    Matches will be played on Mumbai servers ensuring low ping for South Asian participants.
                                </p>
                            </div>

                            {/* Format & Details */}
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="bg-[var(--theme-card)] p-6 rounded-xl border border-[var(--theme-border)] shadow-sm flex gap-4">
                                    <div className="p-3 bg-[var(--theme-bg-section)] rounded-lg text-[var(--theme-primary)] h-fit">
                                        <FiUsers className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm uppercase text-[var(--theme-text)] mb-1">TEAM FORMAT</h4>
                                        <p className="text-xs text-[var(--theme-text-muted)]">5v5 Tournament Mode. Minimum 5 players required, up to 1 substitute allowed per team.</p>
                                    </div>
                                </div>
                                <div className="bg-[var(--theme-card)] p-6 rounded-xl border border-[var(--theme-border)] shadow-sm flex gap-4">
                                    <div className="p-3 bg-[var(--theme-bg-section)] rounded-lg text-[var(--theme-primary)] h-fit">
                                        <FiServer className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm uppercase text-[var(--theme-text)] mb-1">BRACKET STRATEGY</h4>
                                        <p className="text-xs text-[var(--theme-text-muted)]">Double Elimination bracket. All matches Best of 1 until Semi-Finals. Finals are Best of 3.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Schedule */}
                            <div>
                                <h3 className="text-xl font-black uppercase tracking-wider text-[var(--theme-text)] mb-6 border-l-4 border-[var(--theme-primary)] pl-3">
                                    TOURNAMENT SCHEDULE
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { date: 'Dec 15, 2026', title: 'Registration Closes', time: '11:59 PM IST' },
                                        { date: 'Dec 18, 2026', title: 'Bracket Reveal & Seeding', time: '8:00 PM IST' },
                                        { date: 'Dec 20, 2026', title: 'Opening Matches', time: '10:00 AM IST' },
                                        { date: 'Dec 22, 2026', title: 'Grand Finals', time: '6:00 PM IST' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex flex-col sm:flex-row justify-between p-4 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-lg items-center gap-4">
                                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                                <span className="font-bold text-[var(--theme-primary)] w-24 text-sm">{item.date}</span>
                                                <span className="font-medium text-[var(--theme-text)] text-sm">{item.title}</span>
                                            </div>
                                            <span className="text-xs text-[var(--theme-text-muted)] font-mono bg-[var(--theme-bg-section)] px-3 py-1 rounded w-full sm:w-auto text-center">{item.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Prize Pool */}
                            <div>
                                <h3 className="text-xl font-black uppercase tracking-wider text-[var(--theme-text)] mb-6 border-l-4 border-[var(--theme-primary)] pl-3">
                                    PRIZE POOL
                                </h3>
                                <div className="bg-[var(--theme-card)] rounded-xl border border-[var(--theme-border)] overflow-hidden shadow-sm">
                                    <div className="bg-[var(--theme-bg-section)] px-6 py-4 border-b border-[var(--theme-border)]">
                                        <span className="text-xs font-bold uppercase tracking-widest text-[var(--theme-text-muted)]">Total Pool: 50,000 INR</span>
                                    </div>
                                    <div className="divide-y divide-[var(--theme-border)]">
                                        <div className="flex justify-between px-6 py-4 bg-yellow-500/5">
                                            <span className="font-black text-yellow-600 uppercase">1st Place (Champion)</span>
                                            <span className="font-bold text-[var(--theme-text)]">30,000 INR</span>
                                        </div>
                                        <div className="flex justify-between px-6 py-4 bg-gray-400/5">
                                            <span className="font-black text-gray-500 uppercase">2nd Place (Runner-up)</span>
                                            <span className="font-bold text-[var(--theme-text)]">15,000 INR</span>
                                        </div>
                                        <div className="flex justify-between px-6 py-4 bg-orange-600/5">
                                            <span className="font-black text-orange-600 uppercase">3rd Place</span>
                                            <span className="font-bold text-[var(--theme-text)]">5,000 INR</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Rules */}
                            <div>
                                <h3 className="text-xl font-black uppercase tracking-wider text-[var(--theme-text)] mb-4 border-l-4 border-[var(--theme-primary)] pl-3">
                                    MATCH RULES & RESTRICTIONS
                                </h3>
                                <ul className="list-disc list-inside space-y-2 text-sm text-[var(--theme-text-muted)] ml-2">
                                    <li>All participants must join the official Tournament Discord server.</li>
                                    <li>Check-in is required 30 minutes before the scheduled match time.</li>
                                    <li>Use of any third-party cheating software will result in immediate permanent ban.</li>
                                    <li>Toxic behavior in all-chat is strictly prohibited and carries penalty warnings.</li>
                                    <li>Teams have a maximum of 10 minutes wait time before forced forfeit.</li>
                                </ul>
                            </div>
                        </div>

                        {/* ── RIGHT COLUMN (Sidebar) ── */}
                        <div className="lg:w-1/3">
                            <div className="sticky top-24 bg-[var(--theme-card)] rounded-xl border border-[var(--theme-border)] shadow-lg overflow-hidden">
                                <div className="p-6 border-b border-[var(--theme-border)] bg-[var(--theme-bg-section)]">
                                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--theme-primary)] mb-1 block">Esports Event</span>
                                    <h3 className="text-2xl font-black uppercase tracking-wider text-[var(--theme-text)] leading-tight">
                                        REGISTRATION <br />SUMMARY
                                    </h3>
                                </div>

                                <div className="p-6 space-y-6">
                                    {/* Stats Map */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-[10px] font-bold uppercase text-[var(--theme-text-muted)] block mb-1">Game</span>
                                            <span className="text-sm font-bold text-[var(--theme-text)]">Valorant</span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold uppercase text-[var(--theme-text-muted)] block mb-1">Entry Fee</span>
                                            <span className="text-sm font-bold text-green-600">FREE</span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold uppercase text-[var(--theme-text-muted)] block mb-1">Platform</span>
                                            <span className="text-sm font-bold text-[var(--theme-text)]">PC</span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold uppercase text-[var(--theme-text-muted)] block mb-1">Region</span>
                                            <span className="text-sm font-bold text-[var(--theme-text)]">India (Mumbai)</span>
                                        </div>
                                    </div>

                                    {/* Progress Slots */}
                                    <div>
                                        <div className="flex justify-between text-xs font-bold uppercase mb-2">
                                            <span className="text-[var(--theme-text-muted)]">Slots Filled</span>
                                            <span className="text-[var(--theme-text)]">18 / 32</span>
                                        </div>
                                        <div className="w-full bg-[var(--theme-bg-section)] rounded-full h-2">
                                            <div className="bg-[var(--theme-primary)] h-2 rounded-full" style={{ width: '56%' }}></div>
                                        </div>
                                        <p className="text-[10px] text-[var(--theme-text-muted)] mt-2 text-right">Only 14 slots remaining</p>
                                    </div>

                                    {/* Actions */}
                                    <div className="pt-4 border-t border-[var(--theme-border)]">
                                        <Link
                                            to={`/esports/tournament/${id || '1'}/register`}
                                            className="gzs-btn-primary w-full shadow-md no-underline"
                                        >
                                            REGISTER TEAM NOW
                                        </Link>
                                        <p className="text-[10px] text-center text-[var(--theme-text-muted)] mt-3 uppercase tracking-wider">
                                            Registration closes Dec 15, 2026
                                        </p>
                                    </div>

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
