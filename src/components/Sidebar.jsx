import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Search,
  Heart,
  Menu,
  X,
  Film,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { cn } from '../lib/utils';
import { fetchGenres } from '../services/tmdb';

export default function Sidebar({ collapsed = false, onToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { favorites } = useFavorites();
  const [genres, setGenres] = useState([]);
  const [genresError, setGenresError] = useState(null);

  useEffect(() => {
    async function loadGenres() {
      try {
        const data = await fetchGenres();
        setGenres(data);
      } catch (error) {
        console.error('Error al cargar géneros:', error);
        setGenresError(error.message);
      }
    }

    loadGenres();
  }, []);

  const menuItems = [
    { path: '/', label: 'Inicio', icon: Home },
    { path: '/search', label: 'Buscar', icon: Search },
    { path: '/favorites', label: 'Favoritos', icon: Heart, badge: favorites.length },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Botón móvil */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-[100] p-2 rounded-lg bg-card border border-border hover:bg-accent transition-colors lg:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </motion.button>

      {/* Overlay móvil */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 z-[90] lg:hidden"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-[95] lg:hidden shadow-2xl"
            >
              <div className="p-6 h-full overflow-y-auto no-scrollbar">
                <div className="flex items-center gap-2 mb-8">
                  <Film className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-bold text-foreground">Movies</h2>
                </div>
                <nav className="space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative",
                          active
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                        {item.badge !== undefined && item.badge > 0 && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto bg-primary text-primary-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            {item.badge}
                          </motion.span>
                        )}
                      </Link>
                    );
                  })}

                  {/* Categorías - móvil */}
                  {genres.length > 0 && (
                    <div className="mt-8 pt-4 border-t border-border/60">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                        Categorías
                      </p>
                      <div className="space-y-1 max-h-64 overflow-y-auto pr-1 no-scrollbar">
                        {genres.map((genre) => (
                          <Link
                            key={genre.id}
                            to={`/search?genre=${genre.id}&name=${encodeURIComponent(
                              genre.name,
                            )}`}
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                          >
                            {genre.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Sidebar desktop - con colapsar/mostrar */}
      <aside
        className={cn(
          'hidden lg:block fixed inset-y-0 left-0 z-40 bg-card border-r border-border transition-all duration-300',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-border flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 overflow-hidden">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Film className="w-6 h-6 text-primary flex-shrink-0" />
              </motion.div>
              {!collapsed && (
                <h2 className="text-lg font-bold text-foreground truncate">Movies</h2>
              )}
            </div>

            {/* Botón colapsar/expandir dentro de la sidebar (desktop) */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onToggle}
              className="hidden lg:inline-flex items-center justify-center p-1.5 rounded-full bg-background/80 border border-border text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </motion.button>
          </div>
          
          <nav className="flex-1 p-4 space-y-4 overflow-y-auto no-scrollbar">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <motion.div
                  key={item.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center rounded-lg transition-colors relative group",
                      collapsed ? "justify-center p-3" : "gap-3 px-3 py-3",
                      active
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "hover:bg-accent text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon
                      className={cn(
                        "transition-all",
                        collapsed ? "w-7 h-7" : "w-5 h-5"
                      )}
                    />
                    {!collapsed && (
                      <span className="font-medium truncate">{item.label}</span>
                    )}
                    {item.badge !== undefined && item.badge > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto bg-primary text-primary-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        {item.badge}
                      </motion.span>
                    )}
                    {active && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary rounded-lg -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}

            {/* Categorías - desktop */}
            {genres.length > 0 && !collapsed && (
              <div className="mt-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-1">
                  Categorías
                </p>
                <div className="space-y-1">
                  {genres.map((genre) => (
                    <Link
                      key={genre.id}
                      to={`/search?genre=${genre.id}&name=${encodeURIComponent(
                        genre.name,
                      )}`}
                      className="block px-4 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </nav>

          {!collapsed && (
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                <span>Powered by TMDB</span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
