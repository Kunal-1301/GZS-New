import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';

export default function GameCard({ game, onClick }) {
  const slug = game.slug || game.id;
  const platforms = Array.isArray(game.platforms)
    ? game.platforms
    : [game.platforms].filter(Boolean);
  const genres = Array.isArray(game.genres)
    ? game.genres
    : [game.genre || game.genres].filter(Boolean);
  const score = game.aggregate_score || game.metacritic || null;

  const inner = (
    <div className="group relative bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-[var(--theme-primary)] cursor-pointer flex flex-col h-full">

      {/* Cover — aspect-video */}
      <div className="aspect-video relative overflow-hidden bg-[#F1F5F9] shrink-0">
        {game.banner_url ? (
          <img
            src={game.banner_url}
            alt={game.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, rgba(29,106,219,0.12), rgba(124,58,237,0.12))' }}
          >
            <span className="text-4xl">🎮</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Genre badge */}
        {genres[0] && (
          <span
            className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full text-white"
            style={{ background: 'var(--theme-primary)' }}
          >
            {genres[0]}
          </span>
        )}

        {/* Score badge */}
        {score && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1 text-xs font-bold text-white bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
            <FiStar size={10} />
            {score}/10
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Platform icons row */}
        {platforms.length > 0 && (
          <div className="flex gap-1 flex-wrap mb-2">
            {platforms.map(p => (
              <span
                key={p}
                className="text-xs px-2 py-0.5 rounded font-medium"
                style={{ background: '#F1F5F9', color: '#64748B' }}
              >
                {p}
              </span>
            ))}
          </div>
        )}

        <h3
          className="text-sm font-bold mb-1 line-clamp-1 group-hover:text-[var(--theme-primary)] transition-colors"
          style={{ color: '#0F172A' }}
        >
          {game.title}
        </h3>

        {(game.short_description || game.description) && (
          <p className="text-xs leading-relaxed line-clamp-2 flex-1" style={{ color: '#64748B' }}>
            {game.short_description || game.description}
          </p>
        )}
      </div>
    </div>
  );

  if (onClick) {
    return (
      <div onClick={onClick} className="h-full">
        {inner}
      </div>
    );
  }

  return (
    <Link to={`/games/${slug}`} className="block h-full">
      {inner}
    </Link>
  );
}
