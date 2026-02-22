import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi';
import { FiArrowUpRight } from 'react-icons/fi';

/**
 * Reusable Navbar Component
 * @param {string} logoVariant  - "yellow" | "white" | "green" | "blue" | "esports" - Controls logo color
 * @param {string} loginVariant - "yellow" | "white" | "green" | "blue" | "esports" - Controls login button color
 * @param {boolean} isDark - Optional dark mode flag
 * @param {string} accent - "yellow" | "green" | "blue" | "esports" - Theme accent color
 */
function Navbar({ logoVariant = 'yellow', loginVariant = 'yellow', isDark = false, accent = 'yellow' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Logo color based on variant
  const logoColorClass = {
    yellow: 'text-yellow-500',
    white: 'text-white',
    green: 'text-green-600',
    red: 'text-red-500',
    blue: 'text-[#0097A7]',
    esports: 'text-es-primary',
    theme: 'text-[var(--gp-primary)]',
  }[logoVariant] || 'text-yellow-500';

  // Login button styling based on variant and accent
  const loginButtonClass = {
    yellow: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    white: 'bg-white hover:bg-neutral-100 text-neutral-900',
    green: 'bg-green-600 hover:bg-green-700 text-white',
    red: 'bg-red-500 hover:bg-red-600 text-white',
    blue: 'bg-[#1a4a5e] hover:bg-[#0d3a4e] text-white',
    esports: 'bg-es-primary hover:bg-es-primary-dark text-white',
    theme: 'bg-[var(--gp-primary)] hover:bg-[var(--gp-primary-dark)] text-white',
  }[loginVariant] || 'bg-yellow-500 hover:bg-yellow-600 text-white';

  // Navbar background based on dark mode and accent
  const navbarBgClass = isDark
    ? 'bg-neutral-900'
    : accent === 'green' ? 'bg-[#E8F5E9]'
      : accent === 'red' ? 'bg-[#FFF5F5]'
        : accent === 'blue' ? 'bg-white'
          : accent === 'esports' ? 'bg-white'
            : accent === 'theme' ? 'bg-[var(--gp-bg-page)]'
              : 'bg-[#FFFDF5]';

  // Text color based on dark mode
  const textColorClass = isDark ? 'text-white' : 'text-neutral-800';

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
        <svg
          className={`w-10 h-10 ${logoColorClass}`}
          viewBox="0 0 48 48"
          fill="currentColor"
        >
          <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm0 36c-8.837 0-16-7.163-16-16S15.163 8 24 8c4.418 0 8.418 1.791 11.314 4.686l-7.07 7.071A8 8 0 1024 32a7.95 7.95 0 004.243-1.222l7.071 7.071A15.932 15.932 0 0124 40z" />
        </svg>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`flex items-center gap-1 text-sm font-medium ${textColorClass} hover:text-neutral-500 transition-colors`}
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
          className={`px-5 py-2 text-sm font-medium border-2 border-neutral-800 ${textColorClass} hover:bg-neutral-800 hover:text-white transition-colors rounded-sm`}
        >
          SIGNUP
        </Link>
        <Link
          to="/login"
          className={`flex items-center gap-1 px-5 py-2 text-sm font-medium ${loginButtonClass} rounded-sm transition-colors`}
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
                className={`text-sm font-medium ${textColorClass}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <Link
                to="/signup"
                className={`px-5 py-2 text-sm font-medium border-2 border-neutral-800 ${textColorClass} text-center rounded-sm`}
                onClick={() => setMobileMenuOpen(false)}
              >
                SIGNUP
              </Link>
              <Link
                to="/login"
                className={`flex items-center justify-center gap-1 px-5 py-2 text-sm font-medium ${loginButtonClass} rounded-sm`}
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
