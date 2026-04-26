import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import PageLoader from '@/shared/components/PageLoader';
import Layout from '@/shared/components/Layout';
import PublicRoutes from './PublicRoutes';
import UserRoutes from './UserRoutes';
import SocialRoutes from './SocialRoutes';
import SettingsRoutes from './SettingsRoutes';
import AdminRoutes from './AdminRoutes';
import TournamentRoutes from './TournamentRoutes';

const NotFound = lazy(() => import('@/features/games/pages/NotFound'));

const AppRouter = () => (
    <Suspense fallback={<PageLoader />}>
        <Routes>
            {TournamentRoutes()}
            {PublicRoutes()}
            {UserRoutes()}
            <Route element={<Layout />}>
                {SocialRoutes()}
                {SettingsRoutes()}
            </Route>
            {AdminRoutes()}
            <Route path="*" element={<NotFound />} />
        </Routes>
    </Suspense>
);

export default AppRouter;
