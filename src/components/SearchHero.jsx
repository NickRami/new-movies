import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Plus, Check, Info, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUpcomingMovies } from '../hooks/useMovies';
import { useFavorites } from '../context/FavoritesContext';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';
import { getContainerClasses, Z_INDEX, HERO, getHeroHeightStyle } from '../lib/layout-constants';
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
        - Managed by global design system
      */}
      <div
        className="relative w-full flex flex-col justify-end group"
        style={getHeroHeightStyle()}
      >

        {/* Background Layer */}
        <HeroBackground currentMovie={currentMovie} />

        {/* Content Container */}
        <div
          className={cn(
            "relative w-full",
            HERO.paddingTop.mobile, HERO.paddingTop.tablet, HERO.paddingTop.desktop,
            HERO.paddingBottom.mobile, HERO.paddingBottom.tablet, HERO.paddingBottom.desktop,
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
        className="absolute inset-0 z-0"
      >
        {/* Backdrop image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-out scale-105 group-hover:scale-110"
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${currentMovie.backdrop_path})` }}
        />

        {/* ── DARK MODE gradient stack (uses bg-background token) ── */}
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-background via-background/65 to-transparent" />
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-r from-background/98 via-background/45 to-transparent" />
        <div className="hidden dark:block absolute top-0 w-full h-48 bg-gradient-to-b from-background/85 to-transparent" />

        {/* ── LIGHT MODE gradient stack (uses deep rgba so image stays visible) ── */}
        {/* Bottom: dark vignette for text legibility */}
        <div className="dark:hidden absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/5" />
        {/* Left push: content side darker */}
        <div className="dark:hidden absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
        {/* Top nav frost */}
        <div className="dark:hidden absolute top-0 w-full h-40 bg-gradient-to-b from-black/50 to-transparent" />
        {/* Light scrim over the whole image so it doesn't look washed out */}
        <div className="dark:hidden absolute inset-0 bg-black/20" />

        {/* Primary accent separator line — both modes */}
        <div className="absolute bottom-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
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
      {/* Title — always white, image overlay guarantees contrast */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-black tracking-tighter text-white leading-tight md:leading-[1] drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)] mb-3 md:mb-5 line-clamp-2 w-full lg:max-w-4xl">
        {currentMovie.title}
      </h1>

      {/* Meta Data Row */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm md:text-base font-medium text-white/90 mb-6">

        {/* Rating */}
        <div className="flex items-center gap-1.5 text-yellow-400">
          <Star className="w-5 h-5 fill-current" />
          <span className="text-white font-bold text-base md:text-lg">
            {currentMovie.vote_average?.toFixed(1) || t('common.notAvailable')}
          </span>
        </div>

        {/* Genres */}
        {genres.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span className="text-white/80 tracking-wide">
              {genres.join(" • ")}
            </span>
          </div>
        )}

        <span className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
          {new Date(currentMovie.release_date).getFullYear()}
        </span>
        <span className="ml-2 border border-white/40 px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-md text-white/80">
          HD
        </span>
      </div>

      {/* Overview */}
      <div className="relative pl-4 border-l-4 border-primary/60 mb-8 rounded-sm">
        <p className="text-base md:text-lg text-white/85 line-clamp-2 md:line-clamp-3 max-w-xl leading-relaxed font-medium drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
          {currentMovie.overview}
        </p>
      </div>

      {/* Buttons Configuration - Optimal Mobile Stacking */}
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:gap-4 mt-2">
        {/* Primary CTA — solid white, always readable on dark overlay */}
        <Button
          asChild
          size="lg"
          className="w-full sm:w-auto min-w-0 bg-white text-gray-900 hover:bg-white/90 shadow-[0_4px_24px_rgba(0,0,0,0.4)] font-bold rounded-xl h-12 md:h-14 text-sm md:text-base px-4 md:px-8 transition-all duration-300 hover:shadow-[0_4px_32px_rgba(0,0,0,0.5)]"
        >
          <Link to={`/movie/${currentMovie.id}`} className="flex items-center justify-center w-full">
            <Play className="w-5 h-5 fill-current mr-2 flex-shrink-0" />
            <span>{t('hero.viewDetails')}</span>
          </Link>
        </Button>

        {/* Secondary CTA — glass style */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(currentMovie);
          }}
          size="lg"
          variant="outline"
          className={cn(
            "w-full sm:w-auto min-w-0 rounded-xl font-semibold backdrop-blur-xl bg-white/10 border-white/30 text-white hover:bg-white/20 h-12 md:h-14 text-sm md:text-base px-4 md:px-8 transition-all duration-300",
            isFavorite(currentMovie.id) && "bg-primary/30 border-primary/70 text-white shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:bg-primary/40"
          )}
        >
          <div className="flex items-center justify-center w-full">
            {isFavorite(currentMovie.id) ? (
              <><Check className="w-5 h-5 mr-2 flex-shrink-0" /> <span>{t('hero.added')}</span></>
            ) : (
              <><Plus className="w-5 h-5 mr-2 flex-shrink-0" /> <span>{t('hero.myList')}</span></>
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
    <div className="flex gap-3 bg-secondary/20 backdrop-blur-md p-3 rounded-2xl border border-border/50">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={cn(
            "relative h-1.5 rounded-full transition-all duration-500 overflow-hidden",
            i === current ? "w-10 bg-foreground shadow-glow" : "w-2 bg-foreground/30 hover:w-6 hover:bg-foreground/50"
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
    <div
      className="relative w-full flex flex-col justify-end overflow-hidden bg-background"
      style={getHeroHeightStyle()}
    >
      <div className="absolute inset-0 bg-secondary/50 animate-pulse" />
      <div className={cn(
        "relative w-full",
        HERO.paddingTop.mobile, HERO.paddingTop.tablet, HERO.paddingTop.desktop,
        HERO.paddingBottom.mobile, HERO.paddingBottom.tablet, HERO.paddingBottom.desktop,
        getContainerClasses()
      )}>
        <div className="max-w-3xl space-y-6">
          <div className="h-4 w-24 bg-border/50 rounded" />
          <div className="h-16 md:h-24 w-3/4 bg-border/50 rounded-xl" />
          <div className="flex gap-4">
            <div className="h-5 w-20 bg-border/50 rounded" />
            <div className="h-5 w-20 bg-border/50 rounded" />
          </div>
          <div className="space-y-3">
            <div className="h-4 w-full bg-border/50 rounded" />
            <div className="h-4 w-2/3 bg-border/50 rounded" />
          </div>
          <div className="flex gap-4 pt-4">
            <div className="h-14 w-40 bg-border/50 rounded-xl" />
            <div className="h-14 w-40 bg-border/50 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
