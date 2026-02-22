import { FiEye, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

const NEWS_ITEMS = [
    { id: "01", title: "Valorant Episode 9 Act 2 — New Agent Revealed", category: "Game Updates", status: "Published", updated: "2 Hrs Ago", author: "Editor One" },
    { id: "02", title: "Sony Reveals PlayStation 6 Launch Window", category: "Hardware", status: "Published", updated: "1 Day Ago", author: "Admin Name" },
    { id: "03", title: "Xbox Game Pass Gets 15 New Titles in March", category: "Subscription", status: "Draft", updated: "2 Days Ago", author: "Editor Two" },
    { id: "04", title: "Steam Breaks Concurrent Users Record Again", category: "Industry", status: "Published", updated: "4 Days Ago", author: "Admin Name" },
    { id: "05", title: "GTA VI PC Version Confirmed for 2027", category: "Announcements", status: "In Review", updated: "1 Week Ago", author: "Editor One" },
];

function StatusBadge({ status }) {
    const cls = {
        Published: "admin-badge admin-badge-published",
        Draft: "admin-badge admin-badge-draft",
        "In Review": "admin-badge admin-badge-review",
    }[status] ?? "admin-badge";
    return <span className={cls}>{status}</span>;
}

export default function News() {
    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
                <h1 className="admin-page-title" style={{ marginBottom: 0 }}>News</h1>
                <button className="admin-btn-primary"><FiPlus size={13} /> Write News</button>
            </div>

            <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
                <div className="admin-list-header" style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--admin-border)" }}>
                    <span className="admin-list-title">News Articles</span>
                </div>
                <div className="admin-table-wrap" style={{ border: "none", borderRadius: 0 }}>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>S No.</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Updated</th>
                                <th>Author</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {NEWS_ITEMS.map(row => (
                                <tr key={row.id}>
                                    <td style={{ color: "var(--admin-text-muted)", fontSize: "0.75rem" }}>{row.id}</td>
                                    <td style={{ fontWeight: 600, color: "var(--admin-text-primary)" }}>{row.title}</td>
                                    <td>{row.category}</td>
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
