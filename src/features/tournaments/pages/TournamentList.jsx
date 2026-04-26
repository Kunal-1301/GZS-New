import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiSearch, FiFilter, FiActivity, FiCalendar, FiAward } from 'react-icons/fi';
import Breadcrumb from '@/shared/components/Breadcrumb';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import { usePublicTournaments } from '@/services/mutators/useTournaments';
import { Helmet } from 'react-helmet-async';
import { adaptTournamentRecord } from '@/shared/adapters/contentAdapters';

const DOMAIN_PILLS  = ['All', 'Esports', 'Dev', 'Art', 'Writing', 'Music'];
const STATUS_PILLS  = ['All', 'Live', 'Open', 'Upcoming'];
const PLATFORM_PILLS = ['All', 'PC', 'Mobile', 'Console'];

export default function TournamentList() {
    const { data: tournaments = [], isLoading } = usePublicTournaments();
    const tournamentItems = tournaments.map(adaptTournamentRecord);
    const [filterGame, setFilterGame] = useState('ALL');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterDomain, setFilterDomain] = useState('All');
    const [filterPlatform, setFilterPlatform] = useState('All');
    const [sortBy, setSortBy] = useState('date');
    const [search, setSearch] = useState('');
    usePageTheme('tournaments-page');

    const handleFilterGameChange = useCallback((e) => setFilterGame(e.target.value), []);
    const handleSortByChange = useCallback((e) => setSortBy(e.target.value), []);
    const handleSearchChange = useCallback((e) => setSearch(e.target.value), []);
    const handleResetFilters = useCallback(() => {
        setFilterGame('ALL');
        setFilterStatus('All');
        setFilterDomain('All');
        setFilterPlatform('All');
        setSortBy('date');
        setSearch('');
    }, []);

    const filteredTournaments = useMemo(() => {
        const statusMap = { 'All': null, 'Live': 'live', 'Open': 'registration_open', 'Upcoming': 'upcoming' };
        return tournamentItems
            .filter((t) => {
                const matchesGame   = filterGame === 'ALL' || (t.game || t.game_id || '')?.toLowerCase().includes(filterGame.toLowerCase());
                const mappedStatus  = statusMap[filterStatus];
                const matchesStatus = !mappedStatus || (t.status || '').toLowerCase() === mappedStatus;
                const matchesSearch = !search || (t.name || t.title || '').toLowerCase().includes(search.toLowerCase()) || (t.game || '').toLowerCase().includes(search.toLowerCase());
                const matchesDomain = filterDomain === 'All' || (t.tournament_type || t.type || '')?.toLowerCase() === filterDomain.toLowerCase();
                return matchesGame && matchesStatus && matchesSearch && matchesDomain;
            })
            .sort((a, b) => {
                if (sortBy === 'prize') return ((b.prize_pool?.total || b.prize || '₹0').replace(/[^0-9]/g, '') - (a.prize_pool?.total || a.prize || '₹0').replace(/[^0-9]/g, ''));
                if (sortBy === 'registrations') return (b.current_participants || 0) - (a.current_participants || 0);
                return new Date(a.start_date || a.date || 0) - new Date(b.start_date || b.date || 0);
            });
    }, [tournamentItems, filterGame, filterStatus, filterDomain, filterPrize, sortBy, search]);

    const gamesList = useMemo(() => {
        const games = new Set(tournamentItems.map(t => t.game).filter(Boolean));
        return ['ALL', ...Array.from(games)];
    }, [tournamentItems]);

    return (
        <div className="theme-tournaments min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] flex flex-col">
            <Helmet>
                <title>All Tournaments | GzoneSphere</title>
                <meta name="description" content="Browse and register for the latest GzoneSphere tournaments. From community cups to professional leagues." />
            </Helmet>

            {/* ── HERO ──────────────────────────────────────────── */}
            <section className="relative pt-32 pb-20 flex flex-col items-center justify-center text-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-[var(--theme-bg-alt)] opacity-50"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, var(--theme-primary) 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}
                    aria-hidden="true"
                />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--theme-primary)] to-transparent" aria-hidden="true" />

                <div className="relative z-10 px-6 md:px-12 container-global">
                    <span className="inline-block mb-4 px-4 py-1 rounded-full text-xs font-black tracking-widest uppercase bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border border-[var(--theme-primary)]/20 animate-pulse">
                        <FiActivity className="inline-block mr-1" /> LIVE COMPETITION
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-[var(--theme-text)] leading-none mb-6 font-heading">
                        THE TOURNAMENT <span className="text-[var(--theme-primary)]">VAULT</span>
                    </h1>
                    <p className="text-[var(--theme-text-muted)] text-sm md:text-base tracking-widest uppercase mb-4 font-bold max-w-2xl mx-auto">
                        Find your next battleground. Registration for over <span className="text-[var(--theme-text)]">₹100k+</span> in prize pools active today.
                    </p>
                </div>
            </section>

            {/* ── MAIN CONTENT ────────────────────────────────────── */}
            <section className="flex-1 py-12">
                <div className="container-global">
                    <Breadcrumb items={[
                        { label: 'Platform', to: '/' },
                        { label: 'tournaments', to: '/tournaments' },
                        { label: 'The Vault' },
                    ]} />

                    {/* Filter Bar */}
                    <div className="mb-10 bg-[var(--theme-card)] p-5 rounded-2xl border border-[var(--theme-border)] space-y-4">
                        {/* Search row */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)] w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search tournaments..."
                                    className="bg-[var(--theme-bg-alt)] border border-[var(--theme-border)] text-[var(--theme-text)] text-sm rounded-xl pl-11 pr-4 py-2.5 w-full outline-none focus:ring-2 focus:ring-[var(--theme-primary)]/20 placeholder:text-[var(--theme-text-muted)] font-medium"
                                    value={search}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <span className="text-xs font-black uppercase text-[var(--theme-text-muted)] tracking-widest">Sort:</span>
                                <select
                                    className="appearance-none bg-[var(--theme-bg-alt)] border border-[var(--theme-border)] text-[var(--theme-text)] text-xs rounded-xl px-3 py-2.5 outline-none font-bold cursor-pointer"
                                    value={sortBy}
                                    onChange={handleSortByChange}
                                >
                                    <option value="date">Start Date</option>
                                    <option value="prize">Prize (High-Low)</option>
                                    <option value="registrations">Most Registered</option>
                                </select>
                            </div>
                        </div>

                        {/* Domain pills */}
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--theme-text-muted)] shrink-0">Domain:</span>
                            {DOMAIN_PILLS.map(d => (
                                <button
                                    key={d}
                                    onClick={() => setFilterDomain(d)}
                                    className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wide transition-all ${
                                        filterDomain === d
                                            ? 'bg-[var(--theme-primary)] text-white shadow-md'
                                            : 'bg-[var(--theme-bg-alt)] text-[var(--theme-text-muted)] border border-[var(--theme-border)] hover:border-[var(--theme-primary)]/40'
                                    }`}
                                >{d}</button>
                            ))}
                        </div>

                        {/* Status + Platform pills */}
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--theme-text-muted)] shrink-0">Status:</span>
                                {STATUS_PILLS.map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setFilterStatus(s)}
                                        className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wide transition-all ${
                                            filterStatus === s
                                                ? s === 'Live' ? 'bg-red-600 text-white animate-pulse' : 'bg-[var(--theme-primary)] text-white shadow-md'
                                                : 'bg-[var(--theme-bg-alt)] text-[var(--theme-text-muted)] border border-[var(--theme-border)] hover:border-[var(--theme-primary)]/40'
                                        }`}
                                    >
                                        {s === 'Live' && filterStatus === 'Live' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-white mr-1" />}
                                        {s}
                                    </button>
                                ))}
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--theme-text-muted)] shrink-0">Platform:</span>
                                {PLATFORM_PILLS.map(p => (
                                    <button
                                        key={p}
                                        onClick={() => setFilterPlatform(p)}
                                        className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wide transition-all ${
                                            filterPlatform === p
                                                ? 'bg-[var(--theme-primary)] text-white shadow-md'
                                                : 'bg-[var(--theme-bg-alt)] text-[var(--theme-text-muted)] border border-[var(--theme-border)] hover:border-[var(--theme-primary)]/40'
                                        }`}
                                    >{p}</button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mb-6 flex items-center gap-2">
                        <div className="h-0.5 flex-1 bg-[var(--theme-border)]"></div>
                        <span className="gzs-label-sm !text-xs uppercase opacity-60">
                            SHOWING {filteredTournaments.length} CHALLENGES
                        </span>
                        <div className="h-0.5 flex-1 bg-[var(--theme-border)]"></div>
                    </div>

                    {/* Loaders */}
                    {isLoading ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="h-[400px] bg-[var(--theme-card)] rounded-2xl animate-pulse border border-[var(--theme-border)]" />
                            ))}
                        </div>
                    ) : (
                        <>
                            {/* Grid */}
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredTournaments.map((t) => (
                                    <div key={t.id} className="group relative bg-[var(--theme-card)] rounded-3xl overflow-hidden border border-[var(--theme-border)] hover:border-[var(--theme-primary)]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[var(--theme-primary)]/5">
                                        
                                        {/* Status Tag */}
                                        <div className="absolute top-5 left-5 z-20 flex gap-2">
                                            {(() => {
                                                const s = (t.status || '').toLowerCase();
                                                const cfg = {
                                                    registration_open: { label: 'Open', cls: 'bg-green-100 text-green-700' },
                                                    live: { label: 'LIVE', cls: 'bg-red-100 text-red-700 animate-pulse' },
                                                    registration_closed: { label: 'Closed', cls: 'bg-gray-100 text-gray-600' },
                                                    completed: { label: 'Completed', cls: 'bg-slate-100 text-slate-500' },
                                                    cancelled: { label: 'Cancelled', cls: 'bg-red-50 text-red-400' },
                                                }[s] || { label: s, cls: 'bg-gray-100 text-gray-600' };
                                                return <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${cfg.cls}`}>{cfg.label}</span>;
                                            })()}
                                            {(t.tournament_type || t.type) && (
                                                <span className="px-3 py-1 text-xs font-black rounded-lg uppercase tracking-widest bg-white/10 backdrop-blur-md text-white border border-white/20">
                                                    {t.tournament_type || t.type}
                                                </span>
                                            )}
                                        </div>

                                        {/* Banner Area */}
                                        <div className="h-52 relative overflow-hidden bg-[var(--theme-bg-alt)]">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                                            {/* We use a placeholder image pattern if no real one */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                                <h4 className="text-8xl font-black">{t.game[0]}</h4>
                                            </div>
                                            <div className="absolute bottom-4 left-6 z-20">
                                                <span className="text-xs font-black uppercase tracking-widest text-[var(--theme-primary-light)]">
                                                    {t.game}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="p-8">
                                            <h3 className="text-xl font-black uppercase tracking-tight text-[var(--theme-text)] leading-tight mb-4 group-hover:text-[var(--theme-primary)] transition-colors line-clamp-2">
                                                {t.name}
                                            </h3>

                                            <div className="grid grid-cols-2 gap-4 mb-8">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] mb-1">Prize Pool</span>
                                                    <div className="flex items-center gap-1.5 text-[var(--theme-text)] font-bold">
                                                        <FiAward className="text-[var(--theme-primary)]" />
                                                        <span className="text-sm">{t.prize}</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] mb-1">Start Date</span>
                                                    <div className="flex items-center gap-1.5 text-[var(--theme-text)] font-bold">
                                                        <FiCalendar className="text-[var(--theme-primary)]" />
                                                        <span className="text-sm">{t.date}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Registration Progress */}
                                            {(t.current_participants != null && t.max_participants != null) && (
                                                <div className="mb-8">
                                                    <div className="flex justify-between text-xs font-black uppercase tracking-wider text-[var(--theme-text-muted)] mb-1">
                                                        <span>{t.current_participants} registered</span>
                                                        <span>{t.max_participants} max</span>
                                                    </div>
                                                    <div className="h-1.5 rounded-full bg-[var(--theme-border)]">
                                                        <div className="h-full rounded-full bg-[var(--theme-primary)] transition-all" style={{ width: `${Math.min(100, (t.current_participants / t.max_participants) * 100)}%` }} />
                                                    </div>
                                                </div>
                                            )}

                                            <Link
                                                to={`/tournaments/${t.slug || t.id}`}
                                                className="flex items-center justify-between w-full p-4 rounded-2xl bg-[var(--theme-bg-alt)] group-hover:bg-[var(--theme-primary)] transition-all duration-500 overflow-hidden relative group/btn no-underline"
                                            >
                                                <span className="text-xs font-black uppercase tracking-widest group-hover:text-white transition-colors relative z-10">
                                                    VIEW DETAILS
                                                </span>
                                                <FiArrowUpRight className="w-5 h-5 text-[var(--theme-primary)] group-hover:text-white group-hover:rotate-45 transition-all duration-500 relative z-10" />
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredTournaments.length === 0 && (
                                <div className="py-32 text-center bg-[var(--theme-card)] rounded-3xl border border-dashed border-[var(--theme-border)]">
                                    <div className="w-20 h-20 rounded-full bg-[var(--theme-bg-alt)] flex items-center justify-center mx-auto mb-6">
                                        <FiSearch className="w-8 h-8 text-[var(--theme-text-muted)]" />
                                    </div>
                                    <h3 className="text-2xl font-black uppercase tracking-tight text-[var(--theme-text)] mb-3">ZERO MATCHES FOUND</h3>
                                    <p className="text-[var(--theme-text-muted)] text-sm max-w-sm mx-auto tracking-wide uppercase font-bold">
                                        No tournaments match these filters. Try expanding your search.
                                    </p>
                                    <button 
                                        onClick={handleResetFilters}
                                        className="mt-8 text-[var(--theme-primary)] font-black text-xs uppercase tracking-widest hover:underline underline-offset-4"
                                    >
                                        RESET FILTERS →
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}








