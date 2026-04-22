import { defineNuxtPlugin } from "#app";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useAppStore } from "~/stores/app";

export default defineNuxtPlugin((nuxtApp) => {
  const store = useAppStore(nuxtApp.$pinia as any);

  // Sadece tarayıcının native scroll hatırlamasını kapatalım
  if (typeof window !== "undefined" && "scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  // BOT KONTROLÜ
  if (store.isBot) {
    return {
      provide: { lenis: null as Lenis | null },
    };
  }

  // GERÇEK KULLANICI
  gsap.registerPlugin(ScrollTrigger);

  let lenisInstance: Lenis | null = null;

  // 🔥 SENIOR FIX: Lenis motoru asenkron başlatıldığı için olası çökme (crash) senaryolarını önleyen Proxy
  const lenisProxy = new Proxy({} as unknown as Lenis, {
    get(_, prop: keyof Lenis) {
      if (!lenisInstance) {
        return (...args: any[]) => {
          if (import.meta.dev) {
            console.warn(
              `Lenis motoru henüz hazır değilken '${String(prop)}' metodu çağrıldı.`,
            );
          }
        };
      }
      const value = lenisInstance[prop];
      return typeof value === "function"
        ? (value as Function).bind(lenisInstance)
        : value;
    },
  });

  // 🔥 ÇÖZÜM: Nuxt DOM'u tamamen oluşturduktan sonra Lenis'i başlat
  nuxtApp.hook("app:mounted", () => {
    const scrollContainer = document.getElementById("lenis-scroll-container");
    // 🔥 ÇÖZÜM: Layout içindeki yeni kopmaz DOM elemanımızı yakalıyoruz
    const contentWrapper = document.getElementById("lenis-content-wrapper");

    if (scrollContainer) {
      ScrollTrigger.defaults({ scroller: scrollContainer });
    }

    lenisInstance = new Lenis({
      wrapper: scrollContainer || window, // Dış sınır (Taşmaları gizleyen alan)
      content: contentWrapper || document.documentElement, // 🔥 Gerçek kayan içerik alanı
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenisInstance.scrollTo(0, { immediate: true });

    lenisInstance.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisInstance?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  });

  return {
    provide: { lenis: lenisProxy as unknown as Lenis | null },
  };
});
