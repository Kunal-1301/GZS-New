import { useState, useEffect } from "react";
import { FiEye, FiEdit2, FiTrash2, FiPlus, FiCheckCircle, FiXCircle, FiFilter } from "react-icons/fi";
import { mockApiService } from "../../../public/services/mockApiService";

const FILTERS = ["All", "Published", "Draft", "In Review"];
const CATS = ["All", "Game Updates", "Hardware", "Industry", "Announcements", "Blog Post"];

function StatusBadge({ status }) {
    const cls = {
        Published: "admin-badge admin-badge-published",
        Draft: "admin-badge admin-badge-draft",
        "In Review": "admin-badge admin-badge-review",
    }[status] ?? "admin-badge";
    return <span className={cls}>{status}</span>;
}

export default function News() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const [catFilter, setCatFilter] = useState("All");

    useEffect(() => {
        const load = async () => {
            const data = await mockApiService.getAllBlogs();
            setNews(data);
            setLoading(false);
        };
        load();
    }, []);

    const handleUpdate = async (id, data) => {
        await mockApiService.updateBlog(id, data);
        setNews(prev => prev.map(n => n.id === id ? { ...n, ...data } : n));
    };

    const handleAction = (id, status) => handleUpdate(id, { status });
    const toggleFeatured = (id, current) => handleUpdate(id, { featured: !current });

    const filtered = news.filter(n => {
        const matchesStatus = filter === "All" || n.status === filter;
        const matchesCat = catFilter === "All" || n.category === catFilter;
        return matchesStatus && matchesCat;
    });

    if (loading) return <div className="p-20 text-center animate-pulse text-[var(--theme-text-muted)] font-black uppercase tracking-widest">FETCHING EDITORIAL DATA...</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="admin-page-title mb-0">NEWS & BLOGS</h1>
                <div className="flex gap-2">
                    <button className="admin-btn-outline-accent"><FiPlus size={13} /> WRITE BLOG</button>
                    <button className="admin-btn-primary"><FiPlus size={13} /> WRITE NEWS</button>
                </div>
            </div>

            <div className="admin-list-card">
                <div className="admin-list-header flex-col md:flex-row gap-4 items-start md:items-center">
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
                    <div className="flex items-center gap-2 ml-auto">
                        <span className="text-[10px] uppercase font-black tracking-widest text-[var(--theme-text-muted)]">Category:</span>
                        <select
                            value={catFilter}
                            onChange={(e) => setCatFilter(e.target.value)}
                            className="bg-transparent border border-[var(--theme-border)] text-[var(--theme-text)] text-xs font-bold px-3 py-1.5 rounded-lg outline-none"
                        >
                            {CATS.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>#</th><th>Title</th><th>Category</th>
                                <th>Status</th><th>Featured</th><th>Updated</th><th>Author</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan="8" className="text-center py-6 text-[var(--theme-text-muted)]">No items found.</td></tr>
                            ) : filtered.map(row => (
                                <tr key={row.id}>
                                    <td className="text-[var(--theme-text-muted)] text-xs">{row.id}</td>
                                    <td className="font-semibold text-[var(--theme-text)]">{row.title}</td>
                                    <td className="text-xs">{row.category}</td>
                                    <td><StatusBadge status={row.status} /></td>
                                    <td>
                                        <button
                                            onClick={() => setNews(prev => prev.map(n => n.id === row.id ? { ...n, featured: !n.featured } : n))}
                                            className={`text-[10px] font-black px-2 py-0.5 rounded ${row.featured ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'}`}
                                        >
                                            {row.featured ? 'FEATURED' : 'NORMAL'}
                                        </button>
                                    </td>
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
