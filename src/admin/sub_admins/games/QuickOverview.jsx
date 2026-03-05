import { FiSave, FiPlus, FiTrash2 } from "react-icons/fi";
import { useAdminGamePost } from '@context/AdminGamePostContext';

export default function QuickOverview() {
  const { gamePostData, updateSection, updateArray , saveDraft } = useAdminGamePost();
  const { gameplay, quick_control_overview, modes } = gamePostData;

  const handleGameplayChange = (field, val) => updateSection('gameplay', { [field]: val });

  // Interpret quick_control_overview qco_title as JSON for multiple controls
  let controls = [];
  try {
    controls = quick_control_overview.qco_title ? JSON.parse(quick_control_overview.qco_title) : [{ title: "", desc: "" }];
  } catch (e) {
    controls = [{ title: "", desc: "" }];
  }

  const updateControls = (newControls) => {
    updateSection('quick_control_overview', { qco_title: JSON.stringify(newControls) });
  };

  const addControl = () => updateControls([...controls, { title: "", desc: "" }]);
  const removeControl = (i) => updateControls(controls.filter((_, idx) => idx !== i));
  const updateControlFieldValue = (i, field, val) => {
    updateControls(controls.map((x, idx) => idx === i ? { ...x, [field]: val } : x));
  };

  const addMode = () => updateArray('modes', [...modes, { mode_title: "", mode_titledesc: "" }]);
  const removeMode = (i) => updateArray('modes', modes.filter((_, idx) => idx !== i));
  const updateModeField = (i, field, val) => {
    updateArray('modes', modes.map((x, idx) => idx === i ? { ...x, [field]: val } : x));
  };

  return (
    <div>
      <h1 className="admin-page-title">Quick Control Overview</h1>

      {/* Gameplay Descriptions */}
      <div className="admin-card">
        <div className="admin-section-title">Gameplay Descriptions</div>
        <div className="admin-surface-card">
          <div className="admin-field mb-2">
            <label className="admin-label">Gameplay Title</label>
            <input className="admin-input" placeholder="e.g. PRECISION GUNPLAY" value={gameplay.gameplay_title} onChange={e => handleGameplayChange('gameplay_title', e.target.value)} />
          </div>
          <div className="admin-field mb-2">
            <label className="admin-label">Short Description</label>
            <input className="admin-input" placeholder="One-liner describing this feature" value={gameplay.gameplay_title_desc} onChange={e => handleGameplayChange('gameplay_title_desc', e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Detailed Paragraph (optional)</label>
            <textarea className="admin-textarea" rows={3} placeholder="Longer explanation..." value={gameplay.paragraph} onChange={e => handleGameplayChange('paragraph', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Quick Controls */}
      <div className="admin-card">
        <div className="flex items-center justify-between mb-5">
          <span className="admin-section-title" style={{ margin: 0 }}>Quick Controls List</span>
          <button className="admin-btn-outline-accent" onClick={addControl}><FiPlus size={12} /> Add Control</button>
        </div>
        {controls.map((c, i) => (
          <div key={i} className="grid grid-cols-[1fr_2fr_auto] gap-3 items-end mb-3">
            <div className="admin-field">
              <label className="admin-label">Control Name</label>
              <input className="admin-input" value={c.title} placeholder="e.g. JUMP" onChange={e => updateControlFieldValue(i, "title", e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-label">Description</label>
              <input className="admin-input" value={c.desc} placeholder="e.g. Press Spacebar to jump" onChange={e => updateControlFieldValue(i, "desc", e.target.value)} />
            </div>
            <button className="admin-action-btn delete" onClick={() => removeControl(i)}><FiTrash2 size={13} /></button>
          </div>
        ))}
      </div>

      {/* Game Modes */}
      <div className="admin-card">
        <div className="flex items-center justify-between mb-5">
          <span className="admin-section-title" style={{ margin: 0 }}>Game Modes</span>
          <button className="admin-btn-outline-accent" onClick={addMode}><FiPlus size={12} /> Add Mode</button>
        </div>
        {modes.map((m, i) => (
          <div key={i} className="grid grid-cols-[1fr_2fr_auto] gap-3 mb-3 items-end">
            <div className="admin-field">
              <label className="admin-label">Mode Title {i + 1}</label>
              <input className="admin-input" placeholder="e.g. COMPETITIVE" value={m.mode_title} onChange={e => updateModeField(i, 'mode_title', e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-label">Mode Description</label>
              <input className="admin-input" placeholder="Description..." value={m.mode_titledesc} onChange={e => updateModeField(i, 'mode_titledesc', e.target.value)} />
            </div>
            <button className="admin-action-btn delete" onClick={() => removeMode(i)}><FiTrash2 size={13} /></button>
          </div>
        ))}
      </div>

      <div className="flex gap-3 justify-end">
        <button className="admin-btn-secondary" onClick={saveDraft}>Save as Draft</button>
        <button className="admin-btn-primary"><FiSave size={13} /> Save & Continue</button>
      </div>
    </div>
  );
}
