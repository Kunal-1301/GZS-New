import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiChevronLeft, FiChevronRight, FiHeart, FiBookmark } from "react-icons/fi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { usePageTheme } from "../../context/ThemeContext";
import { PLATFORMS, GAME_CATEGORIES, GALLERY_ITEMS, TRENDING_GAMES, BLOG_POSTS } from "../../data/collectionsData";
import { images } from "../../data/images";

/* ── Placeholder Card ──────────────────────────────────────── */
function PlaceholderImage({ src, color = "#1a1a2e", label, className = "" }) {
  return (
    <div
      className={`w-full overflow-hidden flex items-center justify-center ${className}`}
      style={{ backgroundColor: src ? 'transparent' : color }}
    >
      {src ? (
        <img src={src} alt={label || "image"} className="w-full h-full object-cover" />
      ) : label && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50">
          {label}
        </span>
      )}
    </div>
  );
}

/* ── Main Component ────────────────────────────────────────── */
export default function GamePostCollection() {
  const [activeCategory, setActiveCategory] = useState("Arcade");
  const galleryRef = useRef(null);
  usePageTheme('collection');
  const scrollGallery = dir => {
    if (galleryRef.current) galleryRef.current.scrollLeft += dir * 320;
  };

  return (
    <div className="theme-collection bg-[var(--theme-bg)] min-h-screen text-[var(--theme-text)]">
      <Navbar />

      {/* 1. HERO */}
      <section className="relative h-[90vh] overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0">
          <img src={images.gamesCollectionHero} alt="hero" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="relative z-10 max-w-[56rem] px-6 text-[var(--theme-text-inverse)]">
          <h1 className="gzs-h1 mb-6 text-white">
            Discover Games on GzoneSphere
          </h1>
          <p className="gzs-body max-w-[40rem] mx-auto mb-10 text-white/80">
            Explore games by platform, category, and popularity — with detailed game posts, gameplay insights, and regular updates.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/games" className="gzs-btn-primary no-underline">
              Explore Games <FiArrowUpRight />
            </Link>
            <Link to="/blog" className="gzs-btn-outline !text-white !border-white/50 hover:!bg-white/10 no-underline">
              Explore Blogs
            </Link>
          </div>
        </div>
      </section>

      {/* 2. PLATFORMS */}
      <section className="py-24 text-center">
        <div className="container-global">
          <h2 className="gzs-h2 mb-3">
            Supported Platforms
          </h2>
          <p className="gzs-body-sm mb-14">
            Choose your platform and find games optimized for your device.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLATFORMS.map(p => (
              <div
                key={p.id}
                className="relative rounded-xl overflow-hidden cursor-pointer h-[320px] 
                           transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-xl"
              >
                <PlaceholderImage src={images[p.id]} className="h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-left">
                  <h3 className="gzs-h3 !text-[20px] mb-2 text-white">
                    {p.label}
                  </h3>
                  <p className="text-white/70 text-[13px] leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. GAME GALLERY */}
      <section className="pb-20">
        <div className="flex items-center justify-between px-6 mb-8 container-global">
          <h2 className="gzs-h2">
            Game Gallery
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => scrollGallery(-1)}
              className="w-10 h-10 rounded-full border border-[var(--theme-text-muted)] bg-transparent
                         cursor-pointer flex items-center justify-center transition hover:bg-[var(--theme-bg-section)]"
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={() => scrollGallery(1)}
              className="w-10 h-10 rounded-full border-none bg-[var(--theme-primary)] text-[var(--theme-text-inverse)]
                         cursor-pointer flex items-center justify-center transition hover:bg-[var(--theme-primary-dark)]"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>

        <div
          ref={galleryRef}
          className="flex gap-5 overflow-x-auto px-6 scrollbar-hide scroll-smooth container-global"
        >
          {GALLERY_ITEMS.map(item => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[320px] h-[220px] rounded-xl overflow-hidden cursor-pointer card-standard"
            >
              <PlaceholderImage src={images.valorant} label={item.title} className="h-full" />
            </div>
          ))}
        </div>
      </section>

      {/* 4. GAME CATEGORIES */}
      <section className="section-padding text-center">
        <div className="container-global">
          <h2 className="gzs-h2 mb-3">
            Game Categories
          </h2>
          <p className="gzs-body-sm mb-10">
            Browse games by genre and find experiences that match your play style.
          </p>

          <div className="flex flex-wrap justify-center gap-3 max-w-[700px] mx-auto mb-8">
            {GAME_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-7 py-2.5 rounded-lg font-bold text-[14px] uppercase tracking-[0.08em]
                            cursor-pointer transition-all
                  ${activeCategory === cat
                    ? "bg-[var(--theme-primary)] text-[var(--theme-text-inverse)] border border-[var(--theme-primary)]"
                    : "bg-transparent text-[var(--theme-text)] border border-[var(--theme-border)] hover:border-[var(--theme-text-muted)]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="text-center">
            <Link to="/games" className="gzs-btn-outline no-underline shadow-sm">
              Explore More
            </Link>
          </div>
        </div>
      </section>

      {/* 5. TRENDING GAMES */}
      <section className="section-padding container-global">
        <div className="flex items-center justify-between mb-10">
          <h2 className="gzs-h2">
            Trending Games
          </h2>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full border border-[var(--theme-text-muted)] bg-transparent
                               cursor-pointer flex items-center justify-center">
              <FiChevronLeft />
            </button>
            <button className="w-10 h-10 rounded-full border-none bg-[var(--theme-primary)] text-[var(--theme-text-inverse)]
                               cursor-pointer flex items-center justify-center">
              <FiChevronRight />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {TRENDING_GAMES.map(game => (
            <div key={game.id} className="card-standard group">
              <div className="h-[320px] relative overflow-hidden">
                <PlaceholderImage src={images.valorant} className="h-full group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
              </div>
              <div className="p-5 bg-[var(--theme-card)]">
                <h3 className="font-black uppercase tracking-[0.06em] mb-1.5 text-[var(--theme-text)] text-sm font-heading">
                  {game.title}
                </h3>
                <p className="text-[11px] text-[var(--theme-text-muted)] mb-5">{game.genre}</p>
                <Link
                  to={`/games/${game.slug}`}
                  className="gzs-btn-primary !px-4 !py-2 !text-[10px] w-full no-underline"
                >
                  Explore <FiArrowUpRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. BLOGS & GUIDES */}
      <section className="py-20 container-global">
        <h2 className="gzs-h2 text-center mb-3">
          Blogs & Guides
        </h2>
        <p className="gzs-body-sm text-center mb-14">
          Insights, updates, and guides connected to popular games and genres.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map(post => (
            <div key={post.id} className="card-standard group">
              <div className="h-[220px] relative overflow-hidden">
                <PlaceholderImage src={images.blogHero} className="h-full group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 bg-[var(--theme-card)]">
                <h3 className="font-black text-[16px] leading-tight mb-3 text-[var(--theme-text)] uppercase font-heading">
                  {post.title}
                </h3>
                <p className="text-[13px] text-[var(--theme-text-muted)] mb-6 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <Link to="/blog" className="gzs-btn-outline !px-4 !py-2 !text-[10px] no-underline">
                    Read More
                  </Link>
                  <div className="flex gap-4 text-[var(--theme-text-muted)]">
                    <FiHeart size={18} className="cursor-pointer hover:text-[#e53935] transition-colors" />
                    <FiBookmark size={18} className="cursor-pointer hover:text-[var(--theme-primary)] transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/blog" className="gzs-btn-outline no-underline shadow-sm">
            View All
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
