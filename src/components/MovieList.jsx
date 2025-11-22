import { motion } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react';
import MovieCard from './MovieCard';
import { Card } from './ui/card';

export default function MovieList({ movies, loading, error }) {
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center py-20"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="h-12 w-12 text-primary" />
        </motion.div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20 max-w-2xl mx-auto"
      >
        <Card className="bg-destructive/10 border-destructive/30 p-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <AlertCircle className="w-6 h-6 text-destructive" />
            <p className="text-destructive text-xl font-semibold">Error</p>
          </div>
          <p className="text-destructive/90 text-lg mb-4">{error}</p>
          <div className="text-left bg-card rounded p-4 mt-4">
            <p className="text-foreground text-sm mb-2 font-semibold">Solución:</p>
            <ol className="text-muted-foreground text-sm list-decimal list-inside space-y-1">
              <li>Asegúrate de tener un archivo <code className="bg-muted px-1 rounded">.env</code> en la raíz del proyecto</li>
              <li>Agrega tu API key: <code className="bg-muted px-1 rounded">VITE_TMDB_API_KEY=tu_api_key</code></li>
              <li>Obtén tu API key en: <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">TMDB Settings</a></li>
              <li>Reinicia el servidor de desarrollo después de agregar la API key</li>
            </ol>
          </div>
        </Card>
      </motion.div>
    );
  }

  if (movies.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20"
      >
        <p className="text-muted-foreground text-lg">No se encontraron películas</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
    >
      {movies.map((movie, index) => (
        <MovieCard key={movie.id} movie={movie} index={index} />
      ))}
    </motion.div>
  );
}
