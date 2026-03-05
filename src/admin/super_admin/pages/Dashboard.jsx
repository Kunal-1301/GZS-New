import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
    FiEye, FiEdit2, FiBox, FiUsers, FiAward, FiTarget,
    FiActivity, FiTrendingUp, FiMessageSquare, FiCheckCircle, FiPlus
} from "react-icons/fi";
import { FaTrophy } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import {
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
    CartesianGrid, Tooltip, PieChart, Pie, Cell, BarChart, Bar
} from "recharts";
import { mockApiService } from "@services/mockApiService";

const TYPE_FILTERS = ["All", "Game", "Blog", "Esports", "Community"];

// --- Chart Data Mockups ---
const GROWTH_DATA = [
    { name: 'Jan', traffic: 4000, users: 2400 },
    { name: 'Feb', traffic: 3000, users: 1398 },
    { name: 'Mar', traffic: 2000, users: 9800 },
    { name: 'Apr', traffic: 2780, users: 3908 },
    { name: 'May', traffic: 1890, users: 4800 },
    { name: 'Jun', traffic: 2390, users: 3800 },
    { name: 'Jul', traffic: 3490, users: 4300 },
];

const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#f97316'];

function StatusBadge({ status }) {
    const cls = {
        Published: "admin-badge bg-green-50 text-green-700 border-green-100",
        Draft: "admin-badge bg-gray-50 text-gray-500 border-gray-100",
        "In Review": "admin-badge bg-blue-50 text-blue-700 border-blue-100",
        UPCOMING: "admin-badge bg-indigo-50 text-indigo-700 border-indigo-100",
        ONGOING: "admin-badge bg-yellow-50 text-yellow-700 border-yellow-100",
        COMPLETED: "admin-badge bg-neutral-50 text-neutral-400 border-neutral-100",
        Flagged: "admin-badge bg-red-50 text-red-600 border-red-100",
    }[status] ?? "admin-badge bg-neutral-50 text-neutral-500";
    return <span className={cls}>{status}</span>;
}

