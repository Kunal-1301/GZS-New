import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { FiArrowUpRight, FiHeart, FiShare2 } from 'react-icons/fi';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BlogCard from '../../components/BlogCard';
import GalleryCard from './components/GalleryCard';

import { getAllBlogs } from '../../data/blogService';
import { galleryImages } from '../../data/blogData';
import placeholderWhite from '../../assets/images/placeholderWhite.svg';

const HERO_BG = 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=1920';

export default function BlogPost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [related, setRelated] = useState([]);
    const [featured, setFeatured] = useState([]);
    const galleryRef = useRef(null);

    useEffect(() => {
        const all = getAllBlogs();
        const found = all.find(b => String(b.id) === String(id));
        setPost(found ? { ...found, image: found.image || placeholderWhite } : null);
        setRelated(all.filter(b => String(b.id) !== String(id)).slice(0, 3).map(b => ({ ...b, image: b.image || placeholderWhite })));
        setFeatured(all.slice(0, 4).map(b => ({ ...b, image: b.image || placeholderWhite })));
    }, [id]);

    const scrollGallery = (dir) => {
        if (galleryRef.current) {
            galleryRef.current.scrollBy({ left: dir === 'next' ? 320 : -320, behavior: 'smooth' });
        }
    };

    if (!post) {
        return (
            <div className="min-h-screen bg-bl-bg flex items-center justify-center">
                <p className="text-bl-text-muted">Blog post not found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bl-bg font-inter text-bl-text">

            {/* ── Navbar ─────────────────────────────────────────── */}
            <Navbar logoVariant="yellow" loginVariant="yellow" isDark={false} accent="yellow" />

            {/* ── HERO ────────────────────────────────────────────── */}
            <section
                className="relative min-h-[52vh] flex flex-col items-center justify-center text-center overflow-hidden"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.52),rgba(0,0,0,0.65)), url(${post.image || HERO_BG})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="relative z-10 px-6 md:px-16 max-w-4xl">
                    <span className="inline-block mb-3 px-3 py-1 bg-bl-accent/80 text-white text-xs font-bold uppercase rounded-sm tracking-widest">
                        {post.category || 'Blog'}
                    </span>
                    <h1
                        className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight mb-4 leading-tight"
                        style={{ fontFamily: 'Impact, "Arial Narrow", sans-serif' }}
                    >
                        {post.title}
                    </h1>
                    <p className="text-white/70 text-sm">
                        {post.date} &nbsp;·&nbsp; {post.likes || 0} likes
                    </p>
                </div>
            </section>

            {/* ── ARTICLE BODY ────────────────────────────────────── */}
            <section className="py-14 bg-bl-bg">
                <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24 grid lg:grid-cols-[1fr_320px] gap-12 items-start">

                    {/* ── Left: Article ──────────────────────────────── */}
                    <div className="min-w-0">

                        {/* Introduction */}
                        <h2 className="text-xl font-black uppercase text-bl-text mb-4 tracking-wide">Introduction</h2>
                        <p className="text-bl-text-sec text-sm leading-relaxed mb-6">
                            {post.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>

                        <h2 className="text-xl font-black uppercase text-bl-text mb-4 tracking-wide">Introduction</h2>
                        <p className="text-bl-text-sec text-sm leading-relaxed mb-6">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
                        </p>

                        <h2 className="text-xl font-black uppercase text-bl-text mb-4 tracking-wide">Introduction</h2>
                        <p className="text-bl-text-sec text-sm leading-relaxed mb-10">
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
                        </p>

                        {/* Related Blogs */}
                        <h2 className="text-xl font-black uppercase text-bl-text mb-6 tracking-wide">Related Blogs</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
                            {related.map(p => (
                                <BlogCard key={p.id} id={p.id} image={p.image} title={p.title} description={p.description} likes={p.likes} />
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="py-8 px-7 bg-bl-cta-bg rounded-sm border border-bl-card-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
                            <div>
                                <h3 className="text-lg font-black uppercase text-bl-text mb-1">Have Something Worth Sharing?</h3>
                                <p className="text-bl-text-muted text-sm">Write guides, reviews, or analysis for the GzoneSphere community.</p>
                            </div>
                            <Link
                                to="/write-blog"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-bl-accent hover:bg-bl-accent-dark text-white text-sm font-bold uppercase tracking-wider rounded-sm transition-colors shrink-0"
                            >
                                WRITE A BLOG <FiArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Game Gallery */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-black uppercase text-bl-text tracking-wide">Game Gallery</h2>
                            <div className="flex gap-2">
                                <button onClick={() => scrollGallery('prev')} className="w-9 h-9 flex items-center justify-center border border-neutral-300 rounded-full hover:bg-neutral-100 transition-colors text-neutral-700" aria-label="Previous">
                                    <HiArrowLeft className="w-4 h-4" />
                                </button>
                                <button onClick={() => scrollGallery('next')} className="w-9 h-9 flex items-center justify-center bg-bl-accent hover:bg-bl-accent-dark rounded-full transition-colors text-white" aria-label="Next">
                                    <HiArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div ref={galleryRef} className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {galleryImages.map(item => (
                                <GalleryCard key={item.id} image={item.image} title={item.title} category={item.category} />
                            ))}
                        </div>
                    </div>

                    {/* ── Right: Sidebar ─────────────────────────────── */}
                    <aside className="hidden lg:flex flex-col gap-6 sticky top-24">
                        <div className="bg-bl-card border border-bl-card-border rounded-sm overflow-hidden shadow-sm">
                            <div className="px-5 py-4 border-b border-bl-card-border">
                                <h3 className="text-sm font-black uppercase text-bl-text tracking-wide">Featured Guides</h3>
                            </div>
                            <div className="divide-y divide-bl-card-border">
                                {featured.map(f => (
                                    <Link key={f.id} to={`/blog/${f.id}`} className="flex items-start gap-3 p-4 hover:bg-bl-bg transition-colors group">
                                        <img
                                            src={f.image}
                                            alt={f.title}
                                            className="w-16 h-12 object-cover rounded-sm flex-shrink-0 bg-neutral-200"
                                            onError={e => { e.target.src = placeholderWhite; }}
                                        />
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold text-bl-text group-hover:text-bl-accent transition-colors line-clamp-2 leading-snug mb-1">
                                                {f.title}
                                            </p>
                                            <p className="text-xs text-bl-text-muted">{f.likes || 0} likes</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Share / Like */}
                        <div className="bg-bl-card border border-bl-card-border rounded-sm p-5 flex gap-3">
                            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-bl-card-border text-bl-text text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-bl-bg transition-colors">
                                <FiHeart className="w-4 h-4 text-bl-accent" /> LIKE
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-bl-accent hover:bg-bl-accent-dark text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors">
                                <FiShare2 className="w-4 h-4" /> SHARE
                            </button>
                        </div>
                    </aside>
                </div>
            </section>

            {/* ── Footer ─────────────────────────────────────────── */}
            <Footer variant="light" accent="yellow" />
        </div>
    );
}
