import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFavorites } from '../context/FavoritesContext';
import { Film } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const { favorites } = useFavorites();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border lg:hidden"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xl font-bold text-primary hover:text-primary/80 transition-colors"
          >
            <Film className="w-5 h-5" />
            <span>Movies</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md transition-colors relative text-sm ${
                isActive('/')
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Inicio
              {isActive('/') && (
                <motion.div
                  layoutId="navbarActive"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
            
            <Link
              to="/search"
              className={`px-3 py-2 rounded-md transition-colors relative text-sm ${
                isActive('/search')
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Buscar
              {isActive('/search') && (
                <motion.div
                  layoutId="navbarActive"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
            
            <Link
              to="/favorites"
              className={`px-3 py-2 rounded-md transition-colors relative text-sm ${
                isActive('/favorites')
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="relative">
                Favoritos
                {favorites.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-3 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold"
                  >
                    {favorites.length}
                  </motion.span>
                )}
              </span>
              {isActive('/favorites') && (
                <motion.div
                  layoutId="navbarActive"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
