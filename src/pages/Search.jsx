import { motion } from 'framer-motion';
import { Search as SearchIcon } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useSearchMovies } from '../hooks/useMovies';
import MovieList from '../components/MovieList';
import SearchHero3D from '../components/SearchHero3D';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const genreId = searchParams.get('genre') || '';
  const genreName = searchParams.get('name') || '';

  const { movies, loading, error } = useSearchMovies(query, genreId);

  const showQueryLabel = query && query.trim() !== '';
  const showGenreLabel = !showQueryLabel && genreId && genreName;
  const isIdleState = !showQueryLabel && !showGenreLabel && !loading && !error;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="pt-16 lg:pt-4 pb-10 min-h-screen"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header / Hero de búsqueda con escena 3D */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <SearchHero3D />
        </motion.div>

        {/* Resumen de búsqueda */}
        {(showQueryLabel || showGenreLabel) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
          >
            <div>
              {showQueryLabel && (
                <p className="text-muted-foreground text-sm md:text-base">
                  Resultados para:{' '}
                  <span className="text-foreground font-semibold">"{query}"</span>
                </p>
              )}
              {showGenreLabel && (
                <p className="text-muted-foreground text-sm md:text-base">
                  Películas en la categoría:{' '}
                  <span className="text-foreground font-semibold">{genreName}</span>
                </p>
              )}
            </div>
            {movies.length > 0 && (
              <p className="text-xs md:text-sm text-muted-foreground">
                {movies.length} resultado{movies.length !== 1 && 's'}
              </p>
            )}
          </motion.div>
        )}

        {/* Estado inicial sin búsqueda */}
        {isIdleState ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-10 flex flex-col items-center justify-center text-center gap-3"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="h-16 w-16 rounded-3xl glass-dark border border-border/50 flex items-center justify-center mb-2 shadow-glow-primary"
            >
              <SearchIcon className="w-7 h-7 text-primary" />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-foreground text-lg font-semibold"
            >
              Comienza una nueva búsqueda
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-muted-foreground text-sm max-w-md"
            >
              Escribe el título de una película, una saga o una palabra clave en la barra de
              búsqueda para ver resultados al instante.
            </motion.p>
          </motion.div>
        ) : (
          <MovieList movies={movies} loading={loading} error={error} />
        )}
      </div>
    </motion.div>
  );
}
