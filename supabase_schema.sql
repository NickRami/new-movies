-- =========================================================================
-- SUPABASE SCHEMA PARA "PELI-MOVIE"
--
-- NOTA: Supabase maneja la autenticación (registro, login, recuperar 
-- contraseña) de forma nativa a través de la API `supabase.auth`. La 
-- tabla `auth.users` se crea automáticamente, no necesitas crearla aquí.
--
-- Este script crea una tabla `profiles` vinculada a tus usuarios de Auth 
-- y genera un trigger para crear este perfil cada vez que un usuario 
-- se registre.
-- =========================================================================

-- IMPORTANTE: Eliminamos las tablas/funciones antes si ya existen para 
-- evitar errores de "relation already exists" al actualizar.
-- (Ten cuidado en producción, esto borrará datos actuales de favoritos de prueba).
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP TABLE IF EXISTS public.favorites CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- 1. Crear tabla de perfiles (Profiles)
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users NOT NULL PRIMARY KEY,
  username text UNIQUE,
  avatar_url text,
  updated_at timestamp with time zone
);

-- Configurar Row Level Security (RLS) para perfiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS
CREATE POLICY "Perfiles publicos son visibles para todos."
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Usuarios pueden actualizar su propio perfil."
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 2. Trigger para crear automáticamente un perfil tras el registro en Auth
CREATE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- =========================================================================
-- EXTRA: (Opcional) TABLA PARA FAVORITOS DE PELÍCULAS/SERIES
-- =========================================================================

CREATE TABLE public.favorites (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  media_type text NOT NULL CHECK (media_type IN ('movie', 'tv')),
  media_id integer NOT NULL,
  media_data jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, media_type, media_id)
);

ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuarios pueden ver sus propios favoritos." 
  ON public.favorites FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden agregar a sus favoritos." 
  ON public.favorites FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden eliminar de sus favoritos." 
  ON public.favorites FOR DELETE 
  USING (auth.uid() = user_id);
