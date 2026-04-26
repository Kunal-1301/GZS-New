import { Link } from 'react-router-dom';

const DOMAIN_META = {
  dev: { label: 'Dev', color: 'var(--domain-dev)' },
  esports: { label: 'Esports', color: 'var(--domain-esports)' },
  content: { label: 'Content', color: 'var(--domain-content)' },
  business: { label: 'Business', color: 'var(--domain-business)' },
  art: { label: 'Art', color: 'var(--domain-art)' },
  writing: { label: 'Writing', color: 'var(--domain-writing)' },
  audio: { label: 'Audio', color: 'var(--domain-audio)' },
};

const EXPERIENCE_LABELS = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
};

function getStatusConfig(isActive) {
  if (isActive === true) return { label: 'Active', dot: 'bg-emerald-500' };
  if (isActive === false) return { label: 'Dormant', dot: 'bg-slate-400' };
  return { label: 'Idle', dot: 'bg-amber-500' };
}

export default function SubProfileCard({ subProfile, isOwn, username, skills = [] }) {
  const meta = DOMAIN_META[subProfile.type] || DOMAIN_META.dev;
  const status = getStatusConfig(subProfile.is_active);
  const orderedSkills = [...skills].sort((a, b) => Number(b.verified) - Number(a.verified)).slice(0, 3);

  return (
    <article
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
      style={{ borderLeft: `4px solid ${meta.color}` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span
            className="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: `${meta.color}18`, color: meta.color }}
          >
            {meta.label}
          </span>
          <h3 className="mt-4 text-xl font-semibold text-slate-900">{subProfile.username}</h3>
          <p className="mt-1 text-sm text-slate-500">{subProfile.primary_role}</p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {EXPERIENCE_LABELS[subProfile.experience_level] || subProfile.experience_level}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {orderedSkills.map((skill) => (
          <span
            key={skill.id}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              skill.verified ? 'bg-violet-50 text-violet-700' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {skill.name}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 text-sm text-slate-500">
          <span className={`h-2.5 w-2.5 rounded-full ${status.dot}`} />
          <span>{status.label}</span>
        </div>

        <div className="flex items-center gap-2">
          {isOwn ? (
            <Link
              to={`/profile/${subProfile.type}/edit`}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-violet-300 hover:text-violet-700"
            >
              Edit
            </Link>
          ) : null}
          <Link
            to={isOwn ? `/profile/${subProfile.type}` : `/u/${username || subProfile.username}`}
            className="rounded-xl bg-violet-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-violet-600"
          >
            View {'->'}
          </Link>
        </div>
      </div>
    </article>
  );
}
