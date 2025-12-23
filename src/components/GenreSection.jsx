import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';

export default function GenreSection({ section, sectionIndex }) {
  const scrollContainerRef = useRef(null);
  const { t } = useTranslation();

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      // Scroll by 70% of the visible width for better UX
      const scrollAmount = direction === 'left' ? -current.offsetWidth * 0.7 : current.offsetWidth * 0.7;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + sectionIndex * 0.15, duration: 0.6, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between gap-2 glass-dark p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 group">
        <motion.h3 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 + sectionIndex * 0.15, duration: 0.5 }}
          className="text-2xl font-semibold text-foreground pl-3 border-l-4 border-primary"
        >
          {section.genre.name}
        </motion.h3>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('left')}
            className="h-9 w-9 rounded-full bg-background/50 hover:bg-primary hover:text-white border border-border/50 transition-all"
            aria-label={t('common.previous')}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('right')}
            className="h-9 w-9 rounded-full bg-background/50 hover:bg-primary hover:text-white border border-border/50 transition-all"
            aria-label={t('common.next')}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
      
      {/* Horizontal Scrollable Carousel */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-4 pt-2 no-scrollbar pl-1 snap-x snap-mandatory scroll-smooth"
      >
        {section.movies.map((movie, index) => (
          <div
            key={movie.id}
            className="w-36 sm:w-40 md:w-44 flex-shrink-0 transition-transform duration-300 hover:scale-105 snap-start"
          >
            <MovieCard movie={movie} index={index} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
