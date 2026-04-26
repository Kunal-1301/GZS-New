import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import { useToast } from '@/shared/components/Toast';
import { mockApiService } from '@services/mockApiService';
import { AdminPageHero, AdminPanel } from '../components/AdminContentShell';

const ROLE_OPTIONS = ['All', 'Member', 'Moderator', 'Admin'];
const LEVEL_OPTIONS = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Pro'];
const STATUS_OPTIONS = ['All', 'Active', 'Pending', 'Suspended', 'Banned'];
const TRUST_OPTIONS = ['All', '0-3', '4-6', '7-10'];
const SUSPEND_DURATIONS = ['24h', '7d', '30d', 'Permanent'];

function getTrustClass(score) {
  if (score < 4) {
    return 'text-red-600';
  }

  if (score < 7) {
    return 'text-amber-600';
  }

  return 'text-emerald-600';
}

function buildUserRecord(user, index) {
  const roles = ['Member', 'Moderator', 'Admin'];
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Pro'];
  const trustScore = Number((3.4 + ((index * 1.7) % 6.3)).toFixed(1));

  return {
    id: user.id,
    username: user.user,
    email: `${user.user}@gzonesphere.dev`,
    level: levels[index % levels.length],
    trustScore,
    role: roles[index % roles.length],
    status: user.status === 'Pending' ? 'Pending' : 'Active',
    joined: user.created,
    avatar: String(user.user || 'U').slice(0, 2).toUpperCase(),
  };
}

export default function UsersManagement() {
  usePageTheme('admin');

  const navigate = useNavigate();
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [trustFilter, setTrustFilter] = useState('All');
  const [suspendTarget, setSuspendTarget] = useState(null);
  const [suspendDuration, setSuspendDuration] = useState('24h');
  const [suspendReason, setSuspendReason] = useState('');
  const { data: rawUsers = [], refetch } = useQuery({
    queryKey: ['admin', 'users-management'],
    queryFn: mockApiService.getAllUsers,
  });

  const users = useMemo(() => rawUsers.map(buildUserRecord), [rawUsers]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const query = search.trim().toLowerCase();
      const searchMatch = !query || user.username.toLowerCase().includes(query) || user.email.toLowerCase().includes(query);
      const roleMatch = roleFilter === 'All' || user.role === roleFilter;
      const levelMatch = levelFilter === 'All' || user.level === levelFilter;
      const statusMatch = statusFilter === 'All' || user.status === statusFilter;
      const trustMatch = trustFilter === 'All'
        || (trustFilter === '0-3' && user.trustScore < 4)
        || (trustFilter === '4-6' && user.trustScore >= 4 && user.trustScore < 7)
        || (trustFilter === '7-10' && user.trustScore >= 7);

      return searchMatch && roleMatch && levelMatch && statusMatch && trustMatch;
    });
  }, [levelFilter, roleFilter, search, statusFilter, trustFilter, users]);

  async function updateStatus(id, status) {
    await mockApiService.updateUser(id, { status });
    refetch();
  }

  async function handleRoleEdit(user) {
    const nextRole = window.prompt(`Set a new role for ${user.username}`, user.role);

    if (!nextRole) {
      return;
    }

    showToast(`Role updated to ${nextRole}.`, 'success');
  }

  async function handleSuspendSubmit() {
    if (!suspendTarget) {
      return;
    }

    await updateStatus(suspendTarget.id, 'Suspended');
    showToast(`User suspended for ${suspendDuration}.`, 'success');
    setSuspendTarget(null);
    setSuspendDuration('24h');
    setSuspendReason('');
  }

  async function handleBan(user) {
    if (!window.confirm(`Ban ${user.username}?`)) {
      return;
    }

    await updateStatus(user.id, 'Banned');
    showToast('User banned.', 'success');
  }

  return (
    <div className="admin-page-shell admin-table-page">
      <Helmet>
        <title>Users Management | GzoneSphere Admin</title>
      </Helmet>

      <AdminPageHero
        kicker="Users"
        title="Users Management"
        description="Review account health, trust scores, and moderation actions across the platform."
      />

      <AdminPanel title="User Directory" meta="Search, filter, and moderate accounts">
        <div className="admin-filter-bar">
          <input className="admin-input" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search username or email" />
          <select className="admin-select" value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
            {ROLE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
          <select className="admin-select" value={levelFilter} onChange={(event) => setLevelFilter(event.target.value)}>
            {LEVEL_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
          <select className="admin-select" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            {STATUS_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
          <select className="admin-select" value={trustFilter} onChange={(event) => setTrustFilter(event.target.value)}>
            {TRUST_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>

        <div className="admin-table-wrap mt-5">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Level</th>
                <th>Trust Score</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white">
                        {user.avatar}
                      </span>
                      <span className="font-semibold text-slate-900">{user.username}</span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.level}</td>
                  <td className={`font-bold ${getTrustClass(user.trustScore)}`}>{user.trustScore}</td>
                  <td>{user.role}</td>
                  <td>{user.status}</td>
                  <td>{user.joined}</td>
                  <td>
                    <div className="admin-action-row justify-start">
                      <button type="button" className="admin-btn admin-btn--ghost" onClick={() => navigate(`/admin/users/${user.id}`)}>
                        View Profile
                      </button>
                      <button type="button" className="admin-btn admin-btn--ghost" onClick={() => handleRoleEdit(user)}>
                        Edit Role
                      </button>
                      <button type="button" className="admin-btn admin-btn--ghost" onClick={() => setSuspendTarget(user)}>
                        Suspend
                      </button>
                      <button type="button" className="admin-btn !border-red-600 !bg-red-600" onClick={() => handleBan(user)}>
                        Ban
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!filteredUsers.length ? (
                <tr>
                  <td colSpan={8} className="admin-table-empty">No users match the active filters.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </AdminPanel>

      {suspendTarget ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-slate-900">Suspend {suspendTarget.username}</h2>
            <p className="mt-1 text-sm text-slate-500">Choose the duration and provide a moderation reason.</p>
            <div className="mt-6 grid gap-4">
              <label className="admin-field">
                <span className="admin-label">Duration</span>
                <select className="admin-select" value={suspendDuration} onChange={(event) => setSuspendDuration(event.target.value)}>
                  {SUSPEND_DURATIONS.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </label>
              <label className="admin-field">
                <span className="admin-label">Reason</span>
                <textarea className="admin-textarea" value={suspendReason} onChange={(event) => setSuspendReason(event.target.value)} placeholder="Add context for the suspension decision" />
              </label>
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button type="button" className="admin-btn admin-btn--ghost" onClick={() => setSuspendTarget(null)}>
                Cancel
              </button>
              <button type="button" className="admin-btn !border-amber-600 !bg-amber-600" onClick={handleSuspendSubmit}>
                Confirm Suspension
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
