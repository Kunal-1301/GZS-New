import { FiEye, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

const COMMUNITY_POSTS = [
    { id: "01", title: "Best Settings for Valorant Ranked 2026", type: "Tips", status: "Published", updated: "1 Day Ago", author: "User123" },
    { id: "02", title: "My Journey from Silver to Diamond", type: "Story", status: "Published", updated: "3 Days Ago", author: "GamerX" },
    { id: "03", title: "Looking for teammates — APAC Servers", type: "LFG", status: "Published", updated: "5 Hrs Ago", author: "ProPlayer1" },
    { id: "04", title: "Is Apex Legends dying in 2026?", type: "Discussion", status: "Draft", updated: "2 Days Ago", author: "User456" },
    { id: "05", title: "Community Event — Weekly Challenge", type: "Event", status: "In Review", updated: "6 Hrs Ago", author: "Admin Name" },
];

function StatusBadge({ status }) {
    const cls = {
        Published: "admin-badge admin-badge-published",
        Draft: "admin-badge admin-badge-draft",
        "In Review": "admin-badge admin-badge-review",
    }[status] ?? "admin-badge";
    return <span className={cls}>{status}</span>;
}

export default function Community() {
    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
                <h1 className="admin-page-title" style={{ marginBottom: 0 }}>Community</h1>
                <button className="admin-btn-primary"><FiPlus size={13} /> New Post</button>
            </div>

            <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
                <div className="admin-list-header" style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--admin-border)" }}>
                    <span className="admin-list-title">Community Posts</span>
                </div>
                <div className="admin-table-wrap" style={{ border: "none", borderRadius: 0 }}>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>S No.</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Updated</th>
                                <th>Author</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {COMMUNITY_POSTS.map(row => (
                                <tr key={row.id}>
                                    <td style={{ color: "var(--admin-text-muted)", fontSize: "0.75rem" }}>{row.id}</td>
                                    <td style={{ fontWeight: 600, color: "var(--admin-text-primary)" }}>{row.title}</td>
                                    <td>{row.type}</td>
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
