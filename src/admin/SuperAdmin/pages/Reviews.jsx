import { useState, useEffect } from "react";
import { FiEye, FiEdit2, FiTrash2, FiPlus, FiStar, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { mockApiService } from "../../../public/services/mockApiService";

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
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        const load = async () => {
            const data = await mockApiService.getAllReviews();
            setReviews(data);
            setLoading(false);
        };
        load();
    }, []);

    const handleAction = async (id, status) => {
        await mockApiService.updateReview(id, { status });
        setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this review permanently?")) return;
        await mockApiService.deleteReview(id);
        setReviews(prev => prev.filter(r => r.id !== id));
    };

    const filtered = filter === "All" ? reviews : reviews.filter(r => r.status === filter);

    if (loading) return <div className="p-20 text-center animate-pulse text-[var(--theme-text-muted)] font-black uppercase tracking-widest">FETCHING REVIEWS...</div>;

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
                                            <button onClick={() => handleDelete(row.id)} className="admin-action-btn delete" title="Delete"><FiTrash2 size={13} /></button>
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
