import { Link } from 'react-router-dom';
import { FiArrowRight, FiBriefcase, FiCompass, FiStar, FiUsers } from 'react-icons/fi';
import { usePageTheme } from '@/app/providers/ThemeProvider';

const FEATURES = [
  {
    title: 'Find Gaming Jobs',
    body: 'Structured gaming job listings are planned for Phase 2. This section previews the hiring layer that will connect verified talent with gaming companies.',
    icon: FiBriefcase,
    comingSoon: true,
  },
  {
    title: 'Earn from Playtesting',
    body: 'Players and creators will be able to participate in feedback loops, structured test cycles, and compensated pre-release evaluation work.',
    icon: FiStar,
    comingSoon: false,
  },
  {
    title: 'Mentorship Program',
    body: 'Members will be able to learn from experienced professionals through guided mentorship, portfolio feedback, and career direction.',
    icon: FiUsers,
    comingSoon: false,
  },
  {
    title: 'Company Discovery',
    body: 'GzoneSphere is designed so companies can discover credible talent through identity, verification, contribution history, and ecosystem visibility.',
    icon: FiCompass,
    comingSoon: false,
  },
];

export default function Career() {
  usePageTheme('about');

  return (
    <div className="bg-white text-slate-900">
      <section className="bg-[#081A33] py-24 text-white md:py-32">
        <div className="container-global">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/70">Career</p>
          <h1 className="font-display text-5xl uppercase leading-none md:text-7xl">
            Turn Your Gaming Passion Into a Career
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
            GzoneSphere is being built to connect gaming identity with real-world opportunities, discovery, and long-term professional growth.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-global space-y-10">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            const reverse = index % 2 === 1;

            return (
              <div key={feature.title} className={`grid items-center gap-8 rounded-[2rem] bg-slate-50 p-6 md:p-10 lg:grid-cols-2 ${reverse ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''}`}>
                <div className="gzs-card-elevated rounded-3xl">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]">
                    <Icon size={26} />
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold text-slate-900">{feature.title}</h2>
                    {feature.comingSoon ? (
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-amber-700">
                        Phase 2
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-4 text-base leading-8 text-slate-600">{feature.body}</p>
                </div>
                <div className="rounded-[2rem] bg-[#081A33] p-8 text-white md:p-10">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200/70">Opportunity Layer</p>
                  <p className="mt-4 text-lg leading-8 text-slate-200">
                    The career ecosystem is designed to reward visible skill, contribution, and profile depth instead of leaving discovery to chance.
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-global text-center">
          <h2 className="text-3xl font-black text-slate-900">Build your profile to get discovered</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600">
            The stronger your identity and contribution history become, the more useful the future opportunity layer becomes for both talent and companies.
          </p>
          <Link to="/onboarding/start" className="gzs-btn-primary mt-8">
            Build your profile to get discovered
            <FiArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
