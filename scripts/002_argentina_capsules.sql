-- Clear existing capsules and add Argentina-only catalog with images
DELETE FROM reviews;
DELETE FROM list_items;
DELETE FROM capsules;

-- Insert Dolce Gusto capsules available in Argentina with official images
INSERT INTO capsules (name, description, category, intensity, image_url) VALUES
  -- Espresso
  ('Espresso', 'Delicado y frutal, el clásico espresso italiano', 'Espresso', 5, 'https://www.dolce-gusto.com.ar/media/catalog/product/1/2/12423720_espresso_702x752-v2.png'),
  ('Espresso Intenso', 'Intenso y tostado, para los amantes del café fuerte', 'Espresso', 7, 'https://www.dolce-gusto.com.ar/media/catalog/product/1/2/12423708_espresso-intenso_702x752-v2_1.png'),
  ('Ristretto', 'Café corto e intenso con personalidad audaz', 'Espresso', 10, 'https://www.dolce-gusto.com.ar/media/catalog/product/1/2/12395764_ristretto_702x752-v2.png'),
  ('Espresso Decaffeinato', 'Todo el sabor del espresso sin cafeína', 'Espresso', 5, 'https://www.dolce-gusto.com.ar/media/catalog/product/1/2/12423727_espresso-decaff_702x752-v2.png'),

  -- Café Negro
  ('Lungo', 'Equilibrado y tostado, perfecto para alargar el momento', 'Café Negro', 6, 'https://www.dolce-gusto.com.ar/media/catalog/product/1/2/12423704_lungo_702x752-v2.png'),
  ('Americano', 'Aromático, delicado y dulce estilo americano', 'Café Negro', 5, 'https://www.dolce-gusto.com.ar/media/catalog/product/a/m/americano_702x752.png'),

  -- Con Leche
  ('Cortado', 'Potente y tostado, espresso cortado con leche cremosa', 'Con Leche', 8, 'https://www.dolce-gusto.com.ar/media/catalog/product/1/2/12423716_cortado_702x752-v2.png'),
  ('Cappuccino', 'Redondo y sedoso, el clásico italiano con espuma perfecta', 'Con Leche', NULL, 'https://www.dolce-gusto.com.ar/media/catalog/product/1/2/12371536_cappuccino_702x752-v2.png'),
  ('Latte Macchiato', 'Tres capas perfectas de leche, espresso y espuma', 'Con Leche', NULL, 'https://www.dolce-gusto.com.ar/media/catalog/product/1/2/12423763_latte-macchiato_702x752-v2.png'),
  ('Café con Leche', 'Suave y cremoso, el clásico de todas las mañanas', 'Con Leche', NULL, 'https://www.dolce-gusto.com.ar/media/catalog/product/c/o/con-leche_702x752.png'),
  ('Flat White', 'Café australiano con doble shot y leche aterciopelada', 'Con Leche', 7, 'https://www.dolce-gusto.com.ar/media/catalog/product/1/2/12371620_flat-white_702x752-v2.png'),

  -- Chocolate
  ('Chococino', 'Delicioso chocolate caliente con textura cremosa', 'Chocolate', NULL, 'https://www.dolce-gusto.com.ar/media/catalog/product/1/2/12423789_chococino_702x752-v2.png'),
  ('Nesquik', 'El chocolate Nesquik que amamos, ahora en cápsula', 'Chocolate', NULL, 'https://www.dolce-gusto.com.ar/media/catalog/product/1/2/12395778_nesquik_702x752-v2_1.png'),
  ('Mocha', 'La combinación perfecta de café y chocolate', 'Chocolate', NULL, 'https://www.dolce-gusto.com.ar/media/catalog/product/1/2/12423786_mocha_702x752-v2.png'),

  -- Café Frío
  ('Cappuccino Ice', 'Cappuccino frío y refrescante para el verano', 'Café Frío', NULL, 'https://www.dolce-gusto.com.ar/media/catalog/product/1/2/12424176_cappuccino-ice_702x752-v2.png'),
  ('Cold Brew', 'Café frío macerado con sabor suave y refrescante', 'Café Frío', 6, 'https://www.dolce-gusto.com.ar/media/catalog/product/c/o/cold-brew_702x752.png'),

  -- Starbucks
  ('Starbucks Caramel Macchiato', 'El clásico caramelo de Starbucks en tu casa', 'Starbucks', NULL, 'https://www.dolce-gusto.com.ar/media/catalog/product/s/b/sbux-caramel-macchiato-702x752.png'),
  ('Starbucks Cappuccino', 'Cappuccino premium al estilo Starbucks', 'Starbucks', NULL, 'https://www.dolce-gusto.com.ar/media/catalog/product/s/b/sbux-cappuccino-702x752.png'),
  ('Starbucks Latte Macchiato', 'Latte cremoso con el toque Starbucks', 'Starbucks', NULL, 'https://www.dolce-gusto.com.ar/media/catalog/product/s/b/sbux-latte-macchiato-702x752.png'),
  ('Starbucks Colombia', 'Café de origen colombiano seleccionado por Starbucks', 'Starbucks', 7, 'https://www.dolce-gusto.com.ar/media/catalog/product/s/b/sbux-colombia-702x752.png'),
  ('Starbucks House Blend', 'La mezcla signature de Starbucks', 'Starbucks', 8, 'https://www.dolce-gusto.com.ar/media/catalog/product/s/b/sbux-house-blend-702x752.png'),
  ('Starbucks Espresso Roast', 'Espresso intenso tostado al estilo Starbucks', 'Starbucks', 11, 'https://www.dolce-gusto.com.ar/media/catalog/product/s/b/sbux-espresso-roast-702x752.png')
ON CONFLICT DO NOTHING;
