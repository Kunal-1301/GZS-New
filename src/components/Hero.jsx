import placeholderWhite from '../assets/images/placeholderWhite.svg';

/**
 * Reusable Hero Component
 * @param {string} backgroundImage - URL or imported image for background
 * @param {string} title - Main hero title
 * @param {string} subtitle - Optional subtitle text
 * @param {string} overlayColor - Optional overlay (default: subtle gradient)
 * @param {string} minHeight - Optional minimum height (default: 70vh)
 */
function Hero({
  backgroundImage = placeholderWhite,
  title = 'BLOGS & GUIDES',
  subtitle = 'Insights, reviews, and expert content connected to games, platforms, and competitive play on GzoneSphere.',
  overlayColor = '',
  minHeight = 'min-h-[70vh]',
}) {
  return (
    <section
      className={`relative w-full ${minHeight} flex items-center justify-center overflow-hidden`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Optional Overlay */}
      {overlayColor && (
        <div className={`absolute inset-0 ${overlayColor}`} />
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-wider mb-6 drop-shadow-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto drop-shadow-md">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

export default Hero;
