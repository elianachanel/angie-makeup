-- Opcional: si el INSERT fallaba por RETURNING con RLS, el fix está en el código.
-- Verifica que existan servicios (requerido por FK):
INSERT INTO public.services (id, title, description, price, duration, image, sort_order) VALUES
  ('bridal', 'Bridal Makeup', 'Timeless, camera-ready looks tailored to your skin, dress, and wedding aesthetic.', 'From $350', '3–4 h', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80', 1),
  ('glam', 'Glam Makeup', 'Red-carpet glow with sculpted features, luminous skin, and high-impact finish.', 'From $220', '2–3 h', 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80', 2),
  ('photoshoot', 'Editorial Makeup', 'Artistry for studio, campaigns, and creative direction with HD finish.', 'From $280', '2–4 h', 'https://images.unsplash.com/photo-1631730486572-226f1a990b87?w=800&q=80', 3),
  ('event', 'Event Makeup', 'Evening elegance for galas and special occasions.', 'From $180', '2 h', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80', 4)
ON CONFLICT (id) DO NOTHING;
