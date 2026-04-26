import { lazy } from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '@/shared/components/ProtectedRoute';
import AdminLayout from '@/features/admin/components/AdminLayout';

// ── Admin Dashboard & Management Pages ────────────────────────
const Dashboard = lazy(() => import('@/features/admin/pages/Dashboard'));
const GamesManagement = lazy(() => import('@/features/admin/pages/GamesManagement'));
const GameCreate = lazy(() => import('@/features/admin/pages/GameCreate'));
const GameEdit = lazy(() => import('@/features/admin/pages/GameEdit'));
const TournamentsManagement = lazy(() => import('@/features/admin/pages/TournamentsManagement'));
const TournamentCreate = lazy(() => import('@/features/admin/pages/TournamentCreate'));
const TournamentEdit = lazy(() => import('@/features/admin/pages/TournamentEdit'));
const TournamentBrackets = lazy(() => import('@/features/admin/pages/TournamentBrackets'));
const TournamentResults = lazy(() => import('@/features/admin/pages/TournamentResults'));
const TournamentRegistrations = lazy(() => import('@/features/admin/pages/TournamentRegistrations'));
const BlogsManagement = lazy(() => import('@/features/admin/pages/BlogsManagement'));
const BlogCreate = lazy(() => import('@/features/admin/pages/BlogCreate'));
const BlogEdit = lazy(() => import('@/features/admin/pages/BlogEdit'));
const CommunityManagement = lazy(() => import('@/features/admin/pages/CommunityManagement'));
const UsersManagement = lazy(() => import('@/features/admin/pages/UsersManagement'));
const UserDetail = lazy(() => import('@/features/admin/pages/UserDetail'));
const VerificationQueue = lazy(() => import('@/features/admin/pages/VerificationQueue'));
const AdminSettings = lazy(() => import('@/features/admin/pages/AdminSettings'));
const MediaLibrary = lazy(() => import('@/features/admin/pages/MediaLibrary'));
const Analytics = lazy(() => import('@/features/admin/pages/Analytics'));
const AuditLogs = lazy(() => import('@/features/admin/pages/AuditLogs'));
const SystemMonitoring = lazy(() => import('@/features/admin/pages/SystemMonitoring'));
const SponsorsManagement = lazy(() => import('@/features/admin/pages/SponsorsManagement'));

const AdminRoutes = () => (
  <>
    <Route element={<ProtectedRoute adminOnly />}>
      <Route element={<AdminLayout />}>
        <Route key="admin-dashboard" path="/admin" element={<Dashboard />} />

        <Route key="admin-games" path="/admin/games" element={<GamesManagement />} />
        <Route key="admin-game-create" path="/admin/games/create" element={<GameCreate />} />
        <Route key="admin-game-edit" path="/admin/games/:id/edit" element={<GameEdit />} />

        <Route key="admin-tournaments" path="/admin/tournaments" element={<TournamentsManagement />} />
        <Route key="admin-tournament-create" path="/admin/tournaments/create" element={<TournamentCreate />} />
        <Route key="admin-tournament-edit" path="/admin/tournaments/:id/edit" element={<TournamentEdit />} />
        <Route key="admin-brackets" path="/admin/tournaments/:id/brackets" element={<TournamentBrackets />} />
        <Route key="admin-results" path="/admin/tournaments/:id/results" element={<TournamentResults />} />
        <Route key="admin-registrations" path="/admin/tournaments/:id/registrations" element={<TournamentRegistrations />} />

        <Route key="admin-blogs" path="/admin/blogs" element={<BlogsManagement />} />
        <Route key="admin-blog-create" path="/admin/blogs/create" element={<BlogCreate />} />
        <Route key="admin-blog-edit" path="/admin/blogs/:id/edit" element={<BlogEdit />} />

        <Route key="admin-community" path="/admin/community" element={<CommunityManagement />} />

        <Route key="admin-users" path="/admin/users" element={<UsersManagement />} />
        <Route key="admin-user-detail" path="/admin/users/:id" element={<UserDetail />} />

        <Route key="admin-verification" path="/admin/verification" element={<VerificationQueue />} />
        <Route key="admin-media" path="/admin/media" element={<MediaLibrary />} />
        <Route key="admin-sponsors" path="/admin/sponsors" element={<SponsorsManagement />} />
        <Route key="admin-analytics" path="/admin/analytics" element={<Analytics />} />
        <Route key="admin-audit" path="/admin/audit-logs" element={<AuditLogs />} />
        <Route key="admin-system" path="/admin/system-monitoring" element={<SystemMonitoring />} />
        <Route key="admin-settings" path="/admin/settings" element={<AdminSettings />} />
      </Route>
    </Route>
  </>
);

export default AdminRoutes;




