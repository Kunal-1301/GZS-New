import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import {
  MOCK_ACTIVITY,
  MOCK_POSTS,
  MOCK_PROJECTS,
  MOCK_SKILLS,
  MOCK_SUB_PROFILES,
} from '@/shared/data/profileData';

const DOMAIN_META = {
  dev: { label: 'Game Development', color: 'var(--domain-dev)' },
  esports: { label: 'Esports', color: 'var(--domain-esports)' },
  content: { label: 'Content', color: 'var(--domain-content)' },
  business: { label: 'Business', color: 'var(--domain-business)' },
  art: { label: 'Art', color: 'var(--domain-art)' },
  writing: { label: 'Writing', color: 'var(--domain-writing)' },
  audio: { label: 'Audio', color: 'var(--domain-audio)' },
};

const SECTIONS = [
  { id: 'header', label: 'Header' },
  { id: 'focus', label: 'Focus' },
  { id: 'skills', label: 'Skill Matrix' },
  { id: 'tools', label: 'Tools & Stack' },
  { id: 'projects', label: 'Projects / Proof' },
  { id: 'activity', label: 'Activity' },
  { id: 'availability', label: 'Availability' },
  { id: 'media', label: 'Media' },
];

const PROFILE_DETAILS = {
  dev: {
    headline: 'Building scalable game systems for competitive and social experiences.',
    currentWork: 'Leading platform architecture for GzoneSphere and prototyping UE5 performance tools.',
    openTo: ['Platform engineering', 'Technical design', 'Co-op prototypes'],
    tools: [
      { name: 'Unreal Engine 5', level: 'Expert' },
      { name: 'React', level: 'Advanced' },
      { name: 'FastAPI', level: 'Advanced' },
      { name: 'Redis', level: 'Intermediate' },
    ],
    availability: { timezone: 'Asia/Kolkata', contract: 'Full-time / Consulting', hours: '20-30 hrs/week' },
    media: [
      { label: 'Website', value: 'https://viperstrike.dev' },
      { label: 'GitHub', value: 'https://github.com/viper-strike/gzonesphere' },
      { label: 'Showreel', value: 'https://viperstrike.dev/showreel' },
    ],
  },
  esports: {
    headline: 'Competitive player, strategist, and VOD analyst focused on team systems.',
    currentWork: 'Scrimming with emerging rosters and building a fresh prep library for major qualifiers.',
    openTo: ['Trial opportunities', 'Analyst reviews', 'Team building'],
    tools: [
      { name: 'Aim Lab', level: 'Advanced' },
      { name: 'Valorant Tracker', level: 'Expert' },
      { name: 'Notion Prep Boards', level: 'Advanced' },
    ],
    availability: { timezone: 'Asia/Kolkata', contract: 'Roster / Short-term camp', hours: '25 hrs/week' },
    media: [
      { label: 'Tracker', value: 'https://tracker.gg/' },
      { label: 'Clips', value: 'https://example.com/esports-clips' },
      { label: 'VOD Sheet', value: 'https://example.com/vod-sheet' },
    ],
  },
  content: {
    headline: 'Streaming product-building in public and teaching technical workflows live.',
    currentWork: 'Publishing weekly build logs and educational breakdowns around the platform roadmap.',
    openTo: ['Guest streams', 'Brand collaborations', 'Workshop hosting'],
    tools: [
      { name: 'OBS Studio', level: 'Expert' },
      { name: 'Premiere Pro', level: 'Advanced' },
      { name: 'Twitch', level: 'Advanced' },
    ],
    availability: { timezone: 'Asia/Kolkata', contract: 'Sponsored sessions / Series', hours: '10-15 hrs/week' },
    media: [
      { label: 'Twitch', value: 'https://twitch.tv/viper_strike' },
      { label: 'YouTube', value: 'https://youtube.com/' },
      { label: 'Podcast', value: 'https://example.com/podcast' },
    ],
  },
};

function proficiencyBar(level) {
  if (level === 'Expert') return 'w-full';
  if (level === 'Advanced') return 'w-4/5';
  if (level === 'Intermediate') return 'w-3/5';
  return 'w-2/5';
}

