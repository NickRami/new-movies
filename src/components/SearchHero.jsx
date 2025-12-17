import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Calendar, Info, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTrendingMovies } from '../hooks/useMovies';
import { useFavorites } from '../context/FavoritesContext';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';
import { getHeroHeightStyle, getContainerClasses, HERO, Z_INDEX } from '../lib/layout-constants';

export default function SearchHero() {
  const { movies, loading } = useTrendingMovies();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const { t } = useTranslation();

  // Filter movies with backdrop images for the hero
  const heroMovies = movies.filter(m => m.backdrop_path).slice(0, 8);
  const currentMovie = heroMovies[currentIndex];

  // Auto-rotation
  useEffect(() => {
    if (heroMovies.length > 0 && !isHovering) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % heroMovies.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [heroMovies, isHovering]);

  if (loading || !currentMovie) return <HeroSkeleton />;

  return (
    <section 
      className="relative w-full overflow-hidden"
      style={getHeroHeightStyle()}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      
      {/* Background Layer */}
      <HeroBackground currentMovie={currentMovie} />

      {/* Content Layer */}
      <div 
        className={cn(
          "relative h-full flex items-end",
          getContainerClasses(),
          HERO.paddingTop.mobile,
          HERO.paddingTop.tablet,
          HERO.paddingTop.desktop,
          HERO.paddingBottom.mobile,
          HERO.paddingBottom.tablet,
          HERO.paddingBottom.desktop
        )}
        style={{ zIndex: Z_INDEX.content }}
      >
        <HeroContent 
          currentMovie={currentMovie}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          t={t}
        />
      </div>

      {/* Carousel Strip */}
      <HeroCarousel 
        heroMovies={heroMovies}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        isHovering={isHovering}
      />
    </section>
  );
}

// Background Component - Separated for clarity
function HeroBackground({ currentMovie }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentMovie.id}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
        className="absolute inset-0"
        style={{ zIndex: Z_INDEX.background }}
      >
        {/* Main Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentMovie.backdrop_path})` }}
        />
        
        {/* Multi-Layer Overlays for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-background/40" />
        <div className="absolute inset-0 bg-black/15 mix-blend-overlay" />
      </motion.div>
    </AnimatePresence>
  );
}

// Content Component - Structured with clear hierarchy
function HeroContent({ currentMovie, isFavorite, toggleFavorite, t }) {
  return (
    <div className="w-full space-y-5 md:space-y-6 lg:space-y-8">
      
      {/* 1. Metadata Block */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        key={`meta-${currentMovie.id}`}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        className={cn("flex items-center gap-4 flex-wrap", HERO.contentMaxWidth.metadata)}
      >
        <motion.span 
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-primary via-primary to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-2xl shadow-primary/40 backdrop-blur-md uppercase tracking-wider border border-white/20"
        >
          {t('hero.featured')}
        </motion.span>
        
        <div className="flex items-center gap-4 text-sm md:text-base text-gray-100 font-medium">
          <span className="flex items-center gap-2 backdrop-blur-md bg-white/10 px-3 py-1 rounded-full border border-white/20">
            <Calendar className="w-4 h-4 text-gray-300" /> 
            {new Date(currentMovie.release_date).getFullYear()}
          </span>
          <span className="flex items-center gap-2 backdrop-blur-md bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-3 py-1 rounded-full border border-yellow-400/30">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> 
            <span className="text-yellow-100 font-bold">{currentMovie.vote_average.toFixed(1)}</span>
          </span>
        </div>
      </motion.div>

      {/* 2. Title Block */}
      <motion.h1
        key={`title-${currentMovie.id}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
        className={cn(
          "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]",
          HERO.contentMaxWidth.title
        )}
        style={{
          textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)'
        }}
      >
        {currentMovie.title}
      </motion.h1>

      {/* 3. Description Block */}
      <motion.p
        key={`desc-${currentMovie.id}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
        className={cn(
          "text-base sm:text-lg md:text-xl text-gray-200 line-clamp-3 font-normal leading-relaxed",
          HERO.contentMaxWidth.description
        )}
        style={{
          textShadow: '0 2px 10px rgba(0,0,0,0.8)'
        }}
      >
        {currentMovie.overview}
      </motion.p>

      {/* 4. Actions Block - Separated with clear margin */}
      <motion.div
        key={`actions-${currentMovie.id}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
        className={cn(
          "flex flex-wrap items-center gap-4 pt-4 md:pt-6",
          HERO.contentMaxWidth.actions
        )}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link 
            to={`/movie/${currentMovie.id}`}
            className="group px-8 py-3.5 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-all duration-300 flex items-center gap-3 shadow-2xl shadow-black/40 active:scale-95 text-sm md:text-base"
          >
            <Info className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {t('hero.viewDetails')}
          </Link>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <button 
            onClick={() => toggleFavorite(currentMovie)}
            className={cn(
              "w-12 h-12 md:w-14 md:h-14 rounded-full backdrop-blur-xl border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl",
              isFavorite(currentMovie.id) 
                ? "bg-primary/20 border-primary text-primary shadow-primary/30" 
                : "bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50"
            )}
            title={isFavorite(currentMovie.id) ? t('hero.removeFromFavorites') : t('hero.addToFavorites')}
          >
            <Heart className={cn("w-5 h-5 md:w-6 md:h-6 transition-all duration-300", isFavorite(currentMovie.id) && "fill-current scale-110")} />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Carousel Component - Separated for modularity
function HeroCarousel({ heroMovies, currentIndex, setCurrentIndex, isHovering }) {
  return (
    <div 
      className="absolute bottom-0 right-0 left-0 pb-8 hidden md:block bg-gradient-to-t from-background via-background/95 to-transparent pt-40"
      style={{ zIndex: Z_INDEX.carousel }}
    >
      <div className={getContainerClasses()}>
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-4" style={{ scrollBehavior: 'smooth' }}>
          {heroMovies.map((movie, index) => (
            <motion.button
              key={movie.id}
              onClick={() => setCurrentIndex(index)}
              onMouseEnter={() => setCurrentIndex(index)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.05 }}
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative flex-shrink-0 w-36 md:w-44 lg:w-52 aspect-[16/9] rounded-xl overflow-hidden transition-all duration-300 ease-out group/thumb shadow-2xl",
                index === currentIndex 
                  ? "ring-2 ring-primary scale-105 z-10 shadow-primary/40" 
                  : "opacity-50 hover:opacity-100 backdrop-blur-sm"
              )}
            >
              <img 
                src={movie.backdrop_path} 
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className={cn(
                "absolute inset-0 transition-all duration-300",
                index === currentIndex
                  ? "bg-gradient-to-t from-black/60 via-transparent to-transparent"
                  : "bg-black/50 group-hover/thumb:bg-black/30"
              )} />
              
              <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover/thumb:translate-y-0 transition-transform duration-300">
                <p className="text-white text-xs font-semibold line-clamp-2 drop-shadow-lg">
                  {movie.title}
                </p>
              </div>
              
              {index === currentIndex && !isHovering && (
                <motion.div 
                  layoutId="carousel-progress"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 8, ease: "linear" }}
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-primary shadow-lg shadow-primary/50"
                />
              )}
              
              {index === currentIndex && (
                <motion.div
                  layoutId="carousel-indicator"
                  className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
          <div className="w-6 flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}

// Skeleton Component
function HeroSkeleton() {
  return (
    <div 
      className="w-full bg-muted animate-pulse relative"
      style={getHeroHeightStyle()}
    >
      <div className={cn(
        "absolute bottom-32 space-y-6",
        getContainerClasses()
      )}>
        <div className="h-6 w-32 bg-muted-foreground/20 rounded" />
        <div className="h-12 md:h-16 w-3/4 max-w-2xl bg-muted-foreground/20 rounded" />
        <div className="h-4 w-full max-w-lg bg-muted-foreground/20 rounded" />
        <div className="h-4 w-2/3 max-w-lg bg-muted-foreground/20 rounded" />
        <div className="flex gap-4 pt-4">
          <div className="h-12 w-40 rounded-full bg-muted-foreground/20" />
          <div className="h-12 w-12 rounded-full bg-muted-foreground/20" />
        </div>
      </div>
    </div>
  );
}
