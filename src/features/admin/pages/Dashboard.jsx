import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { FiAlertTriangle, FiArrowUpRight, FiCheckCircle, FiClock, FiShield, FiUsers } from 'react-icons/fi';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import { mockApiService } from '@services/mockApiService';
import { AdminPageHero, AdminPanel } from '../components/AdminContentShell';

const STAT_TRENDS = {
  users: 12,
  tournaments: 8,
  games: 6,
  verifications: 14,
};

const CHART_COLORS = {
  grid: '#CBD5E1',
  axis: '#64748B',
  line: '#10B981',
  bar: '#2563EB',
  tooltip: '#0F172A',
};

function buildRegistrationSeries(totalUsers) {
  return Array.from({ length: 30 }, (_, index) => ({
    day: `D${index + 1}`,
    registrations: Math.max(12, Math.round(totalUsers / 8) + ((index % 5) * 9) + ((index * 3) % 17)),
  }));
}

function formatProofStatus(status) {
  const normalized = String(status || '').toLowerCase();

  if (normalized.includes('approved')) {
    return 'Approved';
  }

  if (normalized.includes('rejected')) {
    return 'Rejected';
  }

  return 'Pending';
}

function getPriorityClass(priority) {
  if (priority === 'High') {
    return 'bg-red-100 text-red-700';
  }

  if (priority === 'Medium') {
    return 'bg-amber-100 text-amber-700';
  }

  return 'bg-emerald-100 text-emerald-700';
}

