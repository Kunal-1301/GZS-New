export default function GameplaySection({ gameplay }) {
    return (
        <section className="max-w-[1200px] mx-auto px-6 py-20 font-jetmono">

            {/* Section Title */}
            <h2 className="text-[40px] font-black uppercase tracking-wide text-red-600 mb-10">
                Gameplay
            </h2>

            {/* Intro Paragraph */}
            <p className="text-[20px] leading-relaxed text-black mb-8 max-w-4xl">
                VALORANT is a tactical 5v5 first-person shooter that emphasizes precision,
                strategy, and teamwork. Every match is divided into rounds where players
                take on the role of attackers or defenders, with success depending on
                coordination, positioning, and smart decision-making rather than raw
                firepower alone.
            </p>

            {/* Bullet Gameplay Points */}
            <div className="space-y-6 max-w-4xl">
                {gameplay.map((g, i) => (
                    <div key={i}>
                        <p className="text-[20px] leading-relaxed text-black">
                            <span className="font-bold uppercase">
                                • {g.gameplay_title}
                            </span>{" "}
                            : {g.gameplay_title_desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
