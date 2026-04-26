import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiSettings, FiUsers } from 'react-icons/fi';
import ChatInput from '../../components/Chat/ChatInput';
import ChatMessage from '../../components/Chat/ChatMessage';
import { COMMUNITY_BRANCHES, MOCK_CHAT_MESSAGES } from '@/shared/data/communityData';

const BRANCH_LABELS = {
  dev: 'Dev',
  esports: 'Esports',
  content: 'Content',
  business: 'Business',
  art: 'Art',
  writing: 'Writing',
  audio: 'Audio',
  general: 'General',
  newcomers: 'Newcomers',
};

function formatDay(value) {
  return new Date(value).toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function sameDay(a, b) {
  return new Date(a).toDateString() === new Date(b).toDateString();
}

export default function CommunityRoom() {
  const { slug, roomSlug } = useParams();
  const containerRef = useRef(null);
  const branch = COMMUNITY_BRANCHES.find((entry) => entry.slug === slug);

  const initialMessages = useMemo(() => {
    const channelMessages = MOCK_CHAT_MESSAGES.filter((message) => message.channel_id.includes(roomSlug || 'general'));
    const messages = channelMessages.length ? channelMessages : MOCK_CHAT_MESSAGES;

    return messages.map((message) => ({
      ...message,
      branchLabel: BRANCH_LABELS[slug] || 'Community',
    }));
  }, [roomSlug, slug]);

  const [messages, setMessages] = useState(initialMessages);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    setMessages(initialMessages);
    setVisibleCount(12);
  }, [initialMessages]);

  useEffect(() => {
    const node = containerRef.current;
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  }, [messages, visibleCount]);

  const visibleMessages = messages.slice(Math.max(0, messages.length - visibleCount));
  const onlineCount = Math.max(18, Math.round((branch?.member_count || 200) * 0.07));

  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <div className="border-b border-slate-800 bg-slate-900 px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-white">#{roomSlug || 'general'}</span>
              <span className="text-xs text-slate-500">Live discussion for {branch?.name || 'this branch'}</span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
              <FiUsers size={13} />
              <span>{onlineCount} online</span>
            </div>
          </div>

          <button className="rounded-xl border border-slate-800 bg-slate-950/70 p-2.5 text-slate-300 transition hover:border-indigo-400/50 hover:text-white">
            <FiSettings />
          </button>
        </div>
      </div>

      <div ref={containerRef} className="flex-1 overflow-y-auto px-3 py-4 sm:px-6">
        {visibleCount < messages.length ? (
          <div className="mb-4 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + 10)}
              className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200 transition hover:border-indigo-400/50"
            >
              Load more
            </button>
          </div>
        ) : null}

        <div className="space-y-1">
          {visibleMessages.map((message, index) => {
            const previousMessage = visibleMessages[index - 1];
            const isGrouped = Boolean(previousMessage && previousMessage.sender_id === message.sender_id && sameDay(previousMessage.created_at, message.created_at));
            const showDateSeparator = !previousMessage || !sameDay(previousMessage.created_at, message.created_at);
            const isOwn = message.sender_id === 'current-user';

            return (
              <div key={message.id}>
                {showDateSeparator ? (
                  <div className="my-4 flex items-center gap-3">
                    <div className="h-px flex-1 bg-slate-800" />
                    <span className="text-xs uppercase tracking-[0.18em] text-slate-500">{formatDay(message.created_at)}</span>
                    <div className="h-px flex-1 bg-slate-800" />
                  </div>
                ) : null}

                <ChatMessage message={message} isOwn={isOwn} isGrouped={isGrouped} />
              </div>
            );
          })}
        </div>
      </div>

      <ChatInput
        branchSlug={slug}
        channelName={roomSlug || 'general'}
        onSend={(message) => setMessages((current) => [...current, { ...message, branchLabel: BRANCH_LABELS[slug] || 'Community' }])}
      />
    </div>
  );
}
