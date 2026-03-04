import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { usePageTheme } from '../../context/ThemeContext';
import { images } from '../../data/images';

export default function AboutHub() {
  usePageTheme('about');
  return (
    <div className="theme-about min-h-screen font-inter" style={{ background: '#050f23' }}>

      <Navbar />

      {/* ── HERO — dark navy + game character ───────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">

        {/* Background: game character image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(5,15,35,0.70) 0%, rgba(5,15,35,0.85) 100%), url(${images.aboutHero})`,
          }}
          aria-hidden="true"
        />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(100,180,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(100,180,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
          aria-hidden="true"
        />

        {/* Floating decorative squares */}
        {[
          { size: 'w-3 h-3', pos: 'top-24 left-[12%]', op: 'opacity-30' },
          { size: 'w-5 h-5', pos: 'top-40 right-[18%]', op: 'opacity-20' },
          { size: 'w-2 h-2', pos: 'bottom-32 left-[22%]', op: 'opacity-25' },
          { size: 'w-4 h-4', pos: 'bottom-40 right-[14%]', op: 'opacity-20' },
          { size: 'w-3 h-3', pos: 'top-1/2 left-[8%]', op: 'opacity-15' },
          { size: 'w-2 h-2', pos: 'top-1/3 right-[8%]', op: 'opacity-20' },
        ].map((d, i) => (
          <div
            key={i}
            className={`absolute ${d.size} ${d.pos} ${d.op} border border-[var(--theme-primary)] rotate-45 pointer-events-none`}
            aria-hidden="true"
          />
        ))}

        {/* Corner brackets */}
        {[
          'top-0 left-0 border-l border-t',
          'top-0 right-0 border-r border-t',
          'bottom-0 left-0 border-l border-b',
          'bottom-0 right-0 border-r border-b',
        ].map((pos, i) => (
          <div key={i} className={`absolute ${pos} m-6 w-8 h-8 border-[var(--theme-primary)] opacity-40 pointer-events-none`} />
        ))}

        <div className="relative z-10 container-global py-24 md:py-32">
          {/* Title */}
          <div className="text-center mb-14">
            <h1 className="gzs-h1 !text-white mb-5">
              ABOUT GZONESPHERE
            </h1>
            <p className="text-white/75 text-base tracking-wide">
              One{' '}
              <span className="text-[var(--theme-primary-light)] font-bold">ECOSYSTEM</span>.{' '}
              Built with{' '}
              <span className="font-bold text-white">PURPOSE</span>.
            </p>
          </div>

          {/* Two cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">

            {/* Card 1 — Explore the Ecosystem */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="h-44 bg-[#d5dde3] relative overflow-hidden">
                <img
                  src={images.aboutHero}
                  alt="Explore the ecosystem"
                  className="w-full h-full object-cover opacity-60 grayscale"
                />
              </div>
              <div className="p-6">
                <h3 className="text-[13px] font-black uppercase tracking-widest text-neutral-900 mb-2 font-heading">
                  EXPLORE THE ECOSYSTEM
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed mb-5">
                  Understand the vision, structure, and philosophy behind GzoneSphere.
                </p>
                <Link
                  to="/about/details"
                  className="inline-flex items-center gap-1.5 bg-[var(--theme-primary)] text-white text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded transition-colors hover:bg-[var(--theme-primary-dark)] no-underline"
                >
                  ENTER ABOUT <FiArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2 — Enter the Story */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="h-44 relative overflow-hidden">
                <img
                  src={images.aboutStory}
                  alt="Enter the story"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-[13px] font-black uppercase tracking-widest text-neutral-900 mb-2 font-heading">
                  ENTER THE STORY
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed mb-5">
                  Discover how GzoneSphere came to exist — beyond features and platforms.
                </p>
                <Link
                  to="/about/origin"
                  className="inline-flex items-center gap-1.5 bg-transparent text-neutral-900 text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded border border-neutral-400 transition-colors hover:border-neutral-700 hover:bg-neutral-50 no-underline"
                >
                  READ THE ORIGIN
                </Link>
              </div>
            </div>

          </div>

          <p className="text-center text-white/60 text-base italic font-light mt-12">
            Two paths. One system.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
