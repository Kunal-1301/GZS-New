export default function MediaGallerySection() {
    const characters = [
        { name: "CLOVE", src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400", wide: true },
        { name: "JETT", src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400" },
        { name: "REYNA", src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400" },
        { name: "PHOENIX", src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400" },
        { name: "OMEN", src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400" }
    ];

    return (
        <section className="container-global section-padding !pt-0">
            <div className="flex gap-6 overflow-x-auto scrollbar-hide snap-x pt-4 items-end">
                {characters.map((char, index) => (
                    <div
                        key={index}
                        className={`group relative rounded-3xl overflow-hidden shrink-0 snap-start border border-[var(--gp-border)] shadow-xl gp-card-hover gp-animate-in 
                            ${char.wide ? 'w-[320px] md:w-[480px] aspect-video md:aspect-[16/10]' : 'w-[180px] md:w-[240px] aspect-[3/4]'}`}
                        style={{ animationDelay: `${index * 150}ms` }}
                    >
                        <img
                            src={char.src}
                            alt={char.name}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                        <h3 className="absolute bottom-6 left-6 text-white gp-hero-title text-3xl tracking-widest uppercase">
                            {char.name}
                        </h3>
                    </div>
                ))}
            </div>
        </section>
    );
}
