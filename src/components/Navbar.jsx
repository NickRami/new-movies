import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import { Film, LogIn, UserPlus, Search as SearchIcon, User, LogOut, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function Navbar() {
  const location = useLocation();
  const { favorites } = useFavorites();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [term, setTerm] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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
                  placeholder="Search for movies, genres or stars..."
                  className="pl-9 pr-3 py-2 h-9 text-xs sm:text-sm glass border-border/50 focus-visible:ring-primary focus-visible:border-primary/50 transition-all duration-300"
                />
              </div>
            </form>

            {/* Auth Buttons / User Profile */}
            <div className="flex items-center gap-2">
              {user ? (
                <div className="relative">
                  <motion.button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full glass-dark border border-border/50 hover:border-primary/50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-[10px] font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium hidden sm:block max-w-[80px] truncate">
                      {user.name}
                    </span>
                    <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </motion.button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-48 py-1 rounded-xl glass-dark border border-border/50 shadow-xl overflow-hidden z-50 origin-top-right"
                      >
                        <div className="px-4 py-3 border-b border-border/50">
                          <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                        <div className="p-1">
                          <button
                            onClick={() => {
                              setIsProfileOpen(false);
                              navigate('/favorites');
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-colors text-left"
                          >
                            <span className="text-red-500">♥</span> Mis Favoritos
                          </button>
                          <button
                            onClick={() => {
                              logout();
                              setIsProfileOpen(false);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                          >
                            <LogOut className="w-3.5 h-3.5" /> Cerrar sesión
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs sm:text-sm px-3 py-1.5 hover:scale-105 transition-transform"
                      type="button"
                      onClick={() => navigate('/login')}
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
                  {/* Mobile Login Icon */}
                  <div className="flex sm:hidden items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8 hover:scale-110 transition-transform"
                      type="button"
                      onClick={() => navigate('/login')}
                    >
                      <LogIn className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
