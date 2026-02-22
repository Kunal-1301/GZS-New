import { useState } from "react";
import { FiPlus, FiTrash2, FiSave } from "react-icons/fi";

export default function QuickOverview() {
  const [controls, setControls] = useState([
    { title: "Movement", desc: "Use W,A,S,D to move" },
    { title: "Combat", desc: "Left click to fire" },
  ]);
  const add = () => setControls(c => [...c, { title: "", desc: "" }]);
  const remove = i => setControls(c => c.filter((_, idx) => idx !== i));
  const update = (i, field, val) =>
    setControls(c => c.map((x, idx) => idx === i ? { ...x, [field]: val } : x));

  return (
    <div>
      <h1 className="admin-page-title">Quick Control Overview</h1>

      {/* Gameplay Descriptions */}
      <div className="admin-card">
        <div className="admin-section-title">Gameplay Descriptions</div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {[0, 1].map(i => (
            <div key={i} className="bg-admin-surface rounded-md border border-admin-border p-4">
              <div className="admin-field mb-2">
                <label className="admin-label">Gameplay Title {i + 1}</label>
                <input className="admin-input" placeholder="e.g. PRECISION GUNPLAY" />
              </div>
              <div className="admin-field mb-2">
                <label className="admin-label">Short Description</label>
                <input className="admin-input" placeholder="One-liner describing this feature" />
              </div>
              <div className="admin-field">
                <label className="admin-label">Detailed Paragraph (optional)</label>
                <textarea className="admin-textarea" rows={3} placeholder="Longer explanation..." />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Controls */}
      <div className="admin-card">
        <div className="flex items-center justify-between mb-5">
          <span className="admin-section-title" style={{ margin: 0 }}>Quick Controls List</span>
          <button className="admin-btn-outline-accent" onClick={add}><FiPlus size={12} /> Add Control</button>
        </div>
        {controls.map((c, i) => (
          <div key={i} className="grid grid-cols-[1fr_2fr_auto] gap-3 items-end mb-3">
            <div className="admin-field">
              <label className="admin-label">Control Name</label>
              <input className="admin-input" value={c.title} placeholder="e.g. JUMP" onChange={e => update(i, "title", e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-label">Description</label>
              <input className="admin-input" value={c.desc} placeholder="e.g. Press Spacebar to jump" onChange={e => update(i, "desc", e.target.value)} />
            </div>
            <button className="admin-action-btn delete" onClick={() => remove(i)}><FiTrash2 size={13} /></button>
          </div>
        ))}
      </div>

      {/* Game Modes */}
      <div className="admin-card">
        <div className="admin-section-title">Game Modes</div>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map(i => (
            <div className="admin-field" key={i}>
              <label className="admin-label">Mode {i} Title</label>
              <input className="admin-input" placeholder="e.g. COMPETITIVE" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <button className="admin-btn-secondary">Save as Draft</button>
        <button className="admin-btn-primary"><FiSave size={13} /> Save & Continue</button>
      </div>
    </div>
  );
}