import { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const { i18n } = useTranslation();
  const [tmdbLanguage, setTmdbLanguage] = useState(
    localStorage.getItem('tmdb-language') || 'es-ES'
  );

  // Sync with i18next
  useEffect(() => {
    const lang = i18n.language === 'es' ? 'es-ES' : 'en-US';
    setTmdbLanguage(lang);
    localStorage.setItem('tmdb-language', lang);
  }, [i18n.language]);

  const changeLanguage = (newLang) => {
    const i18nLang = newLang === 'es-ES' ? 'es' : 'en';
    i18n.changeLanguage(i18nLang);
    setTmdbLanguage(newLang);
    localStorage.setItem('tmdb-language', newLang);
  };

  return (
    <LanguageContext.Provider value={{ tmdbLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
