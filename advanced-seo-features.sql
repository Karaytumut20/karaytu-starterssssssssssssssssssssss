-- 1. 301 Yönlendirme (Redirection) Tablosu
CREATE TABLE IF NOT EXISTS public.redirects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    old_path VARCHAR(255) UNIQUE NOT NULL,
    new_path VARCHAR(255) NOT NULL,
    status_code INTEGER DEFAULT 301,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access to redirects" ON public.redirects FOR SELECT USING (true);
CREATE POLICY "Allow public all access to redirects (temp for dashboard)" ON public.redirects FOR ALL USING (true);

-- 2. Özel İniş Sayfaları (Landing Pages) İçin Pages Tablosunu Güncelleme
ALTER TABLE public.pages ADD COLUMN IF NOT EXISTS page_type VARCHAR(50) DEFAULT 'standard';
ALTER TABLE public.pages ADD COLUMN IF NOT EXISTS landing_json JSONB DEFAULT '{}'::jsonb;

-- 3. Gelişmiş İç Linkleme İçin Blog Tablosu (Ve İlişkili Yatlar Sütunu)
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100),
    excerpt TEXT,
    content TEXT,
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    meta_title TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS related_yachts JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS related_experiences JSONB DEFAULT '[]'::jsonb;

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access to blogs" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Allow public all access to blogs (temp for dashboard)" ON public.blogs FOR ALL USING (true);
