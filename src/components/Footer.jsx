import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';

/**
 * Footer Component
 * @param {string} accent - Accent color ('yellow' | 'green' | 'red' | 'blue')
 * @param {string} variant - Color variant ('dark' | 'light')
 */
function Footer({ accent = 'yellow', variant = 'light' }) {
  // Accent color classes
  const logoColorClass = accent === 'green' ? 'text-green-600'
    : accent === 'red' ? 'text-red-500'
      : accent === 'blue' ? 'text-[#0097A7]'
        : accent === 'theme' ? 'text-[var(--gp-primary)]'
          : 'text-yellow-500';

  const buttonClass = accent === 'green'
    ? 'bg-green-600 hover:bg-green-700'
    : accent === 'red'
      ? 'bg-red-500 hover:bg-red-600'
      : accent === 'blue'
        ? 'bg-[#1a4a5e] hover:bg-[#0d3a4e]'
        : accent === 'theme'
          ? 'bg-[var(--gp-primary)] hover:bg-[var(--gp-primary-dark)]'
          : 'bg-yellow-500 hover:bg-yellow-600';

  // Variant classes
  const bgClass = variant === 'light' ? 'bg-white' : 'bg-neutral-900';
  const textClass = variant === 'light' ? 'text-neutral-900' : 'text-white';
  const linkClass = variant === 'light' ? 'text-neutral-600 hover:text-neutral-900' : 'text-neutral-400 hover:text-white';
  const borderClass = variant === 'light' ? 'border-neutral-200' : 'border-neutral-800';
  const inputBorderClass = variant === 'light' ? 'border-neutral-300' : 'border-neutral-700';
  const inputTextClass = variant === 'light' ? 'text-neutral-900 placeholder-neutral-400' : 'text-white placeholder-neutral-500';
  const bottomTextClass = 'text-neutral-500';

  const footerLinks = {
    column1: [
      { name: 'Games', path: '/games' },
      { name: 'Blog', path: '/blog' },
      { name: 'Write a Blog', path: '/write-blog' },
    ],
    column2: [
      { name: 'Esports', path: '/esports' },
      { name: 'About GzoneSphere', path: '/about' },
      { name: 'Career', path: '/career' },
      { name: 'Contact', path: '/contact' },
    ],
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`w-full ${bgClass} ${textClass} pt-16 pb-8`}>
      <div className="container mx-auto px-6 lg:px-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo + Tagline */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center" aria-label="GzoneSphere Home">
              <svg
                className={`w-16 h-16 ${logoColorClass}`}
                viewBox="0 0 48 48"
                fill="currentColor"
              >
                <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm0 36c-8.837 0-16-7.163-16-16S15.163 8 24 8c4.418 0 8.418 1.791 11.314 4.686l-7.07 7.071A8 8 0 1024 32a7.95 7.95 0 004.243-1.222l7.071 7.071A15.932 15.932 0 0124 40z" />
              </svg>
            </Link>
            <p className={`text-sm leading-relaxed ${linkClass} max-w-xs`}>
              GzoneSphere — Your hub for game coverage, esports events, and gaming culture.
            </p>
          </div>

          {/* Links Column 1 — Explore */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold uppercase tracking-wider mb-1">Explore</h4>
            {footerLinks.column1.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium ${linkClass} transition-colors`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Links Column 2 — Community */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold uppercase tracking-wider mb-1">Community</h4>
            {footerLinks.column2.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium ${linkClass} transition-colors`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">
              Stay Updated
            </h4>
            <p className={`text-xs ${linkClass} mb-4 leading-relaxed`}>
              Get the latest game news, tournament alerts, and community highlights delivered to your inbox.
            </p>
            <div className="flex flex-col gap-3">
              <input
                id="footer-newsletter-email"
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-2 bg-transparent border ${inputBorderClass} rounded-sm text-sm ${inputTextClass} focus:outline-none focus:border-neutral-500 transition-colors`}
              />
              <button
                className={`flex items-center justify-center gap-1 px-4 py-2 ${buttonClass} text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors`}
              >
                Subscribe
                <FiArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className={`${accent === 'blue' ? 'border-t border-dashed border-[#0097A7]/40' : accent === 'theme' ? 'border-t border-dashed border-[var(--gp-border)]' : `border-t ${borderClass}`} pt-8`}>
          <p className={`text-xs ${bottomTextClass} text-center tracking-wider`}>
            © {currentYear} GzoneSphere. All rights reserved. Built for gamers, by gamers.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
