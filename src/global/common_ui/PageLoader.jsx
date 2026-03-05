/**
 * PageLoader
 * ──────────
 * GzoneSphere-branded full-page loading state.
 * Used as the Suspense fallback for lazy-loaded routes.
 */
export default function PageLoader() {
    return (
        <div
            id="page-loader"
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6"
            style={{
                background: 'linear-gradient(135deg, #050505 0%, #0A0A0A 50%, #121212 100%)',
            }}
        >
            {/* Animated logo mark */}
            <div className="relative flex items-center justify-center">
                {/* Outer ring */}
                <div
                    className="absolute w-20 h-20 rounded-full border-2 border-transparent"
                    style={{
                        borderTopColor: '#D4F234',
                        borderRightColor: 'rgba(212, 242, 52, 0.3)',
                        animation: 'gzs-spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite',
                    }}
                />
                {/* Inner ring */}
                <div
                    className="absolute w-14 h-14 rounded-full border-2 border-transparent"
                    style={{
                        borderBottomColor: '#D4F234',
                        borderLeftColor: 'rgba(212, 242, 52, 0.15)',
                        animation: 'gzs-spin 0.7s cubic-bezier(0.4, 0, 0.2, 1) infinite reverse',
                    }}
                />
                {/* Center dot */}
                <div
                    className="w-3 h-3 rounded-full"
                    style={{
                        backgroundColor: '#D4F234',
                        animation: 'gzs-pulse 1.5s ease-in-out infinite',
                        boxShadow: '0 0 20px rgba(212, 242, 52, 0.4)',
                    }}
                />
            </div>

            {/* Brand text */}
            <div className="text-center">
                <p
                    className="text-lg font-black uppercase tracking-[0.3em] text-white/90"
                    style={{ fontFamily: 'var(--font-heading, Impact, "Arial Narrow", sans-serif)' }}
                >
                    GzoneSphere
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40 mt-1">
                    Loading experience...
                </p>
            </div>

            {/* Inline keyframes (only rendered once, safe for SSR) */}
            <style>{`
        @keyframes gzs-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes gzs-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
        </div>
    );
}
