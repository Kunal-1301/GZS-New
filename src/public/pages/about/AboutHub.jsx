import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function AboutHub() {
  return (
    <div className="min-h-screen bg-white font-inter">

      {/* ── Navbar ─────────────────────────────────────────── */}
      <Navbar logoVariant="blue" loginVariant="blue" isDark={false} accent="blue" />

      {/* ── HERO — dark navy + two cards ───────────────────── */}
      <section className="relative bg-ab-dark overflow-hidden">
        {/* Decorative diagonal stripes */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-32 h-full bg-gradient-to-b from-ab-dark-alt to-transparent -skew-x-12" />
          <div className="absolute top-0 right-1/3 w-24 h-full bg-gradient-to-b from-ab-dark-alt to-transparent -skew-x-12" />
          <div className="absolute top-0 right-1/2 w-16 h-full bg-gradient-to-b from-ab-dark-alt to-transparent -skew-x-12" />
        </div>

        {/* Corner brackets */}
        {[
          'top-0 left-0 border-l border-t',
          'top-0 right-0 border-r border-t',
          'bottom-0 left-0 border-l border-b',
          'bottom-0 right-0 border-r border-b',
        ].map((pos, i) => (
          <div key={i} className={`absolute ${pos} m-6 w-8 h-8 border-ab-primary/40 opacity-60`} />
        ))}

        <div className="relative z-10 container-global py-18 md:py-24">
          {/* Title */}
          <div className="text-center mb-12">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-wider mb-3"
              style={{ fontFamily: 'Impact, "Arial Narrow", sans-serif' }}
            >
              ABOUT GZONESPHERE
            </h1>
            <p className="text-white/75 text-sm md:text-base">
              One <span className="text-ab-accent font-bold">ECOSYSTEM</span>.{' '}
              Built with <span className="font-bold">PURPOSE</span>.
            </p>
          </div>

          {/* Two cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Card 1 — Explore the Ecosystem */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="h-44 bg-ab-bg-mid" />
              <div className="p-6">
                <h3
                  className="font-black text-sm uppercase tracking-wide text-ab-dark mb-2"
                  style={{ fontFamily: 'Impact, "Arial Narrow", sans-serif' }}
                >
                  EXPLORE THE ECOSYSTEM
                </h3>
                <p className="text-neutral-600 text-sm mb-5 leading-relaxed">
                  Understand the vision, structure, and philosophy behind GzoneSphere.
                </p>
                <Link
                  to="/about/details"
                  className="inline-flex items-center gap-2 bg-ab-dark hover:bg-ab-dark-alt text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
                >
                  ENTER ABOUT <FiArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 2 — Enter the Story */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="h-44 bg-ab-dark-alt" />
              <div className="p-6">
                <h3
                  className="font-black text-sm uppercase tracking-wide text-ab-dark mb-2"
                  style={{ fontFamily: 'Impact, "Arial Narrow", sans-serif' }}
                >
                  ENTER THE STORY
                </h3>
                <p className="text-neutral-600 text-sm mb-5 leading-relaxed">
                  Discover how GzoneSphere came to exist — beyond features and platforms.
                </p>
                <Link
                  to="/about/origin"
                  className="inline-flex items-center gap-2 border-2 border-ab-dark text-ab-dark hover:bg-ab-dark hover:text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
                >
                  READ THE ORIGIN
                </Link>
              </div>
            </div>
          </div>

          <p className="text-center text-white/80 text-base italic font-light mt-10">
            Two paths. One system.
          </p>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <Footer variant="light" accent="blue" />
    </div>
  );
}
