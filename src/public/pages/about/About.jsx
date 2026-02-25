import CTABanner from './components/CTABanner';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

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
  return (
    <div className="min-h-screen bg-ab-bg text-ab-text font-inter">

      {/* ── Navbar ─────────────────────────────────────────── */}
      <Navbar logoVariant="blue" loginVariant="blue" isDark={false} accent="blue" />

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="bg-ab-primary section-padding text-center">
        <div className="container-global">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-wide text-white mb-6"
            style={{ fontFamily: 'Impact, "Arial Narrow", sans-serif' }}
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
      <section className="section-padding bg-ab-bg">
        <div className="container-global grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-5 text-ab-text text-base md:text-lg leading-relaxed">
            <p>Yet despite its scale, gaming today is deeply fragmented.</p>
            <p>Gamers are forced to split their time, identity, and effort across multiple platforms.</p>
            <p>Communities become chaotic. Progress becomes invisible. Opportunities feel scattered and inconsistent.</p>
            <p className="font-semibold">The result is a gaming experience that feels disjointed, despite being global.</p>
          </div>
          <div className="h-72 md:h-[380px] bg-black/70 rounded-2xl shadow-xl flex items-center justify-center text-ab-text-muted text-sm">
            Feature Video
          </div>
        </div>
      </section>

      {/* ── DIVIDER 1 ───────────────────────────────────────── */}
      <CTABanner text="GZONESPHERE WAS CREATED TO CHANGE THAT." bgClass="bg-ab-primary" size="md" />

      {/* ── UNIFIED ECOSYSTEM ───────────────────────────────── */}
      <section className="section-padding text-center bg-ab-bg">
        <div className="container-global">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-5"
            style={{ fontFamily: 'Impact, "Arial Narrow", sans-serif' }}
          >
            A UNIFIED GAMING ECOSYSTEM
          </h2>
          <p className="max-w-3xl mx-auto text-ab-text-muted text-sm sm:text-base md:text-lg mb-6 leading-relaxed">
            GzoneSphere is being built as a unified gaming ecosystem — a single, structured environment
            where identity, growth, creativity, and connection exist together.
          </p>
          <p className="uppercase font-semibold mb-10 tracking-wider text-ab-text text-sm">
            AT ITS CORE, GZONESPHERE IS CENTERED AROUND ONE GAMING IDENTITY.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {IDENTITY_TAGS.map((tag, i) => (
              <div
                key={i}
                className={`px-5 py-2.5 text-sm rounded-lg border transition ${tag.filled
                  ? 'bg-ab-tag-filled text-white border-ab-tag-filled shadow-md'
                  : 'border-ab-border text-ab-text'
                  }`}
              >
                {tag.text}
              </div>
            ))}
          </div>

          <p className="max-w-3xl mx-auto text-ab-text-muted text-sm sm:text-base md:text-lg leading-relaxed">
            Instead of starting over on every platform, your presence lives in one place — evolving as you compete, create, learn, and connect.
          </p>
        </div>
      </section>

      {/* ── "JUST A GAME" ────────────────────────────────────── */}
      <section className="section-padding bg-ab-bg-section">
        <div className="container-global grid lg:grid-cols-2 gap-16 items-start">
          <div className="h-72 md:h-[380px] bg-black/70 rounded-2xl shadow-xl flex items-center justify-center text-ab-text-muted text-sm">
            Feature Video
          </div>
          <div className="text-ab-text text-base md:text-lg leading-relaxed space-y-5">
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
      <section className="section-padding text-center bg-ab-bg">
        <div className="container-global">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-5"
            style={{ fontFamily: 'Impact, "Arial Narrow", sans-serif' }}
          >
            DESIGNED TO EVOLVE
          </h2>
          <p className="mb-14 text-ab-text-muted text-base md:text-lg">
            GzoneSphere is not launched as a finished product.
          </p>
          <div className="grid lg:grid-cols-2 gap-16 items-center text-left">
            <div className="space-y-5 text-base md:text-lg text-ab-text">
              <p>It is being built phase by phase.</p>
              <p>As the ecosystem matures, new dimensions are introduced naturally.</p>
              <p className="italic font-medium">This approach allows the platform to grow alongside its community.</p>
            </div>
            <div className="h-72 md:h-[380px] bg-black/70 rounded-2xl shadow-xl flex items-center justify-center text-ab-text-muted text-sm">
              Feature Video
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR PHILOSOPHY ──────────────────────────────────── */}
      <section className="section-padding text-center bg-ab-bg-section">
        <div className="container-global">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-4"
            style={{ fontFamily: 'Impact, "Arial Narrow", sans-serif' }}
          >
            OUR PHILOSOPHY
          </h2>
          <p className="mb-10 text-ab-text-muted text-base md:text-lg">We believe</p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {PHILOSOPHY.map((belief, i) => (
              <div key={i} className="border border-ab-border rounded-xl px-6 py-4 text-left text-sm text-ab-text bg-ab-card">
                {belief}
              </div>
            ))}
          </div>
          <p className="mt-10 italic text-ab-text-muted">GzoneSphere exists to reflect these beliefs.</p>
        </div>
      </section>

      {/* ── FUTURE OF GAMING ────────────────────────────────── */}
      <section className="section-padding text-center bg-ab-bg">
        <div className="container-global">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-4"
            style={{ fontFamily: 'Impact, "Arial Narrow", sans-serif' }}
          >
            THE FUTURE OF GAMING IS NOT MORE APPS.
          </h2>
          <p className="uppercase font-semibold mb-14 text-ab-text-muted">IT'S BETTER SYSTEMS</p>
          <div className="grid lg:grid-cols-2 gap-16 items-center text-left">
            <div className="h-72 md:h-[380px] bg-black/70 rounded-2xl shadow-xl flex items-center justify-center text-ab-text-muted text-sm">
              Feature Video
            </div>
            <div className="space-y-4 text-base md:text-lg text-ab-text">
              {SYSTEM_POINTS.map((pt, i) => (
                <div key={i} className={`px-4 py-3 rounded-lg ${i === 1 ? 'bg-white/40' : ''}`}>
                  • {pt}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-14 space-y-2">
            <p className="font-bold italic text-ab-text">GzoneSphere is being built to become that system.</p>
            <p className="italic text-ab-text-muted">We're here to build something that unfolds with purpose.</p>
          </div>
        </div>
      </section>

      {/* ── DIVIDER 2 ───────────────────────────────────────── */}
      <CTABanner text="ONE ECOSYSTEM. INFINITE POSSIBILITIES." bgClass="bg-ab-primary" size="md" />

      {/* ── Footer ─────────────────────────────────────────── */}
      <Footer variant="light" accent="blue" />
    </div>
  );
}
