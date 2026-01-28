-- Agregar imágenes para nuevas cápsulas Nespresso (Cosi, Capriccio, Kazaar, Livanto, Roma)
-- Run this in tu Supabase SQL Editor DESPUÉS de 008_nespresso_capsules.sql

UPDATE capsules
SET image_url = '/capsules/cosi.png'
WHERE name = 'Nespresso Cosi';

UPDATE capsules
SET image_url = '/capsules/capriccio.png'
WHERE name = 'Nespresso Capriccio';

UPDATE capsules
SET image_url = '/capsules/kazaar.png'
WHERE name = 'Nespresso Kazaar';

UPDATE capsules
SET image_url = '/capsules/livanto.png'
WHERE name = 'Nespresso Livanto';

UPDATE capsules
SET image_url = '/capsules/roma.png'
WHERE name = 'Nespresso Roma';

