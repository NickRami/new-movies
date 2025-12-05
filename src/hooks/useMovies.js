import { useState, useEffect } from 'react';
import {
  fetchTrending,
  searchMovies,
  getMovieDetails,
  fetchProviders,
  fetchGenres,
  fetchMoviesByGenre,
  fetchUpcoming,
} from '../services/tmdb';

export function useTrendingMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchTrending();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  return { movies, loading, error };
}

export function useUpcomingMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUpcoming() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchUpcoming();
        setMovies(data.slice(0, 12));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUpcoming();
  }, []);

  return { movies, loading, error };
}

export function useSearchMovies(query, genreId) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function search() {
      // Sin query ni género: limpiar resultados
      if ((!query || query.trim() === '') && !genreId) {
        setMovies([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        let data;
        if (genreId && (!query || query.trim() === '')) {
          // Búsqueda por género únicamente
          data = await fetchMoviesByGenre(genreId);
        } else {
          // Búsqueda por texto (ignora género si hay query)
          data = await searchMovies(query);
        }

        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    const timeoutId = setTimeout(search, 500);
    return () => clearTimeout(timeoutId);
  }, [query, genreId]);

  return { movies, loading, error };
}

export function useMovieDetails(id) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDetails() {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadDetails();
  }, [id]);

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
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadGenresAndMovies() {
      try {
        setLoading(true);
        setError(null);

        const genres = await fetchGenres();
        if (!genres || genres.length === 0) {
          setSections([]);
          return;
        }

        // Seleccionamos algunos géneros populares para mostrar
        const desiredGenreNames = ['Acción', 'Comedia', 'Drama', 'Terror', 'Animación'];
        const selectedGenres = genres.filter((genre) =>
          desiredGenreNames.includes(genre.name)
        );

        // Si por idioma los nombres no coinciden, tomamos los primeros 5 géneros como fallback
        const genresToUse =
          selectedGenres.length > 0 ? selectedGenres : genres.slice(0, 5);

        const moviesByGenre = await Promise.all(
          genresToUse.map((genre) => fetchMoviesByGenre(genre.id))
        );

        const mappedSections = genresToUse.map((genre, index) => ({
          genre,
          movies: (moviesByGenre[index] || []).slice(0, 12),
        }));

        setSections(mappedSections);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadGenresAndMovies();
  }, []);

  return { sections, loading, error };
}

