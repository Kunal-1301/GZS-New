import { useMemo, useState } from 'react';
import { FiPaperclip, FiSend, FiSmile } from 'react-icons/fi';
import communityService from '@/services/features/communityService';

const MAX_CHARACTERS = 2000;
const QUICK_EMOJIS = ['😀', '🎮', '🔥', '👏', '🚀', '💬'];

export default function ChatInput({ branchSlug, channelName, onSend }) {
  const [value, setValue] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const remaining = useMemo(() => MAX_CHARACTERS - value.length, [value.length]);

  const submitMessage = async () => {
    const trimmed = value.trim();

    if (!trimmed || trimmed.length > MAX_CHARACTERS || isSending) {
      return;
    }

    const payload = {
      id: `local-${Date.now()}`,
      channel_id: channelName,
      sender_id: 'current-user',
      sender: {
        username: 'gzs_member',
        display_name: 'You',
        avatar_url: '',
      },
      content: trimmed,
      reactions: {},
      created_at: new Date().toISOString(),
      branchLabel: branchSlug,
      optimistic: true,
    };

    onSend?.(payload);
    setValue('');
    setShowEmojiPicker(false);
    setIsSending(true);

    try {
      // TODO Phase E: Replace with WebSocket connection
      await communityService.sendMessage({
        branch: branchSlug,
        channel: channelName,
        content: trimmed,
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      await submitMessage();
    }
  };

  return (
    <div className="border-t border-slate-800 bg-slate-900 px-4 py-4">
      <p className="mb-2 text-xs text-slate-400">Ava is typing...</p>

      {showEmojiPicker ? (
        <div className="mb-3 flex flex-wrap gap-2 rounded-2xl border border-slate-800 bg-slate-950/80 p-3">
          {QUICK_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => {
                if (value.length < MAX_CHARACTERS) {
                  setValue((current) => `${current}${emoji}`);
                }
              }}
              className="rounded-xl px-3 py-2 text-xl transition hover:bg-slate-800"
            >
              {emoji}
            </button>
          ))}
        </div>
      ) : null}

      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3">
        <div className="flex items-end gap-3">
          <textarea
            value={value}
            onChange={(event) => setValue(event.target.value.slice(0, MAX_CHARACTERS))}
            onKeyDown={handleKeyDown}
            rows={value.includes('\n') ? 4 : 2}
            placeholder={`Message #${channelName}`}
            className="min-h-[52px] flex-1 resize-none bg-transparent text-sm leading-6 text-slate-100 outline-none placeholder:text-slate-500"
          />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowEmojiPicker((current) => !current)}
              className="rounded-xl p-2.5 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              aria-label="Toggle emoji picker"
            >
              <FiSmile />
            </button>
            <button
              type="button"
              className="rounded-xl p-2.5 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              aria-label="Attach file"
            >
              <FiPaperclip />
            </button>
            <button
              type="button"
              onClick={submitMessage}
              disabled={!value.trim() || isSending}
              className="rounded-xl bg-indigo-500 p-2.5 text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-700"
              aria-label="Send message"
            >
              <FiSend />
            </button>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-end text-xs text-slate-500">{remaining}/2000</div>
      </div>
    </div>
  );
}
