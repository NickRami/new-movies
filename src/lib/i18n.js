import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Recurso de traducciones
const resources = {
  en: {
    translation: {
      "common": {
        "loading": "Loading...",
        "error": "Error",
        "back": "Back",
        "returnHome": "Return Home",
        "noImage": "No image",
        "cast": "Cast",
        "videos": "Videos",
        "similar": "Similar Movies",
        "previous": "Previous",
        "next": "Next",
        "min": "min"
      },
      "hero": {
        "featured": "Featured",
        "viewDetails": "View Details",
        "addToFavorites": "Add to Favorites",
        "removeFromFavorites": "Remove from Favorites"
      },
      "search": {
        "placeholder": "Search movies, genres or actors...",
        "noResults": "No movies found",
        "adjustSearch": "Try adjusting your search or category"
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
        "genresMenuSubtitle": "Discover movies by category",
        "login": "Login",
        "register": "Register",
        "logout": "Logout",
        "myFavorites": "My Favorites"
      },
      "details": {
        "loading": "Loading experience...",
        "errorTitle": "Error loading movie",
        "errorMessage": "We couldn't retrieve the details for this title.",
        "tagline": "Tagline",
        "storyline": "Storyline",
        "topCast": "Top Cast",
        "trailer": "Official Trailer",
        "movieInfo": "Movie Info",
        "originalTitle": "Original Title",
        "status": "Status",
        "productionCompanies": "Production Companies",
        "budget": "Budget",
        "revenue": "Revenue",
        "watchTrailer": "Watch Trailer",
        "saved": "Saved",
        "addToList": "Add to List",
        "noPhoto": "No photo"
      },
      "movieCard": {
        "addToFavorites": "Add to favorites",
        "removeFromFavorites": "Remove from favorites",
        "noImage": "No image"
      },
      "favorites": {
          "title": "My Favorites",
          "empty": "No items yet"
      },
      "errors": {
        "general": "Something went wrong while loading movies.",
        "connection": "Please check your internet connection or try again later."
      }
    }
  },
  es: {
    translation: {
      "common": {
        "loading": "Cargando...",
        "error": "Error",
        "back": "Atrás",
        "returnHome": "Volver al Inicio",
        "noImage": "Sin imagen",
        "cast": "Reparto",
        "videos": "Videos",
        "similar": "Películas Similares",
        "previous": "Anterior",
        "next": "Siguiente",
        "min": "min"
      },
      "hero": {
        "featured": "Destacado",
        "viewDetails": "Ver Detalles",
        "addToFavorites": "Añadir a Favoritos",
        "removeFromFavorites": "Quitar de Favoritos"
      },
      "search": {
        "placeholder": "Buscar películas, géneros o actores...",
        "noResults": "No se encontraron películas",
        "adjustSearch": "Intenta ajustar tu búsqueda o categoría"
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
        "genresMenuSubtitle": "Descubre películas por categoría",
        "login": "Iniciar Sesión",
        "register": "Registrarse",
        "logout": "Cerrar sesión",
        "myFavorites": "Mis Favoritos"
      },
      "details": {
        "loading": "Cargando experiencia...",
        "errorTitle": "Error al cargar la película",
        "errorMessage": "No pudimos recuperar los detalles de este título.",
        "tagline": "Lema",
        "storyline": "Sinopsis",
        "topCast": "Reparto Principal",
        "trailer": "Tráiler Oficial",
        "movieInfo": "Info de la Película",
        "originalTitle": "Título Original",
        "status": "Estado",
        "productionCompanies": "Productoras",
        "budget": "Presupuesto",
        "revenue": "Ingresos",
        "watchTrailer": "Ver Tráiler",
        "saved": "Guardado",
        "addToList": "Añadir a Mi Lista",
        "noPhoto": "Sin foto"
      },
      "movieCard": {
        "addToFavorites": "Agregar a favoritos",
        "removeFromFavorites": "Quitar de favoritos",
        "noImage": "Sin imagen"
      },
      "favorites": {
          "title": "Mis Favoritos",
          "empty": "Aún no hay elementos"
      },
      "errors": {
        "general": "Algo salió mal al cargar las películas.",
        "connection": "Por favor revisa tu conexión a internet o intenta más tarde."
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
