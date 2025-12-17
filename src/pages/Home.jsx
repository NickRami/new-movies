import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useTrendingMovies, useGenreSections } from '../hooks/useMovies';
import SearchHero from '../components/SearchHero';
import MovieList from '../components/MovieList';
import MovieCard from '../components/MovieCard';
import { useTranslation } from 'react-i18next';
import { getContainerClasses, SPACING } from '../lib/layout-constants';
import { cn } from '../lib/utils';

export default function Home() {
  const { movies, loading, error } = useTrendingMovies();
  const { t } = useTranslation();
  const {
    sections: genreSections,
    loading: loadingGenres,
    error: errorGenres,
  } = useGenreSections();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <SearchHero />

      {/* Trending Movies Section */}
      <motion.section
        id="trending-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className={cn(
          SPACING.sectionGap.mobile,
          SPACING.sectionGap.tablet,
          SPACING.sectionGap.desktop
        )}
      >
        <div className={getContainerClasses()}>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              >
                <TrendingUp className="w-8 h-8 text-primary drop-shadow-glow" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t('home.trendingTitle')}
              </h2>
            </div>
            <p className="text-muted-foreground text-lg">
              {t('home.trendingSubtitle')}
            </p>
          </motion.div>
          
          <MovieList movies={movies} loading={loading} error={error} />
        </div>
      </motion.section>

      {/* Genre Sections - NO PAGINATION HERE */}
      <section 
        className={cn(
          "pb-16 md:pb-24",
          SPACING.sectionGap.mobile,
          SPACING.sectionGap.tablet
        )}
      >
        <div className={cn(getContainerClasses(), "space-y-12 md:space-y-16")}>
          {!loadingGenres && !errorGenres && genreSections.length > 0 && (
            genreSections.map((section, sectionIndex) => (
              <motion.div
                key={section.genre.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + sectionIndex * 0.15, duration: 0.6, ease: "easeOut" }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between gap-2 glass-dark p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300">
                  <motion.h3 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + sectionIndex * 0.15, duration: 0.5 }}
                    className="text-2xl font-semibold text-foreground"
                  >
                    {section.genre.name}
                  </motion.h3>
                  <motion.p 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + sectionIndex * 0.15, duration: 0.5 }}
                    className="text-xs text-muted-foreground uppercase tracking-wide px-3 py-1 glass rounded-full border border-primary/20"
                  >
                    {t('nav.genres')}
                  </motion.p>
                </div>
                
                {/* Horizontal Scrollable Carousel - NO PAGINATION */}
                <div className="flex gap-4 overflow-x-auto pb-4 pt-2 no-scrollbar pl-1">
                  {section.movies.map((movie, index) => (
                    <div
                      key={movie.id}
                      className="w-36 sm:w-40 md:w-44 flex-shrink-0 transition-transform duration-300 hover:scale-105"
                    >
                      <MovieCard movie={movie} index={index} />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
