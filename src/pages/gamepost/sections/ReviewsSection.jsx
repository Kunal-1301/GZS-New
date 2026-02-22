export default function ReviewsSection({ expert, user }) {
    return (
        <section className="max-w-[1440px] mx-auto px-6 py-20 font-jetmono">

            <h2 className="text-[2.25rem] font-black uppercase tracking-wide mb-14
                     text-[var(--gp-text-heading)]">
                Reviews
            </h2>

            {/* Expert Reviews */}
            <h3 className="text-base font-bold uppercase tracking-[0.12em] mb-8 text-[var(--gp-text-body)]">
                Expert Reviews
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mb-20">
                {expert?.map((r, i) => (
                    <div
                        key={i}
                        className={`rounded-2xl p-10 border transition
              ${i === 1
                                ? "bg-[var(--gp-quote-bg)] text-[var(--gp-text-on-accent)] border-transparent"
                                : "bg-[var(--gp-bg-card-alt)] text-[var(--gp-text-body)] border-[var(--gp-border)]"
                            }`}
                    >
                        <div className="text-5xl font-black mb-6 leading-none opacity-60">"</div>
                        <p className="text-base leading-relaxed mb-8">{r.quote}</p>
                        <p className="text-[15px] font-bold uppercase tracking-wide">
                            {r.site} — {r.rating}/{r.max_rating}
                        </p>
                    </div>
                ))}
            </div>

            {/* User Reviews */}
            <h3 className="text-base font-bold uppercase tracking-[0.12em] mb-8 text-[var(--gp-text-body)]">
                User Reviews
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
                {user?.map((r, i) => (
                    <div
                        key={i}
                        className={`rounded-2xl p-10 border transition
              ${i === 1
                                ? "bg-[var(--gp-quote-bg)] text-[var(--gp-text-on-accent)] border-transparent"
                                : "bg-[var(--gp-bg-card-alt)] text-[var(--gp-text-body)] border-[var(--gp-border)]"
                            }`}
                    >
                        <div className="text-5xl font-black mb-6 leading-none opacity-60">"</div>
                        <p className="text-base leading-relaxed mb-8">{r.comment}</p>
                        <p className="text-[15px] font-bold uppercase tracking-wide">
                            {r.username} — {r.rating}/10
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
