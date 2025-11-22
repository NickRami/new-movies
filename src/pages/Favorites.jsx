import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import MovieList from '../components/MovieList';

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="pt-16 lg:pt-4 pb-10 min-h-screen"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-primary fill-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Mis Favoritos</h1>
          </div>
        </motion.div>
        
        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg mb-2">No tienes películas favoritas aún</p>
            <p className="text-muted-foreground/70">Agrega películas a tus favoritos usando el botón ⭐</p>
          </motion.div>
        ) : (
          <>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-muted-foreground mb-8"
            >
              Tienes {favorites.length} {favorites.length === 1 ? 'película favorita' : 'películas favoritas'}
            </motion.p>
            <MovieList movies={favorites} loading={false} error={null} />
          </>
        )}
      </div>
    </motion.div>
  );
}
