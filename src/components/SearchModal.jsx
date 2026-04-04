import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Search as SearchIcon, X, Film } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSearchMovies } from '../hooks/useMovies';

export default function SearchModal({ isOpen, onClose }) {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();
  const inputRef = useRef(null);

  const { movies: searchSuggestions, loading: searchLoading } = useSearchMovies(term, null, 1);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      setTimeout(() => setTerm(''), 300);
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!term.trim()) return;
    navigate(`/search?q=${encodeURIComponent(term.trim())}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[10vh] sm:pt-[15vh] px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-2xl bg-card border border-border/50 shadow-2xl rounded-2xl overflow-hidden pointer-events-auto"
            >
              {/* Search Header / Form */}
              <form onSubmit={handleSubmit} className="relative flex items-center p-2 border-b border-border/50 bg-background/50">
                <SearchIcon className="w-6 h-6 text-primary ml-4" />
                <input
                  ref={inputRef}
                  type="text"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder={t('search.placeholder')}
                  className="w-full bg-transparent border-none py-4 px-4 text-lg text-foreground placeholder:text-muted-foreground outline-none"
                />
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 mr-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </form>

              {/* Suggestions / Results */}
              <div className="max-h-[60vh] overflow-y-auto w-full p-2">
                {!term.trim() ? (
                  <div className="p-8 flex flex-col items-center justify-center text-muted-foreground">
                    <SearchIcon className="w-12 h-12 opacity-20 mb-4" />
                    <p>{t('search.discoverDesc')}</p>
                  </div>
                ) : searchLoading ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    {t('search.searching')}
                  </div>
                ) : searchSuggestions.length > 0 ? (
                  <div className="flex flex-col gap-1">
                    {searchSuggestions.slice(0, 5).map(movie => (
                      <Link
                        key={movie.id}
                        to={movie.media_type === 'tv' ? `/tv/${movie.id}` : `/movie/${movie.id}`}
                        onClick={onClose}
                        className="flex items-center gap-4 p-3 hover:bg-secondary rounded-xl transition-colors group"
                      >
                        <div className="w-12 h-16 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                          {movie.poster_path ? (
                            <img src={movie.poster_path} alt={movie.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-secondary border border-border/50">
                              <Film className="w-5 h-5 text-muted-foreground/30" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-bold text-foreground truncate group-hover:text-primary transition-colors">{movie.title}</h4>
                          <p className="text-sm text-muted-foreground truncate">{movie.release_date ? new Date(movie.release_date).getFullYear() : t('common.notAvailable')}</p>
                        </div>
                      </Link>
                    ))}
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="w-full mx-auto mt-2 py-3 text-sm font-bold text-primary bg-primary/10 hover:bg-primary/20 rounded-xl transition-colors"
                    >
                      {t('search.viewAllResults')}
                    </button>
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    {t('search.noResultsFor')} "{term}".
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
