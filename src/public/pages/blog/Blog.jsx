import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';

import Navbar from '../../components/Navbar';
import BlogCard from './components/BlogCard';
import SectionHeader from './components/SectionHeader';
import FilterBar from './components/FilterBar';
import Pagination from './components/Pagination';
import Footer from '../../components/Footer';
import GalleryCard from './components/GalleryCard';

import { galleryImages, categories, sortOptions } from '../../data/blogData';
import { getAllBlogs } from '../../data/blogService';
import placeholderWhite from '../../assets/images/placeholderWhite.svg';

/* ── Anime hero image (blog Figma uses game character art) ── */
const HERO_BG = 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=1920';

export default function Blog() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('latest');
  const [recentlyAddedPage, setRecentlyAddedPage] = useState(1);
  const [mostReadPage, setMostReadPage] = useState(1);
  const galleryRef = useRef(null);

  useEffect(() => {
    const all = getAllBlogs();
    setBlogs(all.map(b => ({ ...b, image: b.image || placeholderWhite })));
  }, []);

  /* Filtering */
  const filtered = [...blogs]
    .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
    .sort((a, b) => {
      if (selectedSort === 'popular') return (b.likes || 0) - (a.likes || 0);
      if (selectedSort === 'oldest') return new Date(a.date) - new Date(b.date);
      return new Date(b.date) - new Date(a.date);
    });

  const recentPosts = [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);
  const mostRead = [...blogs].sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 6);

  const scrollGallery = (dir) => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({ left: dir === 'next' ? 320 : -320, behavior: 'smooth' });
    }
  };

  /* ── Pagination slices ── */
  const ITEMS_PER_PAGE = 3;
  const recentSlice = recentPosts.slice((recentlyAddedPage - 1) * ITEMS_PER_PAGE, recentlyAddedPage * ITEMS_PER_PAGE);
  const mostReadSlice = mostRead.slice((mostReadPage - 1) * ITEMS_PER_PAGE, mostReadPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-bl-bg font-inter text-bl-text">

      {/* ── Navbar ─────────────────────────────────────────── */}
      <Navbar logoVariant="yellow" loginVariant="yellow" isDark={false} accent="yellow" />

      {/* ── HERO ───────────────────────────────────────────── */}
      <section
        className="relative min-h-[52vh] flex flex-col items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.52),rgba(0,0,0,0.62)), url(${HERO_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        <div className="relative z-10 px-6 md:px-16">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tight mb-4"
            style={{ fontFamily: 'Impact, "Arial Narrow", sans-serif' }}
          >
            BLOGS &amp; GUIDES
          </h1>
          <p className="text-white/75 text-sm sm:text-base max-w-2xl">
            Insights, reviews, and expert content connected to games, platforms, and competitive play on GzoneSphere.
          </p>
        </div>
      </section>

      {/* ── Filter / Sort Bar ──────────────────────────────── */}
      <div className="bg-bl-bg border-b border-bl-card-border">
        <div className="container-global">
          <FilterBar
            categories={categories}
            sortOptions={sortOptions}
            selectedCategory={selectedCategory}
            selectedSort={selectedSort}
            onCategoryChange={setSelectedCategory}
            onSortChange={setSelectedSort}
          />
        </div>
      </div>

      {/* ── Recently Added ─────────────────────────────────── */}
      <section className="section-padding bg-bl-bg">
        <div className="container-global">
          {/* Section Header */}
          <SectionHeader
            title="RECENTLY ADDED"
            subtitle="Insights, updates, and guides connected to popular games and genres."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {(recentSlice.length ? recentSlice : recentPosts.slice(0, 3)).map(post => (
              <BlogCard
                key={post.id}
                id={post.id}
                image={post.image}
                title={post.title}
                description={post.description}
                likes={post.likes}
              />
            ))}
          </div>

          <Pagination
            currentPage={recentlyAddedPage}
            totalPages={Math.max(1, Math.ceil(recentPosts.length / ITEMS_PER_PAGE))}
            onPageChange={setRecentlyAddedPage}
            variant="arrows-only"
          />
        </div>
      </section>

      {/* ── Most Read ──────────────────────────────────────── */}
      <section className="section-padding bg-bl-bg">
        <div className="container-global">
          <SectionHeader
            title="MOST READ BLOG & GUIDES"
            showNavigation
            onPrev={() => setMostReadPage(p => Math.max(1, p - 1))}
            onNext={() => setMostReadPage(p => Math.min(Math.ceil(mostRead.length / ITEMS_PER_PAGE), p + 1))}
            align="left"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {(mostReadSlice.length ? mostReadSlice : mostRead.slice(0, 3)).map(post => (
              <BlogCard
                key={post.id}
                id={post.id}
                image={post.image}
                title={post.title}
                description={post.description}
                likes={post.likes}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA — Have Something Worth Sharing? ───────────── */}
      <section className="py-12 bg-bl-cta-bg">
        <div className="container-global">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wide text-bl-text mb-2">
                HAVE SOMETHING WORTH SHARING?
              </h2>
              <p className="text-bl-text-muted text-sm max-w-lg">
                Write guides, reviews, or analysis for the GzoneSphere community and build your reputation.
              </p>
            </div>
            <button
              onClick={() => navigate('/write-blog')}
              className="inline-flex items-center gap-2 px-7 py-3 bg-bl-accent hover:bg-bl-accent-dark text-white text-sm font-bold uppercase tracking-wider rounded-sm transition-colors shrink-0 cursor-pointer"
            >
              WRITE A BLOG <FiArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Game Gallery ───────────────────────────────────── */}
      <section className="section-padding bg-bl-bg">
        <div className="container-global">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wide text-bl-text">
              GAME GALLERY
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollGallery('prev')}
                className="w-9 h-9 flex items-center justify-center border border-neutral-300 rounded-full hover:bg-neutral-100 transition-colors text-neutral-700"
                aria-label="Previous"
              >
                <HiArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollGallery('next')}
                className="w-9 h-9 flex items-center justify-center bg-bl-accent hover:bg-bl-accent-dark rounded-full transition-colors text-white"
                aria-label="Next"
              >
                <HiArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={galleryRef}
            className="flex gap-4 overflow-x-auto pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {galleryImages.map(item => (
              <GalleryCard key={item.id} image={item.image} title={item.title} category={item.category} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <Footer variant="light" accent="yellow" />
    </div>
  );
}
