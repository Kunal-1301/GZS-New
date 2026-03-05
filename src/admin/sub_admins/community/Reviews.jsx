import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FiEye, FiEdit2, FiTrash2, FiPlus, FiStar, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { mockApiService } from "@services/mockApiService";

const FILTERS = ["All", "Published", "Draft", "In Review"];

function StatusBadge({ status }) {
    const cls = {
        Published: "admin-badge bg-green-100/50 text-green-700 border-green-100",
        Draft: "admin-badge bg-neutral-100 text-neutral-500 border-neutral-200",
        "In Review": "admin-badge bg-indigo-50 text-indigo-700 border-indigo-100",
    }[status] ?? "admin-badge";
    return <span className={cls}>{status}</span>;
}

export default function Reviews() {
    const queryClient = useQueryClient();
    const [filter, setFilter] = useState("All");

    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ['admin', 'community', 'reviews'],
        queryFn: mockApiService.getAllReviews
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => mockApiService.updateReview(id, data),
        onSuccess: () => queryClient.invalidateQueries(['admin', 'community', 'reviews'])
    });

    const deleteMutation = useMutation({
        mutationFn: mockApiService.deleteReview,
        onSuccess: () => queryClient.invalidateQueries(['admin', 'community', 'reviews'])
    });

    const handleDelete = async (id) => {
        if (window.confirm("Delete this review permanently?")) {
            deleteMutation.mutate(id);
        }
    };

    const filtered = filter === "All" ? reviews : reviews.filter(r => r.status === filter);

    if (isLoading) return (
        <div className="p-20 text-center animate-pulse text-[var(--theme-text-muted)] font-black uppercase tracking-widest text-xs">
            SYNCHRONIZING REVIEWS...
        </div>
    );

    return (
        <div className="animate-[fadeIn_0.5s_ease-out]">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div>
                    <h1 className="admin-page-title mb-1">GAME REVIEWS</h1>
                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Editorial & Community Feedback Moderation</p>
                </div>
                <button className="admin-btn-primary flex items-center gap-2 group" onClick={() => alert('New review functionality coming soon')}>
                    <FiPlus size={14} className="group-hover:rotate-90 transition-transform" /> <span>WRITE REVIEW</span>
                </button>
            </div>

            <div className="admin-list-card !rounded-[3rem] border-neutral-100 overflow-hidden shadow-sm">
                <div className="admin-list-header !px-12 !py-8 bg-neutral-50/50 border-b border-neutral-100">
                    <div className="flex gap-3 flex-wrap">
                        {FILTERS.map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20" : "bg-white text-neutral-400 border border-neutral-100 hover:bg-neutral-50"}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="admin-table !border-none">
                        <thead>
                            <tr className="bg-neutral-50/30">
                                <th className="pl-12 !py-6">ID</th>
                                <th>REVIEW TITLE</th>
                                <th>GAME</th>
                                <th>SCORE</th>
                                <th>STATUS</th>
                                <th>LAST MODIFIED</th>
                                <th className="text-right pr-12">OPERATIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan="7" className="text-center py-32 text-neutral-300 font-black uppercase tracking-[0.3em] text-[10px] italic opacity-40">No Reviews Identified in Current Buffer</td></tr>
                            ) : filtered.map(row => (
                                <tr key={row.id} className="group hover:bg-neutral-50/50 transition-colors border-b border-neutral-50 last:border-0">
                                    <td className="pl-12 text-neutral-400 font-mono text-[10px] opacity-60">#REV-{row.id}</td>
                                    <td className="font-bold text-xs text-neutral-900 group-hover:text-indigo-600 transition-colors cursor-pointer">{row.title}</td>
                                    <td className="text-[10px] font-black uppercase text-neutral-400 tracking-widest">{row.game}</td>
                                    <td>
                                        <div className="flex items-center gap-1.5 text-orange-500 bg-orange-50/50 px-3 py-1 rounded-full w-fit border border-orange-100">
                                            <FiStar size={10} fill="currentColor" />
                                            <span className="font-black text-[10px] tracking-widest">{row.rating}</span>
                                        </div>
                                    </td>
                                    <td><StatusBadge status={row.status} /></td>
                                    <td className="text-[10px] text-neutral-400 font-bold">{row.updated}</td>
                                    <td className="!py-5 pr-12">
                                        <div className="flex gap-2 justify-end">
                                            <button className="w-9 h-9 rounded-2xl bg-white text-neutral-400 flex items-center justify-center hover:bg-neutral-900 hover:text-white transition-all border border-neutral-100 shadow-sm" title="View"><FiEye size={12} /></button>
                                            <button className="w-9 h-9 rounded-2xl bg-white text-neutral-400 flex items-center justify-center hover:bg-neutral-900 hover:text-white transition-all border border-neutral-100 shadow-sm" title="Edit"><FiEdit2 size={12} /></button>

                                            {row.status === 'In Review' && (
                                                <>
                                                    <button
                                                        className="w-9 h-9 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all border border-green-100 shadow-sm shadow-green-600/5"
                                                        title="Authorize Publication"
                                                        onClick={() => updateMutation.mutate({ id: row.id, data: { status: 'Published' } })}
                                                    >
                                                        <FiCheckCircle size={12} />
                                                    </button>
                                                    <button
                                                        className="w-9 h-9 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all border border-red-100 shadow-sm shadow-red-600/5"
                                                        title="Revert to Draft"
                                                        onClick={() => updateMutation.mutate({ id: row.id, data: { status: 'Draft' } })}
                                                    >
                                                        <FiXCircle size={12} />
                                                    </button>
                                                </>
                                            )}
                                            <button className="w-9 h-9 rounded-2xl bg-white text-neutral-300 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all border border-neutral-100" title="Delete Permanent" onClick={() => handleDelete(row.id)}><FiTrash2 size={12} /></button>
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
