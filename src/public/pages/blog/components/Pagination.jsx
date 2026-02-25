import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';

/**
 * Pagination Component
 * @param {number} currentPage - Current page number
 * @param {number} totalPages - Total number of pages
 * @param {function} onPageChange - Page change handler
 * @param {string} variant - 'default' | 'arrows-only'
 * @param {string} accent - Active page accent color ('yellow' | 'green' | 'red' | 'blue')
 */
function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  variant = 'arrows-only',
  accent = 'yellow',
}) {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange?.(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange?.(currentPage + 1);
    }
  };

  // Accent color map (active page + next button)
  const accentActiveClass = {
    green: 'bg-green-600 hover:bg-green-700',
    red: 'bg-red-500 hover:bg-red-600',
    blue: 'bg-[#1a4a5e] hover:bg-[#0d3a4e]',
    yellow: 'bg-yellow-500 hover:bg-yellow-600',
  }[accent] ?? 'bg-yellow-500 hover:bg-yellow-600';

  if (variant === 'arrows-only') {
    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="bl-icon-btn disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <HiArrowLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`w-10 h-10 flex items-center justify-center ${accentActiveClass} disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-colors text-white`}
          aria-label="Next page"
        >
          <HiArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // Default numbered pagination
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="bl-icon-btn disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <HiArrowLeft className="w-4 h-4" />
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange?.(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${page === currentPage
              ? `${accentActiveClass} text-white`
              : 'border border-neutral-300 text-neutral-700 hover:bg-neutral-100'
            }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`w-10 h-10 flex items-center justify-center ${accentActiveClass} disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-colors text-white`}
        aria-label="Next page"
      >
        <HiArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export default Pagination;
