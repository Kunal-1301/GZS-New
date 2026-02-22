export default function CommunitySection() {
    return (
        <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-24 font-jetmono">

            {/* Section Title */}
            <h2 className="text-[42px] font-black uppercase text-red-600 tracking-wide mb-16">
                Community Hub
            </h2>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-10">

                {/* ================= LIVE CHAT ================= */}
                <div className="lg:col-span-2 bg-[#EED2D2] border border-black/30 rounded-2xl p-8 flex flex-col justify-between min-h-[360px]">

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6">
                            Live Chatroom
                        </h3>

                        <p className="text-sm leading-relaxed">
                            <span className="font-bold">@GZONESPHERE:</span>{" "}
                            Free-for-all mode focused purely on combat. Used primarily for
                            warm-ups, aim training, and mechanical improvement.
                        </p>
                    </div>

                    {/* Input */}
                    <div className="mt-8 flex gap-4">
                        <input
                            type="text"
                            placeholder="Type message"
                            className="flex-1 bg-white border border-black/30 rounded-md px-4 py-3 text-sm outline-none"
                        />

                        <button className="bg-red-600 text-white text-xs uppercase tracking-widest px-6 rounded-md hover:bg-red-700 transition">
                            Send →
                        </button>
                    </div>
                </div>

                {/* ================= REVIEW BOX ================= */}
                <div className="bg-[#EED2D2] border border-black/30 rounded-2xl p-8 min-h-[360px] flex flex-col justify-between">

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6">
                            Share Your Reviews
                        </h3>

                        {/* Username */}
                        <p className="text-xs uppercase tracking-widest mb-6">
                            Username: <span className="font-bold">@GZONEOFFICIAL</span>
                        </p>

                        {/* Role + Rating */}
                        <div className="flex items-center justify-between mb-8">
                            <select className="bg-white border border-black/30 rounded-md px-3 py-2 text-sm outline-none">
                                <option>Gamer</option>
                                <option>Critic</option>
                                <option>Casual</option>
                            </select>

                            <div className="flex items-center gap-3">
                                <span className="text-xs uppercase">Rate</span>
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    defaultValue="8"
                                    className="accent-red-600"
                                />
                                <span className="text-sm font-bold">8/10</span>
                            </div>
                        </div>

                        {/* Review Input */}
                        <textarea
                            placeholder="Type message"
                            rows="3"
                            className="w-full bg-white border border-black/30 rounded-md px-4 py-3 text-sm outline-none resize-none"
                        />
                    </div>

                    {/* Button */}
                    <button className="mt-6 bg-red-600 text-white text-xs uppercase tracking-widest px-6 py-3 rounded-md hover:bg-red-700 transition">
                        Post Review →
                    </button>
                </div>

            </div>
        </section>
    );
}
