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
const ProfileHowItWorks = lazy(() => import('@pages/profile/ProfileHowItWorks'));
const ProfileChooseSubProfile = lazy(() => import('@pages/profile/ProfileChooseSubProfile'));
const ProfileOverview = lazy(() => import('@pages/profile/ProfileOverview'));
const ProfileSkillVerify = lazy(() => import('@pages/profile/ProfileSkillVerify'));
const ProfileSkillAdd = lazy(() => import('@pages/profile/ProfileSkillAdd'));
const ProfileSkillDashboard = lazy(() => import('@pages/profile/ProfileSkillDashboard'));

// ── Content Admin (Top-Level) ─────────────────────────────────
const ContentAdminLayout = lazy(() => import('./admin/SuperAdmin/ContentAdminLayout'));
const CADashboard = lazy(() => import('./admin/SuperAdmin/pages/Dashboard'));
const CAGamePosts = lazy(() => import('./admin/SuperAdmin/pages/GamePostsList'));
const CAEsports = lazy(() => import('./admin/SuperAdmin/pages/Esports'));
const CABrackets = lazy(() => import('./admin/SuperAdmin/pages/EsportsBrackets'));
const CAResults = lazy(() => import('./admin/SuperAdmin/pages/EsportsResults'));
const CASponsors = lazy(() => import('./admin/SuperAdmin/pages/EsportsSponsors'));
const CANews = lazy(() => import('./admin/SuperAdmin/pages/News'));
const CACommunity = lazy(() => import('./admin/SuperAdmin/pages/Community'));
const CAProfiles = lazy(() => import('./admin/SuperAdmin/pages/ProfilesAdmin'));
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

import ProtectedRoute from './components/ProtectedRoute';

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
              <Route path="/profile/how-it-works" element={<ProfileHowItWorks />} />
              <Route path="/profile/choose-subprofile" element={<ProfileChooseSubProfile />} />
              <Route path="/profile/overview" element={<ProfileOverview />} />
              <Route path="/profile/skill-verify" element={<ProfileSkillVerify />} />
              <Route path="/profile/skill-add" element={<ProfileSkillAdd />} />
              <Route path="/profile/skill-dashboard" element={<ProfileSkillDashboard />} />

              {/* ── Protected Admin Routes ─────────────────────────── */}
              <Route element={<ProtectedRoute />}>
                {/* Content Admin (Top-Level) */}
                <Route path="/content-admin" element={<ContentAdminLayout />}>
                  <Route index element={<CADashboard />} />
                  <Route path="game-posts" element={<CAGamePosts />} />
                  <Route path="esports" element={<CAEsports />} />
                  <Route path="esports/brackets" element={<CABrackets />} />
                  <Route path="esports/results" element={<CAResults />} />
                  <Route path="esports/sponsors" element={<CASponsors />} />
                  <Route path="news" element={<CANews />} />
                  <Route path="blogs" element={<CANews />} />
                  <Route path="community" element={<CACommunity />} />
                  <Route path="profiles" element={<CAProfiles />} />
                  <Route path="profiles/proofs" element={<CAProfiles defaultTab="proofs" />} />
                  <Route path="profiles/activity" element={<CAProfiles defaultTab="activity" />} />
                  <Route path="reviews" element={<CAReviews />} />
                  <Route path="settings" element={<CASettings />} />
                </Route>

                {/* GamePost Sub-Admin */}
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