import { motion } from 'framer-motion';
import { ShieldCheck, FileText } from 'lucide-react';
import { getContainerClasses } from '../lib/layout-constants';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';

export default function Privacy() {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <div className="min-h-screen pt-32 pb-24 bg-background relative overflow-hidden flex flex-col items-center">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] mix-blend-screen" />
            </div>

            <div className={cn(getContainerClasses(), "relative z-10 w-full")}>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center flex flex-col items-center"
                >
                    <div className="flex items-center justify-center w-16 h-16 rounded-3xl bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] mb-6 mx-auto">
                        <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tighter drop-shadow-md mb-6 pt-2">
                        Privacidad & Legal
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        Tus datos blindados por nuestra política de transparencia y seguridad. <br />Actualizado en {currentYear}.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="w-full max-w-4xl mx-auto rounded-3xl border border-white/10 bg-black/40 backdrop-blur-3xl overflow-hidden p-8 md:p-12 shadow-2xl"
                >
                    <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                        <h3 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                            <FileText className="w-6 h-6 text-primary" /> Recopilación de Datos
                        </h3>
                        <p className="mb-8 leading-relaxed">
                            En CineScope recopilamos información estadística general relacionada con las búsquedas e interacciones en la web, de forma enteramente anónima. Utilizando los endpoints de The Movie Database (TMDB), la información consultada se procesa exclusivamente para entrenar y mejorar tu flujo de recomendaciones en sesiones futuras. No guardamos correos en texto plano ni vendemos perfiles de usuario.
                        </p>

                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                            Uso de Cookies y Almacenamiento Local
                        </h3>
                        <p className="mb-8 leading-relaxed">
                            Hacemos uso exclusivo del <strong>Local Storage</strong> o cookies técnicas estrictamente necesarias para el correcto funcionamiento de tu cuenta, autenticación (login/registro) y persistencia del contexto global (películas que agregas a tus Favoritos).
                        </p>

                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                            Terceros y Plataformas
                        </h3>
                        <p className="mb-8 leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/10">
                            Toda carátula de película, logo u obra audiovisual exhibida es propiedad intelectual y copyright de sus correspondientes autores, productoras y conglomerados (TMDB). CineScope es un explorador visual (front-end) que se nutre del catálogo documental global bajo fines investigativos, educativos y de descubrimiento de contenido.
                        </p>

                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                            Derechos del Usuario
                        </h3>
                        <ul className="space-y-4 mb-4 list-disc pl-6">
                            <li>Derecho a rectificar tus datos registrados.</li>
                            <li>Derecho al borrado instantáneo y permanente de tu historial de favoritos (cuenta).</li>
                            <li>Derecho a la exclusión de campañas de mailing o promoción.</li>
                        </ul>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
