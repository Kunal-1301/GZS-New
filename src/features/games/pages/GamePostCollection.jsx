import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import { useGames } from '@/services/mutators/useGames';
import { useBlogs } from '@/services/mutators/useBlogs';
import GameCard from '@/shared/components/GameCard';
import BlogCard from '@/shared/components/BlogCard';

const CATEGORIES = [
  'All', 'Action', 'Arcade', 'Shooter', 'FPS', 'Battle Royale',
  'RPG', 'Simulation', 'Racing', 'Sports', 'Indie', 'Mobile',
];

const PLATFORMS = [
  { id: 'all',         label: 'All',         icon: '🎮' },
  { id: 'PC',          label: 'PC',          icon: '🖥' },
  { id: 'PlayStation', label: 'PlayStation', icon: '🕹' },
  { id: 'Mobile',      label: 'Mobile',      icon: '📱' },
];

export default function GamePostCollection() {
  usePageTheme('collection');

  const [platform, setPlatform]           = useState('all');
  const [activeCategory, setActiveCategory] = useState('All');
  const galleryRef = useRef(null);

  const scrollLeft  = () => galleryRef.current?.scrollBy({ left: -320, behavior: 'smooth' });
  const scrollRight = () => galleryRef.current?.scrollBy({ left: 320,  behavior: 'smooth' });

  const { data: featuredGames = [], isLoading: featuredLoading } = useGames({ featured: true });
  const { data: allGames = [],      isLoading: allGamesLoading  } = useGames();
  const { data: featuredBlogs = [], isLoading: blogsLoading      } = useBlogs({ featured: true });

  const loading = featuredLoading || allGamesLoading;

  const filteredGames = allGames
    .filter(game => {
      const matchesCat = activeCategory === 'All'
        || game.genres?.includes(activeCategory)
        || game.genre === activeCategory;
      const matchesPlatform = platform === 'all'
        || game.platforms?.includes(platform);
      return matchesCat && matchesPlatform;
    })
    .slice(0, 8);

  return (
    <div className="min-h-screen" style={{ background: 'var(--theme-bg)' }}>

      {/* ── 1. HERO BANNER ──────────────────────────────────────── */}
      <section
        className="hero-mesh relative overflow-hidden flex items-center justify-center"
        style={{ minHeight: '400px' }}
      >
        <div className="relative z-10 text-center px-6 py-20 w-full max-w-4xl mx-auto">
          <p
            className="text-xs font-semibold uppercase tracking-[0.12em] mb-4"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            GzoneSphere / Games
          </p>
          <h1 className="h1-display text-white mb-6">
            Discover Games on GzoneSphere
          </h1>
          <p
            className="text-lg max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            Explore games by platform, category, and genre. Find detailed game profiles
            and meaningful gaming communities.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/games" className="gzs-btn-dark">Explore Games</Link>
            <Link to="/blog"  className="gzs-btn-ghost-dark">Browse Blog</Link>
          </div>
        </div>
      </section>

      {/* ── 2. PLATFORM SELECTOR STRIP ──────────────────────────── */}
      <section
        className="py-8"
        style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex gap-4 flex-wrap justify-center">
            {PLATFORMS.map(p => {
              const isActive = platform === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setPlatform(p.id)}
                  className="gzs-card flex flex-col items-center gap-2 px-8 py-5 min-w-[120px] text-center transition-all duration-200"
                  style={isActive ? {
                    border: '2px solid var(--theme-primary)',
                    background: 'var(--theme-primary-soft)',
                  } : {}}
                >
                  <span className="text-2xl">{p.icon}</span>
                  <span
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: isActive ? 'var(--theme-primary)' : '#64748B' }}
                  >
                    {p.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. GAME GALLERY (horizontal scroll) ─────────────────── */}
      <section
        className="py-12"
        style={{ background: 'var(--theme-bg)', borderBottom: '1px solid #E2E8F0' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.12em] mb-2"
                style={{ color: 'var(--theme-primary)' }}
              >
                Game Gallery
              </p>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--theme-text)' }}>
                Featured &amp; Recently Added
              </h3>
            </div>
            <div className="flex gap-3">
              <button
                onClick={scrollLeft}
                className="w-10 h-10 rounded-xl border bg-white flex items-center justify-center transition-all"
                style={{ borderColor: '#E2E8F0' }}
              >
                <FiChevronLeft size={18} style={{ color: '#64748B' }} />
              </button>
              <button
                onClick={scrollRight}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:opacity-90"
                style={{ background: 'var(--theme-primary)', color: '#fff' }}
              >
                <FiChevronRight size={18} />
              </button>
            </div>
          </div>

          <div
            ref={galleryRef}
            className="scroll-strip"
          >
            {loading
              ? Array(6).fill(0).map((_, i) => (
                  <div
                    key={i}
                    className="shrink-0 w-64 h-48 rounded-2xl animate-pulse"
                    style={{ background: '#F1F5F9' }}
                  />
                ))
              : featuredGames.map(game => (
                  <div key={game.id} className="shrink-0 w-64">
                    <GameCard game={game} />
                  </div>
                ))
            }
          </div>
        </div>
      </section>

      {/* ── 4. CATEGORY FILTER PILLS ────────────────────────────── */}
      <section
        className="py-5"
        style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border"
                  style={isActive
                    ? { background: 'var(--theme-primary)', color: '#fff', borderColor: 'var(--theme-primary)' }
                    : { background: '#fff', color: '#64748B', borderColor: '#CBD5E1' }
                  }
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. TRENDING GAMES GRID ──────────────────────────────── */}
      <section className="py-16" style={{ background: 'var(--theme-bg)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.12em] mb-2"
                style={{ color: 'var(--theme-primary)' }}
              >
                Trending Games
              </p>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--theme-text)' }}>
                {activeCategory === 'All' ? 'All Games' : activeCategory}
              </h3>
            </div>
            <span className="text-sm font-medium" style={{ color: 'var(--theme-text-muted)' }}>
              {filteredGames.length} {filteredGames.length === 1 ? 'game' : 'games'}
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {Array(8).fill(0).map((_, i) => (
                <div key={i} className="h-72 rounded-2xl animate-pulse" style={{ background: '#F1F5F9' }} />
              ))}
            </div>
          ) : filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredGames.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center rounded-2xl border-2 border-dashed border-[#E2E8F0]">
              <p className="text-base font-semibold mb-4" style={{ color: 'var(--theme-text-muted)' }}>
                No games found for this filter.
              </p>
              <button
                onClick={() => { setActiveCategory('All'); setPlatform('all'); }}
                className="gzs-btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── 6. BLOGS & GUIDES ───────────────────────────────────── */}
      <section
        className="py-16"
        style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.12em] mb-2"
                style={{ color: 'var(--theme-primary)' }}
              >
                Blogs &amp; Guides
              </p>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--theme-text)' }}>
                Game knowledge from the community
              </h3>
            </div>
            <Link
              to="/blog"
              className="text-sm font-semibold hover:underline"
              style={{ color: 'var(--theme-primary)' }}
            >
              View All →
            </Link>
          </div>

          {blogsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array(3).fill(0).map((_, i) => (
                <div
                  key={i}
                  className="h-96 rounded-3xl animate-pulse border"
                  style={{ background: '#fff', borderColor: '#E2E8F0' }}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredBlogs.slice(0, 3).map(post => (
                <BlogCard
                  key={post.id}
                  id={post.id || post.slug}
                  image={post.image || post.featured_image_url}
                  title={post.title}
                  description={post.excerpt || post.description}
                  likes={post.like_count ?? post.likes ?? 0}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
