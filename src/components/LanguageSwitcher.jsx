import { useTranslation } from 'react-i18next';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { cn } from '../lib/utils';

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇺🇸', tmdb: 'en-US' },
  { code: 'es', label: 'Español', flag: '🇪🇸', tmdb: 'es-ES' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = LANGUAGES.find(lang => lang.code === i18n.language) || LANGUAGES[1];

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang.code);
    // Trigger a page reload to fetch new data with the new language
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "flex items-center gap-2",
            "px-4 py-2 rounded-xl",
            "text-sm font-bold",
            "glass border-border/50",
            "text-foreground/80 hover:text-primary",
            "transition-all duration-500",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          )}
          title="Change language"
        >
          <Globe className="w-4 h-4" />
          <span className="text-xs uppercase tracking-widest">{currentLang.code}</span>
          <ChevronDown className="w-3 h-3 opacity-50" />
        </motion.button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className={cn(
          "w-56 p-2",
          "glass border-border/50 shadow-2xl rounded-2xl",
          "animate-in fade-in zoom-in-95 duration-200"
        )}
        sideOffset={12}
      >
        <div className="px-3 py-2 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 border-b border-border/30">
          Select Language
        </div>
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang)}
            className={cn(
              "cursor-pointer",
              "flex items-center justify-between gap-3",
              "px-3 py-3 rounded-xl",
              "transition-all duration-300",
              i18n.language === lang.code
                ? "bg-primary/10 text-primary font-bold"
                : "hover:bg-primary/5 hover:text-primary"
            )}
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl filter drop-shadow-sm">{lang.flag}</span>
              <span className="font-semibold tracking-tight">{lang.label}</span>
            </div>
            {i18n.language === lang.code && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center"
              >
                <Check className="w-3 h-3 text-primary" />
              </motion.div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
