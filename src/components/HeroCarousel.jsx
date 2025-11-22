import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Star, Info } from 'lucide-react';
import { Button } from './ui/button';
import { fetchTrending } from '../services/tmdb';

export default function HeroCarousel() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Valores para efecto 3D/tilt en la tarjeta principal
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-40, 40], [12, -12]);
  const rotateY = useTransform(x, [-40, 40], [-12, 12]);

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

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    x.set(dx / 6);
    y.set(dy / 6);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
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
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="absolute inset-0 will-change-transform"
        >
          {currentMovie.backdrop_path ? (
            <div
              className="absolute inset-0 bg-cover bg-center scale-[1.15]"
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
          {/* Glow 3D detrás de la tarjeta */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute -inset-x-10 md:-inset-x-20 md:-top-10 md:bottom-auto h-40 md:h-56 bg-gradient-to-r from-primary/50 via-red-500/40 to-purple-500/40 blur-3xl opacity-70"
          />

          <div className="relative max-w-xl mx-auto lg:mx-0 lg:ml-10 xl:ml-14">
            <motion.div
              key={currentIndex}
              style={{ rotateX, rotateY }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="bg-background/70 backdrop-blur-xl border border-border/60 rounded-3xl p-5 md:p-7 shadow-[0_24px_60px_rgba(0,0,0,0.85)] origin-center will-change-transform"
            >
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-3 leading-tight drop-shadow-xl">
                {currentMovie.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 drop-shadow" />
                  <span className="text-foreground font-semibold text-lg">
                    {currentMovie.vote_average?.toFixed(1) || 'N/A'}
                  </span>
                </div>
                {currentMovie.release_date && (
                  <span className="text-muted-foreground text-sm md:text-base">
                    {new Date(currentMovie.release_date).getFullYear()}
                  </span>
                )}
              </div>

              <p className="text-muted-foreground mb-10 line-clamp-3 text-base md:text-lg max-w-xl">
                {currentMovie.overview || 'Descubre esta increíble película.'}
              </p>

              <div className="flex flex-wrap gap-3 md:gap-4">
                <Link to={`/movie/${currentMovie.id}`}>
                  <Button
                    size="lg"
                    className="gap-2 shadow-lg shadow-primary/40 hover:shadow-primary/60"
                  >
                    <Play className="w-5 h-5" />
                    Ver Detalles
                  </Button>
                </Link>
                <Link to={`/movie/${currentMovie.id}`}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 border-border/70 bg-background/40 hover:bg-background/70"
                  >
                    <Info className="w-5 h-5" />
                    Más Info
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Controles - visibles y adaptados al hero */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={goToPrevious}
        className="hidden xl:inline-flex items-center justify-center rounded-full bg-background/80 hover:bg-background/90 backdrop-blur-sm border border-border/70 text-foreground shadow-md transition-colors w-9 h-9 md:w-10 md:h-10 absolute left-4 2xl:left-10 top-[56%] -translate-y-1/2 z-30"
        aria-label="Película anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={goToNext}
        className="hidden xl:inline-flex items-center justify-center rounded-full bg-background/80 hover:bg-background/90 backdrop-blur-sm border border-border/70 text-foreground shadow-md transition-colors w-9 h-9 md:w-10 md:h-10 absolute right-4 2xl:right-10 top-[56%] -translate-y-1/2 z-30"
        aria-label="Siguiente película"
      >
        <ChevronRight className="w-5 h-5" />
      </motion.button>

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

