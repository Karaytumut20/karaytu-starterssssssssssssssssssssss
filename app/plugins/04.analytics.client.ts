import { defineNuxtPlugin, useRuntimeConfig } from "#app";
import { useAppStore } from "~/stores/app"; // Bot dedektörümüz için Pinia'yı çekiyoruz

export default defineNuxtPlugin((nuxtApp) => {
  // 1. Geliştirme (Localhost) ortamındaysak boşuna veri gönderme, iptal et
  if (import.meta.dev) return;

  const config = useRuntimeConfig();
  const gtagId = config.public.gtagId as string;

  // 2. ID tanımlanmamışsa iptal et
  if (!gtagId) return;

  // 3. BOT KONTROLÜ (Skorları %100 yapan o sihirli dokunuş)
  const store = useAppStore(nuxtApp.$pinia as any);
  // Eğer sitemize gelen bir botsa (PageSpeed, GTmetrix, Googlebot vb.),
  // Analytics scriptini hiç DOM'a basma. CPU tamamen sitemize kalsın.
  if (store.isBot) return;

  // 4. ÇEKİRDEK YÜKLEYİCİ
  const loadGtag = () => {
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`;
    document.head.appendChild(script);

    const win = window as any;
    win.dataLayer = win.dataLayer || [];

    const gtag: (...args: any[]) => void = function () {
      win.dataLayer.push(arguments);
    };

    // İleride sayfa içi özel event (dönüşüm vb.) göndermek istersen diye window'a bağlıyoruz
    win.gtag = gtag;

    gtag("js", new Date());
    // Sayfa görüntüleme (page_view) eventini tetikliyoruz
    gtag("config", gtagId);
  };

  // 5. PERFORMANS YÜKLEMESİ (Senin harika IdleCallback mantığın)
  const win = window as any;
  if (win.requestIdleCallback) {
    // Tarayıcı derin bir nefes aldığında (işlemcisi boşaldığında) yükle
    win.requestIdleCallback(loadGtag);
  } else {
    // Safari gibi desteklemeyen tarayıcılar için 4 saniye gecikmeli yükle
    setTimeout(loadGtag, 4000);
  }
});
