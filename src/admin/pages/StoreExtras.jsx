import { FiSave } from "react-icons/fi";

export default function StoreExtras() {
  return (
    <div>
      <h1 className="admin-page-title">Store & Extras</h1>

      {/* Store Links */}
      <div className="admin-card">
        <div className="admin-section-title">Get Game / Affiliate Links</div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {[
            ["Steam Link", "https://store.steampowered.com/..."],
            ["Epic Games Link", "https://store.epicgames.com/..."],
            ["PlayStation Store Link", "https://store.playstation.com/..."],
            ["Xbox / Microsoft Store", "https://www.xbox.com/..."],
            ["App Store (iOS) Link", "https://apps.apple.com/..."],
            ["Google Play Link", "https://play.google.com/..."],
          ].map(([label, ph]) => (
            <div key={label} className="admin-field">
              <label className="admin-label">{label}</label>
              <input className="admin-input" placeholder={ph} />
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="admin-card">
        <div className="admin-section-title">Pricing</div>
        <div className="grid grid-cols-3 gap-4">
          <div className="admin-field">
            <label className="admin-label">Price Model</label>
            <select className="admin-select">
              <option>Free to Play</option>
              <option>Paid</option>
              <option>Freemium</option>
              <option>Subscription</option>
            </select>
          </div>
          <div className="admin-field">
            <label className="admin-label">Price (USD)</label>
            <input className="admin-input" type="number" placeholder="0.00" min="0" step="0.01" />
          </div>
          <div className="admin-field">
            <label className="admin-label">Discount %</label>
            <input className="admin-input" type="number" placeholder="0" min="0" max="100" />
          </div>
        </div>
      </div>

      {/* Awards */}
      <div className="admin-card">
        <div className="admin-section-title">Awards & Achievements</div>
        <div className="admin-field">
          <label className="admin-label">Award / Achievement (one per line)</label>
          <textarea
            className="admin-textarea"
            rows={5}
            placeholder={"Best Multiplayer Game — The Game Awards 2021\nBest Ongoing Game — BAFTA 2022\n..."}
          />
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <button className="admin-btn-secondary">Save as Draft</button>
        <button className="admin-btn-primary"><FiSave size={13} /> Save & Continue</button>
      </div>
    </div>
  );
}