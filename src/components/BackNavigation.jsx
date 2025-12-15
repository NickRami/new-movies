import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';

export default function BackNavigation({ className, label = "Volver" }) {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.05, x: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(-1)}
      className={cn(
        "group flex items-center gap-2 px-4 py-2 rounded-full",
        "bg-background/20 backdrop-blur-md border border-white/10",
        "hover:bg-primary/20 hover:border-primary/50",
        "transition-all duration-300 shadow-lg hover:shadow-primary/20",
        "text-foreground/80 hover:text-white z-50",
        className
      )}
    >
      <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
      <span className="font-medium text-sm tracking-wide">{label}</span>
    </motion.button>
  );
}