export default function Dashboard() {
    const [filter, setFilter] = useState("All");

    // Unified Data Fetching with React Query
    const { data: games = [] } = useQuery({ queryKey: ['admin', 'games'], queryFn: mockApiService.getAllGames });
    const { data: blogs = [] } = useQuery({ queryKey: ['admin', 'blogs'], queryFn: mockApiService.getAllBlogs });
    const { data: tournaments = [] } = useQuery({ queryKey: ['admin', 'tournaments'], queryFn: mockApiService.getAllTournaments });
    const { data: community = [] } = useQuery({ queryKey: ['admin', 'community'], queryFn: mockApiService.getAllCommunityPosts });
    const { data: proofs = [] } = useQuery({ queryKey: ['admin', 'proofs'], queryFn: mockApiService.getAllSkillProofs });

    const isLoading = false; // TanStack Query handles individual states, but for simplicity:

    const featuredCount = games.filter(g => g.featured).length + blogs.filter(b => b.featured).length;
    const pendingProofs = proofs.filter(p => p.status === 'Pending Review' || p.status === 'Pending').length;

    const stats = {
        totalAssets: games.length + blogs.length + tournaments.length + community.length,
        totalUsers: 1240, // Mock
        pendingProofs,
        uptime: '99.98%'
    };

    const contentList = [
        ...games.map(g => ({ ...g, type: 'Game' })),
        ...blogs.map(b => ({ ...b, type: 'Blog' })),
        ...tournaments.map(t => ({ id: t.id, title: t.name, type: 'Esports', status: t.status, updated: t.date, author: 'Auto' })),
        ...community.map(c => ({ ...c, type: 'Community', updated: c.updated, author: c.author }))
    ].sort((a, b) => b.id.toString().localeCompare(a.id.toString()));

    const filtered = filter === "All" ? contentList : contentList.filter(r => r.type === filter);

    const pieData = [
        { name: 'Games', value: games.length },
        { name: 'Blogs', value: blogs.length },
        { name: 'Esports', value: tournaments.length },
        { name: 'Community', value: community.length },
    ];

    return (
        <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-[var(--theme-text)] tracking-tighter uppercase italic leading-none mb-1">COMMAND CENTER</h1>
                    <p className="text-[10px] text-[var(--theme-text-muted)] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Platform Operations // Live Monitor
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="admin-btn-primary flex items-center gap-2 px-6 py-3 rounded-2xl shadow-lg shadow-indigo-600/10">
                        <FiTarget size={14} /> GENERATE ANALYTICS
                    </button>
                </div>
            </div>

            {/* --- STATS GRID --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-7 rounded-[2rem] border border-[var(--theme-border)] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-5">
                        <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors"><FiBox size={22} /></div>
                        <span className="text-[10px] font-black text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">+12%</span>
                    </div>
                    <div className="text-3xl font-black text-[var(--theme-text)] mb-1 tracking-tighter">
                        {stats.totalAssets}
                    </div>
                    <div className="text-[9px] uppercase font-black tracking-widest text-neutral-400">Content Ecosystem Assets</div>
                </div>

                <div className="bg-white p-7 rounded-[2rem] border border-[var(--theme-border)] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-5">
                        <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl group-hover:bg-purple-600 group-hover:text-white transition-colors"><FiUsers size={22} /></div>
                        <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">STABLE</span>
                    </div>
                    <div className="text-3xl font-black text-[var(--theme-text)] mb-1 tracking-tighter text-purple-700">1.2k+</div>
                    <div className="text-[9px] uppercase font-black tracking-widest text-neutral-400">Total Verified Users</div>
                </div>

                <div className="bg-white p-7 rounded-[2rem] border border-[var(--theme-border)] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-5">
                        <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl group-hover:bg-orange-600 group-hover:text-white transition-colors"><FiAward size={22} /></div>
                        {stats.pendingProofs > 0 && (
                            <span className="text-[10px] font-black text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-100 animate-pulse">URGENT</span>
                        )}
                    </div>
                    <div className="text-3xl font-black text-[var(--theme-text)] mb-1 tracking-tighter text-orange-600">{stats.pendingProofs}</div>
                    <div className="text-[9px] uppercase font-black tracking-widest text-neutral-400">Skill Verifications Pending</div>
                </div>

                <div className="bg-[#050505] p-7 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 blur-3xl -mr-16 -mt-16" />
                    <div className="flex justify-between items-start mb-5">
                        <div className="p-4 bg-white/5 text-white rounded-2xl border border-white/10 group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all"><FiTarget size={22} /></div>
                        <div className="flex items-center gap-1.5 text-[9px] font-black tracking-widest text-green-500">
                            HEALTHY
                        </div>
                    </div>
                    <div className="text-3xl font-black text-white mb-1 tracking-tighter">{stats.uptime}</div>
                    <div className="text-[9px] uppercase font-black tracking-widest text-neutral-500">Platform Uptime Rate</div>
                </div>
            </div>

            {/* --- VISUAL ANALYTICS --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-[var(--theme-border)] p-10 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--theme-text)]">Traffic & Engagement</h3>
                            <p className="text-[9px] text-neutral-400 font-bold">Monthly data stream visualization</p>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-indigo-600" /> <span className="text-[9px] font-black">Traffic</span></div>
                            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-400" /> <span className="text-[9px] font-black">Users</span></div>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={GROWTH_DATA}>
                                <defs>
                                    <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#999' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#999' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontSize: '10px', fontWeight: 'bold' }}
                                />
                                <Area type="monotone" dataKey="traffic" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorTraffic)" />
                                <Area type="monotone" dataKey="users" stroke="#a855f7" strokeWidth={3} fillOpacity={0} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-[var(--theme-border)] p-10 shadow-sm flex flex-col items-center justify-center text-center">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--theme-text)] mb-2 w-full text-left">Asset Mix</h3>
                    <div className="h-[240px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col">
                            <span className="text-2xl font-black text-neutral-900 leading-none">{stats.totalAssets}</span>
                            <span className="text-[8px] font-black text-neutral-400 uppercase tracking-widest">Total</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full pt-6 border-t border-neutral-50 mt-4">
                        {pieData.map((item, i) => (
                            <div key={item.name} className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                                <div className="flex flex-col items-start leading-none">
                                    <span className="text-[9px] font-black text-neutral-900">{item.value}</span>
                                    <span className="text-[8px] font-bold text-neutral-400 uppercase">{item.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* --- ACTIVITY BLOCK --- */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-[2.5rem] border border-[var(--theme-border)] shadow-sm overflow-hidden flex flex-col">
                        <div className="px-10 py-8 border-b border-[var(--theme-border)] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-50/50">
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3 text-[var(--theme-text)]">
                                    <FiActivity className="text-indigo-600" /> RECENT STREAM OVERVIEW
                                </h3>
                            </div>
                            <div className="flex gap-1.5 flex-wrap">
                                {TYPE_FILTERS.map(f => (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${filter === f ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-white text-neutral-400 border border-neutral-100 hover:border-neutral-200'}`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="admin-table !border-none">
                                <thead>
                                    <tr className="bg-neutral-50/30">
                                        <th className="pl-10 !py-5">IDENTIFIER</th><th>ASSET NAME</th><th>DOMAIN</th><th>STATUS</th><th>PUBLISHED</th><th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.length === 0 ? (
                                        <tr><td colSpan="6" className="text-center py-24 text-neutral-300 text-[10px] font-black uppercase tracking-[0.5em]">No Data Flows Detected</td></tr>
                                    ) : filtered.map(row => (
                                        <tr key={`${row.type}-${row.id}`} className="group hover:bg-neutral-50 transition-colors border-b border-neutral-50 last:border-0">
                                            <td className="pl-10 !py-4 text-[var(--theme-text-muted)] text-[9px] font-mono opacity-50">GZ-HUB-{row.id}</td>
                                            <td className="font-bold text-xs text-[var(--theme-text)] truncate max-w-[200px]">{row.title || row.name}</td>
                                            <td>
                                                <span className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${row.type === 'Game' ? 'bg-purple-100 text-purple-700' :
                                                    row.type === 'Blog' ? 'bg-blue-100 text-blue-700' :
                                                        row.type === 'Esports' ? 'bg-indigo-100 text-indigo-700' :
                                                            'bg-orange-100 text-orange-700'
                                                    }`}>
                                                    {row.type}
                                                </span>
                                            </td>
                                            <td><StatusBadge status={row.status} /></td>
                                            <td className="text-[10px] text-neutral-500 font-bold">{row.updated || row.date}</td>
                                            <td className="!py-4">
                                                <div className="flex gap-2">
                                                    <button className="w-8 h-8 rounded-xl bg-neutral-100 text-neutral-600 flex items-center justify-center hover:bg-neutral-900 hover:text-white transition-all"><FiEye size={12} /></button>
                                                    <Link to={row.type === 'Blog' ? '/content-admin/news' : row.type === 'Esports' ? '/content-admin/esports' : '#'} className="w-8 h-8 rounded-xl bg-neutral-100 text-neutral-600 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all"><FiEdit2 size={12} /></Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* --- SIDEBAR PANEL --- */}
                <div className="space-y-6">
                    {/* HUB ACCESS */}
                    <div className="bg-[#5865F2] rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute -right-16 -bottom-16 opacity-5 group-hover:rotate-12 transition-transform duration-700"><FiPlus size={280} /></div>
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-8 border-b border-white/10 pb-4">CORE HUBS</h3>
                        <div className="grid grid-cols-2 gap-4 relative z-10">
                            <Link to="/content-admin/news" className="flex flex-col items-center gap-3 p-5 bg-white/5 hover:bg-white/15 border border-white/10 rounded-3xl transition-all hover:scale-[1.02]">
                                <FiEdit2 size={28} />
                                <span className="text-[9px] font-black uppercase tracking-widest">News Hub</span>
                            </Link>
                            <Link to="/content-admin/esports" className="flex flex-col items-center gap-3 p-5 bg-white/5 hover:bg-white/15 border border-white/10 rounded-3xl transition-all hover:scale-[1.02]">
                                <FaTrophy size={28} />
                                <span className="text-[9px] font-black uppercase tracking-widest">Esports</span>
                            </Link>
                            <Link to="/content-admin/profiles" className="flex flex-col items-center gap-3 p-5 bg-white/5 hover:bg-white/15 border border-white/10 rounded-3xl transition-all hover:scale-[1.02]">
                                <FiCheckCircle size={28} />
                                <span className="text-[9px] font-black uppercase tracking-widest">Profiles</span>
                            </Link>
                            <Link to="/content-admin/community" className="flex flex-col items-center gap-3 p-5 bg-white/5 hover:bg-white/15 border border-white/10 rounded-3xl transition-all hover:scale-[1.02]">
                                <FiMessageSquare size={28} />
                                <span className="text-[9px] font-black uppercase tracking-widest">Social</span>
                            </Link>
                        </div>
                    </div>

                    {/* TRAFFIC ANALYSIS */}
                    <div className="bg-white rounded-[2.5rem] border border-[var(--theme-border)] p-10">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--theme-text)]">NETWORK TRAFFIC</h3>
                            <FiTrendingUp className="text-green-500" />
                        </div>
                        <div className="space-y-8">
                            {[
                                { label: 'Web Engine', val: '88%', color: 'from-indigo-600 to-indigo-400' },
                                { label: 'Social Lobbies', val: '54%', color: 'from-blue-600 to-blue-400' },
                                { label: 'Talent Discovery', val: '32%', color: 'from-purple-600 to-purple-400' }
                            ].map(item => (
                                <div key={item.label} className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">{item.label}</span>
                                        <span className="text-[10px] font-black text-neutral-900">{item.val}</span>
                                    </div>
                                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                                        <div className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000`} style={{ width: item.val }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-10 p-5 bg-indigo-50/50 rounded-2xl border border-indigo-50 flex items-start gap-4">
                            <div className="w-8 h-8 rounded-xl bg-white text-indigo-600 flex items-center justify-center shrink-0 shadow-sm border border-indigo-50"><HiOutlineLightBulb size={18} /></div>
                            <p className="text-[9px] font-bold text-indigo-900/60 leading-relaxed italic">
                                "Platform growth focused on Discord-style lobbies has increased direct traffic by 20% this month."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

