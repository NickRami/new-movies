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
    // Only run if:
    // 1. We have movies
    // 2. User is NOT hovering the carousel controls (isHovering)
    // 3. The tab/window is visible/focused
    if (heroMovies.length > 0 && !isHovering) {
      const interval = setInterval(() => {
        if (!document.hidden) {
           setCurrentIndex((prev) => (prev + 1) % heroMovies.length);
        }
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [heroMovies, isHovering]);

  if (loading || !currentMovie) return <HeroSkeleton />;

  return (
    <section 
      className="relative w-full overflow-hidden"
      style={getHeroHeightStyle()}
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
        setIsHovering={setIsHovering}
        isHovering={isHovering}
        t={t}
      />
    </section>
  );
}

// Hero Background with Cinematic Vignette
function HeroBackground({ currentMovie }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentMovie.id}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} 
        className="absolute inset-0"
        style={{ zIndex: Z_INDEX.background }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentMovie.backdrop_path})` }}
        />
        
        {/* Cinematic Gradient Overlays */}
        {/* 1. Base dimming */}
        <div className="absolute inset-0 bg-black/10" />
        {/* 2. Left-side Heavy Vignette for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        {/* 3. Bottom fade for smooth carousel integration */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </motion.div>
    </AnimatePresence>
  );
}

// Content Component - Developer Design Edition
function HeroContent({ currentMovie, isFavorite, toggleFavorite, t }) {
  return (
    <div className="w-full space-y-6 md:space-y-8 max-w-4xl relative z-10 font-sans">
      
      {/* 1. Ultra-Premium Glass Badge */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        key={`badge-${currentMovie.id}`}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-inner shadow-white/5">
           <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(234,179,8,0.8)]"/>
           <span className="text-[10px] md:text-xs font-bold text-white/90 tracking-[0.2em] uppercase">
             {t('hero.featured')}
           </span>
        </div>
      </motion.div>

      {/* 2. Title - Metallic Gradient Finish */}
      <motion.h1
        key={`title-${currentMovie.id}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
        className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 leading-[0.9] tracking-tighter drop-shadow-2xl"
      >
        {currentMovie.title}
      </motion.h1>

      {/* 3. Metadata - Clean & Monospaced Numbers */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={`meta-${currentMovie.id}`}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="flex items-center gap-6 text-sm md:text-base font-medium text-gray-300"
      >
        <span className="text-white font-mono">{new Date(currentMovie.release_date).getFullYear()}</span>
        <span className="flex items-center gap-1.5 text-accent">
           <Star className="w-4 h-4 fill-current" />
           <span className="font-mono text-white">{currentMovie.vote_average.toFixed(1)}</span>
        </span>
        <span className="px-2 py-0.5 rounded border border-white/20 text-[10px] font-bold tracking-widest uppercase text-white/80">HD</span>
        <span className="px-2 py-0.5 rounded border border-white/20 text-[10px] font-bold tracking-widest uppercase text-white/80">5.1</span>
      </motion.div>

      {/* 4. Description */}
      <motion.p
        key={`desc-${currentMovie.id}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-base sm:text-lg text-gray-400 line-clamp-3 md:line-clamp-3 max-w-2xl font-body leading-relaxed max-h-24"
      >
        {currentMovie.overview}
      </motion.p>

      {/* 5. Actions - Button Shine Effect */}
      <motion.div
        key={`actions-${currentMovie.id}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex flex-wrap items-center gap-4 pt-4"
      >
        <Link 
          to={`/movie/${currentMovie.id}`}
          className="group relative h-12 px-8 bg-white text-black font-bold rounded-lg overflow-hidden flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 active:scale-95"
        >
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent w-full -translate-x-full group-hover:animate-shine z-0" />
          
          <span className="relative z-10 flex items-center gap-2">
            <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
            {t('hero.viewDetails')}
          </span>
        </Link>
        
        <button 
          onClick={() => toggleFavorite(currentMovie)}
          className={cn(
            "h-12 w-12 rounded-lg border flex items-center justify-center transition-all duration-300 active:scale-95 backdrop-blur-md",
            isFavorite(currentMovie.id) 
              ? "bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(124,58,237,0.3)]" 
              : "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/30"
          )}
          title={isFavorite(currentMovie.id) ? t('hero.removeFromFavorites') : t('hero.addToFavorites')}
        >
          <Heart className={cn("w-5 h-5 transition-transform", isFavorite(currentMovie.id) ? "fill-current scale-110" : "group-hover:scale-110")} />
        </button>
      </motion.div>
    </div>
  );
}

// Carousel Component - Sleek & Modern
function HeroCarousel({ heroMovies, currentIndex, setCurrentIndex, setIsHovering, isHovering, t }) {
  // Calculate the visible items (Next 3)
  const visibleItems = [];
  for (let i = 0; i < 3; i++) {
    const index = (currentIndex + i + 1) % heroMovies.length;
    visibleItems.push(heroMovies[index]);
  }

  return (
    <div 
      className="absolute bottom-0 right-0 z-20 hidden lg:block w-1/2 p-12 pr-16 xl:pr-32"
      style={{ zIndex: Z_INDEX.carousel }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
        <div className="flex justify-end gap-4 overflow-visible perspective-[1000px]">
          <AnimatePresence mode='popLayout'>
            {visibleItems.map((item, i) => (
              <motion.button
                layout
                key={item.id}
                onClick={() => setCurrentIndex((currentIndex + i + 1) % heroMovies.length)}
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.9, transition: { duration: 0.3 } }}
                transition={{ duration: 0.5, ease: "circOut" }}
                whileHover={{ y: -5, scale: 1.05, transition: { duration: 0.2 } }}
                className="relative w-40 aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl group transition-shadow hover:border-white/30 hover:shadow-primary/20"
              >
                <img 
                  src={item.backdrop_path} 
                  alt={item.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                  <p className="text-[11px] text-gray-300 font-bold truncate group-hover:text-white transition-colors">
                    {item.title}
                  </p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Progress Bar for Current Item */}
        {!isHovering && (
           <div className="mt-8 flex items-center justify-end gap-3">
             <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">{t('hero.nextUp')}</span>
             <div className="h-1 bg-white/10 rounded-full overflow-hidden w-32">
                <motion.div 
                  key={currentIndex} // Restart animation on index change
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 8, ease: "linear" }}
                  className="h-full bg-primary origin-left shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                />
             </div>
           </div>
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
