-- Capsules catalog table
CREATE TABLE IF NOT EXISTS capsules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  intensity INTEGER CHECK (intensity IS NULL OR (intensity >= 1 AND intensity <= 13)),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- List items (capsules to try)
CREATE TABLE IF NOT EXISTS list_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  capsule_id UUID NOT NULL REFERENCES capsules(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'tried')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(capsule_id)
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  capsule_id UUID NOT NULL REFERENCES capsules(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(capsule_id)
);

-- Disable RLS for public access (single user app)
ALTER TABLE capsules DISABLE ROW LEVEL SECURITY;
ALTER TABLE list_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE reviews DISABLE ROW LEVEL SECURITY;

-- Insert popular Dolce Gusto capsules
INSERT INTO capsules (name, description, category, intensity, image_url) VALUES
  ('Espresso Intenso', 'Un espresso con cuerpo robusto y notas tostadas intensas', 'Espresso', 9, NULL),
  ('Lungo', 'Café largo con sabor equilibrado y aroma suave', 'Lungo', 6, NULL),
  ('Cappuccino', 'Cremoso cappuccino italiano con espuma de leche perfecta', 'Con Leche', 5, NULL),
  ('Latte Macchiato', 'Tres capas perfectas de leche, espresso y espuma', 'Con Leche', 4, NULL),
  ('Americano', 'Café suave estilo americano, perfecto para cualquier momento', 'Americano', 6, NULL),
  ('Chococino', 'Delicioso chocolate caliente con textura cremosa', 'Chocolate', 3, NULL),
  ('Mocha', 'La combinación perfecta de café y chocolate', 'Con Leche', 5, NULL),
  ('Ristretto', 'Espresso corto e intenso con carácter fuerte', 'Espresso', 11, NULL),
  ('Café con Leche', 'Clásico café con leche español, suave y reconfortante', 'Con Leche', 4, NULL),
  ('Espresso', 'El clásico espresso italiano, aromático y equilibrado', 'Espresso', 7, NULL),
  ('Grande Intenso', 'Taza grande con sabor intenso y profundo', 'Grande', 9, NULL),
  ('Grande Morning Blend', 'Mezcla matutina suave para empezar el día', 'Grande', 5, NULL),
  ('Flat White', 'Café australiano con doble shot y leche sedosa', 'Con Leche', 7, NULL),
  ('Cortado', 'Espresso cortado con un toque de leche cremosa', 'Con Leche', 8, NULL),
  ('Marrakesh Style Tea', 'Té verde con menta refrescante estilo marroquí', 'Té', NULL, NULL),
  ('Chai Tea Latte', 'Té chai especiado con leche cremosa', 'Té', NULL, NULL),
  ('Nesquik', 'Chocolate Nesquik cremoso para los más pequeños', 'Chocolate', NULL, NULL),
  ('Espresso Decaffeinato', 'Todo el sabor del espresso sin cafeína', 'Espresso', 5, NULL),
  ('Absolute Origin Colombia', 'Café de origen colombiano con notas frutales', 'Origen', 8, NULL),
  ('Absolute Origin Peru', 'Café peruano con toques de chocolate y nuez', 'Origen', 7, NULL)
ON CONFLICT DO NOTHING;
