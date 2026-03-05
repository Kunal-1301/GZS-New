import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FiPlus, FiEdit2, FiTrash2, FiCheckCircle, FiXCircle, FiSave, FiX, FiActivity, FiUsers, FiTarget } from 'react-icons/fi';
import { FaTrophy } from 'react-icons/fa';
import { mockApiService } from '@services/mockApiService';

/* ── Sub-components ──────────────────────────────────────── */
function StatusBadge({ status }) {
    const MAP = {
        Published: 'bg-green-100/50 text-green-700 border-green-100',
        UPCOMING: 'bg-indigo-100/50 text-indigo-700 border-indigo-100',
        ONGOING: 'bg-yellow-100/50 text-yellow-700 border-yellow-100',
        COMPLETED: 'bg-neutral-100 text-neutral-500 border-neutral-200',
        Rejected: 'bg-red-50 text-red-600 border-red-100',
    };
    return (
        <span className={`admin-badge ${MAP[status] ?? 'bg-neutral-100 text-neutral-500 border border-neutral-200'}`}>
            {status}
        </span>
    );
}

/* ── Tab: Tournaments Management ────────────────────────── */
function TournamentsTab({ tournaments }) {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        name: '', game: '', prize: '', status: 'UPCOMING', type: 'OPEN', slots: '', date: '', is_public: false
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => mockApiService.updateTournament(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['admin', 'esports', 'tournaments']);
            setIsModalOpen(false);
        }
    });

    const createMutation = useMutation({
        mutationFn: mockApiService.addTournament,
        onSuccess: () => {
            queryClient.invalidateQueries(['admin', 'esports', 'tournaments']);
            setIsModalOpen(false);
        }
    });

    const deleteMutation = useMutation({
        mutationFn: mockApiService.deleteTournament,
        onSuccess: () => queryClient.invalidateQueries(['admin', 'esports', 'tournaments'])
    });

    const handleOpenModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({ ...item });
        } else {
            setEditingItem(null);
            setFormData({
                name: '', game: '', prize: '', status: 'UPCOMING', type: 'OPEN', slots: '', date: '', is_public: false
            });
        }
        setIsModalOpen(true);
    };

    return (
        <div className="animate-[fadeIn_0.3s_ease-out]">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-600/20"><FaTrophy size={20} /></div>
                    <div>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-900">Battlegrounds Manifest</h2>
                        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-0.5">Global Tournament Operations</p>
                    </div>
                </div>
                <button className="admin-btn-primary flex items-center gap-2 group" onClick={() => handleOpenModal()}>
                    <FiPlus size={14} /> <span>INITIALIZE TOURNAMENT</span>
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Active Battlefronts', value: tournaments.length, color: 'text-indigo-600', icon: <FaTrophy /> },
                    { label: 'Broadcast Ready', value: tournaments.filter(t => t.is_public).length, color: 'text-green-600', icon: <FiActivity /> },
                    { label: 'Encrypted Records', value: tournaments.filter(t => !t.is_public).length, color: 'text-neutral-400', icon: <FiTarget /> },
                ].map((stat, i) => (
                    <div key={i} className="p-6 bg-white rounded-3xl border border-neutral-100 shadow-sm flex items-center gap-4">
                        <div className={`p-4 bg-neutral-50 rounded-2xl ${stat.color}`}>{stat.icon}</div>
                        <div>
                            <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mt-0.5">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="admin-list-card">
                <div className="overflow-x-auto">
                    <table className="admin-table">
                        <thead>
                            <tr className="bg-neutral-50/50">
                                <th className="pl-8">#ID</th><th>Tournament Entity</th><th>Core Engine</th><th>Reward Pool</th>
                                <th>Status</th><th>Broadcast Date</th><th>Visibility</th><th className="text-right pr-8">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tournaments.length === 0 ? (
                                <tr><td colSpan="8" className="text-center py-32 text-neutral-300 text-[10px] font-black uppercase tracking-[0.3em] opacity-40 italic">Zero Competitive Matches Identified</td></tr>
                            ) : tournaments.map(row => (
                                <tr key={row.id} className="hover:bg-neutral-50/50 transition-colors">
                                    <td className="text-[10px] font-mono text-neutral-400 opacity-60 pl-8">#TO-{row.id}</td>
                                    <td className="font-bold text-xs text-[var(--theme-text)]">{row.name}</td>
                                    <td className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{row.game}</td>
                                    <td className="text-[10px] font-bold text-green-600">{row.prize}</td>
                                    <td><StatusBadge status={row.status} /></td>
                                    <td className="text-[10px] font-bold text-neutral-400">{row.date}</td>
                                    <td>
                                        <button
                                            onClick={() => updateMutation.mutate({ id: row.id, data: { is_public: !row.is_public } })}
                                            className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${row.is_public ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-neutral-100 text-neutral-400'}`}
                                        >
                                            {row.is_public ? 'PUBLIC' : 'HIDDEN'}
                                        </button>
                                    </td>
                                    <td className="pr-8">
                                        <div className="flex gap-2 justify-end">
                                            <button className="admin-action-btn" onClick={() => handleOpenModal(row)}><FiEdit2 size={12} /></button>
                                            <button className="admin-action-btn delete" onClick={() => { if (window.confirm("Delete record?")) deleteMutation.mutate(row.id) }}><FiTrash2 size={12} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <>
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[250] animate-[fadeIn_0.2s_ease-out]" onClick={() => setIsModalOpen(false)} />
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] bg-white rounded-[3rem] p-12 z-[260] shadow-2xl animate-[scaleIn_0.3s_ease-out] overflow-hidden">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-900">{editingItem ? 'Reconfigure Tournament' : 'Initialize New Front'}</h3>
                                <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest mt-1">Sector: Esports Operations</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors"><FiX size={20} /></button>
                        </div>

                        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4 no-scrollbar">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300">PROTOCOL NAME</label>
                                <input className="w-full p-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-xs font-bold focus:border-indigo-400 outline-none transition-colors" placeholder="e.g. VALORANT WINTER SHOWDOWN" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300">CORE ENGINE</label>
                                    <input className="w-full p-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-xs font-bold focus:border-indigo-400 outline-none transition-colors" placeholder="e.g. VALORANT" value={formData.game} onChange={e => setFormData({ ...formData, game: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300">REWARD POOL</label>
                                    <input className="w-full p-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-xs font-bold focus:border-indigo-400 outline-none transition-colors" placeholder="e.g. 50,000 INR" value={formData.prize} onChange={e => setFormData({ ...formData, prize: e.target.value })} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300">DEPLOYMENT DATE</label>
                                    <input className="w-full p-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-xs font-bold focus:border-indigo-400 outline-none transition-colors" type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300">OPERATIONAL STATUS</label>
                                    <select className="w-full p-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-xs font-bold focus:border-indigo-400 outline-none transition-colors cursor-pointer" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                        <option value="UPCOMING">Upcoming</option>
                                        <option value="ONGOING">Ongoing</option>
                                        <option value="COMPLETED">Completed</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-6 bg-indigo-50/50 rounded-[2rem] border border-indigo-50 border-dashed">
                                <input type="checkbox" id="is_public_t" checked={formData.is_public} onChange={e => setFormData({ ...formData, is_public: e.target.checked })} className="w-6 h-6 accent-indigo-600 rounded-lg cursor-pointer" />
                                <label htmlFor="is_public_t" className="text-[10px] font-black text-indigo-900 cursor-pointer uppercase tracking-widest">Broadcast to Public Network immediately</label>
                            </div>
                        </div>

                        <div className="mt-10 flex gap-4">
                            <button className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest border border-neutral-100 rounded-2xl hover:bg-neutral-50 transition-all" onClick={() => setIsModalOpen(false)}>ABORT MISSION</button>
                            <button className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-600/20 hover:-translate-y-1 transition-all" onClick={() => editingItem ? updateMutation.mutate({ id: editingItem.id, data: formData }) : createMutation.mutate(formData)}>
                                {editingItem ? 'RECONFIG COMPLETE' : 'INITIALIZE SQUAD'}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

/* ── Tab: Games List ───────────────────────── */
function GamesTab({ games }) {
    return (
        <div className="animate-[fadeIn_0.3s_ease-out]">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-neutral-900 text-white rounded-2xl flex items-center justify-center"><FiTarget size={20} /></div>
                    <div>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-900">Battlegrounds Database</h2>
                        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-0.5">Active Operational Engines</p>
                    </div>
                </div>
                <button className="admin-btn-primary" onClick={() => alert('Add game functionality coming soon')}><FiPlus size={14} /> ADD ENGINE</button>
            </div>
            <div className="admin-list-card">
                <div className="overflow-x-auto">
                    <table className="admin-table">
                        <thead>
                            <tr className="bg-neutral-50/50">
                                <th className="pl-8">#ID</th><th>Engine Title</th><th>Genre Sector</th><th>Active Fronts</th><th>Interaction Count</th><th className="text-right pr-8">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {games.length === 0 ? (
                                <tr><td colSpan="6" className="text-center py-32 text-neutral-300 text-[10px] font-black uppercase tracking-[0.3em] opacity-40 italic">Zero Operational Engines Detected</td></tr>
                            ) : games.map(g => (
                                <tr key={g.id} className="hover:bg-neutral-50/50 transition-colors">
                                    <td className="text-[10px] font-mono text-neutral-400 pl-8">#GE-{g.id}</td>
                                    <td className="font-bold text-xs">{g.title}</td>
                                    <td className="text-[10px] uppercase font-black text-indigo-600">{g.genre}</td>
                                    <td className="text-[10px] font-bold text-neutral-400">3 Active</td>
                                    <td className="text-[10px] font-bold text-neutral-400">15 Matches</td>
                                    <td className="pr-8">
                                        <div className="flex gap-2 justify-end">
                                            <button className="admin-action-btn"><FiEdit2 size={12} /></button>
                                            <button className="admin-action-btn delete"><FiTrash2 size={12} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

/* ── Tab: Registrations ────────────────────────────────── */
function RegistrationsTab({ regs }) {
    const queryClient = useQueryClient();
    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => mockApiService.updateRegistration(id, data),
        onSuccess: () => queryClient.invalidateQueries(['admin', 'esports', 'regs'])
    });
    const deleteMutation = useMutation({
        mutationFn: mockApiService.deleteRegistration,
        onSuccess: () => queryClient.invalidateQueries(['admin', 'esports', 'regs'])
    });

    return (
        <div className="animate-[fadeIn_0.3s_ease-out]">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center"><FiUsers size={20} /></div>
                <div>
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-900">Personnel Manifest</h2>
                    <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest mt-0.5">Enlisted Combatants & Teams</p>
                </div>
            </div>
            <div className="admin-list-card">
                <div className="overflow-x-auto">
                    <table className="admin-table">
                        <thead>
                            <tr className="bg-neutral-50/50">
                                <th className="pl-8">#ID</th><th>Combatant Entity</th><th>Squad Unit</th><th>Battle Event</th><th>Arrival Time</th><th>Status Signal</th><th className="text-right pr-8">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {regs.length === 0 ? (
                                <tr><td colSpan="7" className="text-center py-32 text-neutral-300 text-[10px] font-black uppercase tracking-[0.3em] opacity-40 italic">Zero Personnel Matches Found</td></tr>
                            ) : regs.map(row => (
                                <tr key={row.id} className="hover:bg-neutral-50/50 transition-colors">
                                    <td className="text-[10px] font-mono text-neutral-400 pl-8">#REG-{row.id}</td>
                                    <td className="font-bold text-xs flex items-center gap-2 text-neutral-900"><div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400"><FiUsers size={12} /></div> {row.player}</td>
                                    <td className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">{row.team}</td>
                                    <td className="text-xs font-bold text-neutral-800">{row.event}</td>
                                    <td className="text-[10px] font-bold text-neutral-400">{row.date}</td>
                                    <td>
                                        <span className={`admin-badge ${row.status === 'Verified' ? 'bg-green-100/50 text-green-700 border-green-100' : 'bg-yellow-100/50 text-yellow-700 border-yellow-100'}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="pr-8">
                                        <div className="flex gap-2 justify-end">
                                            {row.status !== 'Verified' && (
                                                <button className="admin-action-btn !text-green-600 !border-green-100" title="Authorize Deployment" onClick={() => updateMutation.mutate({ id: row.id, data: { status: 'Verified' } })}><FiCheckCircle size={12} /></button>
                                            )}
                                            <button className="admin-action-btn delete" onClick={() => { if (window.confirm("Purge personnel record?")) deleteMutation.mutate(row.id) }}><FiTrash2 size={12} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

const TABS = [
    { key: 'tournaments', label: 'BATTLEFRONTS' },
    { key: 'games', label: 'ENGINES' },
    { key: 'regs', label: 'PERSONNEL' },
];

export default function EsportsAdmin() {
    const [activeTab, setActiveTab] = useState('tournaments');

    // Queries
    const { data: tournaments = [], isLoading: loadingTourneys } = useQuery({ queryKey: ['admin', 'esports', 'tournaments'], queryFn: mockApiService.getAllTournaments, enabled: activeTab === 'tournaments' });
    const { data: games = [], isLoading: loadingGames } = useQuery({ queryKey: ['admin', 'esports', 'games'], queryFn: mockApiService.getAllGames, enabled: activeTab === 'games' });
    const { data: regs = [], isLoading: loadingRegs } = useQuery({ queryKey: ['admin', 'esports', 'regs'], queryFn: mockApiService.getAllRegistrations, enabled: activeTab === 'regs' });

    const isLoading = loadingTourneys || loadingGames || loadingRegs;

    if (isLoading) return <div className="p-20 text-center animate-pulse text-[var(--theme-text-muted)] font-black uppercase tracking-widest text-xs">SYNCHRONIZING ESPORTS CLOUD...</div>;

    return (
        <div className="animate-[fadeIn_0.5s_ease-out]">
            <div className="flex items-center justify-between mb-8">
                <h1 className="admin-page-title mb-0">Esports Operations</h1>
            </div>

            {/* Tab Bar Container */}
            <div className="flex gap-4 mb-10 overflow-x-auto pb-4 scrollbar-none no-scrollbar">
                {TABS.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`whitespace-nowrap px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === tab.key ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'bg-neutral-50 text-neutral-400 hover:bg-neutral-100'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'tournaments' && <TournamentsTab tournaments={tournaments} />}
            {activeTab === 'games' && <GamesTab games={games} />}
            {activeTab === 'regs' && <RegistrationsTab regs={regs} />}
        </div>
    );
}

