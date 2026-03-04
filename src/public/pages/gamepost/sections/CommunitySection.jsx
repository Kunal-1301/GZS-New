export default function CommunitySection() {
    return (
        <section className="container-global section-padding">

            {/* Section Title */}
            <div className="mb-16 gp-animate-in">
                <span className="gp-section-label flex items-center gap-3">
                    <span className="w-8 h-[2px] bg-[var(--gp-primary)]"></span>
                    THE HUB
                </span>
                <h2 className="gp-hero-title text-6xl md:text-7xl text-[var(--theme-text)]">
                    COMMUNITY HUB
                </h2>
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-10">

                {/* ================= LIVE CHAT ================= */}
                <div className="lg:col-span-2 bg-white/90 backdrop-blur-xl border border-[var(--gp-border)] rounded-[2.5rem] p-10 flex flex-col justify-between min-h-[420px] gp-card-hover gp-animate-in shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:border-[var(--gp-primary)] transition-all duration-500 relative overflow-hidden">

                    <div className="absolute top-0 left-0 w-full h-1 bg-[var(--gp-primary)]"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8 border-b border-[var(--gp-border)] pb-6">
                            <div className="relative">
                                <div className="w-14 h-14 relative rounded-full bg-[var(--gp-primary)] flex items-center justify-center text-white border-2 border-white shadow-sm">
                                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                                </div>
                            </div>
                            <div>
                                <h3 className="gp-hero-title text-3xl tracking-widest text-[var(--theme-text)]">LIVE CHATROOM</h3>
                                <p className="text-[12px] font-black text-[var(--gp-primary)] uppercase tracking-[0.3em] flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[var(--gp-primary)] animate-ping"></span>
                                    2,412 AGENTS ONLINE
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="p-6 bg-[var(--gp-primary)]/5 rounded-2xl border-l-4 border-[var(--gp-primary)] relative overflow-hidden group">
                                <p className="gzs-body text-[15px] leading-relaxed relative z-10 text-[var(--theme-text)]">
                                    <span className="font-black text-[var(--gp-primary)] uppercase tracking-wider text-sm mr-2">@GZONESPHERE:</span>{" "}
                                    Free-for-all mode focused purely on combat. Used primarily for
                                    warm-ups, aim training, and mechanical improvement.
                                </p>
                            </div>
                            <div className="p-6 bg-[var(--gp-bg-page)] rounded-2xl border-l-4 border-gray-300 relative overflow-hidden group">
                                <p className="gzs-body text-[15px] leading-relaxed relative z-10 text-[var(--theme-text)] opacity-80">
                                    <span className="font-black text-[var(--theme-text)] uppercase tracking-wider text-sm mr-2">@ACE_HUNTER:</span>{" "}
                                    Anyone up for some unrated games? Need to test out the new agent Clove.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="mt-10 flex gap-4 relative z-10">
                        <div className="relative flex-1 group">
                            <input
                                type="text"
                                placeholder="TYPE YOUR MESSAGE..."
                                className="w-full bg-[var(--gp-bg-page)] relative border border-[var(--gp-border)] rounded-full px-8 py-5 text-sm font-bold uppercase tracking-widest outline-none focus:border-[var(--gp-primary)] transition-all text-[var(--theme-text)] shadow-sm focus:shadow-md"
                            />
                        </div>

                        <button className="bg-[var(--gp-primary)] text-white text-sm font-black uppercase tracking-widest px-10 rounded-full hover:scale-[1.05] gp-btn-transition shadow-[0_10px_20px_var(--gp-primary-alpha)] hover:shadow-[0_15px_30px_var(--gp-primary-alpha)]">
                            SEND
                        </button>
                    </div>
                </div>

                {/* ================= REVIEW BOX ================= */}
                <div className="bg-[var(--gp-primary)] border border-white/20 rounded-[2.5rem] p-10 min-h-[420px] flex flex-col justify-between gp-card-hover gp-animate-in shadow-[0_20px_50px_var(--gp-primary-alpha)] hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden text-white" style={{ animationDelay: '150ms' }}>

                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[30px] -translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10">
                        <h3 className="gp-hero-title text-3xl tracking-widest mb-8 border-b border-white/20 pb-6 text-white">
                            SHARE YOUR REVIEWS
                        </h3>

                        {/* Username */}
                        <div className="flex items-center gap-4 mb-8 bg-black/10 p-3 rounded-xl border border-white/20 backdrop-blur-md w-max">
                            <div className="w-10 h-10 rounded bg-white text-[var(--gp-primary)] flex items-center justify-center font-black text-sm gp-hero-title shadow-sm">GO</div>
                            <p className="text-[13px] font-black uppercase tracking-widest pr-4 text-white">@GZONEOFFICIAL</p>
                        </div>

                        {/* Role + Rating */}
                        <div className="space-y-8">
                            <div className="flex flex-col gap-3">
                                <span className="text-[11px] font-black uppercase tracking-[0.2em] opacity-80 text-white">SELECT ROLE</span>
                                <select className="bg-white/10 border border-white/30 rounded-xl px-4 py-4 text-sm font-black uppercase tracking-widest outline-none cursor-pointer hover:bg-white/20 focus:border-white transition-all backdrop-blur-md text-white">
                                    <option className="text-black font-bold">GAMER</option>
                                    <option className="text-black font-bold">CRITIC</option>
                                    <option className="text-black font-bold">CASUAL</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-5">
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] font-black uppercase tracking-[0.2em] opacity-80 text-white">RATING</span>
                                    <span className="text-4xl gp-hero-title text-white">8<span className="text-xl opacity-60">/10</span></span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    defaultValue="8"
                                    className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white hover:h-3 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Review Input */}
                    <div className="mt-10 space-y-5 relative z-10">
                        <textarea
                            placeholder="TELL US WHAT YOU THINK..."
                            rows="2"
                            className="w-full bg-black/10 border border-white/30 rounded-2xl px-6 py-5 text-sm font-bold uppercase tracking-widest outline-none resize-none placeholder:text-white/60 focus:bg-black/20 focus:border-white transition-all backdrop-blur-md text-white"
                        />
                        <button className="w-full bg-white text-[var(--gp-primary)] text-sm font-black uppercase tracking-widest py-5 rounded-2xl hover:bg-gray-100 gp-btn-transition shadow-lg hover:shadow-xl">
                            POST REVIEW
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
