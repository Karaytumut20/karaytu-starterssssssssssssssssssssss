-- Supabase Schema for SU Yatçılık

-- 1. Yachts Table
CREATE TABLE IF NOT EXISTS public.yachts (
    id UUID DEFAULT auth.uid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    capacity INTEGER NOT NULL,
    length_meters NUMERIC,
    cabins INTEGER,
    price_per_hour NUMERIC NOT NULL,
    features JSONB, -- list of features like ["WiFi", "Klima", "Ses Sistemi"]
    images JSONB, -- ["url1", "url2"]
    main_image VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Experiences (Tours) Table
CREATE TABLE IF NOT EXISTS public.experiences (
    id UUID DEFAULT auth.uid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    short_description TEXT,
    full_description TEXT,
    starting_price NUMERIC NOT NULL,
    icon_name VARCHAR(100),
    main_image VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Reservations (Bookings) Table
CREATE TABLE IF NOT EXISTS public.reservations (
    id UUID DEFAULT auth.uid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    yacht_id UUID REFERENCES public.yachts(id) ON DELETE CASCADE,
    experience_id UUID REFERENCES public.experiences(id) ON DELETE SET NULL,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    duration_hours INTEGER NOT NULL,
    guest_count INTEGER NOT NULL,
    total_price NUMERIC NOT NULL,
    prepayment_amount NUMERIC NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, cancelled, completed
    payment_status VARCHAR(50) DEFAULT 'unpaid', -- unpaid, partial, paid
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Note: Need to set up RLS policies later depending on Admin vs Public permissions.
-- Typically, public can READ yachts and experiences, but only insert to reservations.
-- Users can READ their own reservations. Admins can do full CRUD.

ALTER TABLE public.yachts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-only access to yachts" ON public.yachts FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access to experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Allow users to insert reservations" ON public.reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow users to view own reservations" ON public.reservations FOR SELECT USING (auth.uid() = user_id);

-- 4. Favorites Table
CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    yacht_id UUID REFERENCES public.yachts(id) ON DELETE CASCADE,
    experience_id UUID REFERENCES public.experiences(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow users to view own favorites" ON public.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow users to insert favorites" ON public.favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow users to delete own favorites" ON public.favorites FOR DELETE USING (auth.uid() = user_id);

-- 5. Site Settings Table (For dynamic frontend content like hero, contact details)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key_name VARCHAR(100) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Reviews Table (For Misafirlerimiz Ne Diyor section)
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    reviewer_name VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(255),
    rating NUMERIC NOT NULL DEFAULT 5.0,
    comment TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-only access to site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access to reviews" ON public.reviews FOR SELECT USING (is_active = true);
-- Admins will have full access. For now:
CREATE POLICY "Allow public all access to site_settings (temp for dashboard)" ON public.site_settings FOR ALL USING (true);
CREATE POLICY "Allow public all access to reviews (temp for dashboard)" ON public.reviews FOR ALL USING (true);


-- 7. Pages Table (For KVKK, Privacy, Terms, generic pages)
CREATE TABLE IF NOT EXISTS public.pages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access to pages" ON public.pages FOR SELECT USING (true);
CREATE POLICY "Allow public all access to pages (temp for dashboard)" ON public.pages FOR ALL USING (true);
