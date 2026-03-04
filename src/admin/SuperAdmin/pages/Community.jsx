import { useState } from "react";
import { FiEye, FiEdit2, FiTrash2, FiPlus, FiCheckCircle, FiXCircle, FiFlag, FiMinusCircle } from "react-icons/fi";

const INITIAL_POSTS = [
    { id: "01", title: "Best Settings for Valorant Ranked 2026", type: "Tips", status: "Published", updated: "1 Day Ago", author: "User123" },
    { id: "02", title: "My Journey from Silver to Diamond", type: "Story", status: "Published", updated: "3 Days Ago", author: "GamerX" },
    { id: "03", title: "Looking for teammates — APAC Servers", type: "LFG", status: "Published", updated: "5 Hrs Ago", author: "ProPlayer1" },
    { id: "04", title: "Is Apex Legends dying in 2026?", type: "Discussion", status: "Flagged", updated: "2 Days Ago", author: "User456" },
    { id: "05", title: "Community Event — Weekly Challenge", type: "Event", status: "In Review", updated: "6 Hrs Ago", author: "Admin Name" },
    { id: "06", title: "New cheat detected?? See this video", type: "Discussion", status: "Flagged", updated: "1 Hr Ago", author: "ToxicGamer99" },
];

const FILTERS = ["All", "Published", "Draft", "In Review", "Flagged"];

function StatusBadge({ status }) {
    const cls = {
        Published: "admin-badge admin-badge-published",
        Draft: "admin-badge admin-badge-draft",
        "In Review": "admin-badge admin-badge-review",
        Flagged: "admin-badge bg-red-50 text-red-600",
    }[status] ?? "admin-badge";
    return <span className={cls}>{status}</span>;
}

export default function Community() {
    const [posts, setPosts] = useState(INITIAL_POSTS);
    const [filter, setFilter] = useState("All");
    const [selected, setSelected] = useState([]);

    const handleAction = (id, status) => {
        setPosts(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    };

    const filtered = filter === "All" ? posts : posts.filter(r => r.status === filter);

    const toggleSelect = (id) =>
        setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

    const bulkAction = (status) => {
        setPosts(prev => prev.map(p => selected.includes(p.id) ? { ...p, status } : p));
        setSelected([]);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="admin-page-title mb-0">COMMUNITY MODERATION</h1>
                <button className="admin-btn-primary"><FiPlus size={13} /> New Admin Post</button>
            </div>

            {/* Bulk Action Bar */}
            {selected.length > 0 && (
                <div className="mb-4 p-3 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center gap-3">
                    <span className="text-xs font-bold text-indigo-700">{selected.length} posts selected</span>
                    <button onClick={() => bulkAction('Published')} className="admin-btn-primary py-1 px-4 text-[10px]"><FiCheckCircle size={10} /> BULK APPROVE</button>
                    <button onClick={() => bulkAction('Draft')} className="admin-btn-outline-accent py-1 px-4 text-[10px] text-red-600 border-red-300 hover:bg-red-50"><FiXCircle size={10} /> BULK REJECT</button>
                    <button onClick={() => setSelected([])} className="ml-auto text-[var(--theme-text-muted)] hover:text-red-500"><FiMinusCircle size={16} /></button>
                </div>
            )}

            <div className="admin-list-card">
                <div className="admin-list-header flex-wrap gap-2">
                    <div className="flex gap-2 flex-wrap">
                        {FILTERS.map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`admin-filter-btn ${filter === f ? "!bg-[var(--theme-primary)] !text-white" : ""}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Select</th><th>#</th><th>Title</th><th>Type</th>
                                <th>Status</th><th>Updated</th><th>Author</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan="8" className="text-center py-6 text-[var(--theme-text-muted)]">No posts found.</td></tr>
                            ) : filtered.map(row => (
                                <tr key={row.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(row.id)}
                                            onChange={() => toggleSelect(row.id)}
                                            className="accent-indigo-600"
                                        />
                                    </td>
                                    <td className="text-[var(--theme-text-muted)] text-xs">{row.id}</td>
                                    <td className={`font-semibold ${row.status === 'Flagged' ? 'text-red-600' : 'text-[var(--theme-text)]'}`}>{row.title}</td>
                                    <td className="text-xs">{row.type}</td>
                                    <td><StatusBadge status={row.status} /></td>
                                    <td className="text-xs">{row.updated}</td>
                                    <td className="text-xs font-bold">{row.author}</td>
                                    <td>
                                        <div className="flex gap-1">
                                            <button className="admin-action-btn" title="View Detail"><FiEye size={13} /></button>
                                            <button className="admin-action-btn" title="Edit Content"><FiEdit2 size={13} /></button>
                                            {row.status !== 'Published' && (
                                                <button onClick={() => handleAction(row.id, 'Published')} className="admin-action-btn !text-green-600 hover:!bg-green-50" title="Approve"><FiCheckCircle size={13} /></button>
                                            )}
                                            {row.status !== 'Flagged' && (
                                                <button onClick={() => handleAction(row.id, 'Flagged')} className="admin-action-btn !text-orange-600 hover:!bg-orange-50" title="Flag Post"><FiFlag size={13} /></button>
                                            )}
                                            <button className="admin-action-btn delete" title="Delete Permanently"><FiTrash2 size={13} /></button>
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
