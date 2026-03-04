import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';

/**
 * Reusable Section Header Component
 * @param {string} title - Section title
 * @param {string} subtitle - Optional subtitle
 * @param {boolean} showNavigation - Show navigation arrows
 * @param {function} onPrev - Previous button handler
 * @param {function} onNext - Next button handler
 * @param {string} align - Text alignment ('center' | 'left')
 * @param {string} accent - Accent color ('yellow' | 'green' | 'red' | 'blue')
 */
function SectionHeader({
  title,
  subtitle = '',
  showNavigation = false,
  onPrev,
  onNext,
  align = 'center',
  accent = 'yellow',
}) {
  const alignmentClass = align === 'center' ? 'text-center' : 'text-left';

  // Accent color map for the active/next navigation button
  const accentButtonClass = {
    green: 'bg-green-600 hover:bg-green-700',
    red: 'bg-red-500 hover:bg-red-600',
    blue: 'bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-dark)]',
    yellow: 'bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-dark)]',
  }[accent] ?? 'bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-dark)]';

  return (
    <div className={`flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8 ${showNavigation ? '' : alignmentClass}`}>
      <div className={align === 'center' && !showNavigation ? 'w-full' : ''}>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wide text-[var(--theme-text)] mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[var(--theme-text-muted)] text-sm max-w-xl">
            {subtitle}
          </p>
        )}
      </div>

      {/* Navigation Arrows */}
      {showNavigation && (
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onPrev}
            className="bl-icon-btn"
            aria-label="Previous"
          >
            <HiArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={onNext}
            className={`w-10 h-10 flex items-center justify-center ${accentButtonClass} rounded-full transition-colors text-white`}
            aria-label="Next"
          >
            <HiArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default SectionHeader;
