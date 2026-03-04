import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi';
import { FiArrowUpRight, FiUser, FiLogOut, FiGrid, FiPlusCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';
import { images } from '../data/images';

/**
 * Reusable Navbar Component - Fixed White Theme
 */
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Fixed Styling
  const loginButtonClass = 'bg-[#e53935] hover:bg-[#c62828] text-white';
  const navbarBgClass = 'bg-white shadow-sm';
  const textColorClass = 'text-neutral-900';
  const hoverColorClass = 'hover:text-[#e53935]';

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'GAMES', path: '/games' },
    { name: 'ESPORTS', path: '/esports' },
    { name: 'BLOG', path: '/blog' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const profileLinks = [
    { label: 'My Dashboard', path: '/profile/skill-dashboard', icon: FiGrid },
    { label: 'Add Skills', path: '/profile/skill-add', icon: FiPlusCircle },
    { label: 'Verify Skills', path: '/profile/skill-verify', icon: FiCheckCircle },
    { label: 'Profile Setup', path: '/profile/overview', icon: FiUser },
    { label: 'How It Works', path: '/profile/how-it-works', icon: FiInfo },
    { label: 'Choose Profile', path: '/profile/choose-subprofile', icon: FiGrid },
  ];

  return (
    <nav className={`w-full flex items-center justify-between px-8 lg:px-16 py-4 sticky top-0 z-50 ${navbarBgClass}`}>
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img src={images.logo} alt="GzoneSphere" className="w-10 h-10 object-contain" />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`flex items-center gap-1 text-xs font-bold tracking-widest ${textColorClass} ${hoverColorClass} transition-colors`}
          >
            {link.name}
            {link.hasDropdown && <HiChevronDown className="w-4 h-4" />}
          </Link>
        ))}
      </div>

      {/* Buttons + Profile avatar (Desktop) */}
      <div className="hidden lg:flex items-center gap-3">
        <Link
          to="/signup"
          className={`px-5 py-2 text-xs font-bold tracking-widest border border-neutral-200 ${textColorClass} hover:bg-neutral-50 transition-colors rounded-[4px]`}
        >
          SIGNUP
        </Link>
        <Link
          to="/login"
          className={`flex items-center gap-1 px-5 py-2 text-xs font-bold tracking-widest ${loginButtonClass} rounded-[4px] transition-colors shadow-md hover:shadow-lg`}
        >
          LOGIN
          <FiArrowUpRight className="w-4 h-4" />
        </Link>

        {/* ── Profile avatar dropdown ────────────────── */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-9 h-9 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] transition-colors flex items-center justify-center shadow-md focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40"
            aria-label="Profile menu"
          >
            <span className="text-white text-xs font-black">K</span>
          </button>

          {profileOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
              <div className="absolute right-0 top-12 z-50 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Purple header */}
                <div className="px-4 py-3 bg-[#7C3AED]">
                  <p className="text-white text-xs font-black uppercase tracking-widest">KHALI</p>
                  <p className="text-white/60 text-[10px]">GZONESPHERE PLAYER</p>
                </div>

                {/* Nav links */}
                <div className="py-1">
                  {profileLinks.map(({ label, path, icon: Icon }) => (
                    <Link
                      key={path}
                      to={path}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-purple-50 hover:text-[#7C3AED] transition-colors"
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      {label}
                    </Link>
                  ))}
                </div>

                {/* Settings row */}
                <div className="border-t border-gray-100">
                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <FiLogOut className="w-3.5 h-3.5 shrink-0" />
                    Settings &amp; Account
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className={`lg:hidden ${textColorClass}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`absolute top-full left-0 w-full ${navbarBgClass} border-t border-neutral-200 lg:hidden`}>
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs font-bold tracking-widest ${textColorClass} py-2`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Profile quick-links (mobile) */}
            <div className="border-t border-gray-100 pt-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">MY PROFILE</p>
              {profileLinks.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  className="block text-xs font-semibold text-gray-600 py-1.5 hover:text-[#7C3AED] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <Link
                to="/signup"
                className={`px-5 py-3 text-xs font-bold tracking-widest border border-neutral-200 ${textColorClass} text-center rounded-[4px]`}
                onClick={() => setMobileMenuOpen(false)}
              >
                SIGNUP
              </Link>
              <Link
                to="/login"
                className={`flex items-center justify-center gap-1 px-5 py-3 text-xs font-bold tracking-widest ${loginButtonClass} rounded-[4px] shadow-sm`}
                onClick={() => setMobileMenuOpen(false)}
              >
                LOGIN
                <FiArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
