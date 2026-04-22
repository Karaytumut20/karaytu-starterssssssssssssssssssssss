-- Aşama 1: Favoriler (Favorites) Tablosunun Kurulumu
-- Bu kodu kopyalayıp Supabase SQL Editor'de çalıştırınız.

CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    yacht_id UUID REFERENCES public.yachts(id) ON DELETE CASCADE,
    experience_id UUID REFERENCES public.experiences(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Bir kullanıcı aynı yatı sadece 1 kez favoriye ekleyebilir
    CONSTRAINT unique_user_yacht UNIQUE (user_id, yacht_id),
    CONSTRAINT unique_user_experience UNIQUE (user_id, experience_id),
    
    -- Favori kaydında ya yat ya da deneyim olmalıdır, ikisi birden boş olamaz
    CONSTRAINT check_favorite_type CHECK (
        (yacht_id IS NOT NULL AND experience_id IS NULL) OR 
        (yacht_id IS NULL AND experience_id IS NOT NULL)
    )
);

-- Row Level Security (RLS) İzinleri
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Kullanıcılar sadece KENDİ favorilerini görebilir
CREATE POLICY "Kullanıcılar kendi favorilerini okuyabilir" 
    ON public.favorites FOR SELECT 
    USING (auth.uid() = user_id);

-- Kullanıcılar sadece KENDİ favorilerine ekleme yapabilir
CREATE POLICY "Kullanıcılar yeni favori ekleyebilir" 
    ON public.favorites FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Kullanıcılar kendi favorilerini silebilir
CREATE POLICY "Kullanıcılar kendi favorilerini silebilir" 
    ON public.favorites FOR DELETE 
    USING (auth.uid() = user_id);
    
-- Performans için Index'ler
CREATE INDEX IF NOT EXISTS idx_favorites_user ON public.favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_yacht ON public.favorites(yacht_id);
