# 🎬 Proyecto Movies - TMDB

Aplicación web moderna para explorar películas usando la API de The Movie Database (TMDB).

## 🚀 Inicio Rápido

1. Instalar dependencias:
```bash
npm install
```

2. Configurar API Key:
   - Obtén tu API key de [TMDB](https://www.themoviedb.org/settings/api)
   - Agrega tu API key en el archivo `.env`:
   ```
   VITE_TMDB_API_KEY=tu_api_key_aqui
   ```

3. Ejecutar en desarrollo:
```bash
npm run dev
```

## 🛠️ Tecnologías

- React 18
- Vite
- React Router
- TailwindCSS
- TMDB API

## 📂 Estructura

```
src/
  components/    # Componentes reutilizables
  pages/         # Páginas de la aplicación
  services/      # Servicios API
  hooks/         # Custom hooks
  context/       # Context API
```

## ✨ Funcionalidades

- 🏠 Home con películas trending
- 🔍 Búsqueda en tiempo real
- 📄 Detalles de películas
- ⭐ Sistema de favoritos
- 🎬 Trailers de YouTube
- 🎭 Información del reparto

