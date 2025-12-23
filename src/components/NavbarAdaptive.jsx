import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import { 
  Film, LogIn, UserPlus, Search as SearchIcon, 
  LogOut, Menu, X, Globe, ChevronDown, Heart 
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from './ui/sheet';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import GenresHoverMenu from './GenresHoverMenu';
import { fetchGenres } from '../services/tmdb';
import { cn } from '../lib/utils';
import { getContainerClasses } from '../lib/layout-constants';

export default function NavbarAdaptive() {
  const location = useLocation();
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Mobile search toggle
  const [term, setTerm] = useState('');
  const [genres, setGenres] = useState([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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
    { name: t('nav.favorites'), path: '/favorites', badge: favorites.length > 0 ? favorites.length : null },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 h-20 bg-background/70 backdrop-blur-2xl border-b border-white/5 flex items-center"
      >
        <div className={getContainerClasses()}>
          <div className="flex items-center justify-between w-full">
            
            {/* --- LEFT SECTION: Logo & Desktop Links --- */}
            <div className="flex items-center gap-10">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-violet-600 shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
                  <Film className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 tracking-tight">
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
                      "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                      isActive(link.path) 
                        ? "text-white bg-white/10" 
                        : "text-muted-foreground hover:text-white hover:bg-white/5"
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
                    placeholder={t('search.placeholder')}
                    className="w-64 focus:w-80 bg-secondary/30 hover:bg-secondary/50 focus:bg-secondary/80 border border-transparent focus:border-primary/30 rounded-full py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-300"
                  />
                </div>
              </form>

              {/* Mobile Search Toggle */}
              <button 
                className="md:hidden p-2 text-muted-foreground hover:text-white transition-colors"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                {isSearchOpen ? <X className="w-5 h-5" /> : <SearchIcon className="w-5 h-5" />}
              </button>
              
              <div className="h-6 w-px bg-white/10 hidden md:block" />

              {/* Desktop Language Switcher */}
              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>

              {/* Auth Buttons / Profile */}
              {user ? (
                 <div className="relative">
                    <button 
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center gap-2 p-1 pl-2 md:pr-4 rounded-full border border-white/5 bg-secondary/30 hover:bg-secondary/50 transition-all"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="hidden md:block text-sm font-medium text-white max-w-[100px] truncate">
                        {user.name}
                      </span>
                      <ChevronDown className="w-3 h-3 text-muted-foreground hidden md:block" />
                    </button>

                    <AnimatePresence>
                      {isProfileOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-[#111] border border-white/10 shadow-2xl overflow-hidden py-1 z-50"
                        >
                          <div className="px-4 py-3 border-b border-white/5 bg-white/5">
                            <p className="text-sm font-bold text-white">{user.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                          </div>
                          
                          <Link 
                            to="/favorites"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                          >
                             <Heart className="w-4 h-4 text-rose-500" />
                             {t('nav.myFavorites')}
                          </Link>
                          
                          <div className="h-px bg-white/5 my-1" />
                          
                          <button
                            onClick={() => {
                              logout();
                              setIsProfileOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-left"
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
                  <button className="md:hidden p-2 text-white/80 hover:text-white">
                    <Menu className="w-6 h-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-[#0a0a0b] border-l border-white/10 p-0">
                  <div className="flex flex-col h-full">
                    {/* Drawer Header */}
                    <div className="p-6 border-b border-white/10 bg-gradient-to-b from-primary/5 to-transparent">
                       <Link to="/" className="flex items-center gap-2 mb-1">
                          <Film className="w-5 h-5 text-primary" />
                          <span className="text-lg font-bold text-white">CineScope</span>
                       </Link>
                       <p className="text-xs text-muted-foreground">Premium Entertainment</p>
                    </div>

                    {/* Drawer Links */}
                    <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
                      <Link 
                        to="/" 
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                          isActive('/') ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-muted-foreground hover:bg-white/5 hover:text-white"
                        )}
                      >
                         <Film className="w-4 h-4" />
                         {t('nav.home')}
                      </Link>
                      
                      <Link 
                        to="/favorites" 
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                          isActive('/favorites') ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-muted-foreground hover:bg-white/5 hover:text-white"
                        )}
                      >
                         <Heart className="w-4 h-4" />
                         {t('nav.favorites')}
                         {favorites.length > 0 && <span className="ml-auto bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full">{favorites.length}</span>}
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
                               className="block w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                             >
                               {g.name}
                             </button>
                           ))}
                           <button onClick={() => navigate('/')} className="px-4 py-2 text-xs text-primary hover:underline">
                             View all genres
                           </button>
                         </div>
                      </div>
                    </div>

                    {/* Drawer Footer */}
                    <div className="p-4 border-t border-white/10 bg-black/20">
                      {user ? (
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 px-2">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                              {user.name[0]}
                            </div>
                            <div className="flex-1 min-w-0">
                               <p className="text-sm font-medium text-white truncate">{user.name}</p>
                               <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={logout} className="w-full justify-start gap-2 border-white/10 bg-white/5 hover:bg-white/10">
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
                      <div className="mt-4 flex justify-center">
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
              className="md:hidden border-t border-white/10 bg-background/95 backdrop-blur-xl overflow-hidden"
            >
              <form onSubmit={handleSubmit} className="p-4">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                  <input
                    autoFocus
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder={t('search.placeholder')}
                    className="w-full bg-secondary/50 border border-transparent focus:border-primary/50 rounded-lg py-3 pl-10 pr-4 text-base text-white placeholder:text-muted-foreground outline-none"
                  />
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
