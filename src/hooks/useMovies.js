import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  fetchTrending,
  searchMovies,
  getMovieDetails,
  fetchProviders,
  fetchGenres,
  fetchMoviesByGenre,
  fetchUpcoming,
} from '../services/tmdb';

// Helper to get TMDB language code from i18next language
const getTMDBLanguage = (i18nLang) => {
  return i18nLang === 'es' ? 'es-ES' : 'en-US';
};

export function useTrendingMovies(page = 1) {
  const { i18n } = useTranslation();
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);
        setError(null);
        const language = getTMDBLanguage(i18n.language);
        const data = await fetchTrending(page, language);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [page, i18n.language]);

  return { movies, totalPages, loading, error };
}

export function useUpcomingMovies() {
  const { i18n } = useTranslation();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUpcoming() {
      try {
        setLoading(true);
        setError(null);
        const language = getTMDBLanguage(i18n.language);
        const data = await fetchUpcoming(language);
        setMovies(data.slice(0, 12));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUpcoming();
  }, [i18n.language]);

  return { movies, loading, error };
}

export function useSearchMovies(query, genreId, page = 1) {
  const { i18n } = useTranslation();
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function search() {
      // Sin query ni género: limpiar resultados
      if ((!query || query.trim() === '') && !genreId) {
        setMovies([]);
        setTotalPages(0);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const language = getTMDBLanguage(i18n.language);

        let data;
        if (genreId && (!query || query.trim() === '')) {
          // Búsqueda por género únicamente
          data = await fetchMoviesByGenre(genreId, page, language);
        } else {
          // Búsqueda por texto (ignora género si hay query)
          data = await searchMovies(query, page, language);
        }

        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    const timeoutId = setTimeout(search, 500);
    return () => clearTimeout(timeoutId);
  }, [query, genreId, page, i18n.language]);

  return { movies, totalPages, loading, error };
}

export function useMovieDetails(id) {
  const { i18n } = useTranslation();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDetails() {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const language = getTMDBLanguage(i18n.language);
        const data = await getMovieDetails(id, language);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadDetails();
  }, [id, i18n.language]);

  return { movie, loading, error };
}

/**
 * Proveedores de streaming para el carrusel de proveedores
 */
export function useProviders() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProviders() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProviders();
        // Nos quedamos con los primeros 15 proveedores más relevantes
        setProviders(data.slice(0, 15));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProviders();
  }, []);

  return { providers, loading, error };
}

/**
 * Películas agrupadas por género para la sección de categorías
 */
export function useGenreSections() {
  const { i18n } = useTranslation();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadGenresAndMovies() {
      try {
        setLoading(true);
        setError(null);
        const language = getTMDBLanguage(i18n.language);

        const genres = await fetchGenres(language);
        if (!genres || genres.length === 0) {
          setSections([]);
          return;
        }

        // Seleccionamos algunos géneros populares para mostrar
        const desiredGenreNames = i18n.language === 'es' 
          ? ['Acción', 'Comedia', 'Drama', 'Terror', 'Animación']
          : ['Action', 'Comedy', 'Drama', 'Horror', 'Animation'];
        
        const selectedGenres = genres.filter((genre) =>
          desiredGenreNames.includes(genre.name)
        );

        // Si por idioma los nombres no coinciden, tomamos los primeros 5 géneros como fallback
        const genresToUse =
          selectedGenres.length > 0 ? selectedGenres : genres.slice(0, 5);

        const moviesByGenreData = await Promise.all(
          genresToUse.map((genre) => fetchMoviesByGenre(genre.id, 1, language))
        );

        const mappedSections = genresToUse.map((genre, index) => ({
          genre,
          movies: (moviesByGenreData[index]?.results || []).slice(0, 12),
        }));

        setSections(mappedSections);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadGenresAndMovies();
  }, [i18n.language]);

  return { sections, loading, error };
}
