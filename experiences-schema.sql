-- Eğer içi boşsa tabloyu baştan yaratmak daha sağlıklıdır (DİKKAT: Veriniz varsa silinir)
DROP TABLE IF EXISTS public.experiences;

-- Experiences (Deneyimler) tablosu oluşturuluyor
CREATE TABLE public.experiences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT,
    full_description TEXT,
    starting_price NUMERIC DEFAULT 0,
    main_image TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Tablo Güvenliği) Ayarları
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

-- Herkes deneyimleri okuyabilir (Select)
CREATE POLICY "Enable read access for all users" ON public.experiences
    FOR SELECT USING (true);

-- API veya Admin panelinden veri eklenebilmesi için (Ekle/Güncelle/Sil) yetki veriyoruz
-- Not: Normal bir projede anonim kullanıcılara yetki verilmez, 
-- ancak projenizin development aşamasında takılmamanız için tam yetki ayarlanmıştır.
CREATE POLICY "Enable all actions for authenticated users" ON public.experiences
    FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
