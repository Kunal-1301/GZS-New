import { Link } from 'react-router-dom';

/**
 * AuthLayout — Self-contained layout for all auth pages.
 * No Navbar/Footer — uses a top banner bar + bottom footer bar.
 * Left panel (lighter teal) + Right form card (darker teal).
 *
 * Props:
 *  title       — Heading text in left panel
 *  subtitle    — Subtitle text in left panel
 *  sideLink    — { prefix, label, href } — contextual link in left panel (e.g. "Don't have an account? Sign up")
 *  children    — Form content rendered in right card
 */
export default function AuthLayout({ title, subtitle, sideLink, children }) {
    return (
        <div className="min-h-screen flex flex-col bg-white font-inter">

            {/* ── Top Banner ─────────────────────────────────── */}
            <div className="bg-[#0b6e8a] text-white text-center py-3 px-6 text-[11px] tracking-wide">
                Welcome, Gzonesphere is a true platform on which you can do all.{' '}
                <span className="font-black tracking-widest">EXPLORE. PLAY. CONQUER</span>
            </div>

            {/* ── Main Area ──────────────────────────────────── */}
            <main className="flex-1 flex items-center justify-center py-16 px-4 bg-white">
                <div className="w-full max-w-[900px] mx-auto flex flex-col lg:flex-row shadow-2xl rounded-lg overflow-hidden">

                    {/* Left Panel — lighter teal */}
                    <div className="bg-[#3d93ae] text-white py-14 px-10 flex flex-col justify-center lg:w-[380px] shrink-0">
                        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wide leading-tight mb-4 font-heading">
                            {title}
                        </h1>
                        <p className="text-white/80 text-sm leading-relaxed mb-8">
                            {subtitle}
                        </p>
                        {sideLink && (
                            <p className="text-white/80 text-[13px]">
                                {sideLink.prefix}{' '}
                                <Link
                                    to={sideLink.href}
                                    className="font-bold text-white hover:underline underline-offset-2 transition-colors"
                                >
                                    {sideLink.label}
                                </Link>
                            </p>
                        )}
                    </div>

                    {/* Right Card — darker teal */}
                    <div className="bg-[#085c7a] text-white py-12 px-10 flex-1 flex flex-col justify-center">
                        {children}
                    </div>

                </div>
            </main>

            {/* ── Bottom Footer Bar ──────────────────────────── */}
            <div className="bg-[#0b6e8a] text-white text-center py-3 px-6 text-[11px] tracking-wide">
                <span className="cursor-pointer hover:underline underline-offset-2 transition-colors">Terms</span>
                {' · '}
                <span className="cursor-pointer hover:underline underline-offset-2 transition-colors">Privacy</span>
                {' · '}
                <span className="cursor-pointer hover:underline underline-offset-2 transition-colors">Help</span>
            </div>

        </div>
    );
}
