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
      transition={{ delay: index * 0.04, duration: 0.4, ease: "easeOut" }}
      className="h-full w-full"
    >
      <Link
        to={movie.media_type === 'tv' ? `/tv/${movie.id}` : `/movie/${movie.id}`}
        className="block h-full w-full group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
      >
        {/* Poster Container */}
        <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-card border border-border/50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.25)] dark:group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6),0_0_25px_-5px_hsla(var(--primary),0.25)] group-hover:border-primary/50 isolate will-change-transform">

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

          {/* Rating Badge — always visible */}
          <div className="absolute top-2.5 left-2.5 z-20">
            <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1 rounded-lg shadow-sm">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-[11px] font-bold text-white leading-none">
                {movie.vote_average?.toFixed(1) || t('common.notAvailable')}
              </span>
            </div>
          </div>

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className={cn(
              "absolute top-2.5 right-2.5 z-20 p-1.5 rounded-full backdrop-blur-md transition-all duration-300",
              "bg-black/40 border border-white/10 hover:bg-black/60 active:scale-90",
              favorite ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
            title={favorite ? t('movieCard.removeFromFavorites') : t('movieCard.addToFavorites')}
          >
            <Star
              className={cn(
                "w-3.5 h-3.5 transition-all duration-300",
                favorite ? "fill-yellow-400 text-yellow-400" : "text-white/90"
              )}
            />
          </button>

          {/* Hover Gradient Overlay — only on hover (both mobile & desktop) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" />

          {/* Center Play Icon — hover only */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-none">
            <div className="bg-primary/90 text-primary-foreground p-3 rounded-full shadow-[0_0_20px_hsla(var(--primary),0.5)] backdrop-blur-sm transform scale-50 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </div>
          </div>

        </div>

        {/* Title and Info Below Card — Strictly Aligned Body */}
        <div className="pt-2.5 h-[52px] flex flex-col justify-between">
          <h3 className="font-semibold text-[13px] sm:text-sm leading-snug text-foreground group-hover:text-primary transition-colors duration-200 truncate" title={movie.title}>
            {movie.title}
          </h3>

          <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-1">
            <div className="flex items-center gap-1 min-w-0">
              <Calendar className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">
                {movie.release_date ? new Date(movie.release_date).getFullYear() : t('common.notAvailable')}
              </span>
            </div>
            {movie.original_language && (
              <span className="uppercase text-[9px] font-semibold tracking-wider opacity-60 bg-secondary/50 px-1.5 py-0.5 rounded flex-shrink-0 ml-2">
                {movie.original_language}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
