import { useState } from 'react';

const DOMAIN_META = {
  dev: { label: 'Dev', color: 'var(--domain-dev)' },
  esports: { label: 'Esports', color: 'var(--domain-esports)' },
  content: { label: 'Content', color: 'var(--domain-content)' },
  business: { label: 'Business', color: 'var(--domain-business)' },
  art: { label: 'Art', color: 'var(--domain-art)' },
  writing: { label: 'Writing', color: 'var(--domain-writing)' },
  audio: { label: 'Audio', color: 'var(--domain-audio)' },
  master: { label: 'Master', color: 'var(--theme-primary)' },
};

function formatDate(value) {
  return new Date(value).toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function PostCard({ post }) {
  const [likes, setLikes] = useState(post.like_count ?? 0);
  const [liked, setLiked] = useState(false);
  const meta = DOMAIN_META[post.sub_profile_type || 'master'] || DOMAIN_META.master;

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <img
          src={post.author?.avatar_url}
          alt={post.author?.display_name}
          className="h-12 w-12 rounded-2xl object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-900">{post.author?.display_name}</h3>
            <span className="text-sm text-slate-400">@{post.author?.username}</span>
            <span
              className="rounded-full px-2.5 py-1 text-xs font-semibold"
              style={{ backgroundColor: `${meta.color}18`, color: meta.color }}
            >
              {meta.label}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">{post.author?.primary_role}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">{formatDate(post.published_at || post.created_at)}</p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-700">{post.content}</p>

      {post.media_urls?.[0] ? (
        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
          <img src={post.media_urls[0]} alt="Post media" className="h-auto w-full object-cover" />
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={() => {
            setLiked((current) => !current);
            setLikes((current) => current + (liked ? -1 : 1));
          }}
          className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
            liked ? 'bg-violet-50 text-violet-700' : 'bg-slate-50 text-slate-600 hover:text-violet-700'
          }`}
        >
          Like ({likes})
        </button>
        <button type="button" className="rounded-xl bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-violet-700">
          Comments ({post.comment_count ?? 0})
        </button>
        <button type="button" className="rounded-xl bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-violet-700">
          Share ({post.share_count ?? 0})
        </button>
      </div>
    </article>
  );
}
