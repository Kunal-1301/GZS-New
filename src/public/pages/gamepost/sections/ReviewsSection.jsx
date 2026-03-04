export default function ReviewsSection({ expert, user }) {
    return (
        <section className="container-global section-padding">

            <div className="mb-16 gp-animate-in">
                <span className="gp-section-label">THE FEEDBACK</span>
                <h2 className="gp-hero-title text-4xl mb-12">
                    REVIEWS
                </h2>

                {/* Expert Reviews */}
                <div className="pl-6 border-l-4 border-[var(--gp-primary)] mb-10">
                    <h3 className="gp-hero-title text-2xl tracking-wide opacity-80">EXPERT CRITICS</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {expert?.map((r, i) => (
                        <div
                            key={i}
                            className={`rounded-[2rem] p-10 border transition-all duration-500 gp-animate-in
                  ${i === 1
                                    ? "bg-[var(--gp-primary)] text-white border-transparent shadow-2xl scale-105 z-10"
                                    : "bg-white/60 text-[var(--gp-text-body)] border-[var(--gp-border)] hover:bg-white"
                                }`}
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <span className="text-6xl font-serif mb-6 block opacity-30 leading-none">“</span>
                            <p className="gzs-body mb-8 text-lg font-medium leading-relaxed italic">{r.quote}</p>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className={`font-black uppercase tracking-widest text-sm ${i === 1 ? 'text-white' : 'text-[var(--gp-primary)]'}`}>{r.site}</p>
                                    <p className={`text-[11px] font-bold ${i === 1 ? 'text-white/60' : 'text-[var(--gp-text-muted)]'}`}>VERIFIED EXPERT</p>
                                </div>
                                <div className={`text-2xl font-black ${i === 1 ? 'text-white' : 'text-[var(--gp-text-body)]'}`}>
                                    {r.rating}
                                    <span className="text-sm opacity-50 ml-1">/{r.max_rating}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* User Reviews */}
                <div className="pl-6 border-l-4 border-[var(--gp-primary)] mb-10">
                    <h3 className="gp-hero-title text-2xl tracking-wide opacity-80">COMMUNITY VOICES</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {user?.map((r, i) => (
                        <div
                            key={i}
                            className={`rounded-[2rem] p-10 border border-[var(--gp-border)] bg-white/40 backdrop-blur-sm gp-card-hover gp-animate-in`}
                            style={{ animationDelay: `${i * 150}ms` }}
                        >
                            <span className="text-6xl font-serif mb-6 block opacity-20 leading-none">“</span>
                            <p className="gzs-body mb-10 font-medium leading-relaxed">{r.comment}</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-[var(--gp-primary)]/10 flex items-center justify-center font-black text-[var(--gp-primary)]">
                                    {r.username[0].toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-black text-sm uppercase text-[var(--gp-text-body)]">{r.username}</p>
                                    <p className="text-[11px] font-bold text-[var(--gp-text-muted)] uppercase tracking-tighter">{r.rating}/10 RATING</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
