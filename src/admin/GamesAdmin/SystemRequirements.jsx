import { FiSave } from "react-icons/fi";
import { useAdminGamePost } from "../context/AdminGamePostContext";

const FIELDS = [
  { key: "os", label: "Operating System" },
  { key: "processor", label: "Processor / CPU" },
  { key: "memory", label: "RAM / Memory" },
  { key: "graphics", label: "GPU / Graphics" },
  { key: "storage", label: "Storage" },
  { key: "directx", label: "DirectX Version" },
];

export default function SystemRequirements() {
  const { gamePostData, updateSection , saveDraft } = useAdminGamePost();
  const { system_requirement } = gamePostData;

  const handleChange = (field, type, val) => {
    updateSection('system_requirement', { [`${field}_${type}`]: val });
  };

  return (
    <div>
      <h1 className="admin-page-title">System Requirements</h1>

      <div className="admin-card">
        <div className="admin-section-title">PC Requirements</div>

        {/* Column headers */}
        <div className="grid grid-cols-[160px_1fr_1fr] gap-3 mb-3">
          <div />
          <div className="text-center text-[11px] font-bold uppercase tracking-[0.1em]
                          text-white bg-admin-accent py-2 px-3.5 rounded-[4px]">
            MINIMUM
          </div>
          <div className="text-center text-[11px] font-bold uppercase tracking-[0.1em]
                          text-white bg-admin-accent-dark py-2 px-3.5 rounded-[4px]">
            RECOMMENDED
          </div>
        </div>

        {FIELDS.map(f => (
          <div key={f.key} className="grid grid-cols-[160px_1fr_1fr] gap-3 items-center mb-2.5">
            <label className="admin-label m-0">{f.label}</label>
            <input className="admin-input" placeholder={`Min ${f.label}`} value={system_requirement[`${f.key}_min`] || ''} onChange={(e) => handleChange(f.key, 'min', e.target.value)} />
            <input className="admin-input" placeholder={`Rec ${f.label}`} value={system_requirement[`${f.key}_rec`] || ''} onChange={(e) => handleChange(f.key, 'rec', e.target.value)} />
          </div>
        ))}
      </div>

      <div className="flex gap-3 justify-end mt-4">
        <button className="admin-btn-secondary" onClick={saveDraft}>Save as Draft</button>
        <button className="admin-btn-primary"><FiSave size={13} /> Save & Continue</button>
      </div>
    </div>
  );
}