import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';

import BlogCard from '../components/BlogCard';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import { images } from '@/shared/data/images';
import { useBlogs } from '@/services/mutators/useBlogs';
import { useFeaturedGames } from '@/services/mutators/useGames';
import { adaptBlogRecord, adaptGameCard } from '@/shared/adapters/contentAdapters';

const CATEGORIES = ['All', 'Games', 'Esports', 'News', 'Health', 'Products', 'Articles', 'Trending'];
const SORT_OPTIONS = [
  { label: 'Most Recent', value: 'latest' },
  { label: 'Most Read', value: 'popular' },
  { label: 'Most Liked', value: 'likes' },
  { label: 'Trending Today', value: 'trending' },
];

export default function Blog() {
  const navigate = useNavigate();
  usePageTheme('blog');

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('latest');
  const [recentlyAddedPage, setRecentlyAddedPage] = useState(0);
  const [mostReadPage, setMostReadPage] = useState(0);

  const { data: blogs = [], isLoading } = useBlogs({
    category: selectedCategory === 'All' ? undefined : selectedCategory,
    sort: selectedSort,
  });
  const { data: featuredGames = [], isLoading: gamesLoading } = useFeaturedGames();

  const blogItems = blogs.map(adaptBlogRecord);
  const galleryGames = featuredGames.map(adaptGameCard);

  const filteredBlogs = blogItems.filter(
    (p) => selectedCategory === 'All' || p.category?.toLowerCase() === selectedCategory.toLowerCase(),
  );

  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    if (selectedSort === 'popular') return (b.view_count || 0) - (a.view_count || 0);
    if (selectedSort === 'likes') return (b.likes || 0) - (a.likes || 0);
    if (selectedSort === 'trending') return (b.view_count || 0) + (b.likes || 0) - ((a.view_count || 0) + (a.likes || 0));
    return new Date(b.published_at || 0) - new Date(a.published_at || 0);
  });

  const mostReadBlogs = [...blogItems].sort(
    (a, b) => (b.view_count || 0) - (a.view_count || 0),
  );

  const ITEMS_PER_GROUP = 3;
  const recentSlice = sortedBlogs.slice(
    recentlyAddedPage * ITEMS_PER_GROUP,
    (recentlyAddedPage + 1) * ITEMS_PER_GROUP,
  );
  const mostReadSlice = mostReadBlogs.slice(
    mostReadPage * ITEMS_PER_GROUP,
    (mostReadPage + 1) * ITEMS_PER_GROUP,
  );

  const prevRecent = () => setRecentlyAddedPage((p) => Math.max(0, p - 1));
  const nextRecent = () =>
    setRecentlyAddedPage((p) =>
      (p + 1) * ITEMS_PER_GROUP < sortedBlogs.length ? p + 1 : p,
    );
  const prevMostRead = () => setMostReadPage((p) => Math.max(0, p - 1));
  const nextMostRead = () =>
    setMostReadPage((p) =>
      (p + 1) * ITEMS_PER_GROUP < mostReadBlogs.length ? p + 1 : p,
    );

  return (
    <div className="theme-blog min-h-screen bg-[var(--theme-bg)] font-inter text-[var(--theme-text)]">
      <Helmet>
        <title>Blogs & Guides | GzoneSphere Editorial Hub</title>
        <meta name="description" content="Explore expert gaming insights, reviews, and guides curated by the community." />
      </Helmet>

      {/* BLOCK 1: HERO BANNER */}
      <section className="relative flex items-center overflow-hidden bg-[#0F172A]" style={{ height: '360px' }}>
        {/* Journalism/gaming imagery at low opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80')` }}
        />
        {/* Dark gradient left overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/85 to-[#0F172A]/60" />
        {/* Amber accent overlay top-right */}
        <div className="absolute top-0 right-0 w-[480px] h-full bg-gradient-to-bl from-[#F59E0B]/25 via-[#F59E0B]/10 to-transparent pointer-events-none" />
        {/* Amber glow bottom-left */}
        <div className="absolute bottom-0 left-0 w-64 h-48 bg-[#F59E0B]/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="container-global px-6 relative z-10 text-center w-full">
          <p className="text-xs font-black uppercase tracking-widest text-[#F59E0B] mb-4 opacity-80">
            GzoneSphere Editorial Hub
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-5 tracking-tight uppercase leading-none">
            Blogs & Guides
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto font-medium leading-relaxed">
            Insights, reviews, and expert articles powered by your gaming community.
          </p>
        </div>
      </section>

      {/* BLOCK 2: FILTER & SORT BAR — sticky below hero */}
      <div className="sticky top-0 z-50 bg-white/95 border-b border-[#E2E8F0] py-3 px-6 shadow-sm backdrop-blur-md">
        <div className="container-global flex items-center justify-between gap-4 flex-wrap">
          {/* Category pill tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setRecentlyAddedPage(0); }}
                className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-[#F59E0B] text-white shadow-md shadow-[#F59E0B]/30'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-[#F59E0B]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden md:block text-[11px] font-black text-gray-400 uppercase tracking-tight">
              Sort by:
            </span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-transparent border-none outline-none font-black text-[11px] uppercase tracking-widest text-[#F59E0B] cursor-pointer py-2 pr-2"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* BLOCK 3: RECENTLY ADDED */}
      <section className="py-20 container-global px-6">
        <div className="flex items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-black uppercase tracking-widest text-[var(--theme-primary)]">
              Recently Added
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[var(--theme-text)] tracking-tight">
              Latest from the community
            </h2>
            <p className="text-sm text-[var(--theme-text-muted)] max-w-lg">
              Insights, updates, and guides connected to popular games and genres.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={prevRecent}
              disabled={recentlyAddedPage === 0}
              className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              onClick={nextRecent}
              disabled={(recentlyAddedPage + 1) * ITEMS_PER_GROUP >= sortedBlogs.length}
              className="w-11 h-11 rounded-xl bg-[var(--theme-primary)] text-white flex items-center justify-center hover:bg-[var(--theme-primary-dark)] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-[var(--theme-primary)]/20"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="h-[440px] bg-gray-50 animate-pulse rounded-2xl border border-gray-100" />
                ))
            : recentSlice.map((post) => <BlogCard key={post.id} blog={post} />)}
        </div>
      </section>

      {/* BLOCK 4: MOST READ */}
      <section className="py-20 bg-[var(--theme-bg-alt)]/40 border-y border-[var(--theme-border)]">
        <div className="container-global px-6">
          <div className="flex items-end justify-between mb-10 gap-4">
            <div className="space-y-2">
              <p className="text-xs font-black uppercase tracking-widest text-[var(--theme-primary)]">
                Most Read
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-[var(--theme-text)] tracking-tight">
                What the community is reading
              </h2>
              <p className="text-sm text-[var(--theme-text-muted)]">
                The community's most essential reading material.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={prevMostRead}
                disabled={mostReadPage === 0}
                className="w-11 h-11 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <FiChevronLeft size={18} />
              </button>
              <button
                onClick={nextMostRead}
                disabled={(mostReadPage + 1) * ITEMS_PER_GROUP >= mostReadBlogs.length}
                className="w-11 h-11 rounded-xl bg-[var(--theme-primary)] text-white flex items-center justify-center hover:bg-[var(--theme-primary-dark)] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-[var(--theme-primary)]/20"
              >
                <FiChevronRight size={18} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading
              ? Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="h-[440px] bg-white animate-pulse rounded-2xl border border-gray-100" />
                  ))
              : mostReadSlice.map((post) => <BlogCard key={post.id} blog={post} />)}
          </div>
        </div>
      </section>

      {/* BLOCK 5: WRITE CTA */}
      <section className="py-20 text-center relative overflow-hidden" style={{ backgroundColor: '#FFFBEB' }}>
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#F59E0B]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-48 bg-[#F59E0B]/8 blur-[80px] rounded-full pointer-events-none" />
        <div className="container-global px-6 relative z-10">
          <h3 className="text-3xl md:text-4xl font-black text-[#1a1a1a] mb-4 tracking-tight">
            Have something worth sharing?
          </h3>
          <p className="text-[#6b6b6b] text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Write guides, reviews, or analysis for the GzoneSphere community.
          </p>
          <button
            onClick={() => navigate('/write-blog')}
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#F59E0B] text-white font-black uppercase tracking-wide text-sm rounded-xl hover:bg-[#D97706] transition-colors shadow-lg shadow-[#F59E0B]/30 mb-4"
          >
            Write a Blog <FiArrowUpRight size={18} />
          </button>
          <p className="text-xs text-[#9b9b9b] font-semibold">
            Open to Hustler+ level members
          </p>
        </div>
      </section>

      {/* BLOCK 6: GAME GALLERY STRIP */}
      <section className="py-20 container-global px-6">
        <div className="mb-10 text-center">
          <p className="text-xs font-black uppercase tracking-widest text-[var(--theme-primary)] mb-2">
            Browse by Game
          </p>
          <h3 className="text-lg font-bold text-[var(--theme-text)] mb-1">
            Looking for game guides? Explore the games.
          </h3>
          <Link
            to="/games"
            className="text-xs font-black uppercase tracking-widest text-[var(--theme-primary)] hover:underline inline-flex items-center gap-1"
          >
            View all games <FiArrowUpRight size={12} />
          </Link>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide px-2">
          {gamesLoading
            ? Array(6)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="shrink-0 w-40 h-56 bg-gray-100 animate-pulse rounded-2xl" />
                ))
            : galleryGames.map((game) => (
                <Link key={game.id} to={`/games/${game.slug}`} className="shrink-0 group w-40">
                  <div className="relative h-56 rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-[var(--theme-primary)] transition-all duration-300 shadow-lg">
                    <img
                      src={game.banner_url || game.hero?.background_img || images.valorant}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      alt={game.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-3 right-3 text-center">
                      <p className="text-[11px] font-black uppercase tracking-wide text-white leading-tight">
                        {game.title}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </section>
    </div>
  );
}
