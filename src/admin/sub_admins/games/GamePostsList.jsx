import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FiEye, FiEdit2, FiTrash2, FiPlus, FiCheckCircle, FiXCircle, FiX } from "react-icons/fi";
import { mockApiService } from "@services/mockApiService";

const FILTERS = ["All", "Published", "Draft", "In Review"];

/* ── Sub-components ──────────────────────────────────────── */
function StatusBadge({ status }) {
    const cls = {
        Published: "admin-badge admin-badge-published",
        Draft: "admin-badge admin-badge-draft",
        "In Review": "admin-badge admin-badge-review",
    }[status] ?? "admin-badge";
    return <span className={cls}>{status}</span>;
}

/* ── Preview Drawer ──────────────────────────────────────── */
function PreviewDrawer({ post, onClose, onApprove, onReject }) {
    if (!post) return null;
    return (
        <>
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[150] animate-[fadeIn_0.2s_ease-out]" onClick={onClose} />
            <div className="fixed right-0 top-0 h-full w-[450px] bg-white z-[160] shadow-2xl flex flex-col animate-[slideInRight_0.4s_cubic-bezier(0.2,0.8,0.2,1)]">
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-neutral-100 bg-neutral-50/50">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 block mb-1">Transmission Detail</span>
                        <h2 className="text-xs font-black uppercase tracking-widest text-[var(--theme-text)]">Game Post Manifest</h2>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-neutral-200 transition-colors flex items-center justify-center"><FiX size={18} /></button>
                </div>
                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    <div className="aspect-video bg-neutral-900 rounded-[2rem] overflow-hidden flex items-center justify-center relative group shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-60" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 z-20 group-hover:scale-110 transition-transform">Visual Core Offline</span>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-black text-[var(--theme-text)] tracking-tight">{post.title}</h2>
                            <StatusBadge status={post.status} />
                        </div>
                        <p className="text-xs text-neutral-500 leading-relaxed font-medium">
                            {post.description || "The central database contains no explicit descriptive payload for this entry. Visualizing default system architecture placeholder text for review phase. This section aggregates multi-departmental inputs before final broadcast authorization."}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: "GENRE", value: post.genre },
                            { label: "PLATFORM", value: post.platform },
                            { label: "AUTHOR", value: post.author },
                            { label: "INITIALIZED", value: post.date },
                        ].map((meta, i) => (
                            <div key={i} className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100/50">
                                <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest block mb-1">{meta.label}</span>
                                <span className="text-xs font-bold text-neutral-800">{meta.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer actions */}
                {post.status === "In Review" && (
                    <div className="p-8 border-t border-neutral-100 bg-neutral-50/80 flex gap-4">
                        <button
                            onClick={() => { onApprove(post.id); onClose(); }}
                            className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 shadow-xl shadow-indigo-600/20 text-white text-[10px] font-black tracking-widest uppercase py-4 rounded-2xl transition-all hover:-translate-y-1"
                        >
                            <FiCheckCircle size={14} /> AUTHORIZE BROADCAST
                        </button>
                        <button
                            onClick={() => { onReject(post.id); onClose(); }}
                            className="flex-1 flex items-center justify-center gap-2 border-2 border-red-100 text-red-600 hover:bg-red-50 text-[10px] font-black tracking-widest uppercase py-4 rounded-2xl transition-all"
                        >
                            <FiXCircle size={14} /> REJECT DATA
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

/* ── Page ────────────────────────────────────────────────── */
export default function GamePostsList() {
    const queryClient = useQueryClient();
    const [filter, setFilter] = useState("All");
    const [selected, setSelected] = useState([]);
    const [preview, setPreview] = useState(null);

    // Queries
    const { data: posts = [], isLoading } = useQuery({
        queryKey: ['admin', 'games'],
        queryFn: mockApiService.getAllGames
    });

    // Mutations
    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => mockApiService.updateGame(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['admin', 'games']);
            queryClient.invalidateQueries(['admin', 'stats']);
        }
    });

    const deleteMutation = useMutation({
        mutationFn: mockApiService.deleteGame,
        onSuccess: () => queryClient.invalidateQueries(['admin', 'games'])
    });

    const bulkUpdateMutation = useMutation({
        mutationFn: async ({ ids, status }) => {
            return Promise.all(ids.map(id => mockApiService.updateGame(id, { status })));
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['admin', 'games']);
            setSelected([]);
        }
    });

    const filtered = filter === "All" ? posts : posts.filter(r => r.status === filter);

    const toggleSelect = (id) =>
        setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

    const toggleAll = () =>
        setSelected(selected.length === filtered.length ? [] : filtered.map(p => p.id));

    const handleDelete = (id) => {
        if (window.confirm("Delete this game post?")) {
            deleteMutation.mutate(id);
        }
    };

    const stats = {
        total: posts.length,
        published: posts.filter(p => p.status === "Published").length,
        review: posts.filter(p => p.status === "In Review").length,
        featured: posts.filter(p => p.featured).length
    };

    if (isLoading) return <div className="p-20 text-center animate-pulse text-[var(--theme-text-muted)] font-black uppercase tracking-widest text-xs">SYNCHRONIZING WORLD DATABASE...</div>;

    return (
        <div className="animate-[fadeIn_0.5s_ease-out] space-y-8">
            <div className="flex items-center justify-between flex-wrap gap-6">
                <div>
                    <h1 className="text-3xl font-black text-neutral-900 tracking-tighter uppercase italic leading-none mb-1">GAMING CATALOGUE</h1>
                    <p className="text-[10px] text-neutral-400 font-black uppercase tracking-[0.3em] flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-purple-500 rounded-full animate-pulse" /> Asset Inventory // Global Grid
                    </p>
                </div>
                <div className="flex gap-2">
                    <Link to="/admin" className="admin-btn-primary no-underline flex items-center gap-2 px-8 py-4 !rounded-2xl shadow-xl shadow-indigo-600/10 group">
                        <FiPlus size={16} /> <span>INITIALIZE ENTRY</span>
                    </Link>
                </div>
            </div>

            {/* --- QUICK STATS --- */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Games", val: stats.total, color: "bg-purple-50 text-purple-600" },
                    { label: "Live Deployment", val: stats.published, color: "bg-green-50 text-green-600" },
                    { label: "Validation Queue", val: stats.review, color: "bg-yellow-50 text-yellow-600" },
                    { label: "Premium Highlights", val: stats.featured, color: "bg-orange-50 text-orange-600" },
                ].map((s, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                        <div className="text-2xl font-black text-neutral-900 mb-1">{s.val}</div>
                        <div className="text-[9px] uppercase font-black tracking-widest text-neutral-400 flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${s.color.split(' ')[0]}`} /> {s.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Bulk action bar */}
            {selected.length > 0 && (
                <div className="flex items-center gap-4 mb-6 px-6 py-4 bg-indigo-600 text-white rounded-[2rem] shadow-2xl shadow-indigo-600/30 animate-[slideInDown_0.3s_ease-out]">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{selected.length} UNITS SELECTED</span>
                    <div className="h-4 w-px bg-white/20 mx-2" />
                    <button
                        onClick={() => bulkUpdateMutation.mutate({ ids: selected, status: 'Published' })}
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-[10px] font-black tracking-widest uppercase px-6 py-2 rounded-xl transition-all"
                    >
                        <FiCheckCircle size={12} /> BULK AUTHORIZE
                    </button>
                    <button
                        onClick={() => bulkUpdateMutation.mutate({ ids: selected, status: 'Draft' })}
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-[10px] font-black tracking-widest uppercase px-6 py-2 rounded-xl transition-all"
                    >
                        <FiXCircle size={12} /> BULK ARCHIVE
                    </button>
                    <button onClick={() => setSelected([])} className="ml-auto w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"><FiX size={14} /></button>
                </div>
            )}

            <div className="admin-list-card">
                <div className="admin-list-header flex-col md:flex-row gap-6 p-8 border-b border-neutral-50">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-[var(--theme-text)]">Master Inventory</span>
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
                                <th className="pl-8">
                                    <input
                                        type="checkbox"
                                        checked={selected.length === filtered.length && filtered.length > 0}
                                        onChange={toggleAll}
                                        className="w-5 h-5 accent-indigo-600 rounded-lg cursor-pointer"
                                    />
                                </th>
                                <th>#ID</th><th>Title</th><th>Genre</th>
                                <th>Status</th><th>Priority</th><th>Broadcasting</th><th>Author</th><th className="pr-8 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan="9" className="text-center py-32 text-neutral-300 text-[10px] font-black uppercase tracking-[0.3em] opacity-40 italic">Zero Database Matches Found</td></tr>
                            ) : filtered.map(row => (
                                <tr key={row.id} className="hover:bg-neutral-50/50 transition-colors group">
                                    <td className="pl-8">
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(row.id)}
                                            onChange={() => toggleSelect(row.id)}
                                            className="w-5 h-5 accent-indigo-600 rounded-lg cursor-pointer transition-transform group-hover:scale-110"
                                        />
                                    </td>
                                    <td className="text-[10px] font-mono text-neutral-400 opacity-60">#GA-{row.id}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-neutral-900 flex-shrink-0 flex items-center justify-center text-[8px] text-white/20 font-black">?</div>
                                            <span className="font-bold text-xs text-[var(--theme-text)] tracking-tight">{row.title}</span>
                                        </div>
                                    </td>
                                    <td className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{row.genre}</td>
                                    <td><StatusBadge status={row.status} /></td>
                                    <td>
                                        <button
                                            onClick={() => updateMutation.mutate({ id: row.id, data: { featured: !row.featured } })}
                                            className={`text-[8px] font-black px-2.5 py-1 rounded-lg transition-all ${row.featured ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-neutral-100 text-neutral-400'}`}
                                        >
                                            {row.featured ? 'FEATURED' : 'NORMAL'}
                                        </button>
                                    </td>
                                    <td className="text-[10px] font-bold text-neutral-500">{row.date}</td>
                                    <td className="text-[10px] font-black uppercase tracking-widest text-indigo-500">{row.author}</td>
                                    <td className="pr-8">
                                        <div className="flex gap-2 justify-end">
                                            <button className="admin-action-btn" title="View" onClick={() => setPreview(row)}><FiEye size={12} /></button>
                                            <button className="admin-action-btn" title="Edit"><FiEdit2 size={12} /></button>
                                            {row.status === "In Review" && (
                                                <button
                                                    onClick={() => updateMutation.mutate({ id: row.id, data: { status: 'Published' } })}
                                                    className="admin-action-btn !text-green-600 !border-green-100 hover:!bg-green-50"
                                                    title="Approve"
                                                >
                                                    <FiCheckCircle size={12} />
                                                </button>
                                            )}
                                            <button className="admin-action-btn delete" title="Delete" onClick={() => handleDelete(row.id)}><FiTrash2 size={12} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <PreviewDrawer
                post={preview}
                onClose={() => setPreview(null)}
                onApprove={(id) => updateMutation.mutate({ id, data: { status: 'Published' } })}
                onReject={(id) => updateMutation.mutate({ id, data: { status: 'Draft' } })}
            />
        </div>
    );
}

