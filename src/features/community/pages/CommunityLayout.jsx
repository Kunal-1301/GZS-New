import { Outlet, useLocation, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import BranchNavSidebar from '../components/BranchNavSidebar';
import ChannelSidebar from '../components/ChannelSidebar';
import OnlineUsers from '../components/Chat/OnlineUsers';
import { COMMUNITY_BRANCHES, MOCK_CHAT_MESSAGES, MOCK_GROUPS } from '@/shared/data/communityData';

const BRANCH_ORDER = ['dev', 'esports', 'content', 'business', 'art', 'writing', 'audio', 'general', 'newcomers'];

const buildOnlineUsers = (slug) => {
  const messageUsers = MOCK_CHAT_MESSAGES.map((message, index) => ({
    id: `${message.sender_id}-${index}`,
    username: message.sender?.display_name || message.sender?.username || 'Community User',
    avatar: message.sender?.avatar_url || '',
    status: index % 2 === 0 ? 'Active in chat' : 'Reviewing posts',
    branch: slug,
  }));

  const groupOwners = MOCK_GROUPS.filter((group) => group.branch_id.includes(slug)).map((group, index) => ({
    id: `${group.owner_id}-${index}`,
    username: group.name,
    avatar: '',
    status: 'Managing a group',
    branch: slug,
  }));

  const deduped = [...messageUsers, ...groupOwners].filter(
    (user, index, array) => array.findIndex((entry) => entry.username === user.username) === index,
  );

  return deduped.slice(0, 8);
};

export default function CommunityLayout() {
  usePageTheme('community');

  const { slug } = useParams();
  const location = useLocation();

  const branches = useMemo(
    () =>
      BRANCH_ORDER.map((branchSlug) => COMMUNITY_BRANCHES.find((branch) => branch.slug === branchSlug)).filter(Boolean),
    [],
  );

  const activeBranch = branches.find((branch) => branch.slug === slug) || branches[0];
  const onlineUsers = useMemo(() => buildOnlineUsers(activeBranch?.slug || 'dev'), [activeBranch]);
  const showChannelSidebar = !location.pathname.endsWith(`/${slug}`);

  return (
    <div className="theme-community min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <BranchNavSidebar branches={branches} activeSlug={activeBranch?.slug} />

        <div className="flex min-h-screen flex-1 pl-0 lg:pl-[240px]">
          {showChannelSidebar ? <ChannelSidebar branch={activeBranch} /> : null}

          <main className="min-w-0 flex-1 bg-slate-950">
            <Outlet />
          </main>

          <aside className="hidden w-[200px] shrink-0 border-l border-slate-800 bg-slate-900/85 xl:block">
            <OnlineUsers users={onlineUsers} />
          </aside>
        </div>
      </div>
    </div>
  );
}
