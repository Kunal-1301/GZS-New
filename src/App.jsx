import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from '@components/ErrorBoundary';
import PageLoader from '@components/PageLoader';
import { ThemeProvider } from '@context/ThemeContext';
import { ToastProvider } from '@components/Toast';
import { HelmetProvider } from 'react-helmet-async';

// ── Public Pages ──────────────────────────────────────────────
const GamePostCollection = lazy(() => import('@pages/gamepost/GamePostCollection'));
const Home = lazy(() => import('@pages/Home'));
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
const Login = lazy(() => import('@auth/Login'));
const Signup = lazy(() => import('@auth/Signup'));
const VerifyEmail = lazy(() => import('@auth/VerifyEmail'));
const ProfileSetup = lazy(() => import('@auth/ProfileSetup'));
const MasterIdentitySetup = lazy(() => import('@auth/MasterIdentitySetup'));
const OrganizationIdentitySetup = lazy(() => import('@auth/OrganizationIdentitySetup'));
// ── Profile / SubProfiles (Identity & Facades) ──────────────────
const IdentitySocialView = lazy(() => import('@pages/profile/IdentitySocialView'));
const ProfileHowItWorks = lazy(() => import('@pages/profile/ProfileHowItWorks'));
const FacadeSwitcher = lazy(() => import('@pages/profile/FacadeSwitcher'));
const ProfileOverview = lazy(() => import('@pages/profile/ProfileOverview'));
const ProfileSkillVerify = lazy(() => import('@pages/profile/ProfileSkillVerify'));
const ProfileSkillAdd = lazy(() => import('@pages/profile/ProfileSkillAdd'));
const ProfileSkillDashboard = lazy(() => import('@pages/profile/ProfileSkillDashboard'));
const MasterIdentityHub = lazy(() => import('@pages/profile/MasterIdentityHub'));
const EsportsFacade = lazy(() => import('@pages/profile/EsportsFacade'));
const ArtistFacade = lazy(() => import('@pages/profile/ArtistFacade'));
const StrategyFacade = lazy(() => import('@pages/profile/StrategyFacade'));
const CreatorFacade = lazy(() => import('@pages/profile/CreatorFacade'));
const DeveloperFacade = lazy(() => import('@pages/profile/DeveloperFacade'));
const AudioFacade = lazy(() => import('@pages/profile/AudioFacade'));
const NarrativeFacade = lazy(() => import('@pages/profile/NarrativeFacade'));

// ── Community ───────────────────────────────────────────────────
const CommunityLayout = lazy(() => import('@pages/community/CommunityLayout'));
const CommunityGlobalNews = lazy(() => import('@pages/community/CommunityGlobalNews'));
const CommunitySocialLobby = lazy(() => import('@pages/community/CommunitySocialLobby'));
const CommunityNetwork = lazy(() => import('@pages/community/CommunityNetwork'));
const CommunityBranch = lazy(() => import('@pages/community/CommunityBranch'));
const CommunityRoom = lazy(() => import('@pages/community/CommunityRoom'));
const CreatorStudio = lazy(() => import('@studio/CreatorStudio'));
const CreatorReels = lazy(() => import('@pages/community/CreatorReels'));
const CompanyCommunityDashboard = lazy(() => import('@pages/community/CompanyCommunityDashboard'));
const CommunityProCheckout = lazy(() => import('@pages/community/CommunityProCheckout'));
const CompanyBriefBuilder = lazy(() => import('@pages/community/CompanyBriefBuilder'));
const CompanyTalentDiscovery = lazy(() => import('@pages/community/CompanyTalentDiscovery'));
const CompanyCommissions = lazy(() => import('@pages/community/CompanyCommissions'));
const CompanyPlaytests = lazy(() => import('@pages/community/CompanyPlaytests'));
const CompanyArbitration = lazy(() => import('@pages/community/CompanyArbitration'));
const CommunityActivityGuide = lazy(() => import('@pages/community/CommunityActivityGuide'));

// ── Content Admin (Top-Level) ─────────────────────────────────
const ContentAdminLayout = lazy(() => import('./admin/super_admin/ContentAdminLayout'));
const CADashboard = lazy(() => import('./admin/super_admin/pages/Dashboard'));
const CAGamePosts = lazy(() => import('./admin/sub_admins/games/GamePostsList'));
const CAEsports = lazy(() => import('./admin/sub_admins/esports/Esports'));
const CABrackets = lazy(() => import('./admin/sub_admins/esports/EsportsBrackets'));
const CAResults = lazy(() => import('./admin/sub_admins/esports/EsportsResults'));
const CASponsors = lazy(() => import('./admin/sub_admins/esports/EsportsSponsors'));
const CANews = lazy(() => import('./admin/sub_admins/blogs/News'));
const CACommunity = lazy(() => import('./admin/sub_admins/community/Community'));
const CAProfiles = lazy(() => import('./admin/sub_admins/profiles/ProfilesAdmin'));
const CAReviews = lazy(() => import('./admin/sub_admins/community/Reviews'));
const CASettings = lazy(() => import('./admin/super_admin/pages/Settings'));

