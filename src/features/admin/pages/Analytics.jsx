import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import { AdminPageHero, AdminPanel } from '../components/AdminContentShell';

const RANGE_OPTIONS = ['Last 7d', '30d', '90d', 'All time'];
const PIE_COLORS = ['#10B981', '#2563EB', '#F59E0B', '#7C3AED'];

function generateActivityData(length, base) {
  return Array.from({ length }, (_, index) => ({
    label: length === 7 ? `D${index + 1}` : `P${index + 1}`,
    users: base + ((index % 7) * 28) + (index * 5),
  }));
}

export default function Analytics() {
  usePageTheme('admin');

  const [range, setRange] = useState('30d');

  const activitySeries = useMemo(() => {
    if (range === 'Last 7d') {
      return generateActivityData(7, 320);
    }
    if (range === '90d') {
      return generateActivityData(12, 540);
    }
    if (range === 'All time') {
      return generateActivityData(16, 680);
    }
    return generateActivityData(10, 420);
  }, [range]);

  const verificationSeries = useMemo(() => (
    [
      { week: 'W1', verifications: 24 },
      { week: 'W2', verifications: 31 },
      { week: 'W3', verifications: 27 },
      { week: 'W4', verifications: 39 },
      { week: 'W5', verifications: 42 },
      { week: 'W6', verifications: 36 },
    ]
  ), []);

  const tournamentSeries = useMemo(() => (
    [
      { domain: 'Esports', tournaments: 18 },
      { domain: 'Dev', tournaments: 9 },
      { domain: 'Art', tournaments: 6 },
      { domain: 'Writing', tournaments: 4 },
      { domain: 'Content', tournaments: 7 },
    ]
  ), []);

  const contentDistribution = useMemo(() => (
    [
      { name: 'Games', value: 38 },
      { name: 'Blogs', value: 24 },
      { name: 'Media', value: 18 },
      { name: 'Community', value: 20 },
    ]
  ), []);

  const kpis = [
    { label: 'DAU', value: '4,280' },
    { label: 'WAU', value: '16,420' },
    { label: 'MAU', value: '52,900' },
    { label: 'Active Tournaments', value: '18' },
  ];

  return (
    <div className="admin-page-shell">
      <Helmet>
        <title>Analytics | GzoneSphere Admin</title>
      </Helmet>

      <AdminPageHero
        kicker="Platform"
        title="Analytics"
        description="Core product metrics across users, content, tournaments, and skill verification activity."
        actions={(
          <div className="flex flex-wrap gap-2">
            {RANGE_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                className={`admin-btn ${range === option ? '' : 'admin-btn--ghost'}`}
                onClick={() => setRange(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      />

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => (
          <article key={item.label} className="admin-card">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{item.label}</p>
            <strong className="mt-3 block text-4xl font-bold text-slate-900">{item.value}</strong>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <AdminPanel title="30-Day User Activity" meta="Trend line for engagement">
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activitySeries}>
                <CartesianGrid stroke="#CBD5E1" strokeDasharray="3 3" />
                <XAxis dataKey="label" stroke="#64748B" tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#10B981" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </AdminPanel>

        <AdminPanel title="Content Distribution by Type" meta="Share of platform content">
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={contentDistribution} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110} paddingAngle={4}>
                  {contentDistribution.map((entry, index) => (
                    <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </AdminPanel>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <AdminPanel title="Tournaments by Domain" meta="Current programming mix">
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tournamentSeries}>
                <CartesianGrid stroke="#CBD5E1" strokeDasharray="3 3" />
                <XAxis dataKey="domain" stroke="#64748B" tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="tournaments" fill="#2563EB" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AdminPanel>

        <AdminPanel title="Skill Verifications per Week" meta="Approval and review volume">
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={verificationSeries}>
                <CartesianGrid stroke="#CBD5E1" strokeDasharray="3 3" />
                <XAxis dataKey="week" stroke="#64748B" tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="verifications" stroke="#0F766E" fill="#99F6E4" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </AdminPanel>
      </section>
    </div>
  );
}
