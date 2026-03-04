import { FiMonitor } from 'react-icons/fi';
import { FaXbox, FaPlaystation, FaSteam, FaWindows } from 'react-icons/fa';

export default function GetGameSection({ getGame }) {
    return (
        <section className="container-global section-padding">
            <div className="space-y-12">
                {/* Main Get Game Bar */}
                <div className="bg-[var(--gp-primary)] rounded-2xl py-8 px-12 flex flex-col md:flex-row items-center justify-between text-white shadow-2xl relative overflow-hidden gp-animate-in">
                    <div className="absolute top-0 right-0 w-[40%] h-full bg-white/5 skew-x-[-25deg] translate-x-12" />

                    <h2 className="gp-hero-title text-4xl mb-6 md:mb-0 relative z-10 tracking-widest">
                        GET GAME
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center gap-12 relative z-10">
                        <div className="flex gap-8 text-3xl opacity-80">
                            <FiMonitor className="hover:text-white hover:scale-110 transition-all cursor-pointer" />
                            <FaPlaystation className="hover:text-white hover:scale-110 transition-all cursor-pointer" />
                            <FaXbox className="hover:text-white hover:scale-110 transition-all cursor-pointer" />
                            <FaWindows className="hover:text-white hover:scale-110 transition-all cursor-pointer" />
                        </div>
                        <button className="px-12 py-4 bg-white text-[var(--gp-primary)] text-sm font-black uppercase tracking-[0.2em] rounded-full transition-all hover:bg-white/90 hover:shadow-xl gp-btn-transition">
                            PLAY FREE NOW
                        </button>
                    </div>
                </div>

                {/* Purchase Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-[var(--gp-primary)] p-10 rounded-3xl text-white gp-card-hover gp-animate-in">
                        <span className="text-[11px] font-bold uppercase tracking-[0.3em] opacity-60 mb-4 block">PREMIUM STORE</span>
                        <h3 className="gp-hero-title text-3xl mb-4">BUY VP PACKS</h3>
                        <p className="gzs-body opacity-80 mb-10 text-lg leading-relaxed">Top up your Valorant Points to unlock the latest weapon skins and battle pass tiers.</p>
                        <button className="text-sm font-black uppercase tracking-widest border-b-2 border-white pb-1 hover:opacity-70 transition-opacity">SHOP PACKS →</button>
                    </div>

                    <div className="bg-white border border-[var(--gp-border)] p-10 rounded-3xl text-[var(--gp-text-body)] gp-card-hover gp-animate-in">
                        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--gp-primary)] mb-4 block">UPGRADE YOUR GAME</span>
                        <h3 className="gp-hero-title text-3xl mb-4 text-[var(--gp-primary)]">DELUXE BUNDLE</h3>
                        <p className="gzs-body opacity-60 mb-10 text-lg leading-relaxed">The ultimate collection of skins and accessories to dominate the battlefield in style.</p>
                        <button className="text-sm font-black uppercase tracking-widest border-b-2 border-[var(--gp-primary)] pb-1 text-[var(--gp-primary)] hover:opacity-70 transition-opacity">VIEW BUNDLE →</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
