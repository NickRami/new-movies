import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Calendar, Clock, ArrowLeft, Play, Heart } from 'lucide-react';
import { useMovieDetails } from '../hooks/useMovies';
import { useFavorites } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import BackNavigation from '../components/BackNavigation';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movie, loading, error } = useMovieDetails(id);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (loading) {
    return (
      <div className="pt-16 lg:pt-4 pb-10 min-h-screen flex flex-col items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          <Loader2 className="h-16 w-16 text-primary drop-shadow-glow" />
          <div className="absolute inset-0 blur-xl bg-primary/30 animate-pulse-glow" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-muted-foreground"
        >
          Cargando detalles...
        </motion.p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="pt-16 lg:pt-4 pb-10 min-h-screen flex items-center justify-center"
      >
        <Card className="glass-dark p-8 text-center max-w-md border-destructive/30">
          <p className="text-destructive text-xl mb-4">Error al cargar la película</p>
          <Button onClick={() => navigate('/')} variant="gradient">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Button>
        </Card>
      </motion.div>
    );
  }

  const favorite = isFavorite(movie.id);
  const trailer = movie.videos && movie.videos.length > 0 ? movie.videos[0] : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-16 lg:pt-4 pb-10 min-h-screen"
    >
      {/* Hero Section con backdrop */}
      <div className="relative w-full mb-6 sm:mb-8 md:mb-10 overflow-hidden">
        {movie.backdrop_path && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[75vh]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${movie.backdrop_path})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/40" />
            </div>

            {/* Contenido sobre el backdrop */}
            <div className="absolute inset-0 flex items-end">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 md:pb-12 lg:pb-16">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="max-w-4xl"
                >
                  <div className="mb-6">
                    <BackNavigation />
                  </div>
                  {/* Título */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-1 sm:mb-2 md:mb-3 drop-shadow-lg leading-tight">
                    {movie.title}
                  </h1>
                  {movie.original_title !== movie.title && (
                    <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-2 sm:mb-3 md:mb-4 drop-shadow-md">
                      {movie.original_title}
                    </p>
                  )}

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
                    <div className="flex items-center gap-1 sm:gap-1.5 glass-dark px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-border/50">
                      <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400" />
                      <span className="text-foreground text-sm sm:text-base md:text-lg font-semibold">
                        {movie.vote_average?.toFixed(1) || 'N/A'}
                      </span>
                    </div>
                    {movie.release_date && (
                      <div className="flex items-center gap-1 sm:gap-1.5 glass-dark px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-border/50 text-muted-foreground text-xs sm:text-sm md:text-base">
                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>{new Date(movie.release_date).getFullYear()}</span>
                      </div>
                    )}
                    {movie.runtime && (
                      <div className="flex items-center gap-1 sm:gap-1.5 glass-dark px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-border/50 text-muted-foreground text-xs sm:text-sm md:text-base">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>{movie.runtime} min</span>
                      </div>
                    )}
                  </div>

                  {/* Géneros */}
                  {movie.genres && movie.genres.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4 md:mb-6">
                      {movie.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="px-2 sm:px-3 py-0.5 sm:py-1 glass text-foreground rounded-full text-xs sm:text-sm border border-primary/30"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Botones de acción */}
                  <div className="flex flex-wrap gap-2 sm:gap-3">
{/* Removed manual back button */}
                    <Button
                      onClick={() => toggleFavorite(movie)}
                      variant={favorite ? "default" : "outline"}
                      size="sm"
                      className="gap-1.5 sm:gap-2 text-xs sm:text-sm h-8 sm:h-9 md:h-10"
                    >
                      <Heart className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4", favorite && "fill-current")} />
                      <span className="hidden sm:inline">{favorite ? 'En favoritos' : 'Añadir a favoritos'}</span>
                      <span className="sm:hidden">{favorite ? 'Favorito' : 'Añadir'}</span>
                    </Button>
                    {trailer && (
                      <Button
                        variant="gradient"
                        size="sm"
                        className="gap-1.5 sm:gap-2 text-xs sm:text-sm h-8 sm:h-9 md:h-10"
                        onClick={() => {
                          document.getElementById('trailer-section')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Ver trailer</span>
                        <span className="sm:hidden">Trailer</span>
                      </Button>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sinopsis y detalles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10 md:mb-12">
          {/* Columna principal - Sinopsis */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 space-y-4 sm:space-y-6"
          >
            {movie.overview && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">Sinopsis</h2>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base md:text-lg">
                  {movie.overview}
                </p>
              </div>
            )}

            {/* Equipo */}
            {movie.credits?.crew && movie.credits.crew.length > 0 && (
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">Equipo</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {movie.credits.crew.slice(0, 6).map((person, idx) => (
                    <div key={`crew-${person.id}-${idx}`} className="glass-dark p-2 sm:p-3 rounded-lg border border-border/50">
                      <p className="font-semibold text-foreground text-xs sm:text-sm">{person.name}</p>
                      <p className="text-muted-foreground text-[0.7rem] sm:text-xs">{person.job}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Columna lateral - Poster */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-1 order-first lg:order-last"
          >
            {movie.poster_path ? (
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="w-full max-w-sm mx-auto lg:max-w-none rounded-xl sm:rounded-2xl shadow-2xl border border-border/50 hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full max-w-sm mx-auto lg:max-w-none aspect-[2/3] glass-dark rounded-xl sm:rounded-2xl flex items-center justify-center border border-border/50">
                <span className="text-muted-foreground">Sin imagen</span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Trailer */}
        {trailer && (
          <motion.div
            id="trailer-section"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8 sm:mb-10 md:mb-12"
          >
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Play className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">Trailer</h2>
            </div>
            <div className="aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-border/50 shadow-xl">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </motion.div>
        )}

        {/* Reparto */}
        {movie.credits?.cast && movie.credits.cast.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mb-8 sm:mb-10 md:mb-12"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Reparto Principal</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
              {movie.credits.cast.slice(0, 12).map((actor, index) => (
                <motion.div
                  key={`cast-${actor.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-lg sm:rounded-xl mb-2 border border-border/50 hover:border-primary/50 transition-all duration-300">
                    {actor.profile_path ? (
                      <img
                        src={actor.profile_path}
                        alt={actor.name}
                        className="w-full aspect-[2/3] object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full aspect-[2/3] glass-dark flex items-center justify-center">
                        <span className="text-muted-foreground text-[0.65rem] sm:text-xs">Sin foto</span>
                      </div>
                    )}
                  </div>
                  <p className="text-foreground text-xs sm:text-sm font-semibold line-clamp-1">{actor.name}</p>
                  <p className="text-muted-foreground text-[0.65rem] sm:text-xs line-clamp-1">{actor.character}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Películas Similares */}
        {movie.similar && movie.similar.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Películas Similares</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {movie.similar.slice(0, 12).map((similarMovie, index) => (
                <MovieCard key={`similar-${similarMovie.id}-${index}`} movie={similarMovie} index={index} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
