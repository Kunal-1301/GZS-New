import { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiBell, FiPlus } from "react-icons/fi";

const Navbar = () => {
  const [q, setQ] = useState("");
  return (
    <header className="admin-navbar">
      {/* Left */}
      <div className="flex items-center gap-5 flex-shrink-0">
        <Link to="/content-admin" className="admin-navbar-logo no-underline">GZONSPHERE</Link>
        <span className="admin-navbar-title">Game Post Admin</span>
      </div>

      {/* Center: Search */}
      <div className="admin-navbar-search">
        <FiSearch className="admin-navbar-search-icon" size={14} />
        <input
          type="text"
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search game posts, sections..."
        />
      </div>

      {/* Right */}
      <div className="admin-navbar-actions">
        <Link
          to="/content-admin"
          className="admin-btn-secondary text-[11px] px-3.5 py-2 no-underline"
        >
          ← Dashboard
        </Link>
        <button className="admin-create-btn">
          <FiPlus size={13} /> Publish
        </button>
        <button className="admin-icon-btn" aria-label="Notifications">
          <FiBell size={17} />
        </button>
        <div className="admin-avatar" />
      </div>
    </header>
  );
};

export default Navbar;