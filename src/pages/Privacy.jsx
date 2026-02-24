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
                        {t('privacy.title')}
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        {t('privacy.subtitle')} <br />{t('privacy.updated')} {currentYear}.
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
                            <FileText className="w-6 h-6 text-primary" /> {t('privacy.dataCollectionTitle')}
                        </h3>
                        <p className="mb-8 leading-relaxed">
                            {t('privacy.dataCollectionText')}
                        </p>

                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                            {t('privacy.cookiesTitle')}
                        </h3>
                        <p className="mb-8 leading-relaxed">
                            {t('privacy.cookiesText')}
                        </p>

                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                            {t('privacy.thirdPartiesTitle')}
                        </h3>
                        <p className="mb-8 leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/10">
                            {t('privacy.thirdPartiesText')}
                        </p>

                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                            {t('privacy.userRightsTitle')}
                        </h3>
                        <ul className="space-y-4 mb-4 list-disc pl-6">
                            <li>{t('privacy.right1')}</li>
                            <li>{t('privacy.right2')}</li>
                            <li>{t('privacy.right3')}</li>
                        </ul>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
