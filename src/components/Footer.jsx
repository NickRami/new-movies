import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film, Github, Twitter, Mail, ArrowUpRight } from 'lucide-react';
import { getContainerClasses } from '../lib/layout-constants';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-16 overflow-hidden bg-background border-t border-border/50 pt-16 md:pt-20 pb-8 md:pb-10">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -bottom-1/2 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] dark:mix-blend-screen mix-blend-plus-lighter opacity-50" />
        <div className="absolute -top-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] dark:mix-blend-screen mix-blend-plus-lighter opacity-30" />
      </div>

      <div className={cn(getContainerClasses(), "relative z-10")}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 mb-12 md:mb-16">
          {/* Main Info */}
          <div className="lg:col-span-5 space-y-8">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-violet-600 shadow-[0_0_30px_rgba(225,29,72,0.3)] group-hover:shadow-[0_0_40px_rgba(225,29,72,0.5)] transition-all duration-500">
                <Film className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-3xl font-heading font-black bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 tracking-tight">
                CineScope
              </span>
            </Link>
            <p className="text-xl text-muted-foreground max-w-md leading-relaxed font-light">
              {t('footer.description')}
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 pt-2">
            {/* Platform Links */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-foreground font-bold tracking-widest text-sm uppercase mb-2 opacity-80">{t('footer.platform')}</h4>
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center justify-between w-fit gap-2 group">
                <span className="group-hover:translate-x-1 transition-transform">{t('footer.movies')}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
              </Link>
              <Link to="/series" className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center justify-between w-fit gap-2 group">
                <span className="group-hover:translate-x-1 transition-transform">{t('nav.series')}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
              </Link>
              <Link to="/colecciones" className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center justify-between w-fit gap-2 group">
                <span className="group-hover:translate-x-1 transition-transform">{t('footer.collections')}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
              </Link>
            </div>

            {/* Support Links */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-foreground font-bold tracking-widest text-sm uppercase mb-2 opacity-80">{t('footer.support')}</h4>
              <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center justify-between w-fit gap-2 group">
                <span className="group-hover:translate-x-1 transition-transform">{t('footer.faq')}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
              </Link>
              <Link to="/contacto" className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center justify-between w-fit gap-2 group">
                <span className="group-hover:translate-x-1 transition-transform">{t('footer.contact')}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
              </Link>
              <Link to="/privacidad" className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center justify-between w-fit gap-2 group">
                <span className="group-hover:translate-x-1 transition-transform">{t('footer.privacy')}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
              </Link>
            </div>

            {/* Social Connect */}
            <div className="flex flex-col space-y-6 col-span-2 sm:col-span-1 mt-4 sm:mt-0">
              <h4 className="text-foreground font-bold tracking-widest text-sm uppercase mb-2 opacity-80">{t('footer.connect')}</h4>
              <div className="flex items-center gap-4">
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-foreground/5 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/20 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(225,29,72,0.4)] hover:-translate-y-1 transition-all">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-foreground/5 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/20 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(225,29,72,0.4)] hover:-translate-y-1 transition-all">
                  <Github className="w-4 h-4" />
                </a>
                <a href="mailto:hola@ejemplo.com" className="w-10 h-10 rounded-full bg-foreground/5 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/20 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(225,29,72,0.4)] hover:-translate-y-1 transition-all">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Massive 2026 Typography */}
        <div className="w-full flex justify-center mb-8 border-t border-border/50 pt-12 overflow-hidden flex-col items-center">
          <h2 className="text-[clamp(3rem,10vw,10rem)] leading-[0.85] font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground/12 to-transparent dark:from-foreground/8 tracking-tighter select-none pointer-events-none mb-2">
            CINESCOPE
          </h2>
        </div>

        {/* Floor */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between pt-8 border-t border-border/50 text-muted-foreground text-sm font-medium">
          <p className="text-center md:text-left">
            {t('footer.rights').replace('2025', currentYear)}
          </p>
          <p className="text-center md:text-right">
            {t('footer.poweredBy')}
          </p>
        </div>
      </div>
    </footer>
  );
}

