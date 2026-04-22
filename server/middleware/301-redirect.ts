import { serverSupabaseServiceRole } from '#supabase/server'

// Hafızada önbelleğe alma (Supabase kotalarını tüketmemek ve siteyi hızlandırmak için)
let cachedRedirects: {old_path: string, new_path: string, status_code: number}[] = []
let lastFetchTime = 0

export default defineEventHandler(async (event) => {
  // Sadece gerçek sayfa isteklerini değerlendir (Görseller, API ve statik dosyaları atla)
  if (
      event.path.startsWith('/_nuxt') || 
      event.path.startsWith('/api/') || 
      event.path.startsWith('/__') ||
      event.path.includes('.') // dosya uzantısı içeren istekleri yoksay
  ) return;

  const now = Date.now()
  // Yönlendirmeleri her 5 dakikada bir veritabanından güncelle
  if (now - lastFetchTime > 1000 * 60 * 5) { 
     try {
       const supabase = await serverSupabaseServiceRole(event)
       const { data } = await supabase
         .from('redirects')
         .select('old_path, new_path, status_code')
         .eq('is_active', true)
       if (data) {
         cachedRedirects = data
         lastFetchTime = now
       }
     } catch(e) {
       // Hata durumunda siteyi çökertme, sessizce devam et
     }
  }

  // İstek URL'i ile yönlendirme tablosunu karşılaştır
  const requestPath = event.path.split('?')[0] // Soru işaretinden sonrasını (query) yoksay
  const match = cachedRedirects.find(r => r.old_path === requestPath || r.old_path === event.path)
  
  if (match) {
    return sendRedirect(event, match.new_path, match.status_code || 301)
  }
})
