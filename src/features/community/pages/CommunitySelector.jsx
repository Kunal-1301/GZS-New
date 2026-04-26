import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  FiBookOpen,
  FiBriefcase,
  FiCode,
  FiEdit3,
  FiFeather,
  FiHeadphones,
  FiImage,
  FiShield,
  FiUsers,
} from 'react-icons/fi';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import { COMMUNITY_BRANCHES, MOCK_CHAT_MESSAGES } from '@/shared/data/communityData';

const BRANCH_ORDER = ['dev', 'esports', 'content', 'business', 'art', 'writing', 'audio', 'general', 'newcomers'];

const BRANCH_META = {
  dev: { label: 'Dev', icon: FiCode, color: '#6366F1' },
  esports: { label: 'Esports', icon: FiShield, color: '#EF4444' },
  content: { label: 'Content', icon: FiImage, color: '#0EA5E9' },
  business: { label: 'Business', icon: FiBriefcase, color: '#F59E0B' },
  art: { label: 'Art', icon: FiEdit3, color: '#EC4899' },
  writing: { label: 'Writing', icon: FiFeather, color: '#14B8A6' },
  audio: { label: 'Audio', icon: FiHeadphones, color: '#8B5CF6' },
  general: { label: 'General', icon: FiUsers, color: '#64748B' },
  newcomers: { label: 'Newcomers', icon: FiBookOpen, color: '#22C55E' },
};

const LATEST_PREVIEWS = {
  dev: MOCK_CHAT_MESSAGES.at(-1)?.content,
  esports: 'Scrim signups for tonight are still open if your team needs one more player.',
  content: 'New creator feedback threads are up and ready for reviews.',
  business: 'A fresh studio growth discussion kicked off this morning.',
  art: 'Members are sharing character sheets and critique requests today.',
  writing: 'Story prompts and worldbuilding notes are trending right now.',
  audio: 'Sound designers are swapping ambience packs and mix tips.',
  general: 'Introductions, open chat, and cross-branch updates are flowing.',
  newcomers: 'Start here for help, onboarding, and your first branch recommendations.',
};

const branchCards = BRANCH_ORDER
  .map((slug) => COMMUNITY_BRANCHES.find((branch) => branch.slug === slug))
  .filter(Boolean)
  .map((branch, index) => {
    const meta = BRANCH_META[branch.slug];
    const onlineCount = Math.max(12, Math.round(branch.member_count * (0.08 + (index % 3) * 0.015)));

    return {
      ...branch,
      label: meta.label,
      icon: meta.icon,
      accentColor: meta.color,
      onlineCount,
      latestPreview: LATEST_PREVIEWS[branch.slug] || 'Say hello and meet the people active in this branch.',
    };
  });

export default function CommunitySelector() {
  usePageTheme('community');

  return (
    <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)]">
      <Helmet>
        <title>Community | GzoneSphere</title>
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-8 rounded-3xl border border-white/10 bg-slate-900 px-6 py-8 shadow-2xl sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-indigo-300">Community</p>
          <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Choose your branch</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
            Each branch is a focused space for collaboration, live discussion, events, and groups across the
            GzoneSphere ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {branchCards.map((branch) => {
            const Icon = branch.icon;

            return (
              <article
                key={branch.id}
                className="gzs-card-elevated flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                style={{ borderLeft: `6px solid ${branch.accentColor}` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl text-xl"
                    style={{ backgroundColor: `${branch.accentColor}16`, color: branch.accentColor }}
                  >
                    <Icon />
                  </div>
                  <div className="text-right text-sm text-slate-500">
                    <div className="font-medium text-slate-900">{branch.member_count.toLocaleString()} members</div>
                    <div className="mt-1 inline-flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                      <span>{branch.onlineCount} online</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <h3 className="text-xl font-semibold text-slate-900">{branch.label}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{branch.description}</p>
                </div>

                <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Latest message</p>
                  <p className="mt-1 line-clamp-1 text-sm italic text-slate-500">{branch.latestPreview}</p>
                </div>

                <div className="mt-6">
                  <Link
                    to={`/community/${branch.slug}`}
                    className="inline-flex items-center rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600"
                  >
                    Enter {'->'}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
