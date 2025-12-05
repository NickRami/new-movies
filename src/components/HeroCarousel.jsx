import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Play,
  Sparkles,
} from 'lucide-react';
import { Button } from './ui/button';
import { useUpcomingMovies } from '../hooks/useMovies';

function formatDate(dateString) {
  if (!dateString) return 'Próximamente';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function HeroCarousel() {
  const { movies, loading, error } = useUpcomingMovies();
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleMovies = useMemo(() => movies.slice(0, 8), [movies]);

  useEffect(() => {
    if (!visibleMovies.length) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % visibleMovies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [visibleMovies.length]);

  const handlePrev = () => {
    if (!visibleMovies.length) return;
    setActiveIndex((prev) =>
      prev === 0 ? visibleMovies.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    if (!visibleMovies.length) return;
    setActiveIndex((prev) => (prev + 1) % visibleMovies.length);
  };

  if (loading && !visibleMovies.length) {
    return null;
  }

  if (error || !visibleMovies.length) {
    return null;
  }

  const activeMovie = visibleMovies[activeIndex];

  return (
    <div className="relative h-[60vh] sm:h-[65vh] md:h-[75vh] lg:h-[82vh] w-full overflow-hidden">
      {/* Fondo hero usando la película activa */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMovie.id}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.01 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="absolute inset-0 will-change-transform"
        >
          {activeMovie.backdrop_path ? (
            <div
              className="absolute inset-0 bg-cover bg-center scale-[1.15]"
              style={{
                backgroundImage: `url(${activeMovie.backdrop_path})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background" />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Contenido hero */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Cabecera de estrenos */}
          <div className="mb-4 sm:mb-6 max-w-xl space-y-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-rose-500/40 glass-dark px-2 sm:px-3 py-1 text-xs font-medium text-rose-100 shadow-glow animate-pulse-glow"
            >
              <Sparkles className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-rose-200" />
              <span className="uppercase tracking-[0.22em] text-[0.65rem] sm:text-[0.7rem]">
                Estrenos en 3D
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight drop-shadow-xl"
            >
              Descubre los próximos lanzamientos
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-xl hidden sm:block"
            >
              Explora en un carrusel 3D las películas que llegarán pronto a
              cines y plataformas de streaming. Elige un estreno y mira sus
              detalles al instante.
            </motion.p>
            {activeMovie && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 text-xs text-muted-foreground"
              >
                {activeMovie.release_date && (
                  <div className="inline-flex items-center gap-1 rounded-full glass-dark px-2 py-1 border border-border/70 hover:border-primary/50 transition-all duration-300">
                    <CalendarDays className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
                    <span className="text-[0.7rem] sm:text-xs">Estreno: {formatDate(activeMovie.release_date)}</span>
                  </div>
                )}
                {activeMovie.vote_average && (
                  <span className="rounded-full glass-dark px-2 py-1 text-emerald-300 border border-emerald-500/30 shadow-glow-accent text-[0.7rem] sm:text-xs">
                    Anticipación: {activeMovie.vote_average.toFixed(1)} ★
                  </span>
                )}
                <Link to={`/movie/${activeMovie.id}`}>
                  <Button
                    variant="gradient"
                    size="sm"
                    className="ml-0 md:ml-2 gap-1 sm:gap-1.5 shadow-lg shadow-primary/40 hover:shadow-primary/60 text-xs h-8 sm:h-9"
                  >
                    <Play className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
                    <span className="hidden sm:inline">Ver detalles del estreno</span>
                    <span className="sm:hidden">Ver detalles</span>
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Glow de fondo para el carrusel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute inset-x-4 bottom-4 h-40 bg-gradient-to-r from-rose-500/40 via-purple-500/30 to-sky-500/40 blur-3xl"
          />

          {/* Carrusel 3D de tarjetas */}
          <div className="relative mt-4 sm:mt-6 flex items-center justify-center">
            {/* Glow base */}
            <div className="pointer-events-none absolute inset-x-10 -bottom-8 h-28 rounded-full bg-rose-500/25 blur-3xl hidden sm:block" />

            <div className="relative flex h-[240px] sm:h-[280px] md:h-[320px] w-full items-center justify-center overflow-visible">
              {visibleMovies.map((movie, index) => {
                const offset = index - activeIndex;
                const wrappedOffset =
                  offset > visibleMovies.length / 2
                    ? offset - visibleMovies.length
                    : offset < -visibleMovies.length / 2
                    ? offset + visibleMovies.length
                    : offset;

                const distance = Math.abs(wrappedOffset);
                const isActive = wrappedOffset === 0;

                // Responsive spacing
                const translateX = wrappedOffset * (window.innerWidth < 640 ? 140 : window.innerWidth < 768 ? 160 : 190);
                const scale = isActive ? 1 : 0.8 - distance * 0.05;
                const rotateY = wrappedOffset * (window.innerWidth < 640 ? -12 : -18);
                const opacity = Math.max(0, 1 - distance * 0.45);
                const zIndex = 10 - distance;

                return (
                  <motion.div
                    key={movie.id}
                    className="absolute origin-center"
                    style={{ zIndex }}
                    animate={{
                      x: translateX,
                      scale,
                      rotateY,
                      opacity,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 110,
                      damping: 18,
                    }}
                    onClick={() => setActiveIndex(index)}
                  >
                    <motion.div
                      whileHover={{
                        y: -10,
                        rotateY: isActive ? 3 : rotateY,
                        scale: isActive ? 1.04 : scale + 0.04,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 18,
                      }}
                      className="group relative h-[200px] w-32 sm:h-[240px] sm:w-40 md:h-[280px] md:w-44 lg:h-[300px] lg:w-52 cursor-pointer overflow-visible"
                    >
                      {/* Glow individual */}
                      <div className="pointer-events-none absolute inset-x-6 -bottom-6 h-14 rounded-full bg-rose-500/25 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden sm:block" />

                      <div className="relative h-full w-full origin-center rounded-2xl sm:rounded-3xl border border-border/80 bg-gradient-to-b from-slate-900/95 via-slate-950 to-slate-950 shadow-xl shadow-black/60 backdrop-blur-sm">
                        <AnimatePresence initial={false} mode="wait">
                          {isActive && movie.backdrop_path && (
                            <motion.div
                              key={movie.backdrop_path}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 0.3 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 rounded-3xl overflow-hidden"
                            >
                              <img
                                src={movie.backdrop_path}
                                alt={movie.title}
                                className="h-full w-full object-cover opacity-70"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90" />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="relative flex h-full flex-col p-3">
                          <div className="flex-1">
                            <div className="mb-2 overflow-hidden rounded-2xl border border-border/70 bg-black/40">
                              <img
                                src={movie.poster_path}
                                alt={movie.title}
                                className="h-36 w-full object-cover"
                                loading="lazy"
                              />
                            </div>
                            <h3 className="line-clamp-2 text-sm font-semibold text-foreground">
                              {movie.title || movie.name}
                            </h3>
                            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-300/80">
                              <CalendarDays className="h-3.5 w-3.5" />
                              <span>{formatDate(movie.release_date)}</span>
                            </div>
                          </div>

                          <div className="mt-3 flex items-center justify-between text-[0.7rem] text-slate-300/80">
                            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-300 border border-emerald-500/30">
                              {movie.vote_average
                                ? `${movie.vote_average.toFixed(1)} ★`
                                : 'Sin votos'}
                            </span>
                            <span className="rounded-full border border-rose-500/40 bg-rose-500/10 px-2 py-0.5 text-rose-200">
                              Estreno
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Controles hero */}
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              className="hidden xl:inline-flex items-center justify-center rounded-full glass-dark hover:border-primary/50 text-foreground shadow-lg hover:shadow-glow-primary transition-all duration-300 w-9 h-9 md:w-10 md:h-10 absolute left-0 2xl:left-6 top-1/2 -translate-y-1/2 z-30"
              aria-label="Película anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="hidden xl:inline-flex items-center justify-center rounded-full glass-dark hover:border-primary/50 text-foreground shadow-lg hover:shadow-glow-primary transition-all duration-300 w-9 h-9 md:w-10 md:h-10 absolute right-0 2xl:right-6 top-1/2 -translate-y-1/2 z-30"
              aria-label="Siguiente película"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
