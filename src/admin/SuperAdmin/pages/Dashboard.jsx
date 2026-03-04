import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEdit2, FiTrash2, FiPlus, FiFilter, FiChevronUp, FiCheckCircle, FiXCircle, FiAlertTriangle } from "react-icons/fi";

/* ── Dummy Data ──────────────────────────────────────────── */
const STATS = [
    { label: "Total Posts", value: 28, color: "text-[var(--theme-primary)]" },
    { label: "Published", value: 16, color: "text-green-600" },
    { label: "Drafts", value: 8, color: "text-[var(--theme-text-muted)]" },
    { label: "In Review", value: 2, color: "text-yellow-600" },
    { label: "Pending Approvals", value: 18, color: "text-orange-500" },
    { label: "Flagged", value: 3, color: "text-red-500" },
];

const CONTENT_LIST = [
    { id: "01", title: "Uncharted 4 : The Thief's End", type: "Game", status: "Published", updated: "19 Hrs Ago", author: "Admin Name" },
    { id: "02", title: "Detroit : Become Human", type: "Game", status: "Published", updated: "2 Days Ago", author: "Admin Name" },
    { id: "03", title: "A Way Out", type: "Game", status: "Draft", updated: "5 Days Ago", author: "Admin Name" },
    { id: "04", title: "Marvels : Spiderman Remastered", type: "Game", status: "Published", updated: "1 Month Ago", author: "Admin Name" },
    { id: "05", title: "Valorant Season 10 Update", type: "News", status: "Published", updated: "3 Days Ago", author: "Editor One" },
    { id: "06", title: "Best FPS Settings 2026", type: "Blog", status: "Draft", updated: "1 Week Ago", author: "Admin Name" },
    { id: "07", title: "ESL One Spring 2026", type: "Esports", status: "In Review", updated: "2 Hrs Ago", author: "Editor Two" },
    { id: "08", title: "Community Spotlight — March", type: "Community", status: "Draft", updated: "12 Days Ago", author: "Admin Name" },
];

const PENDING_APPROVALS = [
    { id: "P1", user: "khali_gaming", type: "Skill Proof", item: "Stylized Character Anatomy", submitted: "1 Hr Ago" },
    { id: "P2", user: "team_phoenix5", type: "Esports Reg.", item: "BGMI Invitational", submitted: "3 Hrs Ago" },
    { id: "P3", user: "creator_xyz", type: "Blog Post", item: "Top 10 Indie Games of 2026", submitted: "5 Hrs Ago" },
    { id: "P4", user: "user_alpha", type: "Skill Proof", item: "Environment Design", submitted: "1 Day Ago" },
    { id: "P5", user: "Team Titans", type: "Esports Reg.", item: "BFA Ready Championship", submitted: "2 Days Ago" },
];

const TYPE_FILTERS = ["All", "Game", "News", "Blog", "Esports", "Community"];

/* ── Sub-components ──────────────────────────────────────── */
function StatusBadge({ status }) {
    const cls = {
        Published: "admin-badge admin-badge-published",
        Draft: "admin-badge admin-badge-draft",
        "In Review": "admin-badge admin-badge-review",
        Pending: "admin-badge bg-orange-100 text-orange-700",
        Flagged: "admin-badge bg-red-50 text-red-600",
    }[status] ?? "admin-badge";
    return <span className={cls}>{status}</span>;
}

