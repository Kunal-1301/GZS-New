import { useState } from 'react';
import { FiEye, FiEdit2, FiTrash2, FiPlus, FiDownload, FiCheckSquare, FiXSquare, FiChevronUp, FiFilter } from 'react-icons/fi';

/* ── Static Data ─────────────────────────────────────────── */
const STATS = [
    { label: 'LIVE EVENTS', value: '03' },
    { label: 'UPCOMING EVENTS', value: '12' },
    { label: 'TOTAL REGISTRATIONS', value: '1,246' },
    { label: 'PENDING APPROVALS', value: '18' },
];

const RECENT_EVENTS = [
    { id: '01', name: 'Valorant Cup', game: 'Game', mode: 'Published', reg: '19 Hrs Ago', start: 'Admin Name' },
    { id: '02', name: 'Detroit : Become Human', game: 'Game', mode: 'Published', reg: '2 Days Ago', start: 'Admin Name' },
    { id: '03', name: 'A Way Out', game: 'Game', mode: 'Published', reg: '2 Days Ago', start: 'Form Name' },
    { id: '04', name: "Marvel's Spiderman", game: 'Promo', mode: 'Published', reg: '1 Month Ago', start: 'Admin Name' },
];

const GAMES_LIST = [
    { no: '01', game: 'Valorant (2 to 5 Points)', platform: 'PC', teamType: 'Squad', maxPlayers: 5, bracket: 'Active Game', status: 'Active' },
    { no: '02', game: 'Valorant', platform: 'PC', teamType: '4v4', maxPlayers: 4, bracket: 'Active Game', status: 'Active' },
    { no: '03', game: 'BGMI', platform: 'Mobile', teamType: 'Squad', maxPlayers: 4, bracket: 'Active Game', status: 'Active' },
    { no: '04', game: 'BFLA', platform: 'Console', teamType: '1v1', maxPlayers: 1, bracket: 'Active Match', status: 'Disabled' },
    { no: '05', game: 'Apex Legends', platform: 'PC', teamType: '1v1', maxPlayers: 1, bracket: 'Active Match', status: 'Active' },
    { no: '06', game: 'Marvel Spiderman Remastered', platform: 'PC/Console', teamType: 'Free', maxPlayers: null, bracket: 'Solo Mode', status: 'Active' },
];

const REGISTRATIONS = [
    { no: '01', team: 'As Unambiguous', event: 'Valorant Championship', game: 'Valorant', payment: 'Free', regAt: '6 Jan, 6:30', status: 'Approved' },
    { no: '02', team: 'Phoenix5', event: 'BGMI Invitational', game: 'BGMI', payment: 'Free', regAt: '8 Jan, 9:00', status: 'Pending' },
    { no: '03', team: 'Team Titans', event: 'BFA Ready', game: 'BFA', payment: 'Free', regAt: '5 Nov, 2027', status: 'Rejected' },
];

/* ── Sub-components ──────────────────────────────────────── */
function StatusBadge({ status }) {
    const MAP = {
        Published: 'bg-green-100  text-green-800',
        Active: 'bg-green-100  text-green-800',
        Approved: 'bg-green-100  text-green-800',
        Draft: 'bg-neutral-200 text-neutral-700',
        Pending: 'bg-neutral-200 text-neutral-700',
        'In Review': 'bg-yellow-100 text-yellow-800',
        Disabled: 'bg-neutral-100 text-neutral-500',
        Rejected: 'bg-red-50 text-red-600',
    };
    return (
        <span className={`admin-badge ${MAP[status] ?? 'bg-neutral-100 text-neutral-500'}`}>
            {status}
        </span>
    );
}

function ActionBtns({ onView, onEdit, onDelete }) {
    return (
        <div className="flex gap-1">
            <button className="admin-action-btn" title="View" onClick={onView}>   <FiEye size={13} /></button>
            <button className="admin-action-btn" title="Edit" onClick={onEdit}>   <FiEdit2 size={13} /></button>
            <button className="admin-action-btn delete" title="Delete" onClick={onDelete}><FiTrash2 size={13} /></button>
        </div>
    );
}

