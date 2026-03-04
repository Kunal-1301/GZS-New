import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function MoreLikeThisSection() {
    const games = [
        { name: "APEX LEGENDS", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400", active: false },
        { name: "DESTINY 2", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400", active: false },
        { name: "CS2", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400", active: true },
        { name: "FORTNITE", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400", active: false },
    ];

    return (
        <section className="container-global section-padding">
            <div className="flex justify-between items-end border-b-2 border-[var(--gp-border)] pb-6 mb-12 gp-animate-in">
                <div>
                    <span className="gp-section-label">SIMILAR GAMES</span>
                    <h2 className="gp-hero-title text-4xl">
                        MORE LIKE THIS
                    </h2>
                </div>
                <div className="flex gap-3">
                    <button className="w-12 h-12 flex items-center justify-center bg-white text-[var(--gp-primary)] border border-[var(--gp-border)] rounded-full transition-all hover:bg-[var(--gp-primary)] hover:text-white shadow-sm gp-btn-transition">
                        <FiChevronLeft size={24} />
                    </button>
                    <button className="w-12 h-12 flex items-center justify-center bg-[var(--gp-primary)] text-white rounded-full transition-all hover:translate-x-1 shadow-lg shadow-[var(--gp-primary-alpha)] gp-btn-transition">
                        <FiChevronRight size={24} />
                    </button>
                </div>
            </div>

            <div className="flex gap-8 overflow-x-auto scrollbar-hide snap-x pt-4 items-center pb-8">
                {games.map((g, i) => (
                    <Link key={i} to={`/games/${g.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className={`group relative block rounded-3xl overflow-hidden shadow-xl shrink-0 snap-center transition-all duration-500 gp-animate-in
                          ${g.active ? 'w-[280px] aspect-[4/5] border-[4px] border-[var(--gp-primary)] scale-105 z-10' : 'w-[220px] aspect-[3/4] border border-[var(--gp-border)] opacity-70 hover:opacity-100 hover:scale-105 hover:z-20'}
                          `}
                        style={{ animationDelay: `${i * 100}ms` }}>
                        <img src={g.img} alt={g.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                        <div className="absolute bottom-0 left-0 w-full p-6">
                            {g.active && (
                                <span className="inline-block px-4 py-1.5 bg-[var(--gp-primary)] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-md mb-4 shadow-xl">
                                    TOP PICK
                                </span>
                            )}
                            <h4 className="text-white gp-hero-title text-2xl tracking-widest uppercase mb-4">
                                {g.name}
                            </h4>
                            <div className="w-full py-3 bg-white/20 hover:bg-white text-white hover:text-black text-[11px] font-black uppercase tracking-[0.2em] border border-white/30 rounded-full transition-all backdrop-blur-md text-center">
                                VIEW PROFILE
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
