import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEdit2, FiTrash2, FiPlus, FiFilter, FiChevronUp } from "react-icons/fi";

const GAME_POSTS = [
    { id: "01", title: "Uncharted 4 : The Thief's End", status: "Published", updated: "19 Hrs Ago", author: "Admin Name" },
    { id: "02", title: "Detroit : Become Human", status: "Published", updated: "2 Days Ago", author: "Admin Name" },
    { id: "03", title: "A Way Out", status: "Draft", updated: "5 Days Ago", author: "Admin Name" },
    { id: "04", title: "Marvels : Spiderman Remastered", status: "Published", updated: "1 Month Ago", author: "Admin Name" },
    { id: "05", title: "Valorant", status: "Published", updated: "3 Days Ago", author: "Admin Name" },
    { id: "06", title: "CS:GO 2 — Counter Strike", status: "In Review", updated: "6 Days Ago", author: "Editor One" },
    { id: "07", title: "Cyberpunk 2077", status: "Published", updated: "2 Weeks Ago", author: "Admin Name" },
    { id: "08", title: "God of War Ragnarok", status: "Draft", updated: "3 Weeks Ago", author: "Editor One" },
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

export default function GamePostsList() {
    const [filter, setFilter] = useState("All");
    const filtered = filter === "All" ? GAME_POSTS : GAME_POSTS.filter(r => r.status === filter);

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="admin-page-title mb-0">Game Posts</h1>
                <Link to="/admin" className="admin-btn-primary no-underline">
                    <FiPlus size={13} /> New Game Post
                </Link>
            </div>

            <div className="overflow-hidden rounded-xl border border-admin-border bg-admin-card shadow-sm">
                <div className="admin-list-header px-5 py-4 border-b border-admin-border">
                    <span className="admin-list-title">Game Posts List</span>
                    <div className="flex gap-2 flex-wrap">
                        {FILTERS.map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`admin-filter-btn ${filter === f ? "!bg-admin-accent !text-admin-accent-text !border-admin-accent" : ""}`}
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
                        <thead><tr>
                            <th>S No.</th><th>Title</th><th>Status</th><th>Updated</th><th>Author</th><th>Actions</th>
                        </tr></thead>
                        <tbody>
                            {filtered.map(row => (
                                <tr key={row.id}>
                                    <td className="text-admin-text-muted text-xs">{row.id}</td>
                                    <td className="font-semibold text-admin-text">{row.title}</td>
                                    <td><StatusBadge status={row.status} /></td>
                                    <td>{row.updated}</td>
                                    <td>{row.author}</td>
                                    <td>
                                        <div className="flex gap-1">
                                            <button className="admin-action-btn"><FiEye size={13} /></button>
                                            <button className="admin-action-btn"><FiEdit2 size={13} /></button>
                                            <button className="admin-action-btn delete"><FiTrash2 size={13} /></button>
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
