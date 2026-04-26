import { usePageTheme } from '@/app/providers/ThemeProvider';
import Breadcrumb from '@/shared/components/Breadcrumb';
import { images } from '@/shared/data/images';

const TIMELINE = [
  { year: '2024', title: 'The Problem Became Clear', body: 'The idea started with a simple frustration: gaming culture was massive, but the systems around it still felt broken and scattered.' },
  { year: '2025', title: 'The Ecosystem Framing', body: 'The concept evolved from another app into a wider ecosystem where identity, growth, and opportunity could finally connect.' },
  { year: '2026', title: 'Phase-Based Buildout', body: 'GzoneSphere began taking shape as a phased platform designed to grow with the community rather than launch as a disconnected bundle of features.' },
];

export default function AboutStory() {
  usePageTheme('about');

  return (
    <div
      className="min-h-screen bg-[#020817] text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(2,8,23,0.82), rgba(2,8,23,0.96)), url(${images.aboutStory})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container-global px-6 py-10">
        <Breadcrumb
          items={[
            { label: 'Home', to: '/' },
            { label: 'About', to: '/about' },
            { label: 'Origin' },
          ]}
          className="mb-10"
        />

        <section className="mx-auto max-w-5xl py-12 md:py-20">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/70">The Origin</p>
          <h1 className="font-display text-5xl uppercase leading-none text-white md:text-7xl">
            The Story of GzoneSphere
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
            GzoneSphere was born from a feeling many gamers understand deeply: the sense that gaming culture kept growing, but the systems meant to support it never truly caught up.
          </p>
        </section>

        <section className="mx-auto max-w-4xl space-y-16 pb-16">
          <article className="rounded-[2rem] border border-white/10 bg-black/25 p-8 backdrop-blur-sm md:p-10">
            <h2 className="font-serif text-3xl text-white md:text-5xl">Chapter One: The Gap</h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-slate-200">
              <p>
                People played, competed, created, streamed, edited, coached, organised, and built communities around games every day. But their identity was split across too many surfaces. Recognition was inconsistent. Opportunity was accidental.
              </p>
              <p>
                A person could be talented in one corner of the ecosystem and invisible in the next. Communities had energy, but not always structure. Platforms had reach, but not always purpose.
              </p>
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-black/25 p-8 backdrop-blur-sm md:p-10">
            <h2 className="font-serif text-3xl text-white md:text-5xl">Chapter Two: The Shift</h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-slate-200">
              <p>
                The core insight was that gaming did not need one more disconnected feature. It needed a shared structure. Something that could hold identity, progress, community, tournaments, content, and future opportunity in one ecosystem.
              </p>
              <p>
                That meant thinking beyond a single feed or utility page. It meant designing an infrastructure layer for gaming culture itself.
              </p>
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-black/25 p-8 backdrop-blur-sm md:p-10">
            <h2 className="font-serif text-3xl text-white md:text-5xl">Chapter Three: The Build</h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-slate-200">
              <p>
                GzoneSphere is being built in phases because ecosystems work best when they evolve with the people inside them. Each layer should earn its place. Each new system should strengthen the ones before it.
              </p>
              <p>
                That is why the story is still unfolding. This platform is not only about what already exists, but about what becomes possible when the right foundations are finally in place.
              </p>
            </div>
          </article>
        </section>

        <section className="mx-auto max-w-4xl pb-24">
          <h2 className="font-serif text-3xl text-white md:text-5xl">Milestones</h2>
          <div className="mt-10 space-y-8">
            {TIMELINE.map((item) => (
              <div key={item.year} className="grid gap-4 rounded-[2rem] border border-white/10 bg-black/25 p-6 backdrop-blur-sm md:grid-cols-[120px_minmax(0,1fr)] md:p-8">
                <div className="text-cyan-200">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em]">{item.year}</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-base leading-8 text-slate-200">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
