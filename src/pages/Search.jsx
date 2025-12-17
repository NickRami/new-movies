import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useSearchMovies } from '../hooks/useMovies';
import MovieList from '../components/MovieList';
import BackNavigation from '../components/BackNavigation';
import Pagination from '../components/Pagination';
import { getContainerClasses, SPACING, NAVBAR_HEIGHT } from '../lib/layout-constants';
import { cn } from '../lib/utils';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const genreId = searchParams.get('genre') || '';
  const genreName = searchParams.get('name') || '';
  const [page, setPage] = useState(1);

  // Reset page when search term or genre changes
  useEffect(() => {
    setPage(1);
  }, [query, genreId]);

  const { movies, totalPages, loading, error } = useSearchMovies(query, genreId, page);

  const showQueryLabel = query && query.trim() !== '';
  const showGenreLabel = !showQueryLabel && genreId && genreName;
  const isIdleState = !showQueryLabel && !showGenreLabel && !loading && !error;

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: NAVBAR_HEIGHT, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "min-h-screen",
        "pt-8 md:pt-12",
        "pb-16 md:pb-20"
      )}
    >
      <div className={getContainerClasses()}>
        <div className="mb-8">
          <BackNavigation />
        </div>
        
        {/* Page Title */}
        {(showQueryLabel || showGenreLabel) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {showQueryLabel && (
              <div className="space-y-2">
                <p className="text-muted-foreground uppercase text-sm font-semibold tracking-wider">Search Results</p>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  {query}
                </h1>
              </div>
            )}
            {showGenreLabel && (
              <div className="space-y-2">
                <p className="text-muted-foreground uppercase text-sm font-semibold tracking-wider">Genre Explorer</p>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  {genreName}
                </h1>
              </div>
            )}
          </motion.div>
        )}

        {/* Idle State */}
        {isIdleState ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-10 flex flex-col items-center justify-center text-center gap-4 py-20"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="h-20 w-20 rounded-full glass-dark border border-border/50 flex items-center justify-center mb-2 shadow-glow-primary"
            >
              <SearchIcon className="w-8 h-8 text-primary" />
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-foreground text-2xl font-bold"
            >
              Discover Movies
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-muted-foreground text-base max-w-md"
            >
              Enter a movie title or select a genre from the sidebar to explore our collection.
            </motion.p>
          </motion.div>
        ) : (
          <>
            {/* Movie Grid */}
            <MovieList movies={movies} loading={loading} error={error} />
            
            {/* Pagination - ONLY in Search/Genre views */}
            {!loading && !error && movies.length > 0 && totalPages > 1 && (
              <div className={cn(SPACING.marginTop['2xl'], "mb-8")}>
                <Pagination 
                  currentPage={page}
                  totalPages={totalPages > 500 ? 500 : totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
