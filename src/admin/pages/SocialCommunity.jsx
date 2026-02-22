import { FiSave } from "react-icons/fi";

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
  return (
    <div>
      <h1 className="admin-page-title">Social & Community</h1>

      <div className="admin-card">
        <div className="admin-section-title">Official Social Links</div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {SOCIALS.map(([label, ph]) => (
            <div key={label} className="admin-field">
              <label className="admin-label">{label}</label>
              <input className="admin-input" placeholder={ph} />
            </div>
          ))}
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-section-title">Community Hub Settings</div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="admin-field">
            <label className="admin-label">Community Hub Title</label>
            <input className="admin-input" placeholder="e.g. VALORANT Community Hub" />
          </div>
          <div className="admin-field">
            <label className="admin-label">Join CTA Label</label>
            <input className="admin-input" placeholder="e.g. Join Our Community" />
          </div>
          <div className="admin-field col-span-2">
            <label className="admin-label">Community Description</label>
            <textarea className="admin-textarea" rows={3} placeholder="Short description about the community..." />
          </div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-section-title">Review Submission</div>
        <div className="grid grid-cols-2 gap-4">
          <div className="admin-field">
            <label className="admin-label">Allow User Reviews</label>
            <select className="admin-select">
              <option>Yes — Open to all</option>
              <option>Yes — Registered users only</option>
              <option>No — Closed</option>
            </select>
          </div>
          <div className="admin-field">
            <label className="admin-label">Moderation Mode</label>
            <select className="admin-select">
              <option>Auto-publish</option>
              <option>Manual review required</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <button className="admin-btn-secondary">Save as Draft</button>
        <button className="admin-btn-primary"><FiSave size={13} /> Finish & Save</button>
      </div>
    </div>
  );
}