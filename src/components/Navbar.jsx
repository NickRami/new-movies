import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useFavorites } from '../context/FavoritesContext';
import { Film, LogIn, UserPlus, Search as SearchIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function Navbar() {
  const location = useLocation();
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const [term, setTerm] = useState('');

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!term.trim()) return;
    navigate(`/search?q=${encodeURIComponent(term.trim())}`);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-30 glass-dark border-b border-border/50 shadow-lg"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Columna izquierda: logo en mobile/tablet (en desktop, sidebar muestra el logo) */}
          <div className="flex-1 flex items-center">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-xl font-bold text-primary hover:text-primary/80 transition-all duration-300 hover:scale-105 lg:hidden"
            >
              <Film className="w-5 h-5" />
              <span>CineScope</span>
            </Link>
          </div>

          {/* Columna derecha: búsqueda + botones auth responsivos */}
          <div className="flex-1 flex items-center justify-end gap-2">
            {/* Búsqueda (navbar) */}
            <form
              onSubmit={handleSubmit}
              className="hidden md:flex items-center w-full max-w-xs md:max-w-sm"
            >
              <div className="relative w-full group">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                <Input
                  type="text"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder="Buscar películas..."
                  className="pl-9 pr-3 py-2 h-9 text-xs sm:text-sm glass border-border/50 focus-visible:ring-primary focus-visible:border-primary/50 transition-all duration-300"
                />
              </div>
            </form>

            {/* Botones auth mockeados */}
            <div className="hidden sm:flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs sm:text-sm px-3 py-1.5 hover:scale-105 transition-transform"
                type="button"
              >
                <LogIn className="w-4 h-4 mr-1" />
                Iniciar sesión
              </Button>
              <Button
                variant="gradient"
                size="sm"
                className="text-xs sm:text-sm px-3 py-1.5"
                type="button"
              >
                <UserPlus className="w-4 h-4 mr-1" />
                Registrarse
              </Button>
            </div>

            {/* Versión compacta solo icono en xs */}
            <div className="flex sm:hidden items-center">
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 hover:scale-110 transition-transform"
                type="button"
              >
                <LogIn className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
