import { motion } from 'framer-motion';
import { useProviders } from '../hooks/useMovies';

export default function ProvidersCarousel() {
  const { providers, loading, error } = useProviders();

  if (loading || error || !providers || providers.length === 0) {
    return null;
  }

  return (
    <section className="bg-card/60 border-y border-border/50">
      <div className="container mx-auto px-4 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-4 gap-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Disponible en
          </h2>
          <p className="text-xs text-muted-foreground">
            Proveedores de streaming de TMDB
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex gap-4 overflow-x-auto pb-2 no-scrollbar"
        >
          {providers.map((provider, index) => (
            <motion.div
              key={provider.provider_id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="flex-shrink-0"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-background border border-border flex items-center justify-center overflow-hidden shadow-sm hover:shadow-md transition-shadow">
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
      </div>
    </section>
  );
}


