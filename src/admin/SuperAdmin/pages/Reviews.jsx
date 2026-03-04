import { useState } from "react";
import { FiEye, FiEdit2, FiTrash2, FiPlus, FiStar, FiCheckCircle, FiXCircle } from "react-icons/fi";

const INITIAL_REVIEWS = [
    { id: "01", title: "Valorant — The Perfect Tactical Shooter", game: "Valorant", rating: "9/10", status: "Published", updated: "2 Days Ago", author: "Editor One" },
    { id: "02", title: "Cyberpunk 2077 Redeeming Arc 2025", game: "Cyberpunk", rating: "8/10", status: "Draft", updated: "4 Days Ago", author: "Admin Name" },
    { id: "03", title: "God of War Ragnarok — Epic Conclusion", game: "GoW Ragnarok", rating: "10/10", status: "Published", updated: "1 Week Ago", author: "Editor Two" },
    { id: "04", title: "Apex Legends Season 20 — What's New?", game: "Apex Legends", rating: "7/10", status: "In Review", updated: "3 Days Ago", author: "Editor One" },
    { id: "05", title: "Fortnite Chapter 6 — Worth Returning?", game: "Fortnite", rating: "6/10", status: "Draft", updated: "5 Days Ago", author: "Admin Name" },
];

const FILTERS = ["All", "Published", "Draft", "In Review"];

function StatusBadge({ status }) {
    const cls = {
        Published: "admin-badge admin-badge-published",
        Draft: "admin-badge admin-badge-draft",
        "In Review": "admin-badge admin-badge-review",
    }[status] ?? "admin-badge";
    return <span className={cls}>{status}</span>;
}

export default function Reviews() {
    const [reviews, setReviews] = useState(INITIAL_REVIEWS);
    const [filter, setFilter] = useState("All");

    const handleAction = (id, status) => {
        setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    };

    const filtered = filter === "All" ? reviews : reviews.filter(r => r.status === filter);

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="admin-page-title mb-0">GAME REVIEWS</h1>
                <button className="admin-btn-primary"><FiPlus size={13} /> WRITE REVIEW</button>
            </div>

            <div className="admin-list-card">
                <div className="admin-list-header">
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
                                <th>#</th>
                                <th>Review Title</th>
                                <th>Game</th>
                                <th>Rating</th>
                                <th>Status</th>
                                <th>Updated</th>
                                <th>Author</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan="8" className="text-center py-6 text-[var(--theme-text-muted)]">No reviews found.</td></tr>
                            ) : filtered.map(row => (
                                <tr key={row.id}>
                                    <td className="text-[var(--theme-text-muted)] text-xs">{row.id}</td>
                                    <td className="font-semibold text-[var(--theme-text)]">{row.title}</td>
                                    <td className="text-xs">{row.game}</td>
                                    <td>
                                        <div className="flex items-center gap-1 text-[var(--theme-primary)]">
                                            <FiStar size={12} fill="currentColor" />
                                            <span className="font-bold text-xs">{row.rating}</span>
                                        </div>
                                    </td>
                                    <td><StatusBadge status={row.status} /></td>
                                    <td className="text-xs">{row.updated}</td>
                                    <td className="text-xs">{row.author}</td>
                                    <td>
                                        <div className="flex gap-1">
                                            <button className="admin-action-btn" title="View"><FiEye size={13} /></button>
                                            <button className="admin-action-btn" title="Edit"><FiEdit2 size={13} /></button>
                                            {row.status === 'In Review' && (
                                                <>
                                                    <button
                                                        className="admin-action-btn !text-green-600 hover:!bg-green-50"
                                                        title="Approve"
                                                        onClick={() => handleAction(row.id, 'Published')}
                                                    >
                                                        <FiCheckCircle size={13} />
                                                    </button>
                                                    <button
                                                        className="admin-action-btn delete"
                                                        title="Reject"
                                                        onClick={() => handleAction(row.id, 'Draft')}
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
    );
}
