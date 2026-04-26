import { FiExternalLink } from 'react-icons/fi';

export default function StoreExtrasSection({ extras, purchaseLinks = [] }) {
  if (!extras && purchaseLinks.length === 0) return null;

  const dlcList   = extras?.proFeatures || [];
  const awardList = extras?.bonuses     || [];

  return (
    <section className="container-global section-padding !pt-0">

      {/* Store Links */}
      {purchaseLinks.length > 0 && (
        <div className="mb-10 gp-animate-in">
          <div className="flex items-center gap-4 mb-6 pl-6 border-l-4 border-[var(--gp-primary)]">
            <h3 className="gp-hero-title text-3xl tracking-widest text-[var(--theme-text)]">
              STORE LINKS
            </h3>
          </div>
          <div className="flex flex-wrap gap-4">
            {purchaseLinks.map((link, i) => (
              <a
                key={i}
                href={link.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-md group"
                style={{
                  background: 'var(--gp-primary)',
                  borderColor: 'var(--gp-primary)',
                  color: '#fff',
                }}
              >
                <span className="font-black text-sm uppercase tracking-wide">{link.platform}</span>
                {link.price && (
                  <span className="text-xs font-semibold opacity-80 border-l border-white/30 pl-3">
                    {link.price}
                  </span>
                )}
                <FiExternalLink size={14} className="opacity-70 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* DLC & Extras */}
        {dlcList.length > 0 && (
          <div
            className="p-12 rounded-3xl relative overflow-hidden shadow-[0_15px_30px_var(--gp-primary-alpha)] hover:shadow-[0_20px_50px_var(--gp-primary-alpha)] transition-all duration-500 hover:-translate-y-2 gp-card-hover gp-animate-in group border border-white/20"
            style={{ background: 'var(--gp-primary)' }}
          >
            {/* Decorative overlay */}
            <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-white/10 to-transparent skew-x-[-30deg] translate-x-20 origin-top-right group-hover:scale-110 transition-transform duration-700 opacity-60" />

            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/40 group-hover:border-white transition-colors" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/40 group-hover:border-white transition-colors" />

            <h4 className="gp-hero-title text-3xl text-white mb-10 relative z-10 border-b border-white/30 pb-6 drop-shadow-sm">
              DLC &amp; EXTRAS
            </h4>

            <div className="space-y-8 relative z-10">
              {dlcList.map((text, i) => (
                <div key={i} className="flex items-start gap-5 text-white/90 group/item">
                  <div className="w-2.5 h-2.5 rounded-full bg-white mt-2 shrink-0 group-hover/item:scale-150 transition-transform shadow-sm" />
                  <p className="gzs-body text-base font-bold uppercase tracking-wider leading-relaxed group-hover/item:text-white transition-colors">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-14 relative z-10">
              <button className="px-10 py-5 bg-white text-[var(--gp-primary)] text-sm font-black uppercase tracking-wide rounded-full transition-all hover:scale-[1.05] shadow-md hover:shadow-xl flex items-center gap-3 w-fit border-2 border-transparent">
                VIEW ALL DLC <span className="font-serif text-lg leading-none">→</span>
              </button>
            </div>
          </div>
        )}

        {/* Awards & Achievements */}
        {awardList.length > 0 && (
          <div
            className="bg-white/80 backdrop-blur-xl border border-[var(--gp-border)] p-12 rounded-3xl relative overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] hover:border-[var(--gp-primary)] transition-all duration-500 hover:-translate-y-2 gp-card-hover gp-animate-in group text-[var(--theme-text)]"
            style={{ animationDelay: '150ms' }}
          >
            {/* Decorative */}
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--gp-primary)]/5 rounded-full translate-x-1/3 translate-y-1/3 blur-[60px] group-hover:bg-[var(--gp-primary)]/10 transition-colors duration-700" />

            {/* Corner accents */}
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[var(--gp-border)] group-hover:border-[var(--gp-primary)] transition-colors" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[var(--gp-border)] group-hover:border-[var(--gp-primary)] transition-colors" />

            <div className="flex items-center gap-4 mb-10 border-b border-[var(--gp-border)] pb-6 relative z-10">
              <span className="w-8 h-[2px] bg-[var(--gp-primary)]" />
              <h4 className="gp-hero-title text-3xl text-[var(--theme-text)] drop-shadow-sm">
                AWARDS &amp; ACHIEVEMENTS
              </h4>
            </div>

            <div className="space-y-8 relative z-10">
              {awardList.map((text, i) => (
                <div key={i} className="flex items-start gap-5 text-[var(--gp-text-body)] group/item">
                  <div className="w-2.5 h-2.5 rounded-sm bg-[var(--gp-primary)] mt-2 shrink-0 rotate-45 group-hover/item:rotate-90 group-hover/item:scale-125 transition-all duration-300 shadow-sm" />
                  <p className="gzs-body text-base font-bold uppercase tracking-wider leading-relaxed group-hover/item:text-[var(--theme-text)] transition-colors">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-14 relative z-10 flex items-center justify-between border-t border-[var(--gp-border)] pt-8">
              <span className="text-xs font-black uppercase tracking-wider text-[var(--gp-primary)]">COMMUNITY RECOGNITION</span>
              <div className="w-2 h-2 bg-[var(--gp-primary)] rounded-full animate-ping" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
