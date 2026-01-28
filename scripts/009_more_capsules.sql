-- Agregar más cápsulas de Nespresso y nuevas de Kapselmaker
-- Run this in your Supabase SQL Editor

-- 1. Más variedades de Nespresso
INSERT INTO capsules (name, description, category, intensity, image_url) VALUES
  ('Nespresso Master Origin Ethiopia', 'Café floral con notas de azahar y matices de bayas silvestres', 'Nespresso', 4, NULL),
  ('Nespresso Master Origin Colombia', 'Café afrutado y vibrante con notas de bayas rojas y vino', 'Nespresso', 6, NULL),
  ('Nespresso Master Origin Indonesia', 'Café amaderado y especiado con notas de tabaco curado', 'Nespresso', 8, NULL),
  ('Nespresso Master Origin Nicaragua', 'Café dulce y armonioso con notas de cereales dulces', 'Nespresso', 5, NULL),
  ('Nespresso Master Origin India', 'Café potente y especiado con notas de pimienta negra', 'Nespresso', 11, NULL),
  ('Nespresso Ispirazione Palermo Kazaar', 'Excepcionalmente intenso y almibarado con notas de pimienta', 'Nespresso', 12, NULL),
  ('Nespresso Ispirazione Napoli', 'El más intenso de la gama, con un cuerpo denso y notas de cacao amargo', 'Nespresso', 13, NULL),
  ('Nespresso Ispirazione Venezia', 'Equilibrado y redondo con notas de caramelo y cereales', 'Nespresso', 8, NULL),
  ('Nespresso Scuro', 'Intenso y tostado, diseñado para combinar con leche', 'Nespresso', 8, NULL),
  ('Nespresso Chiaro', 'Suave y dulce, ideal para recetas con leche tipo Cappuccino', 'Nespresso', 5, NULL);

-- 2. Variedades de Kapselmaker (Compatibles Nespresso/Dolce Gusto)
INSERT INTO capsules (name, description, category, intensity, image_url) VALUES
  ('Kapselmaker Intenso', 'Blend de granos seleccionados con tueste oscuro y cuerpo robusto', 'Kapselmaker', 10, NULL),
  ('Kapselmaker Equilibrado', 'Sabor balanceado con notas de chocolate y cereales tostados', 'Kapselmaker', 7, NULL),
  ('Kapselmaker Suave', 'Café ligero y aromático, ideal para disfrutar en cualquier momento', 'Kapselmaker', 5, NULL),
  ('Kapselmaker Ristretto', 'Extracción corta y potente con carácter fuerte y persistente', 'Kapselmaker', 11, NULL),
  ('Kapselmaker Lungo', 'Café largo con aroma delicado y cuerpo medio', 'Kapselmaker', 6, NULL),
  ('Kapselmaker Vainilla', 'Café aromatizado con notas dulces y suaves de vainilla natural', 'Kapselmaker', 6, NULL),
  ('Kapselmaker Caramelo', 'Deliciosa combinación de café con notas de caramelo tostado', 'Kapselmaker', 6, NULL),
  ('Kapselmaker Chocolate', 'Café con un toque de chocolate amargo, ideal para postres', 'Kapselmaker', 7, NULL),
  ('Kapselmaker Colombia', 'Café de origen con acidez cítrica y notas frutales', 'Kapselmaker', 6, NULL),
  ('Kapselmaker Brasil', 'Café con cuerpo denso y notas de frutos secos', 'Kapselmaker', 8, NULL);
