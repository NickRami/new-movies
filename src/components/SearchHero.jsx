import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Calendar, Info, Heart, Play } from 'lucide-react';
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

// Background Component - Deep & Immersive
function HeroBackground({ currentMovie }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentMovie.id}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} // Custom easeOutCubic approx for cinematic feel
        className="absolute inset-0"
        style={{ zIndex: Z_INDEX.background }}
      >
        {/* Main Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentMovie.backdrop_path})` }}
        />
        
        {/* Professional Gradient Layering */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>
    </AnimatePresence>
  );
}

// Content Component - Clean, Minimal, Impactful
function HeroContent({ currentMovie, isFavorite, toggleFavorite, t }) {
  return (
    <div className="w-full space-y-4 md:space-y-6 lg:space-y-8 max-w-4xl">
      
      {/* 1. Badge & Meta */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        key={`meta-${currentMovie.id}`}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex items-center flex-wrap gap-3"
      >
        <span className="bg-primary text-white text-[10px] md:text-xs font-bold px-2.5 py-1 rounded shadow-lg shadow-primary/20 uppercase tracking-widest">
          {t('hero.featured')}
        </span>
        
        <div className="flex items-center gap-3 text-sm font-medium text-gray-200">
          <span className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-accent fill-accent" /> 
            {currentMovie.vote_average.toFixed(1)}
          </span>
          <span className="w-1 h-1 bg-white/30 rounded-full" />
          <span>{new Date(currentMovie.release_date).getFullYear()}</span>
        </div>
      </motion.div>

      {/* 2. Title */}
      <motion.h1
        key={`title-${currentMovie.id}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black text-white leading-[0.95] tracking-tight drop-shadow-xl"
      >
        {currentMovie.title}
      </motion.h1>

      {/* 3. Description (Overview) */}
      <motion.p
        key={`desc-${currentMovie.id}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-base sm:text-lg text-gray-300 line-clamp-2 md:line-clamp-3 max-w-2xl font-body leading-relaxed drop-shadow-md"
      >
        {currentMovie.overview}
      </motion.p>

      {/* 4. Actions */}
      <motion.div
        key={`actions-${currentMovie.id}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex flex-wrap items-center gap-3 md:gap-4 pt-2 md:pt-4"
      >
        <Link 
          to={`/movie/${currentMovie.id}`}
          className="group px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center gap-2 shadow-lg shadow-white/10 active:scale-95 text-sm md:text-base"
        >
          <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
          {t('hero.viewDetails')}
        </Link>
        
        <button 
          onClick={() => toggleFavorite(currentMovie)}
          className={cn(
            "group px-6 py-3 rounded-lg border font-medium flex items-center gap-2 transition-all duration-200 active:scale-95 text-sm md:text-base backdrop-blur-sm",
            isFavorite(currentMovie.id) 
              ? "bg-primary/20 border-primary text-primary hover:bg-primary/30" 
              : "bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/40"
          )}
        >
          <Heart className={cn("w-4 h-4 transition-transform", isFavorite(currentMovie.id) ? "fill-current" : "group-hover:scale-110")} />
          {isFavorite(currentMovie.id) ? t('hero.removeFromFavorites') : t('hero.addToFavorites')}
        </button>
      </motion.div>
    </div>
  );
}

// Carousel Component - Sleek & Modern
function HeroCarousel({ heroMovies, currentIndex, setCurrentIndex, isHovering }) {
  return (
    <div 
      className="absolute bottom-0 right-0 z-20 hidden lg:block w-1/2 p-12 pr-16 xl:pr-32"
      style={{ zIndex: Z_INDEX.carousel }}
    >
        <div className="flex justify-end gap-4 overflow-visible">
          {heroMovies.slice(0, 3).map((movie, relativeIndex) => {
             // Logic to show next 3 items essentially, simplified for this layout
             const actualIndex = (currentIndex + relativeIndex + 1) % heroMovies.length;
             const item = heroMovies[actualIndex];

             return (
              <motion.button
                key={item.id}
                onClick={() => setCurrentIndex(actualIndex)}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * relativeIndex }}
                whileHover={{ y: -5 }}
                className="relative w-40 aspect-video rounded-lg overflow-hidden border border-white/20 shadow-2xl group transition-all hover:border-white/50"
              >
                <img 
                  src={item.backdrop_path} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-[10px] text-white font-bold truncate">{item.title}</p>
                </div>
              </motion.button>
             );
          })}
        </div>
        
        {/* Progress Bar for Current Item */}
        {!isHovering && (
           <motion.div 
             layoutId="hero-progress"
             className="h-1 bg-white/20 mt-6 rounded-full overflow-hidden w-full max-w-md ml-auto"
           >
              <motion.div 
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 8, ease: "linear", repeat: 0 }}
                className="h-full bg-primary origin-left"
              />
           </motion.div>
        )}
    </div>
  );
}

// Skeleton Component
function HeroSkeleton() {
  return (
    <div 
      className="w-full bg-background animate-pulse relative"
      style={getHeroHeightStyle()}
    >
      <div className={cn(
        "absolute bottom-0 left-0 w-full mb-24 md:mb-32",
        getContainerClasses()
      )}>
         <div className="max-w-3xl space-y-6">
            <div className="h-4 w-24 bg-white/10 rounded" />
            <div className="h-12 md:h-16 w-3/4 bg-white/10 rounded-lg" />
            <div className="h-4 w-full bg-white/10 rounded" />
            <div className="h-4 w-2/3 bg-white/10 rounded" />
            <div className="flex gap-4 pt-4">
               <div className="h-12 w-32 bg-white/10 rounded-lg" />
               <div className="h-12 w-32 bg-white/10 rounded-lg" />
            </div>
         </div>
      </div>
    </div>
  );
}