export default function UnifiedProfileFacade() {
  usePageTheme('profile');

  const { type } = useParams();
  const subProfile = MOCK_SUB_PROFILES.find((profile) => profile.type === type) || MOCK_SUB_PROFILES[0];
  const meta = DOMAIN_META[subProfile.type] || DOMAIN_META.dev;
  const details = PROFILE_DETAILS[subProfile.type] || PROFILE_DETAILS.dev;

  const skills = useMemo(
    () => MOCK_SKILLS.filter((skill) => skill.sub_profile_id === subProfile.id),
    [subProfile.id],
  );
  const projects = useMemo(
    () => MOCK_PROJECTS.filter((project) => project.sub_profile_id === subProfile.id),
    [subProfile.id],
  );
  const activityPosts = useMemo(
    () => MOCK_POSTS.filter((post) => post.sub_profile_id === subProfile.id),
    [subProfile.id],
  );
  const groupedSkills = useMemo(() => {
    const groups = new Map();
    skills.forEach((skill) => {
      const key = skill.category;
      groups.set(key, [...(groups.get(key) || []), skill]);
    });
    return Array.from(groups.entries());
  }, [skills]);

  return (
    <>
      <Helmet>
        <title>{subProfile.display_name} | GzoneSphere</title>
      </Helmet>

      <div className="min-h-screen bg-[var(--theme-bg)]">
        <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:px-8">
          <aside className="hidden w-60 shrink-0 lg:block">
            <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <nav className="space-y-2">
                {SECTIONS.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block rounded-2xl px-3 py-2 text-sm text-slate-600 transition hover:bg-violet-50 hover:text-violet-700"
                  >
                    {section.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <main className="min-w-0 flex-1 space-y-6">
            <div className="sticky top-16 z-20 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-sm lg:hidden">
              <div className="flex gap-2">
                {SECTIONS.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="whitespace-nowrap rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600"
                  >
                    {section.label}
                  </a>
                ))}
              </div>
            </div>

            <section id="header" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <span
                className="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                style={{ backgroundColor: `${meta.color}18`, color: meta.color }}
              >
                {meta.label}
              </span>
              <h1 className="mt-4 text-3xl font-semibold text-slate-900">{subProfile.display_name}</h1>
              <p className="mt-2 text-lg text-slate-600">{subProfile.primary_role}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {subProfile.secondary_roles.map((role) => (
                  <span key={role} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                    {role}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">{details.headline}</p>
            </section>

            <section id="focus" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Focus</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{details.currentWork}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {details.openTo.map((item) => (
                  <span key={item} className="rounded-full bg-violet-50 px-3 py-1 text-sm text-violet-700">
                    Open to {item}
                  </span>
                ))}
              </div>
            </section>

            <section id="skills" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Skill Matrix</h2>
              <div className="mt-5 space-y-5">
                {groupedSkills.map(([category, categorySkills]) => (
                  <div key={category}>
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{category}</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {categorySkills.map((skill) => (
                        <span
                          key={skill.id}
                          className={`rounded-full px-3 py-1 text-sm ${
                            skill.verified ? 'bg-violet-50 text-violet-700' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="tools" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Tools & Stack</h2>
              <div className="mt-5 space-y-4">
                {details.tools.map((tool) => (
                  <div key={tool.name}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-900">{tool.name}</span>
                      <span className="text-slate-500">{tool.level}</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-slate-100">
                      <div className={`h-2 rounded-full bg-violet-500 ${proficiencyBar(tool.level)}`} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="projects" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Projects / Proof</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {projects.map((project) => (
                  <article key={project.id} className="overflow-hidden rounded-2xl border border-slate-200">
                    <img src={project.thumbnail_url} alt={project.title} className="h-44 w-full object-cover" />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{project.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.skill_tags.map((tag) => {
                          const skill = MOCK_SKILLS.find((item) => item.id === tag);
                          return (
                            <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                              {skill?.name || tag}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="activity" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Activity</h2>
              <div className="mt-5 space-y-4">
                {activityPosts.map((post) => (
                  <div key={post.id} className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm leading-6 text-slate-700">{post.content}</p>
                  </div>
                ))}
                {MOCK_ACTIVITY.slice(0, 3).map((item) => (
                  <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-sm font-medium text-slate-900">{item.action.replace(/_/g, ' ')}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="availability" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Availability</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Timezone</p>
                  <p className="mt-2 text-sm font-medium text-slate-900">{details.availability.timezone}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Contract type</p>
                  <p className="mt-2 text-sm font-medium text-slate-900">{details.availability.contract}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Hours / week</p>
                  <p className="mt-2 text-sm font-medium text-slate-900">{details.availability.hours}</p>
                </div>
              </div>
            </section>

            <section id="media" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Media</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {details.media.map((item) => (
                  <a
                    key={item.label}
                    href={item.value}
                    className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-700 transition hover:border-violet-300 hover:text-violet-700"
                  >
                    <p className="font-medium text-slate-900">{item.label}</p>
                    <p className="mt-2 truncate text-slate-500">{item.value}</p>
                  </a>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
