export default function JoinCommunitySection() {
    return (
        <section className="container-global section-padding !pt-0 pb-32">

            <div className="relative bg-[var(--gp-primary)] rounded-[3rem] px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-8 gp-animate-in overflow-hidden shadow-[0_15px_40px_var(--gp-primary-alpha)] hover:shadow-[0_20px_50px_var(--gp-primary-alpha)] hover:-translate-y-1 transition-all duration-500 gp-card-hover group border border-white/20">

                {/* Decorative background effects */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[40px] translate-x-1/3 -translate-y-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-1000"></div>

                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none opacity-40"></div>

                {/* Left Title */}
                <div className="relative z-10 text-center md:text-left">
                    <span className="text-white/80 text-sm font-black uppercase tracking-[0.3em] mb-2 block border-l-2 border-white pl-3 ml-1">STAY CONNECTED</span>
                    <h2 className="gp-hero-title text-5xl md:text-6xl text-white tracking-widest drop-shadow-sm">
                        JOIN OUR COMMUNITY
                    </h2>
                </div>

                {/* Right Social Icons */}
                <div className="flex items-center gap-4 md:gap-6 relative z-10 flex-wrap justify-center">

                    {["IG", "YT", "RD", "DC", "TW"].map((icon, idx) => (
                        <div
                            key={icon}
                            className={`w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl flex items-center justify-center text-[var(--gp-primary)] text-lg gp-hero-title cursor-pointer group/icon relative overflow-hidden gp-animate-scale shadow-sm hover:shadow-lg transition-shadow bg-opacity-90 backdrop-blur-sm`}
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            {/* Hover glow in icon */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--gp-primary)]/10 to-transparent translate-y-[100%] group-hover/icon:translate-y-0 transition-transform duration-300"></div>

                            {/* Inner border scale */}
                            <div className="absolute inset-1 border border-[var(--gp-primary)]/20 rounded-xl opacity-0 group-hover/icon:opacity-100 group-hover/icon:scale-95 transition-all duration-300"></div>

                            <span className="relative z-10 group-hover/icon:scale-110 group-hover/icon:text-[var(--gp-primaryDark)] transition-transform drop-shadow-sm">{icon}</span>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}
