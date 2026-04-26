import { Fragment, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiChevronDown, FiChevronUp, FiDownload } from 'react-icons/fi';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import { AdminPageHero, AdminPanel } from '../components/AdminContentShell';

const ACTION_TYPES = [
  'all',
  'user.suspend',
  'skill.verify',
  'skill.reject',
  'tournament.create',
  'tournament.result',
  'content.publish',
  'content.archive',
];

const LOGS = [
  {
    id: 'log-1',
    timestamp: '2026-04-26T09:10:00+05:30',
    actor: 'admin_jaya',
    role: 'Moderator',
    action: 'skill.verify',
    entity: 'proof:P1',
    before: { status: 'Pending', reviewer: null },
    after: { status: 'Approved', reviewer: 'admin_jaya' },
  },
  {
    id: 'log-2',
    timestamp: '2026-04-25T18:22:00+05:30',
    actor: 'admin_ryan',
    role: 'Admin',
    action: 'user.suspend',
    entity: 'user:U3',
    before: { status: 'Active', strikeCount: 1 },
    after: { status: 'Suspended', duration: '7d', strikeCount: 2 },
  },
  {
    id: 'log-3',
    timestamp: '2026-04-24T14:05:00+05:30',
    actor: 'admin_maya',
    role: 'Admin',
    action: 'tournament.create',
    entity: 'tournament:T99',
    before: { exists: false },
    after: { exists: true, title: 'Gzone Open Spring Cup' },
  },
  {
    id: 'log-4',
    timestamp: '2026-04-23T11:45:00+05:30',
    actor: 'admin_jaya',
    role: 'Moderator',
    action: 'content.archive',
    entity: 'blog:203',
    before: { status: 'Published' },
    after: { status: 'Archived', reason: 'Outdated information' },
  },
];

function withinDateRange(timestamp, range) {
  if (range === 'all') {
    return true;
  }

  const now = new Date('2026-04-26T12:00:00+05:30').getTime();
  const target = new Date(timestamp).getTime();
  const diff = now - target;

  if (range === '24h') {
    return diff <= 24 * 60 * 60 * 1000;
  }

  if (range === '7d') {
    return diff <= 7 * 24 * 60 * 60 * 1000;
  }

  return diff <= 30 * 24 * 60 * 60 * 1000;
}

export default function AuditLogs() {
  usePageTheme('admin');

  const [actionFilter, setActionFilter] = useState('all');
  const [dateRange, setDateRange] = useState('7d');
  const [actorFilter, setActorFilter] = useState('');
  const [expanded, setExpanded] = useState(null);

  const filteredLogs = useMemo(() => {
    const query = actorFilter.trim().toLowerCase();

    return LOGS.filter((log) => {
      const actionMatch = actionFilter === 'all' || log.action === actionFilter;
      const dateMatch = withinDateRange(log.timestamp, dateRange);
      const actorMatch = !query || log.actor.toLowerCase().includes(query);
      return actionMatch && dateMatch && actorMatch;
    });
  }, [actionFilter, actorFilter, dateRange]);

  function handleExport() {
    const header = ['Timestamp', 'Actor', 'Role', 'Action', 'Entity'];
    const lines = filteredLogs.map((log) => [log.timestamp, log.actor, log.role, log.action, log.entity].join(','));
    const csv = [header.join(','), ...lines].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'audit-logs.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="admin-page-shell admin-table-page">
      <Helmet>
        <title>Audit Logs | GzoneSphere Admin</title>
      </Helmet>

      <AdminPageHero
        kicker="Platform"
        title="Audit Logs"
        description="Track admin actions, compare before and after payloads, and export the active audit slice to CSV."
        actions={(
          <button type="button" className="admin-btn" onClick={handleExport}>
            <FiDownload size={16} />
            Export to CSV
          </button>
        )}
      />

      <AdminPanel title="Audit Trail" meta="Filter by action type, date range, and actor">
        <div className="admin-filter-bar" style={{ gridTemplateColumns: 'repeat(3, minmax(180px, 1fr))' }}>
          <select className="admin-select" value={actionFilter} onChange={(event) => setActionFilter(event.target.value)}>
            {ACTION_TYPES.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
          <select className="admin-select" value={dateRange} onChange={(event) => setDateRange(event.target.value)}>
            <option value="24h">Last 24h</option>
            <option value="7d">Last 7d</option>
            <option value="30d">Last 30d</option>
            <option value="all">All time</option>
          </select>
          <input className="admin-input" value={actorFilter} onChange={(event) => setActorFilter(event.target.value)} placeholder="Filter by actor" />
        </div>

        <div className="admin-table-wrap mt-5">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Actor</th>
                <th>Role</th>
                <th>Action</th>
                <th>Entity</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <Fragment key={log.id}>
                  <tr key={log.id}>
                    <td>{new Date(log.timestamp).toLocaleString()}</td>
                    <td>{log.actor}</td>
                    <td>{log.role}</td>
                    <td>{log.action}</td>
                    <td>{log.entity}</td>
                    <td>
                      <button type="button" className="admin-btn admin-btn--ghost" onClick={() => setExpanded((value) => (value === log.id ? null : log.id))}>
                        {expanded === log.id ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
                        Details
                      </button>
                    </td>
                  </tr>
                  {expanded === log.id ? (
                    <tr key={`${log.id}-details`}>
                      <td colSpan={6}>
                        <div className="grid gap-4 bg-slate-50 p-4 md:grid-cols-2">
                          <div className="rounded-2xl border border-slate-200 bg-white p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Before</p>
                            <pre className="mt-3 overflow-x-auto text-xs text-slate-700">{JSON.stringify(log.before, null, 2)}</pre>
                          </div>
                          <div className="rounded-2xl border border-slate-200 bg-white p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">After</p>
                            <pre className="mt-3 overflow-x-auto text-xs text-slate-700">{JSON.stringify(log.after, null, 2)}</pre>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              ))}
              {!filteredLogs.length ? (
                <tr>
                  <td colSpan={6} className="admin-table-empty">No audit entries match the current filters.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </AdminPanel>
    </div>
  );
}
