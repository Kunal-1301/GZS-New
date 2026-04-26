import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import IdentityBanner from '../components/IdentityBanner';
import AggregateStatsRow from '../components/AggregateStatsRow';
import SubProfileGrid from '../components/SubProfileGrid';
import SocialPanel from '../components/SocialPanel';
import PostComposer from '../components/PostComposer';
import PostCard from '../components/PostCard';
import {
  MOCK_FOLLOWERS,
  MOCK_FRIENDS,
  MOCK_MASTER_PROFILE,
  MOCK_POSTS,
  MOCK_SKILLS,
  MOCK_SUB_PROFILES,
} from '@/shared/data/profileData';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'subprofiles', label: 'Sub-Profiles' },
  { id: 'settings', label: 'Settings' },
];

const INITIAL_AVAILABILITY = [
  {
    key: 'hiring',
    label: 'Hiring',
    description: 'Show that you are open to paid opportunities and role discussions.',
    enabled: true,
  },
  {
    key: 'collab',
    label: 'Collab',
    description: 'Let people know you are available for creative and product collaboration.',
    enabled: true,
  },
  {
    key: 'events',
    label: 'Events',
    description: 'Surface your interest in panels, workshops, scrims, and community sessions.',
    enabled: false,
  },
];

const SETTINGS_SECTIONS = [
  {
    title: 'Master profile settings',
    description: 'Update account-level preferences, privacy defaults, and identity details in the settings area.',
  },
  {
    title: 'Sub-profile maintenance',
    description: 'Keep each domain profile current so collaborators and recruiters see the right signals.',
  },
];

function AvailabilityCard({ items, onToggle }) {
  return (
    <section className="gzs-card-elevated rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Global availability</h2>
        <p className="mt-1 text-sm text-slate-500">Control the opportunities you want surfaced across the platform.</p>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.key} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                <p className="mt-1 text-sm text-slate-500">{item.description}</p>
              </div>
              <button
                type="button"
                onClick={() => onToggle(item.key)}
                aria-pressed={item.enabled}
                className={`relative h-7 w-12 rounded-full transition ${
                  item.enabled ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                    item.enabled ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function MyProfile() {
  usePageTheme('profile');

  const [activeTab, setActiveTab] = useState('overview');
  const [availability, setAvailability] = useState(INITIAL_AVAILABILITY);
  const [posts, setPosts] = useState(MOCK_POSTS);

  const statsProfile = useMemo(
    () => ({
      ...MOCK_MASTER_PROFILE,
      trust_score: 8.4,
      verified_skills_count: MOCK_SKILLS.filter((skill) => skill.verified).length,
      sub_profiles: MOCK_SUB_PROFILES,
      friends_count: MOCK_FRIENDS.length,
      followers_count: MOCK_FOLLOWERS.length,
      platform_level: 'Hustler',
      has_verified_skills: MOCK_SKILLS.some((skill) => skill.verified),
      show_real_name: true,
      real_name: 'Aarav Menon',
    }),
    [],
  );

  const handleToggleAvailability = (key) => {
    setAvailability((current) =>
      current.map((item) => (item.key === key ? { ...item, enabled: !item.enabled } : item)),
    );
  };

  const handleCreatePost = (newPost) => {
    setPosts((current) => [newPost, ...current]);
  };

  return (
    <>
      <Helmet>
        <title>My Profile | GzoneSphere</title>
      </Helmet>

      <div className="min-h-screen bg-[var(--theme-bg)] pb-12">
        <IdentityBanner masterProfile={statsProfile} isOwn />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 border-b border-slate-200">
            <nav className="flex flex-wrap gap-2">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-t-2xl px-5 py-3 text-sm font-medium transition ${
                    activeTab === tab.id
                      ? 'bg-white text-violet-600 shadow-sm'
                      : 'text-slate-500 hover:bg-white/70 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,7fr)_minmax(280px,3fr)]">
            <main className="space-y-6">
              {activeTab === 'overview' ? (
                <>
                  <SubProfileGrid subProfiles={MOCK_SUB_PROFILES} isOwn />
                  <PostComposer
                    masterProfile={statsProfile}
                    subProfiles={MOCK_SUB_PROFILES}
                    onCreatePost={handleCreatePost}
                  />
                  <div className="space-y-5">
                    {posts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                </>
              ) : null}

              {activeTab === 'subprofiles' ? (
                <>
                  <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">All sub-profiles</h2>
                      <p className="mt-1 text-sm text-slate-500">
                        Manage every domain identity you use across GzoneSphere.
                      </p>
                    </div>
                    <Link to="/profile/create-sub" className="gzs-btn-primary rounded-xl px-4 py-2 text-sm font-semibold text-white">
                      Create new
                    </Link>
                  </div>
                  <SubProfileGrid subProfiles={MOCK_SUB_PROFILES} isOwn />
                </>
              ) : null}

              {activeTab === 'settings' ? (
                <div className="space-y-5">
                  {SETTINGS_SECTIONS.map((section) => (
                    <section key={section.title} className="gzs-card-elevated rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                      <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
                      <p className="mt-2 text-sm text-slate-500">{section.description}</p>
                      <div className="mt-5">
                        <Link
                          to="/settings"
                          className="inline-flex items-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-violet-300 hover:text-violet-700"
                        >
                          Open settings
                        </Link>
                      </div>
                    </section>
                  ))}
                </div>
              ) : null}
            </main>

            <aside className="space-y-6">
              <AggregateStatsRow
                masterProfile={statsProfile}
                subProfiles={MOCK_SUB_PROFILES}
                skills={MOCK_SKILLS}
                friends={MOCK_FRIENDS}
                followers={MOCK_FOLLOWERS}
                vertical
              />
              <SocialPanel
                isOwn
                masterProfile={statsProfile}
                friends={MOCK_FRIENDS}
                followers={MOCK_FOLLOWERS}
              />
              <AvailabilityCard items={availability} onToggle={handleToggleAvailability} />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
