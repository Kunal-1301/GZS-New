import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from '@components/ErrorBoundary';
import PageLoader from '@components/PageLoader';
import { ThemeProvider } from '@context/ThemeContext';
import { ToastProvider } from '@components/Toast';

// ── Public Pages ──────────────────────────────────────────────
const GamePostCollection = lazy(() => import('@pages/gamepost/GamePostCollection'));
const GamePostPage = lazy(() => import('@pages/gamepost/GamePostPage'));
const EsportsHome = lazy(() => import('@pages/esports/EsportsHome'));
const AllTournaments = lazy(() => import('@pages/esports/AllTournaments'));
const TournamentDetails = lazy(() => import('@pages/esports/TournamentDetails'));
const TournamentRegistration = lazy(() => import('@pages/esports/TournamentRegistration'));
const Blog = lazy(() => import('@pages/blog/Blog'));
const BlogPost = lazy(() => import('@pages/blog/BlogPost'));
const WriteBlog = lazy(() => import('@pages/blog/WriteBlog'));
const Career = lazy(() => import('@pages/career/Career'));
const AboutHub = lazy(() => import('@pages/about/AboutHub'));
const About = lazy(() => import('@pages/about/About'));
const AboutStory = lazy(() => import('@pages/about/AboutStory'));
const Contact = lazy(() => import('@pages/contact/Contact'));
const NotFound = lazy(() => import('@pages/NotFound'));
const Login = lazy(() => import('@pages/auth/Login'));
const Signup = lazy(() => import('@pages/auth/Signup'));
const VerifyEmail = lazy(() => import('@pages/auth/VerifyEmail'));
const ProfileSetup = lazy(() => import('@pages/auth/ProfileSetup'));
const Profile = lazy(() => import('@pages/profile/Profile'));

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

const App = () => (
  <BrowserRouter>
    <ToastProvider>
      <ThemeProvider>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>

              {/* ── Public ─────────────────────────────────────────── */}
              <Route path="/" element={<GamePostCollection />} />
              <Route path="/games/:slug" element={<GamePostPage />} />
              <Route path="/games" element={<GamePostCollection />} />

              {/* Redirect legacy /game-collection → /games (single canonical URL) */}
              <Route path="/game-collection" element={<Navigate to="/games" replace />} />

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
      </ThemeProvider>
    </ToastProvider>
  </BrowserRouter>
);

export default App;