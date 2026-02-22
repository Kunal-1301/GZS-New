import { useState } from "react";
import { FiPlus, FiTrash2, FiSave, FiUpload } from "react-icons/fi";

export default function Media() {
  const [shots, setShots] = useState([""]);
  const addShot = () => setShots(s => [...s, ""]);
  const removeShot = i => setShots(s => s.filter((_, idx) => idx !== i));
  const updateShot = (i, v) => setShots(s => s.map((x, idx) => idx === i ? v : x));

  return (
    <div>
      <h1 className="admin-page-title">Media</h1>

      {/* Trailer */}
      <div className="admin-card">
        <div className="admin-section-title">Trailer / Video</div>
        <div className="grid grid-cols-2 gap-4">
          <div className="admin-field">
            <label className="admin-label">YouTube Trailer URL</label>
            <input className="admin-input" placeholder="https://youtube.com/watch?v=..." />
          </div>
          <div className="admin-field">
            <label className="admin-label">Trailer Thumbnail URL</label>
            <input className="admin-input" placeholder="https://..." />
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="admin-card">
        <div className="admin-section-title">Game Gallery Upload</div>
        <div className="admin-upload-zone mb-6">
          <FiUpload size={28} className="text-admin-text-muted mx-auto mb-2.5" />
          <div className="admin-upload-zone-text">
            <strong>Click to upload multiple images</strong>
          </div>
          <p className="text-[11px] text-admin-text-disabled mt-1">PNG, JPG, WEBP — Up to 20MB each</p>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="admin-section-title" style={{ margin: 0 }}>Screenshot URLs</span>
          <button className="admin-btn-outline-accent" onClick={addShot}><FiPlus size={12} /> Add URL</button>
        </div>

        {shots.map((url, i) => (
          <div key={i} className="flex gap-2 items-center mb-2.5">
            <input
              className="admin-input"
              placeholder={`Screenshot ${i + 1} URL...`}
              value={url}
              onChange={e => updateShot(i, e.target.value)}
            />
            <button className="admin-action-btn delete" onClick={() => removeShot(i)}>
              <FiTrash2 size={13} />
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