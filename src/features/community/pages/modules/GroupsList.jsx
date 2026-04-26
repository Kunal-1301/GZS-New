import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MOCK_GROUPS } from '@/shared/data/communityData';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'mine', label: 'My Groups' },
  { key: 'public', label: 'Public' },
  { key: 'private', label: 'Private' },
];

export default function GroupsList() {
  const { slug } = useParams();
  const [filter, setFilter] = useState('all');

  const groups = useMemo(() => {
    const branchGroups = MOCK_GROUPS.filter((group) => group.branch_id.includes(slug));

    return branchGroups.filter((group, index) => {
      if (filter === 'public') return group.visibility === 'public';
      if (filter === 'private') return group.visibility === 'private';
      if (filter === 'mine') return index === 0;
      return true;
    });
  }, [filter, slug]);

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 px-6 py-7">
          <h1 className="text-3xl font-semibold text-white">Groups</h1>
          <p className="mt-2 text-sm text-slate-400">
            Join focused collaboration circles inside the {slug} branch.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {FILTERS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setFilter(item.key)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                filter === item.key ? 'bg-indigo-500 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {groups.map((group, index) => (
            <article key={group.id} className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/15 text-lg font-semibold text-indigo-200">
                  {group.name[0]}
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    group.visibility === 'public'
                      ? 'bg-emerald-500/15 text-emerald-300'
                      : 'bg-amber-500/15 text-amber-300'
                  }`}
                >
                  {group.visibility}
                </span>
              </div>

              <h2 className="mt-5 text-xl font-semibold text-white">{group.name}</h2>
              <p className="mt-2 text-sm text-slate-400">{group.member_count} members</p>
              <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-300">{group.description}</p>
              <p className="mt-4 text-sm text-slate-500">Owner: {group.owner_id}</p>

              <div className="mt-6 flex items-center justify-between">
                <Link
                  to={`/community/${slug}/groups/${group.id}`}
                  className="text-sm font-medium text-indigo-300 transition hover:text-indigo-200"
                >
                  View group
                </Link>
                <button
                  type="button"
                  className={`rounded-xl px-4 py-2 text-sm font-medium text-white ${
                    group.visibility === 'public' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-amber-500 hover:bg-amber-600'
                  }`}
                >
                  {group.visibility === 'public' && index % 2 === 0 ? 'Join' : 'Request'}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
