import { FiCheckCircle } from 'react-icons/fi';

export default function CompetitiveHistory() {
    return (
        <div className="mb-12 font-body">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="gzs-h2 !text-xl">COMPETITIVE HISTORY</h2>
                    <p className="gzs-label !text-[var(--theme-text-muted)] mt-1 tracking-widest">TEAMS, LEAGUES & TOURNAMENTS</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center hover:shadow-xl transition-all group overflow-hidden relative">
                    <div className="w-24 h-24 bg-[var(--theme-bg-alt)] rounded-full flex items-center justify-center text-[var(--theme-text)] text-3xl font-black font-serif uppercase tracking-[0.3em] overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover opacity-60" />
                        <span className="absolute">VCL</span>
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h3 className="gzs-h3 !text-lg !text-[var(--theme-text)]">VALORANT CHALLENGERS LEAGUE 2024</h3>
                            <span className="bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] text-[9px] font-black px-2 py-0.5 rounded tracking-widest uppercase border border-[var(--theme-primary)]/20">TOP 8 FINISH</span>
                        </div>
                        <p className="gzs-body-sm mb-4 max-w-2xl leading-relaxed">Competed as the primary Duelist/Entry Fragger for 'Team Kinetic'. Held the highest ACS (Average Combat Score) in the group stage across 14 maps.</p>
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-[var(--theme-bg-alt)] px-3 py-1 rounded-full text-[9px] font-bold uppercase text-[var(--theme-text-muted)]"><FiCheckCircle className="inline mr-1 text-[var(--theme-primary)]" /> Aim & Tracking</span>
                        </div>
                    </div>
                    <button className="gzs-btn-primary !px-8 !py-3 !rounded-xl">
                        VIEW MATCH VODS
                    </button>
                </div>
            </div>
        </div>
    );
}
