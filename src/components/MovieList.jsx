import { motion } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react';
import MovieCard from './MovieCard';
import { Card } from './ui/card';

export default function MovieList({ movies, loading, error }) {
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col justify-center items-center py-20"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          <Loader2 className="h-12 w-12 text-primary drop-shadow-glow" />
          <div className="absolute inset-0 blur-xl bg-primary/30 animate-pulse-glow" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-muted-foreground text-sm"
        >
          Loading movies...
        </motion.p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-20 max-w-2xl mx-auto"
      >
        <Card className="glass-dark border-destructive/30 p-6 shadow-xl">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <AlertCircle className="w-6 h-6 text-destructive" />
            <p className="text-destructive text-xl font-semibold">Error</p>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-destructive/90 text-lg mb-4"
          >
            Something went wrong while loading movies.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center glass rounded-lg p-4 mt-4 border border-border/50"
          >
            <p className="text-muted-foreground text-sm">
              Please check your internet connection or try again later.
            </p>
          </motion.div>
        </Card>
      </motion.div>
    );
  }

  if (movies.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full glass-dark border border-border/50 mb-4 shadow-glow-primary"
        >
          <span className="text-3xl">🎬</span>
        </motion.div>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-lg"
        >
          No movies found
        </motion.p>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground/60 text-sm mt-2"
        >
          Try adjusting your search or category
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
    >
      {movies.map((movie, index) => (
        <MovieCard key={movie.id} movie={movie} index={index} />
      ))}
    </motion.div>
  );
}
