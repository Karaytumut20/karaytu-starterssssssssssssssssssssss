import { defineStore } from "pinia";
import { useNuxtApp } from "#app";
// TypeScript'in start/stop metodlarını tanıması için Lenis tipini import ediyoruz
import type Lenis from "lenis";

export const useAppStore = defineStore("app", {
  state: () => ({
    isBot: false,
    isPreloaderDone: false,
    isTransitioning: false,
    isContactOpen: false, // Contact modal durumu
    isMenuOpen: false, // Menü durumu
    pendingRoute: null as (() => void) | null, // Bekleyen sayfa geçişi hafızası
  }),
  getters: {
    isPageReady: (state) => state.isPreloaderDone && !state.isTransitioning,
  },
  actions: {
    setBotStatus(status: boolean) {
      this.isBot = status;
    },

    toggleScroll(status: boolean) {
      if (this.isBot) return;

      const nuxtApp = useNuxtApp();
      const lenis = nuxtApp.$lenis as Lenis | null;

      if (!lenis || typeof lenis.start !== "function") return;

      // Menü veya Modal açıkken arkaplan kaymasını engelle
      if (
        status &&
        !this.isContactOpen &&
        !this.isMenuOpen &&
        !this.isTransitioning
      ) {
        lenis.start();
      } else {
        lenis.stop();
      }
    },

    setPreloaderDone() {
      this.isPreloaderDone = true;
      this.toggleScroll(true);
    },

    startTransition() {
      this.isTransitioning = true;
      this.toggleScroll(false); // Geçiş başlar başlamaz scroll kilitlenir
    },

    resetScroll() {
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }

      const nuxtApp = useNuxtApp();
      const lenis = nuxtApp.$lenis as Lenis | null;

      if (lenis && !this.isBot) {
        lenis.scrollTo(0, { immediate: true });
      } else if (typeof document !== "undefined") {
        const scrollContainer = document.getElementById(
          "lenis-scroll-container",
        );
        if (scrollContainer) {
          scrollContainer.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }
      }
    },

    endTransition() {
      this.isTransitioning = false;
      this.toggleScroll(true); // Geçiş bittiğinde kilitler kalkar

      const nuxtApp = useNuxtApp();
      const lenis = nuxtApp.$lenis as Lenis | null;

      if (lenis && !this.isBot) {
        // 🔥 ÇÖZÜM: TypeScript "emit" hatasını gidermek için sadece resmi public API olan resize() metodunu kullanıyoruz.
        // DOM yerleştiğinde Lenis'in sınırları (wrapper/content) tekrar hesaplamasını sağlar.
        setTimeout(() => {
          if (typeof lenis.resize === "function") {
            lenis.resize();
          }
        }, 50);
      }
    },

    openContact() {
      this.isContactOpen = true;
      this.toggleScroll(false);
    },

    closeContact() {
      this.isContactOpen = false;
      this.toggleScroll(true);
    },

    openMenu() {
      this.isMenuOpen = true;
      this.toggleScroll(false);
    },

    closeMenu() {
      this.isMenuOpen = false;
      this.toggleScroll(true);
    },
  },
});
