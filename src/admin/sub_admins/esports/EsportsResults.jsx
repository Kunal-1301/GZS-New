import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FiPlus, FiEdit2, FiTrash2, FiAward, FiFileText } from 'react-icons/fi';
import { mockApiService } from '@services/mockApiService';

export default function EsportsResults() {
    const queryClient = useQueryClient();

    const { data: results = [], isLoading } = useQuery({
        queryKey: ['admin', 'esports', 'results'],
        queryFn: mockApiService.getAllResults
    });

    const deleteMutation = useMutation({
        mutationFn: mockApiService.deleteResult,
        onSuccess: () => {
            queryClient.invalidateQueries(['admin', 'esports', 'results']);
        }
    });

    const handleDelete = async (id) => {
        if (window.confirm("Delete this result record?")) {
            deleteMutation.mutate(id);
        }
    };

    if (isLoading) return <div className="p-20 text-center animate-pulse text-[var(--theme-text-muted)] font-black uppercase tracking-widest text-xs">RECOVERING COMPETITION DATA...</div>;

    return (
        <div className="animate-[fadeIn_0.5s_ease-out]">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-500 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-yellow-500/20"><FiAward size={22} /></div>
                    <div>
                        <h1 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-900">Hall of Champions</h1>
                        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-0.5">Historical Outcome Records</p>
                    </div>
                </div>
                <button className="admin-btn-primary flex items-center gap-2 group" onClick={() => alert('Result entry coming soon')}>
                    <FiPlus size={14} /> <span>LOG FINAL OUTCOME</span>
                </button>
            </div>

            <div className="admin-list-card">
                <div className="overflow-x-auto">
                    <table className="admin-table">
                        <thead>
                            <tr className="bg-neutral-50/50">
                                <th className="pl-8">#ID</th><th>Battle Event</th><th>Champion / Squad</th><th>Recognition & Reward</th>
                                <th>Outcome Status</th><th className="text-right pr-8">Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.length === 0 ? (
                                <tr><td colSpan="6" className="text-center py-32 text-neutral-300 text-[10px] font-black uppercase tracking-[0.3em] opacity-40 italic">Zero Competitive Results Found</td></tr>
                            ) : results.map(row => (
                                <tr key={row.id} className="hover:bg-neutral-50/50 transition-colors">
                                    <td className="text-[10px] font-mono text-neutral-400 opacity-60 pl-8">#RES-{row.id}</td>
                                    <td className="font-bold text-xs text-neutral-900">{row.event}</td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 bg-yellow-50 text-yellow-600 rounded-lg"><FiAward size={12} /></div>
                                            <span className="text-xs font-black uppercase tracking-widest text-neutral-800">{row.team}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-[10px] font-black uppercase text-indigo-600 tracking-tighter">{row.rank}</div>
                                        <div className="text-[10px] font-bold text-green-600 mt-0.5">{row.prize}</div>
                                    </td>
                                    <td>
                                        <span className={`admin-badge ${row.status === 'Finalized' ? 'bg-green-100/50 text-green-700 border-green-100' : 'bg-yellow-100/50 text-yellow-700 border-yellow-100'}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="pr-8">
                                        <div className="flex gap-2 justify-end">
                                            <button className="admin-action-btn" title="Stats Detail"><FiFileText size={12} /></button>
                                            <button className="admin-action-btn" title="Edit"><FiEdit2 size={12} /></button>
                                            <button className="admin-action-btn delete" onClick={() => handleDelete(row.id)} title="Delete"><FiTrash2 size={12} /></button>
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

