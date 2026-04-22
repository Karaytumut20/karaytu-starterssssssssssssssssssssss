-- Güvenlik sebebiyle bu kodu sadece Supabase SQL Editor üzerinden SEN çalıştırabilirsin.
-- Kendi email adresini buraya yaz ve kodu RUN et.
-- Bu sayede hesabına "admin" etiketi (metadata) atanacak ve sisteme girebileceksin.

UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
    COALESCE(raw_user_meta_data, '{}'::jsonb), 
    '{role}', 
    '"admin"'
)
WHERE email = 'SENIN_MEVCUT_EMAIL_ADRESIN@gmail.com';
