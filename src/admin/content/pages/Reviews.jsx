import { FiEye, FiEdit2, FiTrash2, FiPlus, FiStar } from "react-icons/fi";

const REVIEWS = [
    { id: "01", title: "Valorant — The Perfect Tactical Shooter", game: "Valorant", rating: "9/10", status: "Published", updated: "2 Days Ago", author: "Editor One" },
    { id: "02", title: "Cyberpunk 2077 Redeeming Arc 2025", game: "Cyberpunk", rating: "8/10", status: "Draft", updated: "4 Days Ago", author: "Admin Name" },
    { id: "03", title: "God of War Ragnarok — Epic Conclusion", game: "GoW Ragnarok", rating: "10/10", status: "Published", updated: "1 Week Ago", author: "Editor Two" },
    { id: "04", title: "Apex Legends Season 20 — What's New?", game: "Apex Legends", rating: "7/10", status: "In Review", updated: "3 Days Ago", author: "Editor One" },
    { id: "05", title: "Fortnite Chapter 6 — Worth Returning?", game: "Fortnite", rating: "6/10", status: "Draft", updated: "5 Days Ago", author: "Admin Name" },
];

function StatusBadge({ status }) {
    const cls = {
        Published: "admin-badge admin-badge-published",
        Draft: "admin-badge admin-badge-draft",
        "In Review": "admin-badge admin-badge-review",
    }[status] ?? "admin-badge";
    return <span className={cls}>{status}</span>;
}

export default function Reviews() {
    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
                <h1 className="admin-page-title" style={{ marginBottom: 0 }}>Reviews</h1>
                <button className="admin-btn-primary"><FiPlus size={13} /> Write Review</button>
            </div>

            <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
                <div className="admin-list-header" style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--admin-border)" }}>
                    <span className="admin-list-title">Reviews</span>
                </div>
                <div className="admin-table-wrap" style={{ border: "none", borderRadius: 0 }}>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>S No.</th>
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
                            {REVIEWS.map(row => (
                                <tr key={row.id}>
                                    <td style={{ color: "var(--admin-text-muted)", fontSize: "0.75rem" }}>{row.id}</td>
                                    <td style={{ fontWeight: 600, color: "var(--admin-text-primary)" }}>{row.title}</td>
                                    <td>{row.game}</td>
                                    <td>
                                        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "var(--admin-accent)" }}>
                                            <FiStar size={12} />
                                            <span style={{ fontWeight: 700, fontSize: "0.8125rem" }}>{row.rating}</span>
                                        </div>
                                    </td>
                                    <td><StatusBadge status={row.status} /></td>
                                    <td>{row.updated}</td>
                                    <td>{row.author}</td>
                                    <td>
                                        <div style={{ display: "flex", gap: "0.25rem" }}>
                                            <button className="admin-action-btn" title="View"><FiEye size={13} /></button>
                                            <button className="admin-action-btn" title="Edit"><FiEdit2 size={13} /></button>
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
