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
import { useTranslation } from 'react-i18next';
import { getContainerClasses } from '../lib/layout-constants';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movie, loading, error } = useMovieDetails(id);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
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
          className="mt-4 text-muted-foreground font-medium tracking-wide"
        >
          {t('details.loading')}
        </motion.p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="glass-dark p-8 text-center max-w-md border-destructive/30 shadow-2xl">
          <p className="text-destructive text-xl font-heading font-bold mb-4">{t('details.errorTitle')}</p>
          <p className="text-muted-foreground mb-6">{t('details.errorMessage')}</p>
          <Button onClick={() => navigate('/')} variant="gradient" className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('common.returnHome')}
          </Button>
        </Card>
      </div>
    );
  }

  const favorite = isFavorite(movie.id);
  const trailer = movie.videos && movie.videos.find(v => v.type === "Trailer") || movie.videos?.[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background text-foreground font-body"
    >
      {/* --- IMMERSIVE HERO SECTION --- */}
      <div className="relative w-full h-[70vh] lg:h-[85vh] overflow-hidden">
        {/* Backdrop Image */}
        {movie.backdrop_path ? (
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${movie.backdrop_path})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-secondary" />
        )}
        
        {/* Gradient Overlays for Readability & Mood */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-black/20" /> {/* General dim */}

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end pb-12">
          <div className={getContainerClasses()}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              
              {/* Poster - Floating Overlap */}
              <div className="hidden lg:block lg:col-span-3 xl:col-span-3 relative z-10 translate-y-12">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-xl overflow-hidden shadow-2xl border-4 border-background/20 ring-1 ring-white/10"
                >
                  <img 
                    src={movie.poster_path} 
                    alt={movie.title} 
                    className="w-full h-auto object-cover aspect-[2/3]"
                  />
                </motion.div>
              </div>

              {/* Title & Key Info */}
              <div className="col-span-1 lg:col-span-9 xl:col-span-9 mb-4 lg:mb-12">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <BackNavigation />
                  
                  {/* Genres */}
                  <div className="flex flex-wrap gap-2 mb-4 mt-4">
                    {movie.genres?.map((genre) => (
                      <span
                        key={genre.id}
                         className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider rounded-full border border-white/10"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>

                  {/* Main Title */}
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white leading-[0.9] mb-4 tracking-tight drop-shadow-2xl">
                    {movie.title}
                  </h1>
                  
                  {movie.tagline && (
                    <p className="text-xl text-gray-300 font-light italic mb-6 border-l-4 border-primary pl-4">
                      "{movie.tagline}"
                    </p>
                  )}

                  {/* Quick Stats Row */}
                  <div className="flex flex-wrap items-center gap-6 text-gray-200 mb-8">
                    <div className="flex items-center gap-2">
                       <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                       <span className="text-xl font-bold text-white">{movie.vote_average?.toFixed(1)}</span>
                       <span className="text-sm text-gray-400">/ 10</span>
                    </div>
                    
                    <span className="w-1 h-1 bg-gray-500 rounded-full" />
                    
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span>{movie.runtime} {t('common.min')}</span>
                    </div>

                    <span className="w-1 h-1 bg-gray-500 rounded-full" />

                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span>{new Date(movie.release_date).getFullYear()}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    {trailer && (
                      <Button 
                        size="lg" 
                        variant="gradient"
                        className="rounded-full px-8 h-12 text-base font-semibold shadow-glow-primary hover:scale-105 transition-transform"
                        onClick={() => document.getElementById('trailer-section')?.scrollIntoView({ behavior: 'smooth' })}
                      >
                        <Play className="w-5 h-5 mr-2 fill-current" />
                        {t('details.watchTrailer')}
                      </Button>
                    )}
                    
                    <Button 
                      size="lg" 
                      variant={favorite ? "secondary" : "outline"}
                      className={cn(
                        "rounded-full px-6 h-12 text-base backdrop-blur-md bg-white/5 border-white/20 hover:bg-white/10 text-white transition-all",
                        favorite && "bg-primary/20 border-primary text-primary hover:bg-primary/30"
                      )}
                      onClick={() => toggleFavorite(movie)}
                    >
                      <Heart className={cn("w-5 h-5 mr-2", favorite && "fill-current")} />
                      {favorite ? t('details.saved') : t('details.addToList')}
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className={cn(getContainerClasses(), "py-12 lg:py-20 relative z-0")}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column (Details & Cast) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-heading font-bold mb-4 flex items-center gap-2">
                {t('details.storyline')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {movie.overview}
              </p>
            </section>
            
            {/* Top Cast Grid */}
            {movie.credits?.cast?.length > 0 && (
              <section>
                 <h2 className="text-2xl font-heading font-bold mb-6">{t('details.topCast')}</h2>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {movie.credits.cast.slice(0, 8).map((actor) => (
                      <div key={actor.id} className="group flex items-center gap-3 bg-card/50 p-3 rounded-xl border border-border/50 hover:bg-card hover:border-primary/30 transition-all">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-muted">
                          {actor.profile_path ? (
                            <img src={actor.profile_path} alt={actor.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="w-full h-full flex items-center justify-center text-[10px]">?</span>
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-bold text-sm truncate text-white group-hover:text-primary transition-colors">{actor.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{actor.character}</p>
                        </div>
                      </div>
                    ))}
                 </div>
              </section>
            )}

            {/* Trailer Embed */}
            {trailer && (
              <section id="trailer-section" className="scroll-mt-24">
                <h2 className="text-2xl font-heading font-bold mb-6">{t('details.trailer')}</h2>
                <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
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
              </section>
            )}

            {/* Similar Movies */}
             {movie.similar?.length > 0 && (
              <section>
                 <h2 className="text-2xl font-heading font-bold mb-6">{t('common.similar')}</h2>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {movie.similar.slice(0, 4).map((m, idx) => (
                      <MovieCard key={m.id} movie={m} index={idx} />
                    ))}
                 </div>
              </section>
             )}
          </div>

          {/* Right Column (Sidebar Stats) */}
          <div className="lg:col-span-4 space-y-8">
             {/* Mobile/Tablet Poster (Visible only on smaller screens) */}
             <div className="lg:hidden w-1/2 mx-auto sm:w-1/3 mb-8">
                <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-2xl">
                    <img src={movie.poster_path} alt={movie.title} className="w-full h-full object-cover" />
                </div>
             </div>

             {/* Information Card */}
             <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6 space-y-6 sticky top-24">
                <h3 className="text-xl font-heading font-bold text-white border-b border-white/10 pb-4">{t('details.movieInfo')}</h3>
                
                <div>
                  <span className="text-sm text-muted-foreground">{t('details.originalTitle')}</span>
                  <p className="font-medium text-white">{movie.original_title}</p>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground">{t('details.status')}</span>
                  <p className="font-medium text-white">{movie.status}</p>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground">{t('details.productionCompanies')}</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {movie.production_companies?.slice(0,3).map((co) => (
                      <span key={co.id} className="text-xs border border-white/10 px-2 py-1 rounded bg-black/20 text-gray-300">
                        {co.name}
                      </span>
                    ))}
                  </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
