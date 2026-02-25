import { HiChevronDown } from 'react-icons/hi';

/**
 * Filter/Sort Bar Component
 * @param {array} categories - Array of category strings
 * @param {array} sortOptions - Array of {value, label} objects
 * @param {string} selectedCategory - Currently selected category
 * @param {string} selectedSort - Currently selected sort value
 * @param {function} onCategoryChange - Category change handler
 * @param {function} onSortChange - Sort change handler
 */
function FilterBar({
  categories = [],
  sortOptions = [],
  selectedCategory = 'All',
  selectedSort = 'latest',
  onCategoryChange,
  onSortChange,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6">
      {/* Filter Dropdown */}
      <div className="relative">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange?.(e.target.value)}
          className="appearance-none bg-transparent border border-neutral-400 rounded-sm px-4 py-2 pr-10 text-sm font-medium text-neutral-800 cursor-pointer hover:border-neutral-600 focus:outline-none focus:border-neutral-800 transition-colors"
        >
          <option value="" disabled>FILTER</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.toUpperCase()}
            </option>
          ))}
        </select>
        <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600 pointer-events-none" />
      </div>

      {/* Sort Dropdown */}
      <div className="relative">
        <select
          value={selectedSort}
          onChange={(e) => onSortChange?.(e.target.value)}
          className="appearance-none bg-transparent border border-neutral-400 rounded-sm px-4 py-2 pr-10 text-sm font-medium text-neutral-800 cursor-pointer hover:border-neutral-600 focus:outline-none focus:border-neutral-800 transition-colors"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              SORT BY - {option.label.toUpperCase()}
            </option>
          ))}
        </select>
        <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600 pointer-events-none" />
      </div>
    </div>
  );
}

export default FilterBar;
