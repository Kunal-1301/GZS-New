import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { FiExternalLink, FiX } from 'react-icons/fi';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import { useToast } from '@/shared/components/Toast';
import verificationService from '@/services/features/verificationService';
import { mockApiService } from '@services/mockApiService';
import { AdminPageHero, AdminPanel } from '../components/AdminContentShell';

const STATUS_FILTERS = ['All', 'Pending', 'Approved', 'Rejected'];

function normalizeStatus(status) {
  const value = String(status || '').toLowerCase();

  if (value.includes('approved')) {
    return 'Approved';
  }

  if (value.includes('rejected')) {
    return 'Rejected';
  }

  return 'Pending';
}

function toHoursAgo(label) {
  const value = String(label || '').toLowerCase();
  if (value.includes('day')) {
    const count = Number.parseInt(value, 10) * 24 || 24;
    return `${count} hours ago`;
  }
  if (value.includes('hr')) {
    const count = Number.parseInt(value, 10) || 1;
    return `${count} hours ago`;
  }
  return '1 hour ago';
}

function getDomainBadge(domain) {
  const toneMap = {
    unity: 'bg-blue-100 text-blue-700',
    '2d art': 'bg-pink-100 text-pink-700',
    'level design': 'bg-violet-100 text-violet-700',
  };

  return toneMap[String(domain || '').toLowerCase()] || 'bg-slate-100 text-slate-700';
}

export default function VerificationQueue() {
  usePageTheme('admin');

  const { showToast } = useToast();
  const [statusFilter, setStatusFilter] = useState('All');
  const [domainFilter, setDomainFilter] = useState('All');
  const [activeProof, setActiveProof] = useState(null);
  const { data: proofs = [], refetch } = useQuery({
    queryKey: ['admin', 'verification-queue'],
    queryFn: verificationService.listVerifications,
  });
  const { data: branches = [] } = useQuery({
    queryKey: ['admin', 'verification-domains'],
    queryFn: mockApiService.getBranches,
  });

  const domainOptions = useMemo(() => {
    const fromProofs = proofs.map((item) => item.group).filter(Boolean);
    const fromBranches = branches.map((item) => item.name).filter(Boolean);
    return ['All', ...new Set([...fromProofs, ...fromBranches])];
  }, [branches, proofs]);

  const rows = useMemo(() => {
    return proofs
      .map((item) => ({
        id: item.id,
        username: item.user,
        avatar: String(item.user || 'U').slice(0, 2).toUpperCase(),
        domain: item.group || item.subType || 'General',
        skill: item.skill,
        proofSubmitted: item.proofType,
        preview: `Preview ${item.proofType}`,
        time: toHoursAgo(item.submitted),
        status: normalizeStatus(item.status),
        detail: item.subType,
      }))
      .filter((item) => {
        const statusMatch = statusFilter === 'All' || item.status === statusFilter;
        const domainMatch = domainFilter === 'All' || item.domain === domainFilter;
        return statusMatch && domainMatch;
      });
  }, [domainFilter, proofs, statusFilter]);

  async function handleDecision(id, decision) {
    await verificationService.decideVerification(id, decision);
    showToast(`Verification ${decision.toLowerCase()}.`, 'success');
    if (activeProof?.id === id) {
      setActiveProof((current) => (current ? { ...current, status: decision } : current));
    }
    refetch();
  }

  return (
    <div className="admin-page-shell admin-table-page">
      <Helmet>
        <title>Verification Queue | GzoneSphere Admin</title>
      </Helmet>

      <AdminPageHero
        kicker="Users"
        title="Verification Queue"
        description="Approve or reject skill proof submissions without leaving the admin moderation workflow."
      />

      <AdminPanel title="Pending Verifications" meta="Proof review queue with filters and modal details">
        <div className="admin-filter-bar">
          <select className="admin-select" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            {STATUS_FILTERS.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
          <select className="admin-select" value={domainFilter} onChange={(event) => setDomainFilter(event.target.value)}>
            {domainOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>

        <div className="admin-table-wrap mt-5">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Domain</th>
                <th>Skill</th>
                <th>Proof Submitted</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white">
                        {row.avatar}
                      </span>
                      <div>
                        <div className="font-semibold text-slate-900">{row.username}</div>
                        <span className={`mt-1 inline-flex rounded-full px-2 py-1 text-[11px] font-semibold ${getDomainBadge(row.domain)}`}>
                          {row.detail}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>{row.domain}</td>
                  <td>{row.skill}</td>
                  <td>
                    <button type="button" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600" onClick={() => setActiveProof(row)}>
                      {row.proofSubmitted}
                      <FiExternalLink size={14} />
                    </button>
                  </td>
                  <td>{row.time}</td>
                  <td>
                    <div className="admin-action-row justify-start">
                      <button type="button" className="admin-btn admin-btn--ghost" onClick={() => setActiveProof(row)}>
                        View Proof
                      </button>
                      <button type="button" className="admin-btn !border-emerald-600 !bg-emerald-600" onClick={() => handleDecision(row.id, 'Approved')}>
                        Approve
                      </button>
                      <button type="button" className="admin-btn !border-red-600 !bg-red-600" onClick={() => handleDecision(row.id, 'Rejected')}>
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!rows.length ? (
                <tr>
                  <td colSpan={6} className="admin-table-empty">No verification requests match the current filters.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </AdminPanel>

      {activeProof ? (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Proof Details</h2>
                <p className="text-sm text-slate-500">{activeProof.username} submitted {activeProof.skill}</p>
              </div>
              <button type="button" className="rounded-full border border-slate-200 p-2 text-slate-500" onClick={() => setActiveProof(null)}>
                <FiX size={18} />
              </button>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Domain</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{activeProof.domain}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Proof Type</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{activeProof.proofSubmitted}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Submitted</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{activeProof.time}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Status</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{activeProof.status}</p>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
              Full proof preview placeholder for {activeProof.preview}. The dedicated verification service is wired, so decisions made here update the mock persistence layer.
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