// ── GamePost Sub-Admin ────────────────────────────────────────
const AdminLayout = lazy(() => import('./admin/super_admin/components/AdminLayout'));
const BasicInfo = lazy(() => import('./admin/sub_admins/games/BasicInfo'));
const StoryContent = lazy(() => import('./admin/sub_admins/games/StoryContent'));
const Media = lazy(() => import('./admin/sub_admins/games/Media'));
const QuickOverview = lazy(() => import('./admin/sub_admins/games/QuickOverview'));
const SystemRequirements = lazy(() => import('./admin/sub_admins/games/SystemRequirements'));
const StoreExtras = lazy(() => import('./admin/sub_admins/games/StoreExtras'));
const ReviewsCommunity = lazy(() => import('./admin/sub_admins/games/ReviewsCommunity'));
const MoreGames = lazy(() => import('./admin/sub_admins/games/MoreGames'));
const SocialCommunity = lazy(() => import('./admin/sub_admins/games/SocialCommunity'));
const PreviewGamePost = lazy(() => import('./admin/sub_admins/games/PreviewGamePost'));

const App = () => (
  <HelmetProvider>
    <BrowserRouter>
      <ToastProvider>
        <ThemeProvider>
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Routes>

                {/* ── Public ─────────────────────────────────────────── */}
                <Route path="/" element={<Home />} />
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
                <Route path="/profile/master-setup" element={<MasterIdentitySetup />} />
                <Route path="/profile/org-setup" element={<OrganizationIdentitySetup />} />
                <Route path="/profile" element={<IdentitySocialView />} />
                <Route path="/profile/how-it-works" element={<ProfileHowItWorks />} />
                <Route path="/profile/choose-subprofile" element={<FacadeSwitcher />} />
                <Route path="/profile/overview" element={<ProfileOverview />} />
                <Route path="/profile/master" element={<MasterIdentityHub />} />
                <Route path="/profile/dashboard/:profileId" element={<ProfileSkillDashboard />} />
                <Route path="/profile/skill-add" element={<ProfileSkillAdd />} />
                <Route path="/profile/skill-verify" element={<ProfileSkillVerify />} />

                {/* Facades (Formerly SubProfiles) */}
                <Route path="/profile/esports" element={<EsportsFacade />} />
                <Route path="/profile/art-visual" element={<ArtistFacade />} />
                <Route path="/profile/business-strategy" element={<StrategyFacade />} />
                <Route path="/profile/content-media" element={<CreatorFacade />} />
                <Route path="/profile/game-creation" element={<DeveloperFacade />} />
                <Route path="/profile/music-audio" element={<AudioFacade />} />
                <Route path="/profile/writing-narrative" element={<NarrativeFacade />} />

                {/* ── Community ──────────────────────────────────────── */}
                <Route path="/community" element={<CommunityLayout />}>
                  <Route index element={<CommunityGlobalNews />} />
                  <Route path="lobby" element={<CommunitySocialLobby />} />
                  <Route path="network" element={<CommunityNetwork />} />
                  <Route path="creator-studio" element={<CreatorStudio />} />
                  <Route path="creators" element={<CreatorReels />} />
                  <Route path="company-dashboard" element={<CompanyCommunityDashboard />} />
                  <Route path="brief-builder" element={<CompanyBriefBuilder />} />
                  <Route path="talent-discovery" element={<CompanyTalentDiscovery />} />
                  <Route path="commissions" element={<CompanyCommissions />} />
                  <Route path="playtests" element={<CompanyPlaytests />} />
                  <Route path="arbitration" element={<CompanyArbitration />} />
                  <Route path="pro" element={<CommunityProCheckout />} />
                  <Route path="activity-guide" element={<CommunityActivityGuide />} />
                  <Route path=":branchId" element={<CommunityBranch />} />
                  <Route path=":branchId/room/:roomId" element={<CommunityRoom />} />
                </Route>

                {/* ── Content Admin (Top-Level) ──────────────────────── */}
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
  </HelmetProvider>
);

export default App;
