/**
 * PageLoader — Command Nexus Synchronizer
 * ──────────────────────────────────────
 * GzoneSphere-branded full-page loading state.
 * Syncs the sphere protocol before rendering lazy-loaded clusters.
 */
export default function PageLoader() {
    return (
        <div
            id="page-loader"
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-12 bg-[var(--theme-bg)]"
        >
            {/* Animated logo mark */}
            <div className="relative flex items-center justify-center">
                {/* Orbital telemetry ring 1 */}
                <div
                    className="absolute w-32 h-32 rounded-full border border-transparent"
                    style={{
                        borderTopColor: 'var(--theme-primary)',
                        borderRightColor: 'rgba(var(--theme-primary-rgb), 0.1)',
                        animation: 'gzs-spin 1.2s linear infinite',
                    }}
                />
                {/* Orbital telemetry ring 2 */}
                <div
                    className="absolute w-48 h-48 rounded-full border border-transparent"
                    style={{
                        borderBottomColor: 'var(--theme-primary)',
                        borderLeftColor: 'rgba(var(--theme-primary-rgb), 0.05)',
                        animation: 'gzs-spin 2s linear infinite reverse',
                    }}
                />
                
                {/* Center Core */}
                <div className="relative group">
                    <div
                        className="w-12 h-12 bg-[var(--theme-primary)] rounded-[1.2rem] flex items-center justify-center text-white shadow-3xl shadow-[var(--theme-primary)]/40 relative z-10"
                        style={{ animation: 'gzs-float 2s ease-in-out infinite' }}
                    >
                         <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                    </div>
                    <div className="absolute inset-[-20px] bg-[var(--theme-primary)]/20 blur-[30px] rounded-full animate-pulse" />
                </div>
            </div>

            {/* Brand text */}
            <div className="text-center space-y-4">
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-black uppercase tracking-[0.5em] text-[var(--theme-text)] italic leading-none">GzoneSphere</h2>
                    <div className="w-12 h-px bg-[var(--theme-border)] mt-4 mb-2" />
                    <p className="text-xs font-black uppercase tracking-wide text-[var(--theme-text-muted)] opacity-30 italic">Synchronizing Shards</p>
                </div>
                
                {/* Loading bar fallback */}
                <div className="w-48 h-[2px] bg-[var(--theme-bg-alt)] rounded-full overflow-hidden mx-auto mt-6">
                    <div 
                        className="h-full bg-[var(--theme-primary)]"
                        style={{ animation: 'gzs-progress 2s cubic-bezier(0.65, 0, 0.35, 1) infinite' }}
                    />
                </div>
            </div>

            <style>{`
                @keyframes gzs-spin {
                    to { transform: rotate(360deg); }
                }
                @keyframes gzs-float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes gzs-progress {
                    0% { width: 0%; transform: translateX(-100%); }
                    50% { width: 50%; transform: translateX(0%); }
                    100% { width: 100%; transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
}







