import { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiGrid } from 'react-icons/fi';

const BRACKETS = [
    { id: 'B1', name: 'Valorant Cup - Group A', type: 'Double Elimination', size: '16 Teams', status: 'Active', event: 'Valorant Cup' },
    { id: 'B2', name: 'BGMI Invitational - Semis', type: 'Points Table', size: '20 Teams', status: 'Active', event: 'BGMI Invitational' },
    { id: 'B3', name: 'A Way Out - Race Bracket', type: 'Single Elimination', size: '8 Teams', status: 'Finished', event: 'A Way Out' },
];

export default function EsportsBrackets() {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="admin-page-title mb-0">BRACKETS & MATCHES</h1>
                <button className="admin-btn-primary"><FiPlus size={13} /> GENERATE BRACKET</button>
            </div>

            <div className="admin-list-card">
                <div className="overflow-x-auto">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>#</th><th>Bracket Name</th><th>Event</th><th>Type</th>
                                <th>Size</th><th>Status</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {BRACKETS.map(row => (
                                <tr key={row.id}>
                                    <td className="text-[var(--theme-text-muted)] text-xs">{row.id}</td>
                                    <td className="font-semibold text-[var(--theme-text)] underline decoration-[var(--theme-primary)] decoration-2">{row.name}</td>
                                    <td className="text-xs">{row.event}</td>
                                    <td className="text-xs">{row.type}</td>
                                    <td>{row.size}</td>
                                    <td>
                                        <span className={`admin-badge ${row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-neutral-100 text-neutral-500'}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex gap-1">
                                            <button className="admin-action-btn" title="Edit Matches"><FiGrid size={13} /></button>
                                            <button className="admin-action-btn" title="Settings"><FiEdit2 size={13} /></button>
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
