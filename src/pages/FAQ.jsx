import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { getContainerClasses } from '../lib/layout-constants';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';

export default function FAQ() {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState(null);

    const FAQs = [
        {
            q: t('faq.q1'),
            a: t('faq.a1')
        },
        {
            q: t('faq.q2'),
            a: t('faq.a2')
        },
        {
            q: t('faq.q3'),
            a: t('faq.a3')
        },
        {
            q: t('faq.q4'),
            a: t('faq.a4')
        }
    ];

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen pt-32 pb-24 bg-background relative overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px] mix-blend-screen" />
            </div>

            <div className={cn(getContainerClasses(), "relative z-10")}>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center text-balance flex flex-col items-center"
                >
                    <div className="flex items-center justify-center w-16 h-16 rounded-3xl bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] mb-6 mx-auto">
                        <HelpCircle className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tighter drop-shadow-md mb-6 pt-2">
                        {t('faq.title')}
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        {t('faq.subtitle')}
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {FAQs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden backdrop-blur-sm"
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors group"
                                >
                                    <span className="font-bold text-lg text-gray-200 group-hover:text-white transition-colors">
                                        {faq.q}
                                    </span>
                                    <ChevronDown
                                        className={cn(
                                            "w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0",
                                            isOpen ? "rotate-180 text-primary" : "group-hover:text-white"
                                        )}
                                    />
                                </button>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 pb-6 pt-2 text-gray-400 leading-relaxed border-t border-white/5 mx-6">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
