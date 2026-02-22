import { FiMonitor } from 'react-icons/fi';
import { FaXbox, FaPlaystation, FaSteam } from 'react-icons/fa';

export default function GetGameSection() {
    return (
        <section className="max-w-[1200px] mx-auto px-6 py-10">
            <div className="bg-[var(--gp-primary)] rounded-xl py-6 px-10 flex flex-col md:flex-row items-center justify-between text-white shadow-xl shadow-[var(--gp-primary-alpha)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-full bg-white/5 -skew-x-12 translate-x-10" />

                <h2 className="text-3xl font-black uppercase tracking-widest mb-6 md:mb-0 relative z-10" style={{ fontFamily: 'Impact, "Arial Narrow", sans-serif' }}>
                    GET GAME
                </h2>

                <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10">
                    <div className="flex gap-5 text-2xl opacity-90">
                        <FiMonitor className="hover:text-white hover:scale-110 transition-transform cursor-pointer" />
                        <FaPlaystation className="hover:text-white hover:scale-110 transition-transform cursor-pointer" />
                        <FaXbox className="hover:text-white hover:scale-110 transition-transform cursor-pointer" />
                        <FaSteam className="hover:text-white hover:scale-110 transition-transform cursor-pointer" />
                    </div>
                    {/* Assuming we just link outbound for getting games */}
                    <a href="https://playvalorant.com" target="_blank" rel="noreferrer" className="px-8 py-3.5 bg-[var(--gp-bg-card)] text-[var(--gp-text-heading)] text-sm font-black uppercase tracking-widest rounded transition-all hover:bg-[var(--gp-bg-section)] hover:shadow-md">
                        GET NOW
                    </a>
                </div>
            </div>
        </section>
    );
}
