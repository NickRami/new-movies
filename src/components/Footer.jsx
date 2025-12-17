import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film, Github, Twitter, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navegacion: [
      { label: 'Inicio', path: '/' },
      { label: 'Buscar', path: '/search' },
      { label: 'Favoritos', path: '/favorites' },
    ],
    recursos: [
      { label: 'TMDB API', href: 'https://www.themoviedb.org/' },
      { label: 'Documentación', href: 'https://developers.themoviedb.org/' },
    ],
  };

  return (
    <footer className="relative mt-auto border-t border-border bg-gradient-to-t from-background via-card to-background/80 overflow-hidden">
      {/* Barra de luz animada en el borde superior */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,rgba(239,68,68,0)_0%,rgba(239,68,68,0.8)_20%,rgba(251,191,36,0.9)_50%,rgba(59,130,246,0.8)_80%,rgba(59,130,246,0)_100%)]"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{ backgroundSize: '200% 100%' }}
      />

        <div className="container mx-auto px-4 lg:px-8 py-10 md:py-12 relative">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
            {/* Logo y descripción */}
            <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                <Film className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold tracking-tight">CineScope</h3>
                </div>
                <p className="text-muted-foreground mb-6 max-w-sm text-sm">
                Movie exploration app built with modern frontend technologies.
                Designed for optimal user experience and performance.
                </p>
                <div className="flex gap-4">
                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-2">
                        {['React', 'Vite', 'Tailwind', 'TMDB API'].map(tech => (
                             <span key={tech} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-white/60">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Navegación - Keeping it minimal */}
            <div className="col-span-1 md:col-span-2 md:justify-self-end flex flex-col md:items-end">
                <h4 className="font-semibold mb-4 text-sm tracking-wide uppercase text-muted-foreground">
                Project Links
                </h4>
                <ul className="space-y-3 text-sm md:text-right">
                <li>
                    <a href="https://github.com/NickRami" target="_blank" rel="noreferrer" className="text-foreground/80 hover:text-primary transition-colors">
                        GitHub Profile
                    </a>
                </li>
                 <li>
                    <Link to="/search" className="text-foreground/80 hover:text-primary transition-colors">
                        Search Movies
                    </Link>
                </li>
                </ul>
            </div>
            </div>

            {/* Línea inferior y copy */}
            <div className="mt-12 pt-6 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground/60 text-xs">
                © 2025 CineScope. All rights reserved.
            </p>
            <p className="text-muted-foreground/60 text-xs flex items-center gap-1">
                Built with <Heart className="w-3 h-3 text-primary/80" /> by Ramiro
            </p>
            </div>
        </div>
    </footer>
  );
}

