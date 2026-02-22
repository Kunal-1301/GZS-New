import { useState } from "react";
import { FiPlus, FiTrash2, FiSave } from "react-icons/fi";

export default function StoryContent() {
  const [chars, setChars] = useState([{ name: "", role: "", imageUrl: "" }]);

  const addChar = () => setChars(c => [...c, { name: "", role: "", imageUrl: "" }]);
  const removeChar = i => setChars(c => c.filter((_, idx) => idx !== i));
  const update = (i, field, value) =>
    setChars(c => c.map((x, idx) => idx === i ? { ...x, [field]: value } : x));

  return (
    <div>
      <h1 className="admin-page-title">Story & Content</h1>

      {/* Storyline */}
      <div className="admin-card">
        <div className="admin-section-title">Storyline / Description</div>
        <div className="admin-field mb-4">
          <label className="admin-label">Main Storyline Text *</label>
          <textarea className="admin-textarea" rows={6} placeholder="Write the game's storyline or description here..." />
        </div>
        <div className="admin-field">
          <label className="admin-label">Extended Story / Lore (optional)</label>
          <textarea className="admin-textarea" rows={4} placeholder="Additional lore, world-building, or background..." />
        </div>
      </div>

      {/* Characters */}
      <div className="admin-card">
        <div className="flex items-center justify-between mb-5">
          <span className="admin-section-title" style={{ margin: 0 }}>Characters / Agents</span>
          <button className="admin-btn-outline-accent" onClick={addChar}>
            <FiPlus size={12} /> Add Character
          </button>
        </div>

        {chars.map((ch, i) => (
          <div
            key={i}
            className="grid grid-cols-[1fr_1fr_2fr_auto] gap-3 items-end mb-3 p-4
                       bg-admin-surface rounded-md border border-admin-border"
          >
            <div className="admin-field">
              <label className="admin-label">Name</label>
              <input className="admin-input" placeholder="e.g. Jett" value={ch.name} onChange={e => update(i, "name", e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-label">Role</label>
              <input className="admin-input" placeholder="e.g. Duelist" value={ch.role} onChange={e => update(i, "role", e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-label">Character Image URL</label>
              <input className="admin-input" placeholder="https://..." value={ch.imageUrl} onChange={e => update(i, "imageUrl", e.target.value)} />
            </div>
            <button className="admin-action-btn delete mb-0.5" onClick={() => removeChar(i)}>
              <FiTrash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-3 justify-end">
        <button className="admin-btn-secondary">Save as Draft</button>
        <button className="admin-btn-primary"><FiSave size={13} /> Save & Continue</button>
      </div>
    </div>
  );
}