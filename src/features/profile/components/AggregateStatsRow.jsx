function StatTile({ label, value, color, vertical = false }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${vertical ? '' : 'min-h-[124px]'}`}>
      <p className="text-3xl font-semibold" style={{ color }}>
        {value}
      </p>
      <p className="mt-2 text-sm text-slate-500">{label}</p>
    </div>
  );
}

export default function AggregateStatsRow({
  masterProfile,
  subProfiles = [],
  skills = [],
  friends = [],
  followers = [],
  vertical = false,
}) {
  const stats = [
    {
      label: 'Total verified skills',
      value: skills.filter((skill) => skill.verified).length,
      color: 'var(--domain-dev)',
    },
    {
      label: 'Active sub-profiles',
      value: subProfiles.filter((profile) => profile.is_active).length,
      color: 'var(--domain-content)',
    },
    {
      label: 'Network reach',
      value: friends.length + followers.length,
      color: 'var(--domain-business)',
    },
    {
      label: 'Trust score',
      value: (masterProfile?.trust_score ?? 0).toFixed(1),
      color: 'var(--theme-primary)',
    },
  ];

  return (
    <section className={vertical ? 'space-y-4' : 'grid grid-cols-2 gap-4 lg:grid-cols-4'}>
      {stats.map((stat) => (
        <StatTile key={stat.label} {...stat} vertical={vertical} />
      ))}
    </section>
  );
}
