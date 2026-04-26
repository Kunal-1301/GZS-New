import { useMemo, useState } from 'react';

export default function PostComposer({ masterProfile, subProfiles = [], onCreatePost }) {
  const [content, setContent] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(subProfiles[0]?.id || 'master');

  const selectedAuthor = useMemo(() => {
    if (selectedProfile === 'master') {
      return {
        sub_profile_type: 'master',
        author: {
          username: masterProfile.username,
          display_name: masterProfile.display_name,
          avatar_url: masterProfile.avatar_url,
          primary_role: 'Master Profile',
        },
      };
    }

    const subProfile = subProfiles.find((profile) => profile.id === selectedProfile);
    return {
      sub_profile_type: subProfile?.type || 'master',
      sub_profile_id: subProfile?.id,
      author: {
        username: subProfile?.username || masterProfile.username,
        display_name: subProfile?.display_name || masterProfile.display_name,
        avatar_url: subProfile?.avatar_url || masterProfile.avatar_url,
        primary_role: subProfile?.primary_role || 'Creator',
      },
    };
  }, [masterProfile, selectedProfile, subProfiles]);

  const handleSubmit = () => {
    if (!content.trim()) return;

    onCreatePost?.({
      id: `draft-${Date.now()}`,
      user_id: masterProfile.id,
      content: content.trim(),
      media_urls: [],
      like_count: 0,
      comment_count: 0,
      share_count: 0,
      view_count: 0,
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      ...selectedAuthor,
    });

    setContent('');
  };

  return (
    <section className="gzs-card-elevated rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Share an update</h2>
          <p className="mt-1 text-sm text-slate-500">Post to your master identity or one of your domain profiles.</p>
        </div>

        <select
          value={selectedProfile}
          onChange={(event) => setSelectedProfile(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-violet-300"
        >
          <option value="master">Master Profile</option>
          {subProfiles.map((profile) => (
            <option key={profile.id} value={profile.id}>
              {profile.display_name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value.slice(0, 500))}
          rows={5}
          placeholder="What are you building, learning, shipping, or planning next?"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 outline-none transition focus:border-violet-300"
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{content.length}/500</p>
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-xl bg-violet-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-600"
        >
          Post update
        </button>
      </div>
    </section>
  );
}
