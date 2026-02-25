import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEdit2, FiTrash2, FiPlus, FiFilter, FiChevronUp } from "react-icons/fi";

/* ── Dummy Data ──────────────────────────────────────────── */
const STATS = [
    { label: "Total Posts", value: 28 },
    { label: "Published", value: 16 },
    { label: "Drafts", value: 10 },
    { label: "In Review", value: 2 },
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

const TYPE_FILTERS = ["All", "Game", "News", "Blog", "Esports", "Community"];

function StatusBadge({ status }) {
    const cls = {
        Published: "admin-badge admin-badge-published",
        Draft: "admin-badge admin-badge-draft",
        "In Review": "admin-badge admin-badge-review",
    }[status] ?? "admin-badge";
    return <span className={cls}>{status}</span>;
}

/* ── Component ───────────────────────────────────────────── */
export default function Dashboard() {
    const [filter, setFilter] = useState("All");

    const filtered = filter === "All"
        ? CONTENT_LIST
        : CONTENT_LIST.filter(r => r.type === filter || r.status === filter);

    return (
        <div>
            <h1 className="admin-page-title">Dashboard</h1>

            {/* Stat Cards */}
            <div className="grid grid-cols-4 gap-4 mb-8">
                {STATS.map(({ label, value }) => (
                    <div key={label} className="admin-stat-card">
                        <div className="admin-stat-number">{value}</div>
                        <div className="admin-stat-label">{label}</div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="admin-quick-actions">
                <span className="admin-quick-label">What Do You Want To Do?</span>
                <Link to="/admin" className="admin-btn-outline-accent">
                    <FiPlus size={12} /> Create Game Post
                </Link>
                <button className="admin-btn-outline-accent">
                    <FiPlus size={12} /> Create News
                </button>
                <button className="admin-btn-outline-accent">
                    <FiPlus size={12} /> Create Community Post
                </button>
                <button className="admin-btn-outline-accent">
                    <FiPlus size={12} /> Write Review
                </button>
            </div>

            {/* Content List */}
            <div className="admin-list-card">

                {/* Header */}
                <div className="admin-list-header">
                    <span className="admin-list-title">Content List</span>
                    <div className="flex gap-2 flex-wrap">
                        {TYPE_FILTERS.map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`admin-filter-btn ${filter === f
                                        ? "!bg-admin-accent !text-admin-accent-text !border-admin-accent"
                                        : ""
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                        <button className="admin-filter-btn"><FiFilter size={11} /> Filters</button>
                        <button className="admin-filter-btn"><FiChevronUp size={11} /> Sort</button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
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
                            {filtered.map(row => (
                                <tr key={row.id}>
                                    <td className="text-admin-text-muted text-xs">{row.id}</td>
                                    <td className="font-semibold text-admin-text">{row.title}</td>
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
        </div>
    );
}
