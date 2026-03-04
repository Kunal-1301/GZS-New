import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiSearch, FiFilter } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';
import { usePageTheme } from '../../context/ThemeContext';

const TOURNAMENTS = [
    { id: 1, name: 'VALORANT WINTER SHOWDOWN II 2026', game: 'VALORANT', prize: '50,000 INR', status: 'UPCOMING', type: 'OPEN', slots: '32', date: 'DEC 20, 2026' },
    { id: 2, name: 'CS2 MASTERS SERIES', game: 'CS2', prize: '30,000 INR', status: 'ONGOING', type: 'INVITATIONAL', slots: '16', date: 'NOV 15, 2026' },
    { id: 3, name: 'BGMI ROYALE INVITATIONAL', game: 'BGMI', prize: '25,000 INR', status: 'UPCOMING', type: 'OPEN', slots: '64', date: 'JAN 05, 2027' },
    { id: 4, name: 'APEX LEGENDS CLASH', game: 'APEX', prize: '15,000 INR', status: 'COMPLETED', type: 'OPEN', slots: '32', date: 'OCT 10, 2026' },
    { id: 5, name: 'FREE FIRE SURVIVAL', game: 'FREE FIRE', prize: '20,000 INR', status: 'UPCOMING', type: 'OPEN', slots: '48', date: 'FEB 12, 2027' },
    { id: 6, name: 'EAFC 26 KNOCKOUT', game: 'FIFA', prize: '10,000 INR', status: 'UPCOMING', type: 'OPEN', slots: '16', date: 'DEC 25, 2026' },
];

export default function AllTournaments() {
    const [filterGame, setFilterGame] = useState('ALLGAMES');
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [search, setSearch] = useState('');
    usePageTheme('esports');

    const filteredTournaments = TOURNAMENTS.filter((t) => {
        if (filterGame !== 'ALLGAMES' && t.game !== filterGame) return false;
        if (filterStatus !== 'ALL' && t.status !== filterStatus) return false;
        if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

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

                <div className="relative z-10 px-6 md:px-16">
                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[var(--theme-text-inverse)] leading-none mb-6 font-heading"
                    >
                        ALL TOURNAMENTS
                    </h1>
                    <p className="text-[var(--theme-primary-light)] text-sm sm:text-base md:text-lg tracking-widest uppercase mb-10 font-bold">
                        Find your next battleground. Register now.
                    </p>
                </div>
            </section>

            {/* ── MAIN CONTENT ────────────────────────────────────── */}
            <section className="flex-1 py-12 bg-[var(--theme-bg)]">
                <div className="container-global">
                    <Breadcrumb items={[
                        { label: 'Home', to: '/' },
                        { label: 'Esports', to: '/esports' },
                        { label: 'All Tournaments' },
                    ]} />

                    {/* Filtering & Search Toolbar */}
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 bg-[var(--theme-card)] p-4 rounded-xl border border-[var(--theme-border)] shadow-sm">
                        <div className="flex flex-wrap gap-4 w-full md:w-auto">
                            <div className="flex flex-col">
                                <label className="text-xs font-bold uppercase text-[var(--theme-text-muted)] mb-1">Game</label>
                                <select
                                    className="bg-[var(--theme-bg-section)] border border-[var(--theme-border)] text-[var(--theme-text)] text-sm rounded-md px-3 py-2 w-full sm:w-48 focus:outline-none focus:border-[var(--theme-primary)]"
                                    value={filterGame}
                                    onChange={(e) => setFilterGame(e.target.value)}
                                >
                                    <option value="ALLGAMES">All Games</option>
                                    <option value="VALORANT">Valorant</option>
                                    <option value="CS2">CS2</option>
                                    <option value="BGMI">BGMI</option>
                                    <option value="APEX">Apex Legends</option>
                                    <option value="FREE FIRE">Free Fire</option>
                                    <option value="FIFA">EA FC / FIFA</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xs font-bold uppercase text-[var(--theme-text-muted)] mb-1">Status</label>
                                <select
                                    className="bg-[var(--theme-bg-section)] border border-[var(--theme-border)] text-[var(--theme-text)] text-sm rounded-md px-3 py-2 w-full sm:w-48 focus:outline-none focus:border-[var(--theme-primary)]"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="ALL">All Status</option>
                                    <option value="UPCOMING">Upcoming</option>
                                    <option value="ONGOING">Ongoing</option>
                                    <option value="COMPLETED">Completed</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col w-full md:w-auto">
                            <label className="text-xs font-bold uppercase text-[var(--theme-text-muted)] mb-1 md:invisible">Search</label>
                            <div className="relative">
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)] w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search tournaments..."
                                    className="bg-[var(--theme-bg-section)] border border-[var(--theme-border)] text-[var(--theme-text)] text-sm rounded-md pl-10 pr-4 py-2 w-full md:w-64 focus:outline-none focus:border-[var(--theme-primary)]"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Tournament Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTournaments.length > 0 ? (
                            filteredTournaments.map((t) => (
                                <div
                                    key={t.id}
                                    className="card-standard group"
                                >
                                    {/* Thumbnail */}
                                    <div className="h-44 bg-[var(--theme-bg-section)] flex flex-col justify-end p-4 relative overflow-hidden">
                                        <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-[var(--theme-text-inverse)] px-2 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest border border-white/10 z-10">
                                            {t.status}
                                        </span>
                                        <div className="absolute inset-0 flex items-center justify-center text-[var(--theme-text)]/20 text-[10px] font-black uppercase tracking-[0.2em]">
                                            {t.game}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 bg-[var(--theme-card)]">
                                        <span className={`px-2 py-0.5 text-[9px] font-bold rounded-sm uppercase tracking-widest mb-3 inline-block ${t.type === 'OPEN'
                                            ? 'bg-[#379730] text-white'
                                            : 'bg-neutral-800 text-white'
                                            }`}>
                                            {t.type}
                                        </span>
                                        <h4 className="text-[var(--theme-text)] font-black text-base uppercase mb-2 leading-tight font-heading">
                                            {t.name}
                                        </h4>
                                        <div className="space-y-1 mb-6">
                                            <p className="text-[var(--theme-text-muted)] text-[11px] uppercase tracking-wider font-medium">Pool: <span className="text-[var(--theme-text)] font-bold">{t.prize}</span></p>
                                            <p className="text-[var(--theme-text-muted)] text-[11px] uppercase tracking-wider font-medium">Date: <span className="text-[var(--theme-text)] font-bold">{t.date}</span></p>
                                        </div>

                                        <Link
                                            to={`/esports/tournament/${t.id}`}
                                            className="gzs-btn-primary !px-5 !py-2.5 !text-[10px] w-full no-underline"
                                        >
                                            VIEW DETAILS <FiArrowUpRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center">
                                <h3 className="text-[var(--theme-text)] font-bold text-xl uppercase tracking-wider mb-2">No Tournaments Found</h3>
                                <p className="text-[var(--theme-text-muted)] text-sm">Try adjusting your filters or search terms.</p>
                            </div>
                        )}
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    );
}
