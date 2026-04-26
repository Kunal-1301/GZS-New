import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
    FiShare2, FiHeart, FiMessageCircle, FiPlus, FiCamera, FiX, 
    FiEye, FiTrendingUp, FiActivity, FiZap, FiBox, FiArrowRight 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommunity } from '@/services/mutators/useCommunity';

export default function ShowcaseFeed() {
    const { branch: branchSlug } = useParams();
    const { useShowcaseFeed } = useCommunity();
    const { data: postsData, isLoading } = useShowcaseFeed(branchSlug);
    const [posts, setPosts] = useState([]);
    
    // Sync local state if needed (for instant like feedback)
    React.useEffect(() => {
        if (postsData) setPosts(postsData);
    }, [postsData]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [liked, setLiked] = useState(new Set());

    const toggleLike = (id) => {
        const next = new Set(liked);
        if (next.has(id)) {
            next.delete(id);
            setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes - 1 } : p));
        } else {
            next.add(id);
            setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
        }
        setLiked(next);
    };

    const handlePost = (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        setPosts(prev => [{
            id: Date.now(),
            title: fd.get('title') || 'New Showcase',
            author: 'Me',
            likes: 0,
            comments: 0,
            image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
            branch: branch || 'general',
        }, ...prev]);
        setIsModalOpen(false);
    };

    const visible = posts.filter(p => !branch || p.branch === branch);

    return (
        <div className="flex-1 p-10 lg:p-20 space-y-24 bg-[var(--theme-bg)] relative overflow-hidden selection:bg-[var(--theme-primary)]/30">
            
            {/* Cinematic Background Artifacts */}
            <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[var(--theme-primary)]/5 blur-[120px] rounded-full pointer-events-none" />

            {/* ── HEADER ── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 relative z-10 border-b-2 border-dashed border-[var(--theme-border)]/50 pb-16">
                <div className="space-y-6">
                    <div className="flex items-center gap-5">
                        <FiBox className="text-[var(--theme-primary)] animate-pulse shadow-xl" size={24} />
                        <span className="text-sm font-black uppercase tracking-widest text-[var(--theme-text-muted)] italic opacity-30">SPECIMEN_GALLERY_V4.08</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic text-[var(--theme-text)] leading-[0.85]">
                        SIGNAL <br/> <span className="opacity-10">SHOWCASE</span>
                    </h1>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="hidden lg:flex items-center gap-12 px-12 border-r-2 border-[var(--theme-border)] border-dashed mr-6">
                         <div className="text-center">
                            <p className="text-xs font-black uppercase tracking-wider text-[var(--theme-text-muted)] italic mb-1">CURATION_LVL</p>
                            <p className="text-xl font-black italic text-[var(--theme-text)] uppercase tracking-tighter leading-none">ALPHA_01</p>
                         </div>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full sm:w-auto px-10 py-5 bg-[var(--theme-text)] text-[var(--theme-bg)] hover:bg-[var(--theme-primary)] hover:text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all italic flex items-center justify-center gap-5 shadow-2xl active:scale-95 group "
                    >
                        <FiPlus strokeWidth={4} className="group-hover:rotate-90 transition-transform" /> SUBMIT_SIGNAL
                    </button>
                </div>
            </div>

            {/* ── MASONRY GRID ── */}
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-12 space-y-12 pb-32 relative z-10">
                <AnimatePresence mode="popLayout">
                    {visible.map((post, idx) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className="break-inside-avoid relative bg-[var(--theme-card)]/40 backdrop-blur-3xl border-2 border-[var(--theme-border)] rounded-full overflow-hidden hover:border-[var(--theme-primary)]/40 hover:shadow-6xl transition-all group cursor-pointer"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--theme-bg-alt)]">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-transform duration-[1.5s]"
                                />
                                
                                {/* Overlay Logic */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />
                                
                                <div className="absolute top-8 right-8 px-5 py-2 bg-black/60 backdrop-blur-xl rounded-full text-xs font-black uppercase tracking-wide text-white border-2 border-white/10 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">
                                    {post.branch.toUpperCase()}
                                </div>

                                <div className="absolute bottom-8 left-8 right-8 space-y-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                    <h3 className="text-3xl font-black uppercase tracking-tighter text-white italic leading-none">
                                        {post.title}
                                    </h3>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-xs font-black italic text-white">
                                            {post.author[0].toUpperCase()}
                                        </div>
                                        <span className="text-xs font-black text-white/60 tracking-tight italic uppercase">BY {post.author}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Interaction Bar */}
                            <div className="p-8 flex items-center justify-between relative z-10">
                                <div className="flex gap-8">
                                    <button
                                        onClick={e => { e.stopPropagation(); toggleLike(post.id); }}
                                        className={`flex items-center gap-3 text-xs font-black transition-all italic tracking-tight ${liked.has(post.id) ? 'text-[var(--theme-primary)] scale-110' : 'text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)]'}`}
                                    >
                                        <FiHeart fill={liked.has(post.id) ? 'currentColor' : 'none'} size={18} strokeWidth={3} />
                                        {post.likes?.toLocaleString()}
                                    </button>
                                    <button className="flex items-center gap-3 text-xs font-black text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] transition-all italic tracking-tight">
                                        <FiMessageCircle size={18} strokeWidth={3} /> {post.comments?.toLocaleString()}
                                    </button>
                                </div>
                                <div className="flex items-center gap-4">
                                     <div className="w-10 h-10 rounded-xl bg-[var(--theme-bg-alt)]/40 border-2 border-[var(--theme-border)] flex items-center justify-center text-[var(--theme-text-muted)] hover:bg-[var(--theme-primary)] hover:text-white transition-all">
                                        <FiShare2 size={16} strokeWidth={3} />
                                     </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* ── POST MODAL ── */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[var(--theme-bg)]/80 backdrop-blur-xl"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            className="bg-[var(--theme-card)] border-4 border-[var(--theme-border)] w-full max-w-4xl rounded-full relative z-10 overflow-hidden shadow-6xl"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                                {/* Media Selection Side */}
                                <div className="bg-[var(--theme-bg-alt)] p-16 flex flex-col items-center justify-center border-r-4 border-[var(--theme-border)] group/upload cursor-pointer relative overflow-hidden">
                                     <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                                        <div className="w-24 h-24 rounded-3xl bg-[var(--theme-card)] border-4 border-[var(--theme-border)] flex items-center justify-center text-[var(--theme-text-muted)] group-hover/upload:text-[var(--theme-primary)] group-hover/upload:rotate-12 group-hover/upload:scale-110 transition-all shadow-2xl">
                                            <FiCamera size={40} strokeWidth={3} />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-2xl font-black uppercase tracking-tighter italic text-[var(--theme-text)]">UPLOAD_SPECIMEN</p>
                                            <p className="text-xs font-black uppercase tracking-wider text-[var(--theme-text-muted)] italic opacity-40 leading-relaxed">SUPPORTED_ARRAY: [JPEG, PNG, WEBP] <br/> MAX_FILE_SIZE: 25.0_MB</p>
                                        </div>
                                     </div>
                                     <FiTrendingUp size={400} className="absolute bottom-[-100px] left-[-100px] opacity-[0.02] text-[var(--theme-primary)] group-hover/upload:rotate-45 transition-transform duration-[10s]" />
                                </div>

                                {/* Manifest Side */}
                                <div className="p-16 space-y-12">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-2">
                                            <h2 className="text-4xl font-black uppercase tracking-tighter text-[var(--theme-text)] italic leading-none">SPEC_MANIFEST</h2>
                                            <p className="text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] italic opacity-40">SIGNAL_DISTRIBUTION_V1</p>
                                        </div>
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="w-16 h-16 flex items-center justify-center bg-[var(--theme-bg-alt)] hover:bg-[var(--theme-primary)] hover:text-white rounded-[1.8rem] transition-all border-2 border-[var(--theme-border)] text-[var(--theme-text-muted)] group shadow-2xl"
                                        >
                                            <FiX size={32} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
                                        </button>
                                    </div>

                                    <form className="space-y-8" onSubmit={handlePost}>
                                        <div className="space-y-4">
                                            <label className="text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] italic block ml-6">SIGNAL_LABEL</label>
                                            <input
                                                name="title"
                                                required
                                                type="text"
                                                placeholder="ENTER_SIGNAL_NAME..."
                                                className="w-full px-12 py-8 bg-[var(--theme-bg-alt)] border-2 border-[var(--theme-border)] rounded-3xl text-base font-black uppercase tracking-[0.1em] outline-none focus:border-[var(--theme-primary)]/60 transition-all italic text-[var(--theme-text)] placeholder:opacity-20"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-xs font-black uppercase tracking-widest text-[var(--theme-text-muted)] italic block ml-6">CONTEXT_MANIFESTO</label>
                                            <textarea
                                                rows={3}
                                                placeholder="DEFINE_SIGNAL_PARAMETERS..."
                                                className="w-full px-12 py-8 bg-[var(--theme-bg-alt)] border-2 border-[var(--theme-border)] rounded-3xl text-base font-black uppercase tracking-[0.1em] outline-none focus:border-[var(--theme-primary)]/60 transition-all italic text-[var(--theme-text)] placeholder:opacity-20 resize-none"
                                            />
                                        </div>
                                        
                                        <div className="flex items-center gap-6 p-8 bg-[var(--theme-primary)]/5 border-2 border-[var(--theme-primary)]/20 rounded-3xl">
                                             <FiZap className="text-[var(--theme-primary)] shrink-0" size={24} />
                                             <p className="text-xs font-black uppercase tracking-wide text-[var(--theme-text-muted)] italic leading-relaxed">
                                                By broadcasting this signal, you certify it follows the <span className="text-[var(--theme-text)] underline">Creative_Trust_Protocol_v3</span>.
                                             </p>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full py-10 bg-[var(--theme-text)] text-[var(--theme-bg)] hover:bg-[var(--theme-primary)] hover:text-white rounded-3xl text-base font-black uppercase tracking-widest transition-all italic shadow-6xl active:scale-95 group mt-8 "
                                        >
                                            BROADCAST_SIGNAL_LIVE
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}









