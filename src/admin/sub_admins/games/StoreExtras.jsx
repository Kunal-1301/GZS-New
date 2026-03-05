import { FiSave, FiPlus, FiTrash2 } from "react-icons/fi";
import { useAdminGamePost } from '@context/AdminGamePostContext';

const STORE_LABELS = [
  "Steam Link",
  "Epic Games Link",
  "PlayStation Store Link",
  "Xbox / Microsoft Store",
  "App Store (iOS) Link",
  "Google Play Link",
];

export default function StoreExtras() {
  const { gamePostData, updateArray , saveDraft } = useAdminGamePost();
  const { get_game, awards_and_achievements, dlcs } = gamePostData;

  // We can treat get_game as storing JSON array in first record or multiple records.
  // The context has `get_game: [{ affiliate_links: "" }]`
  // We will serialize store links array into the first get_game record.
  let linksObj = {};
  try {
    linksObj = get_game[0]?.affiliate_links ? JSON.parse(get_game[0].affiliate_links) : {};
  } catch (e) {
    linksObj = {};
  }

  const updateStoreLink = (label, url) => {
    const newLinks = { ...linksObj, [label]: url };
    updateArray('get_game', [{ affiliate_links: JSON.stringify(newLinks) }]);
  };

  const addAward = () => Object.isExtensible(awards_and_achievements) && updateArray('awards_and_achievements', [...awards_and_achievements, { aa_pt: "" }]);
  const removeAward = (i) => updateArray('awards_and_achievements', awards_and_achievements.filter((_, idx) => idx !== i));
  const updateAward = (i, val) => updateArray('awards_and_achievements', awards_and_achievements.map((x, idx) => idx === i ? { aa_pt: val } : x));

  const addDlc = () => Object.isExtensible(dlcs) && updateArray('dlcs', [...dlcs, { dlc_pt: "" }]);
  const removeDlc = (i) => updateArray('dlcs', dlcs.filter((_, idx) => idx !== i));
  const updateDlc = (i, val) => updateArray('dlcs', dlcs.map((x, idx) => idx === i ? { dlc_pt: val } : x));

  return (
    <div>
      <h1 className="admin-page-title">Store & Extras</h1>

      {/* Store Links */}
      <div className="admin-card">
        <div className="admin-section-title">Get Game / Affiliate Links</div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {STORE_LABELS.map(label => (
            <div key={label} className="admin-field">
              <label className="admin-label">{label}</label>
              <input className="admin-input" placeholder={"https://..."} value={linksObj[label] || ""} onChange={(e) => updateStoreLink(label, e.target.value)} />
            </div>
          ))}
        </div>
      </div>

      {/* DLCs */}
      <div className="admin-card">
        <div className="flex items-center justify-between mb-5">
          <span className="admin-section-title" style={{ margin: 0 }}>DLCs</span>
          <button className="admin-btn-outline-accent" onClick={addDlc}><FiPlus size={12} /> Add DLC</button>
        </div>
        {dlcs.map((d, i) => (
          <div key={i} className="flex gap-3 mb-2">
            <input className="admin-input flex-1" placeholder="DLC Name / Info" value={d.dlc_pt} onChange={e => updateDlc(i, e.target.value)} />
            <button className="admin-action-btn delete" onClick={() => removeDlc(i)}><FiTrash2 size={13} /></button>
          </div>
        ))}
      </div>

      {/* Awards */}
      <div className="admin-card">
        <div className="flex items-center justify-between mb-5">
          <span className="admin-section-title" style={{ margin: 0 }}>Awards & Achievements</span>
          <button className="admin-btn-outline-accent" onClick={addAward}><FiPlus size={12} /> Add Award</button>
        </div>
        {awards_and_achievements.map((a, i) => (
          <div key={i} className="flex gap-3 mb-2">
            <input className="admin-input flex-1" placeholder="Best Multiplayer Game — The Game Awards 2021" value={a.aa_pt} onChange={e => updateAward(i, e.target.value)} />
            <button className="admin-action-btn delete" onClick={() => removeAward(i)}><FiTrash2 size={13} /></button>
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
