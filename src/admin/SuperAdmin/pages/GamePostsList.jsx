import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEdit2, FiTrash2, FiPlus, FiFilter, FiChevronUp, FiCheckCircle, FiXCircle, FiX } from "react-icons/fi";
import { mockApiService } from "../../../public/services/mockApiService";

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
            <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
            <div className="fixed right-0 top-0 h-full w-96 bg-[var(--theme-card)] border-l border-[var(--theme-border)] z-50 shadow-2xl flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--theme-border)]">
                    <span className="text-xs font-black uppercase tracking-widest text-[var(--theme-text)]">Post Preview</span>
                    <button onClick={onClose} className="admin-action-btn"><FiX size={14} /></button>
                </div>
                {/* Content */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    <div className="h-40 bg-[var(--theme-bg-alt)] rounded-xl flex items-center justify-center text-[var(--theme-text-muted)] text-xs">
                        Game Image Placeholder
                    </div>
                    <div>
                        <h2 className="text-base font-black text-[var(--theme-text)] mb-1">{post.title}</h2>
                        <StatusBadge status={post.status} />
                    </div>
                    <div className="space-y-2 text-xs text-[var(--theme-text-muted)]">
                        <div className="flex justify-between"><span>Genre</span><span className="text-[var(--theme-text)]">{post.genre}</span></div>
                        <div className="flex justify-between"><span>Platform</span><span className="text-[var(--theme-text)]">{post.platform}</span></div>
                        <div className="flex justify-between"><span>Author</span><span className="text-[var(--theme-text)]">{post.author}</span></div>
                        <div className="flex justify-between"><span>Date</span><span className="text-[var(--theme-text)]">{post.date}</span></div>
                    </div>
                    <p className="text-xs text-[var(--theme-text-muted)] leading-relaxed">
                        Full game description and content would appear here. This section shows all fields from the game post submission for admin review before approval or rejection.
                    </p>
                </div>
                {/* Footer actions */}
                {post.status === "In Review" && (
                    <div className="p-5 border-t border-[var(--theme-border)] flex gap-3">
                        <button
                            onClick={() => { onApprove(post.id); onClose(); }}
                            className="flex-1 flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2.5 rounded-lg transition-colors"
                        >
                            <FiCheckCircle size={13} /> APPROVE
                        </button>
                        <button
                            onClick={() => { onReject(post.id); onClose(); }}
                            className="flex-1 flex items-center justify-center gap-1.5 border border-red-300 text-red-600 hover:bg-red-50 text-xs font-bold py-2.5 rounded-lg transition-colors"
                        >
                            <FiXCircle size={13} /> REJECT
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

/* ── Page ────────────────────────────────────────────────── */
export default function GamePostsList() {
    const [posts, setPosts] = useState(DUMMY_POSTS);
    const [filter, setFilter] = useState("All");
    const [selected, setSelected] = useState([]);
    const [preview, setPreview] = useState(null);

    const filtered = filter === "All" ? posts : posts.filter(r => r.status === filter);

    const toggleSelect = (id) =>
        setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    const toggleAll = () =>
        setSelected(selected.length === filtered.length ? [] : filtered.map(p => p.id));

    const handleApprove = (id) =>
        setPosts(prev => prev.map(p => p.id === id ? { ...p, status: "Published" } : p));
    const handleReject = (id) =>
        setPosts(prev => prev.map(p => p.id === id ? { ...p, status: "Draft" } : p));

    const bulkApprove = () => {
        setPosts(prev => prev.map(p => selected.includes(p.id) ? { ...p, status: "Published" } : p));
        setSelected([]);
    };
    const bulkReject = () => {
        setPosts(prev => prev.map(p => selected.includes(p.id) ? { ...p, status: "Draft" } : p));
        setSelected([]);
    };

    return (
        <>
            <div>
                <div className="flex items-center justify-between mb-8">
                    <h1 className="admin-page-title mb-0">Game Posts</h1>
                    <Link to="/admin" className="admin-btn-primary no-underline">
                        <FiPlus size={13} /> New Game Post
                    </Link>
                </div>

                {/* Bulk action bar */}
                {selected.length > 0 && (
                    <div className="flex items-center gap-3 mb-4 px-4 py-3 bg-[var(--theme-bg-alt)] border border-[var(--theme-border)] rounded-xl">
                        <span className="text-xs text-[var(--theme-text-muted)]">{selected.length} selected</span>
                        <button
                            onClick={bulkApprove}
                            className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-colors"
                        >
                            <FiCheckCircle size={11} /> BULK APPROVE
                        </button>
                        <button
                            onClick={bulkReject}
                            className="flex items-center gap-1.5 border border-red-300 text-red-600 hover:bg-red-50 text-xs font-bold px-4 py-1.5 rounded-lg transition-colors"
                        >
                            <FiXCircle size={11} /> BULK REJECT
                        </button>
                        <button onClick={() => setSelected([])} className="ml-auto admin-action-btn"><FiX size={13} /></button>
                    </div>
                )}

                <div className="admin-list-card">
                    <div className="admin-list-header">
                        <span className="admin-list-title">Game Posts List</span>
                        <div className="flex gap-2 flex-wrap">
                            {FILTERS.map(f => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`admin-filter-btn ${filter === f ? "!bg-[var(--theme-primary)] !text-[var(--theme-text-inverse)] !border-[var(--theme-primary)]" : ""}`}
                                >
                                    {f}
                                </button>
                            ))}
                            <button className="admin-filter-btn"><FiFilter size={11} /> Filters</button>
                            <button className="admin-filter-btn"><FiChevronUp size={11} /> Sort</button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>
                                        <input
                                            type="checkbox"
                                            checked={selected.length === filtered.length && filtered.length > 0}
                                            onChange={toggleAll}
                                            className="accent-[var(--theme-primary)]"
                                        />
                                    </th>
                                    <th>ID</th><th>Title</th><th>Genre</th>
                                    <th>Status</th><th>Featured</th><th>Published At</th><th>Author</th><th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr><td colSpan="9" className="text-center py-6 text-[var(--theme-text-muted)]">No posts found.</td></tr>
                                ) : filtered.map(row => (
                                    <tr key={row.id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selected.includes(row.id)}
                                                onChange={() => toggleSelect(row.id)}
                                                className="accent-[var(--theme-primary)]"
                                            />
                                        </td>
                                        <td className="text-[var(--theme-text-muted)] text-xs">{row.id}</td>
                                        <td className="font-semibold text-[var(--theme-text)]">{row.title}</td>
                                        <td className="text-xs text-[var(--theme-text-muted)]">{row.genre}</td>
                                        <td><StatusBadge status={row.status} /></td>
                                        <td>
                                            <button
                                                onClick={() => setPosts(prev => prev.map(p => p.id === row.id ? { ...p, featured: !p.featured } : p))}
                                                className={`text-[10px] font-black px-2 py-0.5 rounded ${row.featured ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'}`}
                                            >
                                                {row.featured ? 'FEATURED' : 'NORMAL'}
                                            </button>
                                        </td>
                                        <td className="text-xs">{row.date}</td>
                                        <td className="text-xs">{row.author}</td>
                                        <td>
                                            <div className="flex gap-1">
                                                <button className="admin-action-btn" title="View" onClick={() => setPreview(row)}><FiEye size={13} /></button>
                                                <button className="admin-action-btn" title="Edit"><FiEdit2 size={13} /></button>
                                                {row.status === "In Review" && (
                                                    <>
                                                        <button
                                                            onClick={() => handleApprove(row.id)}
                                                            className="admin-action-btn !text-green-600 !border-green-200 hover:!bg-green-50"
                                                            title="Approve"
                                                        >
                                                            <FiCheckCircle size={13} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(row.id)}
                                                            className="admin-action-btn delete"
                                                            title="Reject"
                                                        >
                                                            <FiXCircle size={13} />
                                                        </button>
                                                    </>
                                                )}
                                                <button className="admin-action-btn delete" title="Delete"><FiTrash2 size={13} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <PreviewDrawer
                post={preview}
                onClose={() => setPreview(null)}
                onApprove={handleApprove}
                onReject={handleReject}
            />
        </>
    );
}
