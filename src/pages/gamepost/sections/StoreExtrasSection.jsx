export default function StoreExtrasSection() {
    return (
        <section className="max-w-[1200px] mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[var(--gp-primary)] p-8 rounded-2xl relative overflow-hidden shadow-lg shadow-[var(--gp-primary-alpha)]">
                <div className="absolute top-0 right-0 w-48 h-full bg-white/5 -skew-x-12 translate-x-10" />
                <h4 className="border-b border-white/20 pb-4 mb-6 text-sm font-black uppercase tracking-widest text-white relative z-10 w-fit pr-8">
                    PRO FEATURES
                </h4>
                <div className="space-y-4 text-[13px] font-medium text-white/90 relative z-10">
                    <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                        <p>Unlocks all agents natively (Up to level 5).</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                        <p>Premium Battlepass instantly applied for current season.</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                        <p>Includes exclusive 'Champion' Player Card.</p>
                    </div>
                </div>
                <div className="mt-8 relative z-10">
                    <button className="px-6 py-2.5 bg-white text-[var(--gp-primary)] text-xs font-black uppercase tracking-[0.1em] rounded transition-colors hover:bg-gray-100">
                        LEARN MORE →
                    </button>
                </div>
            </div>

            <div className="bg-[var(--gp-bg-card)] border border-[var(--gp-border)] p-8 rounded-2xl shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-full bg-[var(--gp-bg-section)] -skew-x-12 translate-x-10" />
                <h4 className="border-b border-[var(--gp-border)] pb-4 mb-6 text-sm font-black uppercase tracking-widest text-[var(--gp-text-heading)] relative z-10 w-fit pr-8">
                    INCLUDED BONUSES
                </h4>
                <div className="space-y-4 text-[13px] font-medium text-[var(--gp-text-body)] relative z-10">
                    <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--gp-primary)] mt-1.5 shrink-0" />
                        <p>1,000 Valorant Points (VP) for store purchases.</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--gp-primary)] mt-1.5 shrink-0" />
                        <p>XP Boost token (+20% for 24 hours).</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
