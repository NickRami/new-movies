import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
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
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="h-full"
    >
      <Link
        to={`/movie/${movie.id}`}
        className="block h-full"
      >
        <Card className="group relative h-full overflow-hidden border-border bg-card hover:border-primary/50 transition-all duration-300">
          <div className="relative aspect-[2/3] overflow-hidden bg-muted">
            {movie.poster_path ? (
              <motion.img
                src={movie.poster_path}
                alt={movie.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Sin imagen</span>
              </div>
            )}
            
            <motion.button
              onClick={handleFavoriteClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-2 right-2 z-10 bg-background/80 hover:bg-background rounded-full p-2 backdrop-blur-sm transition-colors"
              aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              <Star
                className={cn(
                  "w-5 h-5 transition-colors",
                  favorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                )}
              />
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/80 to-transparent p-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-sm font-semibold flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400" />
                  {movie.vote_average?.toFixed(1) || 'N/A'}
                </span>
              </div>
            </motion.div>
          </div>

          <div className="p-4">
            <h3 className="text-foreground font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {movie.title}
            </h3>
            {movie.release_date && (
              <p className="text-muted-foreground text-xs mt-1">
                {new Date(movie.release_date).getFullYear()}
              </p>
            )}
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
