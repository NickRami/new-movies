import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Film, Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { getContainerClasses } from '../lib/layout-constants';

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full mix-blend-screen" />
            </div>

            <div className={`${getContainerClasses()} relative z-10 text-center max-w-2xl mx-auto px-4`}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="glass-dark border border-border/50 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-xl"
                >
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary to-violet-600 shadow-lg shadow-primary/20 flex items-center justify-center">
                            <Film className="w-10 h-10 text-white" />
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 mb-4"
                    >
                        404
                    </motion.h1>

                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="text-2xl md:text-3xl font-bold text-foreground mb-4"
                    >
                        {t('errors.pageNotFound', 'Página no encontrada')}
                    </motion.h2>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="text-muted-foreground mb-8 text-lg"
                    >
                        {t('errors.pageNotFoundDesc', 'Lo sentimos, la página que estás buscando no existe o ha sido movida.')}
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Button
                            variant="default"
                            size="lg"
                            className="px-8 bg-white hover:bg-gray-200 text-black font-semibold rounded-full gap-2"
                            asChild
                        >
                            <Link to="/">
                                <Home className="w-4 h-4" />
                                {t('common.goHome', 'Ir al Inicio')}
                            </Link>
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="px-8 rounded-full gap-2 border-white/20 hover:bg-white/10"
                            onClick={() => window.history.back()}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {t('common.goBack', 'Volver atrás')}
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
