import { defineNuxtPlugin } from "#app";
import { watch } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppStore } from "~/stores/app";
import SplitText from "~/lib/gsap/SplitText.js";

export default defineNuxtPlugin((nuxtApp) => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
  let isResizing = false;
  const registeredRevealElements = new Set<any>();

  if (typeof window !== "undefined") {
    window.addEventListener(
      "resize",
      () => {
        const currentWidth = window.innerWidth;
        if (currentWidth === windowWidth) return;

        if (!isResizing) {
          isResizing = true;
          registeredRevealElements.forEach((el) => {
            if (
              el._revealSplit &&
              typeof el._revealSplit.revert === "function"
            ) {
              el._revealSplit.revert();
            }
          });
        }

        if (resizeTimeout) clearTimeout(resizeTimeout);

        resizeTimeout = setTimeout(() => {
          windowWidth = currentWidth;
          isResizing = false;

          registeredRevealElements.forEach((el) => {
            if (typeof el._reInitReveal === "function") {
              el._reInitReveal(true);
            }
          });

          ScrollTrigger.refresh();
        }, 250);
      },
      { passive: true },
    );
  }

  nuxtApp.vueApp.directive("reveal", {
    mounted(el) {
      const store = useAppStore(nuxtApp.$pinia as any);
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (store.isBot || prefersReducedMotion) {
        el.classList.remove("invisible");
        return;
      }

      el.classList.add("invisible");
      registeredRevealElements.add(el);

      const originalText = el.textContent?.trim() || "";
      if (originalText) {
        el.setAttribute("aria-label", originalText);
      }

      const initReveal = (isResize = false) => {
        const executeSplit = () => {
          el.classList.remove("invisible");
          if (!originalText) return;

          try {
            const split = new SplitText(el, {
              type: "lines",
              mask: "lines",
            });

            if (split.lines) {
              split.lines.forEach((line: HTMLElement) => {
                line.setAttribute("aria-hidden", "true");

                const parent = line.parentElement;
                if (parent) {
                  // 🔥 SENIOR FIX: Margin-Collapse hatasını önleyen, satır aralıklarını (line-height) bozmayan Kusursuz Clip-Path Kalkanı
                  parent.style.overflow = "visible";
                  parent.style.clipPath = "polygon(0% -20%, 100% -20%, 100% 115%, 0% 115%)";
                }
              });
            }

            // 🔥 SERİ VE LÜKS (SNAPPY & PREMIUM) OPTİMİZASYONU
            // Masaüstü süresi 1.25s'e çekildi, mobil ve dalgalanma (stagger) oranları bu hıza uyumlu şekilde daraltıldı.
            const isMobile = window.innerWidth < 768;
            const animDuration = isMobile ? 1.1 : 1.25;
            const animStagger = isMobile ? 0.05 : 0.07;

            gsap.set(split.lines, {
              willChange: el._isRevealed ? "auto" : "transform",
              backfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
              WebkitFontSmoothing: "antialiased",
            });

            if (el._isRevealed) {
              el._revealSplit = split;
              return;
            }

            const animation = gsap.from(split.lines, {
              yPercent: 130,
              autoRound: false,
              rotationZ: 0.001,
              rotationX: 0.001,
              z: 0.01,
              force3D: true,
              duration: animDuration,
              ease: "power3.out", // Sakin ama seri süzülme
              stagger: {
                each: animStagger,
                from: "start",
              },
              scrollTrigger: {
                trigger: el,
                scroller:
                  document.getElementById("lenis-scroll-container") || window,
                start: "top 85%",
                toggleActions: "play none none none",
              },
              onComplete: () => {
                el._isRevealed = true;
                gsap.set(split.lines, { willChange: "auto" });
              },
            });

            el._revealSplit = split;
            el._revealAnimation = animation;

            if (!isResize) {
              requestAnimationFrame(() => ScrollTrigger.refresh());
            }
          } catch (error) {
            console.error("Gürler Collection Animasyon Hatası:", error);
          }
        };

        if (isResize) {
          executeSplit();
        } else {
          el._revealTimeout = setTimeout(executeSplit, 150);
        }
      };

      el._reInitReveal = (isResize = true) => {
        if (el._revealTimeout) clearTimeout(el._revealTimeout);

        if (el._revealAnimation) {
          el._revealAnimation.scrollTrigger?.kill();
          el._revealAnimation.kill();
          delete el._revealAnimation;
        }

        initReveal(isResize);
      };

      document.fonts.ready.then(() => {
        if (store.isPageReady) {
          initReveal(false);
        } else {
          const unwatch = watch(
            () => store.isPageReady,
            (isReady) => {
              if (isReady) {
                initReveal(false);
                unwatch();
              }
            },
          );
          el._revealUnwatch = unwatch;
        }
      });
    },

    unmounted(el) {
      registeredRevealElements.delete(el);

      if (el._revealTimeout) clearTimeout(el._revealTimeout);
      if (el._revealUnwatch) el._revealUnwatch();

      if (el._revealAnimation) {
        el._revealAnimation.scrollTrigger?.kill();
        el._revealAnimation.kill();
      }

      if (el._revealSplit && typeof el._revealSplit.revert === "function") {
        el._revealSplit.revert();
      }

      delete el._revealTimeout;
      delete el._revealUnwatch;
      delete el._revealAnimation;
      delete el._revealSplit;
      delete el._reInitReveal;
      delete el._isRevealed;
    },
  });
});
