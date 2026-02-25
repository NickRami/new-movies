import { motion } from 'framer-motion';
import { Tv } from 'lucide-react';
import { useTrendingTV } from '../hooks/useMovies';
import MovieList from '../components/MovieList';
import { getContainerClasses } from '../lib/layout-constants';
import { useTranslation } from 'react-i18next';

export default function Series() {
    const { series, loading, error } = useTrendingTV();
    const { t } = useTranslation();

    return (
        <div className="min-h-screen pt-32 pb-16 bg-background relative overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] dark:mix-blend-screen mix-blend-multiply" />
            </div>

            <div className={getContainerClasses()}>
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 relative z-10"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary/30 border border-border/50 shadow-glow">
                            <Tv className="w-7 h-7 text-primary" />
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70 tracking-tighter">
                            {t('series.title')}
                        </h1>
                    </div>
                    <p className="text-muted-foreground text-lg max-w-2xl font-medium">
                        {t('series.subtitle')}
                    </p>
                </motion.div>

                <div className="relative z-10">
                    <MovieList movies={series} loading={loading} error={error} />
                </div>
            </div>
        </div>
    );
}
