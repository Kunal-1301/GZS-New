import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FiPlus, FiEdit2, FiTrash2, FiExternalLink, FiDollarSign, FiAward } from 'react-icons/fi';
import { mockApiService } from '@services/mockApiService';

export default function EsportsSponsors() {
    const queryClient = useQueryClient();

    const { data: sponsors = [], isLoading } = useQuery({
        queryKey: ['admin', 'esports', 'sponsors'],
        queryFn: mockApiService.getAllSponsors
    });

    const deleteMutation = useMutation({
        mutationFn: mockApiService.deleteSponsor,
        onSuccess: () => {
            queryClient.invalidateQueries(['admin', 'esports', 'sponsors']);
        }
    });

    const handleDelete = async (id) => {
        if (window.confirm("Delete this sponsor?")) {
            deleteMutation.mutate(id);
        }
    };

    if (isLoading) return <div className="p-20 text-center animate-pulse text-[var(--theme-text-muted)] font-black uppercase tracking-widest text-xs">VERIFYING SPONSORSHIP AGREEMENTS...</div>;

    return (
        <div className="animate-[fadeIn_0.5s_ease-out]">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-neutral-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-black/20"><FiDollarSign size={22} /></div>
                    <div>
                        <h1 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-900">Capital Partners</h1>
                        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-0.5">Sponsorship & Allied Ventures</p>
                    </div>
                </div>
                <button className="admin-btn-primary flex items-center gap-2 group" onClick={() => alert('Sponsor management coming soon')}>
                    <FiPlus size={14} /> <span>ENLIST PARTNER</span>
                </button>
            </div>

            <div className="admin-list-card">
                <div className="overflow-x-auto">
                    <table className="admin-table">
                        <thead>
                            <tr className="bg-neutral-50/50">
                                <th className="pl-8">#ID</th><th>Partner Entity</th><th>Tier Access</th><th>Event Assignment</th>
                                <th>Valuation</th><th>Agreement Status</th><th className="text-right pr-8">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sponsors.length === 0 ? (
                                <tr><td colSpan="7" className="text-center py-32 text-neutral-300 text-[10px] font-black uppercase tracking-[0.3em] opacity-40 italic">Zero Sponsorship Partners Identified</td></tr>
                            ) : sponsors.map(row => (
                                <tr key={row.id} className="hover:bg-neutral-50/50 transition-colors">
                                    <td className="text-[10px] font-mono text-neutral-400 opacity-60 pl-8">#SPN-{row.id}</td>
                                    <td className="font-bold text-xs text-neutral-900">{row.name}</td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <FiAward className="text-indigo-600" size={12} />
                                            <span className="text-[10px] uppercase font-black tracking-widest text-indigo-600">{row.tier}</span>
                                        </div>
                                    </td>
                                    <td className="text-[10px] font-bold text-neutral-500">{row.event}</td>
                                    <td>
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-green-600">
                                            <FiDollarSign size={10} />
                                            {row.commitment}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`admin-badge ${row.status === 'Active' ? 'bg-green-100/50 text-green-700 border-green-100' : 'bg-red-50 text-red-600'}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="pr-8">
                                        <div className="flex gap-2 justify-end">
                                            <button className="admin-action-btn" title="View Agreement"><FiExternalLink size={12} /></button>
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

