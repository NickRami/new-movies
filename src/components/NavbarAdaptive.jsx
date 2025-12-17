import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import { Film, LogIn, UserPlus, Search as SearchIcon, User, LogOut, ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import GenresHoverMenu from './GenresHoverMenu';
import { fetchGenres } from '../services/tmdb';
import { cn } from '../lib/utils';

export default function NavbarAdaptive() {
  const location = useLocation();
  const { favorites } = useFavorites();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [term, setTerm] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    async function loadGenres() {
      try {
        const data = await fetchGenres();
        setGenres(data);
      } catch (error) {
        console.error('Error loading genres:', error);
      }
    }
    loadGenres();
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!term.trim()) return;
    navigate(`/search?q=${encodeURIComponent(term.trim())}`);
    setTerm('');
  };

  const handleGenreClick = (genre) => {
    navigate(`/search?genre=${genre.id}&name=${encodeURIComponent(genre.name)}`);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-white/10 shadow-2xl"
    >
      <div className="container mx-auto px-4 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo + Desktop Navigation */}
          <div className="flex items-center gap-8 lg:gap-10">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2.5 text-xl font-bold group"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <Film className="w-7 h-7 text-primary drop-shadow-glow" />
              </motion.div>
              <span className="hidden sm:inline bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent group-hover:from-purple-400 group-hover:via-primary group-hover:to-purple-400 transition-all duration-500">
                CineScope
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              <Link
                to="/"
                className={cn(
                  "text-sm font-medium transition-all duration-300 relative group",
                  isActive('/') ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t('nav.home') || 'Home'}
                {isActive('/') && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {!isActive('/') && (
                  <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                )}
              </Link>

              {/* Genres Hover Menu - Desktop - PROFESSIONAL HOVER */}
              <GenresHoverMenu 
                genres={genres}
                onGenreClick={handleGenreClick}
              />


              <Link
                to="/favorites"
                className={cn(
                  "text-sm font-medium transition-all duration-300 flex items-center gap-2 relative group",
                  isActive('/favorites') ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t('nav.favorites') || 'Favorites'}
                {favorites.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    className="bg-gradient-to-r from-primary to-purple-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-primary/50"
                  >
                    {favorites.length}
                  </motion.span>
                )}
                {isActive('/favorites') && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {!isActive('/favorites') && (
                  <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                )}
              </Link>
            </div>
          </div>

          {/* Right Side: Search + Auth + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Search Bar - Desktop/Tablet */}
            <form
              onSubmit={handleSubmit}
              className="hidden md:flex items-center w-full max-w-xs lg:max-w-sm"
            >
              <div className="relative w-full group">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-all duration-300 group-focus-within:scale-110" />
                <Input
                  type="text"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder={t('search.placeholder') || 'Search movies...'}
                  className="pl-10 pr-3 py-2 h-10 text-sm backdrop-blur-xl bg-white/5 border-white/10 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/50 transition-all duration-300 rounded-full hover:bg-white/10 placeholder:text-muted-foreground/60"
                />
              </div>
            </form>

            {/* Language Switcher - Desktop */}
            <div className="hidden md:flex">
              <LanguageSwitcher />
            </div>

            {/* User Profile or Auth Buttons */}
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
            )}

            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 glass-dark border-border/50">
                <div className="flex flex-col h-full py-6">
                  {/* Mobile Logo */}
                  <div className="flex items-center gap-2 mb-8 px-2">
                    <Film className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-bold text-foreground">CineScope</h2>
                  </div>

                  {/* Mobile Search */}
                  <form onSubmit={handleSubmit} className="mb-6 px-2">
                    <div className="relative">
                      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="text"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        placeholder={t('search.placeholder') || 'Search movies...'}
                        className="pl-9 glass border-border/50"
                      />
                    </div>
                  </form>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 overflow-y-auto space-y-2 px-2">
                    <Link
                      to="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                        isActive('/') ? "bg-primary text-primary-foreground" : "hover:bg-accent text-muted-foreground hover:text-foreground"
                      )}
                    >
                      Home
                    </Link>

                    <Link
                      to="/favorites"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-lg transition-colors",
                        isActive('/favorites') ? "bg-primary text-primary-foreground" : "hover:bg-accent text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <span>Favorites</span>
                      {favorites.length > 0 && (
                        <span className="bg-primary text-primary-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                          {favorites.length}
                        </span>
                      )}
                    </Link>

                    {/* Mobile Genres */}
                    <div className="pt-4 border-t border-border/50">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-4 mb-3">
                        Genres
                      </p>
                      <div className="space-y-1 max-h-64 overflow-y-auto">
                        {genres.map((genre) => (
                          <button
                            key={genre.id}
                            onClick={() => handleGenreClick(genre)}
                            className="w-full text-left px-4 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                          >
                            {genre.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </nav>

                  {/* Mobile Language Switcher */}
                  <div className="border-t border-border/50 pt-4 px-2">
                    <LanguageSwitcher />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