export default function Dashboard() {
  usePageTheme('admin');

  const { data: users = [] } = useQuery({
    queryKey: ['admin', 'dashboard', 'users'],
    queryFn: mockApiService.getAllUsers,
  });
  const { data: games = [] } = useQuery({
    queryKey: ['admin', 'dashboard', 'games'],
    queryFn: mockApiService.getAllGames,
  });
  const { data: tournaments = [] } = useQuery({
    queryKey: ['admin', 'dashboard', 'tournaments'],
    queryFn: mockApiService.getAllTournaments,
  });
  const { data: proofs = [] } = useQuery({
    queryKey: ['admin', 'dashboard', 'proofs'],
    queryFn: mockApiService.getAllSkillProofs,
  });
  const { data: activity = [] } = useQuery({
    queryKey: ['admin', 'dashboard', 'activity'],
    queryFn: mockApiService.getAllActivity,
  });
  const { data: communityPosts = [] } = useQuery({
    queryKey: ['admin', 'dashboard', 'community-posts'],
    queryFn: mockApiService.getAllCommunityPosts,
  });
  const { data: branches = [] } = useQuery({
    queryKey: ['admin', 'dashboard', 'branches'],
    queryFn: mockApiService.getBranches,
  });

  const stats = useMemo(() => {
    const activeTournaments = tournaments.filter((item) => {
      const status = String(item.status || '').toLowerCase();
      return status.includes('upcoming') || status.includes('live') || status.includes('open');
    }).length;
    const totalGames = games.length;
    const pendingVerifications = proofs.filter((item) => formatProofStatus(item.status) === 'Pending').length;

    return [
      { label: 'Total Users', value: users.length.toLocaleString(), trend: STAT_TRENDS.users },
      { label: 'Active Tournaments', value: activeTournaments.toLocaleString(), trend: STAT_TRENDS.tournaments },
      { label: 'Total Games', value: totalGames.toLocaleString(), trend: STAT_TRENDS.games },
      { label: 'Pending Verifications', value: pendingVerifications.toLocaleString(), trend: STAT_TRENDS.verifications },
    ];
  }, [games.length, proofs, tournaments, users.length]);

  const recentActivity = useMemo(() => {
    return activity.slice(0, 6).map((item, index) => ({
      id: item.id ?? `activity-${index}`,
      title: item.content,
      meta: `${item.user} in ${item.profile}`,
      time: item.date,
    }));
  }, [activity]);

  const pendingActions = useMemo(() => {
    const pendingProofs = proofs
      .filter((item) => formatProofStatus(item.status) === 'Pending')
      .slice(0, 2)
      .map((item) => ({
        id: item.id,
        label: `${item.user} submitted ${item.skill}`,
        detail: `${item.group} verification pending review`,
        priority: 'High',
        action: 'Review proof',
      }));

    const flaggedPosts = communityPosts
      .filter((item) => ['Flagged', 'In Review'].includes(item.status))
      .slice(0, 2)
      .map((item) => ({
        id: item.id,
        label: item.title,
        detail: `${item.type} content needs moderation`,
        priority: item.status === 'Flagged' ? 'High' : 'Medium',
        action: 'Open queue',
      }));

    const tournamentApprovals = tournaments.slice(0, 2).map((item) => ({
      id: item.id,
      label: item.name || item.title || 'Tournament approval',
      detail: 'Confirm brackets, prize pool, and publication state',
      priority: 'Low',
      action: 'Approve setup',
    }));

    return [...pendingProofs, ...flaggedPosts, ...tournamentApprovals].slice(0, 5);
  }, [communityPosts, proofs, tournaments]);

  const registrationSeries = useMemo(() => buildRegistrationSeries(users.length || 120), [users.length]);

  const domainSeries = useMemo(() => {
    if (!branches.length) {
      return [];
    }

    return branches.slice(0, 6).map((branch, index) => ({
      domain: branch.name.replace(/\s*&\s*/g, ' & '),
      registrations: Math.max(14, Math.round((branch.members || 0) / 40) + ((index + 2) * 6)),
    }));
  }, [branches]);

  return (
    <div className="admin-page-shell">
      <Helmet>
        <title>Dashboard | GzoneSphere Admin</title>
      </Helmet>

      <AdminPageHero
        kicker="Admin Overview"
        title="Dashboard"
        description="Platform health, moderation pressure, and registration flow in one dark-shell command centre."
      />

      <section className="admin-stats-grid">
        {stats.map((stat) => (
          <article key={stat.label} className="admin-stat-card">
            <span className="admin-stat-label">{stat.label}</span>
            <strong className="admin-stat-number">{stat.value}</strong>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600">
              <FiArrowUpRight size={16} />
              +{stat.trend}% vs last week
            </span>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <AdminPanel title="Recent Platform Activity" meta="Ticker feed from mock platform events">
          <div className="space-y-3">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.meta}</p>
                </div>
                <span className="shrink-0 text-xs font-semibold text-slate-500">{item.time}</span>
              </div>
            ))}
          </div>
        </AdminPanel>

        <AdminPanel title="Pending Actions" meta="Verification requests, reports, and approvals">
          <div className="space-y-3">
            {pendingActions.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.detail}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase ${getPriorityClass(item.priority)}`}>
                    {item.priority}
                  </span>
                </div>
                <div className="mt-3">
                  <button type="button" className="admin-btn admin-btn--ghost">
                    {item.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </AdminPanel>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <AdminPanel title="User Registrations" meta="Last 30 days">
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={registrationSeries}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke={CHART_COLORS.axis} tickLine={false} axisLine={false} />
                <YAxis stroke={CHART_COLORS.axis} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: CHART_COLORS.tooltip, border: 'none', borderRadius: 12, color: '#F8FAFC' }} />
                <Line type="monotone" dataKey="registrations" stroke={CHART_COLORS.line} strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </AdminPanel>

        <AdminPanel title="Tournament Registrations by Domain" meta="Current pipeline">
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={domainSeries}>
                <CartesianGrid stroke={CHART_COLORS.grid} strokeDasharray="3 3" />
                <XAxis dataKey="domain" stroke={CHART_COLORS.axis} tickLine={false} axisLine={false} />
                <YAxis stroke={CHART_COLORS.axis} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: CHART_COLORS.tooltip, border: 'none', borderRadius: 12, color: '#F8FAFC' }} />
                <Bar dataKey="registrations" fill={CHART_COLORS.bar} radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AdminPanel>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="admin-card">
          <div className="flex items-center gap-3">
            <FiUsers className="text-emerald-600" size={18} />
            <strong className="text-slate-900">Community Growth</strong>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Registrations are strongest in the first and third week of the month, with gaming and general branches driving most conversions.
          </p>
        </div>
        <div className="admin-card">
          <div className="flex items-center gap-3">
            <FiShield className="text-blue-600" size={18} />
            <strong className="text-slate-900">Moderation Health</strong>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Verification backlog is manageable, but flagged community content is trending upward and should be cleared before the weekend spike.
          </p>
        </div>
        <div className="admin-card">
          <div className="flex items-center gap-3">
            <FiClock className="text-amber-600" size={18} />
            <strong className="text-slate-900">Admin Watchlist</strong>
          </div>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li className="flex items-center gap-2"><FiCheckCircle size={14} className="text-emerald-600" /> Review skill approvals inside 4 hours</li>
            <li className="flex items-center gap-2"><FiAlertTriangle size={14} className="text-amber-600" /> Confirm tournament publication settings</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
