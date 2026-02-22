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
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-neutral-900">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-black text-sm uppercase tracking-wide text-neutral-900 mb-2 leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-neutral-600 text-xs leading-relaxed mb-4 flex-1">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3">
          {/* Read More Button */}
          {highlighted ? (
            <Link
              to={`/blog/${id}`}
              className="inline-flex items-center gap-1 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
            >
              READ MORE
              <FiArrowUpRight className="w-3 h-3" />
            </Link>
          ) : (
            <Link
              to={`/blog/${id}`}
              className="inline-flex items-center px-4 py-2 border border-neutral-800 text-neutral-800 text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-neutral-800 hover:text-white transition-colors"
            >
              READ MORE
            </Link>
          )}

          {/* Likes */}
          <div className="flex items-center gap-1 text-neutral-500">
            <span className="text-xs font-medium">{likes}</span>
            <HiOutlineHeart className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
