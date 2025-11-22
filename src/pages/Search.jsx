import { motion } from 'framer-motion';
import { Search as SearchIcon, Film } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useSearchMovies } from '../hooks/useMovies';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';

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
        {/* Header / Hero de búsqueda */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="rounded-3xl px-4 py-5 md:px-6 md:py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
              <div className="flex items-start gap-3">
                <div className="mt-1 hidden sm:flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <SearchIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <SearchIcon className="w-6 h-6 text-primary sm:hidden" />
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                      Buscar películas
                    </h1>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground flex items-center gap-1">
                    <Film className="w-4 h-4 text-muted-foreground" />
                    Encuentra títulos, descubre nuevas historias y explora el catálogo de TMDB.
                  </p>
                </div>
              </div>

              {/* Barra de búsqueda principal */}
              <div className="w-full md:max-w-md">
                <SearchBar />
              </div>
            </div>
          </div>
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 flex flex-col items-center justify-center text-center gap-3"
          >
            <div className="h-16 w-16 rounded-3xl bg-card border border-border flex items-center justify-center mb-2 shadow-lg">
              <SearchIcon className="w-7 h-7 text-muted-foreground" />
            </div>
            <p className="text-foreground text-lg font-semibold">
              Comienza una nueva búsqueda
            </p>
            <p className="text-muted-foreground text-sm max-w-md">
              Escribe el título de una película, una saga o una palabra clave en la barra de
              búsqueda para ver resultados al instante.
            </p>
          </motion.div>
        ) : (
          <MovieList movies={movies} loading={loading} error={error} />
        )}
      </div>
    </motion.div>
  );
}
