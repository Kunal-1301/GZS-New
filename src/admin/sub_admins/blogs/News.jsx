import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FiEdit2, FiTrash2, FiPlus, FiCheckCircle, FiSave, FiX } from "react-icons/fi";
import { mockApiService } from "@services/mockApiService";

const FILTERS = ["All", "Published", "Draft", "In Review"];
const CATS = ["All", "Game Updates", "Hardware", "Industry", "Announcements", "Reviews", "Technology"];

function StatusBadge({ status }) {
    const cls = {
        Published: "admin-badge admin-badge-published",
        Draft: "admin-badge admin-badge-draft",
        "In Review": "admin-badge admin-badge-review",
    }[status] ?? "admin-badge";
    return <span className={cls}>{status}</span>;
}

export default function News() {
    const queryClient = useQueryClient();
    const [filter, setFilter] = useState("All");
    const [catFilter, setCatFilter] = useState("All");

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        title: '', category: 'Industry', status: 'Draft', featured: false, description: '', author: 'Admin'
    });

    // Queries
    const { data: news = [], isLoading } = useQuery({
        queryKey: ['admin', 'blogs'],
        queryFn: mockApiService.getAllBlogs
    });

    // Mutations
    const saveMutation = useMutation({
        mutationFn: async (data) => {
            if (editingItem) return mockApiService.updateBlog(editingItem.id, data);
            return mockApiService.addBlog({
                ...data,
                updated: new Date().toISOString().split('T')[0],
                likes: 0
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['admin', 'blogs']);
            setIsModalOpen(false);
        }
    });

    const deleteMutation = useMutation({
        mutationFn: mockApiService.deleteBlog,
        onSuccess: () => queryClient.invalidateQueries(['admin', 'blogs'])
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, data }) => mockApiService.updateBlog(id, data),
        onSuccess: () => queryClient.invalidateQueries(['admin', 'blogs'])
    });

    const handleOpenModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title,
                category: item.category,
                status: item.status,
                featured: item.featured,
                description: item.description || '',
                author: item.author
            });
        } else {
            setEditingItem(null);
            setFormData({
                title: '', category: 'Industry', status: 'Draft', featured: false, description: '', author: 'Admin'
            });
        }
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            deleteMutation.mutate(id);
        }
    };

    const filtered = news.filter(n => {
        const matchesStatus = filter === "All" || n.status === filter;
        const matchesCat = catFilter === "All" || n.category === catFilter;
        return matchesStatus && matchesCat;
    });

    const stats = {
        total: news.length,
        published: news.filter(n => n.status === "Published").length,
        review: news.filter(n => n.status === "In Review").length,
        featured: news.filter(n => n.featured).length
    };

    if (isLoading) return <div className="p-20 text-center animate-pulse text-[var(--theme-text-muted)] font-black uppercase tracking-widest text-xs">FETCHING EDITORIAL DATA...</div>;

    return (
        <div className="animate-[fadeIn_0.5s_ease-out] space-y-8">
            <div className="flex items-center justify-between flex-wrap gap-6">
                <div>
                    <h1 className="text-3xl font-black text-neutral-900 tracking-tighter uppercase italic leading-none mb-1">EDITORIAL FLOW</h1>
                    <p className="text-[10px] text-neutral-400 font-black uppercase tracking-[0.3em] flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full animate-pulse" /> Content Management // Live Stream
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="admin-btn-primary px-8 py-4 !rounded-2xl shadow-xl shadow-indigo-600/20" onClick={() => handleOpenModal()}><FiPlus size={16} className="mr-2" /> WRITE BLOG</button>
                </div>
            </div>

            {/* --- QUICK STATS --- */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Articles", val: stats.total, color: "bg-indigo-50 text-indigo-600" },
                    { label: "Live Broadcasts", val: stats.published, color: "bg-green-50 text-green-600" },
                    { label: "Pending Review", val: stats.review, color: "bg-yellow-50 text-yellow-600" },
                    { label: "Featured Assets", val: stats.featured, color: "bg-purple-50 text-purple-600" },
                ].map((s, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                        <div className="text-2xl font-black text-neutral-900 mb-1">{s.val}</div>
                        <div className="text-[9px] uppercase font-black tracking-widest text-neutral-400 flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${s.color.split(' ')[0]}`} /> {s.label}
                        </div>
                    </div>
                ))}
            </div>

            <div className="admin-list-card">
                <div className="admin-list-header flex-col md:flex-row gap-4 items-start md:items-center p-6 border-b border-neutral-50">
                    <div className="flex gap-2 flex-wrap">
                        {FILTERS.map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? "bg-indigo-600 text-white shadow-lg" : "bg-neutral-50 text-neutral-400 border border-neutral-100"}`}
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
                            className="bg-transparent border border-[var(--theme-border)] text-[var(--theme-text)] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl outline-none"
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
                                <tr><td colSpan="8" className="text-center py-24 text-[var(--theme-text-muted)] text-[10px] font-black uppercase tracking-widest opacity-40">No Editorial Flows Found</td></tr>
                            ) : filtered.map(row => (
                                <tr key={row.id} className="hover:bg-neutral-50/50 transition-colors">
                                    <td className="text-[var(--theme-text-muted)] text-[10px] font-mono opacity-50">#BL-{row.id}</td>
                                    <td className="font-bold text-xs text-[var(--theme-text)]">{row.title}</td>
                                    <td className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{row.category}</td>
                                    <td><StatusBadge status={row.status} /></td>
                                    <td>
                                        <button
                                            onClick={() => updateStatusMutation.mutate({ id: row.id, data: { featured: !row.featured } })}
                                            className={`text-[8px] font-black px-2.5 py-1 rounded-lg transition-all ${row.featured ? 'bg-indigo-600 text-white shadow-md' : 'bg-neutral-100 text-neutral-400'}`}
                                        >
                                            {row.featured ? 'FEATURED' : 'NORMAL'}
                                        </button>
                                    </td>
                                    <td className="text-[10px] font-bold text-neutral-500">{row.updated}</td>
                                    <td className="text-[10px] font-black uppercase tracking-widest text-indigo-600">{row.author}</td>
                                    <td>
                                        <div className="flex gap-2">
                                            <button className="admin-action-btn" title="Edit" onClick={() => handleOpenModal(row)}><FiEdit2 size={12} /></button>
                                            {row.status === 'In Review' && (
                                                <button
                                                    className="admin-action-btn !text-green-600 hover:!bg-green-50"
                                                    title="Approve"
                                                    onClick={() => updateStatusMutation.mutate({ id: row.id, data: { status: 'Published' } })}
                                                >
                                                    <FiCheckCircle size={12} />
                                                </button>
                                            )}
                                            <button className="admin-action-btn delete" title="Delete" onClick={() => handleDelete(row.id)}><FiTrash2 size={12} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <>
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] animate-[fadeIn_0.2s_ease-out]" onClick={() => setIsModalOpen(false)} />
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] bg-white rounded-[2.5rem] z-[110] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-[scaleIn_0.3s_ease-out]">
                        <div className="px-10 py-8 border-b flex items-center justify-between bg-neutral-50">
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 text-[var(--theme-text)]">
                                    {editingItem ? <FiEdit2 className="text-indigo-600" /> : <FiPlus className="text-indigo-600" />} {editingItem ? 'Edit Transmission' : 'New Data Stream'}
                                </h3>
                                <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-widest mt-1">Editorial Content Manifest</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 rounded-full hover:bg-neutral-200 transition-colors flex items-center justify-center"><FiX size={18} /></button>
                        </div>
                        <div className="p-10 overflow-y-auto space-y-6">
                            <div className="admin-field">
                                <label className="admin-label">Blog Title *</label>
                                <input
                                    className="admin-input !rounded-2xl"
                                    placeholder="Enter title..."
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="admin-field">
                                    <label className="admin-label">Category</label>
                                    <select
                                        className="admin-select !rounded-2xl"
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        {CATS.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">Status</label>
                                    <select
                                        className="admin-select !rounded-2xl"
                                        value={formData.status}
                                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        {FILTERS.filter(f => f !== 'All').map(f => <option key={f} value={f}>{f}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">Description / Preview Text</label>
                                <textarea
                                    className="admin-input min-h-[120px] !rounded-2xl"
                                    placeholder="Enter a short preview..."
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div className="flex items-center gap-4 p-5 bg-indigo-50/50 rounded-[2rem] border border-indigo-50">
                                <input
                                    type="checkbox"
                                    id="is_featured"
                                    checked={formData.featured}
                                    onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                                    className="w-5 h-5 accent-indigo-600 rounded-lg"
                                />
                                <div>
                                    <label htmlFor="is_featured" className="text-[10px] font-black text-indigo-900 cursor-pointer block uppercase tracking-widest">Feature on Primary Hub</label>
                                    <p className="text-[9px] text-indigo-900/40 font-bold italic mt-0.5">Increases visibility in public streams.</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-10 bg-neutral-50/80 border-t flex gap-4">
                            <button className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest border border-neutral-200 rounded-2xl hover:bg-white transition-all shadow-sm" onClick={() => setIsModalOpen(false)}>CANCEL</button>
                            <button
                                className="flex-1 py-4 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 hover:-translate-y-1 transition-all disabled:opacity-50"
                                onClick={() => saveMutation.mutate(formData)}
                                disabled={saveMutation.isPending}
                            >
                                {saveMutation.isPending ? 'SYNCING...' : <><FiSave /> {editingItem ? 'UPDATE STREAM' : 'INITIALIZE STREAM'}</>}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

