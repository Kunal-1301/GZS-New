export default function CommunitySection() {
    return (
        <section className="container-global section-padding">

            {/* Section Title */}
            <div className="mb-16 gp-animate-in">
                <span className="gp-section-label">THE HUB</span>
                <h2 className="gp-hero-title text-4xl">
                    COMMUNITY HUB
                </h2>
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-10">

                {/* ================= LIVE CHAT ================= */}
                <div className="lg:col-span-2 bg-white/60 backdrop-blur-md border border-[var(--gp-border)] rounded-[2.5rem] p-10 flex flex-col justify-between min-h-[420px] gp-card-hover gp-animate-in shadow-xl">

                    <div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full bg-[var(--gp-primary)] flex items-center justify-center text-white animate-pulse">
                                <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                            <div>
                                <h3 className="gp-hero-title text-xl tracking-wider">LIVE CHATROOM</h3>
                                <p className="text-[10px] font-bold text-[var(--gp-primary)] uppercase tracking-widest">2,412 AGENTS ONLINE</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="p-5 bg-black/5 rounded-2xl border-l-4 border-[var(--gp-primary)]">
                                <p className="gzs-body text-sm leading-relaxed">
                                    <span className="font-black text-[var(--gp-primary)]">@GZONESPHERE:</span>{" "}
                                    Free-for-all mode focused purely on combat. Used primarily for
                                    warm-ups, aim training, and mechanical improvement.
                                </p>
                            </div>
                            <div className="p-5 bg-white/40 rounded-2xl border-l-4 border-black/10">
                                <p className="gzs-body text-sm leading-relaxed">
                                    <span className="font-black">@ACE_HUNTER:</span>{" "}
                                    Anyone up for some unrated games? Need to test out the new agent Clove.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="mt-10 flex gap-4">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="TYPE YOUR MESSAGE..."
                                className="w-full bg-white/80 border border-[var(--gp-border)] rounded-full px-8 py-5 text-xs font-bold uppercase tracking-widest outline-none focus:border-[var(--gp-primary)] transition-all shadow-inner"
                            />
                        </div>

                        <button className="bg-[var(--gp-primary)] text-white text-xs font-black uppercase tracking-widest px-10 rounded-full hover:bg-[var(--gp-primary-dark)] gp-btn-transition shadow-lg shadow-[var(--gp-primary-alpha)]">
                            SEND
                        </button>
                    </div>
                </div>

                {/* ================= REVIEW BOX ================= */}
                <div className="bg-[var(--gp-primary)] border border-white/10 rounded-[2.5rem] p-10 min-h-[420px] flex flex-col justify-between gp-card-hover gp-animate-in shadow-2xl relative overflow-hidden text-white" style={{ animationDelay: '150ms' }}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -rotate-45 translate-x-16 -translate-y-16" />

                    <div>
                        <h3 className="gp-hero-title text-xl tracking-widest mb-8 border-b border-white/20 pb-4">
                            SHARE YOUR REVIEWS
                        </h3>

                        {/* Username */}
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-black text-xs">GO</div>
                            <p className="text-[11px] font-black uppercase tracking-widest">@GZONEOFFICIAL</p>
                        </div>

                        {/* Role + Rating */}
                        <div className="space-y-6">
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">SELECT ROLE</span>
                                <select className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs font-bold uppercase outline-none cursor-pointer hover:bg-white/20 transition-all">
                                    <option className="text-black">Gamer</option>
                                    <option className="text-black">Critic</option>
                                    <option className="text-black">Casual</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">RATING</span>
                                    <span className="text-xl font-black">8/10</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    defaultValue="8"
                                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Review Input */}
                    <div className="mt-8 space-y-4">
                        <textarea
                            placeholder="TELL US WHAT YOU THINK..."
                            rows="2"
                            className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-xs font-bold uppercase tracking-widest outline-none resize-none placeholder:text-white/40 focus:bg-white/20 transition-all"
                        />
                        <button className="w-full bg-white text-[var(--gp-primary)] text-xs font-black uppercase tracking-widest py-4 rounded-full hover:bg-white/90 gp-btn-transition shadow-xl">
                            POST REVIEW
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
