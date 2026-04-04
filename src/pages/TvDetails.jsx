import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Calendar, Clock, ArrowLeft, Play, Heart } from 'lucide-react';
import { useTvDetails } from '../hooks/useMovies';
import { useFavorites } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import BackNavigation from '../components/BackNavigation';
import { useTranslation } from 'react-i18next';
import { getContainerClasses } from '../lib/layout-constants';

export default function TvDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movie, loading, error } = useTvDetails(id);
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
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background text-foreground font-body relative overflow-x-hidden"
    >
      {/* Futuristic Backdrop 2026 */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {movie.backdrop_path ? (
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${movie.backdrop_path})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-primary/10" />
        )}

        {/* --- THEME ADAPTIVE MASKING --- */}
        {/* Dark Mode Gradients */}
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-b from-background/40 via-background/90 to-background z-0" />
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-r from-background/95 via-transparent to-background/95 z-0" />

        {/* Light Mode Gradients - More aggressive to keep text readable on images */}
        <div className="dark:hidden absolute inset-0 bg-gradient-to-b from-white/30 via-white/95 to-white z-0" />
        <div className="dark:hidden absolute inset-0 bg-gradient-to-r from-white/95 via-white/40 to-white/95 z-0" />

        {/* Ambient Lighting Orbs - Theme Aware */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px] dark:mix-blend-screen mix-blend-plus-lighter opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] dark:mix-blend-screen mix-blend-plus-lighter opacity-40" />
      </div>

      {/* --- MAIN CONTENT OVERLAY --- */}
      <div className="relative z-10 pt-24 pb-32">
        <div className={cn(getContainerClasses(), "max-w-7xl mx-auto")}>

          {/* Top Navigation */}
          <div className="mb-12">
            <BackNavigation />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

            {/* Left Column: Glass Poster & Actions */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-8 lg:sticky lg:top-32 relative z-20">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                className="w-2/3 sm:w-1/2 lg:w-full aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] ring-1 ring-white/10 group relative"
              >
                {movie.poster_path ? (
                  <img
                    src={movie.poster_path}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-secondary/50">
                    <span className="text-4xl mb-2">🎬</span>
                    <span className="text-muted-foreground text-sm text-center">{t('common.notAvailable')}</span>
                  </div>
                )}
                {/* Inner glass reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>

              {/* 2026 Action Panel */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="w-2/3 sm:w-1/2 lg:w-full flex flex-col gap-3 p-4 rounded-2xl bg-secondary/10 border border-border/50 backdrop-blur-2xl shadow-xl"
              >
                {trailer && (
                  <Button
                    size="lg"
                    className="w-full rounded-2xl h-14 bg-foreground text-background hover:bg-foreground/80 font-bold text-base transition-transform hover:scale-[1.02] shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                    onClick={() => document.getElementById('trailer-section')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <Play className="w-5 h-5 mr-3 fill-current" />
                    {t('details.watchTrailer')}
                  </Button>
                )}
                <Button
                  size="lg"
                  variant={favorite ? "secondary" : "outline"}
                  className={cn(
                    "w-full rounded-2xl h-14 text-base font-semibold border-border bg-transparent text-foreground hover:bg-secondary transition-all",
                    favorite && "bg-primary/20 border-primary/50 text-primary shadow-[0_0_20px_rgba(244,63,94,0.2)] hover:bg-primary/30",
                    !trailer && "bg-secondary/50"
                  )}
                  onClick={() => toggleFavorite(movie)}
                >
                  <Heart className={cn("w-5 h-5 mr-3", favorite && "fill-primary text-primary border-none")} />
                  {favorite ? t('details.saved') : t('details.addToList')}
                </Button>
              </motion.div>
            </div>

            {/* Right Column: Information Flow */}
            <div className="lg:col-span-8 space-y-16">

              {/* Title Section */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres?.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-4 py-1.5 bg-secondary/30 backdrop-blur-xl text-foreground/80 text-xs font-bold uppercase tracking-widest rounded-lg border border-border/50"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/70 tracking-tighter leading-[1.1] mb-4">
                  {movie.title}
                </h1>

                {movie.tagline && (
                  <p className="text-lg sm:text-xl lg:text-2xl text-primary font-medium tracking-tight mb-8 drop-shadow-sm dark:drop-shadow-md">
                    {movie.tagline}
                  </p>
                )}

                {/* Minimalist Stats Board */}
                <div className="flex flex-row flex-wrap items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-[2rem] bg-secondary/10 border border-border/50 backdrop-blur-3xl w-full">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">{t('details.rating')}</p>
                      <p className="text-lg font-bold text-foreground">{movie.vote_average?.toFixed(1)} <span className="text-xs text-muted-foreground font-normal">/10</span></p>
                    </div>
                  </div>
                  <div className="w-px h-10 bg-border/50 hidden sm:block" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">{t('details.duration')}</p>
                      <p className="text-lg font-bold text-foreground">
                        {movie.runtime ? `${movie.runtime} ${t('common.min')}` : t('common.notAvailable')}
                      </p>
                    </div>
                  </div>
                  <div className="w-px h-10 bg-border/50 hidden sm:block" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">{t('details.release')}</p>
                      <p className="text-lg font-bold text-foreground">{movie.release_date ? new Date(movie.release_date).getFullYear() : t('common.notAvailable')}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Synopsis */}
              <motion.section
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-6 text-foreground/90">
                  {t('details.storyline')}
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed font-light">
                  {movie.overview}
                </p>

                {/* Micro Info Row */}
                <div className="mt-8 flex gap-8 text-sm border-t border-border/50 pt-6">
                  <div>
                    <span className="block text-muted-foreground mb-1">{t('details.originalTitle')}</span>
                    <span className="text-foreground/80 font-medium">{movie.original_title}</span>
                  </div>
                  <div>
                    <span className="block text-muted-foreground mb-1">{t('details.status')}</span>
                    <span className="text-emerald-500 font-medium">{movie.status}</span>
                  </div>
                </div>
              </motion.section>

              {/* 2026 Cast Cards */}
              {movie.credits?.cast?.length > 0 && (
                <motion.section
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold mb-6 text-foreground/90">{t('details.topCast')}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {movie.credits.cast.slice(0, 8).map((actor) => (
                      <div key={actor.id} className="group p-4 rounded-3xl bg-secondary/10 border border-border/50 hover:bg-secondary/30 transition-all cursor-pointer">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-secondary mb-4 shadow-lg group-hover:scale-105 transition-transform">
                          {actor.profile_path ? (
                            <img src={actor.profile_path} alt={actor.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="w-full h-full flex items-center justify-center text-muted-foreground">?</span>
                          )}
                        </div>
                        <p className="font-bold text-foreground text-sm mb-1 line-clamp-1">{actor.name}</p>
                        <p className="text-xs text-primary font-medium line-clamp-1">{actor.character}</p>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Minimalist Trailer Player */}
              {trailer && (
                <motion.section
                  id="trailer-section" className="scroll-mt-32"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold mb-6 text-foreground/90">{t('details.trailer')}</h2>
                  <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-2xl border border-border/50 bg-secondary/50 p-2 backdrop-blur-xl">
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-black">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${trailer.key}?color=white&rel=0`}
                        title={trailer.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </motion.section>
              )}

              {/* Similar Movies - Floating Layout */}
              {movie.similar?.length > 0 && (
                <motion.section
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold mb-6 text-foreground/90 border-b border-border/50 pb-4">{t('common.similar')}</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {movie.similar.slice(0, 4).map((m, idx) => (
                      <div key={m.id} className="transform hover:-translate-y-2 transition-transform duration-300">
                        <MovieCard movie={m} index={idx} />
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
