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
        "min": "min",
        "tagline": "Premium Entertainment"
      },
      "hero": {
        "featured": "Featured",
        "viewDetails": "View Details",
        "addToFavorites": "Add to Favorites",
        "removeFromFavorites": "Remove from Favorites",
        "nextUp": "Next Up",
        "added": "Added",
        "myList": "My List",
        "match": "Match"
      },
      "search": {
        "placeholder": "Search movies, genres or actors...",
        "noResults": "No movies found",
        "noResultsFor": "No results found for",
        "adjustSearch": "Try adjusting your search or category",
        "searching": "Searching...",
        "viewAllResults": "View all results",
        "resultsLabel": "Search Results",
        "genreLabel": "Genre Explorer",
        "discoverTitle": "Discover Movies",
        "discoverDesc": "Enter a movie title or select a genre to explore our entire collection."
      },
      "home": {
        "trendingTitle": "Trending Movies",
        "trendingSubtitle": "Most popular movies this week"
      },
      "series": {
        "title": "Featured Series",
        "subtitle": "Explore the most acclaimed and watched TV series of the week. Dive into unforgettable marathons."
      },
      "nav": {
        "home": "Home",
        "series": "Series",
        "favorites": "Favorites",
        "genres": "Genres",
        "genresMenuTitle": "Explore by Genre",
        "genresMenuSubtitle": "Discover movies by category",
        "login": "Login",
        "register": "Register",
        "logout": "Logout",
        "myFavorites": "My Favorites",
        "viewAllGenres": "View all genres"
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
        "rating": "Rating",
        "duration": "Duration",
        "release": "Release",
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
      "auth": {
        "welcomeBack": "Welcome Back",
        "enterCredentials": "Enter your credentials to continue",
        "createAccount": "Create Account",
        "joinCommunity": "Join our community of movie lovers",
        "nickname": "Nickname",
        "email": "Email",
        "password": "Password",
        "confirmPassword": "Confirm Password",
        "rememberMe": "Remember me",
        "forgotPassword": "Forgot password?",
        "signIn": "Sign In",
        "signUp": "Sign Up",
        "signingIn": "Signing in...",
        "signingUp": "Signing up...",
        "noAccount": "Don't have an account?",
        "hasAccount": "Already have an account?",
        "back": "Back"
      },
      "favorites": {
        "title": "My Favorites",
        "empty": "No movies here yet",
        "emptySubtitle": "Start adding movies by clicking the heart icon on any poster.",
        "count": "You have {{count}}",
        "movie": "favorite movie",
        "movies": "favorite movies"
      },
      "footer": {
        "description": "Movie exploration app built with modern frontend technologies.",
        "poweredBy": "Powered by TMDB API",
        "rights": "© 2025 CineScope. All rights reserved.",
        "platform": "Platform",
        "movies": "Movies",
        "collections": "Collections",
        "support": "Support",
        "faq": "FAQ",
        "contact": "Contact",
        "privacy": "Privacy",
        "connect": "Connect"
      },
      "collections": {
        "title": "Collections",
        "subtitle": "We are curating immersive lists by directors, franchises, and extended universes for your next big adventure (Update V2).",
        "comingSoon": "Coming Soon",
        "explore": "Back to Explore",
        "marvelTitle": "Marvel Universe",
        "marvelDesc": "The entire MCU in chronological order so you don't miss a single cameo or post-credits scene.",
        "epicTitle": "Epic Sagas",
        "epicDesc": "Harry Potter, Lord of the Rings, The Matrix. Ready for your weekend marathons.",
        "mastersTitle": "Masterpieces",
        "mastersDesc": "Cult directors compiled in one place: Nolan, Spielberg, Tarantino, and more."
      },
      "faq": {
        "title": "Frequently Asked Questions",
        "subtitle": "Everything you need to know about the product and billing, answered quickly and transparently by our knowledge base.",
        "q1": "What is CineScope?",
        "a1": "CineScope is a premium movie and series recommendation platform that uses cutting-edge algorithms to bring you content strictly based on your personal taste and global popularity metrics.",
        "q2": "Do you have every movie and series in the world?",
        "a2": "We do not host pirated content. We provide all the metadata, trailers, and streaming providers thanks to The Movie Database (TMDB). It works as your hub to decide which streaming app to open today.",
        "q3": "Is the platform free to use?",
        "a3": "The AI recommendation features, lists, and account creation for Favorites are 100% free. Our goal is to conquer the concept of \"Content Discovery\" without asking for your credit card.",
        "q4": "How do the AI suggestions work?",
        "a4": "Our engine analyzes genre variables, similar user interactions, and global box office trends. In the future, we plan to incorporate foundational models directly so you can chat with your recommendations."
      },
      "contact": {
        "title": "Let's Talk",
        "subtitle": "Our communication channels are open. Send us your technical questions, feedback, or business proposals.",
        "sentTitle": "Message Sent",
        "sentMessage": "Thank you for reaching out. Our team will get back to you shortly.",
        "name": "Name",
        "namePlaceholder": "Your name",
        "email": "Email",
        "emailPlaceholder": "you@email.com",
        "subject": "Subject",
        "subjectPlaceholder": "How can we help you?",
        "message": "Message",
        "messagePlaceholder": "Write your message here...",
        "processing": "Processing...",
        "submit": "Send Message"
      },
      "privacy": {
        "title": "Privacy & Legal",
        "subtitle": "Your data is shielded by our transparency and security policy.",
        "updated": "Updated in",
        "dataCollectionTitle": "Data Collection",
        "dataCollectionText": "At CineScope, we collect general statistical information related to searches and web interactions entirely anonymously. Using endpoints from The Movie Database (TMDB), the queried info is processed exclusively to train and refine your recommendation feed in future sessions. We do not store plain text emails or sell user profiles.",
        "cookiesTitle": "Cookies & Local Storage",
        "cookiesText": "We exclusively use Local Storage or strictly technical cookies necessary for the proper functioning of your account, authentication (login/registration), and global context persistence (movies you add to your Favorites).",
        "thirdPartiesTitle": "Third Parties & Platforms",
        "thirdPartiesText": "Any movie poster, logo, or audiovisual work displayed is the intellectual property and copyright of their respective authors, studios, and conglomerates (TMDB). CineScope is a visual explorer (frontend) fed by the global catalog for research, educational, and content discovery purposes.",
        "userRightsTitle": "User Rights",
        "right1": "Right to rectify your registered data.",
        "right2": "Right to instantaneous and permanent deletion of your favorites history (account).",
        "right3": "Right to opt-out of mailing or promotional campaigns."
      },
      "errors": {
        "general": "Something went wrong while loading movies.",
        "connection": "Please check your internet connection or try again later.",
        "pageNotFound": "Page Not Found",
        "pageNotFoundDesc": "Sorry, the page you are looking for doesn't exist or has been moved to another dimension.",
        "goHome": "Go Home",
        "goBack": "Go Back"
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
        "min": "min",
        "tagline": "Entretenimiento Premium"
      },
      "hero": {
        "featured": "Destacado",
        "viewDetails": "Ver Detalles",
        "addToFavorites": "Añadir a Favoritos",
        "removeFromFavorites": "Quitar de Favoritos",
        "nextUp": "A continuación",
        "added": "Añadido",
        "myList": "Mi Lista",
        "match": "Coincidencia"
      },
      "search": {
        "placeholder": "Buscar películas, géneros o actores...",
        "noResults": "No se encontraron películas",
        "noResultsFor": "No se encontraron resultados para",
        "adjustSearch": "Intenta ajustar tu búsqueda o categoría",
        "searching": "Buscando...",
        "viewAllResults": "Ver todos los resultados",
        "resultsLabel": "Resultados de Búsqueda",
        "genreLabel": "Explorador de Géneros",
        "discoverTitle": "Descubre Películas",
        "discoverDesc": "Ingresa el título de una película o selecciona un género para explorar nuestra colección completa."
      },
      "home": {
        "trendingTitle": "Películas en Tendencia",
        "trendingSubtitle": "Las más populares de la semana"
      },
      "series": {
        "title": "Series Destacadas",
        "subtitle": "Explora las series de televisión más aclamadas y vistas de la semana. Sumérgete en maratones inolvidables."
      },
      "nav": {
        "home": "Inicio",
        "series": "Series",
        "favorites": "Favoritos",
        "genres": "Géneros",
        "genresMenuTitle": "Explorar por Género",
        "genresMenuSubtitle": "Descubre películas por categoría",
        "login": "Iniciar Sesión",
        "register": "Registrarse",
        "logout": "Cerrar sesión",
        "myFavorites": "Mis Favoritos",
        "viewAllGenres": "Ver todos los géneros"
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
        "rating": "Puntuación",
        "duration": "Duración",
        "release": "Estreno",
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
      "auth": {
        "welcomeBack": "Bienvenido de nuevo",
        "enterCredentials": "Ingresa tus credenciales para continuar",
        "createAccount": "Crear Cuenta",
        "joinCommunity": "Únete a nuestra comunidad de cinéfilos",
        "nickname": "Apodo",
        "email": "Correo electrónico",
        "password": "Contraseña",
        "confirmPassword": "Confirmar Contraseña",
        "rememberMe": "Recuérdame",
        "forgotPassword": "¿Olvidaste tu contraseña?",
        "signIn": "Iniciar Sesión",
        "signUp": "Registrarse",
        "signingIn": "Iniciando...",
        "signingUp": "Registrando...",
        "noAccount": "¿No tienes una cuenta?",
        "hasAccount": "¿Ya tienes una cuenta?",
        "back": "Atrás"
      },
      "favorites": {
        "title": "Mis Favoritos",
        "empty": "No hay películas aquí todavía",
        "emptySubtitle": "Comienza a agregar películas haciendo clic en el icono del corazón en cualquier póster.",
        "count": "Tienes {{count}}",
        "movie": "película favorita",
        "movies": "películas favoritas"
      },
      "footer": {
        "description": "Aplicación de exploración de películas construida con tecnologías modernas.",
        "poweredBy": "Desarrollado con TMDB API",
        "rights": "© 2025 CineScope. Todos los derechos reservados.",
        "platform": "Plataforma",
        "movies": "Películas",
        "collections": "Colecciones",
        "support": "Soporte",
        "faq": "FAQ",
        "contact": "Contacto",
        "privacy": "Privacidad",
        "connect": "Conecta"
      },
      "collections": {
        "title": "Colecciones",
        "subtitle": "Estamos curando listas inmersivas por directores, franquicias y mundos extendidos para tu próxima gran aventura (Update V2).",
        "comingSoon": "Próximamente",
        "explore": "Volver a Explorar",
        "marvelTitle": "Universo Marvel",
        "marvelDesc": "Todo el MCU ordenado cronológicamente para que no pierdas ningún cameo o post-crédito.",
        "epicTitle": "Sagas Épicas",
        "epicDesc": "Harry Potter, El Señor de los Anillos, Matrix. Listos para tus maratones del fin de semana.",
        "mastersTitle": "Obras Maestras",
        "mastersDesc": "Directores de culto compilados en un solo lugar: Nolan, Spielberg, Tarantino y más."
      },
      "faq": {
        "title": "Preguntas Frecuentes",
        "subtitle": "Todo lo que necesitas saber sobre el producto y la facturación, respondido de forma ágil y transparente por nuestra base de conocimiento.",
        "q1": "¿Qué es CineScope?",
        "a1": "CineScope es una plataforma premium de recomendaciones y descubrimiento de películas y series que utiliza algoritmos de vanguardia para acercarte contenido basado estrictamente en tus gustos personales y métricas de popularidad global.",
        "q2": "¿Tienen todas las películas y series del mundo?",
        "a2": "No almacenamos contenido pirateado. Proporcionamos toda la metadata, trailers y dónde ver (Providers) gracias a The Movie Database (TMDB). Funciona como tu centro neurálgico para decidir qué plataforma de streaming debes abrir hoy.",
        "q3": "¿Es gratuito utilizar esta plataforma?",
        "a3": "Las funcionalidades de IA de recomendación, listados y creación de cuentas para guardar Favoritos son 100% gratuitas. Nuestro objetivo es dominar el concepto de \"Descubrimiento de Contenido\" sin pedirte tarjeta de crédito.",
        "q4": "¿Cómo calculan las sugerencias de la IA?",
        "a4": "Nuestro motor analiza las variables de géneros, interacciones de usuarios similares y tendencias de taquilla mundial. En el futuro planeamos incorporar modelos fundacionales directos para que chatees con las recomendaciones."
      },
      "contact": {
        "title": "Hablemos",
        "subtitle": "Nuestros canales de comunicación están abiertos. Envíanos tu consulta técnica, feedback o propuesta comercial.",
        "sentTitle": "Mensaje Enviado",
        "sentMessage": "Gracias por contactarte. Nuestro equipo te responderá en breve.",
        "name": "Nombre",
        "namePlaceholder": "Tu nombre",
        "email": "Correo Electrónico",
        "emailPlaceholder": "tu@email.com",
        "subject": "Asunto",
        "subjectPlaceholder": "¿En qué te podemos ayudar?",
        "message": "Mensaje",
        "messagePlaceholder": "Escribe tu mensaje aquí...",
        "processing": "Procesando...",
        "submit": "Enviar Mensaje"
      },
      "privacy": {
        "title": "Privacidad & Legal",
        "subtitle": "Tus datos blindados por nuestra política de transparencia y seguridad.",
        "updated": "Actualizado en",
        "dataCollectionTitle": "Recopilación de Datos",
        "dataCollectionText": "En CineScope recopilamos información estadística general relacionada con las búsquedas e interacciones en la web, de forma enteramente anónima. Utilizando los endpoints de The Movie Database (TMDB), la información consultada se procesa exclusivamente para entrenar y mejorar tu flujo de recomendaciones en sesiones futuras. No guardamos correos en texto plano ni vendemos perfiles de usuario.",
        "cookiesTitle": "Uso de Cookies y Almacenamiento Local",
        "cookiesText": "Hacemos uso exclusivo del Local Storage o cookies técnicas estrictamente necesarias para el correcto funcionamiento de tu cuenta, autenticación (login/registro) y persistencia del contexto global (películas que agregas a tus Favoritos).",
        "thirdPartiesTitle": "Terceros y Plataformas",
        "thirdPartiesText": "Toda carátula de película, logo u obra audiovisual exhibida es propiedad intelectual y copyright de sus correspondientes autores, productoras y conglomerados (TMDB). CineScope es un explorador visual (front-end) que se nutre del catálogo documental global bajo fines investigativos, educativos y de descubrimiento de contenido.",
        "userRightsTitle": "Derechos del Usuario",
        "right1": "Derecho a rectificar tus datos registrados.",
        "right2": "Derecho al borrado instantáneo y permanente de tu historial de favoritos (cuenta).",
        "right3": "Derecho a la exclusión de campañas de mailing o promoción."
      },
      "errors": {
        "general": "Algo salió mal al cargar las películas.",
        "connection": "Por favor revisa tu conexión a internet o intenta más tarde.",
        "pageNotFound": "Página no Encontrada",
        "pageNotFoundDesc": "Lo sentimos, la página que buscas no existe o ha sido movida a otra dimensión.",
        "goHome": "Ir al Inicio",
        "goBack": "Volver Atrás"
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
