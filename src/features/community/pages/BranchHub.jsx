import { Link } from 'react-router-dom';
import { FiCalendar, FiHash, FiLayers, FiUsers } from 'react-icons/fi';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import { COMMUNITY_BRANCHES, MOCK_COMMUNITY_EVENTS, MOCK_GROUPS } from '@/shared/data/communityData';

const BRANCH_ORDER = ['dev', 'esports', 'content', 'business', 'art', 'writing', 'audio', 'general', 'newcomers'];

export default function BranchHub({ slug }) {
  usePageTheme('community');

  const branch = BRANCH_ORDER.map((branchSlug) => COMMUNITY_BRANCHES.find((entry) => entry.slug === branchSlug)).find(
    (entry) => entry?.slug === slug,
  );

  const branchEvents = MOCK_COMMUNITY_EVENTS.filter((event) => event.branch_id === branch?.id).slice(0, 2);
  const branchGroups = MOCK_GROUPS.filter((group) => group.branch_id === branch?.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 px-6 py-7 shadow-2xl sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-300">{branch?.slug || 'community'}</p>
          <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{branch?.name || 'Community Branch'}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">{branch?.description}</p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Jump back in</h2>
                <p className="mt-1 text-sm text-slate-400">Pick the part of the branch you want to explore next.</p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {[
                {
                  title: 'Chat room',
                  description: 'Join the live branch discussion and see who is active now.',
                  icon: FiHash,
                  href: `/community/${slug}/room/general`,
                },
                {
                  title: 'Groups',
                  description: 'Find focused circles for long-term collaboration.',
                  icon: FiUsers,
                  href: `/community/${slug}/groups`,
                },
                {
                  title: 'Events',
                  description: 'Browse upcoming AMAs, workshops, jams, and meetups.',
                  icon: FiCalendar,
                  href: `/community/${slug}/events`,
                },
                {
                  title: 'Showcase',
                  description: 'See what members are building and sharing.',
                  icon: FiLayers,
                  href: `/community/${slug}/showcase`,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 transition hover:border-indigo-500/50 hover:bg-slate-900"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
                      <Icon />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-lg font-semibold text-white">Upcoming events</h2>
              <div className="mt-4 space-y-4">
                {branchEvents.length ? (
                  branchEvents.map((event) => (
                    <div key={event.id} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                      <p className="text-sm font-semibold text-white">{event.title}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-indigo-300">{event.event_type}</p>
                      <p className="mt-2 text-sm text-slate-400">
                        {new Date(event.start_at).toLocaleDateString([], {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">No upcoming events have been scheduled for this branch yet.</p>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-lg font-semibold text-white">Active groups</h2>
              <div className="mt-4 space-y-4">
                {branchGroups.length ? (
                  branchGroups.map((group) => (
                    <div key={group.id} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                      <p className="text-sm font-semibold text-white">{group.name}</p>
                      <p className="mt-2 text-sm text-slate-400">{group.member_count} members</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">Groups for this branch will appear here as the community grows.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
