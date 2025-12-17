import { useState } from 'react';
import { motion } from 'framer-motion';
import { useProviders } from '../hooks/useMovies';

export default function ProvidersCarousel() {
  const { providers, loading, error } = useProviders();
  const [paused, setPaused] = useState(false);

  if (loading || error || !providers || providers.length === 0) {
    return null;
  }

  // Duplicamos la lista para crear un efecto de loop continuo
  const loopProviders = [...providers, ...providers];

  return (
    <section className="bg-card/60 border-y border-border/50">
      <div className="container mx-auto px-4 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-4 gap-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Available on
          </h2>
          <p className="text-xs text-muted-foreground">
            TMDB Streaming Providers
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden"
        >
          <motion.div
            className="flex gap-4 pb-2 no-scrollbar"
            style={{ width: 'max-content' }}
            animate={
              paused
                ? { x: 0 }
                : { x: ['0%', '-50%'] }
            }
            transition={
              paused
                ? { duration: 0.2 }
                : { duration: 30, ease: 'linear', repeat: Infinity }
            }
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {loopProviders.map((provider, index) => (
              <motion.div
                key={`${provider.provider_id}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.03, 0.5) }}
                whileHover={{ y: -4, scale: 1.03 }}
                className="flex-shrink-0"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-background border border-border flex items-center justify-center overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  {provider.logo_path ? (
                    <img
                      src={provider.logo_path}
                      alt={provider.provider_name}
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-xs text-muted-foreground text-center px-2">
                      {provider.provider_name}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


