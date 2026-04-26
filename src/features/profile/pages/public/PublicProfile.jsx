import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import IdentityBanner from '../../components/IdentityBanner';
import AggregateStatsRow from '../../components/AggregateStatsRow';
import SubProfileGrid from '../../components/SubProfileGrid';
import SocialPanel from '../../components/SocialPanel';
import PostCard from '../../components/PostCard';
import {
  MOCK_FOLLOWERS,
  MOCK_FRIENDS,
  MOCK_POSTS,
  MOCK_PUBLIC_PROFILES,
  MOCK_SKILLS,
} from '@/shared/data/profileData';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'subprofiles', label: 'Sub-Profiles' },
  { id: 'settings', label: 'Settings' },
];

const DOMAIN_ROLE_LOOKUP = {
  art: 'Environment Artist',
  dev: 'Technical Artist',
  esports: 'Pro Player',
  writing: 'Technical Writer',
  content: 'Creator',
  business: 'Strategist',
  audio: 'Composer',
};

export default function PublicProfile() {
  usePageTheme('profile');

  const { username } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const publicProfile = MOCK_PUBLIC_PROFILES.find((profile) => profile.username === username) || MOCK_PUBLIC_PROFILES[0];

  const subProfiles = useMemo(
    () =>
      (publicProfile.sub_profiles || []).map((profile, index) => ({
        id: `${publicProfile.id}-${profile.type}-${index}`,
        type: profile.type,
        username: profile.username,
        display_name: profile.username,
        primary_role: profile.primary_role || DOMAIN_ROLE_LOOKUP[profile.type] || 'Creator',
        experience_level: index === 0 ? 'expert' : 'advanced',
        is_active: true,
      })),
    [publicProfile],
  );

  const skills = useMemo(
    () =>
      subProfiles.flatMap((profile, index) => [
        {
          id: `${profile.id}-skill-1`,
          sub_profile_id: profile.id,
          name: profile.primary_role.split(' ')[0],
          verified: index % 2 === 0,
        },
        {
          id: `${profile.id}-skill-2`,
          sub_profile_id: profile.id,
          name: profile.type === 'art' ? 'Worldbuilding' : 'Strategy',
          verified: true,
        },
      ]),
    [subProfiles],
  );

  const posts = useMemo(() => {
    const byType = MOCK_POSTS.filter((post) =>
      subProfiles.some((profile) => profile.type === post.sub_profile_type),
    );

    return byType.map((post) => ({
      ...post,
      author: {
        ...post.author,
        display_name: publicProfile.display_name,
        username: publicProfile.username,
        avatar_url: publicProfile.avatar_url,
      },
    }));
  }, [publicProfile, subProfiles]);

  const masterProfile = {
    ...publicProfile,
    trust_score: 7.8,
    verified_skills_count: skills.filter((skill) => skill.verified).length,
    platform_level: 'Pro',
    has_verified_skills: true,
  };

  return (
    <>
      <Helmet>
        <title>@{publicProfile.username} | GzoneSphere</title>
      </Helmet>

      <div className="min-h-screen bg-[var(--theme-bg)] pb-12">
        <IdentityBanner masterProfile={masterProfile} actionMode="connect" />

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
                  <SubProfileGrid subProfiles={subProfiles} username={publicProfile.username} />
                  <div className="space-y-5">
                    {posts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                </>
              ) : null}

              {activeTab === 'subprofiles' ? <SubProfileGrid subProfiles={subProfiles} username={publicProfile.username} /> : null}

              {activeTab === 'settings' ? (
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-slate-900">Profile visibility</h2>
                  <p className="mt-2 text-sm text-slate-500">
                    This is a read-only public profile. Direct settings are only available to the account owner.
                  </p>
                </section>
              ) : null}
            </main>

            <aside className="space-y-6">
              <AggregateStatsRow
                masterProfile={masterProfile}
                subProfiles={subProfiles}
                skills={skills.length ? skills : MOCK_SKILLS}
                friends={MOCK_FRIENDS}
                followers={MOCK_FOLLOWERS}
                vertical
              />
              <SocialPanel
                masterProfile={masterProfile}
                friends={MOCK_FRIENDS}
                followers={MOCK_FOLLOWERS}
                mutualConnections={6}
              />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
