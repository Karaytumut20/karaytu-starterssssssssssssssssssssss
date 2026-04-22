-- 1. YACHTS-IMAGES KOVASI İÇİN YÜKLEME VE SİLME YETKİLERİ --
CREATE POLICY "Yöneticiler yat resmi yükleyebilir" 
ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'yachts-images');

CREATE POLICY "Yöneticiler yat resmi silebilir" 
ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'yachts-images');

CREATE POLICY "Yöneticiler yat resmi güncelleyebilir" 
ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'yachts-images');


-- 2. EXPERIENCES-IMAGES KOVASI İÇİN YÜKLEME VE SİLME YETKİLERİ --
CREATE POLICY "Yöneticiler deneyim resmi yükleyebilir" 
ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'experiences-images');

CREATE POLICY "Yöneticiler deneyim resmi silebilir" 
ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'experiences-images');

CREATE POLICY "Yöneticiler deneyim resmi güncelleyebilir" 
ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'experiences-images');
