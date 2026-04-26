export default function OnlineUsers({ users = [] }) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-slate-800 px-4 py-4">
        <h3 className="text-sm font-semibold text-white">Online now</h3>
        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{users.length} members</p>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto px-3 py-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center gap-3 rounded-2xl px-2 py-2 hover:bg-slate-800/60">
            <div className="relative">
              {user.avatar ? (
                <img src={user.avatar} alt={user.username} className="h-10 w-10 rounded-xl object-cover" />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-sm font-semibold text-indigo-200">
                  {user.username?.[0] || 'G'}
                </div>
              )}
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-900 bg-green-500" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-slate-100">{user.username}</div>
              <div className="truncate text-xs text-slate-400">{user.status || 'Active in community'}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
