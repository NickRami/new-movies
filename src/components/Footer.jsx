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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-2"
          >
            <div className="flex items-center gap-2 mb-4">
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex items-center justify-center rounded-xl bg-primary/10 p-2"
              >
                <Film className="w-5 h-5 text-primary" />
              </motion.div>
              <h3 className="text-xl font-bold tracking-tight">CineScope</h3>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md text-sm md:text-base">
              Explora las tendencias del cine, descubre nuevos estrenos y guarda tus
              películas favoritas en un solo lugar.
            </p>
            <div className="flex gap-3">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg glass-dark border border-border/50 hover:border-primary/50 hover:shadow-glow-primary transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg glass-dark border border-border/50 hover:border-primary/50 hover:shadow-glow-primary transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="mailto:contact@movies.com"
                whileHover={{ scale: 1.1, y: -3, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg glass-dark border border-border/50 hover:border-primary/50 hover:shadow-glow-primary transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Navegación */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4 text-sm tracking-wide uppercase text-muted-foreground">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.navegacion.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span>{link.label}</span>
                    <span className="h-[1px] w-0 group-hover:w-6 bg-primary transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Recursos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4 text-sm tracking-wide uppercase text-muted-foreground">
              Recursos
            </h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.recursos.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span>{link.label}</span>
                    <span className="h-[1px] w-0 group-hover:w-6 bg-primary transition-all duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Línea inferior y copy */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 pt-6 border-t border-border/60 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-muted-foreground text-xs md:text-sm text-center md:text-left">
            © {currentYear} CineScope. Todos los derechos reservados.
          </p>
         
        </motion.div>
      </div>
    </footer>
  );
}

