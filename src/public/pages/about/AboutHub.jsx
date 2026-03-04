import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { usePageTheme } from '../../context/ThemeContext';

export default function AboutHub() {
  usePageTheme('about');
  return (
    <div className="theme-about min-h-screen bg-[var(--theme-bg)] font-inter">

      {/* ── Navbar ─────────────────────────────────────────── */}
      <Navbar />

      {/* ── HERO — dark navy + two cards ───────────────────── */}
      <section className="relative bg-[var(--theme-bg-section)] overflow-hidden">
        {/* Decorative diagonal stripes */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-32 h-full bg-gradient-to-b from-[var(--theme-primary-dark)] to-transparent -skew-x-12" />
          <div className="absolute top-0 right-1/3 w-24 h-full bg-gradient-to-b from-[var(--theme-primary-dark)] to-transparent -skew-x-12" />
          <div className="absolute top-0 right-1/2 w-16 h-full bg-gradient-to-b from-[var(--theme-primary-dark)] to-transparent -skew-x-12" />
        </div>

        {/* Corner brackets */}
        {[
          'top-0 left-0 border-l border-t',
          'top-0 right-0 border-r border-t',
          'bottom-0 left-0 border-l border-b',
          'bottom-0 right-0 border-r border-b',
        ].map((pos, i) => (
          <div key={i} className={`absolute ${pos} m-6 w-8 h-8 border-[var(--theme-primary)] opacity-60`} />
        ))}

        <div className="relative z-10 container-global py-18 md:py-24">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="gzs-h1 !text-white">
              ABOUT GZONESPHERE
            </h1>
            <p className="gzs-body-sm text-white/75">
              One <span className="text-[var(--theme-primary-light)] font-bold">ECOSYSTEM</span>.{' '}
              Built with <span className="font-bold">PURPOSE</span>.
            </p>
          </div>

          {/* Two cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Card 1 — Explore the Ecosystem */}
            <div className="bg-[var(--theme-card)] rounded-2xl overflow-hidden shadow-2xl">
              <div className="h-44 bg-[var(--theme-bg-alt)]" />
              <div className="p-6">
                <h3 className="gzs-h3 !text-sm mb-2">
                  EXPLORE THE ECOSYSTEM
                </h3>
                <p className="gzs-body-sm mb-5">
                  Understand the vision, structure, and philosophy behind GzoneSphere.
                </p>
                <Link
                  to="/about/details"
                  className="gzs-btn-primary !px-5 !py-2.5 !text-[10px] no-underline"
                >
                  ENTER ABOUT <FiArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 2 — Enter the Story */}
            <div className="bg-[var(--theme-card)] rounded-2xl overflow-hidden shadow-2xl">
              <div className="h-44 bg-[var(--theme-bg-section)] opacity-20" />
              <div className="p-6">
                <h3 className="gzs-h3 !text-sm mb-2">
                  ENTER THE STORY
                </h3>
                <p className="gzs-body-sm mb-5">
                  Discover how GzoneSphere came to exist — beyond features and platforms.
                </p>
                <Link
                  to="/about/origin"
                  className="gzs-btn-outline !px-5 !py-2.5 !text-[10px] no-underline"
                >
                  READ THE ORIGIN
                </Link>
              </div>
            </div>
          </div>

          <p className="text-center text-[var(--theme-text-inverse)]/80 text-base italic font-light mt-10">
            Two paths. One system.
          </p>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
