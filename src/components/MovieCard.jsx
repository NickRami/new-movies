import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Calendar, Play } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { Card } from './ui/card';
import { cn } from '../lib/utils';

export default function MovieCard({ movie, index = 0 }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);

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
        to={`/movie/${movie.id}`}
        className="block h-full w-full group relative"
      >
        <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-card shadow-lg ring-1 ring-white/10 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] group-hover:ring-primary/50">
          
          {/* Poster Image */}
          {movie.poster_path ? (
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-secondary/50">
              <span className="text-4xl mb-2">🎬</span>
              <span className="text-muted-foreground text-sm text-center">Sin imagen</span>
            </div>
          )}

          {/* Rating Badge (Always visible, top left) */}
          <div className="absolute top-3 left-3 z-20">
             <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1 rounded-md shadow-sm">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-bold text-white">
                  {movie.vote_average?.toFixed(1) || 'N/A'}
                </span>
             </div>
          </div>

          {/* Favorite Button (Visible on hover or if active) */}
          <button
            onClick={handleFavoriteClick}
            className={cn(
              "absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-md transition-all duration-300",
              "bg-black/30 border border-white/10 hover:bg-white/20 active:scale-95",
              favorite ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
            title={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            <Star
              className={cn(
                "w-4 h-4 transition-all duration-300",
                favorite ? "fill-yellow-400 text-yellow-400" : "text-white"
              )}
            />
          </button>

          {/* Hover Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90 md:opacity-0 md:group-hover:opacity-100" />
          
           {/* Center Icon (Play or Eye) - Mobile hidden, Desktop show on hover */}
           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-primary/90 text-white p-3 rounded-full shadow-lg backdrop-blur-sm transform scale-50 group-hover:scale-100 transition-transform duration-300">
                <Play className="w-6 h-6 fill-current" />
              </div>
           </div>

          {/* Bottom Info Content */}
          <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 opacity-100 transition-all duration-300 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 z-10">
            <h3 className="text-white font-bold text-base leading-tight line-clamp-2 drop-shadow-md mb-1">
              {movie.title}
            </h3>
            
            <div className="flex items-center justify-between text-xs text-gray-300">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</span>
              </div>
              {movie.original_language && (
                <span className="uppercase border border-white/20 px-1.5 py-0.5 rounded text-[10px]">
                  {movie.original_language}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
