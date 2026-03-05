import { useState } from "react";
import { FiPlus, FiTrash2, FiSave } from "react-icons/fi";

export default function MoreGames() {
  const [games, setGames] = useState([{ slug: "", title: "" }]);
  const add = () => setGames(g => [...g, { slug: "", title: "" }]);
  const remove = i => setGames(g => g.filter((_, idx) => idx !== i));
  const update = (i, field, val) =>
    setGames(g => g.map((x, idx) => idx === i ? { ...x, [field]: val } : x));

  return (
    <div>
      <h1 className="admin-page-title">More Like This</h1>

      <div className="admin-card">
        <div className="admin-section-title">Related Games</div>
        <p className="text-sm text-[var(--theme-text-muted)] mb-5">
          Add game slugs and titles to display in the "More Like This" section on the public game post page.
        </p>

        {games.map((g, i) => (
          <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-3 items-end mb-3">
            <div className="admin-field">
              <label className="admin-label">Game Title</label>
              <input className="admin-input" placeholder="e.g. Apex Legends" value={g.title} onChange={e => update(i, "title", e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-label">Game Slug (URL key)</label>
              <input className="admin-input font-mono" placeholder="apex-legends" value={g.slug} onChange={e => update(i, "slug", e.target.value)} />
            </div>
            <button className="admin-action-btn delete" onClick={() => remove(i)}><FiTrash2 size={13} /></button>
          </div>
        ))}

        <button className="admin-btn-outline-accent mt-3" onClick={add}>
          <FiPlus size={12} /> Add Game
        </button>
      </div>

      <div className="flex gap-3 justify-end">
        <button className="admin-btn-secondary">Save as Draft</button>
        <button className="admin-btn-primary"><FiSave size={13} /> Save & Continue</button>
      </div>
    </div>
  );
}
