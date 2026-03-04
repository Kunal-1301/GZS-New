import CTABanner from './components/CTABanner';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';
import { usePageTheme } from '../../context/ThemeContext';

const IDENTITY_TAGS = [
  { text: 'An identity that grows with you.', filled: true },
  { text: 'An identity that reflects "Who you are?"', filled: false },
  { text: 'An identity that reflects "How you contribute to gaming culture."', filled: false },
  { text: 'An identity that reflects "What you do?"', filled: false },
];

const GAMING_ASPECTS = [
  'A competitive pursuit', 'A creative outlet',
  'A skill set', 'A career ambition',
  'A social space', 'A lifestyle',
];

const PHILOSOPHY = [
  'Gaming is a legitimate culture, not a niche',
  'Communities should empower, not overwhelm',
  'Skill and creativity deserve visibility',
  'Gaming identity should be unified, not fragmented',
  'Effort should lead to opportunity',
];

const SYSTEM_POINTS = [
  'Systems that connect people instead of scattering them.',
  'Systems that reward contribution instead of noise.',
  'Systems that allow gaming to be taken seriously — as culture, career, and community.',
];

export default function About() {
  usePageTheme('about');
  return (
    <div className="theme-about min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] font-inter">

      {/* ── Navbar ─────────────────────────────────────────── */}
      <Navbar />

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="bg-[var(--theme-primary)] section-padding text-center">
        <div className="container-global">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-wide text-white mb-6 font-heading"
          >
            ABOUT GZONESPHERE
          </h1>
          <p className="max-w-2xl mx-auto text-white/80 text-sm sm:text-base md:text-lg leading-relaxed">
            Gaming is one of the most powerful cultures of our generation.
            It connects billions of people, fuels creativity, builds skills, and shapes identities.
          </p>
        </div>
      </section>

      {/* ── FRAGMENTATION ───────────────────────────────────── */}
      <section className="section-padding bg-[var(--theme-bg)]">
        <div className="container-global grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-5 text-[var(--theme-text)] text-base md:text-lg leading-relaxed">
            <Breadcrumb items={[
              { label: 'Home', to: '/' },
              { label: 'About', to: '/about' },
              { label: 'Details' },
            ]} className="mb-4" />
            <p>Yet despite its scale, gaming today is deeply fragmented.</p>
            <p>Gamers are forced to split their time, identity, and effort across multiple platforms.</p>
            <p>Communities become chaotic. Progress becomes invisible. Opportunities feel scattered and inconsistent.</p>
            <p className="font-semibold">The result is a gaming experience that feels disjointed, despite being global.</p>
          </div>
          <div className="h-72 md:h-[380px] bg-black/70 rounded-2xl shadow-xl flex items-center justify-center text-[var(--theme-text-muted)] text-sm">
            Feature Video
          </div>
        </div>
      </section>

      {/* ── DIVIDER 1 ───────────────────────────────────────── */}
      <CTABanner text="GZONESPHERE WAS CREATED TO CHANGE THAT." bgClass="bg-[var(--theme-primary)]" size="md" />

      {/* ── UNIFIED ECOSYSTEM ───────────────────────────────── */}
      <section className="section-padding text-center bg-[var(--theme-bg)]">
        <div className="container-global">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-5 font-heading"
          >
            A UNIFIED GAMING ECOSYSTEM
          </h2>
          <p className="max-w-3xl mx-auto text-[var(--theme-text-muted)] text-sm sm:text-base md:text-lg mb-6 leading-relaxed">
            GzoneSphere is being built as a unified gaming ecosystem — a single, structured environment
            where identity, growth, creativity, and connection exist together.
          </p>
          <p className="uppercase font-semibold mb-10 tracking-wider text-[var(--theme-text)] text-sm">
            AT ITS CORE, GZONESPHERE IS CENTERED AROUND ONE GAMING IDENTITY.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {IDENTITY_TAGS.map((tag, i) => (
              <div
                key={i}
                className={`px-5 py-2.5 text-sm rounded-lg border transition ${tag.filled
                  ? 'bg-[var(--theme-primary)] text-white border-[var(--theme-primary)] shadow-md'
                  : 'border-[var(--theme-border)] text-[var(--theme-text)]'
                  }`}
              >
                {tag.text}
              </div>
            ))}
          </div>

          <p className="max-w-3xl mx-auto text-[var(--theme-text-muted)] text-sm sm:text-base md:text-lg leading-relaxed">
            Instead of starting over on every platform, your presence lives in one place — evolving as you compete, create, learn, and connect.
          </p>
        </div>
      </section>

      {/* ── "JUST A GAME" ────────────────────────────────────── */}
      <section className="section-padding bg-[var(--theme-bg-section)]">
        <div className="container-global grid lg:grid-cols-2 gap-16 items-start">
          <div className="h-72 md:h-[380px] bg-black/70 rounded-2xl shadow-xl flex items-center justify-center text-[var(--theme-text-muted)] text-sm">
            Feature Video
          </div>
          <div className="text-[var(--theme-text)] text-base md:text-lg leading-relaxed space-y-5">
            <p>We believe gaming has outgrown the idea of being <strong>"JUST A GAME."</strong></p>
            <p>For millions of people, gaming is:</p>
            <div className="grid grid-cols-2 gap-3">
              {GAMING_ASPECTS.map((aspect, i) => (
                <div key={i} className={`px-4 py-2 rounded-lg text-sm ${i === 1 ? 'bg-white/40' : ''}`}>
                  • {aspect}
                </div>
              ))}
            </div>
            <p className="italic">
              <span className="font-semibold not-italic">GzoneSphere</span> is designed around this reality.
            </p>
          </div>
        </div>
      </section>

      {/* ── DESIGNED TO EVOLVE ──────────────────────────────── */}
      <section className="section-padding text-center bg-[var(--theme-bg)]">
        <div className="container-global">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-5 font-heading"
          >
            DESIGNED TO EVOLVE
          </h2>
          <p className="mb-14 text-[var(--theme-text-muted)] text-base md:text-lg">
            GzoneSphere is not launched as a finished product.
          </p>
          <div className="grid lg:grid-cols-2 gap-16 items-center text-left">
            <div className="space-y-5 text-base md:text-lg text-[var(--theme-text)]">
              <p>It is being built phase by phase.</p>
              <p>As the ecosystem matures, new dimensions are introduced naturally.</p>
              <p className="italic font-medium">This approach allows the platform to grow alongside its community.</p>
            </div>
            <div className="h-72 md:h-[380px] bg-black/70 rounded-2xl shadow-xl flex items-center justify-center text-[var(--theme-text-muted)] text-sm">
              Feature Video
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR PHILOSOPHY ──────────────────────────────────── */}
      <section className="section-padding text-center bg-[var(--theme-bg-section)]">
        <div className="container-global">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-4 font-heading"
          >
            OUR PHILOSOPHY
          </h2>
          <p className="mb-10 text-[var(--theme-text-muted)] text-base md:text-lg">We believe</p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {PHILOSOPHY.map((belief, i) => (
              <div key={i} className="border border-[var(--theme-border)] rounded-xl px-6 py-4 text-left text-sm text-[var(--theme-text)] bg-[var(--theme-card)]">
                {belief}
              </div>
            ))}
          </div>
          <p className="mt-10 italic text-[var(--theme-text-muted)]">GzoneSphere exists to reflect these beliefs.</p>
        </div>
      </section>

      {/* ── FUTURE OF GAMING ────────────────────────────────── */}
      <section className="section-padding text-center bg-[var(--theme-bg)]">
        <div className="container-global">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-4 font-heading"
          >
            THE FUTURE OF GAMING IS NOT MORE APPS.
          </h2>
          <p className="uppercase font-semibold mb-14 text-[var(--theme-text-muted)]">IT'S BETTER SYSTEMS</p>
          <div className="grid lg:grid-cols-2 gap-16 items-center text-left">
            <div className="h-72 md:h-[380px] bg-black/70 rounded-2xl shadow-xl flex items-center justify-center text-[var(--theme-text-muted)] text-sm">
              Feature Video
            </div>
            <div className="space-y-4 text-base md:text-lg text-[var(--theme-text)]">
              {SYSTEM_POINTS.map((pt, i) => (
                <div key={i} className={`px-4 py-3 rounded-lg ${i === 1 ? 'bg-white/40' : ''}`}>
                  • {pt}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-14 space-y-2">
            <p className="font-bold italic text-[var(--theme-text)]">GzoneSphere is being built to become that system.</p>
            <p className="italic text-[var(--theme-text-muted)]">We're here to build something that unfolds with purpose.</p>
          </div>
        </div>
      </section>

      {/* ── DIVIDER 2 ───────────────────────────────────────── */}
      <CTABanner text="ONE ECOSYSTEM. INFINITE POSSIBILITIES." bgClass="bg-[var(--theme-primary)]" size="md" />

      {/* ── Footer ─────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
