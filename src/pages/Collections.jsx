import { motion } from 'framer-motion';
import { Layers, Infinity, Zap, Ticket } from 'lucide-react';
import { getContainerClasses } from '../lib/layout-constants';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const CollectionCards = [
    {
        icon: <Infinity className="w-8 h-8 md:w-12 md:h-12 text-blue-400 group-hover:scale-110 transition-transform" />,
        title: "Universo Marvel",
        desc: "Todo el MCU ordenado cronológicamente para que no pierdas ningún cameo o post-crédito.",
        bg: "from-blue-600/20 to-cyan-500/10",
        border: "border-blue-500/30",
        shadow: "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]",
    },
    {
        icon: <Zap className="w-8 h-8 md:w-12 md:h-12 text-yellow-500 group-hover:scale-110 transition-transform" />,
        title: "Sagas Épicas",
        desc: "Harry Potter, El Señor de los Anillos, Matrix. Listos para tus maratones del fin de semana.",
        bg: "from-yellow-600/20 to-orange-500/10",
        border: "border-yellow-500/30",
        shadow: "group-hover:shadow-[0_0_40px_rgba(234,179,8,0.3)]",
    },
    {
        icon: <Ticket className="w-8 h-8 md:w-12 md:h-12 text-rose-500 group-hover:scale-110 transition-transform" />,
        title: "Obras Maestras",
        desc: "Directores de culto compilados en un solo lugar: Nolan, Spielberg, Tarantino y más.",
        bg: "from-rose-600/20 to-pink-500/10",
        border: "border-rose-500/30",
        shadow: "group-hover:shadow-[0_0_40px_rgba(244,63,94,0.3)]",
    }
];

export default function Collections() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen pt-32 pb-24 bg-background relative overflow-hidden flex flex-col items-center">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] mix-blend-screen" />
            </div>

            <div className={cn(getContainerClasses(), "relative z-10 w-full")}>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 flex flex-col items-center justify-center text-center mb-16"
                >
                    <div className="flex items-center justify-center w-20 h-20 rounded-3xl bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] mb-8">
                        <Layers className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tighter drop-shadow-md mb-6">
                        Colecciones
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        Estamos curando listas inmersivas por directores, franquicias y mundos extendidos para tu próxima gran aventura (Update V2).
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
                                "relative rounded-3xl p-8 lg:p-10 border bg-gradient-to-br backdrop-blur-xl group overflow-hidden cursor-pointer transition-all duration-500",
                                card.bg, card.border, card.shadow
                            )}
                        >
                            <div className="mb-6 opacity-80">{card.icon}</div>
                            <h3 className="text-3xl font-black text-white mb-4 tracking-tight drop-shadow-sm">{card.title}</h3>
                            <p className="text-gray-300 font-medium leading-relaxed drop-shadow-sm">{card.desc}</p>

                            <div className="mt-8 flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-widest text-white/50 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md">Próximamente</span>
                            </div>

                            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <Button
                        onClick={() => navigate('/')}
                        variant="outline"
                        className="rounded-full border-white/10 px-8 h-14 bg-black/40 hover:bg-white/10 text-white backdrop-blur-md"
                    >
                        Volver a Explorar
                    </Button>
                </div>
            </div>
        </div>
    );
}
