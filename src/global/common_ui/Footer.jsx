import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { images } from '@data/images';

/**
 * Footer Component
 * @param {string} accent - Accent color ('yellow' | 'green' | 'red' | 'blue')
 * @param {string} variant - Color variant ('dark' | 'light')
 */
/**
 * Footer Component - Fixed White Theme
 */
function Footer() {
  const logoColorClass = 'text-[#e53935]';
  const buttonClass = 'bg-[#e53935] hover:bg-[#c62828]';

  // Variant classes - Refined to White theme
  const bgClass = 'bg-white';
  const textClass = 'text-neutral-900';
  const linkClass = 'text-neutral-500 hover:text-neutral-900';
  const borderClass = 'border-neutral-100';
  const inputBorderClass = 'border-neutral-200';
  const inputTextClass = 'text-neutral-900 placeholder-neutral-400';
  const bottomTextClass = 'text-neutral-400';

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
              <img src={images.logo} alt="GzoneSphere Logo" className="w-14 h-14 object-contain" />
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
                className={`w-full px-4 py-2 bg-neutral-50 border ${inputBorderClass} rounded-[4px] text-sm ${inputTextClass} focus:outline-none focus:border-neutral-400 transition-colors`}
              />
              <button
                className={`flex items-center justify-center gap-1 px-4 py-2 ${buttonClass} text-white text-xs font-bold uppercase tracking-widest rounded-[4px] transition-colors shadow-sm`}
              >
                Subscribe
                <FiArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="border-t border-neutral-100 pt-8">
          <p className={`text-xs ${bottomTextClass} text-center tracking-wider`}>
            © {currentYear} GzoneSphere. All rights reserved. Built for gamers, by gamers.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
