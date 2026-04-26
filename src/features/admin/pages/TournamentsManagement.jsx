import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import { mockApiService } from '@services/mockApiService';
import { useToast } from '@/shared/components/Toast';
import { AdminPageHero, AdminPanel, AdminMetrics, AdminStatusBadge, AdminEmptyState } from '../components/AdminContentShell';
import { safeString, slugify } from '../components/adminFormUtils';

const STATUS_FILTERS = ['all', 'draft', 'registration open', 'registration closed', 'live', 'completed', 'cancelled', 'upcoming'];
const DOMAIN_FILTERS = ['all', 'esports', 'art', 'writing', 'music', 'dev', 'general'];
const PRIZE_FILTERS = ['all', 'free', 'cash prize', 'in-platform rewards', 'both'];

function normalizeTournament(tournament) {
  const rawStatus = safeString(tournament.status || 'Draft').replace(/_/g, ' ').toLowerCase();
  return {
    id: tournament.id,
    name: safeString(tournament.name || tournament.title),
    slug: safeString(tournament.slug || slugify(tournament.name || tournament.title || 'tournament')),
    domain: safeString(tournament.domain || tournament.type || 'Esports').toLowerCase(),
    game: safeString(tournament.game || ''),
    format: safeString(tournament.format || tournament.bracket_type || 'Team'),
    status: rawStatus,
    registrations: Number(tournament.current_participants || 0),
    maxParticipants: Number(tournament.max_participants || tournament.maxParticipants || tournament.slots || 0),
    startDate: safeString(tournament.start_date || tournament.tournamentStart || tournament.date || ''),
    prizePool: safeString(tournament.totalPrizePool || tournament.prize || 'Free'),
    organiser: safeString(tournament.organiser || 'Gzone Admin'),
  };
}

function toneForStatus(status) {
  if (status === 'live' || status === 'registration open' || status === 'upcoming') return 'success';
  if (status === 'draft' || status === 'registration closed') return 'warning';
  return 'danger';
}

