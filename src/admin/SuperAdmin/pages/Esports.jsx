import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiCheckCircle, FiXCircle, FiSave, FiX, FiCalendar, FiTrophy, FiTarget, FiBox } from 'react-icons/fi';
import { mockApiService } from '../../../public/services/mockApiService';

/* ── Static Data (Mocking a Database) ────────────────────────── */
const INITIAL_TOURNAMENTS = [
    { id: 1, name: 'VALORANT WINTER SHOWDOWN II 2026', game: 'VALORANT', prize: '50,000 INR', status: 'UPCOMING', type: 'OPEN', slots: '32', date: '2026-12-20', is_public: true },
    { id: 2, name: 'CS2 MASTERS SERIES', game: 'CS2', prize: '30,000 INR', status: 'ONGOING', type: 'INVITATIONAL', slots: '16', date: '2026-11-15', is_public: true },
    { id: 3, name: 'BGMI ROYALE INVITATIONAL', game: 'BGMI', prize: '25,000 INR', status: 'UPCOMING', type: 'OPEN', slots: '64', date: '2027-01-05', is_public: false },
    { id: 4, name: 'APEX LEGENDS CLASH', game: 'APEX', prize: '15,000 INR', status: 'COMPLETED', type: 'OPEN', slots: '32', date: '2026-10-10', is_public: true },
];

/* ── Sub-components ──────────────────────────────────────── */
function StatusBadge({ status }) {
    const MAP = {
        Published: 'bg-green-100 text-green-800',
        UPCOMING: 'bg-indigo-100 text-indigo-800',
        ONGOING: 'bg-yellow-100 text-yellow-800',
        COMPLETED: 'bg-neutral-100 text-neutral-500',
        Rejected: 'bg-red-50 text-red-600',
    };
    return (
        <span className={`admin-badge ${MAP[status] ?? 'bg-neutral-100 text-neutral-500'}`}>
            {status}
        </span>
    );
}

