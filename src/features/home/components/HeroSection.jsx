import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LiveTicker from './shared/LiveTicker';
import ProfileCardStack from './shared/ProfileCardStack';

export default function HeroSection() {
  return (
    <section className="hero-mesh relative min-h-screen flex flex-col justify-center overflow-hidden">

      <div className="section-container relative z-10 py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
            {/* Status pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
              <span className="w-2 h-2 rounded-full bg-green-400" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
              <span className="text-xs font-semibold text-white/80 tracking-[0.08em]">The Future of Gaming, Unified</span>
            </div>

            {/* Main headline */}
            <h1 className="h1-display text-white mb-6">
              GzoneSphere is where<br />
              <span style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #7C3AED 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>gaming lives.</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg md:text-xl mb-8 max-w-[540px]" style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.65 }}>
              Where gamers, creators, and companies meet — to compete, build, and grow together.
            </p>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              {['$200B+ Market', '3B+ Gamers', 'Phase 1 Live'].map(s => (
                <span key={s} className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}>{s}</span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/signup" className="gzs-btn-dark">Create Your Profile →</Link>
              <Link to="/about" className="gzs-btn-ghost-dark">Explore Platform</Link>
            </div>
          </motion.div>

          {/* Right column — card stack, desktop only */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <ProfileCardStack />
          </motion.div>
        </div>
      </div>

      {/* Ticker */}
      <LiveTicker />
    </section>
  );
}
