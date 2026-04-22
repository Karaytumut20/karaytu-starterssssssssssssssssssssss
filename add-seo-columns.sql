-- SEO Sütunlarını tablolara eklemek için Migration Script

-- Yachts tablosu
ALTER TABLE public.yachts ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE public.yachts ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE public.yachts ADD COLUMN IF NOT EXISTS meta_keywords TEXT;

-- Blogs tablosu (Eğer varsa, admin panelinde olduğunu görüyoruz)
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS meta_keywords TEXT;

-- Experiences tablosu
ALTER TABLE public.experiences ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE public.experiences ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE public.experiences ADD COLUMN IF NOT EXISTS meta_keywords TEXT;
ALTER TABLE public.experiences ADD COLUMN IF NOT EXISTS main_image_alt TEXT;

-- Pages tablosu (Eğer yoksa önce oluşturuyoruz)
CREATE TABLE IF NOT EXISTS public.pages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pages tablosu SEO Eklentileri
ALTER TABLE public.pages ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE public.pages ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE public.pages ADD COLUMN IF NOT EXISTS meta_keywords TEXT;

-- FAQ ve Alt tag kolonları
ALTER TABLE public.yachts ADD COLUMN IF NOT EXISTS faq JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.yachts ADD COLUMN IF NOT EXISTS main_image_alt TEXT;
ALTER TABLE public.yachts ADD COLUMN IF NOT EXISTS gallery_alts JSONB DEFAULT '[]'::jsonb;

-- Site Settings tablosuna SEO ayarlarını eklemeye gerek yok, satır olarak eklenecek (site_meta_title, vb.).
