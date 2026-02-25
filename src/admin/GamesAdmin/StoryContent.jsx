import { FiSave } from "react-icons/fi";
import { useAdminGamePost } from "../context/AdminGamePostContext";

export default function StoryContent() {
  const { gamePostData, updateSection , saveDraft } = useAdminGamePost();
  const { storyline } = gamePostData;

  const handleStoryChange = (val) => updateSection('storyline', { paragraphs: val });

  return (
    <div>
      <h1 className="admin-page-title">Story & Content</h1>

      {/* Storyline */}
      <div className="admin-card">
        <div className="admin-section-title">Storyline / Description</div>
        <div className="admin-field mb-4">
          <label className="admin-label">Main Storyline Text *</label>
          <textarea className="admin-textarea" rows={6} placeholder="Write the game's storyline or description here..." value={storyline.paragraphs} onChange={(e) => handleStoryChange(e.target.value)} />
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <button className="admin-btn-secondary" onClick={saveDraft}>Save as Draft</button>
        <button className="admin-btn-primary"><FiSave size={13} /> Save & Continue</button>
      </div>
    </div>
  );
}