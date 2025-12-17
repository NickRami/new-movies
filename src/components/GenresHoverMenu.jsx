import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

/**
 * GenresHoverMenu
 * 
 * Professional hover menu with correct behavior:
 * - Opens on hover over trigger
 * - Stays open when moving to menu items
 * - Closes only when mouse leaves the entire area (trigger + menu)
 * - No flickering or accidental closes
 * 
 * Key Implementation Details:
 * 
 * 1. **Wrapper Strategy**: Both trigger and menu are wrapped in a common container.
 *    The onMouseEnter/onMouseLeave are on this wrapper, not individual elements.
 * 
 * 2. **No Gap**: Menu is positioned immediately below trigger with no gap,
 *    preventing the menu from closing when moving between them.
 * 
 * 3. **Absolute Positioning**: Menu uses absolute positioning relative to wrapper,
 *    ensuring it's part of the same hover area.
 * 
 * 4. **No Timeouts**: Pure CSS/React state, no artificial delays.
 */

export default function GenresHoverMenu({ genres, onGenreClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    // Wrapper: Contains both trigger and menu
    // This is the hover boundary - mouse leaving this closes the menu
    <div 
      className="relative hidden lg:block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger Button */}
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
        <span>{t('nav.genres')}</span>
        <ChevronDown 
          className={cn(
            "w-4 h-4 transition-transform duration-300",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              // Positioning - NO GAP to prevent flickering
              "absolute left-0 top-full",
              // NO mt-2 here! We use padding-top inside instead
              
              // Dimensions
              "w-[480px]",
              
              // Visual
              "backdrop-blur-2xl bg-background/95",
              "border border-white/10",
              "rounded-xl shadow-2xl",
              
              // Z-index
              "z-50"
            )}
          >
            {/* Invisible bridge - creates visual gap without breaking hover */}
            <div className="h-2" /> 
            
            {/* Actual content with padding */}
            <div className="p-4">
              {/* Header */}
              <div className="mb-4 pb-3 border-b border-white/10">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  {t('nav.genresMenuTitle')}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {t('nav.genresMenuSubtitle')}
                </p>
              </div>

              {/* Genres Grid - 3 columns for easy scanning */}
              <div className="grid grid-cols-3 gap-1 max-h-[400px] overflow-y-auto">
                {genres.map((genre, index) => (
                  <motion.div
                    key={genre.id}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02, duration: 0.2 }}
                  >
                    <Link
                      to={`/search?genre=${genre.id}&name=${encodeURIComponent(genre.name)}`}
                      onClick={() => {
                        onGenreClick(genre);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "block px-3 py-2.5",
                        "text-sm font-medium text-muted-foreground",
                        "hover:text-foreground hover:bg-primary/10",
                        "transition-all duration-200",
                        "rounded-lg",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      )}
                    >
                      {genre.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * EXPLANATION OF HOVER BEHAVIOR
 * 
 * Why this works without flickering:
 * 
 * 1. **Single Hover Boundary**: 
 *    The wrapper div has onMouseEnter/onMouseLeave.
 *    As long as the mouse is within this div (trigger OR menu), isOpen stays true.
 * 
 * 2. **Absolute Positioning**:
 *    The menu is positioned absolute relative to the wrapper.
 *    This makes it part of the same DOM hierarchy and hover area.
 * 
 * 3. **Invisible Bridge Technique** (KEY FIX):
 *    Instead of using margin-top (mt-2) which creates a gap OUTSIDE the menu,
 *    we use an invisible div (h-2) INSIDE the menu.
 *    
 *    ❌ BAD (causes flickering):
 *    <div className="absolute top-full mt-2">  ← Gap outside menu
 *      <div className="p-4">Content</div>
 *    </div>
 *    
 *    ✅ GOOD (no flickering):
 *    <div className="absolute top-full">  ← No gap
 *      <div className="h-2" />  ← Invisible bridge inside
 *      <div className="p-4">Content</div>
 *    </div>
 *    
 *    This creates the VISUAL gap without breaking the hover area!
 * 
 * 4. **AnimatePresence**:
 *    Framer Motion's AnimatePresence handles the exit animation smoothly
 *    without interfering with hover detection.
 * 
 * Common Mistakes to Avoid:
 * 
 * ❌ Separate onMouseEnter/onMouseLeave on trigger and menu
 *    → Causes flickering when moving between them
 * 
 * ❌ Using margin-top for gap
 *    → Creates dead zone, mouse leaves hover area
 * 
 * ❌ Using setTimeout to delay close
 *    → Artificial, not responsive to actual mouse position
 * 
 * ❌ Menu not inside wrapper
 *    → Not part of hover boundary
 * 
 * ✅ This implementation:
 *    → Clean, predictable, professional behavior
 *    → No flickering, no dead zones
 *    → Visual gap without breaking hover
 */
