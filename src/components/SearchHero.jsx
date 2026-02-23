import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Plus, Check, Info, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUpcomingMovies } from '../hooks/useMovies';
import { useFavorites } from '../context/FavoritesContext';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';
import { getContainerClasses, Z_INDEX } from '../lib/layout-constants';
import { fetchGenres } from '../services/tmdb';

export default function SearchHero() {
  const { movies, loading } = useUpcomingMovies();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allGenres, setAllGenres] = useState([]);
  const { t, i18n } = useTranslation();

  const heroMovies = movies.filter(m => m.backdrop_path).slice(0, 6);
  const currentMovie = heroMovies[currentIndex];

  useEffect(() => {
    async function loadGenres() {
      try {
        const lang = i18n.language === 'es' ? 'es-ES' : 'en-US';
        const genresData = await fetchGenres(lang);
        setAllGenres(genresData);
      } catch (e) {
        console.error("Failed to load genres for hero", e);
      }
    }
    loadGenres();
  }, [i18n.language]);

  // Helper to get genre names
  const getHeroGenres = (ids) => {
    if (!ids || !allGenres.length) return [];
    return ids
      .map(id => allGenres.find(g => g.id === id)?.name)
      .filter(Boolean)
      .slice(0, 2); // Show max 2 genres
  };

  useEffect(() => {
    if (heroMovies.length > 0) {
      const interval = setInterval(() => {
        if (!document.hidden) {
          setCurrentIndex((prev) => (prev + 1) % heroMovies.length);
        }
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [heroMovies]);

  if (loading || !currentMovie) return <HeroSkeleton />;

  return (
    <section
      className="relative w-full overflow-hidden"
    >
      {/* 
        Responsive Height Strategy:
        - Mobile: min-h-[600px] to ensure content fits without scrolling immediately
        - Tablet: min-h-[70vh]
        - Desktop: min-h-[85vh] for the cinematic feel
      */}
      <div className="relative w-full min-h-[600px] md:min-h-[75vh] lg:min-h-[85vh] flex flex-col justify-end group">

        {/* Background Layer */}
        <HeroBackground currentMovie={currentMovie} />

        {/* Content Container */}
        <div
          className={cn(
            "relative w-full pb-16 pt-32 md:pb-24 lg:pb-32",
            getContainerClasses()
          )}
          style={{ zIndex: Z_INDEX.content }}
        >
          <div className="grid lg:grid-cols-12 gap-8 items-end">

            {/* Left Side: Info & Actions */}
            <div className="lg:col-span-8 xl:col-span-8 space-y-6 md:space-y-8">
              <HeroContent
                currentMovie={currentMovie}
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
                t={t}
                genres={getHeroGenres(currentMovie.genre_ids)}
              />
            </div>

            {/* Right Side: Desktop Indicators (Aligned to bottom right) */}
            <div className="hidden lg:flex lg:col-span-4 xl:col-span-4 justify-end items-end pb-2">
              <HeroIndicators
                total={heroMovies.length}
                current={currentIndex}
                onChange={setCurrentIndex}
              />
            </div>
          </div>
        </div>

        {/* Mobile Indicators (Absolute bottom) */}
        <div className="absolute bottom-6 left-0 right-0 z-30 lg:hidden flex justify-center pb-safe">
          <div className="flex gap-2 p-2 rounded-full backdrop-blur-sm bg-black/10">
            {heroMovies.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/40"
                )}
                aria-label={`Current slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Robust Background Component
function HeroBackground({ currentMovie }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentMovie.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0 z-0 bg-background"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-out scale-105 group-hover:scale-110"
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${currentMovie.backdrop_path})` }}
        />

        {/* Professional Gradient Stack */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/20 to-transparent" />
        {/* Navbar gradient */}
        <div className="absolute top-0 w-full h-40 bg-gradient-to-b from-black/80 to-transparent" />
        {/* Unique glowing bottom border to distinctly separate Hero from other sections */}
        <div className="absolute bottom-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-80 shadow-[0_-5px_20px_rgba(244,63,94,0.6)]" />
      </motion.div>
    </AnimatePresence>
  );
}

// Content Component
function HeroContent({ currentMovie, isFavorite, toggleFavorite, t, genres }) {
  return (
    <motion.div
      key={currentMovie.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="max-w-5xl"
    >
      {/* Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-black tracking-tighter text-white leading-[0.95] drop-shadow-2xl mb-4 md:mb-6">
        {currentMovie.title}
      </h1>

      {/* Meta Data Row - OPTION 1 & 2 Combined */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm md:text-base font-medium text-white/90 mb-6">

        {/* Rating */}
        <div className="flex items-center gap-1.5 text-yellow-500">
          <Star className="w-5 h-5 fill-current" />
          <span className="text-white font-bold text-base md:text-lg">
            {currentMovie.vote_average?.toFixed(1) || "NR"}
          </span>
        </div>

        {/* Genres */}
        {genres.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <span className="text-gray-200 tracking-wide">
              {genres.join(" • ")}
            </span>
          </div>
        )}

        <span className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
          {new Date(currentMovie.release_date).getFullYear()}
        </span>
        <span className="ml-2 border border-white/30 px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-md">
          HD
        </span>
      </div>

      {/* Overview - Designer accent layout */}
      <div className="relative pl-4 border-l-4 border-primary/40 mb-8 rounded-sm">
        <p className="text-base md:text-lg text-gray-200/90 line-clamp-2 md:line-clamp-3 max-w-xl leading-relaxed font-medium drop-shadow-lg">
          {currentMovie.overview}
        </p>
      </div>

      {/* Buttons Configuration - Optimal Mobile Grid */}
      <div className="grid grid-cols-2 gap-3 w-full sm:flex sm:w-auto sm:gap-4">
        <Button
          asChild
          size="lg"
          className="w-full sm:w-auto min-w-0 bg-white text-black hover:bg-gray-200 hover:text-black shadow-[0_0_20px_rgba(255,255,255,0.15)] font-bold rounded-xl h-12 sm:h-14 text-sm sm:text-base px-2 sm:px-8"
        >
          <Link to={`/movie/${currentMovie.id}`} className="flex items-center justify-center w-full truncate">
            <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current mr-2 flex-shrink-0" />
            <span className="truncate">{t('hero.viewDetails')}</span>
          </Link>
        </Button>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(currentMovie);
          }}
          size="lg"
          variant="outline"
          className={cn(
            "w-full sm:w-auto min-w-0 rounded-xl font-semibold backdrop-blur-xl border-white/10 text-white hover:bg-white/10 h-12 sm:h-14 text-sm sm:text-base px-2 sm:px-8",
            isFavorite(currentMovie.id) && "bg-primary/20 border-primary text-primary shadow-[0_0_20px_rgba(225,29,72,0.2)] hover:bg-primary/30"
          )}
        >
          <div className="flex items-center justify-center w-full truncate">
            {isFavorite(currentMovie.id) ? (
              <><Check className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" /> <span className="truncate">{t('hero.added')}</span></>
            ) : (
              <><Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" /> <span className="truncate">{t('hero.myList')}</span></>
            )}
          </div>
        </Button>
      </div>
    </motion.div>
  );
}

// Desktop Indicators
function HeroIndicators({ total, current, onChange }) {
  return (
    <div className="flex gap-3 bg-black/20 backdrop-blur-md p-3 rounded-2xl border border-white/5">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={cn(
            "relative h-1.5 rounded-full transition-all duration-500 overflow-hidden",
            i === current ? "w-10 bg-white shadow-glow" : "w-2 bg-white/20 hover:w-6 hover:bg-white/40"
          )}
          aria-label={`Go to slide ${i + 1}`}
        >
          {i === current && (
            <motion.div
              layoutId="active-hero-indicator"
              className="absolute inset-0 bg-primary opacity-80"
            />
          )}
        </button>
      ))}
    </div>
  );
}

// Robust Skeleton
function HeroSkeleton() {
  return (
    <div className="relative w-full min-h-[600px] md:min-h-[75vh] lg:min-h-[85vh] bg-[#0a0a0b] flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 bg-zinc-900 animate-pulse" />
      <div className={cn(
        "relative w-full pb-16 pt-32 md:pb-24 lg:pb-32",
        getContainerClasses()
      )}>
        <div className="max-w-3xl space-y-6">
          <div className="h-4 w-24 bg-white/5 rounded" />
          <div className="h-16 md:h-24 w-3/4 bg-white/5 rounded-xl" />
          <div className="flex gap-4">
            <div className="h-5 w-20 bg-white/5 rounded" />
            <div className="h-5 w-20 bg-white/5 rounded" />
          </div>
          <div className="space-y-3">
            <div className="h-4 w-full bg-white/5 rounded" />
            <div className="h-4 w-2/3 bg-white/5 rounded" />
          </div>
          <div className="flex gap-4 pt-4">
            <div className="h-14 w-40 bg-white/5 rounded-xl" />
            <div className="h-14 w-40 bg-white/5 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
