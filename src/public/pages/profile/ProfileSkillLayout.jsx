/**
 * ProfileSkillLayout
 * ──────────────────
 * Shared standalone layout for all Profile Skill pages.
 * No Navbar / Footer. Uses the Figma purple (#7C3AED) banner design.
 *
 * Props
 *   title      – page section title (e.g. "ART, VISUAL & CHARACTER DESIGN")
 *   subtitle   – one-line subtitle below title
 *   badge      – "setup" | "active" | null   (renders the right badge variant)
 *   footer     – italic caption text in bottom purple bar
 *   noPadding  – skip the max-w-4xl / px-6 wrapper (for pages that self-manage)
 *   children   – content slot
 */
export default function ProfileSkillLayout({
    title,
    subtitle,
    badge,     // "setup" | "active" | null
    footer,
    noPadding = false,
    children,
}) {
    return (
        <div className="min-h-screen flex flex-col bg-white font-inter">

            {/* ── Top purple banner ──────────────────────────── */}
            <header className="w-full bg-[#7C3AED] py-3 flex items-center justify-center">
                <span className="text-white text-sm font-black tracking-[0.3em] uppercase">
                    GZONESPHERE
                </span>
            </header>

            {/* ── Page header (title + badge) ────────────────── */}
            {(title || badge) && (
                <div className="w-full max-w-4xl mx-auto px-6 pt-10 pb-2 flex items-start justify-between gap-4">
                    <div>
                        {title && (
                            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-900 leading-tight">
                                {title}
                            </h1>
                        )}
                        {subtitle && (
                            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
                        )}
                    </div>
                    {badge === 'setup' && (
                        <span className="shrink-0 flex items-center gap-1.5 text-[11px] font-bold text-green-700 border border-green-300 bg-green-50 rounded-full px-3 py-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                            Setup in Progress
                        </span>
                    )}
                    {badge === 'active' && (
                        <span className="shrink-0 flex items-center gap-1.5 text-[11px] font-bold text-yellow-700 border border-yellow-300 bg-yellow-50 rounded-full px-3 py-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 inline-block" />
                            Active
                        </span>
                    )}
                </div>
            )}

            {/* ── Main content ───────────────────────────────── */}
            <main className="flex-1">
                {noPadding ? children : (
                    <div className="w-full max-w-4xl mx-auto px-6 py-6">
                        {children}
                    </div>
                )}
            </main>

            {/* ── Footer ─────────────────────────────────────── */}
            {footer && (
                <footer className="w-full bg-[#7C3AED] py-4 flex items-center justify-center px-6">
                    <p className="text-white/80 text-xs italic text-center">{footer}</p>
                </footer>
            )}
        </div>
    );
}
