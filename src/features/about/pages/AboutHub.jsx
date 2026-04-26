import { Link } from 'react-router-dom';
import { FiArrowRight, FiCompass, FiFeather } from 'react-icons/fi';
import { usePageTheme } from '@/app/providers/ThemeProvider';

const OPTIONS = [
  {
    title: 'Explore the Ecosystem',
    description: 'See the mission, the problem we solve, and the pillars that make up the GzoneSphere platform.',
    to: '/about/details',
    icon: FiCompass,
  },
  {
    title: 'Enter the Story',
    description: 'Read the long-form origin story and follow the milestones that shaped the platform.',
    to: '/about/origin',
    icon: FiFeather,
  },
];

export default function AboutHub() {
  usePageTheme('about');

  return (
    <div className="min-h-screen bg-[#061325] text-white">
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-[#081A33]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(79,195,220,0.16),transparent_35%),linear-gradient(180deg,#081A33_0%,#040B17_100%)]" />
        <div className="container-global relative z-10 w-full pb-12 pt-24">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/70">About GzoneSphere</p>
            <h1 className="font-display text-5xl uppercase leading-none text-white md:text-7xl">
              About GzoneSphere
            </h1>
            <p className="mt-5 text-lg text-slate-200 md:text-xl">
              One Ecosystem. Built with Purpose.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {OPTIONS.map(({ title, description, to, icon: Icon }) => (
              <div
                key={to}
                className="rounded-3xl border border-white/10 bg-white/8 p-8 backdrop-blur-md"
                style={{ backgroundColor: 'rgba(15, 23, 42, 0.55)' }}
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-cyan-200">
                  <Icon size={26} />
                </div>
                <h2 className="text-2xl font-bold text-white">{title}</h2>
                <p className="mt-3 max-w-md text-sm leading-7 text-slate-300">{description}</p>
                <Link to={to} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                  Continue
                  <FiArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
