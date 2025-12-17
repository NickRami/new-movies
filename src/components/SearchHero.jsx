import { motion } from 'framer-motion';
import { Search as SearchIcon, Sparkles } from 'lucide-react';
import SearchBar from './SearchBar';

export default function SearchHero() {
  return (
    <section className="relative mb-8 sm:mb-10 md:mb-12">
      {/* Contenedor principal */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border/50 bg-gradient-to-b from-card to-background p-6 sm:p-8 md:p-12 lg:p-16">
        {/* Efectos de fondo sutiles */}
        <div className="absolute inset-0 overflow-hidden opacity-40">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
        </div>

        {/* Contenido */}
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 glass px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium"
          >
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            <span className="text-foreground">Browse through thousands of movies</span>
          </motion.div>

          {/* Título */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="space-y-2 sm:space-y-3"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              What do you want to watch?
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Search by title, explore genres, or discover new stories
            </p>
          </motion.div>

          {/* Barra de búsqueda */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <SearchBar />
          </motion.div>

          {/* Stats o info adicional */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
              <span>Real-time results</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-glow" />
              <span>Thousands of movies</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse-glow" />
              <span>Filter by genre</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
