import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Calendar, Play } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { Card } from './ui/card';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';

export default function MovieCard({ movie, index = 0 }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);
  const { t } = useTranslation();

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
      className="h-full w-full"
    >
      <Link
        to={movie.media_type === 'tv' ? `/tv/${movie.id}` : `/movie/${movie.id}`}
        className="block h-full w-full group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
      >
        {/* Outer wrapper for shadow and lifting. 'isolate' fixes Webkit border-radius animation bleed */}
        <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-card border border-border/50 transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.25)] dark:group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6),0_0_25px_-5px_hsla(var(--primary),0.25)] group-hover:border-primary/50 isolate will-change-transform">

          {/* Poster Image */}
          {movie.poster_path ? (
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105 will-change-transform"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-secondary/50">
              <span className="text-4xl mb-2">🎬</span>
              <span className="text-muted-foreground text-sm text-center">{t('common.noImage')}</span>
            </div>
          )}

          {/* Rating Badge (Always visible, top left) */}
          <div className="absolute top-3 left-3 z-20">
            <div className="flex items-center gap-1 bg-black/65 dark:bg-black/75 backdrop-blur-md border border-white/15 px-2 py-1 rounded-md shadow-sm">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold text-white">
                {movie.vote_average?.toFixed(1) || t('common.notAvailable')}
              </span>
            </div>
          </div>

          {/* Favorite Button (Visible on hover or if active) */}
          <button
            onClick={handleFavoriteClick}
            className={cn(
              "absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-md transition-all duration-300",
              "bg-black/40 border border-white/15 hover:bg-black/60 active:scale-95",
              favorite ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
            title={favorite ? t('movieCard.removeFromFavorites') : t('movieCard.addToFavorites')}
          >
            <Star
              className={cn(
                "w-4 h-4 transition-all duration-300",
                favorite ? "fill-yellow-400 text-yellow-400" : "text-white/90"
              )}
            />
          </button>

          {/* Hover Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 transition-opacity duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-90 md:opacity-0 md:group-hover:opacity-100" />

          {/* Center Icon (Play or Eye) - Mobile hidden, Desktop show on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-none">
            <div className="bg-primary/90 text-primary-foreground p-3.5 rounded-full shadow-[0_0_20px_hsla(var(--primary),0.5)] backdrop-blur-sm transform scale-50 group-hover:scale-100 transition-transform duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]">
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </div>
          </div>

        </div>

        {/* Title and Info Below Card */}
        <div className="pt-2 sm:pt-3 space-y-1.5 sm:space-y-2">
          <h3 className="font-semibold text-sm sm:text-base leading-tight text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {movie.title}
          </h3>

          <div className="flex items-center justify-between text-[11px] sm:text-xs text-muted-foreground">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : t('common.notAvailable')}</span>
            </div>
            {movie.original_language && (
              <span className="uppercase text-[9px] sm:text-[10px] font-medium opacity-70">
                {movie.original_language}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
