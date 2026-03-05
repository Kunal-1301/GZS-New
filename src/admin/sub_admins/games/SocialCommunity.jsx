import { FiSave } from "react-icons/fi";
import { useAdminGamePost } from '@context/AdminGamePostContext';

const SOCIALS = [
  ["Official Website", "https://..."],
  ["Twitter / X", "https://twitter.com/..."],
  ["Instagram", "https://instagram.com/..."],
  ["Facebook", "https://facebook.com/..."],
  ["YouTube Channel", "https://youtube.com/..."],
  ["Discord Server", "https://discord.gg/..."],
  ["Reddit Community", "https://reddit.com/r/..."],
  ["Twitch Channel", "https://twitch.tv/..."],
];

export default function SocialCommunity() {
  const { gamePostData, updateArray, publishGamePost , saveDraft } = useAdminGamePost();
  const { join_our_community } = gamePostData;

  const updateSocial = (label, link) => {
    let exists = false;
    let newCommunity = join_our_community.map(j => {
      if (j.platform_name === label) {
        exists = true;
        return { ...j, platform_link: link };
      }
      return j;
    });

    if (!exists) {
      newCommunity.push({ platform_name: label, platform_link: link });
    }

    // clean up empty links but keep the main ones
    newCommunity = newCommunity.filter(j => j.platform_name && (j.platform_link || SOCIALS.find(s => s[0] === j.platform_name)));

    updateArray('join_our_community', newCommunity);
  };

  const getLink = (label) => {
    const found = join_our_community.find(j => j.platform_name === label);
    return found ? found.platform_link || "" : "";
  };

  return (
    <div>
      <h1 className="admin-page-title">Social & Community</h1>

      <div className="admin-card">
        <div className="admin-section-title">Official Social Links</div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {SOCIALS.map(([label, ph]) => (
            <div key={label} className="admin-field">
              <label className="admin-label">{label}</label>
              <input className="admin-input" placeholder={ph} value={getLink(label)} onChange={e => updateSocial(label, e.target.value)} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 justify-end mt-6">
        <button className="admin-btn-secondary" onClick={saveDraft}>Save as Draft</button>
        <button className="admin-btn-primary" onClick={publishGamePost}><FiSave size={13} /> Finish & Save</button>
      </div>
    </div>
  );
}
