import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useTrendingMovies, useGenreSections } from '../hooks/useMovies';
import HeroCarousel from '../components/HeroCarousel';
import ProvidersCarousel from '../components/ProvidersCarousel';
import MovieList from '../components/MovieList';
import MovieCard from '../components/MovieCard';

export default function Home() {
  const { movies, loading, error } = useTrendingMovies();
  const {
    sections: genreSections,
    loading: loadingGenres,
    error: errorGenres,
  } = useGenreSections();

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <div className="pt-16 lg:pt-0">
        <HeroCarousel />
      </div>

      {/* Carousel de proveedores */}
      <ProvidersCarousel />

      {/* Trending Movies Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="py-10"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Películas Trending
              </h2>
            </div>
            <p className="text-muted-foreground text-lg">
              Las películas más populares de esta semana
            </p>
          </motion.div>
          <MovieList movies={movies} loading={loading} error={error} />
        </div>
      </motion.section>

      {/* Películas por categorías */}
      <section className="pb-10">
        <div className="container mx-auto px-4 lg:px-8 space-y-8">
          {!loadingGenres && !errorGenres && genreSections.length > 0 && (
            genreSections.map((section, sectionIndex) => (
              <motion.div
                key={section.genre.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + sectionIndex * 0.1 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-2xl font-semibold text-foreground">
                    {section.genre.name}
                  </h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Categoría
                  </p>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                  {section.movies.map((movie, index) => (
                    <div
                      key={movie.id}
                      className="w-36 sm:w-40 md:w-44 flex-shrink-0"
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
