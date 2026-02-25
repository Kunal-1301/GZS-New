import { FiPlus, FiTrash2, FiSave, FiUpload } from "react-icons/fi";
import { useAdminGamePost } from "../context/AdminGamePostContext";

export default function Media() {
  const { gamePostData, updateArray , saveDraft } = useAdminGamePost();
  const { carousel } = gamePostData;

  const addShot = () => updateArray('carousel', [...carousel, { yt_url_official: "", upload: "" }]);
  const removeShot = (i) => updateArray('carousel', carousel.filter((_, idx) => idx !== i));
  const updateShot = (i, field, val) => updateArray('carousel', carousel.map((x, idx) => idx === i ? { ...x, [field]: val } : x));

  // Ensure there's at least one item for the trailer
  if (carousel.length === 0) {
    updateArray('carousel', [{ yt_url_official: "", upload: "" }]);
  }

  return (
    <div>
      <h1 className="admin-page-title">Media</h1>

      {/* Trailer */}
      <div className="admin-card">
        <div className="admin-section-title">Trailer / Video</div>
        <div className="grid grid-cols-2 gap-4">
          <div className="admin-field">
            <label className="admin-label">YouTube Trailer URL</label>
            <input className="admin-input" placeholder="https://youtube.com/watch?v=..." value={carousel[0]?.yt_url_official || ""} onChange={(e) => updateShot(0, 'yt_url_official', e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Trailer Thumbnail URL (Mapped to Upload 1 for now)</label>
            <input className="admin-input" placeholder="https://..." value={carousel[0]?.upload || ""} onChange={(e) => updateShot(0, 'upload', e.target.value)} />
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

        {carousel.slice(1).map((c, idx) => {
          const i = idx + 1;
          return (
            <div key={i} className="flex gap-2 items-center mb-2.5">
              <input
                className="admin-input"
                placeholder={`Screenshot URL...`}
                value={c.upload || ""}
                onChange={(e) => updateShot(i, 'upload', e.target.value)}
              />
              <button className="admin-action-btn delete" onClick={() => removeShot(i)}>
                <FiTrash2 size={13} />
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3 justify-end mt-4">
        <button className="admin-btn-secondary" onClick={saveDraft}>Save as Draft</button>
        <button className="admin-btn-primary"><FiSave size={13} /> Save & Continue</button>
      </div>
    </div>
  );
}