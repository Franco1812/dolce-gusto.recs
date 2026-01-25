-- Limpiar cápsulas anteriores y agregar las nuevas
-- Run this in your Supabase SQL Editor

-- 1. Primero eliminar reviews y list_items (por las foreign keys)
DELETE FROM reviews;
DELETE FROM list_items;

-- 2. Eliminar todas las cápsulas anteriores
DELETE FROM capsules;

-- 3. Insertar las nuevas cápsulas con las imágenes de public/capsules
INSERT INTO capsules (name, description, category, intensity, image_url) VALUES
  ('Americano', 'Café americano suave y aromático, perfecto para cualquier momento del día', 'Clásicos', 6, '/capsules/americano.avif'),
  ('Café au Lait', 'Clásico café con leche francés, cremoso y reconfortante', 'Con Leche', 4, '/capsules/cafe-au-lait.avif'),
  ('Cappuccino Starbucks', 'El icónico cappuccino de Starbucks con espuma perfecta', 'Starbucks', 6, '/capsules/capu-starbucks.avif'),
  ('Cappuccino', 'Cappuccino italiano tradicional con espuma de leche sedosa', 'Con Leche', 5, '/capsules/capuccinbo.avif'),
  ('Cappuccino Dulce de Leche', 'Cappuccino con el dulce sabor argentino del dulce de leche', 'Con Leche', 5, '/capsules/capuccino-ddl.avif'),
  ('Caramel Macchiato', 'Delicioso macchiato con notas de caramelo dulce', 'Con Leche', 5, '/capsules/caramel-macchiato.avif'),
  ('Chococino Alpine', 'Chocolate caliente con toque alpino cremoso', 'Chocolate', 3, '/capsules/chococino-alpine.png'),
  ('Chococino', 'Chocolate caliente clásico, cremoso e irresistible', 'Chocolate', 3, '/capsules/chococino-f.avif'),
  ('Chococino Galak', 'Delicioso chocolate blanco Galak cremoso', 'Chocolate', 2, '/capsules/chococino-galak.avif'),
  ('Chococino Clásico', 'El clásico chocolate caliente Dolce Gusto', 'Chocolate', 3, '/capsules/chococino.avif'),
  ('Cortado', 'Espresso cortado con un toque de leche, intenso y equilibrado', 'Espresso', 8, '/capsules/cortado.avif'),
  ('Espresso Intenso', 'Espresso con cuerpo robusto y notas tostadas profundas', 'Espresso', 9, '/capsules/expresso-intenso.avif'),
  ('Frappé', 'Café frío cremoso perfecto para días calurosos', 'Fríos', 4, '/capsules/frappe.avif'),
  ('KitKat', 'Bebida chocolatada con el inconfundible sabor de KitKat', 'Chocolate', 2, '/capsules/kitkat.avif'),
  ('Latte Macchiato', 'Tres capas perfectas de leche, espresso y espuma', 'Con Leche', 4, '/capsules/latte-machiatto.avif'),
  ('Latte Starbucks', 'El suave y cremoso latte de Starbucks', 'Starbucks', 5, '/capsules/latte-starbucks.avif'),
  ('Lungo', 'Café largo con sabor equilibrado y aroma suave', 'Clásicos', 6, '/capsules/lungo.avif'),
  ('Mocha', 'La combinación perfecta de café y chocolate', 'Con Leche', 5, '/capsules/mocha.avif');
