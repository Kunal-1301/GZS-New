import { NavLink } from 'react-router-dom';
import { FiCalendar, FiHash, FiLayers, FiUsers } from 'react-icons/fi';
import { MOCK_CHANNELS } from '@/shared/data/communityData';

const SECTION_CONFIG = [
  { key: 'chat', label: 'CHAT', icon: FiHash, fallback: [{ name: 'general', to: 'room/general' }] },
  { key: 'showcase', label: 'SHOWCASE', icon: FiLayers, fallback: [{ name: 'showcase', to: 'showcase' }] },
  { key: 'events', label: 'EVENTS', icon: FiCalendar, fallback: [{ name: 'events', to: 'events' }] },
  { key: 'lfg', label: 'LFG', icon: FiUsers, fallback: [{ name: 'lfg-board', to: 'lfg' }] },
];

const CHANNEL_TYPE_MAP = {
  chat: ['general', 'help', 'announcements'],
  showcase: ['showcase'],
  events: ['events', 'announcements'],
  lfg: ['lfg'],
};

const USER_CARD = {
  username: 'gzs_member',
  status: 'Online',
  avatar: 'G',
};

export default function ChannelSidebar({ branch }) {
  const branchChannels = MOCK_CHANNELS.filter((channel) => channel.branch_id === branch?.id);
  const onlineCount = Math.max(18, Math.round((branch?.member_count || 200) * 0.07));

  const sections = SECTION_CONFIG.map((section) => {
    const items = branchChannels
      .filter((channel) => CHANNEL_TYPE_MAP[section.key].includes(channel.channel_type))
      .map((channel) => ({
        id: channel.id,
        name: channel.slug,
        to: section.key === 'chat' ? `room/${channel.slug}` : section.key,
      }));

    return {
      ...section,
      items: items.length ? items : section.fallback,
    };
  });

  return (
    <aside className="hidden w-[240px] shrink-0 border-r border-slate-800 bg-slate-900/90 lg:flex lg:flex-col">
      <div className="border-b border-slate-800 px-4 py-4">
        <p className="text-sm font-semibold text-white">{branch?.name || 'Community Branch'}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">Online: {onlineCount}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        {sections.map((section) => {
          const Icon = section.icon;

          return (
            <div key={section.key} className="mb-5">
              <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {section.label}
              </div>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavLink
                    key={item.id || item.name}
                    to={`/community/${branch?.slug}/${item.to}`}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                        isActive ? 'bg-indigo-500/15 text-indigo-200' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`
                    }
                  >
                    <Icon size={15} />
                    <span className="truncate">#{item.name}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center gap-3 rounded-2xl bg-slate-950/80 px-3 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-sm font-semibold text-indigo-200">
            {USER_CARD.avatar}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-white">{USER_CARD.username}</div>
            <div className="text-xs text-slate-400">{USER_CARD.status}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
