import { lazy } from 'react';
import { Route, Navigate, useParams } from 'react-router-dom';
import ProtectedRoute from '@/shared/components/ProtectedRoute';
import { validateCommunitySlug } from '@/shared/utils/routeValidation';

// Community hub & layout
const CommunityLayout = lazy(() => import('@/features/community/pages/CommunityLayout'));
const CommunitySelector = lazy(() => import('@/features/community/pages/CommunitySelector'));

const BranchHub = lazy(() => import('@/features/community/pages/BranchHub'));

// Community sub-pages (modules)
const CommunityRoom = lazy(() => import('@/features/community/pages/modules/CommunityRoom'));
const GroupsList = lazy(() => import('@/features/community/pages/modules/GroupsList'));
const GroupView = lazy(() => import('@/features/community/pages/modules/GroupView'));
const ShowcaseFeed = lazy(() => import('@/features/community/pages/modules/ShowcaseFeed'));
const LFGBoard = lazy(() => import('@/features/community/pages/modules/LFGBoard'));
const CommunityEvents = lazy(() => import('@/features/community/pages/modules/CommunityEvents'));
const ComingSoon = lazy(() => import('@/features/community/pages/ComingSoon'));

// Messages
const MessagingHub = lazy(() => import('@/features/community/messages/pages/MessagingHub'));
const ConversationView = lazy(() => import('@/features/community/messages/pages/ConversationView'));

const SocialRoutes = () => (
  <>
    <Route element={<ProtectedRoute />}>
      {/* /community selector page */}
      <Route key="community-index" path="/community" element={<CommunitySelector />} />

      {/* Backward-compat redirects BEFORE dynamic routes (must come first!) */}
      <Route path="/community/game-dev"          element={<Navigate to="/community/dev"      replace />} />
      <Route path="/community/art-visual"        element={<Navigate to="/community/art"      replace />} />
      <Route path="/community/content-media"     element={<Navigate to="/community/content"  replace />} />
      <Route path="/community/business-strategy" element={<Navigate to="/community/business" replace />} />
      <Route path="/community/writing-narrative" element={<Navigate to="/community/writing"  replace />} />
      <Route path="/community/music-audio"       element={<Navigate to="/community/audio"    replace />} />

      {/* Each community with nested sub-routes (more specific goes after redirects) */}
      <Route path="/community/:slug" element={<CommunityLayout />}>
        <Route index element={<CommunityHomeRouter />} />
        <Route key="community-room"       path="room/:roomSlug"    element={<CommunityRoom />} />
        <Route key="community-lfg"        path="lfg"               element={<LFGBoard />} />
        <Route key="community-events"     path="events"            element={<CommunityEvents />} />
        <Route key="community-clips"      path="clips"             element={<ComingSoon title="Community Clips" description="Share and watch community highlight clips." />} />
        <Route key="community-hiring"     path="hiring-room/:roomId" element={<ComingSoon title="Hiring Room" description="Company hiring rooms coming soon." />} />
        <Route key="community-incubator"  path="incubator"         element={<ComingSoon title="Collab Incubator" description="Build and pitch collaborative projects." />} />
        <Route key="community-groups"     path="groups"            element={<GroupsList />} />
        <Route key="community-group-view" path="groups/:groupId"   element={<GroupView />} />
        <Route key="community-showcase"   path="showcase"          element={<ShowcaseFeed />} />
        {/* Legacy global sub-routes */}
        <Route key="community-bridge" path="bridge" element={<ComingSoon title="Community Network" description="Cross-community connections coming soon." />} />
        <Route key="community-pro"    path="pro"    element={<ComingSoon title="Community Pro" description="Upgrade your community presence." />} />
      </Route>

      {/* ── Messages ── */}
      <Route path="/messages" element={<MessagingHub />}>
        <Route index element={null} />
        <Route path=":userId" element={<ConversationView />} />
      </Route>
    </Route>
  </>
);

function CommunityHomeRouter() {
  const { slug } = useParams();
  if (!validateCommunitySlug(slug)) return <Navigate to="/" replace />;
  return <BranchHub slug={slug} />;
}

export default SocialRoutes;
