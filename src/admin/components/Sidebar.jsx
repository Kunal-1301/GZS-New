import { NavLink } from "react-router-dom";

const LINKS = [
  { label: "Basic Game Info", to: "/admin", end: true },
  { label: "Story & Content", to: "/admin/story" },
  { label: "Media", to: "/admin/media" },
  { label: "Quick Overview", to: "/admin/quick" },
  { label: "System Requirements", to: "/admin/system" },
  { label: "Store & Extras", to: "/admin/store" },
  { label: "Reviews & Community", to: "/admin/reviews" },
  { label: "More Games", to: "/admin/more" },
  { label: "Social & Community", to: "/admin/social" },
  { label: "Live Preview", to: "/admin/preview" },
];

const Sidebar = () => (
  <aside className="admin-sidebar">
    {LINKS.map(({ label, to, end }) => (
      <NavLink
        key={to}
        to={to}
        end={end}
        className={({ isActive }) => `admin-nav-link${isActive ? " active" : ""}`}
      >
        {label}
      </NavLink>
    ))}
  </aside>
);

export default Sidebar;