/**
 * CTABanner — Full-width accent divider / call-to-action strip
 *
 * Props:
 *   text       {string}   – Banner text (displayed in all-caps)
 *   bgClass    {string}   – Tailwind bg class, default "bg-ab-primary"
 *   textClass  {string}   – Tailwind text class, default "text-white"
 *   size       {string}   – "sm" | "md" | "lg" — controls padding and font size
 *   className  {string}   – Additional wrapper classes
 */
function CTABanner({
    text = '',
    bgClass = 'bg-ab-primary',
    textClass = 'text-white',
    size = 'md',
    className = '',
}) {
    const sizeClasses = {
        sm: 'py-6 text-xl md:text-2xl',
        md: 'py-10 text-2xl md:text-3xl lg:text-4xl',
        lg: 'py-14 text-3xl md:text-4xl lg:text-5xl',
    }[size] ?? 'py-10 text-3xl';

    return (
        <section className={`w-full ${bgClass} ${className}`}>
            <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24 text-center">
                <h2
                    className={`font-black uppercase tracking-wider leading-tight ${sizeClasses} ${textClass}`}
                    style={{ fontFamily: 'Impact, "Arial Narrow", sans-serif' }}
                >
                    {text}
                </h2>
            </div>
        </section>
    );
}

export default CTABanner;
