import { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiTrophy, FiFileText } from 'react-icons/fi';

const RESULTS = [
    { id: 'R1', event: 'Valorant Cup', winner: 'Team Shadow', score: '3-1', date: '12 Jan, 2026', status: 'Confirmed' },
    { id: 'R2', event: 'BGMI Invitational', winner: 'Team Phoenix', score: '155 pts', date: '15 Jan, 2026', status: 'Draft' },
    { id: 'R3', event: 'A Way Out Race', winner: 'Duo X', score: '12:45.00', date: '05 Jan, 2026', status: 'Confirmed' },
];

export default function EsportsResults() {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="admin-page-title mb-0">RESULT & STATS</h1>
                <button className="admin-btn-primary"><FiPlus size={13} /> ADD RESULT</button>
            </div>

            <div className="admin-list-card">
                <div className="overflow-x-auto">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>#</th><th>Event</th><th>Winner/MVP</th><th>Final Score</th>
                                <th>Match Date</th><th>Status</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {RESULTS.map(row => (
                                <tr key={row.id}>
                                    <td className="text-[var(--theme-text-muted)] text-xs">{row.id}</td>
                                    <td className="font-semibold text-[var(--theme-text)]">{row.event}</td>
                                    <td className="flex items-center gap-2">
                                        <FiTrophy className="text-yellow-500" size={14} />
                                        <span className="text-xs font-bold">{row.winner}</span>
                                    </td>
                                    <td className="text-xs">{row.score}</td>
                                    <td className="text-xs text-[var(--theme-text-muted)]">{row.date}</td>
                                    <td>
                                        <span className={`admin-badge ${row.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex gap-1">
                                            <button className="admin-action-btn" title="Stats Detail"><FiFileText size={13} /></button>
                                            <button className="admin-action-btn" title="Edit"><FiEdit2 size={13} /></button>
                                            <button className="admin-action-btn delete"><FiTrash2 size={13} /></button>
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