/* ── Tab: Tournaments Management (NEW) ────────────────────────── */
function TournamentsTab() {
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [newTourney, setNewTourney] = useState({
        name: '', game: '', prize: '', status: 'UPCOMING', type: 'OPEN', slots: '', date: '', is_public: false
    });

    useEffect(() => {
        const load = async () => {
            const data = await mockApiService.getAllTournaments();
            setTournaments(data);
            setLoading(false);
        };
        load();
    }, []);

    const handleTogglePublic = async (id) => {
        const target = tournaments.find(t => t.id === id);
        if (!target) return;
        const newState = !target.is_public;
        await mockApiService.updateTournament(id, { is_public: newState });
        setTournaments(prev => prev.map(t => t.id === id ? { ...t, is_public: newState } : t));
    };

    const handleAdd = async () => {
        if (!newTourney.name || !newTourney.game) return;
        const created = await mockApiService.addTournament(newTourney);
        setTournaments([created, ...tournaments]);
        setIsAdding(false);
        setNewTourney({ name: '', game: '', prize: '', status: 'UPCOMING', type: 'OPEN', slots: '', date: '', is_public: false });
    };

    const handleDelete = async (id) => {
        await mockApiService.deleteTournament(id);
        setTournaments(prev => prev.filter(t => t.id !== id));
    };

    if (loading) return <div className="p-10 text-center animate-pulse text-xs font-bold text-gray-400">LOADING DATABASE...</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <h2 className="admin-page-title mb-0">TOURNAMENT MANAGEMENT</h2>
                <button className="admin-btn-primary" onClick={() => setIsAdding(true)}><FiPlus size={13} /> CREATE TOURNAMENT</button>
            </div>

            {/* Quick Summary Card */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="admin-stat-card">
                    <div className="admin-stat-number text-indigo-600">{tournaments.length}</div>
                    <div className="admin-stat-label">Total Tourneys</div>
                </div>
                <div className="admin-stat-card">
                    <div className="admin-stat-number text-green-600">{tournaments.filter(t => t.is_public).length}</div>
                    <div className="admin-stat-label">Public / Visible</div>
                </div>
                <div className="admin-stat-card">
                    <div className="admin-stat-number text-neutral-400">{tournaments.filter(t => !t.is_public).length}</div>
                    <div className="admin-stat-label">Hidden / Draft</div>
                </div>
            </div>

            <div className="admin-list-card">
                <div className="overflow-x-auto">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>#</th><th>Tournament Name</th><th>Game</th><th>Prize Pool</th>
                                <th>Status</th><th>Date</th><th>Public Display</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tournaments.map(row => (
                                <tr key={row.id}>
                                    <td className="text-xs text-[var(--theme-text-muted)]">{row.id}</td>
                                    <td className="font-bold text-[var(--theme-text)]">{row.name}</td>
                                    <td className="text-xs">{row.game}</td>
                                    <td className="text-xs font-bold text-green-600">{row.prize}</td>
                                    <td><StatusBadge status={row.status} /></td>
                                    <td className="text-xs">{row.date}</td>
                                    <td>
                                        <button
                                            onClick={() => handleTogglePublic(row.id)}
                                            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${row.is_public
                                                ? 'bg-green-600 text-white hover:bg-green-700'
                                                : 'bg-neutral-200 text-neutral-500 hover:bg-neutral-300'
                                                }`}
                                        >
                                            {row.is_public ? <FiCheckCircle size={10} /> : <FiXCircle size={10} />}
                                            {row.is_public ? 'PUBLIC' : 'HIDDEN'}
                                        </button>
                                    </td>
                                    <td>
                                        <div className="flex gap-1">
                                            <button className="admin-action-btn"><FiEdit2 size={13} /></button>
                                            <button className="admin-action-btn delete" onClick={() => handleDelete(row.id)}><FiTrash2 size={13} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Tournament Modal */}
            {isAdding && (
                <>
                    <div className="fixed inset-0 bg-black/40 z-[100]" onClick={() => setIsAdding(false)} />
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] bg-white rounded-2xl z-[110] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="px-6 py-4 border-b flex items-center justify-between bg-[var(--theme-primary)] text-white">
                            <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2"><FiTrophy /> Create New Tournament</h3>
                            <button onClick={() => setIsAdding(false)}><FiX size={18} /></button>
                        </div>
                        <div className="p-6 overflow-y-auto space-y-4">
                            <div className="admin-field">
                                <label className="admin-label">Tournament Name *</label>
                                <input className="admin-input" placeholder="e.g. VALORANT WINTER CUP" value={newTourney.name} onChange={e => setNewTourney({ ...newTourney, name: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="admin-field">
                                    <label className="admin-label">Game *</label>
                                    <input className="admin-input" placeholder="e.g. VALORANT" value={newTourney.game} onChange={e => setNewTourney({ ...newTourney, game: e.target.value })} />
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">Prize Pool</label>
                                    <input className="admin-input" placeholder="e.g. 50,000 INR" value={newTourney.prize} onChange={e => setNewTourney({ ...newTourney, prize: e.target.value })} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="admin-field">
                                    <label className="admin-label">Date</label>
                                    <input className="admin-input" type="date" value={newTourney.date} onChange={e => setNewTourney({ ...newTourney, date: e.target.value })} />
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">Type</label>
                                    <select className="admin-select" value={newTourney.type} onChange={e => setNewTourney({ ...newTourney, type: e.target.value })}>
                                        <option value="OPEN">Open</option>
                                        <option value="INVITATIONAL">Invitational</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                                <input
                                    type="checkbox"
                                    id="is_public"
                                    checked={newTourney.is_public}
                                    onChange={e => setNewTourney({ ...newTourney, is_public: e.target.checked })}
                                    className="w-4 h-4 accent-indigo-600"
                                />
                                <label htmlFor="is_public" className="text-xs font-bold text-indigo-900 cursor-pointer">Show on Public Pages immediately</label>
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 border-t flex gap-3">
                            <button className="flex-1 py-3 text-xs font-bold border rounded-xl" onClick={() => setIsAdding(false)}>CANCEL</button>
                            <button className="flex-1 py-3 bg-[var(--theme-primary)] text-white text-xs font-black uppercase tracking-widest rounded-xl" onClick={handleAdd}>CREATE TOURNAMENT</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

/* ── Tab: Dashboard (Skeleton) ────────────────────────────────── */
function DashboardTab() {
    return (
        <div className="py-20 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <FiTarget size={40} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Esports Statistics Dashboard</h3>
            <p className="text-[10px] text-gray-400">Analytics and registration trends will appear here.</p>
        </div>
    );
}

const TABS = [
    { key: 'dashboard', label: 'DASHBOARD' },
    { key: 'tournaments', label: 'TOURNAMENTS' },
    { key: 'games', label: 'GAMES' },
    { key: 'regs', label: 'REGISTRATIONS' },
];

export default function EsportsAdmin() {
    const [activeTab, setActiveTab] = useState('tournaments');

    return (
        <div>
            {/* Tab Bar */}
            <div className="flex gap-1 mb-7 flex-wrap">
                {TABS.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-5 py-2 text-xs font-bold uppercase tracking-wider border rounded-sm transition-colors ${activeTab === tab.key
                            ? 'bg-[var(--theme-primary)] text-[var(--theme-text-inverse)] border-[var(--theme-primary)]'
                            : 'bg-[var(--theme-card)] text-[var(--theme-text-muted)] border-[var(--theme-border)] hover:bg-[var(--theme-bg-alt)]'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'dashboard' && <DashboardTab />}
            {activeTab === 'tournaments' && <TournamentsTab />}
            {activeTab === 'games' && <div className="text-center py-20 bg-gray-50 rounded-xl text-gray-400 text-xs">Manage Games List</div>}
            {activeTab === 'regs' && <div className="text-center py-20 bg-gray-50 rounded-xl text-gray-400 text-xs">Manage Registrations</div>}
        </div>
    );
}
