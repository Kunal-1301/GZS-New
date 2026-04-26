import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiLock, FiUsers } from 'react-icons/fi';
import ChatInput from '../../components/Chat/ChatInput';
import ChatMessage from '../../components/Chat/ChatMessage';
import { MOCK_CHAT_MESSAGES, MOCK_GROUPS } from '@/shared/data/communityData';

export default function GroupView() {
  const { slug, groupId } = useParams();
  const group = MOCK_GROUPS.find((entry) => entry.id === groupId);
  const baseMessages = useMemo(
    () =>
      MOCK_CHAT_MESSAGES.slice(0, 4).map((message) => ({
        ...message,
        branchLabel: group?.name || 'Group',
      })),
    [group?.name],
  );
  const [messages, setMessages] = useState(baseMessages);

  if (!group) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-6 text-slate-200">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <p>Group not found.</p>
          <Link to={`/community/${slug}/groups`} className="mt-4 inline-block text-indigo-300">
            Back to groups
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 px-6 py-7">
          <Link to={`/community/${slug}/groups`} className="inline-flex items-center gap-2 text-sm text-indigo-300">
            <FiArrowLeft size={14} />
            Back to groups
          </Link>

          <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-white">{group.name}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">{group.description}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-2 text-sm text-slate-300">
                <FiUsers size={14} />
                {group.member_count} members
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-2 text-sm text-slate-300">
                <FiLock size={14} />
                {group.visibility}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
          <section className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
            <div className="border-b border-slate-800 px-5 py-4">
              <h2 className="text-lg font-semibold text-white">Group chat</h2>
              <p className="mt-1 text-sm text-slate-400">Private discussion space for members.</p>
            </div>

            <div className="space-y-1 px-3 py-4">
              {messages.map((message, index) => {
                const previousMessage = messages[index - 1];
                const isGrouped = Boolean(previousMessage && previousMessage.sender_id === message.sender_id);
                const isOwn = message.sender_id === 'current-user';

                return <ChatMessage key={message.id} message={message} isOwn={isOwn} isGrouped={isGrouped} />;
              })}
            </div>

            <ChatInput
              branchSlug={slug}
              channelName={group.name.toLowerCase().replace(/\s+/g, '-')}
              onSend={(message) => setMessages((current) => [...current, { ...message, branchLabel: group.name }])}
            />
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-lg font-semibold text-white">About this group</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{group.description}</p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-lg font-semibold text-white">Rules</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                {group.rules.split('\n').map((rule) => (
                  <p key={rule}>{rule}</p>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
