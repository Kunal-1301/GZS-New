import { FiCalendar, FiCheckCircle, FiMapPin, FiShield } from 'react-icons/fi';

const LEVEL_STYLES = {
  Beginner: 'bg-sky-100 text-sky-700',
  Hustler: 'bg-violet-100 text-violet-700',
  Extreme: 'bg-orange-100 text-orange-700',
  Pro: 'bg-emerald-100 text-emerald-700',
};

function getTrustTone(score) {
  if (score < 4) return 'text-rose-600 bg-rose-50';
  if (score < 7) return 'text-amber-600 bg-amber-50';
  return 'text-emerald-600 bg-emerald-50';
}

function formatJoined(value) {
  return new Date(value).toLocaleDateString([], {
    month: 'short',
    year: 'numeric',
  });
}

export default function IdentityBanner({ masterProfile, isOwn = false, onEditClick, actionMode = 'edit' }) {
  const trustScore = masterProfile?.trust_score ?? 0;
  const trustTone = getTrustTone(trustScore);
  const levelLabel = masterProfile?.platform_level || 'Beginner';
  const showRealName = masterProfile?.show_real_name && masterProfile?.real_name;

  return (
    <section className="mb-8">
      <div className="relative h-[360px] w-full overflow-hidden bg-gradient-to-br from-violet-700 via-violet-500 to-slate-900 md:h-[600px]">
        {masterProfile?.banner_url ? (
          <img src={masterProfile.banner_url} alt={`${masterProfile.username} banner`} className="h-full w-full object-cover" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <div className="relative -mt-12 flex flex-col gap-5 md:-mt-16 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <div className="h-24 w-24 overflow-hidden rounded-2xl border-4 border-white bg-slate-100 shadow-xl md:h-28 md:w-28">
                <img
                  src={masterProfile?.avatar_url}
                  alt={masterProfile?.display_name || masterProfile?.username}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="md:pb-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">{masterProfile?.display_name || masterProfile?.username}</h1>
                  {masterProfile?.has_verified_skills ? <FiCheckCircle className="text-sky-500" size={20} /> : null}
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${LEVEL_STYLES[levelLabel] || LEVEL_STYLES.Beginner}`}>
                    {levelLabel}
                  </span>
                  <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${trustTone}`}>
                    <FiShield size={14} />
                    <span>Trust {trustScore.toFixed(1)}</span>
                  </span>
                </div>

                {showRealName ? <p className="mt-1 text-sm text-slate-500">{masterProfile.real_name}</p> : null}

                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-2">
                    <FiMapPin size={14} />
                    {masterProfile?.location_city}, {masterProfile?.location_country}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <FiCalendar size={14} />
                    Joined {formatJoined(masterProfile?.created_at)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {actionMode === 'connect' ? (
                <>
                  <button className="rounded-xl border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700 transition hover:bg-violet-100">
                    Connect {'->'}
                  </button>
                  <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-violet-300 hover:text-violet-700">
                    Follow {'->'}
                  </button>
                </>
              ) : null}

              {isOwn ? (
                <button
                  type="button"
                  onClick={onEditClick}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-violet-300 hover:text-violet-700"
                >
                  Edit Profile
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
