import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    FiPlus, FiGrid, FiList, FiSearch, FiImage, FiVideo,
    FiFile, FiTrash2, FiInfo, FiDownload, FiX, FiCheckCircle
} from "react-icons/fi";
import { mockApiService } from "@services/mockApiService";

export default function MediaLibrary() {
    const queryClient = useQueryClient();
    const [view, setView] = useState("grid");
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState(null);

    const { data: media = [], isLoading } = useQuery({
        queryKey: ['admin', 'media'],
        queryFn: async () => {
            // Using the INITIAL_MEDIA logic but wrapped in a mock fetch
            return [
                { id: 1, name: "Valorant_Banner.jpg", type: "image", size: "1.2 MB", dimensions: "1920x1080", date: "2026-03-01", url: "https://placehold.co/600x400/0f172a/ffffff?text=Valorant+Banner" },
                { id: 2, name: "Tournament_Teaser.mp4", type: "video", size: "45 MB", duration: "0:30", date: "2026-02-28", url: "#" },
                { id: 3, name: "Gzone_Logo_White.svg", type: "image", size: "45 KB", dimensions: "512x512", date: "2025-12-15", url: "https://placehold.co/200x200/6366f1/ffffff?text=GZ+Logo" },
                { id: 4, name: "Sponsor_Package_v2.pdf", type: "file", size: "4.5 MB", pages: 12, date: "2026-03-04", url: "#" },
                { id: 5, name: "BGMI_Map_Guide.png", type: "image", size: "2.8 MB", dimensions: "2560x1440", date: "2026-03-02", url: "https://placehold.co/600x400/1e293b/ffffff?text=BGMI+Map" },
                { id: 6, name: "Apex_Legends_Art.jpg", type: "image", size: "3.1 MB", dimensions: "3840x2160", date: "2026-03-01", url: "https://placehold.co/600x400/020617/ffffff?text=Apex+Art" },
            ];
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            // Mock delete
            console.log("Deleting media", id);
            return id;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['admin', 'media']);
            setSelected(null);
        }
    });

    const filtered = media.filter(m => m.name.toLowerCase().includes(query.toLowerCase()));

    const handleDelete = (id) => {
        if (confirm("Delete this asset permanently from the cloud vault?")) {
            deleteMutation.mutate(id);
        }
    };

    if (isLoading) return <div className="p-20 text-center animate-pulse text-[var(--theme-text-muted)] font-black uppercase tracking-widest text-xs">SYNCHRONIZING MEDIA CLOUD...</div>;

    return (
        <div className="animate-[fadeIn_0.5s_ease-out]">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-600/20"><FiImage size={22} /></div>
                    <div>
                        <h1 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-900">Media Repository</h1>
                        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-0.5">Asset Management & CDN Distribution</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex bg-neutral-100 p-1.5 rounded-2xl border border-neutral-200 shadow-inner">
                        <button
                            onClick={() => setView("grid")}
                            className={`p-2.5 rounded-xl transition-all ${view === "grid" ? "bg-white shadow-md text-indigo-600" : "text-neutral-400 hover:text-neutral-600"}`}
                        >
                            <FiGrid size={16} />
                        </button>
                        <button
                            onClick={() => setView("list")}
                            className={`p-2.5 rounded-xl transition-all ${view === "list" ? "bg-white shadow-md text-indigo-600" : "text-neutral-400 hover:text-neutral-600"}`}
                        >
                            <FiList size={16} />
                        </button>
                    </div>
                    <button className="admin-btn-primary flex items-center gap-2 group">
                        <FiPlus size={16} className="group-hover:rotate-90 transition-transform" /> <span>UPLOAD ASSET</span>
                    </button>
                </div>
            </div>

            <div className="flex gap-8 flex-col xl:flex-row">
                {/* Main Gallery Area */}
                <div className="flex-1 space-y-6">
                    <div className="bg-white rounded-[2rem] border border-neutral-100 p-4 shadow-sm flex items-center gap-4 focus-within:ring-2 ring-indigo-500/10 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-400"><FiSearch size={18} /></div>
                        <input
                            placeholder="Universal search by filename, extension, or metadata..."
                            className="bg-transparent text-xs outline-none flex-1 font-bold text-neutral-900 placeholder:text-neutral-300"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                        />
                    </div>

                    {view === "grid" ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
                            {filtered.map(m => (
                                <div
                                    key={m.id}
                                    onClick={() => setSelected(m)}
                                    className={`bg-white p-3 rounded-[2.5rem] cursor-pointer transition-all border-2 relative group flex flex-col items-center justify-center text-center
                                        ${selected?.id === m.id ? "border-indigo-600 shadow-2xl shadow-indigo-600/10 scale-[1.02]" : "border-neutral-50 hover:border-indigo-100 hover:shadow-xl"}`}
                                >
                                    <div className="aspect-square w-full bg-neutral-50 rounded-[2rem] overflow-hidden flex items-center justify-center mb-4 relative">
                                        {m.type === "image" ? (
                                            <img src={m.url} alt={m.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        ) : m.type === "video" ? (
                                            <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-900 group-hover:bg-neutral-800 transition-colors">
                                                <FiVideo size={32} className="text-white/20" />
                                                <span className="text-[8px] font-black text-white/40 mt-2 tracking-widest uppercase">Video Stream</span>
                                            </div>
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center bg-indigo-50/30">
                                                <FiFile size={32} className="text-indigo-200" />
                                                <span className="text-[8px] font-black text-indigo-300 mt-2 tracking-widest uppercase">Document</span>
                                            </div>
                                        )}
                                        {selected?.id === m.id && (
                                            <div className="absolute inset-0 bg-indigo-600/10 backdrop-blur-[2px] flex items-center justify-center animate-[fadeIn_0.2s_ease-out]">
                                                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg"><FiCheckCircle size={14} /></div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="px-2 w-full pb-2">
                                        <div className="text-[10px] font-black text-neutral-900 truncate uppercase tracking-tighter">{m.name}</div>
                                        <div className="text-[9px] text-neutral-400 font-bold uppercase tracking-widest mt-1 opacity-60">{m.size} // {m.type}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="admin-list-card !rounded-[3rem] border-neutral-100 overflow-hidden shadow-sm">
                            <table className="admin-table !border-none">
                                <thead>
                                    <tr className="bg-neutral-50/50">
                                        <th className="pl-12 !py-6">ASSET CORE</th><th>IDENTIFIER</th><th>TYPESTREAM</th><th>PAYLOAD SIZE</th><th>SYNC DATE</th><th className="pr-12 text-right">CONTROLS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map(m => (
                                        <tr
                                            key={m.id}
                                            className={`group hover:bg-neutral-50 transition-colors border-b border-neutral-50 last:border-0 cursor-pointer ${selected?.id === m.id ? "bg-indigo-50/50" : ""}`}
                                            onClick={() => setSelected(m)}
                                        >
                                            <td className="pl-12 !py-5">
                                                <div className="w-10 h-10 rounded-2xl bg-neutral-100 flex items-center justify-center group-hover:bg-white transition-colors border border-neutral-100/50">
                                                    {m.type === "image" ? <FiImage size={14} className="text-indigo-600" /> : m.type === "video" ? <FiVideo size={14} className="text-purple-600" /> : <FiFile size={14} className="text-neutral-400" />}
                                                </div>
                                            </td>
                                            <td className="text-xs font-black text-neutral-900 uppercase tracking-tighter">{m.name}</td>
                                            <td><span className="text-[9px] font-black uppercase tracking-[0.2rem] text-neutral-400">{m.type}</span></td>
                                            <td className="text-[10px] text-neutral-500 font-bold">{m.size}</td>
                                            <td className="text-[10px] text-neutral-400 font-mono italic opacity-60">{m.date}</td>
                                            <td className="pr-12 text-right">
                                                <button
                                                    className="w-9 h-9 rounded-2xl bg-white text-neutral-300 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all border border-neutral-100"
                                                    onClick={(e) => { e.stopPropagation(); handleDelete(m.id); }}
                                                >
                                                    <FiTrash2 size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Details Sidebar */}
                <div className="w-full xl:w-[400px] space-y-6 shrink-0 relative animate-[fadeIn_0.5s_ease-out]">
                    {selected ? (
                        <div className="bg-white rounded-[3rem] border border-neutral-100 p-10 shadow-xl sticky top-24 ring-1 ring-neutral-50 animate-[slideInUp_0.4s_cubic-bezier(0.2,0.8,0.2,1)]">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3 text-neutral-900">
                                    <FiInfo className="text-indigo-600" /> Asset Intelligence
                                </h3>
                                <button onClick={() => setSelected(null)} className="text-neutral-300 hover:text-neutral-900 transition-colors"><FiX size={20} /></button>
                            </div>

                            <div className="aspect-video bg-neutral-900 rounded-[2rem] overflow-hidden mb-8 shadow-2xl relative group">
                                {selected.type === "image" ? (
                                    <img src={selected.url} alt={selected.name} className="w-full h-full object-contain" />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-800 text-white/5 whitespace-nowrap overflow-hidden">
                                        <FiImage size={120} className="scale-[2.5]" />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900/40 backdrop-blur-sm">
                                            {selected.type === "video" ? <FiVideo size={40} className="text-white/40" /> : <FiFile size={40} className="text-white/40" />}
                                            <span className="text-[10px] mt-4 font-black tracking-[0.3em] uppercase text-white/20">Preview Latency</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                <div className="p-6 bg-neutral-50 rounded-[2rem] border border-neutral-100/50">
                                    <label className="text-[9px] font-black text-neutral-400 uppercase tracking-widest block mb-2">Filename Designation</label>
                                    <div className="text-xs font-black text-neutral-900 break-all leading-relaxed">{selected.name}</div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-6 bg-neutral-50 rounded-[2rem] border border-neutral-100/50">
                                        <label className="text-[9px] font-black text-neutral-400 uppercase tracking-widest block mb-2">Category</label>
                                        <div className="text-[10px] font-black uppercase text-indigo-600 tracking-widest">{selected.type}</div>
                                    </div>
                                    <div className="p-6 bg-neutral-50 rounded-[2rem] border border-neutral-100/50">
                                        <label className="text-[9px] font-black text-neutral-400 uppercase tracking-widest block mb-2">Data Weight</label>
                                        <div className="text-[10px] font-black text-neutral-900">{selected.size}</div>
                                    </div>
                                </div>

                                {selected.dimensions && (
                                    <div className="p-6 bg-neutral-50 rounded-[2rem] border border-neutral-100/50">
                                        <label className="text-[9px] font-black text-neutral-400 uppercase tracking-widest block mb-2">Pixel Resolution</label>
                                        <div className="text-[10px] font-black text-neutral-900 opacity-60 tracking-widest">{selected.dimensions} PX</div>
                                    </div>
                                )}

                                <div className="p-6 bg-neutral-900 rounded-[2rem] shadow-xl">
                                    <label className="text-[9px] font-black text-white/30 uppercase tracking-widest block mb-3">Public Vector URL</label>
                                    <div className="text-[9px] font-mono text-white/70 break-all leading-relaxed selection:bg-indigo-500/30">
                                        https://gzonesphere.cloud/v1/cdn/media/secure/{selected.name}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 flex gap-3">
                                <button className="flex-1 bg-indigo-600 text-white rounded-[1.5rem] py-4 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/20 hover:-translate-y-1 transition-all group">
                                    <FiDownload className="group-hover:translate-y-1 transition-transform" /> DOWNLOAD ASSET
                                </button>
                                <button className="w-16 bg-red-50 text-red-600 rounded-[1.5rem] flex items-center justify-center hover:bg-red-600 hover:text-white transition-all" onClick={() => handleDelete(selected.id)}>
                                    <FiTrash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-[3rem] border-2 border-dashed border-neutral-100 p-20 text-center sticky top-24 flex flex-col items-center justify-center opacity-40 group hover:opacity-100 transition-opacity">
                            <div className="w-20 h-20 rounded-full bg-neutral-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><FiImage size={32} className="text-neutral-200" /></div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 max-w-[180px] leading-relaxed italic">Select an objective unit to load intelligence data</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

