import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';
import { getContainerClasses } from '../lib/layout-constants';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccess(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen pt-32 pb-24 bg-background relative overflow-hidden flex flex-col items-center">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] mix-blend-screen" />
            </div>

            <div className={cn(getContainerClasses(), "relative z-10 w-full")}>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center flex flex-col items-center"
                >
                    <div className="flex items-center justify-center w-16 h-16 rounded-3xl bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] mb-6 mx-auto">
                        <MessageSquare className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tighter drop-shadow-md mb-6 pt-2">
                        Hablemos
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        Nuestros canales de comunicación están abiertos. Envíanos tu consulta técnica, feedback o propuesta comercial.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="w-full max-w-2xl mx-auto p-8 md:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative"
                >
                    {success ? (
                        <div className="h-64 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-4">
                                <Send className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Mensaje Enviado</h3>
                            <p className="text-gray-400">Gracias por contactarte. Nuestro equipo te responderá en breve.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300 ml-1">Nombre</label>
                                    <Input
                                        required
                                        placeholder="Tu nombre"
                                        className="bg-black/40 border-white/10 text-white placeholder:text-gray-600 h-12 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary shadow-inner"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300 ml-1">Correo Electrónico</label>
                                    <Input
                                        required
                                        type="email"
                                        placeholder="tu@email.com"
                                        className="bg-black/40 border-white/10 text-white placeholder:text-gray-600 h-12 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary shadow-inner"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Asunto</label>
                                <Input
                                    required
                                    placeholder="¿En qué te podemos ayudar?"
                                    className="bg-black/40 border-white/10 text-white placeholder:text-gray-600 h-12 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary shadow-inner"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Mensaje</label>
                                <textarea
                                    required
                                    rows={5}
                                    placeholder="Escribe tu mensaje aquí..."
                                    className="w-full bg-black/40 border border-white/10 text-white placeholder:text-gray-600 rounded-xl p-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-inner resize-none"
                                ></textarea>
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-14 rounded-xl text-base font-bold bg-white text-black hover:bg-gray-200 transition-colors mt-4"
                            >
                                {isSubmitting ? 'Procesando...' : 'Enviar Mensaje'}
                                {!isSubmitting && <Send className="w-5 h-5 ml-2" />}
                            </Button>
                        </form>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
