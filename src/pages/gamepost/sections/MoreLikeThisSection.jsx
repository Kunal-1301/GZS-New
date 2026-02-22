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
        <section className="max-w-[1200px] mx-auto px-6 py-10 pb-20">
            <div className="flex justify-between items-end border-b border-[var(--gp-border)] pb-4 mb-8">
                <h2 className="text-[2rem] font-black uppercase tracking-wide text-[var(--gp-text-heading)]" style={{ fontFamily: 'Impact, "Arial Narrow", sans-serif' }}>
                    MORE LIKE THIS
                </h2>
                <div className="flex gap-2">
                    <button className="w-8 h-8 flex items-center justify-center bg-[var(--gp-bg-section)] text-[var(--gp-primary)] hover:bg-[var(--gp-border)] rounded transition-colors focus:outline-none shadow-sm">
                        <FiChevronLeft size={20} />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center bg-[var(--gp-primary)] text-white hover:bg-[var(--gp-primary-dark)] rounded transition-colors focus:outline-none shadow-md shadow-[var(--gp-primary-alpha)]">
                        <FiChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x pt-2 items-center">
                {games.map((g, i) => (
                    <Link key={i} to={`/games/${g.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className={`group relative block rounded-xl overflow-hidden shadow-md shrink-0 snap-center transition-all duration-300
                          ${g.active ? 'w-[200px] md:w-[260px] aspect-[4/5] border-[3px] border-[var(--gp-primary)] scale-105 z-10' : 'w-[160px] md:w-[200px] aspect-[3/4] border border-[var(--gp-border)] opacity-80 hover:opacity-100'}
                          `}>
                        <img src={g.img} alt={g.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                        <div className="absolute bottom-0 left-0 w-full p-5 text-center">
                            {g.active && (
                                <span className="inline-block px-3 py-1 bg-[var(--gp-primary)] text-white text-[10px] font-black uppercase tracking-widest rounded-sm mb-3 shadow-[0_0_10px_rgba(229,57,53,0.5)]">
                                    FEATURED
                                </span>
                            )}
                            <h4 className="text-white font-black text-xl tracking-widest uppercase mb-2" style={{ fontFamily: 'Impact, "Arial Narrow", sans-serif' }}>
                                {g.name}
                            </h4>
                            <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest border border-white/20 rounded transition-colors backdrop-blur-sm">
                                View Profile
                            </button>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
