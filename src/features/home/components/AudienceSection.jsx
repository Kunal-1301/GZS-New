import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

const FEATURES_GAMERS = ['Compete in tournaments', 'Find ranked teammates', 'Earn from playtesting', 'Track verified rank', 'Build career profile'];
const FEATURES_CREATORS = ['Verified skill profiles', 'Portfolio showcase', 'Community audience', 'Publishing tools', 'Company discovery'];
const FEATURES_COMPANIES = ['Hire from verified profiles', 'Run playtesting', 'Host tournaments', 'Sponsor events', 'Brand partnerships'];

function CheckItem({ text, color }) {
  return (
    <li className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
      <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: color }}>
        <FiCheck size={10} color="#fff" strokeWidth={3} />
      </span>
      {text}
    </li>
  );
}

function CheckItemLight({ text, color }) {
  return (
    <li className="flex items-center gap-2 text-sm" style={{ color: 'var(--theme-text)' }}>
      <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: color }}>
        <FiCheck size={10} color="#fff" strokeWidth={3} />
      </span>
      {text}
    </li>
  );
}

export default function AudienceSection() {
  return (
    <div>
      {/* Panel A — For Gamers — Dark Navy */}
      <section style={{ backgroundColor: '#0F172A' }} className="py-20 lg:py-28">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-3" style={{ color: '#16A34A' }}>For Gamers</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-4">Play, compete, and earn. All in one place.</h2>
              <p className="text-lg mb-6 max-w-[65ch]" style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.65 }}>
                Compete in tournaments. Build your verified profile. Find teammates. Earn through playtesting and prize pools.
              </p>
              <ul className="space-y-2 mb-8">{FEATURES_GAMERS.map(f => <CheckItem key={f} text={f} color="#16A34A" />)}</ul>
              <Link to="/onboarding/start" className="gzs-btn-dark">Start Your Player Profile →</Link>
            </motion.div>

            <motion.div
              className="hidden lg:flex items-center justify-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {/* TournamentPreviewCard */}
              <div className="gzs-card-dark rounded-2xl p-6 w-full max-w-sm">
                <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 bg-green-900/60 text-green-300">Esports · Play</span>
                <p className="font-bold text-white text-lg mb-1">viper_pro</p>
                <p className="text-sm text-white/60 mb-4">Valorant · Radiant · AP Server</p>
                <div className="rounded-xl p-4 mb-3" style={{ background: 'rgba(22,163,74,0.1)', border: '1px solid rgba(22,163,74,0.2)' }}>
                  <p className="text-xs font-semibold text-green-400 mb-1">Valorant Winter Showdown 2026</p>
                  <p className="text-sm text-white/70">48 spots left · ₹50,000 prize pool</p>
                  <span className="inline-block mt-2 text-xs font-bold px-2 py-0.5 rounded bg-green-600 text-white">LIVE</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Panel B — For Creators — White */}
      <section className="section-white py-20 lg:py-28">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              className="hidden lg:flex items-center justify-center order-2 lg:order-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {/* ArtProfilePreview */}
              <div className="gzs-card w-full max-w-sm">
                <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 text-white" style={{ background: '#7C3AED' }}>Art · Visual</span>
                <p className="font-bold text-lg mb-1" style={{ color: 'var(--theme-text)' }}>artguru_maya</p>
                <p className="text-sm mb-4" style={{ color: 'var(--theme-text-muted)' }}>Concept Art · Character Design · 3D Modelling</p>
                <div className="flex flex-wrap gap-2">
                  {['Concept Art ✓', 'Character Design ✓', '3D Modelling ✓'].map(s => (
                    <span key={s} className="text-xs px-2 py-1 rounded-lg font-medium" style={{ background: '#FAF5FF', border: '1px solid #DDD6FE', color: '#7C3AED' }}>{s}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-3" style={{ color: '#7C3AED' }}>For Creators</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4" style={{ color: 'var(--theme-text)' }}>
                Build your gaming industry identity.
              </h2>
              <p className="text-lg mb-6 max-w-[65ch]" style={{ color: 'var(--theme-text-muted)', lineHeight: 1.65 }}>
                Whether you make games, art, music, content, or write stories — GzoneSphere gives you a verified professional profile, an engaged audience, and real earning tools.
              </p>
              <ul className="space-y-2 mb-8">{FEATURES_CREATORS.map(f => <CheckItemLight key={f} text={f} color="#7C3AED" />)}</ul>
              <Link
                to="/onboarding/start"
                className="gzs-btn-primary"
                style={{ '--theme-primary': '#7C3AED', '--theme-primary-dark': '#6D28D9' }}
              >
                Build Your Professional Profile →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Panel C — For Companies — Dark Navy */}
      <section style={{ backgroundColor: '#0F172A' }} className="py-20 lg:py-28">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-3" style={{ color: '#0EA5E9' }}>For Companies</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-4">
                Hire verified talent. Reach engaged audiences.
              </h2>
              <p className="text-lg mb-6 max-w-[65ch]" style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.65 }}>
                Post open roles. Browse skill-verified profiles. Run playtesting programs. Host tournaments. Connect with gaming demographics that are impossible to reach anywhere else.
              </p>
              <ul className="space-y-2 mb-8">{FEATURES_COMPANIES.map(f => <CheckItem key={f} text={f} color="#0EA5E9" />)}</ul>
              <Link to="/company/create" className="gzs-btn-dark">Set Up Your Company Profile →</Link>
            </motion.div>

            <motion.div
              className="hidden lg:flex items-center justify-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {/* CompanyPreviewCard */}
              <div className="gzs-card-dark rounded-2xl p-6 w-full max-w-sm">
                <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4" style={{ background: 'rgba(14,165,233,0.2)', color: '#7DD3FC' }}>Studio · Verified</span>
                <p className="font-bold text-white text-lg mb-1">NexGen Studios</p>
                <p className="text-sm text-white/60 mb-4">2 open roles · 34 saved profiles</p>
                <div className="flex flex-wrap gap-2">
                  {['Game Designer', 'Unity Dev', 'Sound Designer'].map(s => (
                    <span key={s} className="text-xs px-2 py-1 rounded-lg text-white/70" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>{s}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