export default function TournamentsManagement() {
  usePageTheme('admin');

  const navigate = useNavigate();
  const { showToast } = useToast();
  const { data = [], refetch } = useQuery({
    queryKey: ['admin', 'tournaments'],
    queryFn: mockApiService.getAllTournaments,
  });

  const tournaments = useMemo(() => data.map(normalizeTournament), [data]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [domain, setDomain] = useState('all');
  const [prizeType, setPrizeType] = useState('all');

  const filtered = useMemo(() => {
    return tournaments.filter((tournament) => {
      const matchesSearch = !search || tournament.name.toLowerCase().includes(search.toLowerCase()) || tournament.slug.includes(search.toLowerCase());
      const matchesStatus = status === 'all' || tournament.status === status;
      const matchesDomain = domain === 'all' || tournament.domain === domain;
      const prizeText = tournament.prizePool.toLowerCase();
      const matchesPrize = prizeType === 'all'
        || (prizeType === 'free' && prizeText === 'free')
        || (prizeType === 'cash prize' && /inr|cash|\$|₹/.test(prizeText))
        || (prizeType === 'in-platform rewards' && /gzs|coins|xp/.test(prizeText))
        || (prizeType === 'both' && /gzs|coins|xp/.test(prizeText) && /inr|cash|\$|₹/.test(prizeText));
      return matchesSearch && matchesStatus && matchesDomain && matchesPrize;
    });
  }, [domain, prizeType, search, status, tournaments]);

  async function removeTournament(id) {
    await mockApiService.deleteTournament(id);
    showToast('Tournament deleted.', 'success');
    refetch();
  }

  const metrics = [
    { label: 'Tournaments', value: `${tournaments.length}` },
    { label: 'Live', value: `${tournaments.filter((tournament) => tournament.status === 'live').length}` },
    { label: 'Registration Open', value: `${tournaments.filter((tournament) => tournament.status === 'registration open' || tournament.status === 'upcoming').length}` },
    { label: 'Filtered', value: `${filtered.length}` },
  ];

  return (
    <div className="admin-page-shell admin-table-page">
      <Helmet>
        <title>Tournaments Management | GzoneSphere Admin</title>
      </Helmet>

      <AdminPageHero
        kicker="Admin / Tournaments"
        title="Tournaments Management"
        description="Operational overview for all tournaments, with filters and actions aligned to the public tournament ecosystem and the detailed admin spec."
        actions={(
          <>
            <button type="button" className="admin-btn admin-btn--ghost" onClick={() => refetch()}>Refresh</button>
            <button type="button" className="admin-btn" onClick={() => navigate('/admin/tournaments/create')}>Create Tournament</button>
          </>
        )}
      />

      <AdminMetrics items={metrics} />

      <AdminPanel title="Tournaments Management Table" meta="Banner, tournament name, game/domain, format, status, registrations, start date, prize pool, organiser, and actions.">
        <div className="admin-filter-bar">
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name or slug" />
          <select value={domain} onChange={(event) => setDomain(event.target.value)}>
            {DOMAIN_FILTERS.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            {STATUS_FILTERS.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
          <select value={prizeType} onChange={(event) => setPrizeType(event.target.value)}>
            {PRIZE_FILTERS.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>

        {filtered.length ? (
          <div className="table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Tournament</th>
                  <th>Game / Domain</th>
                  <th>Format</th>
                  <th>Status</th>
                  <th>Registrations</th>
                  <th>Start Date</th>
                  <th>Prize Pool</th>
                  <th>Organiser</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((tournament) => (
                  <tr key={tournament.id}>
                    <td>
                      <div className="admin-table-title-cell">
                        <strong className="admin-table-title-cell__title">{tournament.name}</strong>
                        <span className="admin-table-title-cell__meta">/{tournament.slug}</span>
                      </div>
                    </td>
                    <td>{tournament.game || tournament.domain}</td>
                    <td>{tournament.format}</td>
                    <td>
                      <AdminStatusBadge tone={toneForStatus(tournament.status)}>
                        {tournament.status}
                      </AdminStatusBadge>
                    </td>
                    <td>{tournament.registrations} / {tournament.maxParticipants || '—'}</td>
                    <td>{tournament.startDate || 'TBD'}</td>
                    <td>{tournament.prizePool}</td>
                    <td>{tournament.organiser}</td>
                    <td>
                      <div className="admin-action-row">
                        <button type="button" className="admin-btn admin-btn--ghost" onClick={() => navigate(`/admin/tournaments/${tournament.id}/edit`)}>Edit</button>
                        <button type="button" className="admin-btn admin-btn--ghost" onClick={() => navigate(`/admin/tournaments/${tournament.id}/registrations`)}>Registrations</button>
                        <button type="button" className="admin-btn admin-btn--ghost" onClick={() => navigate(`/admin/tournaments/${tournament.id}/brackets`)}>Brackets</button>
                        <button type="button" className="admin-btn admin-btn--ghost" onClick={() => removeTournament(tournament.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <AdminEmptyState title="No tournaments match the current filters" description="Try a broader domain or status filter." />
        )}
      </AdminPanel>

      <AdminPanel title="Tournament Operations" meta="Pointers for registrations, bracket management, and analytics views.">
        <div className="admin-form-grid cols-3">
          <div className="admin-preview-box">
            <strong>Registration Management</strong>
            <p>Use each tournament row to open registrations and manage approval, disqualification, export, and capacity changes.</p>
          </div>
          <div className="admin-preview-box">
            <strong>Bracket Management</strong>
            <p>Bracket routes are wired through dynamic per-tournament paths so generation and editing no longer break on shared pages.</p>
          </div>
          <div className="admin-preview-box">
            <strong>Analytics</strong>
            <p>Use the tournament detail flow to extend registration funnels, region breakdowns, and prize payout tracking.</p>
          </div>
        </div>
      </AdminPanel>
    </div>
  );
}
