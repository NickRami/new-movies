import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film, Github, Twitter, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-background py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold text-foreground">CineScope</h3>
          <p className="text-sm text-muted-foreground">
            Movie exploration app built with modern frontend technologies.
          </p>
        </div>
        
        <div className="text-center md:text-right">
          <p className="text-sm text-muted-foreground">Powered by TMDB API</p>
          <p className="text-xs text-muted-foreground mt-1">
            © 2025 CineScope
          </p>
        </div>
      </div>
    </footer>
  );
}

