import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './public/components/ErrorBoundary';

// ── Public Pages ──────────────────────────────────────────────
const GamePostCollection = lazy(() => import('./public/pages/gamepost/GamePostCollection'));
const GamePostPage = lazy(() => import('./public/pages/gamepost/GamePostPage'));
const EsportsHome = lazy(() => import('./public/pages/esports/EsportsHome'));
const AllTournaments = lazy(() => import('./public/pages/esports/AllTournaments'));
const TournamentDetails = lazy(() => import('./public/pages/esports/TournamentDetails'));
const TournamentRegistration = lazy(() => import('./public/pages/esports/TournamentRegistration'));
const Blog = lazy(() => import('./public/pages/blog/Blog'));
const BlogPost = lazy(() => import('./public/pages/blog/BlogPost'));
const WriteBlog = lazy(() => import('./public/pages/blog/WriteBlog'));
const Career = lazy(() => import('./public/pages/career/Career'));
const AboutHub = lazy(() => import('./public/pages/about/AboutHub'));
const About = lazy(() => import('./public/pages/about/About'));
const AboutStory = lazy(() => import('./public/pages/about/AboutStory'));
const Contact = lazy(() => import('./public/pages/contact/Contact'));
const NotFound = lazy(() => import('./public/pages/NotFound'));
const Login = lazy(() => import('./public/pages/auth/Login'));
const Signup = lazy(() => import('./public/pages/auth/Signup'));
const VerifyEmail = lazy(() => import('./public/pages/auth/VerifyEmail'));
const ProfileSetup = lazy(() => import('./public/pages/auth/ProfileSetup'));
const Profile = lazy(() => import('./public/pages/profile/Profile'));

// ── Content Admin (Top-Level) ─────────────────────────────────
const ContentAdminLayout = lazy(() => import('./admin/SuperAdmin/ContentAdminLayout'));
const CADashboard = lazy(() => import('./admin/SuperAdmin/pages/Dashboard'));
const CAGamePosts = lazy(() => import('./admin/SuperAdmin/pages/GamePostsList'));
const CAEsports = lazy(() => import('./admin/SuperAdmin/pages/Esports'));
const CANews = lazy(() => import('./admin/SuperAdmin/pages/News'));
const CACommunity = lazy(() => import('./admin/SuperAdmin/pages/Community'));
const CAReviews = lazy(() => import('./admin/SuperAdmin/pages/Reviews'));
const CASettings = lazy(() => import('./admin/SuperAdmin/pages/Settings'));

// ── GamePost Sub-Admin ────────────────────────────────────────
const AdminLayout = lazy(() => import('./admin/components/AdminLayout'));
const BasicInfo = lazy(() => import('./admin/GamesAdmin/BasicInfo'));
const StoryContent = lazy(() => import('./admin/GamesAdmin/StoryContent'));
const Media = lazy(() => import('./admin/GamesAdmin/Media'));
const QuickOverview = lazy(() => import('./admin/GamesAdmin/QuickOverview'));
const SystemRequirements = lazy(() => import('./admin/GamesAdmin/SystemRequirements'));
const StoreExtras = lazy(() => import('./admin/GamesAdmin/StoreExtras'));
const ReviewsCommunity = lazy(() => import('./admin/GamesAdmin/ReviewsCommunity'));
const MoreGames = lazy(() => import('./admin/GamesAdmin/MoreGames'));
const SocialCommunity = lazy(() => import('./admin/GamesAdmin/SocialCommunity'));
const PreviewGamePost = lazy(() => import('./admin/GamesAdmin/PreviewGamePost'));

// ── Loader ────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--admin-bg, #f4f4f4)" }}>
      <div style={{
        width: "2rem", height: "2rem",
        border: "3px solid var(--admin-accent, #f97316)",
        borderTopColor: "transparent",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
      }} />
    </div>
  );
}

const App = () => (
  <BrowserRouter>
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>

          {/* ── Public ─────────────────────────────────────────── */}
          <Route path="/" element={<GamePostCollection />} />
          <Route path="/games/:slug" element={<GamePostPage />} />
          <Route path="/games" element={<GamePostCollection />} />
          <Route path="/game-collection" element={<GamePostCollection />} />
          <Route path="/esports" element={<EsportsHome />} />
          <Route path="/esports/tournaments" element={<AllTournaments />} />
          <Route path="/esports/tournament/:id" element={<TournamentDetails />} />
          <Route path="/esports/tournament/:id/register" element={<TournamentRegistration />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/write-blog" element={<WriteBlog />} />
          <Route path="/career" element={<Career />} />
          <Route path="/about" element={<AboutHub />} />
          <Route path="/about/details" element={<About />} />
          <Route path="/about/origin" element={<AboutStory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/profile" element={<Profile />} />

          {/* ── Content Admin (Top-Level) ──────────────────────── */}
          <Route path="/content-admin" element={<ContentAdminLayout />}>
            <Route index element={<CADashboard />} />
            <Route path="game-posts" element={<CAGamePosts />} />
            <Route path="esports" element={<CAEsports />} />
            <Route path="news" element={<CANews />} />
            <Route path="community" element={<CACommunity />} />
            <Route path="reviews" element={<CAReviews />} />
            <Route path="settings" element={<CASettings />} />
          </Route>

          {/* ── GamePost Sub-Admin ─────────────────────────────── */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<BasicInfo />} />
            <Route path="story" element={<StoryContent />} />
            <Route path="media" element={<Media />} />
            <Route path="quick" element={<QuickOverview />} />
            <Route path="system" element={<SystemRequirements />} />
            <Route path="store" element={<StoreExtras />} />
            <Route path="reviews" element={<ReviewsCommunity />} />
            <Route path="more" element={<MoreGames />} />
            <Route path="social" element={<SocialCommunity />} />
            <Route path="preview" element={<PreviewGamePost />} />
          </Route>

          {/* ── 404 ───────────────────────────────────────────── */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Suspense>
    </ErrorBoundary>
  </BrowserRouter>
);

export default App;