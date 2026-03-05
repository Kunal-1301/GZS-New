import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FiEye, FiEdit2, FiTrash2, FiPlus, FiCheckCircle, FiXCircle, FiFlag, FiMinusCircle } from "react-icons/fi";
import { mockApiService } from "@services/mockApiService";

const FILTERS = ["All", "Published", "Draft", "In Review", "Flagged"];

function StatusBadge({ status }) {
    const cls = {
        Published: "admin-badge admin-badge-published",
        Draft: "admin-badge admin-badge-draft",
        "In Review": "admin-badge admin-badge-review",
        Flagged: "admin-badge bg-red-50 text-red-600 border-red-100",
    }[status] ?? "admin-badge";
    return <span className={cls}>{status}</span>;
}

export default function Community() {
    const queryClient = useQueryClient();
    const [filter, setFilter] = useState("All");
    const [selected, setSelected] = useState([]);

    // Queries
    const { data: posts = [], isLoading } = useQuery({
        queryKey: ['admin', 'community-posts'],
        queryFn: mockApiService.getAllCommunityPosts
    });

    // Mutations
    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => mockApiService.updateCommunityPost(id, data),
        onSuccess: () => queryClient.invalidateQueries(['admin', 'community-posts'])
    });

    const deleteMutation = useMutation({
        mutationFn: mockApiService.deleteCommunityPost,
        onSuccess: () => queryClient.invalidateQueries(['admin', 'community-posts'])
    });

    const bulkUpdateMutation = useMutation({
        mutationFn: async ({ ids, status }) => {
            return Promise.all(ids.map(id => mockApiService.updateCommunityPost(id, { status })));
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['admin', 'community-posts']);
            setSelected([]);
        }
    });

    const filtered = filter === "All" ? posts : posts.filter(r => r.status === filter);

    const toggleSelect = (id) =>
        setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            deleteMutation.mutate(id);
        }
    }

    const stats = {
        total: posts.length,
        published: posts.filter(p => p.status === "Published").length,
        flagged: posts.filter(p => p.status === "Flagged").length,
        review: posts.filter(p => p.status === "In Review").length,
    };

    if (isLoading) return <div className="p-20 text-center animate-pulse text-[var(--theme-text-muted)] font-black uppercase tracking-widest text-xs">SYNCHRONIZING SOCIAL CLOUD...</div>;

    return (
        <div className="animate-[fadeIn_0.5s_ease-out] space-y-8">
            <div className="flex items-center justify-between flex-wrap gap-6">
                <div>
                    <h1 className="text-3xl font-black text-neutral-900 tracking-tighter uppercase italic leading-none mb-1">COMMUNITY MODERATION</h1>
                    <p className="text-[10px] text-neutral-400 font-black uppercase tracking-[0.3em] flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-pink-500 rounded-full animate-pulse" /> Interaction Stream // Safety Protocol
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="admin-btn-primary px-8 py-4 !rounded-2xl shadow-xl shadow-indigo-600/10 flex items-center gap-2 group" onClick={() => alert('New post modal would go here')}>
                        <FiPlus size={16} /> <span>BROADCAST MESSAGE</span>
                    </button>
                </div>
            </div>

            {/* --- QUICK STATS --- */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Interactions", val: stats.total, color: "bg-indigo-50 text-indigo-600" },
                    { label: "Active Nodes", val: stats.published, color: "bg-green-50 text-green-600" },
                    { label: "Protocol Flags", val: stats.flagged, color: "bg-red-50 text-red-600" },
                    { label: "Scan Queue", val: stats.review, color: "bg-yellow-50 text-yellow-600" },
                ].map((s, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                        <div className="text-2xl font-black text-neutral-900 mb-1">{s.val}</div>
                        <div className="text-[9px] uppercase font-black tracking-widest text-neutral-400 flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${s.color.split(' ')[0]}`} /> {s.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Bulk Action Bar */}
            {selected.length > 0 && (
                <div className="mb-6 p-4 bg-indigo-600 text-white rounded-[2rem] shadow-2xl flex items-center gap-4 animate-[slideInDown_0.3s_ease-out]">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] ml-4">{selected.length} INTERREACTIONS SELECTED</span>
                    <div className="h-4 w-px bg-white/20 mx-2" />
                    <button
                        onClick={() => bulkUpdateMutation.mutate({ ids: selected, status: 'Published' })}
                        className="bg-white/10 hover:bg-white/20 text-white text-[10px] font-black tracking-widest uppercase px-6 py-2 rounded-xl transition-all flex items-center gap-2"
                    >
                        <FiCheckCircle size={12} /> BULK RESTORE
                    </button>
                    <button
                        onClick={() => bulkUpdateMutation.mutate({ ids: selected, status: 'Draft' })}
                        className="bg-white/10 hover:bg-white/20 text-white text-[10px] font-black tracking-widest uppercase px-6 py-2 rounded-xl transition-all flex items-center gap-2"
                    >
                        <FiXCircle size={12} /> BULK QUARANTINE
                    </button>
                    <button onClick={() => setSelected([])} className="ml-auto w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"><FiMinusCircle size={18} /></button>
                </div>
            )}

            <div className="admin-list-card">
                <div className="admin-list-header flex-col md:flex-row gap-6 p-8 border-b border-neutral-50">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-[var(--theme-text)]">Interaction Stream</span>
                    <div className="flex gap-2 flex-wrap">
                        {FILTERS.map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20" : "bg-neutral-50 text-neutral-400 hover:bg-neutral-100"}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="admin-table">
                        <thead>
                            <tr className="bg-neutral-50/50">
                                <th className="pl-8">Select</th><th>#ID</th><th>Content Payload</th><th>Network</th>
                                <th>Status</th><th>Updated</th><th>Operator</th><th className="pr-8 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan="8" className="text-center py-32 text-neutral-300 text-[10px] font-black uppercase tracking-[0.3em] opacity-40 italic">Zero Social Matches Detected</td></tr>
                            ) : filtered.map(row => (
                                <tr key={row.id} className="hover:bg-neutral-50/50 transition-colors group">
                                    <td className="pl-8">
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(row.id)}
                                            onChange={() => toggleSelect(row.id)}
                                            className="w-5 h-5 accent-indigo-600 rounded-lg cursor-pointer"
                                        />
                                    </td>
                                    <td className="text-[10px] font-mono text-neutral-400 opacity-60">#CM-{row.id}</td>
                                    <td className="max-w-md">
                                        <p className={`text-xs font-bold truncate ${row.status === 'Flagged' ? 'text-red-600 italic' : 'text-[var(--theme-text)]'}`}>
                                            {row.title}
                                        </p>
                                    </td>
                                    <td className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{row.type}</td>
                                    <td><StatusBadge status={row.status} /></td>
                                    <td className="text-[10px] font-bold text-neutral-500">{row.updated}</td>
                                    <td className="text-[10px] font-black uppercase tracking-widest text-indigo-500">{row.author}</td>
                                    <td className="pr-8 space-x-2 text-right">
                                        <div className="flex gap-2 justify-end">
                                            <button className="admin-action-btn" title="View Detail"><FiEye size={12} /></button>
                                            {row.status !== 'Published' && (
                                                <button onClick={() => updateMutation.mutate({ id: row.id, data: { status: 'Published' } })} className="admin-action-btn !text-green-600 !border-green-100 hover:!bg-green-50" title="Approve"><FiCheckCircle size={12} /></button>
                                            )}
                                            {row.status !== 'Flagged' && (
                                                <button onClick={() => updateMutation.mutate({ id: row.id, data: { status: 'Flagged' } })} className="admin-action-btn !text-orange-600 !border-orange-100 hover:!bg-orange-50" title="Flag Post"><FiFlag size={12} /></button>
                                            )}
                                            <button className="admin-action-btn delete" title="Purge Data" onClick={() => handleDelete(row.id)}><FiTrash2 size={12} /></button>
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

