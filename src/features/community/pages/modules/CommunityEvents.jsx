import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_COMMUNITY_EVENTS } from '@/shared/data/communityData';

const TYPE_STYLES = {
  ama: 'bg-amber-500/15 text-amber-300',
  tournament: 'bg-rose-500/15 text-rose-300',
  jam: 'bg-fuchsia-500/15 text-fuchsia-300',
  workshop: 'bg-indigo-500/15 text-indigo-300',
  watch_party: 'bg-cyan-500/15 text-cyan-300',
};

export default function CommunityEvents() {
  const { slug } = useParams();
  const [showPast, setShowPast] = useState(false);
  const [rsvpCounts, setRsvpCounts] = useState(() =>
    Object.fromEntries(MOCK_COMMUNITY_EVENTS.map((event, index) => [event.id, 20 + index * 9])),
  );

  const { upcomingEvents, pastEvents } = useMemo(() => {
    const now = new Date('2026-04-26T00:00:00Z');
    const branchEvents = MOCK_COMMUNITY_EVENTS.filter((event) => {
      const branchSlug = event.branch_id.split('-')[1];
      return branchSlug === slug;
    }).sort((a, b) => new Date(a.start_at) - new Date(b.start_at));

    return {
      upcomingEvents: branchEvents.filter((event) => new Date(event.start_at) >= now),
      pastEvents: branchEvents.filter((event) => new Date(event.start_at) < now),
    };
  }, [slug]);

  const renderEventCard = (event) => (
    <article key={event.id} className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white">{event.title}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">{event.description}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${TYPE_STYLES[event.event_type] || TYPE_STYLES.workshop}`}>
          {event.event_type}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-400">
          {new Date(event.start_at).toLocaleString([], {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
          })}
        </p>
        <button
          type="button"
          onClick={() => setRsvpCounts((current) => ({ ...current, [event.id]: current[event.id] + 1 }))}
          className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-600"
        >
          RSVP ({rsvpCounts[event.id]})
        </button>
      </div>
    </article>
  );

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 px-6 py-7">
          <h1 className="text-3xl font-semibold text-white">Community events</h1>
          <p className="mt-2 text-sm text-slate-400">Upcoming sessions, workshops, jams, and live branch moments.</p>
        </div>

        <section className="mt-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Upcoming</h2>
          {upcomingEvents.length ? upcomingEvents.map(renderEventCard) : <p className="text-sm text-slate-400">No upcoming events right now.</p>}
        </section>

        <section className="mt-8">
          <button
            type="button"
            onClick={() => setShowPast((current) => !current)}
            className="text-sm font-medium text-indigo-300 transition hover:text-indigo-200"
          >
            {showPast ? 'Hide past events' : 'Show past events'}
          </button>

          {showPast ? <div className="mt-4 space-y-4">{pastEvents.length ? pastEvents.map(renderEventCard) : <p className="text-sm text-slate-400">No past events yet.</p>}</div> : null}
        </section>
      </div>
    </div>
  );
}
