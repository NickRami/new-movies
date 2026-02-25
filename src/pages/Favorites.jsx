import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import MovieList from '../components/MovieList';
import BackNavigation from '../components/BackNavigation';
import { getContainerClasses } from '../lib/layout-constants';
import { cn } from '../lib/utils';

export default function Favorites() {
  const { favorites } = useFavorites();
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "min-h-screen",
        "pt-8 md:pt-12",
        "pb-16 md:pb-20"
      )}
    >
      <div className={getContainerClasses()}>
        <div className="mb-6">
          <BackNavigation />
        </div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-primary fill-primary drop-shadow-glow" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground font-heading">
              {t('favorites.title')}
            </h1>
          </div>
        </motion.div>

        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 glass rounded-[2.5rem] border border-border/50"
          >
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-6 opacity-20" />
            <p className="text-foreground text-2xl font-bold mb-3">{t('favorites.empty')}</p>
            <p className="text-muted-foreground text-lg max-w-sm mx-auto">{t('favorites.emptySubtitle')}</p>
          </motion.div>
        ) : (
          <>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-muted-foreground mb-10 text-lg"
            >
              {t('favorites.count', { count: favorites.length })} {favorites.length === 1 ? t('favorites.movie') : t('favorites.movies')}
            </motion.p>
            <MovieList movies={favorites} loading={false} error={null} />
          </>
        )}
      </div>
    </motion.div>
  );
}
