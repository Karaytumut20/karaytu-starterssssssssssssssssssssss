import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
  scrollBehavior() {
    // ÇÖZÜM: Scroll pozisyonu yönetimini tamamen Lenis ve Pinia (app.ts) üzerine aldık.
    // Vue Router'ın yerel kaydırma motorunu devre dışı bırakarak (false döndürerek),
    // sayfa geçişlerindeki "çift taraflı müdahale", "titreme" ve "kilitlenme" (jank) sorunlarını engelliyoruz.
    return false;
  },
};
