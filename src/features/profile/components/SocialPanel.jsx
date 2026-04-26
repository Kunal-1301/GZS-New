export default function SocialPanel({
  isOwn = false,
  masterProfile,
  friends = [],
  followers = [],
  mutualConnections = 0,
}) {
  const followingCount = masterProfile?.following_count ?? Math.max(2, Math.round(friends.length * 0.8));

  return (
    <section className="gzs-card-elevated rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">Social panel</h2>
        <p className="mt-1 text-sm text-slate-500">
          {isOwn ? 'Track the size of your network and keep conversations moving.' : 'See how you overlap with this creator’s network.'}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Friends', value: friends.length },
          { label: 'Followers', value: followers.length },
          { label: 'Following', value: followingCount },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl bg-slate-50 p-4 text-center">
            <p className="text-2xl font-semibold text-slate-900">{item.value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
          </div>
        ))}
      </div>

      {isOwn ? (
        <div className="mt-5 flex gap-3">
          <button className="flex-1 rounded-xl bg-violet-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-600">
            Manage friends
          </button>
          <button className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-violet-300 hover:text-violet-700">
            Messages
          </button>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">{mutualConnections} mutual connections</p>
            <p className="mt-1 text-sm text-slate-500">People already in your network who can vouch for the fit.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 rounded-xl bg-violet-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-600">
              Send request
            </button>
            <button className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-violet-300 hover:text-violet-700">
              Follow
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
