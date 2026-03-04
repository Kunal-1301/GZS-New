import { Link } from 'react-router-dom';
import { HiOutlineHeart } from 'react-icons/hi';
import { FiArrowUpRight } from 'react-icons/fi';

/**
 * Reusable BlogCard Component
 * @param {number} id - Blog post ID for linking
 * @param {string} image - Image URL or imported image
 * @param {string} title - Blog post title
 * @param {string} description - Blog post description
 * @param {number} likes - Number of likes
 * @param {boolean} highlighted - Whether this is a featured/highlighted card
 */
function BlogCard({
  id,
  image,
  title,
  description,
  likes = 0,
  highlighted = false,
}) {
  return (
    <div className="bg-[var(--theme-card)] overflow-hidden card-standard flex flex-col">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-[var(--theme-bg-section)]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-black text-sm uppercase tracking-wide text-[var(--theme-text)] mb-2 leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[var(--theme-text-muted)] text-xs leading-relaxed mb-4 flex-1">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3">
          {/* Read More Button */}
          {highlighted ? (
            <Link
              to={`/blog/${id}`}
              className="gzs-btn-primary !px-5 !py-2.5 !text-[10px] no-underline"
            >
              READ MORE
              <FiArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              to={`/blog/${id}`}
              className="gzs-btn-outline !px-5 !py-2.5 !text-[10px] no-underline"
            >
              READ MORE
            </Link>
          )}

          {/* Likes */}
          <div className="flex items-center gap-1 text-[var(--theme-text-muted)]">
            <span className="text-xs font-medium">{likes}</span>
            <HiOutlineHeart className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
