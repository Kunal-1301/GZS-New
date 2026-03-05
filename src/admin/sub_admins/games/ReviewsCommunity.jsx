import { useState } from "react";
import { FiPlus, FiTrash2, FiSave } from "react-icons/fi";

export default function ReviewsCommunity() {
  const [reviews, setReviews] = useState([{ site: "", quote: "", rating: "", max: "10" }]);
  const add = () => setReviews(r => [...r, { site: "", quote: "", rating: "", max: "10" }]);
  const remove = i => setReviews(r => r.filter((_, idx) => idx !== i));
  const update = (i, field, val) =>
    setReviews(r => r.map((x, idx) => idx === i ? { ...x, [field]: val } : x));

  return (
    <div>
      <h1 className="admin-page-title">Reviews & Community</h1>

      <div className="admin-card">
        <div className="flex items-center justify-between mb-5">
          <span className="admin-section-title" style={{ margin: 0 }}>Expert / Critic Reviews</span>
          <button className="admin-btn-outline-accent" onClick={add}><FiPlus size={12} /> Add Review</button>
        </div>

        {reviews.map((rev, i) => (
          <div key={i}
            className="grid grid-cols-[1fr_2fr_80px_80px_auto] gap-3 items-end mb-3
                       p-4 bg-[var(--theme-bg-alt)] rounded-md border border-[var(--theme-border)]">
            <div className="admin-field">
              <label className="admin-label">Site Name</label>
              <input className="admin-input" placeholder="IGN, Gamespot..." value={rev.site} onChange={e => update(i, "site", e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-label">Quote / Snippet</label>
              <input className="admin-input" placeholder="Brief quote..." value={rev.quote} onChange={e => update(i, "quote", e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-label">Rating</label>
              <input className="admin-input" type="number" placeholder="9" min="0" value={rev.rating} onChange={e => update(i, "rating", e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-label">Max</label>
              <input className="admin-input" type="number" placeholder="10" value={rev.max} onChange={e => update(i, "max", e.target.value)} />
            </div>
            <button className="admin-action-btn delete" onClick={() => remove(i)}><FiTrash2 size={13} /></button>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <div className="admin-section-title">Critic / Community Rating</div>
        <div className="grid grid-cols-3 gap-4">
          <div className="admin-field">
            <label className="admin-label">Metacritic Score</label>
            <input className="admin-input" type="number" placeholder="85" min="0" max="100" />
          </div>
          <div className="admin-field">
            <label className="admin-label">User Score</label>
            <input className="admin-input" type="number" placeholder="7.5" min="0" max="10" step="0.1" />
          </div>
          <div className="admin-field">
            <label className="admin-label">Overall Rating Label</label>
            <input className="admin-input" placeholder="Overwhelmingly Positive" />
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <button className="admin-btn-secondary">Save as Draft</button>
        <button className="admin-btn-primary"><FiSave size={13} /> Save & Continue</button>
      </div>
    </div>
  );
}
