export default function CriticRatingSection() {
    return (
        <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-16 font-jetmono">

            <div className="bg-red-600 rounded-2xl px-10 py-12 flex flex-col lg:flex-row items-center justify-between gap-10">

                {/* Left Content */}
                <div>
                    <h2 className="text-[38px] font-black uppercase text-white tracking-wide mb-4">
                        Critic Rating
                    </h2>

                    <p className="text-sm text-white/90">
                        Login as Critic to write the Critic Reviews
                    </p>
                </div>

                {/* Right Side (Form Area) */}
                <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">

                    {/* Email Input */}
                    <input
                        type="email"
                        placeholder="E-mail"
                        className="bg-transparent border border-white/70 text-white placeholder-white/70 rounded-md px-6 py-3 text-sm outline-none w-full sm:w-[260px]"
                    />

                    {/* Login Button */}
                    <button className="bg-white text-black text-xs uppercase tracking-widest px-8 py-3 rounded-md hover:bg-neutral-200 transition w-full sm:w-auto">
                        Login →
                    </button>

                </div>

            </div>

        </section>
    );
}
