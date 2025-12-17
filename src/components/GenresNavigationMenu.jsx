import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Film } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';
import { cn } from '../lib/utils';

/**
 * GenresNavigationMenu
 * 
 * Modern dropdown menu for genres using shadcn/ui NavigationMenu.
 * 
 * Why NavigationMenu over DropdownMenu?
 * 
 * 1. **Hover-first UX**: NavigationMenu is designed for hover interactions,
 *    perfect for desktop navigation patterns (Netflix/Prime style)
 * 
 * 2. **Better Accessibility**: Built-in keyboard navigation, focus management,
 *    and ARIA attributes for screen readers
 * 
 * 3. **Nested Support**: Can handle multi-level menus if needed in the future
 * 
 * 4. **Positioning**: Better viewport-aware positioning and collision detection
 * 
 * 5. **Animation**: Smooth transitions with proper enter/exit animations
 * 
 * DropdownMenu is better for:
 * - Click-to-open menus (user profile, settings)
 * - Mobile-first interactions
 * - Simple single-level menus
 * 
 * NavigationMenu is better for:
 * - Hover-to-open menus (main navigation)
 * - Desktop-first experiences
 * - Complex navigation structures
 */

export default function GenresNavigationMenu({ genres, onGenreClick }) {
  return (
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          {/* Trigger - Opens on hover */}
          <NavigationMenuTrigger 
            className={cn(
              "group",
              "bg-transparent hover:bg-white/5",
              "text-sm font-medium text-muted-foreground hover:text-foreground",
              "transition-all duration-300",
              "px-3 py-1.5 rounded-full",
              "data-[state=open]:bg-white/5 data-[state=open]:text-foreground"
            )}
          >
            <span>Genres</span>
            <ChevronDown className="ml-1 w-4 h-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
          </NavigationMenuTrigger>

          {/* Content - The dropdown panel */}
          <NavigationMenuContent
            className={cn(
              "absolute left-0 top-full",
              "w-[480px]",
              "backdrop-blur-2xl bg-background/95",
              "border border-white/10",
              "rounded-xl shadow-2xl",
              "p-4",
              "data-[motion^=from-]:animate-in",
              "data-[motion^=to-]:animate-out",
              "data-[motion^=from-]:fade-in",
              "data-[motion^=to-]:fade-out",
              "data-[motion=from-end]:slide-in-from-right-52",
              "data-[motion=from-start]:slide-in-from-left-52",
              "data-[motion=to-end]:slide-out-to-right-52",
              "data-[motion=to-start]:slide-out-to-left-52"
            )}
          >
            {/* Header */}
            <div className="mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  Explore by Genre
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Discover movies by category
              </p>
            </div>

            {/* Genres Grid */}
            <div className="grid grid-cols-3 gap-1">
              {genres.map((genre, index) => (
                <GenreItem
                  key={genre.id}
                  genre={genre}
                  index={index}
                  onClick={() => onGenreClick(genre)}
                />
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// Genre Item Component - Separated for clarity and reusability
function GenreItem({ genre, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02, duration: 0.2 }}
    >
      <Link
        to={`/search?genre=${genre.id}&name=${encodeURIComponent(genre.name)}`}
        onClick={onClick}
        className={cn(
          "group",
          "flex items-center justify-between",
          "px-3 py-2.5",
          "rounded-lg",
          "text-sm text-muted-foreground",
          "hover:text-foreground hover:bg-primary/10",
          "transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
      >
        <span className="font-medium">{genre.name}</span>
        <ChevronDown className="w-3.5 h-3.5 opacity-0 -rotate-90 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 text-primary" />
      </Link>
    </motion.div>
  );
}
