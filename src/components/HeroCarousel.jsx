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
         
         <div className="w-full max-w-[1400px] mx-auto px-4 perspective-[1200px]">
            
            {config.isMobile ? (
                // Mobile View
                <div className="flex flex-col space-y-4">
                     <div className="px-4 mb-4 text-center">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-2 border border-primary/20">
                            <Sparkles className="w-3 h-3" />
                            Estreno
                        </span>
                        <h1 className="text-3xl font-extrabold text-white mb-2 leading-tight">
                            {activeMovie?.title}
                        </h1>
                        <p className="text-sm text-gray-300 line-clamp-2 mb-4">
                            {activeMovie?.overview}
                        </p>
                        <Link to={`/movie/${activeMovie?.id}`}>
                            <Button className="w-full bg-white text-black hover:bg-gray-200">
                                <Play className="w-4 h-4 mr-2 fill-current" /> Ver Detalles
                            </Button>
                        </Link>
                     </div>

                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-8 pb-8 no-scrollbar touch-pan-x">
                        {displayMovies.map((movie, idx) => (
                            <Link to={`/movie/${movie.id}`} key={movie.id} className="snap-center shrink-0 w-[200px] aspect-[2/3] relative rounded-xl overflow-hidden shadow-lg border border-white/10"
                                onClick={(e) => { 
                                    // If clicking non-active, just scroll logic if needed, or allow router link
                                    // For this simple mobile implementation, link is fine.
                                }}
                            >
                                <img 
                                    src={movie.poster_path} 
                                    alt={movie.title} 
                                    className="w-full h-full object-cover"
                                />
                                {/* Mobile active indicator if we wanted, but not strictly needed for flat list */}
                            </Link>
                        ))}
                    </div>
                </div>
            ) : (
                // Desktop View: Optimized 3D Coverflow
                <div className="flex flex-col items-center">
                    {/* Header Info */}
                    <div className="mb-6 md:mb-10 text-center max-w-2xl mx-auto space-y-4 h-[200px] flex flex-col justify-end pb-4 pointer-events-none">
                        <motion.div
                            key={activeMovie?.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="pointer-events-auto"
                        >
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-rose-400 text-xs font-bold uppercase tracking-widest mb-4 shadow-glow">
                                <Sparkles className="w-3 h-3" />
                                Estrenos Destacados
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-4 drop-shadow-2xl line-clamp-1 pb-1">
                                {activeMovie?.title}
                            </h1>
                             <div className="flex items-center justify-center gap-4 text-sm text-gray-400 mb-6">
                                <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4" /> {formatDate(activeMovie?.release_date)}</span>
                                <span className="w-1 h-1 bg-gray-600 rounded-full" />
                                <span className="flex items-center gap-1 text-yellow-500"><Star className="w-4 h-4 fill-current" /> {activeMovie?.vote_average?.toFixed(1)}</span>
                            </div>
                            
                            <div className="flex justify-center gap-4">
                                <Link to={`/movie/${activeMovie?.id}`}>
                                    <Button size="lg" className="rounded-full bg-white text-black hover:bg-gray-200 font-bold px-8 shadow-glow transition-transform hover:scale-105">
                                        <Play className="w-4 h-4 mr-2 fill-black" /> Ver Ahora
                                    </Button>
                                </Link>
                                <Link to={`/movie/${activeMovie?.id}`}>
                                    <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/10 font-bold px-8 backdrop-blur-sm transition-transform hover:scale-105">
                                        <Info className="w-4 h-4 mr-2" /> Más Info
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* 3D Cards Container */}
                    <div className="relative h-[300px] md:h-[350px] lg:h-[400px] w-full flex items-center justify-center preserve-3d will-change-transform">
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

                    {/* Navigation Controls */}
                    <div className="flex items-center gap-8 mt-8">
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
