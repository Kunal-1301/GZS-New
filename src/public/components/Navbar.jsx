import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi';
import { FiArrowUpRight } from 'react-icons/fi';
import { images } from '../data/images';

/**
 * Reusable Navbar Component
 * @param {string} logoVariant  - "yellow" | "white" | "green" | "blue" | "esports" - Controls logo color
 * @param {string} loginVariant - "yellow" | "white" | "green" | "blue" | "esports" - Controls login button color
 * @param {boolean} isDark - Optional dark mode flag
 * @param {string} accent - "yellow" | "green" | "blue" | "esports" - Theme accent color
 */
/**
 * Reusable Navbar Component - Fixed White Theme
 */
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fixed Styling (not dependent on props)
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

      {/* Buttons (Desktop) */}
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
            <div className="flex flex-col gap-3 mt-4">
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
