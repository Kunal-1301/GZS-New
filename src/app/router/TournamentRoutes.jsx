import { lazy } from 'react';
import { Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '@/shared/components/ProtectedRoute';
import Layout from '@/shared/components/Layout';
import PublicLayout from '@/app/layouts/PublicLayout';

// Lazy load tournament pages
const TournamentHub = lazy(() => import('@/features/tournaments/pages/TournamentHub'));
const TournamentList = lazy(() => import('@/features/tournaments/pages/TournamentList'));
const TournamentDetail = lazy(() => import('@/features/tournaments/pages/TournamentDetail'));
const TournamentRegister = lazy(() => import('@/features/tournaments/pages/TournamentRegister'));
const TournamentBrackets = lazy(() => import('@/features/tournaments/pages/TournamentBrackets'));
const TournamentResults = lazy(() => import('@/features/tournaments/pages/TournamentResults'));

const TournamentRoutes = () => (
    <>
        <Route element={<PublicLayout />}>
            <Route path="/tournaments" element={<TournamentHub />} />
            {/* Specific routes BEFORE dynamic routes */}
            <Route path="/tournaments/browse" element={<TournamentList />} />
            <Route path="/tournaments/all" element={<Navigate to="/tournaments/browse" replace />} />
            <Route path="/tournaments/list" element={<Navigate to="/tournaments/browse" replace />} />
            {/* Dynamic routes AFTER specific routes */}
            <Route path="/tournaments/:slug" element={<TournamentDetail />} />
            <Route path="/tournaments/:slug/brackets" element={<TournamentBrackets />} />
            <Route path="/tournaments/:slug/results" element={<TournamentResults />} />
        </Route>

        <Route element={<Layout />}>
            <Route element={<ProtectedRoute />}>
                <Route path="/tournaments/:slug/register" element={<TournamentRegister />} />
            </Route>
        </Route>
    </>
);

export default TournamentRoutes;





