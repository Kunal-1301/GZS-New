import { useState } from "react";
import { FiUpload, FiSave } from "react-icons/fi";

const COLOR_PRESETS = [
  { label: "Red", value: "#e53935" },
  { label: "Blue", value: "#1565c0" },
  { label: "Green", value: "#2e7d32" },
  { label: "Purple", value: "#6a1b9a" },
  { label: "Teal", value: "#00695c" },
  { label: "Orange", value: "#e65100" },
];

export default function BasicInfo() {
  const [themeColor, setThemeColor] = useState("#e53935");
  const [customColor, setCustomColor] = useState("#e53935");

  return (
    <div>
      <h1 className="admin-page-title">Basic Game Info</h1>

      {/* Hero Section */}
      <div className="admin-card">
        <div className="admin-section-title">Hero Section</div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="admin-field">
            <label className="admin-label">Game Title *</label>
            <input className="admin-input" placeholder="e.g. VALORANT" />
          </div>
          <div className="admin-field">
            <label className="admin-label">Short Description *</label>
            <input className="admin-input" placeholder="One-line description for hero section" />
          </div>
        </div>

        <div className="admin-field mb-4">
          <label className="admin-label">Hero Background Image</label>
          <div className="admin-upload-zone">
            <FiUpload size={24} className="text-admin-text-muted mx-auto mb-2" />
            <div className="admin-upload-zone-text">
              <strong>Click to upload</strong> or drag and drop hero image
            </div>
            <p className="text-[11px] text-admin-text-disabled mt-1">
              PNG, JPG, WEBP up to 10MB — Recommended: 1920×1080
            </p>
          </div>
        </div>

        <div className="admin-field mb-4">
          <label className="admin-label">— or — Hero Image URL</label>
          <input className="admin-input" placeholder="https://..." />
        </div>

        <hr className="admin-divider" />

        {/* Theme Color Picker */}
        <div className="admin-section-title">Game Post Color Theme</div>
        <p className="text-sm text-admin-text-muted mb-4">
          Sets the accent color used throughout the public game post page.
        </p>

        <div className="flex flex-wrap gap-2.5 mb-4">
          {COLOR_PRESETS.map(c => (
            <button
              key={c.value}
              onClick={() => setThemeColor(c.value)}
              className={`
                inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] cursor-pointer
                text-[11px] font-semibold bg-admin-card transition
                ${themeColor === c.value
                  ? "border-2 border-admin-text"
                  : "border border-admin-border"
                }
              `}
            >
              <span
                className="w-4 h-4 rounded-[3px] border border-black/10 inline-block flex-shrink-0"
                style={{ backgroundColor: c.value }}
              />
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex items-end gap-4">
          <div className="admin-field flex-1">
            <label className="admin-label">Custom Hex Color</label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={customColor}
                onChange={e => { setCustomColor(e.target.value); setThemeColor(e.target.value); }}
                className="w-10 h-10 border border-admin-border rounded-[4px] cursor-pointer p-0.5"
              />
              <input
                className="admin-input font-mono"
                value={themeColor}
                onChange={e => { setThemeColor(e.target.value); setCustomColor(e.target.value); }}
                placeholder="#e53935"
              />
            </div>
          </div>
          <div>
            <label className="admin-label">Preview</label>
            <div
              className="w-24 h-10 rounded-[4px] border border-admin-border"
              style={{ backgroundColor: themeColor }}
            />
          </div>
        </div>
      </div>

      {/* Sidebar Game Info */}
      <div className="admin-card">
        <div className="admin-section-title">Sidebar Game Info</div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="admin-field">
            <label className="admin-label">Developer *</label>
            <input className="admin-input" placeholder="e.g. Riot Games" />
          </div>
          <div className="admin-field">
            <label className="admin-label">Publisher</label>
            <input className="admin-input" placeholder="e.g. Riot Games" />
          </div>
          <div className="admin-field">
            <label className="admin-label">Release Date</label>
            <input className="admin-input" type="date" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="admin-field">
            <label className="admin-label">Genres (comma separated)</label>
            <input className="admin-input" placeholder="Tactical, Shooter, Multiplayer" />
          </div>
          <div className="admin-field">
            <label className="admin-label">Platforms</label>
            <input className="admin-input" placeholder="PC, Xbox, PlayStation, Mobile" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="admin-field">
            <label className="admin-label">Game Slug (URL key) *</label>
            <input className="admin-input font-mono" placeholder="valorant" />
          </div>
          <div className="admin-field">
            <label className="admin-label">Status</label>
            <select className="admin-select">
              <option>Draft</option>
              <option>In Review</option>
              <option>Published</option>
            </select>
          </div>
        </div>

        <div className="admin-field mb-4">
          <label className="admin-label">Game Cover / Profile Photo</label>
          <div className="admin-upload-zone py-6">
            <FiUpload size={20} className="text-admin-text-muted mx-auto mb-2" />
            <div className="admin-upload-zone-text">
              <strong>Click to upload</strong> game cover image — Recommended: 300×400
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end mt-6">
          <button className="admin-btn-secondary">Save as Draft</button>
          <button className="admin-btn-primary"><FiSave size={13} /> Save & Continue</button>
        </div>
      </div>
    </div>
  );
}