import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  Film, LogIn, UserPlus, Search as SearchIcon,
  LogOut, Menu, X, Globe, ChevronDown, Heart, Sun, Moon
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from './ui/sheet';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import GenresHoverMenu from './GenresHoverMenu';
import { fetchGenres } from '../services/tmdb';
import { useSearchMovies } from '../hooks/useMovies';
import { cn } from '../lib/utils';
import { getContainerClasses } from '../lib/layout-constants';

export default function NavbarAdaptive() {
  const location = useLocation();
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const [isSearchOpen, setIsSearchOpen] = useState(false); // Mobile search toggle
  const [term, setTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [genres, setGenres] = useState([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { movies: searchSuggestions, loading: searchLoading } = useSearchMovies(term, null, 1);

  // Load genres
  useEffect(() => {
    async function loadGenres() {
      try {
        const language = i18n.language === 'es' ? 'es-ES' : 'en-US';
        const data = await fetchGenres(language);
        setGenres(data);
      } catch (error) {
        console.error('Error loading genres:', error);
      }
    }
    loadGenres();
  }, [i18n.language]);

  const isActive = (path) => location.pathname === path;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!term.trim()) return;
    navigate(`/search?q=${encodeURIComponent(term.trim())}`);
    setIsSearchOpen(false); // Close mobile search if open
  };

  const handleGenreClick = (genre) => {
    navigate(`/search?genre=${genre.id}&name=${encodeURIComponent(genre.name)}`);
  };

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.series'), path: '/series' },
    { name: t('nav.favorites'), path: '/favorites', badge: favorites.length > 0 ? favorites.length : null },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 h-20 bg-background/80 backdrop-blur-2xl border-b border-border/30 flex items-center"
      >
        <div className={getContainerClasses()}>
          <div className="flex items-center justify-between w-full">

            {/* --- LEFT SECTION: Logo & Desktop Links --- */}
            <div className="flex items-center gap-10">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-violet-600 shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
                  <Film className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 tracking-tight">
                  CineScope
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-colors duration-200",
                      isActive(link.path)
                        ? "text-primary font-bold"
                        : "text-muted-foreground hover:text-foreground link-underline"
                    )}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {link.name}
                      {link.badge && (
                        <span className="bg-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white leading-none">
                          {link.badge}
                        </span>
                      )}
                    </span>
                  </Link>
                ))}

                {/* Genres Dropdown */}
                <div className="px-2">
                  <GenresHoverMenu genres={genres} onGenreClick={handleGenreClick} />
                </div>
              </div>
            </div>

            {/* --- RIGHT SECTION: Search & Auth --- */}
            <div className="flex items-center gap-3 md:gap-4">

              {/* Desktop Search Bar */}
              <form onSubmit={handleSubmit} className="hidden md:block relative group">
                <div className="relative flex items-center">
                  <SearchIcon className="absolute left-3 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                    placeholder={t('search.placeholder')}
                    className="w-64 lg:w-72 xl:w-80 focus:w-[400px] bg-secondary/30 hover:bg-secondary/50 focus:bg-secondary/80 border border-transparent focus:border-primary/30 rounded-full py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-300"
                  />
                </div>

                <AnimatePresence>
                  {term.trim() && isSearchFocused && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-3 w-full sm:w-[400px] bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col p-2"
                    >
                      {searchLoading ? (
                        <div className="p-4 text-center text-sm text-muted-foreground">{t('search.searching')}</div>
                      ) : searchSuggestions.length > 0 ? (
                        <>
                          {searchSuggestions.slice(0, 5).map(movie => (
                            <Link
                              key={movie.id}
                              to={movie.media_type === 'tv' ? `/tv/${movie.id}` : `/movie/${movie.id}`}
                              onClick={() => { setTerm(''); setIsSearchFocused(false); }}
                              className="flex items-center gap-3 p-2 hover:bg-foreground/5 rounded-xl transition-colors group"
                            >
                              <div className="w-10 h-14 rounded-md overflow-hidden bg-foreground/5 flex-shrink-0">
                                {movie.poster_path ? (
                                  <img src={movie.poster_path} alt={movie.title} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-secondary border border-border/50">
                                    <Film className="w-4 h-4 text-muted-foreground/30" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">{movie.title}</h4>
                                <p className="text-xs text-muted-foreground truncate">{movie.release_date ? new Date(movie.release_date).getFullYear() : t('common.notAvailable')}</p>
                              </div>
                            </Link>
                          ))}
                          <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full mt-2 py-2.5 text-xs font-bold text-primary-foreground bg-primary/80 hover:bg-primary ml-[0px] rounded-lg transition-colors border border-primary"
                          >
                            {t('search.viewAllResults')}
                          </button>
                        </>
                      ) : (
                        <div className="p-4 text-center text-sm text-muted-foreground">{t('search.noResults')}</div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              {/* Mobile Search Toggle */}
              <button
                className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                {isSearchOpen ? <X className="w-5 h-5" /> : <SearchIcon className="w-5 h-5" />}
              </button>

              <div className="h-6 w-px bg-border/50 hidden md:block" />

              {/* Desktop Language Switcher and Theme Toggle */}
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 rounded-full hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <LanguageSwitcher />
              </div>

              {/* Auth Buttons / Profile */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-1 pl-2 md:pr-4 rounded-full border border-border/50 bg-secondary/30 hover:bg-secondary/50 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                      {(user.user_metadata?.username || user.email || 'U').charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden md:block text-sm font-medium text-foreground max-w-[100px] truncate">
                      {user.user_metadata?.username || user.email?.split('@')[0]}
                    </span>
                    <ChevronDown className="w-3 h-3 text-muted-foreground hidden md:block" />
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-card border border-border/50 shadow-2xl overflow-hidden py-1 z-50"
                      >
                        <div className="px-4 py-3 border-b border-border/50 bg-foreground/5">
                          <p className="text-sm font-bold text-foreground">{user.user_metadata?.username || user.email?.split('@')[0]}</p>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>

                        <Link
                          to="/favorites"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:bg-foreground/5 hover:text-foreground transition-colors"
                        >
                          <Heart className="w-4 h-4 text-primary" />
                          {t('nav.myFavorites')}
                        </Link>

                        <div className="h-px bg-border/50 my-1" />

                        <button
                          onClick={() => {
                            logout();
                            setIsProfileOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive/80 hover:bg-destructive/10 hover:text-destructive transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          {t('nav.logout')}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                    {t('nav.login')}
                  </Button>
                  <Button variant="gradient" size="sm" onClick={() => navigate('/register')}>
                    {t('nav.register')}
                  </Button>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <Sheet>
                <SheetTrigger asChild>
                  <button className="md:hidden p-2 text-foreground/80 hover:text-foreground">
                    <Menu className="w-6 h-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-background border-l border-border/50 p-0 text-foreground">
                  <div className="flex flex-col h-full">
                    {/* Drawer Header */}
                    <div className="p-6 border-b border-border/50 bg-gradient-to-b from-primary/5 to-transparent">
                      <Link to="/" className="flex items-center gap-2 mb-1">
                        <Film className="w-5 h-5 text-primary" />
                        <span className="text-lg font-bold text-foreground">CineScope</span>
                      </Link>
                      <p className="text-xs text-muted-foreground">{t('common.tagline')}</p>
                    </div>

                    {/* Drawer Links */}
                    <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
                      <Link
                        to="/"
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                          isActive('/') ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                        )}
                      >
                        <Film className="w-4 h-4" />
                        {t('nav.home')}
                      </Link>

                      <Link
                        to="/series"
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                          isActive('/series') ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                        )}
                      >
                        <Film className="w-4 h-4" />
                        {t('nav.series')}
                      </Link>

                      <Link
                        to="/favorites"
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                          isActive('/favorites') ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                        )}
                      >
                        <Heart className="w-4 h-4" />
                        {t('nav.favorites')}
                        {favorites.length > 0 && <span className="ml-auto bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full">{favorites.length}</span>}
                      </Link>

                      <div className="py-2">
                        <div className="px-4 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                          {t('nav.genres')}
                        </div>
                        <div className="space-y-0.5 pl-4">
                          {genres.slice(0, 8).map(g => (
                            <button
                              key={g.id}
                              onClick={() => handleGenreClick(g)}
                              className="block w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-lg transition-colors"
                            >
                              {g.name}
                            </button>
                          ))}
                          <button onClick={() => navigate('/')} className="px-4 py-2 text-xs text-primary hover:underline">
                            {t('nav.viewAllGenres')}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Drawer Footer */}
                    <div className="p-4 border-t border-border/50 bg-secondary/20">
                      {user ? (
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 px-2">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                              {(user.user_metadata?.username || user.email || 'U').charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">{user.user_metadata?.username || user.email?.split('@')[0]}</p>
                              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={logout} className="w-full justify-start gap-2 border-border/50 bg-foreground/5 hover:bg-foreground/10">
                            <LogOut className="w-4 h-4" />
                            {t('nav.logout')}
                          </Button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-3">
                          <Button variant="secondary" onClick={() => navigate('/login')}>{t('nav.login')}</Button>
                          <Button variant="default" onClick={() => navigate('/register')}>{t('nav.register')}</Button>
                        </div>
                      )}
                      <div className="mt-4 flex justify-center items-center gap-4">
                        <button
                          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                          className="p-2 rounded-full bg-foreground/5 border border-border/50 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>
                        <LanguageSwitcher />
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl overflow-hidden"
            >
              <form onSubmit={handleSubmit} className="p-4 border-b border-border/50">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                  <input
                    autoFocus
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder={t('search.placeholder')}
                    className="w-full bg-secondary/50 border border-transparent focus:border-primary/50 rounded-lg py-3 pl-10 pr-4 text-base text-foreground placeholder:text-muted-foreground outline-none"
                  />
                </div>
              </form>

              {/* Mobile Real-time Results */}
              <AnimatePresence>
                {term.trim() && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col max-h-[60vh] overflow-y-auto px-2 pb-4 pt-2"
                  >
                    {searchLoading ? (
                      <div className="p-4 text-center text-sm text-muted-foreground">{t('search.searching')}</div>
                    ) : searchSuggestions.length > 0 ? (
                      <>
                        {searchSuggestions.slice(0, 5).map(movie => (
                          <Link
                            key={movie.id}
                            to={movie.media_type === 'tv' ? `/tv/${movie.id}` : `/movie/${movie.id}`}
                            onClick={() => { setTerm(''); setIsSearchOpen(false); }}
                            className="flex items-center gap-3 p-3 hover:bg-foreground/5 rounded-xl transition-colors group"
                          >
                            <div className="w-12 h-16 rounded-md overflow-hidden bg-foreground/5 flex-shrink-0">
                              {movie.poster_path ? (
                                <img src={movie.poster_path} alt={movie.title} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-secondary border border-border/50">
                                  <Film className="w-5 h-5 text-muted-foreground/30" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">{movie.title}</h4>
                              <p className="text-xs text-muted-foreground truncate">{movie.release_date ? new Date(movie.release_date).getFullYear() : t('common.notAvailable')}</p>
                            </div>
                          </Link>
                        ))}
                        <button
                          type="button"
                          onClick={() => { handleSubmit({ preventDefault: () => { } }); setIsSearchOpen(false); }}
                          className="mx-2 mt-3 py-3 text-sm font-bold text-primary-foreground bg-primary/80 hover:bg-primary rounded-xl transition-colors border border-primary/30"
                        >
                          {t('search.viewAllResults')}
                        </button>
                      </>
                    ) : (
                      <div className="p-6 text-center text-sm text-muted-foreground">{t('search.noResultsFor')} "{term}".</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav >
    </>
  );
}
