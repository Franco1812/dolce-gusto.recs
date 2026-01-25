-- Políticas para admin - VERSIÓN CORREGIDA
-- Run this in your Supabase SQL Editor

-- Primero eliminar las políticas anteriores de reviews
DROP POLICY IF EXISTS "Users can view own reviews" ON reviews;
DROP POLICY IF EXISTS "Admin can view all reviews" ON reviews;

-- Crear una política única que permite:
-- - Usuarios ver sus propias reviews
-- - Admin ver TODAS las reviews
CREATE POLICY "Users can view own reviews or admin sees all" ON reviews
  FOR SELECT USING (
    auth.uid() = user_id 
    OR 
    auth.jwt() ->> 'email' = 'franco.pagano66@gmail.com'
  );

-- Lo mismo para list_items
DROP POLICY IF EXISTS "Users can view own list_items" ON list_items;
DROP POLICY IF EXISTS "Admin can view all list_items" ON list_items;

CREATE POLICY "Users can view own list_items or admin sees all" ON list_items
  FOR SELECT USING (
    auth.uid() = user_id 
    OR 
    auth.jwt() ->> 'email' = 'franco.pagano66@gmail.com'
  );
