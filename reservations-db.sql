-- 1. Reservations (Bookings) Table Oluşturma
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

-- 2. Güvenlik Kurallarını (Row Level Security - RLS) Etkinleştirme
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- 3. Kurallar:
-- Herkes (public/authenticated) yeni bir rezervasyon oluşturabilsin (INSERT izinli)
CREATE PROCEDURE public.insert_rez_policy() AS $$
BEGIN
    DROP POLICY IF EXISTS "Allow users to insert reservations" ON public.reservations;
    CREATE POLICY "Allow users to insert reservations" ON public.reservations FOR INSERT WITH CHECK (true);
END;
$$ LANGUAGE plpgsql;
CALL public.insert_rez_policy();
DROP PROCEDURE public.insert_rez_policy();


-- Sadece siparişi veren kişi (veya Admin) kendi rezervasyonunu görebilsin (SELECT izinli)
CREATE PROCEDURE public.select_rez_policy() AS $$
BEGIN
    DROP POLICY IF EXISTS "Allow users to view own reservations" ON public.reservations;
    CREATE POLICY "Allow users to view own reservations" ON public.reservations FOR SELECT USING (auth.uid() = user_id);
END;
$$ LANGUAGE plpgsql;
CALL public.select_rez_policy();
DROP PROCEDURE public.select_rez_policy();

-- Not: Eklentiler Supabase Editor'e güvenle yazılabilmesi için "If Exists" mimarisiyle sarılmıştır.
