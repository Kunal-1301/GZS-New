import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiSearch, FiFilter } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

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

    const filteredTournaments = TOURNAMENTS.filter((t) => {
        if (filterGame !== 'ALLGAMES' && t.game !== filterGame) return false;
        if (filterStatus !== 'ALL' && t.status !== filterStatus) return false;
        if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="min-h-screen bg-es-bg text-es-text font-inter flex flex-col">
            <Navbar logoVariant="esports" loginVariant="esports" accent="esports" />

            {/* ── HERO ──────────────────────────────────────────── */}
            <section className="relative pt-32 pb-20 flex flex-col items-center justify-center text-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "linear-gradient(rgba(5,40,15,0.8),rgba(10,45,20,0.9)), url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920')",
                    }}
                    aria-hidden="true"
                />
                <div className="absolute top-0 left-0 w-full h-1 bg-es-primary" aria-hidden="true" />

                <div className="relative z-10 px-6 md:px-16">
                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none mb-6"
                        style={{ fontFamily: 'Impact, "Arial Narrow", sans-serif' }}
                    >
                        ALL TOURNAMENTS
                    </h1>
                    <p className="text-es-primary-light text-sm sm:text-base md:text-lg tracking-widest uppercase mb-10 font-bold">
                        Find your next battleground. Register now.
                    </p>
                </div>
            </section>

            {/* ── MAIN CONTENT ────────────────────────────────────── */}
            <section className="flex-1 py-12 bg-es-bg">
                <div className="container-global">

                    {/* Filtering & Search Toolbar */}
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 bg-es-card p-4 rounded-xl border border-es-border shadow-sm">
                        <div className="flex flex-wrap gap-4 w-full md:w-auto">
                            <div className="flex flex-col">
                                <label className="text-xs font-bold uppercase text-es-text-muted mb-1">Game</label>
                                <select
                                    className="bg-es-bg-section border border-es-border text-es-text text-sm rounded-md px-3 py-2 w-full sm:w-48 focus:outline-none focus:border-es-primary"
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
                                <label className="text-xs font-bold uppercase text-es-text-muted mb-1">Status</label>
                                <select
                                    className="bg-es-bg-section border border-es-border text-es-text text-sm rounded-md px-3 py-2 w-full sm:w-48 focus:outline-none focus:border-es-primary"
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
                            <label className="text-xs font-bold uppercase text-es-text-muted mb-1 md:invisible">Search</label>
                            <div className="relative">
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-es-text-muted w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search tournaments..."
                                    className="bg-es-bg-section border border-es-border text-es-text text-sm rounded-md pl-10 pr-4 py-2 w-full md:w-64 focus:outline-none focus:border-es-primary"
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
                                    className="bg-es-card border border-es-border rounded-xl overflow-hidden hover:border-es-primary transition-colors group shadow-sm hover:shadow-md"
                                >
                                    {/* Thumbnail */}
                                    <div className="h-44 bg-es-bg-section flex flex-col justify-end p-4 relative group-hover:bg-es-primary/10 transition-colors">
                                        <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest border border-white/10">
                                            {t.status}
                                        </span>
                                        <span className="text-es-text/40 text-xs uppercase tracking-widest font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{t.game} GRAPHIC</span>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <span className={`inline-block px-2 py-0.5 text-xs font-bold uppercase tracking-widest rounded-sm mb-3 ${t.type === 'OPEN'
                                            ? 'bg-es-primary/20 text-es-primary-dark'
                                            : 'bg-neutral-200 text-neutral-600'
                                            }`}>
                                            {t.type}
                                        </span>
                                        <h4 className="text-es-text font-black text-base uppercase mb-1 leading-tight">
                                            {t.name}
                                        </h4>
                                        <p className="text-es-text-muted text-xs mb-1 font-medium">Prize Pool: <span className="text-es-text font-bold">{t.prize}</span></p>
                                        <p className="text-es-text-muted text-xs mb-5 font-medium">Starts: <span className="text-es-text font-bold">{t.date}</span></p>

                                        <Link
                                            to={`/esports/tournament/${t.id}`}
                                            className="inline-flex items-center justify-center w-full gap-2 px-5 py-3 bg-es-primary hover:bg-es-primary-dark text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-colors group-hover:shadow-md"
                                        >
                                            VIEW DETAILS <FiArrowUpRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center">
                                <h3 className="text-es-text font-bold text-xl uppercase tracking-wider mb-2">No Tournaments Found</h3>
                                <p className="text-es-text-muted text-sm">Try adjusting your filters or search terms.</p>
                            </div>
                        )}
                    </div>

                </div>
            </section>

            <Footer variant="light" accent="esports" />
        </div>
    );
}
