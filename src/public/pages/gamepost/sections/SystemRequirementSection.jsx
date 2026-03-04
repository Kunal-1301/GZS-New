export default function SystemRequirementSection({ sys }) {
    if (!sys) return null;

    const rows = [
        { label: "OS", min: sys.os_min, rec: sys.os_rec },
        { label: "Processor", min: sys.processor_min, rec: sys.processor_rec },
        { label: "Memory", min: sys.memory_min, rec: sys.memory_rec },
        { label: "Graphics", min: sys.graphics_min, rec: sys.graphics_rec },
        { label: "Storage", min: sys.storage_min, rec: sys.storage_rec },
        { label: "DirectX", min: sys.directx_min, rec: sys.directx_rec },
    ].filter(r => r.min || r.rec);

    return (
        <section className="section-padding gp-animate-in relative">
            <div className="container-global">
                <div className="text-center mb-16 gp-animate-in relative z-10">
                    <span className="gp-section-label flex items-center justify-center gap-3">
                        <span className="w-8 h-[2px] bg-[var(--gp-primary)]"></span>
                        PERFORMANCE
                        <span className="w-8 h-[2px] bg-[var(--gp-primary)]"></span>
                    </span>
                    <h2 className="gp-hero-title text-6xl md:text-7xl text-[var(--theme-text)]">
                        SYSTEM REQUIREMENTS
                    </h2>
                </div>

                <div className="rounded-[2rem] overflow-hidden border border-[var(--gp-border)] shadow-[0_15px_40px_rgba(0,0,0,0.06)] gp-animate-scale relative z-10 bg-white backdrop-blur-2xl">
                    {/* Glowing border top */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-[var(--gp-primary)]"></div>

                    {/* Header Row */}
                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_1fr] bg-[var(--gp-primary)] text-white relative overflow-hidden">
                        {/* Scanline overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.05)_50%)] bg-[length:100%_4px] pointer-events-none mix-blend-screen opacity-50"></div>
                        <div className="gp-hero-title text-lg px-8 py-6 tracking-widest border-b md:border-b-0 md:border-r border-white/20 uppercase relative z-10 flex items-center gap-3">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-sm"></div>
                            Component
                        </div>
                        <div className="gp-hero-title text-lg px-8 py-6 tracking-widest border-b md:border-b-0 md:border-r border-white/20 uppercase relative z-10">Minimum</div>
                        <div className="gp-hero-title text-lg px-8 py-6 tracking-widest uppercase relative z-10 text-[var(--theme-bg)] drop-shadow-sm">Recommended</div>
                    </div>

                    {/* Table Rows */}
                    <div className="bg-white/80">
                        {rows.map((row, i) => (
                            <div
                                key={row.label}
                                className={`grid grid-cols-1 md:grid-cols-[200px_1fr_1fr] border-b border-[var(--gp-border)] last:border-0 hover:bg-[var(--gp-bg-page)] transition-all duration-300 group`}
                            >
                                <div className="px-8 py-6 font-black text-[var(--theme-text)] text-[15px] uppercase tracking-widest group-hover:text-[var(--gp-primaryDark)] transition-colors border-b md:border-b-0 border-[var(--gp-border)] flex items-center">{row.label}</div>
                                <div className="px-8 py-6 text-[var(--theme-text)]/80 text-sm font-semibold md:border-l border-[var(--gp-border)] uppercase border-b md:border-b-0 leading-relaxed font-mono relative overflow-hidden group-hover:text-[var(--theme-text)] transition-colors">{row.min || "—"}</div>
                                <div className="px-8 py-6 text-[var(--theme-text)] text-sm font-bold md:border-l border-[var(--gp-border)] uppercase leading-relaxed font-mono relative overflow-hidden group-hover:bg-[var(--gp-primary)]/5 transition-colors duration-300">
                                    {row.rec || "—"}
                                    {/* subtle highlight for recommended spec on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--gp-primary)]/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Custom keyframes for shimmer */}
            <style jsx>{`
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </section>
    );
}
