export default function MediaGallerySection() {
    const characters = [
        { name: "CLOVE", src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400", wide: true },
        { name: "JETT", src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400" },
        { name: "REYNA", src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400" },
        { name: "PHOENIX", src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400" },
        { name: "OMEN", src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400" }
    ];

    // Duplicate the array twice to ensure seamless infinite looping with CSS translateX(-50%)
    const carouselItems = [...characters, ...characters];

    return (
        <section className="w-full section-padding !pt-0 overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--gp-bg-page)] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--gp-bg-page)] to-transparent z-10 pointer-events-none" />

            <div className="flex gap-6 items-end animate-continuous-scroll w-max hover:pause">
                {carouselItems.map((char, index) => (
                    <div
                        key={index}
                        className={`group relative rounded-3xl overflow-hidden shrink-0 border border-white/20 shadow-[0_15px_30px_rgba(0,0,0,0.1)] gp-card-hover
                            ${char.wide ? 'w-[320px] md:w-[480px] aspect-video md:aspect-[16/10]' : 'w-[180px] md:w-[240px] aspect-[3/4]'} 
                            ml-0`}
                    >
                        <img
                            src={char.src}
                            alt={char.name}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.10]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--gp-primaryDark)]/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                        <h3 className="absolute bottom-6 left-6 text-white gp-hero-title text-3xl tracking-widest uppercase drop-shadow-md">
                            {char.name}
                        </h3>
                    </div>
                ))}
            </div>
        </section>
    );
}






