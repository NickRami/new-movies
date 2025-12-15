import { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Play,
  Sparkles,
  Star,
  Info
} from 'lucide-react';
import { Button } from './ui/button';
import { useUpcomingMovies } from '../hooks/useMovies';
import { cn } from '../lib/utils';

const DRAG_THRESHOLD = 50;

function formatDate(dateString) {
  if (!dateString) return 'Próximamente';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function HeroCarousel() {
  const { movies, loading, error } = useUpcomingMovies();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Responsive configuration
  const [config, setConfig] = useState({
    isMobile: false,
    cardWidth: 260,
    gap: 240,
    zDepth: 350
  });

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const isMobile = width < 768; // Mobile breakpoint
      
      let cardWidth = 260; // Default Desktop
      let gap = 240;
      let zDepth = 350;

      if (width >= 768 && width < 1024) {
          // Tablet
          cardWidth = 200;
          gap = 160;
          zDepth = 280;
      } else if (width >= 1024 && width < 1440) {
          // Small Desktop / Laptop
          cardWidth = 240;
          gap = 210;
          zDepth = 320;
      } else if (width >= 1440) {
          // Large Desktop
          cardWidth = 280;
          gap = 260;
          zDepth = 400;
      }

      setConfig({ isMobile, cardWidth, gap, zDepth });
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Limit movies for carousel performance
  const displayMovies = useMemo(() => movies.slice(0, 15), [movies]);

  // Auto-play with Pause mechanism
  useEffect(() => {
     if (!displayMovies.length || config.isMobile || isPaused) return;
     const interval = setInterval(() => {
        setActiveIndex(prev => (prev === displayMovies.length - 1 ? 0 : prev + 1));
     }, 5000);
     return () => clearInterval(interval);
  }, [displayMovies.length, config.isMobile, isPaused]);


  const nextSlide = () => {
    setActiveIndex((prev) => (prev === displayMovies.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? displayMovies.length - 1 : prev - 1));
  };
  
  // Calculate visible indices to reduce DOM nodes
  const visibleIndices = useMemo(() => {
     const indices = [];
     for (let i = -3; i <= 3; i++) {
         let idx = activeIndex + i;
         if (idx < 0) idx = displayMovies.length + idx;
         if (idx >= displayMovies.length) idx = idx - displayMovies.length;
         indices.push({ index: idx, offset: i });
     }
     return indices;
  }, [activeIndex, displayMovies.length]);

  if (loading && displayMovies.length === 0) return null;
  if (error && displayMovies.length === 0) return null;

  const activeMovie = displayMovies[activeIndex];

  return (
    <div 
        className="relative h-[85vh] w-full overflow-hidden bg-background"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. LAYER: Background Backdrop */}
      <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
              key={activeMovie?.id || "default"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0 z-0 overflow-hidden"
          >
              {activeMovie?.backdrop_path ? (
                  <>
                    <img 
                        src={activeMovie.backdrop_path} 
                        alt="Backdrop" 
                        className="w-full h-full object-cover opacity-30 select-none blur-sm"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
                  </>
              ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-background" />
              )}
          </motion.div>
      </AnimatePresence>

      
      {/* 2. LAYER: Content & 3D Carousel */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center">
         
         <div className="container mx-auto px-4 lg:px-8 perspective-[1200px]">
            
            {config.isMobile ? (
                // Mobile View
                <div className="flex flex-col space-y-6 pt-4">
                     <div className="px-4 text-center space-y-3">
                        {/* Tag */}
                        <div className="flex justify-center">
                             <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-white/70 text-[10px] font-semibold uppercase tracking-widest backdrop-blur-md">
                                <Sparkles className="w-3 h-3 text-yellow-400" />
                                Estreno
                            </span>
                        </div>
                        
                        {/* Title */}
                        <h1 className="text-3xl font-bold text-white tracking-tight leading-none drop-shadow-lg line-clamp-2">
                            {activeMovie?.title}
                        </h1>
                        
                        {/* Meta */}
                        <div className="flex items-center justify-center gap-3 text-xs font-medium text-white/60">
                            <span>{new Date(activeMovie?.release_date).getFullYear()}</span>
                            <span className="w-1 h-1 bg-white/30 rounded-full" />
                            <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                <span className="text-white/80">{activeMovie?.vote_average?.toFixed(1)}</span>
                            </div>
                        </div>
                     </div>

                    {/* Snap List */}
                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-8 pb-4 no-scrollbar touch-pan-x">
                        {displayMovies.map((movie, idx) => (
                            <Link to={`/movie/${movie.id}`} key={movie.id} className="snap-center shrink-0 w-[200px] aspect-[2/3] relative rounded-xl overflow-hidden shadow-lg border border-white/10"
                                onClick={(e) => { 
                                     // Optional: scroll active logic
                                }}
                            >
                                <img 
                                    src={movie.poster_path} 
                                    alt={movie.title} 
                                    className="w-full h-full object-cover"
                                />
                            </Link>
                        ))}
                    </div>
                    
                    {/* Mobile Button at bottom */}
                    <div className="px-8 pb-2">
                         <Link to={`/movie/${activeMovie?.id}`}>
                             <Button className="w-full h-12 rounded-xl bg-white text-black font-bold shadow-lg text-base">
                                 Ver Detalles
                             </Button>
                         </Link>
                    </div>
                </div>
            ) : (
                // Desktop View: Optimized 3D Coverflow
                <div className="flex flex-col items-center justify-center h-full pb-10">
                    {/* Header Info - Modern Typography */}
                    <div className="relative z-[60] text-center max-w-4xl mx-auto flex flex-col items-center justify-end pointer-events-none mb-6">
                        <motion.div
                            key={activeMovie?.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="pointer-events-auto flex flex-col items-center space-y-3 md:space-y-4"
                        >
                            {/* Premium Tag */}
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/80 text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] shadow-sm">
                                <Sparkles className="w-3 h-3 text-amber-300" />
                                Estreno Exclusivo
                            </span>

                            {/* Cinema Title - Responsive Sizes */}
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tighter leading-[1.05] drop-shadow-2xl max-w-4xl px-4 line-clamp-2 pb-1">
                                {activeMovie?.title}
                            </h1>
                            
                            {/* Metadata Row */}
                             <div className="flex items-center gap-4 md:gap-6 text-sm md:text-base font-medium text-white/60 tracking-wide">
                                <span className="text-white/90">{formatDate(activeMovie?.release_date)}</span>
                                <span className="w-1 h-1 bg-white/20 rounded-full" />
                                <div className="flex items-center gap-2 text-white/90">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    <span>{activeMovie?.vote_average?.toFixed(1)}</span>
                                </div>
                                <span className="w-1 h-1 bg-white/20 rounded-full" />
                                <span className="hidden sm:inline">Película</span>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex items-center gap-4 pt-4 md:pt-6">
                                <Link to={`/movie/${activeMovie?.id}`}>
                                    <Button className="h-10 md:h-12 px-6 md:px-8 rounded-xl bg-white text-black hover:bg-gray-200 font-bold text-sm md:text-base transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                        <Play className="w-4 h-4 md:w-5 md:h-5 mr-2 fill-current" /> Reproducir
                                    </Button>
                                </Link>
                                <Link to={`/movie/${activeMovie?.id}`}>
                                    <Button variant="outline" className="h-10 md:h-12 px-6 md:px-8 rounded-xl border-white/20 bg-white/5 text-white hover:bg-white/10 font-medium text-sm md:text-base backdrop-blur-md transition-all hover:scale-105">
                                        <Info className="w-4 h-4 md:w-5 md:h-5 mr-2" /> Más Información
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* 3D Cards Container */}
                    <div className="relative h-[280px] md:h-[340px] lg:h-[400px] w-full flex items-center justify-center preserve-3d will-change-transform mt-auto mb-auto">
                        <AnimatePresence initial={false}>
                             {visibleIndices.map(({ index: realIndex, offset }) => {
                                const movie = displayMovies[realIndex];
                                return (
                                    <DesktopCard
                                        key={movie.id}
                                        movie={movie}
                                        isActive={offset === 0}
                                        offset={offset}
                                        config={config}
                                        onClick={() => setActiveIndex(realIndex)}
                                        onDrag={(dir) => dir === 'left' ? nextSlide() : prevSlide()}
                                    />
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {/* Navigation Controls - Absolute bottom or flex */}
                    <div className="flex items-center gap-8 mt-2 md:mt-6 z-50">
                         <button 
                            onClick={prevSlide} 
                            className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-110 active:scale-95"
                            aria-label="Previous"
                         >
                            <ChevronLeft className="w-6 h-6" />
                         </button>
                         {/* Simple Indicators */}
                         <div className="flex gap-1.5">
                             {displayMovies.slice(0, 8).map((_, idx) => (
                                 <div 
                                    key={idx} 
                                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex || (activeIndex >= 8 && idx===7) ? 'w-8 bg-primary shadow-glow-primary' : 'w-1.5 bg-white/20'}`} 
                                 />
                             ))}
                         </div>
                         <button 
                            onClick={nextSlide} 
                            className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-110 active:scale-95"
                            aria-label="Next"
                         >
                            <ChevronRight className="w-6 h-6" />
                         </button>
                    </div>
                </div>
            )}
         </div>
      </div>
    </div>
  );
}

// Optimized Card Component
function DesktopCard({ movie, isActive, offset, config, onClick, onDrag }) {
    
    const absOffset = Math.abs(offset);
    const zIndex = 50 - absOffset;
    
    // 3D Transform values
    const x = offset * config.gap;
    const z = -absOffset * config.zDepth; 
    const rotateY = offset > 0 ? -25 : offset < 0 ? 25 : 0;
    const scale = 1 - absOffset * 0.15;
    const opacity = Math.max(0, 1 - absOffset * 0.4);

    const handleDragEnd = (_, info) => {
        if (Math.abs(info.offset.x) > 20) { 
             if (info.offset.x < 0) onDrag("left");
             else onDrag("right");
        }
    };

    return (
        <motion.div
            // 'layout' removed for pure 3D transform control
            className={cn(
                "absolute aspect-[2/3] rounded-2xl overflow-hidden cursor-pointer shadow-2xl bg-black origin-center",
                isActive ? "ring-2 ring-primary/80 shadow-[0_0_50px_rgba(220,38,38,0.5)] z-50 brightness-110" : "grayscale-[0.7] hover:grayscale-[0.2] brightness-[0.4] hover:brightness-[0.6]"
            )}
            style={{ 
                zIndex,
                width: config.cardWidth,
            }} 
            initial={false}
            animate={{
                x,
                z,
                rotateY,
                scale,
                opacity,
            }}
            transition={{ 
                type: "spring", 
                stiffness: 120, // Slightly softer spring for premium feel
                damping: 20, 
                mass: 1 
            }}
            onClick={onClick}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.05} 
            onDragEnd={handleDragEnd}
            whileHover={isActive ? { scale: 1.02 } : {}}
        >
            <img 
                src={movie.poster_path} 
                alt={movie.title} 
                className="w-full h-full object-cover select-none pointer-events-none" 
            />
            {/* Gloss Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Darker scrim for non-active cards */}
            {!isActive && (
                <div className="absolute inset-0 bg-black/40 transition-colors duration-500" />
            )}
        </motion.div>
    );
}

export default HeroCarousel;
