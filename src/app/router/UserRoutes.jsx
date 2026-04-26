import { lazy } from 'react';
import { Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '@/shared/components/ProtectedRoute';
import CompanyRoute from '@/shared/components/CompanyRoute';

// ─────────────────────────────────────────────────────────────
// PROFILE SETUP FLOW
//
// NEW USER JOURNEY:
//   /signup                → Create account (email + password)
//   /verify-email          → OTP verification
//   /profile-setup         → Choose: Individual or Organisation?
//
//   INDIVIDUAL PATH:
//   /profile/master-setup  → 3-step wizard: username · avatar · bio
//   /onboarding/quiz       → IntentQuiz: what kind of gamer are you?
//   /onboarding/profile-select → Which sub-profile to create first?
//   /profile/create-sub    → Domain picker (7 domains)
//   /profile/:type/edit    → Fill in the sub-profile
//   /profile               → MyProfile dashboard ✓ DONE
//
//   ORGANISATION PATH:
//   /profile/org-setup     → 3-step wizard: org name · type · details
//   /company               → CompanyDashboard ✓ DONE
//
// RETURNING USER JOURNEY:
//   /login                 → Login
//   /profile               → MyProfile dashboard
//   /profile/create-sub    → Add another sub-profile
//   /profile/:type         → View any sub-profile (dev/esports/art/etc)
//   /profile/:type/edit    → Edit a sub-profile
//   /company               → Company dashboard (if org account)
//
// PUBLIC VIEWS:
//   /u/:username           → Public profile (in PublicRoutes.jsx)
// ─────────────────────────────────────────────────────────────

// ── Auth (no layout / no navbar) ──────────────────────────────
const Login                    = lazy(() => import('@/features/profile/auth/Login'));
const Signup                   = lazy(() => import('@/features/profile/auth/Signup'));
const VerifyEmail               = lazy(() => import('@/features/profile/auth/VerifyEmail'));
const ProfileSetup              = lazy(() => import('@/features/profile/auth/ProfileSetup'));
const MasterIdentitySetup       = lazy(() => import('@/features/profile/auth/MasterIdentitySetup'));
const OrganizationIdentitySetup = lazy(() => import('@/features/profile/auth/OrganizationIdentitySetup'));

// ── Onboarding (protected, post-signup) ──────────────────────
const IntentQuiz           = lazy(() => import('@/features/profile/pages/onboarding/IntentQuiz'));
const ProfileTypeSelection = lazy(() => import('@/features/profile/pages/onboarding/ProfileTypeSelection'));

// ── Profile pages ─────────────────────────────────────────────
const MyProfile            = lazy(() => import('@/features/profile/pages/MyProfile'));
const ProfileHowItWorks    = lazy(() => import('@/features/profile/pages/ProfileHowItWorks'));
const CreateSubProfile     = lazy(() => import('@/features/profile/pages/subprofiles/CreateSubProfile'));
const UnifiedProfileFacade = lazy(() => import('@/features/profile/pages/subprofiles/UnifiedProfileFacade'));
const EditSubProfile       = lazy(() => import('@/features/profile/pages/subprofiles/EditSubProfile'));

// ── Company pages ─────────────────────────────────────────────
const CompanyDashboard    = lazy(() => import('@/features/profile/company/pages/CompanyDashboard'));
const CompanyProfile      = lazy(() => import('@/features/profile/company/pages/CompanyProfile'));
const ChallengeBuilder    = lazy(() => import('@/features/profile/company/pages/ChallengeBuilder'));
const ChallengeDashboard  = lazy(() => import('@/features/profile/company/pages/ChallengeDashboard'));
const TeamBuilder         = lazy(() => import('@/features/profile/company/pages/TeamBuilder'));
const HireHistory         = lazy(() => import('@/features/profile/company/pages/HireHistory'));

const UserRoutes = () => (
  <>
    {/* ── Step 1–3: Auth flow (no navbar) ── */}
    <Route path="/login"                element={<Login />} />
    <Route path="/signup"               element={<Signup />} />
    <Route path="/verify-email"         element={<VerifyEmail />} />
    <Route path="/profile-setup"        element={<ProfileSetup />} />
    <Route path="/profile/master-setup" element={<MasterIdentitySetup />} />
    <Route path="/profile/org-setup"    element={<OrganizationIdentitySetup />} />

    <Route element={<ProtectedRoute />}>

      {/* ── Step 4–5: Onboarding (after account created) ── */}
      <Route path="/onboarding/quiz"           element={<IntentQuiz />} />
      <Route path="/onboarding/profile-select" element={<ProfileTypeSelection />} />

      {/* Legacy redirect support */}
      <Route path="/profile/choose-subprofile" element={<Navigate to="/onboarding/profile-select" replace />} />
      <Route path="/profile/intent-quiz"       element={<Navigate to="/onboarding/quiz" replace />} />

      {/* ── Profile pages — static routes MUST come before /:type ── */}
      <Route path="/profile"              element={<MyProfile />} />
      <Route path="/profile/create-sub"   element={<CreateSubProfile />} />
      <Route path="/profile/how-it-works" element={<ProfileHowItWorks />} />
      <Route path="/profile/master"       element={<Navigate to="/profile" replace />} />

      {/* ── Sub-profile routes (dynamic) ── */}
      {/* :type = dev | esports | content | business | art | writing | audio */}
      <Route path="/profile/:type"        element={<UnifiedProfileFacade />} />
      <Route path="/profile/:type/edit"   element={<EditSubProfile />} />

      {/* ── Company routes ── */}
      <Route element={<CompanyRoute />}>
        <Route path="/company"                         element={<CompanyDashboard />} />
        <Route path="/company/profile"                 element={<CompanyProfile />} />
        <Route path="/company/challenges/new"          element={<ChallengeBuilder />} />
        <Route path="/company/challenges/:challengeId" element={<ChallengeDashboard />} />
        <Route path="/company/team-builder"            element={<TeamBuilder />} />
        <Route path="/company/history"                 element={<HireHistory />} />
      </Route>

    </Route>
  </>
);

export default UserRoutes;
