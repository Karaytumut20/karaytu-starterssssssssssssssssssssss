import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  // Sadece sunucu (SSR) tarafında çalışacak 'kalkan' direktifimiz
  nuxtApp.vueApp.directive("reveal", {
    getSSRProps() {
      // 🔥 ÇÖZÜM: 500 Server Error ve Hydration Mismatch Hatalarını Önleyen Hayalet Kurgu
      // 1. Dosyanın varlığı, Nuxt sunucusunun "v-reveal" direktifini tanımayıp 500 hatası vermesini (çökmesini) önler.
      // 2. Boş obje ({}) döndürmemiz, DOM'a fazladan class veya data özelliği basılmasını engeller.
      // Bu sayede Vue, sunucu ile tarayıcı arasında %100 eşleşme (0 Mismatch) yakalar.
      // 3. Stilsiz görünme (FOUC) riski zaten Preloader'ın siyah ekranı sayesinde kapalıdır.
      return {};
    },
  });
});
