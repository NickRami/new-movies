import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center text-muted-foreground hover:text-foreground"
      title={i18n.language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
    >
        <Globe className="w-5 h-5 mr-1" />
        <span className="text-sm font-medium uppercase">{i18n.language}</span>
    </button>
  );
}
