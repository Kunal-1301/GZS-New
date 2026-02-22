export default function MediaGallerySection() {
    const characters = [
        { name: "CLOVE", src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600", wide: true },
        { name: "JETT", src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600" },
        { name: "REYNA", src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600" },
        { name: "PHOENIX", src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600" },
        { name: "OMEN", src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600" }
    ];

    return (
        <section className="max-w-[1200px] mx-auto px-6 pb-20">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x pt-2">
                {characters.map((char, index) => (
                    <div key={index} className={`relative aspect-[3/4] rounded-xl overflow-hidden shrink-0 snap-start border border-white/10 shadow-sm ${char.wide ? 'w-[280px] md:w-[360px] aspect-[4/3] md:aspect-video' : 'w-[160px] md:w-[200px]'}`}>
                        <img src={char.src} alt={char.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        <h3 className="absolute bottom-4 left-4 text-white font-black text-2xl tracking-widest uppercase"
                            style={{ fontFamily: 'Impact, "Arial Narrow", sans-serif' }}>
                            {char.name}
                        </h3>
                    </div>
                ))}
            </div>
        </section>
    );
}
