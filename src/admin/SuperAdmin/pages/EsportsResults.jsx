import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiFileText } from 'react-icons/fi';
import { GiTrophy } from 'react-icons/gi';
import { mockApiService } from '../../../public/services/mockApiService';

export default function EsportsResults() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await mockApiService.getAllResults();
            setResults(data);
            setLoading(false);
        };
        load();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this result?")) return;
        await mockApiService.deleteResult(id);
        setResults(prev => prev.filter(r => r.id !== id));
    };

    if (loading) return <div className="p-20 text-center text-xs font-black tracking-widest opacity-40 animate-pulse">LOADING RESULTS...</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="admin-page-title mb-0 flex items-center gap-2">
                    <GiTrophy className="text-[var(--theme-primary)]" />
                    MATCH RESULTS & STATS
                </h1>
                <button className="admin-btn-primary"><FiPlus size={13} /> Add Result</button>
            </div>

            <div className="admin-list-card">
                <div className="overflow-x-auto">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>#</th><th>Event</th><th>Winner/MVP</th><th>Runner Up / Points</th>
                                <th>Score</th><th>Match Date</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(row => (
                                <tr key={row.id}>
                                    <td className="text-[var(--theme-text-muted)] text-xs">{row.id}</td>
                                    <td className="font-semibold text-[var(--theme-text)]">{row.event}</td>
                                    <td className="flex items-center gap-2">
                                        <GiTrophy className="text-yellow-500" size={14} />
                                        <span className="text-xs font-bold">{row.winner}</span>
                                    </td>
                                    <td className="text-xs">{row.runnerUp || 'N/A'}</td>
                                    <td className="text-xs font-black text-indigo-500">{row.score}</td>
                                    <td className="text-xs text-[var(--theme-text-muted)]">{row.date}</td>
                                    <td>
                                        <div className="flex gap-1">
                                            <button className="admin-action-btn" title="Stats Detail"><FiFileText size={13} /></button>
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
