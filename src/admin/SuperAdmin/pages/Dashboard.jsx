import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEdit2, FiTrash2, FiPlus, FiFilter, FiChevronUp, FiCheckCircle, FiXCircle, FiAlertTriangle } from "react-icons/fi";
import { mockApiService } from "../../../public/services/mockApiService";

const TYPE_FILTERS = ["All", "Game", "News", "Blog", "Esports", "Community"];

function StatusBadge({ status }) {
    const cls = {
        Published: "admin-badge admin-badge-published",
        Draft: "admin-badge admin-badge-draft",
        "In Review": "admin-badge admin-badge-review",
        Pending: "admin-badge bg-orange-100 text-orange-700",
        Approved: "admin-badge admin-badge-published",
        Rejected: "admin-badge bg-red-50 text-red-600",
        Flagged: "admin-badge bg-red-50 text-red-600",
    }[status] ?? "admin-badge";
    return <span className={cls}>{status}</span>;
}

export default function Dashboard() {
    const [filter, setFilter] = useState("All");
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState([]);
    const [contentList, setContentList] = useState([]);
    const [approvals, setApprovals] = useState([]);

    useEffect(() => {
        const load = async () => {
            const [games, blogs, tournaments, community, proofs] = await Promise.all([
                mockApiService.getAllGames(),
                mockApiService.getAllBlogs(),
                mockApiService.getAllTournaments(),
                mockApiService.getAllCommunityPosts(),
                mockApiService.getAllProofs()
            ]);

            // Calculate Stats
            const total = games.length + blogs.length + community.length;
            const published = [...games, ...blogs, ...community].filter(x => x.status === 'Published').length;
            const drafts = [...games, ...blogs, ...community].filter(x => x.status === 'Draft').length;
            const inReview = [...games, ...blogs].filter(x => x.status === 'In Review').length;
            const flagged = community.filter(x => x.status === 'Flagged').length;

            setStats([
                { label: "Total Posts", value: total, color: "text-[var(--theme-primary)]" },
                { label: "Published", value: published, color: "text-green-600" },
                { label: "Drafts", value: drafts, color: "text-[var(--theme-text-muted)]" },
                { label: "In Review", value: inReview, color: "text-yellow-600" },
                { label: "Pending Approvals", value: proofs.filter(p => p.status === 'Pending Review').length, color: "text-orange-500" },
                { label: "Flagged", value: flagged, color: "text-red-500" },
            ]);

            // Calculate Content List (Latest items)
            const combined = [
                ...games.map(g => ({ ...g, type: 'Game', updated: 'Recently' })),
                ...blogs.map(b => ({ ...b, type: b.category === 'Industry' ? 'News' : 'Blog', updated: 'Recently' })),
                ...tournaments.map(t => ({ id: t.id, title: t.name, type: 'Esports', status: t.status, updated: 'Recently', author: 'System' })),
                ...community.map(c => ({ ...c, type: 'Community', updated: 'Recently' }))
            ].sort((a, b) => (b.id > a.id ? 1 : -1)).slice(0, 10);

            setContentList(combined);

            // Calculate Approvals Queue
            const queue = [
                ...proofs.filter(p => p.status === 'Pending Review').map(p => ({ id: p.id, user: p.user, type: 'Skill Proof', item: p.skill, submitted: p.submitted, status: 'Pending' })),
                ...community.filter(c => c.status === 'Flagged').map(c => ({ id: c.id, user: c.author, type: 'Flagged Post', item: c.title, submitted: c.updated, status: 'Pending' }))
            ];
            setApprovals(queue);

            setLoading(false);
        };
        load();
    }, []);

    const handleApproval = async (id, action, type) => {
        if (type === 'Skill Proof') {
            await mockApiService.updateProof(id, { status: action === 'approve' ? 'Approved' : 'Rejected' });
        } else if (type === 'Flagged Post') {
            await mockApiService.updateCommunityPost(id, { status: action === 'approve' ? 'Published' : 'Draft' });
        }
        setApprovals(prev => prev.map(p => p.id === id ? { ...p, status: action === 'approve' ? 'Approved' : 'Rejected' } : p));
    };

    const filtered = filter === "All"
        ? contentList
        : contentList.filter(r => r.type === filter || r.status === filter);

    if (loading) return <div className="p-20 text-center animate-pulse text-[var(--theme-text-muted)] font-black uppercase tracking-widest">ANALYZING SPHERE ECOSYSTEM...</div>;

    return (
        <div>
            <h1 className="admin-page-title">Dashboard</h1>

            {/* ── 6 Stat Cards ─────────────────────────────── */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {stats.map(({ label, value, color }) => (
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
                <Link to="/content-admin/news" className="admin-btn-outline-accent no-underline">
                    <FiPlus size={12} /> Write Blog
                </Link>
                <Link to="/content-admin/community" className="admin-btn-outline-accent no-underline">
                    <FiPlus size={12} /> Community Post
                </Link>
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
                                <th>ID</th><th>Title</th><th>Type</th>
                                <th>Status</th><th>Updated</th><th>Author</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan="7" className="text-center py-6 text-gray-400">No content found matching filter.</td></tr>
                            ) : filtered.map(row => (
                                <tr key={row.id}>
                                    <td className="text-[var(--theme-text-muted)] text-xs">{row.id}</td>
                                    <td className="font-semibold text-[var(--theme-text)]">{row.title}</td>
                                    <td>{row.type}</td>
                                    <td><StatusBadge status={row.status} /></td>
                                    <td className="text-xs">{row.updated}</td>
                                    <td className="text-xs">{row.author}</td>
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
                        <Link to="/content-admin/profiles" className="admin-filter-btn text-xs">
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
                            {approvals.length === 0 ? (
                                <tr><td colSpan="6" className="text-center py-6 text-gray-400">Queue is empty. Everything is approved!</td></tr>
                            ) : approvals.map(row => (
                                <tr key={row.id}>
                                    <td className="font-semibold text-[var(--theme-text)]">{row.user}</td>
                                    <td className="text-xs">{row.type}</td>
                                    <td className="text-[var(--theme-text-muted)] text-xs max-w-[200px] truncate">{row.item}</td>
                                    <td className="text-xs text-[var(--theme-text-muted)]">{row.submitted}</td>
                                    <td>
                                        <StatusBadge status={row.status} />
                                    </td>
                                    <td>
                                        {row.status === "Pending" ? (
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => handleApproval(row.id, "approve", row.type)}
                                                    className="admin-action-btn !text-green-600 !border-green-200 hover:!bg-green-50"
                                                    title="Approve"
                                                >
                                                    <FiCheckCircle size={13} />
                                                </button>
                                                <button
                                                    onClick={() => handleApproval(row.id, "reject", row.type)}
                                                    className="admin-action-btn delete"
                                                    title="Reject"
                                                >
                                                    <FiXCircle size={13} />
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-[var(--theme-text-muted)] font-bold">{row.status === 'Approved' ? 'PASS' : 'FAIL'}</span>
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
