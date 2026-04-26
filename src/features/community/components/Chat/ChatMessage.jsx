import { FiCornerUpLeft, FiFlag, FiHeart, FiTrash2 } from 'react-icons/fi';

function formatTime(value) {
  return new Date(value).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

const reactionEntries = (reactions) =>
  Object.entries(reactions || {}).map(([emoji, users]) => ({
    emoji,
    count: Array.isArray(users) ? users.length : Number(users) || 0,
  }));

export default function ChatMessage({ message, isOwn, isGrouped }) {
  const reactions = reactionEntries(message.reactions);

  if (isGrouped) {
    return (
      <div className="group pl-14 pr-3">
        <div className="rounded-2xl px-3 py-2 text-sm leading-6 text-slate-200 transition hover:bg-slate-900/60">
          {message.content}
        </div>
        {reactions.length ? (
          <div className="mt-2 flex flex-wrap gap-2 pl-3">
            {reactions.map((reaction) => (
              <button
                key={`${message.id}-${reaction.emoji}`}
                className="rounded-full border border-slate-700 bg-slate-900/70 px-2.5 py-1 text-xs text-slate-200"
              >
                {reaction.emoji} {reaction.count}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="group flex gap-3 rounded-2xl px-3 py-3 transition hover:bg-slate-900/60">
      <div className="shrink-0">
        {message.sender?.avatar_url ? (
          <img
            src={message.sender.avatar_url}
            alt={message.sender.display_name || message.sender.username}
            className="h-10 w-10 rounded-xl object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-sm font-semibold text-indigo-200">
            {(message.sender?.display_name || message.sender?.username || 'G')[0]}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-white">
            {message.sender?.display_name || message.sender?.username || 'Community Member'}
          </span>
          <span className="rounded-full bg-indigo-500/15 px-2 py-0.5 text-xs font-medium text-indigo-200">
            {message.branchLabel || 'Community'}
          </span>
          <span className="text-xs text-slate-500">{formatTime(message.created_at)}</span>
        </div>

        <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-200">{message.content}</p>

        {reactions.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {reactions.map((reaction) => (
              <button
                key={`${message.id}-${reaction.emoji}`}
                className="rounded-full border border-slate-700 bg-slate-900/70 px-2.5 py-1 text-xs text-slate-200 transition hover:border-indigo-400/50"
              >
                {reaction.emoji} {reaction.count}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="hidden self-start rounded-xl border border-slate-800 bg-slate-950/90 p-1 opacity-0 transition group-hover:flex group-hover:opacity-100">
        <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-900 hover:text-white" aria-label="Reply">
          <FiCornerUpLeft size={14} />
        </button>
        <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-900 hover:text-white" aria-label="React">
          <FiHeart size={14} />
        </button>
        {isOwn ? (
          <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-900 hover:text-rose-300" aria-label="Delete">
            <FiTrash2 size={14} />
          </button>
        ) : (
          <button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-900 hover:text-amber-300" aria-label="Report">
            <FiFlag size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
