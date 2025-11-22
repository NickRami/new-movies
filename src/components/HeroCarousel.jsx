import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Star, Info } from 'lucide-react';
import { Button } from './ui/button';
import { fetchTrending } from '../services/tmdb';

export default function HeroCarousel() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await fetchTrending();
        setMovies(data.slice(0, 5)); // Solo las primeras 5 para el carousel
        setLoading(false);
      } catch (error) {
        console.error('Error loading hero movies:', error);
        setLoading(false);
      }
    }
    loadMovies();
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [movies.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  if (loading || movies.length === 0) {
    return null;
  }

  const currentMovie = movies[currentIndex];

  return (
    <div className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {currentMovie.backdrop_path ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${currentMovie.backdrop_path})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background" />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl">
            <motion.div
              key={currentIndex}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 line-clamp-2">
                {currentMovie.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-foreground font-semibold">
                    {currentMovie.vote_average?.toFixed(1) || 'N/A'}
                  </span>
                </div>
                {currentMovie.release_date && (
                  <span className="text-muted-foreground">
                    {new Date(currentMovie.release_date).getFullYear()}
                  </span>
                )}
              </div>

              <p className="text-muted-foreground mb-6 line-clamp-3 text-lg">
                {currentMovie.overview || 'Descubre esta increíble película.'}
              </p>

              <div className="flex gap-4">
                <Link to={`/movie/${currentMovie.id}`}>
                  <Button size="lg" className="gap-2">
                    <Play className="w-5 h-5" />
                    Ver Detalles
                  </Button>
                </Link>
                <Link to={`/movie/${currentMovie.id}`}>
                  <Button size="lg" variant="outline" className="gap-2">
                    <Info className="w-5 h-5" />
                    Más Info
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Controles */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/50 hover:bg-background/80 backdrop-blur-sm border border-border transition-colors"
        aria-label="Película anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/50 hover:bg-background/80 backdrop-blur-sm border border-border transition-colors"
        aria-label="Siguiente película"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'w-8 bg-primary'
                : 'w-2 bg-muted-foreground/50 hover:bg-muted-foreground'
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

