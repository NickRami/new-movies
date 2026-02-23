import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { getContainerClasses } from '../lib/layout-constants';
import { cn } from '../lib/utils';
import { useTrendingMovies } from '../hooks/useMovies';

export default function AIRecommendations() {
    const { movies, loading, error } = useTrendingMovies();
    const recommendations = movies ? movies.slice(0, 3) : [];

    if (loading || error || recommendations.length === 0) return null;

    return (
        <section className={cn("py-20 md:py-32 relative overflow-hidden bg-background")}>
            {/* Vínculo con el cyberpunk / 2026 aesthetics */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] mix-blend-screen" />
                <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[100px] mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

            <div className={cn(getContainerClasses(), "relative z-10")}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-white/10 pb-8"
                >
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_0_30px_rgba(99,102,241,0.5)]">
                                <Sparkles className="w-6 h-6 text-white" />
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">
                                Selección Especial para ti
                            </h2>
                        </div>
                        <p className="text-lg text-indigo-200/80 font-medium">
                            Basado en lo que disfrutas, hemos preparado este catálogo exclusivo con películas que seguramente te encantarán hoy.
                        </p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                    {/* Tarjeta Principal (Destacada) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="lg:col-span-8 relative rounded-3xl overflow-hidden group border border-white/5 cursor-pointer shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-colors duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                        <img
                            src={recommendations[0].backdrop_path}
                            alt={recommendations[0].title}
                            className="w-full h-[400px] lg:h-[600px] object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 w-full p-8 lg:p-12 z-20">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-bold backdrop-blur-md border border-indigo-500/30 mb-4 transform group-hover:-translate-y-1 transition-transform">
                                <Sparkles className="w-4 h-4" />
                                Muy Recomendada
                            </div>
                            <h3 className="text-3xl lg:text-5xl font-black mb-4 text-white group-hover:text-indigo-300 transition-colors">
                                {recommendations[0].title}
                            </h3>
                            <p className="text-gray-300 line-clamp-3 text-base lg:text-lg max-w-3xl">
                                {recommendations[0].overview}
                            </p>
                        </div>
                    </motion.div>

                    {/* Tarjetas Secundarias (Apiladas) */}
                    <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-8">
                        {recommendations.slice(1, 3).map((movie, idx) => (
                            <motion.div
                                key={movie.id}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2, duration: 0.7 }}
                                className="relative flex-1 rounded-3xl overflow-hidden group border border-white/5 cursor-pointer shadow-xl h-[300px] lg:h-auto"
                            >
                                <div className="absolute inset-0 bg-black/50 z-10 group-hover:bg-black/30 transition-colors duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
                                <img
                                    src={movie.backdrop_path}
                                    alt={movie.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                                    <div className="flex items-center gap-2 mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                        <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,1)]" />
                                        <span className="text-rose-200 text-xs font-bold tracking-wider uppercase">
                                            Elegida para ti
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-rose-300 transition-colors">
                                        {movie.title}
                                    </h3>
                                    <p className="text-gray-400 line-clamp-2 text-sm">
                                        {movie.overview}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
