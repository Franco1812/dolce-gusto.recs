-- Crear tabla de perfiles para poder ver nombres de usuarios en reviews
-- Run this in your Supabase SQL Editor

-- 1. Crear tabla de perfiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Habilitar RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 3. Todos pueden ver los perfiles (para ver nombres en reviews)
CREATE POLICY "Anyone can view profiles" ON profiles
  FOR SELECT USING (true);

-- 4. Usuarios pueden actualizar su propio perfil
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- 5. Función para crear perfil automáticamente cuando se registra un usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Trigger para ejecutar la función cuando se crea un usuario
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. Insertar perfiles para usuarios existentes (si hay)
INSERT INTO profiles (id, name, email)
SELECT 
  id,
  COALESCE(raw_user_meta_data->>'name', split_part(email, '@', 1)),
  email
FROM auth.users
ON CONFLICT (id) DO NOTHING;
