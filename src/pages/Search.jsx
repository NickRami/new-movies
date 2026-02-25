import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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

  const { t } = useTranslation();

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
                <p className="text-primary uppercase text-sm font-bold tracking-[0.2em]">{t('search.resultsLabel')}</p>
                <h1 className="text-4xl md:text-5xl font-black text-foreground font-heading tracking-tight">
                  {query}
                </h1>
              </div>
            )}
            {showGenreLabel && (
              <div className="space-y-2">
                <p className="text-primary uppercase text-sm font-bold tracking-[0.2em]">{t('search.genreLabel')}</p>
                <h1 className="text-4xl md:text-5xl font-black text-foreground font-heading tracking-tight">
                  {genreName}
                </h1>
              </div>
            )}
          </motion.div>
        )}

        {/* Idle State */}
        {isIdleState ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-10 flex flex-col items-center justify-center text-center gap-6 py-24 glass rounded-[3rem] border border-border/50 shadow-2xl overflow-hidden relative"
          >
            {/* Ambient Background for idle card */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="h-24 w-24 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-2 shadow-glow relative z-10"
            >
              <SearchIcon className="w-10 h-10 text-primary" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-foreground text-3xl font-black font-heading relative z-10"
            >
              {t('search.discoverTitle')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-muted-foreground text-lg max-w-md font-medium relative z-10"
            >
              {t('search.discoverDesc')}
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
