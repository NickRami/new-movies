import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();

  // Update from server or localStorage
  const loadFavorites = async () => {
    if (user) {
      try {
        const { data, error } = await supabase
          .from('favorites')
          .select('*')
          .eq('user_id', user.id);

        if (error) throw error;

        // Use JSON parsed media_data or build mock
        if (data) {
          const parsedFavorites = data.map(row => ({
            ...row.media_data,
            id: row.media_id,
            media_type: row.media_type
          }));
          setFavorites(parsedFavorites);
        }
      } catch (err) {
        console.error("Error loading favorites from Supabase:", err);
      }
    } else {
      // Fallback to local storage for guests
      const storedFavorites = localStorage.getItem('movieFavorites');
      if (storedFavorites) {
        try {
          setFavorites(JSON.parse(storedFavorites));
        } catch (error) {
          console.error('Error al cargar favoritos:', error);
        }
      } else {
        setFavorites([]);
      }
    }
  };

  useEffect(() => {
    loadFavorites();
  }, [user]);

  // Guardar favoritos en localStorage cuando cambien, sólo para invitados
  useEffect(() => {
    if (!user) {
      localStorage.setItem('movieFavorites', JSON.stringify(favorites));
    }
  }, [favorites, user]);

  const addFavorite = async (movie) => {
    // Avoid duplicates locally first
    if (favorites.find(m => m.id === movie.id)) return;

    const mediaType = movie.media_type || (movie.first_air_date ? 'tv' : 'movie');

    if (user) {
      try {
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            media_id: movie.id,
            media_type: mediaType,
            media_data: movie, // Require media_data jsonb column
          });
        if (error) throw error;
      } catch (err) {
        console.error('Error adding favorite to Supabase:', err);
        return; // Don't add locally if server fails
      }
    }

    setFavorites(prev => [...prev, { ...movie, media_type: mediaType }]);
  };

  const removeFavorite = async (movieId) => {
    if (user) {
      try {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('media_id', movieId);
        if (error) throw error;
      } catch (err) {
        console.error('Error removing favorite from Supabase:', err);
        return; // Don't remove locally if server fails
      }
    }

    setFavorites(prev => prev.filter(m => m.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some(m => m.id === movieId);
  };

  const toggleFavorite = (movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe usarse dentro de FavoritesProvider');
  }
  return context;
}
