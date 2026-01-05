import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film, Github, Twitter, Mail, Heart } from 'lucide-react';
import { getContainerClasses } from '../lib/layout-constants';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 md:mt-24 border-t border-white/5 bg-black/40 backdrop-blur-3xl py-12 md:py-16">
      <div className={getContainerClasses()}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-violet-600 shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
                <Film className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 tracking-tight">
                CineScope
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Tech Stack / Attribution */}
          <div className="col-span-1 md:col-span-2 lg:text-right space-y-4 flex flex-col items-start lg:items-end justify-end">
            <div className="flex items-center gap-4 text-gray-400">
              <Github className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
              <Twitter className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
              <Mail className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300">{t('footer.poweredBy')}</p>
              <p className="text-xs text-gray-500 mt-1">
                {t('footer.rights').replace('2025', currentYear)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

