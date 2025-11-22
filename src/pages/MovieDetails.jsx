import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Calendar, Clock, ArrowLeft, Play } from 'lucide-react';
import { useMovieDetails } from '../hooks/useMovies';
import { useFavorites } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Loader2 } from 'lucide-react';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movie, loading, error } = useMovieDetails(id);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (loading) {
    return (
      <div className="pt-16 lg:pt-4 pb-10 min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="h-16 w-16 text-primary" />
        </motion.div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-16 lg:pt-4 pb-10 min-h-screen flex items-center justify-center"
      >
        <Card className="p-8 text-center max-w-md">
          <p className="text-destructive text-xl mb-4">Error al cargar la película</p>
          <Button onClick={() => navigate('/')} variant="default">
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
      {movie.backdrop_path && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative h-[60vh] w-full mb-8 overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${movie.backdrop_path})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background"></div>
          </div>
        </motion.div>
      )}

      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Poster */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex-shrink-0"
          >
            {movie.poster_path ? (
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="w-full max-w-sm rounded-lg shadow-2xl"
              />
            ) : (
              <div className="w-full max-w-sm aspect-[2/3] bg-card rounded-lg flex items-center justify-center border border-border">
                <span className="text-muted-foreground">Sin imagen</span>
              </div>
            )}
          </motion.div>

          {/* Información */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  {movie.title}
                </h1>
                {movie.original_title !== movie.title && (
                  <p className="text-muted-foreground text-lg mb-4">{movie.original_title}</p>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleFavorite(movie)}
                className="text-4xl"
                aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              >
                <Star
                  className={favorite ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}
                />
              </motion.button>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-foreground text-xl font-semibold">
                  {movie.vote_average?.toFixed(1) || 'N/A'}
                </span>
                <span className="text-muted-foreground">({movie.vote_count} votos)</span>
              </div>
              {movie.release_date && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(movie.release_date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              )}
              {movie.runtime && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{movie.runtime} min</span>
                </div>
              )}
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <motion.span
                    key={genre.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm border border-primary/30"
                  >
                    {genre.name}
                  </motion.span>
                ))}
              </div>
            )}

            {movie.overview && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-3">Sinopsis</h2>
                <p className="text-muted-foreground leading-relaxed">{movie.overview}</p>
              </div>
            )}

            {movie.credits?.crew && movie.credits.crew.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Equipo</h3>
                <div className="flex flex-wrap gap-4">
                  {movie.credits.crew.map((person) => (
                    <div key={person.id} className="text-muted-foreground">
                      <span className="font-semibold text-foreground">{person.name}</span>
                      <span className="ml-2">({person.job})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Trailer */}
        {trailer && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <Play className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Trailer</h2>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden border border-border">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </motion.div>
        )}

        {/* Reparto */}
        {movie.credits?.cast && movie.credits.cast.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">Reparto Principal</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {movie.credits.cast.map((actor, index) => (
                <motion.div
                  key={actor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                  className="text-center"
                >
                  {actor.profile_path ? (
                    <img
                      src={actor.profile_path}
                      alt={actor.name}
                      className="w-full aspect-[2/3] object-cover rounded-lg mb-2 border border-border"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full aspect-[2/3] bg-card rounded-lg mb-2 flex items-center justify-center border border-border">
                      <span className="text-muted-foreground text-xs">Sin foto</span>
                    </div>
                  )}
                  <p className="text-foreground text-sm font-semibold">{actor.name}</p>
                  <p className="text-muted-foreground text-xs">{actor.character}</p>
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
            <h2 className="text-2xl font-bold text-foreground mb-4">Películas Similares</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {movie.similar.map((similarMovie, index) => (
                <MovieCard key={similarMovie.id} movie={similarMovie} index={index} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
