import { FiSave } from "react-icons/fi";

const FIELDS = [
  { key: "os", label: "Operating System" },
  { key: "processor", label: "Processor / CPU" },
  { key: "memory", label: "RAM / Memory" },
  { key: "graphics", label: "GPU / Graphics" },
  { key: "storage", label: "Storage" },
  { key: "directx", label: "DirectX Version" },
];

export default function SystemRequirements() {
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
            <input className="admin-input" placeholder={`Min ${f.label}`} />
            <input className="admin-input" placeholder={`Rec ${f.label}`} />
          </div>
        ))}
      </div>

      <div className="admin-card">
        <div className="admin-section-title">Console / Mobile Notes (optional)</div>
        <div className="admin-field">
          <label className="admin-label">Platform Compatibility Notes</label>
          <textarea className="admin-textarea" rows={3} placeholder="e.g. Available on iOS 14+ and Android 10+. Requires 2GB RAM." />
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <button className="admin-btn-secondary">Save as Draft</button>
        <button className="admin-btn-primary"><FiSave size={13} /> Save & Continue</button>
      </div>
    </div>
  );
}