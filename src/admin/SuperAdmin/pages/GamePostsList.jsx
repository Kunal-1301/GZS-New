import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEdit2, FiTrash2, FiPlus, FiFilter, FiChevronUp } from "react-icons/fi";

const FILTERS = ["All", "Published", "Draft"];

function StatusBadge({ status }) {
    const cls = {
        Published: "admin-badge admin-badge-published",
        Draft: "admin-badge admin-badge-draft",
    }[status] ?? "admin-badge";
    return <span className={cls}>{status}</span>;
}

export default function GamePostsList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        fetch('/api/gameposts')
            .then(res => res.json())
            .then(data => {
                const formatted = data.map(d => ({
                    id: d.game_post_id,
                    title: d.game_title || "Untitled Game",
                    status: d.saved_as_draft ? "Draft" : "Published",
                    date: d.published_at || "Not published",
                    author: "Admin",
                    slug: d.game_title ? d.game_title.toLowerCase().replace(/\s+/g, '-') : 'untitled'
                }));
                setPosts(formatted);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const filtered = filter === "All" ? posts : posts.filter(r => r.status === filter);

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="admin-page-title mb-0">Game Posts</h1>
                <Link to="/admin" className="admin-btn-primary no-underline">
                    <FiPlus size={13} /> New Game Post
                </Link>
            </div>

            <div className="admin-list-card">
                <div className="admin-list-header">
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
                            <th>ID</th><th>Title</th><th>Status</th><th>Published At</th><th>Actions</th>
                        </tr></thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5" className="text-center py-6 text-admin-text-muted">Loading posts...</td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan="5" className="text-center py-6 text-admin-text-muted">No posts found.</td></tr>
                            ) : filtered.map(row => (
                                <tr key={row.id}>
                                    <td className="text-admin-text-muted text-xs">{row.id}</td>
                                    <td className="font-semibold text-admin-text">{row.title}</td>
                                    <td><StatusBadge status={row.status} /></td>
                                    <td className="text-xs">{row.date ? new Date(row.date).toLocaleString() : 'N/A'}</td>
                                    <td>
                                        <div className="flex gap-1">
                                            <Link to={`/games/${row.id}`} target="_blank" className="admin-action-btn"><FiEye size={13} /></Link>
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
