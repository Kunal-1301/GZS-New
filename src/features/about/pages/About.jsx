import { Link } from 'react-router-dom';
import {
  FiActivity,
  FiAward,
  FiBookOpen,
  FiCompass,
  FiCpu,
  FiGlobe,
  FiGrid,
  FiUsers,
} from 'react-icons/fi';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import Breadcrumb from '@/shared/components/Breadcrumb';

const PROBLEMS = [
  {
    title: 'Scattered Ecosystem',
    body: 'Gamers still split identity, networking, and discovery across too many unrelated tools and communities.',
  },
  {
    title: 'No Path to Pro',
    body: 'There is no clear structured journey from casual participation to recognition, visibility, and professional opportunity.',
  },
  {
    title: 'Creators Go Unnoticed',
    body: 'Skilled creators, analysts, artists, and competitors are hard to discover when everything lives on disconnected platforms.',
  },
];

const PILLARS = [
  { title: 'Unified Identity', icon: FiUsers },
  { title: 'Profile Systems', icon: FiGrid },
  { title: 'Skill Verification', icon: FiAward },
  { title: 'Gaming Communities', icon: FiGlobe },
  { title: 'Tournament Layer', icon: FiActivity },
  { title: 'Content & Blogs', icon: FiBookOpen },
  { title: 'Discovery Engine', icon: FiCompass },
  { title: 'Future Infrastructure', icon: FiCpu },
];

const TEAM = [
  { name: 'Founder Placeholder', role: 'Vision & Product' },
  { name: 'Community Lead Placeholder', role: 'Community Systems' },
  { name: 'Platform Builder Placeholder', role: 'Engineering & Ecosystem' },
];

export default function About() {
  usePageTheme('about');

  return (
    <div className="bg-white text-slate-900">
      <section className="flex min-h-[240px] items-center bg-[#081A33] text-white">
        <div className="container-global">
          <Breadcrumb
            items={[
              { label: 'Home', to: '/' },
              { label: 'About', to: '/about' },
              { label: 'Details' },
            ]}
            className="mb-5"
          />
          <h1 className="font-display text-4xl uppercase md:text-6xl">About GzoneSphere</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-global max-w-4xl">
          <h2 className="text-3xl font-black text-slate-900">Mission Statement</h2>
          <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
            GzoneSphere exists to build a unified ecosystem for gaming identity, opportunity, creativity, and community. We want the time gamers invest in play, skill, and contribution to lead somewhere meaningful.
          </p>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-global">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black text-slate-900">The Problem We Solve</h2>
            <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">
              Gaming is one of the largest cultures in the world, but the systems around it are still fragmented. The same player can be active, talented, and ambitious yet still invisible because their identity is split across too many places.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PROBLEMS.map((item) => (
              <div key={item.title} className="gzs-card-elevated rounded-3xl">
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-global">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black text-slate-900">The Solution</h2>
            <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">
              GzoneSphere approaches the problem as an ecosystem, not a single feature. The platform is designed as a connected structure with multiple pillars that reinforce one another.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {PILLARS.map(({ title, icon: Icon }) => (
              <div key={title} className="gzs-card-elevated rounded-3xl p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-global">
          <h2 className="text-3xl font-black text-slate-900">The Team</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TEAM.map((member) => (
              <div key={member.name} className="gzs-card-elevated rounded-3xl p-6 text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-200 text-2xl font-bold text-slate-500">
                  GZ
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-900">{member.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-global text-center">
          <h2 className="text-3xl font-black text-slate-900">Join the Platform</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600">
            Build your identity, contribute to the ecosystem, and grow with the next layer of gaming infrastructure.
          </p>
          <Link to="/onboarding/start" className="gzs-btn-primary mt-8">
            Join the Platform →
          </Link>
        </div>
      </section>
    </div>
  );
}
