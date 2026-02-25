export default function QuickControlSection({ controls }) {
    return (
        <section className="max-w-[1350px] mx-auto px-4 lg:px-8 py-20 font-jetmono">

            {/* Section Title */}
            <h2 className="text-[36px] font-black uppercase text-red-600 text-center tracking-wide mb-14">
                Quick Control Overview
            </h2>

            {/* Controls Grid */}
            <div className="grid md:grid-cols-2 gap-8">
                {controls.map((c, i) => (
                    <div
                        key={i}
                        className="bg-[#e7bcbc] border border-black/40 rounded-2xl p-8 flex gap-6 items-start"
                    >
                        {/* Left Icon Placeholder */}
                        <div className="w-12 h-12 border-2 border-black/40 rotate-45 flex-shrink-0 mt-1" />

                        {/* Text Content */}
                        <div>
                            <h3 className="text-[14px] font-bold uppercase tracking-wide mb-2">
                                {c.qco_title}
                            </h3>
                            <p className="text-[13px] leading-relaxed text-black/80">
                                {c.qco_title_desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
