import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiChevronLeft, FiChevronRight, FiHeart, FiBookmark } from "react-icons/fi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { PLATFORMS, GAME_CATEGORIES, GALLERY_ITEMS, TRENDING_GAMES, BLOG_POSTS } from "../../data/collectionsData";

/* ── Placeholder Card ──────────────────────────────────────── */
function PlaceholderImage({ color = "#1a1a2e", label, className = "" }) {
  return (
    <div
      className={`w-full flex items-end p-4 ${className}`}
      style={{ backgroundColor: color }}
    >
      {label && (
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
  const scrollGallery = dir => {
    if (galleryRef.current) galleryRef.current.scrollLeft += dir * 320;
  };

  return (
    <div className="bg-gc-bg min-h-screen text-gc-text">

      <Navbar logoVariant="blue" loginVariant="blue" isDark={false} accent="blue" />

      {/* ═════════════════════════════════════
          1. HERO
      ═════════════════════════════════════ */}
      <section className="relative h-[90vh] overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-[#0d1b2a]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="relative z-10 max-w-[56rem] px-6 text-white">
          <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-black uppercase tracking-tight leading-[1.1] mb-6">
            Discover Games on GzoneSphere
          </h1>
          <p className="text-[17px] text-white/80 max-w-[40rem] mx-auto mb-10 leading-[1.7]">
            Explore games by platform, category, and popularity — with detailed game posts, gameplay insights, and regular updates.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/games"
              className="bg-white text-[#0d1b2a] px-9 py-3.5 font-bold text-[13px] uppercase
                         tracking-[0.1em] border-none cursor-pointer flex items-center gap-2
                         transition hover:bg-white/90 no-underline"
            >
              Explore Games <FiArrowUpRight />
            </Link>
            <Link
              to="/blog"
              className="bg-transparent text-white px-9 py-3.5 font-bold text-[13px] uppercase
                         tracking-[0.1em] border border-white/50 cursor-pointer transition
                         hover:bg-white/10 no-underline"
            >
              Explore Blogs
            </Link>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════
          2. PLATFORMS
      ═════════════════════════════════════ */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-[2.5rem] font-black uppercase tracking-[0.06em] mb-3 text-gc-text">
          Supported Platforms
        </h2>
        <p className="text-gc-text-muted mb-14 text-base">
          Choose your platform and find games optimized for your device.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[1200px] mx-auto">
          {PLATFORMS.map(p => (
            <div
              key={p.id}
              className="relative rounded-xl overflow-hidden cursor-pointer h-[280px]
                         transition-transform duration-300 hover:scale-[1.03]"
            >
              <PlaceholderImage color="#0d2035" className="h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-left">
                <h3 className="text-white font-black text-[18px] uppercase tracking-[0.12em] mb-1">
                  {p.label}
                </h3>
                <p className="text-white/70 text-[12px] leading-[1.5]">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═════════════════════════════════════
          3. GAME GALLERY
      ═════════════════════════════════════ */}
      <section className="pb-20">
        <div className="flex items-center justify-between px-6 mb-8 max-w-[1440px] mx-auto">
          <h2 className="text-[2rem] font-black uppercase tracking-[0.06em] text-gc-text">
            Game Gallery
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => scrollGallery(-1)}
              className="w-10 h-10 rounded-full border border-gc-text-muted bg-transparent
                         cursor-pointer flex items-center justify-center transition hover:bg-gc-bg-section"
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={() => scrollGallery(1)}
              className="w-10 h-10 rounded-full border-none bg-gc-accent text-white
                         cursor-pointer flex items-center justify-center transition hover:bg-gc-accent-dark"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>

        <div
          ref={galleryRef}
          className="flex gap-5 overflow-x-auto px-6 scrollbar-hide scroll-smooth"
        >
          {GALLERY_ITEMS.map(item => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[300px] h-[200px] rounded-xl overflow-hidden cursor-pointer"
            >
              <PlaceholderImage color={item.placeholder} label={item.title} className="h-[200px]" />
            </div>
          ))}
        </div>
      </section>

      {/* ═════════════════════════════════════
          4. GAME CATEGORIES
      ═════════════════════════════════════ */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-[2rem] font-black uppercase tracking-[0.06em] mb-3 text-gc-text">
          Game Categories
        </h2>
        <p className="text-gc-text-muted mb-10">
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
                  ? "bg-gc-cat-active text-white border border-gc-cat-active"
                  : "bg-transparent text-gc-cat-text border border-gc-card-border hover:border-gc-text-muted"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <Link
          to="/games"
          className="inline-block px-7 py-2.5 border border-gc-accent text-gc-accent
                           bg-transparent font-bold text-[13px] uppercase tracking-[0.08em]
                           cursor-pointer rounded-lg transition hover:bg-gc-accent hover:text-white no-underline">
          Explore More
        </Link>
      </section>

      {/* ═════════════════════════════════════
          5. TRENDING GAMES
      ═════════════════════════════════════ */}
      <section className="py-16 px-6 max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-[2rem] font-black uppercase tracking-[0.06em] text-gc-text">
            Trending Games
          </h2>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full border border-gc-text-muted bg-transparent
                               cursor-pointer flex items-center justify-center">
              <FiChevronLeft />
            </button>
            <button className="w-10 h-10 rounded-full border-none bg-gc-accent text-white
                               cursor-pointer flex items-center justify-center">
              <FiChevronRight />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {TRENDING_GAMES.map(game => (
            <div
              key={game.id}
              className="relative rounded-xl overflow-hidden bg-gc-card shadow-sm cursor-pointer
                         transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="h-[300px]">
                <PlaceholderImage color={game.placeholder} className="h-[300px]" />
              </div>
              <div className="p-5">
                <h3 className="font-black uppercase tracking-[0.06em] mb-1.5 text-gc-text text-base">
                  {game.title}
                </h3>
                <p className="text-[12px] text-gc-text-muted mb-4">{game.genre}</p>
                <Link
                  to={`/games/${game.slug}`}
                  className="inline-flex items-center gap-1.5 bg-[#0d1b2a] text-white
                             px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em]
                             rounded-md no-underline transition hover:bg-[#1a2d40]"
                >
                  Explore <FiArrowUpRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═════════════════════════════════════
          6. BLOGS & GUIDES
      ═════════════════════════════════════ */}
      <section className="py-20 px-6 max-w-[1440px] mx-auto">
        <h2 className="text-center text-[2rem] font-black uppercase tracking-[0.06em] mb-3 text-gc-text">
          Blogs & Guides
        </h2>
        <p className="text-center text-gc-text-muted mb-14">
          Insights, updates, and guides connected to popular games and genres.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map(post => (
            <div
              key={post.id}
              className="bg-gc-card rounded-xl overflow-hidden shadow-sm transition-shadow
                         hover:shadow-xl cursor-pointer"
            >
              <div className="h-[200px]">
                <PlaceholderImage color={post.placeholder} className="h-[200px]" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[15px] leading-[1.5] mb-2 text-gc-text">
                  {post.title}
                </h3>
                <p className="text-[13px] text-gc-text-muted mb-5 leading-[1.6]">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <Link
                    to="/blog"
                    className="inline-block px-4 py-2 border border-gc-text bg-transparent font-bold text-[12px]
                               uppercase tracking-[0.08em] cursor-pointer rounded-md transition
                               hover:bg-[#0d1b2a] hover:text-white hover:border-[#0d1b2a] no-underline"
                  >
                    Read More
                  </Link>
                  <div className="flex gap-3 text-gc-text-muted">
                    <FiHeart size={15} className="cursor-pointer hover:text-gc-text" />
                    <FiBookmark size={15} className="cursor-pointer hover:text-gc-text" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/blog"
            className="inline-block px-10 py-3.5 border border-gc-text bg-transparent font-bold
                             text-[13px] uppercase tracking-[0.1em] cursor-pointer rounded-lg no-underline">
            View All
          </Link>
        </div>
      </section>

      <Footer variant="light" accent="blue" />
    </div>
  );
}
