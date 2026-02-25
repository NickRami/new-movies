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
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full dark:mix-blend-screen mix-blend-multiply" />
            </div>

            <div className={`${getContainerClasses()} relative z-10 text-center max-w-2xl mx-auto px-4`}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="glass border border-border/50 rounded-[3rem] p-8 md:p-16 shadow-2xl backdrop-blur-2xl relative overflow-hidden"
                >
                    {/* Interior glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />

                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="flex justify-center mb-8"
                    >
                        <div className="w-20 h-20 rounded-3xl bg-secondary/30 border border-border/50 shadow-glow flex items-center justify-center">
                            <Film className="w-10 h-10 text-primary" />
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/40 mb-6 font-heading tracking-tighter"
                    >
                        404
                    </motion.h1>

                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="text-2xl md:text-4xl font-black text-foreground mb-4 tracking-tight"
                    >
                        {t('errors.pageNotFound')}
                    </motion.h2>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="text-muted-foreground mb-10 text-lg md:text-xl font-medium max-w-md mx-auto leading-relaxed"
                    >
                        {t('errors.pageNotFoundDesc')}
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Button
                            variant="gradient"
                            size="lg"
                            className="px-10 rounded-full h-14 font-bold shadow-glow"
                            asChild
                        >
                            <Link to="/">
                                <Home className="w-5 h-5 mr-2" />
                                {t('errors.goHome')}
                            </Link>
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="px-10 rounded-full h-14 font-bold glass hover:bg-primary/10 transition-all duration-300"
                            onClick={() => window.history.back()}
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            {t('errors.goBack')}
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
