/**
 * PageHero — Reusable full-bleed hero section
 *
 * Props:
 *   bgImage      {string}  – URL or imported image for the background
 *   title        {string}  – Main heading (displayed in uppercase)
 *   subtitle     {string}  – Optional subtitle beneath the heading
 *   overlayColor {string}  – Tailwind arbitrary bg, e.g. "rgba(4,34,50,0.70)"
 *   minHeight    {string}  – CSS min-height, default "50vh"
 *   textAlign    {string}  – "center" | "left" — default "center"
 *   children     {node}    – Optional extra content below subtitle
 */
function PageHero({
    bgImage = '',
    title = '',
    subtitle = '',
    overlayColor = 'rgba(0,0,0,0.60)',
    minHeight = '50vh',
    textAlign = 'center',
    children,
}) {
    const alignClass = textAlign === 'left' ? 'items-start text-left' : 'items-center text-center';

    return (
        <section
            className="relative w-full flex flex-col justify-center overflow-hidden"
            style={{ minHeight }}
        >
            {/* Background image */}
            {bgImage && (
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${bgImage})` }}
                    aria-hidden="true"
                />
            )}

            {/* Dark overlay */}
            <div
                className="absolute inset-0"
                style={{ backgroundColor: overlayColor }}
                aria-hidden="true"
            />

            {/* Content */}
            <div className={`relative z-10 flex flex-col ${alignClass} px-6 md:px-16 lg:px-24 py-16 max-w-[1440px] mx-auto w-full`}>
                {title && (
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wider text-white leading-tight mb-4"
                        style={{ fontFamily: 'Impact, "Arial Narrow", sans-serif' }}
                    >
                        {title}
                    </h1>
                )}
                {subtitle && (
                    <p className="max-w-2xl text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
                        {subtitle}
                    </p>
                )}
                {children}
            </div>
        </section>
    );
}

export default PageHero;
