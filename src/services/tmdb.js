const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const IMAGE_BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';
const IMAGE_LOGO_BASE_URL = 'https://image.tmdb.org/t/p/w185';

/**
 * Valida que la API key esté configurada
 */
function validateApiKey() {
  if (!API_KEY || API_KEY.trim() === '') {
    throw new Error('API Key no configurada. Por favor, agrega VITE_TMDB_API_KEY en tu archivo .env');
  }
}

/**
 * Realiza una petición a la API de TMDB
 */
async function fetchFromTMDB(endpoint) {
  try {
    validateApiKey();
    
    const separator = endpoint.includes('?') ? '&' : '?';
    const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}&language=es-ES`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    // Verificar si hay errores en la respuesta (incluso si response.ok es true)
    if (data.status_code) {
      // TMDB devuelve errores con status_code
      if (data.status_code === 7) {
        throw new Error('API Key inválida. Por favor, verifica tu VITE_TMDB_API_KEY en el archivo .env');
      }
      if (data.status_code === 401 || data.status_code === 1) {
        throw new Error('API Key no autorizada. Verifica que tu API key sea correcta.');
      }
      if (data.status_message) {
        throw new Error(`Error de TMDB: ${data.status_message}`);
      }
    }
    
    if (!response.ok) {
      // Manejar errores HTTP
      if (data.status_message) {
        throw new Error(`Error de TMDB: ${data.status_message}`);
      }
      throw new Error(`Error en la petición: ${response.status} - ${data.status_message || 'Error desconocido'}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error al obtener datos de TMDB:', error);
    throw error;
  }
}

/**
 * Obtiene las películas trending de la semana
 */
export async function fetchTrending() {
  const data = await fetchFromTMDB('/trending/movie/week');
  return data.results.map(movie => ({
    ...movie,
    poster_path: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
    backdrop_path: movie.backdrop_path ? `${IMAGE_BACKDROP_BASE_URL}${movie.backdrop_path}` : null,
  }));
}

/**
 * Busca películas por query
 */
export async function searchMovies(query) {
  if (!query || query.trim() === '') {
    return [];
  }
  
  const data = await fetchFromTMDB(`/search/movie?query=${encodeURIComponent(query)}`);
  return data.results.map(movie => ({
    ...movie,
    poster_path: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
    backdrop_path: movie.backdrop_path ? `${IMAGE_BACKDROP_BASE_URL}${movie.backdrop_path}` : null,
  }));
}

/**
 * Obtiene los detalles completos de una película
 */
export async function getMovieDetails(id) {
  const [movie, credits, videos, similar] = await Promise.all([
    fetchFromTMDB(`/movie/${id}`),
    fetchFromTMDB(`/movie/${id}/credits`),
    fetchFromTMDB(`/movie/${id}/videos`),
    fetchFromTMDB(`/movie/${id}/similar`),
  ]);

  return {
    ...movie,
    poster_path: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
    backdrop_path: movie.backdrop_path ? `${IMAGE_BACKDROP_BASE_URL}${movie.backdrop_path}` : null,
    credits: {
      cast: credits.cast.slice(0, 10).map(actor => ({
        ...actor,
        profile_path: actor.profile_path ? `${IMAGE_BASE_URL}${actor.profile_path}` : null,
      })),
      crew: credits.crew.filter(person => person.job === 'Director' || person.job === 'Producer').slice(0, 5),
    },
    videos: videos.results.filter(video => video.site === 'YouTube' && video.type === 'Trailer').slice(0, 3),
    similar: similar.results.slice(0, 6).map(movie => ({
      ...movie,
      poster_path: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
    })),
  };
}

/**
 * Obtiene la lista de proveedores de streaming de TMDB
 */
export async function fetchProviders() {
  // watch_region ES para contenido en España (puedes cambiarlo a tu región)
  const data = await fetchFromTMDB('/watch/providers/movie?watch_region=ES');

  if (!data.results) return [];

  return data.results
    .filter(provider => provider.logo_path)
    .sort((a, b) => a.display_priority - b.display_priority)
    .map(provider => ({
      ...provider,
      logo_path: provider.logo_path
        ? `${IMAGE_LOGO_BASE_URL}${provider.logo_path}`
        : null,
    }));
}

/**
 * Obtiene la lista de géneros de películas
 */
export async function fetchGenres() {
  const data = await fetchFromTMDB('/genre/movie/list');
  return data.genres || [];
}

/**
 * Obtiene películas por género
 */
export async function fetchMoviesByGenre(genreId, page = 1) {
  if (!genreId) return [];

  const data = await fetchFromTMDB(
    `/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&page=${page}`
  );

  return data.results.map(movie => ({
    ...movie,
    poster_path: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
    backdrop_path: movie.backdrop_path ? `${IMAGE_BACKDROP_BASE_URL}${movie.backdrop_path}` : null,
  }));
}


