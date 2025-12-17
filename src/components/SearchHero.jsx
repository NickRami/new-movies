import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Calendar, Info, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTrendingMovies } from '../hooks/useMovies';
import { useFavorites } from '../context/FavoritesContext';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';

export default function SearchHero() {
  const { movies, loading } = useTrendingMovies();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
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
      className="relative min-h-[85vh] w-full overflow-hidden flex flex-col justify-end group/hero"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      
      {/* 1. Cinematic Background & Overlays */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMovie.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          {/* Main Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentMovie.backdrop_path})` }}
          />
          
          {/* Refined Overlays for Readability */}
          {/* Vertical gradient from bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          {/* Horizontal gradient from left (stronger for text contrast) */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
          
          {/* Subtle Texture/Grain (Optional, keeping simple as requested) */}
           <div className="absolute inset-0 bg-black/10" />
        </motion.div>
      </AnimatePresence>

      {/* 2. Content Layer - Refined Layout & Spacing */}
      {/* Main container with optimized responsiveness for 1366px laptops - Adjusted Spacing */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 lg:px-12 xl:px-24 pt-28 pb-32 lg:pb-32 xl:pb-36 2xl:pb-48 h-full flex flex-col justify-center lg:justify-end">
        
        <div className="max-w-2xl lg:max-w-3xl xl:max-w-4xl space-y-6 lg:space-y-8">
          {/* Metadata Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={`meta-${currentMovie.id}`}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-4 mb-2"
          >
             <span className="bg-primary/90 text-primary-foreground text-xs font-bold px-3 py-1 rounded-md shadow-lg shadow-primary/20 backdrop-blur-md uppercase tracking-wider">
                {t('hero.featured')}
             </span>
             <div className="flex items-center gap-3 text-sm md:text-base text-gray-200 font-medium">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-gray-400" /> {new Date(currentMovie.release_date).getFullYear()}</span>
                <span className="text-gray-500">•</span>
                <span className="flex items-center gap-1.5 text-yellow-400 font-semibold"><Star className="w-4 h-4 fill-current" /> {currentMovie.vote_average.toFixed(1)}</span>
             </div>
          </motion.div>

          {/* Title - Optimized Typography for Laptop (1366x768) */}
          <motion.h1
            key={`title-${currentMovie.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold text-white tracking-tight leading-[1.1] drop-shadow-2xl max-w-4xl"
          >
            {currentMovie.title}
          </motion.h1>

          {/* Overview - Improved Readability & Breathing Room */}
          <motion.p
            key={`desc-${currentMovie.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-base md:text-lg xl:text-xl text-gray-300 line-clamp-3 max-w-xl xl:max-w-2xl font-light leading-relaxed drop-shadow-md mb-2"
          >
            {currentMovie.overview}
          </motion.p>


          {/* Actions - Button Hierarchy & Spacing */}
          <motion.div
            key={`actions-${currentMovie.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap items-center gap-4 md:gap-6 mt-8 md:mt-10 pointer-events-auto"
          >
            <Link 
              to={`/movie/${currentMovie.id}`}
              className="group px-8 py-3.5 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 flex items-center gap-2.5 shadow-xl shadow-black/20 active:scale-95 z-30 text-sm md:text-base"
            >
              <Info className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {t('hero.viewDetails')}
            </Link>
            
            <button 
              onClick={() => toggleFavorite(currentMovie)}
              className={cn(
                "w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:scale-105 active:scale-95 z-30",
                isFavorite(currentMovie.id) ? "bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]" : "text-white"
              )}
              title={isFavorite(currentMovie.id) ? t('hero.removeFromFavorites') : t('hero.addToFavorites')}
            >
              <Heart className={cn("w-5 h-5 md:w-6 md:h-6 transition-colors", isFavorite(currentMovie.id) && "fill-current")} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* 4. Movie Strip - Fixed Overflow and Responsive */}
      <div className="absolute bottom-0 right-0 left-0 z-20 pb-6 hidden md:block bg-gradient-to-t from-background via-background/90 to-transparent pt-32">
         <div className="container mx-auto px-6 md:px-12 lg:px-16">
            {/* Added mask image for fade out edges */}
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-4 mask-linear-fade" style={{ scrollBehavior: 'smooth' }}>
               {heroMovies.map((movie, index) => (
                 <button
                   key={movie.id}
                   onClick={() => setCurrentIndex(index)}
                   onMouseEnter={() => setCurrentIndex(index)}
                   className={cn(
                     "relative flex-shrink-0 w-32 md:w-40 lg:w-48 aspect-[16/9] rounded-lg overflow-hidden transition-all duration-300 ease-out group/thumb shadow-lg border border-transparent",
                     index === currentIndex 
                       ? "ring-2 ring-primary scale-105 z-10 border-primary/50 shadow-primary/20" 
                       : "opacity-60 hover:opacity-100 hover:scale-105 hover:border-white/20"
                   )}
                 >
                   <img 
                     src={movie.backdrop_path} 
                     alt={movie.title}
                     className="w-full h-full object-cover"
                   />
                   <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-transparent transition-colors duration-300" />
                   
                   {/* Mini Progress Bar for active item */}
                   {index === currentIndex && !isHovering && (
                     <motion.div 
                       layoutId="progress"
                       initial={{ width: '0%' }}
                       animate={{ width: '100%' }}
                       transition={{ duration: 8, ease: "linear" }}
                       className="absolute bottom-0 left-0 h-1 bg-primary"
                     />
                   )}
                 </button>
               ))}
               {/* Spacer to ensure last item is visible if scrolling */}
               <div className="w-6 flex-shrink-0" />
            </div>
         </div>
      </div>
    </section>
  );
}

function HeroSkeleton() {
    return (
        <div className="h-[85vh] w-full bg-muted animate-pulse relative">
            <div className="absolute bottom-32 left-8 md:left-16 space-y-6">
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
    )
}
