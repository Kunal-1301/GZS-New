import { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiExternalLink, FiDollarSign } from 'react-icons/fi';

const SPONSORS = [
    { id: 'S1', name: 'Razer', tier: 'Platinum', activeEvents: 2, value: '$15k', status: 'Active' },
    { id: 'S2', name: 'Logitech G', tier: 'Gold', activeEvents: 1, value: '$8k', status: 'Active' },
    { id: 'S3', name: 'Red Bull', tier: 'Energy Partner', activeEvents: 3, value: 'Product Support', status: 'Active' },
    { id: 'S4', name: 'Monster Energy', tier: 'Silver', activeEvents: 0, value: '$3k', status: 'Expired' },
];

export default function EsportsSponsors() {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="admin-page-title mb-0">SPONSORSHIPS</h1>
                <button className="admin-btn-primary"><FiPlus size={13} /> ADD SPONSOR</button>
            </div>

            <div className="admin-list-card">
                <div className="overflow-x-auto">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>#</th><th>Sponsor Name</th><th>Tier</th><th>Active Events</th>
                                <th>Value</th><th>Status</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SPONSORS.map(row => (
                                <tr key={row.id}>
                                    <td className="text-[var(--theme-text-muted)] text-xs">{row.id}</td>
                                    <td className="font-semibold text-[var(--theme-text)]">{row.name}</td>
                                    <td className="text-xs uppercase font-black tracking-widest text-indigo-600">{row.tier}</td>
                                    <td className="text-center">{row.activeEvents}</td>
                                    <td className="flex items-center gap-1 text-xs">
                                        <FiDollarSign className="text-green-600" size={12} />
                                        {row.value}
                                    </td>
                                    <td>
                                        <span className={`admin-badge ${row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-50 text-red-600'}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex gap-1">
                                            <button className="admin-action-btn" title="View Agreement"><FiExternalLink size={13} /></button>
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
