import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiExternalLink, FiDollarSign } from 'react-icons/fi';
import { mockApiService } from '../../../public/services/mockApiService';

export default function EsportsSponsors() {
    const [sponsors, setSponsors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await mockApiService.getAllSponsors();
            setSponsors(data);
            setLoading(false);
        };
        load();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this sponsor?")) return;
        await mockApiService.deleteSponsor(id);
        setSponsors(prev => prev.filter(s => s.id !== id));
    };

    if (loading) return <div className="p-20 text-center text-xs font-black tracking-widest opacity-40 animate-pulse">LOADING SPONSORS...</div>;

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
                                <th>#</th><th>Sponsor Name</th><th>Tier</th><th>Events / Scope</th>
                                <th>Status</th><th>Valid Until</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sponsors.map(row => (
                                <tr key={row.id}>
                                    <td className="text-[var(--theme-text-muted)] text-xs">{row.id}</td>
                                    <td className="font-semibold text-[var(--theme-text)]">{row.name}</td>
                                    <td className="text-xs uppercase font-black tracking-widest text-indigo-600">{row.tier}</td>
                                    <td className="text-xs">{row.event || 'Global'}</td>
                                    <td>
                                        <span className={`admin-badge ${row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-50 text-red-600'}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="text-xs text-[var(--theme-text-muted)]">{row.valedUntil || 'N/A'}</td>
                                    <td>
                                        <div className="flex gap-1">
                                            <button className="admin-action-btn" title="View Agreement"><FiExternalLink size={13} /></button>
                                            <button className="admin-action-btn" title="Edit"><FiEdit2 size={13} /></button>
                                            <button
                                                className="admin-action-btn delete"
                                                title="Delete"
                                                onClick={() => handleDelete(row.id)}
                                            >
                                                <FiTrash2 size={13} />
                                            </button>
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
