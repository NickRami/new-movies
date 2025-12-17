import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Recurso de traducciones
const resources = {
  en: {
    translation: {
      "hero": {
        "featured": "Featured",
        "viewDetails": "View Details",
        "addToFavorites": "Add to Favorites",
        "removeFromFavorites": "Remove from Favorites"
      },
      "search": {
        "placeholder": "Search movies, genres or actors..."
      },
      "home": {
        "trendingTitle": "Trending Movies",
        "trendingSubtitle": "Most popular movies this week"
      },
      "nav": {
        "home": "Home",
        "favorites": "Favorites",
        "genres": "Genres",
        "genresMenuTitle": "Explore by Genre",
        "genresMenuSubtitle": "Discover movies by category"
      },
      "favorites": {
          "title": "My Favorites",
          "empty": "No items yet"
      }
    }
  },
  es: {
    translation: {
      "hero": {
        "featured": "Destacado",
        "viewDetails": "Ver Detalles",
        "addToFavorites": "Añadir a Favoritos",
        "removeFromFavorites": "Quitar de Favoritos"
      },
      "search": {
        "placeholder": "Buscar películas, géneros o actores..."
      },
      "home": {
        "trendingTitle": "Películas en Tendencia",
        "trendingSubtitle": "Las más populares de la semana"
      },
      "nav": {
        "home": "Inicio",
        "favorites": "Favoritos",
        "genres": "Géneros",
        "genresMenuTitle": "Explorar por Género",
        "genresMenuSubtitle": "Descubre películas por categoría"
      },
      "favorites": {
          "title": "Mis Favoritos",
          "empty": "Aún no hay elementos"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
