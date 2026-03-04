export default function JoinCommunitySection() {
    return (
        <section className="container-global section-padding !pt-0">

            <div className="bg-[var(--gp-primary)] rounded-full px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl gp-animate-in">

                {/* Left Title */}
                <h2 className="gp-hero-title text-3xl text-white tracking-widest text-center md:text-left">
                    JOIN OUR COMMUNITY
                </h2>

                {/* Right Social Icons */}
                <div className="flex items-center gap-6">

                    {["IG", "YT", "RD", "DC", "TW"].map((icon) => (
                        <div
                            key={icon}
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[var(--gp-primary)] text-sm font-black cursor-pointer hover:scale-110 hover:shadow-lg transition-all gp-btn-transition"
                        >
                            {icon}
                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
}