/* ── Component ───────────────────────────────────────────── */
export default function Dashboard() {
    const [filter, setFilter] = useState("All");
    const [approvals, setApprovals] = useState(
        PENDING_APPROVALS.map(p => ({ ...p, status: "Pending" }))
    );

    const filtered = filter === "All"
        ? CONTENT_LIST
        : CONTENT_LIST.filter(r => r.type === filter || r.status === filter);

    const handleApproval = (id, action) => {
        setApprovals(prev => prev.map(p =>
            p.id === id ? { ...p, status: action === "approve" ? "Approved" : "Rejected" } : p
        ));
    };

    return (
        <div>
            <h1 className="admin-page-title">Dashboard</h1>

            {/* ── 6 Stat Cards ─────────────────────────────── */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {STATS.map(({ label, value, color }) => (
                    <div key={label} className="admin-stat-card">
                        <div className={`admin-stat-number ${color}`}>{value}</div>
                        <div className="admin-stat-label">{label}</div>
                    </div>
                ))}
            </div>

            {/* ── Quick Actions ─────────────────────────────── */}
            <div className="admin-quick-actions mb-8">
                <span className="admin-quick-label">Quick Actions</span>
                <Link to="/admin" className="admin-btn-outline-accent">
                    <FiPlus size={12} /> Create Game Post
                </Link>
                <button className="admin-btn-outline-accent">
                    <FiPlus size={12} /> Write Blog
                </button>
                <button className="admin-btn-outline-accent">
                    <FiPlus size={12} /> Community Post
                </button>
                <Link to="/content-admin/profiles/proofs" className="admin-btn-outline-accent">
                    <FiAlertTriangle size={12} /> Review Skill Proofs
                </Link>
            </div>

            {/* ── Content List ──────────────────────────────── */}
            <div className="admin-list-card mb-8">
                <div className="admin-list-header">
                    <span className="admin-list-title">Content List</span>
                    <div className="flex gap-2 flex-wrap">
                        {TYPE_FILTERS.map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`admin-filter-btn ${filter === f
                                    ? "!bg-[var(--theme-primary)] !text-[var(--theme-text-inverse)] !border-[var(--theme-primary)]"
                                    : ""}`}
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
                                <th>S No.</th><th>Title</th><th>Type</th>
                                <th>Status</th><th>Updated</th><th>Author</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(row => (
                                <tr key={row.id}>
                                    <td className="text-[var(--theme-text-muted)] text-xs">{row.id}</td>
                                    <td className="font-semibold text-[var(--theme-text)]">{row.title}</td>
                                    <td>{row.type}</td>
                                    <td><StatusBadge status={row.status} /></td>
                                    <td>{row.updated}</td>
                                    <td>{row.author}</td>
                                    <td>
                                        <div className="flex gap-1">
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

            {/* ── Pending Approvals Queue ───────────────────── */}
            <div className="admin-list-card">
                <div className="admin-list-header">
                    <span className="admin-list-title flex items-center gap-2">
                        <FiAlertTriangle size={14} className="text-orange-500" />
                        Pending Approvals
                    </span>
                    <div className="flex gap-2">
                        <Link to="/content-admin/profiles/proofs" className="admin-filter-btn text-xs">
                            View All →
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>User</th><th>Type</th><th>Item</th>
                                <th>Submitted</th><th>Status</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {approvals.map(row => (
                                <tr key={row.id}>
                                    <td className="font-semibold text-[var(--theme-text)]">{row.user}</td>
                                    <td className="text-xs">{row.type}</td>
                                    <td className="text-[var(--theme-text-muted)] text-xs max-w-[200px] truncate">{row.item}</td>
                                    <td className="text-xs text-[var(--theme-text-muted)]">{row.submitted}</td>
                                    <td>
                                        {row.status === "Pending" ? (
                                            <span className="admin-badge bg-orange-100 text-orange-700">Pending</span>
                                        ) : row.status === "Approved" ? (
                                            <span className="admin-badge admin-badge-published">Approved</span>
                                        ) : (
                                            <span className="admin-badge bg-red-50 text-red-600">Rejected</span>
                                        )}
                                    </td>
                                    <td>
                                        {row.status === "Pending" ? (
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => handleApproval(row.id, "approve")}
                                                    className="admin-action-btn !text-green-600 !border-green-200 hover:!bg-green-50"
                                                    title="Approve"
                                                >
                                                    <FiCheckCircle size={13} />
                                                </button>
                                                <button
                                                    onClick={() => handleApproval(row.id, "reject")}
                                                    className="admin-action-btn delete"
                                                    title="Reject"
                                                >
                                                    <FiXCircle size={13} />
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-[var(--theme-text-muted)]">Done</span>
                                        )}
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
