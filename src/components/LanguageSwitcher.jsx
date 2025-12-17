import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';
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
            "px-3 py-2 rounded-full",
            "text-sm font-medium",
            "text-muted-foreground hover:text-foreground",
            "hover:bg-white/5",
            "transition-all duration-300",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          )}
          title="Change language"
        >
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{currentLang.flag}</span>
          <span className="hidden md:inline text-xs uppercase font-bold">{currentLang.code}</span>
        </motion.button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className={cn(
          "w-48",
          "backdrop-blur-2xl bg-background/95",
          "border-white/10",
          "shadow-2xl"
        )}
        sideOffset={8}
      >
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang)}
            className={cn(
              "cursor-pointer",
              "flex items-center justify-between gap-3",
              "px-3 py-2.5",
              "transition-all duration-200",
              i18n.language === lang.code
                ? "bg-primary/10 text-primary"
                : "hover:bg-white/5"
            )}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{lang.flag}</span>
              <span className="font-medium">{lang.label}</span>
            </div>
            {i18n.language === lang.code && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <Check className="w-4 h-4 text-primary" />
              </motion.div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
