import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FiPlus, FiEdit2, FiTrash2, FiGrid } from 'react-icons/fi';
import { mockApiService } from '@services/mockApiService';

export default function EsportsBrackets() {
    const queryClient = useQueryClient();

    const { data: brackets = [], isLoading } = useQuery({
        queryKey: ['admin', 'esports', 'brackets'],
        queryFn: mockApiService.getAllBrackets
    });

    const deleteMutation = useMutation({
        mutationFn: mockApiService.deleteBracket,
        onSuccess: () => {
            queryClient.invalidateQueries(['admin', 'esports', 'brackets']);
        }
    });

    const handleDelete = async (id) => {
        if (window.confirm("Delete this bracket?")) {
            deleteMutation.mutate(id);
        }
    };

    if (isLoading) return <div className="p-20 text-center animate-pulse text-[var(--theme-text-muted)] font-black uppercase tracking-widest text-xs">SYNCHRONIZING BRACKET ENGINE...</div>;

    return (
        <div className="animate-[fadeIn_0.5s_ease-out]">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-600/20"><FiGrid size={22} /></div>
                    <div>
                        <h1 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-900">Bracket Architecture</h1>
                        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-0.5">Competitive Structural Management</p>
                    </div>
                </div>
                <button className="admin-btn-primary flex items-center gap-2 group" onClick={() => alert('Bracket generator coming soon')}>
                    <FiPlus size={14} /> <span>INITIALIZE BRACKET</span>
                </button>
            </div>

            <div className="admin-list-card">
                <div className="overflow-x-auto">
                    <table className="admin-table">
                        <thead>
                            <tr className="bg-neutral-50/50">
                                <th className="pl-8">#ID</th><th>Bracket Designation</th><th>Event Cluster</th><th>Logic Type</th>
                                <th>Combatant Size</th><th>Link Status</th><th className="text-right pr-8">Control</th>
                            </tr>
                        </thead>
                        <tbody>
                            {brackets.length === 0 ? (
                                <tr><td colSpan="7" className="text-center py-32 text-neutral-300 text-[10px] font-black uppercase tracking-[0.3em] opacity-40 italic">Zero Structural Brackets Identified</td></tr>
                            ) : brackets.map(row => (
                                <tr key={row.id} className="hover:bg-neutral-50/50 transition-colors">
                                    <td className="text-[10px] font-mono text-neutral-400 opacity-60 pl-8">#BR-{row.id}</td>
                                    <td className="font-bold text-xs text-indigo-600 underline decoration-indigo-200 decoration-2 underline-offset-4 cursor-pointer">{row.name}</td>
                                    <td className="text-[10px] font-bold text-neutral-500">{row.event}</td>
                                    <td className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{row.type}</td>
                                    <td className="text-[10px] font-bold text-neutral-600">{row.size} Units</td>
                                    <td>
                                        <span className={`admin-badge ${row.status === 'Active' ? 'bg-green-100/50 text-green-700 border-green-100' : 'bg-neutral-100 text-neutral-500'}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="pr-8">
                                        <div className="flex gap-2 justify-end">
                                            <button className="admin-action-btn" title="Edit Matches"><FiGrid size={12} /></button>
                                            <button className="admin-action-btn" title="Settings"><FiEdit2 size={12} /></button>
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

