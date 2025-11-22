import { motion } from 'framer-motion';
import { Search as SearchIcon } from 'lucide-react';
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="pt-16 lg:pt-4 pb-10 min-h-screen"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <SearchIcon className="w-8 h-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Buscar Películas</h1>
          </div>
          <SearchBar />
        </motion.div>
        
        {(showQueryLabel || showGenreLabel) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            {showQueryLabel && (
              <p className="text-muted-foreground">
                Resultados para: <span className="text-foreground font-semibold">"{query}"</span>
              </p>
            )}
            {showGenreLabel && (
              <p className="text-muted-foreground">
                Películas en la categoría:{' '}
                <span className="text-foreground font-semibold">{genreName}</span>
              </p>
            )}
          </motion.div>
        )}
        
        <MovieList movies={movies} loading={loading} error={error} />
      </div>
    </motion.div>
  );
}
