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
        <section className="bg-[var(--gp-bg-section)] py-20 px-6">
            <div className="max-w-[1200px] mx-auto">
                <h2 className="text-center text-[1.875rem] font-black uppercase tracking-[0.08em]
                       mb-12 text-[var(--gp-text-heading)]">
                    System Requirements
                </h2>

                <div className="rounded-xl overflow-hidden border border-[var(--gp-border)]">

                    {/* Header row */}
                    <div className="grid grid-cols-[160px_1fr_1fr]
                          bg-[var(--gp-table-header)] text-[var(--gp-table-text)]
                          text-[11px] font-bold uppercase tracking-[0.12em]">
                        <div className="px-5 py-3.5">Component</div>
                        <div className="px-5 py-3.5 border-l border-white/15">MINIMUM</div>
                        <div className="px-5 py-3.5 border-l border-white/15">RECOMMENDED</div>
                    </div>

                    {rows.map((row, i) => (
                        <div
                            key={row.label}
                            className={`grid grid-cols-[160px_1fr_1fr] border-t border-[var(--gp-border)]
                ${i % 2 === 0 ? "bg-[var(--gp-bg-card)]" : "bg-[var(--gp-bg-card-alt)]"}`}
                        >
                            <div className="px-5 py-3 font-bold text-[13px] text-[var(--gp-text-body)]">{row.label}</div>
                            <div className="px-5 py-3 text-[13px] text-[var(--gp-text-muted)] border-l border-[var(--gp-border)]">{row.min || "—"}</div>
                            <div className="px-5 py-3 text-[13px] text-[var(--gp-text-muted)] border-l border-[var(--gp-border)]">{row.rec || "—"}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
