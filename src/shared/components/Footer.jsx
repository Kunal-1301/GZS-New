import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiYoutube, FiInstagram } from 'react-icons/fi';
import { SiTiktok } from 'react-icons/si';
import GzsLogo from './GzsLogo';

/**
 * Footer Component — Clean, Professional Design
 * Always white background with dark text
 * 4-column layout: Brand | Platform | Company | Newsletter
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  const platformLinks = [
    { name: 'Games', path: '/games' },
    { name: 'Tournaments', path: '/tournaments' },
    { name: 'Blogs & Guides', path: '/blog' },
    { name: 'Community', path: '/community' },
    { name: 'Career Hub', path: '/career' },
    { name: 'How Profiles Work', path: '/profile/how-it-works' },
  ];

  const companyLinks = [
    { name: 'About GzoneSphere', path: '/about' },
    { name: 'Our Story', path: '/about/origin' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Cookie Policy', path: '/cookies' },
  ];

  const socialLinks = [
    { icon: FiTwitter, href: '#', label: 'Twitter' },
    { icon: FiInstagram, href: '#', label: 'Instagram' },
    { icon: FiYoutube, href: '#', label: 'YouTube' },
    { icon: SiTiktok, href: '#', label: 'TikTok' },
    { icon: FiGithub, href: '#', label: 'GitHub' },
  ];

  return (
    <footer className="w-full bg-white border-t border-[#E2E8F0]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-10">
        {/* Main 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 py-16">
          {/* Column 1: Brand — 4/12 cols */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo */}
            <Link to="/" className="inline-block">
              <GzsLogo variant="dark" size={32} showText={true} />
            </Link>

            {/* Mission Statement */}
            <p className="text-sm text-[#64748B] leading-relaxed max-w-[280px]">
              GzoneSphere is where gamers, creators, and companies meet — to compete, build, and grow together.
            </p>

            {/* Social Icons Row */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="footer-social-icon"
                    aria-label={social.label}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Platform — 3/12 cols */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="footer-column-heading">Platform</h3>
            <div className="space-y-3">
              {platformLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="footer-link"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Company — 2/12 cols */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="footer-column-heading">Company</h3>
            <div className="space-y-3">
              {companyLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="footer-link"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Newsletter — 3/12 cols */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="footer-column-heading">Stay Updated</h3>

            {/* Newsletter Description */}
            <p className="text-sm text-[#64748B] leading-relaxed max-w-[260px]">
              Get updates on new games, tournaments, and platform news. No spam.
            </p>

            {/* Email Form */}
            <div className="space-y-0">
              <input
                type="email"
                placeholder="Your email address"
                className="footer-newsletter-input"
              />
              <button className="footer-newsletter-btn">
                Subscribe
              </button>
            </div>

            {/* Legal Text */}
            <p className="text-xs text-[#94A3B8]">
              By subscribing you agree to our Privacy Policy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#E2E8F0] py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-[#94A3B8]">
            © {currentYear} GzoneSphere. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link to="/terms" className="text-[#94A3B8] hover:text-[#374151] transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-[#94A3B8] hover:text-[#374151] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-[#94A3B8] hover:text-[#374151] transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;





