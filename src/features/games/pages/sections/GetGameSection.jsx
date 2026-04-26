import { FiMonitor } from 'react-icons/fi';
import { FaXbox, FaPlaystation, FaSteam, FaWindows } from 'react-icons/fa';

export default function GetGameSection({ getGame }) {
    if (!getGame) return null;
    const platformIcons = {
        PC: <FiMonitor />,
        Steam: <FaSteam />,
        PlayStation: <FaPlaystation />,
        PS4: <FaPlaystation />,
        PS5: <FaPlaystation />,
        Xbox: <FaXbox />,
        'Xbox One': <FaXbox />,
        'Xbox Series X': <FaXbox />,
        Windows: <FaWindows />,
    };
    const platforms = Array.isArray(getGame.platforms) && getGame.platforms.length > 0
        ? getGame.platforms
        : ['PC'];
    const primaryOffer = getGame.primaryOffer || {};
    const secondaryOffer = getGame.secondaryOffer || {};
    return (
        <section className="container-global section-padding relative">

            <div className="absolute top-0 left-[20%] w-[300px] h-[300px] bg-[var(--gp-primary)]/5 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="space-y-12 relative z-10">
                {/* Main Get Game Bar */}
                <div className="bg-white/90 backdrop-blur-xl border border-[var(--gp-border)] rounded-3xl py-10 px-12 flex flex-col md:flex-row items-center justify-between text-[var(--theme-text)] shadow-[0_20px_40px_rgba(0,0,0,0.08)] relative overflow-hidden gp-animate-in hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-shadow duration-500 group">

                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 w-[60%] h-[200%] bg-gradient-to-l from-[var(--gp-primary)]/10 to-transparent skew-x-[-35deg] translate-x-20 origin-top-right group-hover:scale-110 transition-transform duration-700 opacity-80" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 mix-blend-overlay"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--gp-primary)]"></div>

                    <h2 className="gp-hero-title text-5xl mb-8 md:mb-0 relative z-10 tracking-[0.15em] drop-shadow-sm text-[var(--theme-text)]">
                        GET GAME
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center gap-12 relative z-10 w-full md:w-auto">
                        <div className="flex gap-8 text-3xl text-[var(--theme-text)]/40">
                            {platforms.map((platform) => (
                                <span
                                    key={platform}
                                    className="hover:text-[var(--gp-primary)] transition-all cursor-pointer hover:scale-125"
                                    title={platform}
                                >
                                    {platformIcons[platform] || <FiMonitor />}
                                </span>
                            ))}
                        </div>
                        <a
                            href={getGame.ctaHref || '#'}
                            target={getGame.ctaHref?.startsWith('http') ? '_blank' : undefined}
                            rel={getGame.ctaHref?.startsWith('http') ? 'noreferrer' : undefined}
                            className="relative w-full sm:w-auto px-12 py-5 bg-[var(--gp-primary)] text-white text-sm font-black uppercase tracking-wide rounded-full transition-all hover:scale-[1.05] hover:shadow-[0_10px_20px_var(--gp-primary-alpha)] flex items-center justify-center gap-3 group/btn border-2 border-transparent no-underline"
                        >
                            {getGame.ctaLabel || 'PLAY NOW'}
                            <span className="w-2 h-2 bg-white/80 rounded-full animate-ping"></span>
                        </a>
                    </div>
                </div>

                {/* Purchase Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-[var(--gp-primary)] border border-white/20 p-12 rounded-3xl text-white gp-card-hover gp-animate-in shadow-[0_15px_40px_var(--gp-primary-alpha)] hover:-translate-y-3 relative overflow-hidden group">

                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-[30px] -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors"></div>
                        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/30 group-hover:border-white transition-colors"></div>

                        <span className="relative z-10 inline-block px-3 py-1 bg-white/10 text-xs font-black uppercase tracking-wide text-white rounded mb-6 backdrop-blur-sm border border-white/10">{primaryOffer.eyebrow || 'OFFICIAL ACCESS'}</span>
                        <h3 className="relative z-10 gp-hero-title text-4xl mb-6 tracking-wide drop-shadow-sm">{primaryOffer.title || 'PLAY THE LATEST BUILD'}</h3>
                        <p className="relative z-10 gzs-body text-white/90 mb-10 text-lg leading-relaxed font-semibold">{primaryOffer.description || 'Access the game from the official source or the storefront your profile already uses.'}</p>
                        <button className="relative z-10 text-sm font-black uppercase tracking-tight border-b-2 border-white/40 pb-1 hover:border-white hover:text-white transition-all group-hover:pr-4 group-hover:-tracking-[-0.25em]">SHOP PACKS →</button>
                    </div>

                    <div className="bg-white/90 backdrop-blur-xl border border-[var(--gp-border)] p-12 rounded-3xl text-[var(--theme-text)] gp-card-hover gp-animate-in hover:border-[var(--gp-primary)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-3 relative group">

                        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[var(--gp-border)] group-hover:border-[var(--gp-primary)] transition-colors"></div>
                        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[var(--gp-border)] group-hover:border-[var(--gp-primary)] transition-colors"></div>

                        <span className="relative z-10 inline-block px-3 py-1 bg-[var(--gp-primary)]/10 text-xs font-black uppercase tracking-wide text-[var(--gp-primaryDark)] rounded mb-6 font-bold">UPGRADE YOUR GAME</span>
                        <h3 className="relative z-10 gp-hero-title text-4xl mb-6 text-[var(--theme-text)] tracking-wide group-hover:text-[var(--gp-primaryDark)] transition-colors">DELUXE BUNDLE</h3>
                        <p className="relative z-10 gzs-body text-[var(--gp-text-body)] mb-10 text-lg leading-relaxed font-bold">The ultimate collection of skins and accessories to dominate the battlefield in style.</p>
                        <button className="relative z-10 text-sm font-black uppercase tracking-tight border-b-2 border-[var(--gp-primary)]/40 pb-1 text-[var(--gp-primaryDark)] hover:border-[var(--gp-primaryDark)] transition-all group-hover:pr-4 group-hover:-tracking-[-0.25em]">VIEW BUNDLE →</button>
                    </div>
                </div>
            </div>
        </section>
    );
}








