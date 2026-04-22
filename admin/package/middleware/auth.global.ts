export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()
  
  // SSR kapalı olduğunda bazen user.value senkronizasyonu gecikebilir
  // Güvenlik için gerçek session'ı kontrol edelim
  const { data } = await supabase.auth.getSession()
  const activeUser = user.value || data?.session?.user

  // Eğer kullanıcı giriş sayfasına gidiyorsa veya API rotalarına erişiyorsa izin ver
  if (to.path === '/auth/login' || to.path === '/error') {
    // Eğer giriş yapmışsa auth sayfasına gitmesin, dashboard'a dönsün (rol kontrolü kapalı)
    if (activeUser) {
      console.log("Middleware: Kullanıcı login'den dashboard'a yönlendiriliyor");
      return navigateTo('/')
    }
    return
  }

  // Giriş yapmamış kullanıcıyı logine at
  if (!activeUser) {
    console.warn("Middleware: Oturum bulunamadı, logine atılıyor. Hedef:", to.path);
    return navigateTo('/auth/login')
  }

  // Role kontrolü kaldırıldığından giriş yapan herkes geçebilir.
})
