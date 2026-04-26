import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FiBell,
  FiChevronDown,
  FiLogOut,
  FiMenu,
  FiMessageSquare,
  FiSettings,
  FiShield,
  FiUser,
  FiX,
} from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/app/providers/AuthProvider";
import { DARK_HERO_THEMES, useTheme } from "@/app/providers/ThemeProvider";
import GzsLogo from "./GzsLogo";

const NAV_ITEMS = [
  { path: "/", label: "Home" },
  { path: "/games", label: "Games" },
  { path: "/blog", label: "Blogs" },
  { path: "/tournaments", label: "Tournaments" },
  { path: "/profile", label: "Profile" },
  { path: "/community", label: "Community" },
  { path: "/admin", label: "Admin", icon: FiShield },
];

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { currentTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDarkHero = DARK_HERO_THEMES.includes(currentTheme);
  const navbarState = scrolled
    ? "is-scrolled"
    : isAuthenticated
      ? "is-auth"
      : isDarkHero
        ? "is-transparent-dark"
        : "is-transparent-light";

  const logoVariant = isDarkHero && !scrolled && !isAuthenticated ? "light" : "primary";

  const go = (path) => {
    navigate(path);
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setProfileOpen(false);
  };

  return (
    <>
      <nav className={`gzs-navbar ${navbarState}`}>
        <div className="gzs-navbar__inner">
          <button
            type="button"
            onClick={() => go(isAuthenticated ? "/community" : "/")}
            className="gzs-navbar__brand"
            aria-label="Go to home"
          >
            <GzsLogo variant={logoVariant} size={32} showText />
          </button>

          <div className="gzs-navbar__links hidden lg:flex">
            {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                className={({ isActive }) => `gzs-nav-link ${isActive ? "active" : ""}`}
              >
                {Icon ? <Icon size={14} /> : null}
                <span>{label}</span>
              </NavLink>
            ))}
          </div>

          <div className="gzs-navbar__actions">
            {!isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-3">
                <button type="button" onClick={() => go("/signup")} className="gzs-nav-signup">
                  Sign Up
                </button>
                <button type="button" onClick={() => go("/login")} className="gzs-nav-login">
                  Login
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <button type="button" onClick={() => go("/messages")} className="gzs-nav-icon" aria-label="Messages">
                  <FiMessageSquare size={16} />
                </button>
                <button type="button" onClick={() => go("/notifications")} className="gzs-nav-icon" aria-label="Notifications">
                  <FiBell size={16} />
                </button>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setProfileOpen((open) => !open)}
                    className="gzs-nav-profile-toggle"
                    aria-expanded={profileOpen}
                    aria-haspopup="menu"
                  >
                    <span className="gzs-nav-avatar">
                      {user?.username?.[0]?.toUpperCase() ?? "U"}
                    </span>
                    <span className="hidden xl:block max-w-[9rem] truncate text-sm font-semibold text-[var(--theme-text)]">
                      {user?.username ?? "User"}
                    </span>
                    <FiChevronDown size={14} className="text-[#64748B]" />
                  </button>

                  <AnimatePresence>
                    {profileOpen ? (
                      <>
                        <button
                          type="button"
                          className="fixed inset-0 z-[90]"
                          onClick={() => setProfileOpen(false)}
                          aria-label="Close profile menu"
                        />
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.98 }}
                          transition={{ duration: 0.14 }}
                          className="gzs-nav-dropdown right-0 top-[calc(100%+10px)] left-auto w-[17rem]"
                          role="menu"
                        >
                          <div className="px-4 py-3 border-b border-[#E2E8F0]">
                            <p className="text-sm font-bold text-[#0F172A] truncate">{user?.username}</p>
                            <p className="text-xs text-[#64748B] truncate">{user?.email}</p>
                          </div>
                          <div className="p-1.5">
                            <button type="button" onClick={() => go("/profile")} className="gzs-nav-dropdown-item w-full">
                              <FiUser size={14} /> My Profile
                            </button>
                            <button type="button" onClick={() => go("/settings")} className="gzs-nav-dropdown-item w-full">
                              <FiSettings size={14} /> Settings
                            </button>
                            <button type="button" onClick={() => go("/admin")} className="gzs-nav-dropdown-item w-full text-amber-600">
                              <FiShield size={14} /> Admin Panel
                            </button>
                            <div className="my-1 h-px bg-[#E2E8F0]" />
                            <button type="button" onClick={handleLogout} className="gzs-nav-dropdown-item w-full text-red-500">
                              <FiLogOut size={14} /> Sign Out
                            </button>
                          </div>
                        </motion.div>
                      </>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="gzs-nav-mobile-toggle lg:hidden"
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <button
              type="button"
              className="fixed inset-0 z-[98] bg-black/20 lg:hidden"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation"
            />
            <motion.aside
              initial={{ opacity: 0, x: 320 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 320 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed right-0 top-[72px] bottom-0 z-[99] w-[18rem] overflow-y-auto border-l border-[#E2E8F0] bg-white shadow-2xl lg:hidden"
            >
              <div className="p-4">
                <div className="mb-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#64748B]">Navigation</p>
                  <p className="mt-1 text-sm text-[#334155]">Browse the main site sections</p>
                </div>

                <div className="space-y-1">
                  {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
                    <button
                      key={path}
                      type="button"
                      onClick={() => go(path)}
                      className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left font-medium text-[#334155] transition-colors hover:bg-[#F8FAFC]"
                    >
                      {Icon ? <Icon size={15} /> : <span className="h-[15px] w-[15px]" />}
                      <span>{label}</span>
                    </button>
                  ))}
                </div>

                <div className="my-4 h-px bg-[#E2E8F0]" />

                {!isAuthenticated ? (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => go("/signup")}
                      className="gzs-nav-signup w-full justify-center"
                    >
                      Sign Up
                    </button>
                    <button
                      type="button"
                      onClick={() => go("/login")}
                      className="gzs-nav-login w-full justify-center"
                    >
                      Login
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <button type="button" onClick={() => go("/profile")} className="gzs-nav-dropdown-item w-full">
                      <FiUser size={14} /> My Profile
                    </button>
                    <button type="button" onClick={() => go("/messages")} className="gzs-nav-dropdown-item w-full">
                      <FiMessageSquare size={14} /> Messages
                    </button>
                    <button type="button" onClick={() => go("/notifications")} className="gzs-nav-dropdown-item w-full">
                      <FiBell size={14} /> Notifications
                    </button>
                    <button type="button" onClick={() => go("/settings")} className="gzs-nav-dropdown-item w-full">
                      <FiSettings size={14} /> Settings
                    </button>
                    <button type="button" onClick={handleLogout} className="gzs-nav-dropdown-item w-full text-red-500">
                      <FiLogOut size={14} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
