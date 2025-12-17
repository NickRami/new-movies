import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

/**
 * GenresMegaMenu
 * 
 * Simple vertical list menu that opens on hover.
 * Follows the pattern shown in the reference image.
 */

export default function GenresMegaMenu({ genres, onGenreClick }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative hidden lg:block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger */}
      <button
        className={cn(
          "flex items-center gap-1.5",
          "text-sm font-medium",
          "text-muted-foreground hover:text-foreground",
          "transition-all duration-300",
          "px-3 py-1.5 rounded-full",
          "hover:bg-white/5",
          isOpen && "bg-white/5 text-foreground"
        )}
      >
        <span>Genres</span>
        <ChevronDown 
          className={cn(
            "w-4 h-4 transition-transform duration-300",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      {/* Mega Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "absolute left-0 top-full mt-2",
              "w-56",
              "backdrop-blur-2xl bg-background/95",
              "border border-white/10",
              "rounded-xl shadow-2xl",
              "py-2",
              "max-h-[500px] overflow-y-auto",
              "z-50"
            )}
          >
            {genres.map((genre, index) => (
              <motion.div
                key={genre.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02, duration: 0.2 }}
              >
                <Link
                  to={`/search?genre=${genre.id}&name=${encodeURIComponent(genre.name)}`}
                  onClick={() => {
                    onGenreClick(genre);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "block px-4 py-2.5",
                    "text-sm font-medium text-muted-foreground",
                    "hover:text-foreground hover:bg-primary/10",
                    "transition-all duration-200",
                    "border-l-2 border-transparent",
                    "hover:border-primary"
                  )}
                >
                  {genre.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
