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
        <section className="section-padding gp-animate-in">
            <div className="container-global">
                <div className="text-center mb-16 gp-animate-in">
                    <span className="gp-section-label">PERFORMANCE</span>
                    <h2 className="gp-hero-title text-4xl">
                        SYSTEM REQUIREMENTS
                    </h2>
                </div>

                <div className="rounded-2xl overflow-hidden border border-[var(--gp-border)] shadow-xl gp-animate-scale">
                    {/* Header Row */}
                    <div className="grid grid-cols-[200px_1fr_1fr] bg-[var(--gp-primary)] text-white">
                        <div className="gp-hero-title text-sm px-8 py-5 tracking-widest border-r border-white/10 uppercase">Component</div>
                        <div className="gp-hero-title text-sm px-8 py-5 tracking-widest border-r border-white/10 uppercase">Minimum</div>
                        <div className="gp-hero-title text-sm px-8 py-5 tracking-widest uppercase">Recommended</div>
                    </div>

                    {/* Table Rows */}
                    <div className="bg-white/80 backdrop-blur-md">
                        {rows.map((row, i) => (
                            <div
                                key={row.label}
                                className={`grid grid-cols-[200px_1fr_1fr] border-b border-[var(--gp-border)] last:border-0 hover:bg-[var(--gp-primary)]/5 transition-colors`}
                            >
                                <div className="px-8 py-5 font-black text-[var(--gp-text-body)] text-sm uppercase tracking-wider">{row.label}</div>
                                <div className="px-8 py-5 text-[var(--gp-text-body)]/60 text-sm font-medium border-l border-[var(--gp-border)] uppercase">{row.min || "—"}</div>
                                <div className="px-8 py-5 text-[var(--gp-text-body)]/60 text-sm font-medium border-l border-[var(--gp-border)] uppercase">{row.rec || "—"}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