/* ── Tab: Dashboard ───────────────────────────────────────── */
function DashboardTab() {
    const [filter, setFilter] = useState('Recent');
    const FILTERS = ['Publish', 'Recent', 'Sort'];

    return (
        <div>
            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {STATS.map(({ label, value }) => (
                    <div key={label} className="admin-stat-card">
                        <div className="admin-stat-number">{value}</div>
                        <div className="admin-stat-label">{label}</div>
                    </div>
                ))}
            </div>

            {/* Analytics placeholder */}
            <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-xl p-5 mb-6 h-16 flex items-center">
                <span className="text-[var(--theme-text-muted)] text-xs">Analytics Placeholder</span>
            </div>

            {/* Recent Events Table */}
            <div className="admin-list-card">
                <div className="admin-list-header">
                    <span className="admin-list-title">RECENT EVENTS</span>
                    <div className="flex gap-2 flex-wrap">
                        {FILTERS.map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`admin-filter-btn ${filter === f ? '!bg-[var(--theme-primary)] !text-white !border-[var(--theme-primary)]' : ''}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>#</th><th>Event Name</th><th>Game</th><th>Mode</th>
                                <th>Registration</th><th>Start Date</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {RECENT_EVENTS.map(row => (
                                <tr key={row.id}>
                                    <td className="text-[var(--theme-text-muted)] text-xs">{row.id}</td>
                                    <td className="font-semibold text-[var(--theme-text)]">{row.name}</td>
                                    <td>{row.game}</td>
                                    <td><StatusBadge status={row.mode} /></td>
                                    <td className="text-[var(--theme-text-muted)]">{row.reg}</td>
                                    <td className="text-[var(--theme-text-muted)]">{row.start}</td>
                                    <td><ActionBtns /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

/* ── Tab: Games ───────────────────────────────────────────── */
function GamesTab() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="admin-page-title mb-0">MANAGE GAMES</h2>
                <button className="admin-btn-primary"><FiPlus size={13} /> ADD GAME</button>
            </div>
            <div className="admin-list-card">
                <div className="overflow-x-auto">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>S.No</th><th>Game</th><th>Platform</th><th>Team Type</th>
                                <th>Max Players</th><th>Bracket Type</th><th>Status</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {GAMES_LIST.map(row => (
                                <tr key={row.no}>
                                    <td className="text-[var(--theme-text-muted)] text-xs">{row.no}</td>
                                    <td className="font-semibold text-[var(--theme-text)]">{row.game}</td>
                                    <td>{row.platform}</td>
                                    <td>{row.teamType}</td>
                                    <td>{row.maxPlayers ?? '—'}</td>
                                    <td>{row.bracket}</td>
                                    <td><StatusBadge status={row.status} /></td>
                                    <td><ActionBtns /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

/* ── Tab: Registrations ───────────────────────────────────── */
function RegistrationsTab() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <h2 className="admin-page-title mb-0">REGISTRATIONS</h2>
                <div className="flex gap-2 flex-wrap">
                    <button className="admin-filter-btn"><FiDownload size={11} /> EXPORT CSV</button>
                    <button className="admin-btn-primary"><FiCheckSquare size={13} /> BULK APPROVE</button>
                    <button className="admin-filter-btn text-red-600 border-red-300 hover:bg-red-50"><FiXSquare size={12} /> BULK REJECT</button>
                </div>
            </div>
            <div className="admin-list-card">
                <div className="overflow-x-auto">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>S.No</th><th>Team</th><th>Event</th><th>Game</th>
                                <th>Payment</th><th>Registered At</th><th>Status</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {REGISTRATIONS.map(row => (
                                <tr key={row.no}>
                                    <td className="text-[var(--theme-text-muted)] text-xs">{row.no}</td>
                                    <td className="font-semibold text-[var(--theme-text)]">{row.team}</td>
                                    <td className="text-[var(--theme-text-muted)]">{row.event}</td>
                                    <td>{row.game}</td>
                                    <td>{row.payment}</td>
                                    <td className="text-[var(--theme-text-muted)]">{row.regAt}</td>
                                    <td><StatusBadge status={row.status} /></td>
                                    <td><ActionBtns /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

/* ── Main Component ──────────────────────────────────────── */
const TABS = [
    { key: 'dashboard', label: 'DASHBOARD' },
    { key: 'games', label: 'GAMES' },
    { key: 'regs', label: 'REGISTRATIONS' },
];

export default function EsportsAdmin() {
    const [activeTab, setActiveTab] = useState('dashboard');

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
            {activeTab === 'games' && <GamesTab />}
            {activeTab === 'regs' && <RegistrationsTab />}
        </div>
    );
}
