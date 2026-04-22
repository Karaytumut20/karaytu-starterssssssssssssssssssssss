<template>
  <div
    v-if="!isAnimFinished && !store.isBot"
    ref="preloaderWrapper"
    class="pointer-events-auto fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-dark"
    aria-hidden="true"
    role="presentation"
  >
    <div
      ref="logoContainer"
      class="fixed inset-0 z-[1000] flex items-center justify-center text-center w-[100vw] h-[100dvh] leading-[0.8] lowercase whitespace-nowrap text-gold pointer-events-none"
    >
      <div class="flex items-center gap-[0.03em]">
        <div class="overflow-hidden pb-1 -mb-1 flex">
          <span
            v-for="(letter, index) in brandName[0]"
            :key="'part1_' + index"
            class="reveal-letter inline-block font-serif tracking-[0.05em] font-medium text-[max(2.5rem,7vw)] xl:text-[7vw]"
          >
            {{ letter }}
          </span>
        </div>
        <div class="overflow-hidden pb-1 -mb-1 flex ml-2 md:ml-4">
          <span
            v-for="(letter, index) in brandName[1]"
            :key="'part2_' + index"
            class="reveal-letter inline-block font-serif tracking-[0.05em] font-medium text-[max(2.5rem,7vw)] xl:text-[7vw]"
          >
            {{ letter }}
          </span>
        </div>
      </div>
      <div class="absolute bottom-[40vh] left-1/2 -translate-x-1/2 overflow-hidden flex flex-col items-center">
        <div class="reveal-collection overflow-hidden mb-2">
          <span class="font-sans text-xs uppercase tracking-[0.4em] font-medium opacity-70 block">
            Boğaz'ın İncisi
          </span>
        </div>
        <div class="reveal-collection overflow-hidden">
          <span class="font-serif text-sm italic text-white/50 block">
            Sizin İçin Şekillenen Lüks
          </span>
        </div>
      </div>
    </div>

    <div
      ref="clipWrapper"
      class="anti-jitter pointer-events-auto absolute z-10 aspect-[3/4] w-[75vw] overflow-hidden opacity-0 will-change-[width,height,transform] sm:w-[45vw] md:w-[35vw] lg:w-[24vw] 2xl:w-[20vw]"
    >
      <NuxtImg
        v-for="i in 6"
        :key="'stack-' + i"
        :src="`/images/img${i}.jpg`"
        format="webp"
        loading="lazy"
        alt="YatigoTR Yatçılık Lüks Yat Filosu"
        class="absolute inset-0 z-10 object-cover w-full h-full preloader-stack-item preloader-bg-img anti-jitter clip-bottom-zero will-change-transform"
      />

      <div
        class="absolute inset-0 z-20 w-full h-full overflow-hidden preloader-stack-item preloader-final-wrapper clip-bottom-zero"
      >
        <NuxtImg
          src="/images/img7.jpg"
          format="webp"
          preload
          fetchpriority="high"
          alt="YatigoTR Yatçılık İstanbul Boğazı Özel Yat Turu"
          class="absolute object-cover preloader-final-img anti-jitter max-w-none will-change-transform"
        />
      </div>

      <div
        ref="overlayRef"
        class="absolute inset-0 z-30 opacity-0 pointer-events-none bg-dark/40"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { gsap } from "gsap";
import { useAppStore } from "~/stores/app";

const store = useAppStore();
const preloaderWrapper = ref<HTMLElement | null>(null);
const logoContainer = ref<HTMLElement | null>(null);
const clipWrapper = ref<HTMLElement | null>(null);
const overlayRef = ref<HTMLElement | null>(null);

const brandName = ["YatigoTR ".split(""), "YATÇILIK".split("")];

const isAnimFinished = ref(false);
let tl: gsap.core.Timeline | null = null;

onMounted(async () => {
  if (!import.meta.client) return;

  document.body.style.overflow = "hidden";
  document.documentElement.classList.add("lenis-stopped");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  await document.fonts.ready;
  await nextTick();

  if (store.isBot || store.isPreloaderDone || prefersReducedMotion) {
    document.body.style.overflow = "";
    document.documentElement.classList.remove("lenis-stopped");
    isAnimFinished.value = true;
    if (!store.isPreloaderDone) store.setPreloaderDone();
    return;
  }

  if (!preloaderWrapper.value || !clipWrapper.value) return;

  gsap.set(".reveal-letter", { y: 40, autoAlpha: 0 });
  gsap.set(".reveal-collection span", { y: 40, autoAlpha: 0 });

  gsap.set(logoContainer.value, {
    top: "50%",
    left: "50%",
    xPercent: -50,
    yPercent: -50,
    autoAlpha: 1,
  });

  gsap.set(clipWrapper.value, {
    top: "50%",
    left: "50%",
    xPercent: -50,
    yPercent: -50,
    transformOrigin: "center center",
    autoAlpha: 0,
  });

  gsap.set(".preloader-final-img", {
    top: "50%",
    left: "50%",
    xPercent: -50,
    yPercent: -50,
    width: "100vw",
    height: "100dvh",
    transformOrigin: "center center",
    rotation: 0,
    scale: 1.2,
    z: 0.01,
  });

  tl = gsap.timeline({
    onComplete: () => {
      isAnimFinished.value = true;
      document.body.style.overflow = "";
      document.documentElement.classList.remove("lenis-stopped");
      store.setPreloaderDone();
    },
  });

  tl.to(".reveal-letter", {
    y: 0,
    autoAlpha: 1,
    duration: 0.8,
    stagger: 0.05,
    ease: "back.out(1.2)",
    force3D: true,
  });
  tl.to(
    ".reveal-collection span",
    {
      y: 0,
      autoAlpha: 1,
      duration: 0.65,
      ease: "power2.out",
      force3D: true,
    },
    "<0.4",
  );
  tl.to(logoContainer.value, {
    autoAlpha: 0,
    scale: 0.95,
    duration: 0.6,
    ease: "power2.inOut",
    delay: 0.6,
  });

  tl.set(clipWrapper.value, { autoAlpha: 1 });

  tl.to(".preloader-stack-item", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 1.2,
    stagger: 0.18,
    ease: "power4.inOut",
    force3D: true,
  });

  tl.addLabel("expandPhase", "+=0.35");
  tl.set(".preloader-bg-img", { autoAlpha: 0 }, "expandPhase");

  tl.to(
    clipWrapper.value,
    {
      width: "100dvh",
      height: "100vw",
      rotation: 90.001,
      aspectRatio: "auto",
      duration: 1.5,
      ease: "power3.inOut",
      force3D: true,
      z: 0.01,
    },
    "expandPhase",
  );

  tl.to(
    ".preloader-final-img",
    {
      rotation: -90.001,
      scale: 1,
      duration: 1.5,
      ease: "power3.inOut",
      force3D: true,
      z: 0.01,
    },
    "expandPhase",
  );

  tl.to(
    overlayRef.value,
    {
      opacity: 1,
      duration: 1.0,
      ease: "power2.out",
    },
    "expandPhase+=0.7",
  );

  tl.to(
    preloaderWrapper.value,
    {
      autoAlpha: 0,
      duration: 0.8,
      ease: "power2.inOut",
    },
    "expandPhase+=1.2",
  );
});

onUnmounted(() => {
  if (tl) tl.kill();
});
</script>
