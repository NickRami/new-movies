import { motion } from 'framer-motion';
import { Layers, Infinity, Zap, Ticket } from 'lucide-react';
import { getContainerClasses } from '../lib/layout-constants';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Collections() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const CollectionCards = [
        {
            icon: <Infinity className="w-8 h-8 md:w-12 md:h-12 text-blue-400 group-hover:scale-110 transition-transform" />,
            title: t('collections.marvelTitle'),
            desc: t('collections.marvelDesc'),
            bg: "from-blue-600/20 to-cyan-500/10",
            border: "border-blue-500/30",
            shadow: "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]",
        },
        {
            icon: <Zap className="w-8 h-8 md:w-12 md:h-12 text-yellow-500 group-hover:scale-110 transition-transform" />,
            title: t('collections.epicTitle'),
            desc: t('collections.epicDesc'),
            bg: "from-yellow-600/20 to-orange-500/10",
            border: "border-yellow-500/30",
            shadow: "group-hover:shadow-[0_0_40px_rgba(234,179,8,0.3)]",
        },
        {
            icon: <Ticket className="w-8 h-8 md:w-12 md:h-12 text-rose-500 group-hover:scale-110 transition-transform" />,
            title: t('collections.mastersTitle'),
            desc: t('collections.mastersDesc'),
            bg: "from-rose-600/20 to-pink-500/10",
            border: "border-rose-500/30",
            shadow: "group-hover:shadow-[0_0_40px_rgba(244,63,94,0.3)]",
        }
    ];

    return (
        <div className="min-h-screen pt-32 pb-24 bg-background relative overflow-hidden flex flex-col items-center">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] dark:mix-blend-screen mix-blend-multiply" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] dark:mix-blend-screen mix-blend-multiply" />
            </div>

            <div className={cn(getContainerClasses(), "relative z-10 w-full")}>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 flex flex-col items-center justify-center text-center mb-16"
                >
                    <div className="flex items-center justify-center w-20 h-20 rounded-3xl bg-secondary/30 border border-border/50 shadow-glow mb-8">
                        <Layers className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/60 tracking-tighter drop-shadow-md mb-6">
                        {t('collections.title')}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                        {t('collections.subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
                    {CollectionCards.map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
                            className={cn(
                                "relative rounded-[2.5rem] p-8 lg:p-10 border glass group overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]",
                                card.shadow
                            )}
                        >
                            {/* Accent Background */}
                            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-[0.03] dark:opacity-[0.07] transition-opacity group-hover:opacity-[0.12]", card.bg)} />

                            <div className="relative z-10">
                                <div className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity">{card.icon}</div>
                                <h3 className="text-3xl font-black text-foreground mb-4 tracking-tight">{card.title}</h3>
                                <p className="text-muted-foreground font-medium leading-relaxed">{card.desc}</p>

                                <div className="mt-8 flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 border border-border/50 px-4 py-1.5 rounded-full backdrop-blur-md bg-secondary/20">
                                        {t('collections.comingSoon')}
                                    </span>
                                </div>
                            </div>

                            {/* Decorative element */}
                            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-700" />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <Button
                        onClick={() => navigate('/')}
                        variant="outline"
                        size="lg"
                        className="rounded-full px-10 h-16 text-lg font-bold glass hover:bg-primary hover:text-white transition-all duration-500 shadow-xl"
                    >
                        {t('collections.explore')}
                    </Button>
                </div>
            </div>
        </div>
    );
}
