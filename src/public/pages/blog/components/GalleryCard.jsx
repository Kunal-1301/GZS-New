/**
 * Gallery Card Component for Blog page horizontal scroll section.
 * @param {string} image - Image URL
 * @param {string} title - Game title
 * @param {string} category - Game category
 */
function GalleryCard({ image, title, category }) {
    return (
        <div className="flex-shrink-0 w-64 md:w-72 lg:w-80 group cursor-pointer">
            <div className="relative h-40 md:h-48 rounded-lg overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

                {/* Title overlay */}
                {title && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                        <h3 className="text-white font-bold text-lg drop-shadow-lg">
                            {title}
                        </h3>
                        {category && (
                            <span className="text-white/80 text-xs uppercase tracking-wider">
                                {category}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default GalleryCard;
