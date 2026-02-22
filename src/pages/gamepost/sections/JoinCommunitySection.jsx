export default function JoinCommunitySection() {
    return (
        <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-16 font-jetmono">

            <div className="bg-red-600 rounded-2xl px-10 py-10 flex items-center justify-between">

                {/* Left Title */}
                <h2 className="text-[36px] font-black uppercase text-white tracking-wide">
                    Join Our Community
                </h2>

                {/* Right Social Icons */}
                <div className="flex items-center gap-6">

                    {["IG", "YT", "RD", "DC", "TW"].map((icon) => (
                        <div
                            key={icon}
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-600 text-sm font-bold cursor-pointer hover:scale-105 transition"
                        >
                            {icon}
                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
}
