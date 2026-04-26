import { lazy } from 'react';
import { Route, Navigate } from 'react-router-dom';
import PublicLayout from '@/app/layouts/PublicLayout';

const Home             = lazy(() => import('@/features/home/pages/Home'));
const GamePostPage     = lazy(() => import('@/features/games/pages/GamePostPage'));
const GamePostCollection = lazy(() => import('@/features/games/pages/GamePostCollection'));
const Discovery        = lazy(() => import('@/features/games/pages/Discovery'));
const Blog             = lazy(() => import('@/features/blogs/pages/Blog'));
const BlogPost         = lazy(() => import('@/features/blogs/pages/BlogPost'));
const BlogWriteGate    = lazy(() => import('@/features/blogs/pages/BlogWriteGate'));
const Career           = lazy(() => import('@/features/career/pages/Career'));
const AboutHub         = lazy(() => import('@/features/about/pages/AboutHub'));
const About            = lazy(() => import('@/features/about/pages/About'));
const AboutStory       = lazy(() => import('@/features/about/pages/AboutStory'));
const Contact          = lazy(() => import('@/features/contact/pages/Contact'));
const NotFound         = lazy(() => import('@/features/games/pages/NotFound'));
const PublicProfile    = lazy(() => import('@/features/profile/pages/public/PublicProfile'));

const PublicRoutes = () => (
  <>
    <Route element={<PublicLayout />}>
      <Route path="/"                  element={<Home />} />
      <Route path="/games"             element={<GamePostCollection />} />
      <Route path="/games/:slug"       element={<GamePostPage />} />
      <Route path="/game-collection"   element={<Navigate to="/games" replace />} />
      <Route path="/blog"              element={<Blog />} />
      <Route path="/blog/:slug"        element={<BlogPost />} />
      <Route path="/write-blog"        element={<BlogWriteGate />} />
      <Route path="/discovery"         element={<Discovery />} />
      <Route path="/career"            element={<Career />} />
      <Route path="/about"             element={<AboutHub />} />
      <Route path="/about/details"     element={<About />} />
      <Route path="/about/origin"      element={<AboutStory />} />
      <Route path="/contact"           element={<Contact />} />
      <Route path="/u/:username"       element={<PublicProfile />} />
    </Route>
  </>
);

export default PublicRoutes;





