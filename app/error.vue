<template>
  <div
    ref="errorRoot"
    class="min-h-screen opacity-0 relative overflow-hidden flex items-center justify-center bg-[#0a1118]"
  >
    <!-- Premium Background Gradient -->
    <div class="absolute inset-0 bg-gradient-to-b from-[#0a1118] via-[#112135] to-[#0a1118] opacity-90 z-0"></div>
    <div class="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#d97706] blur-[150px] rounded-full opacity-10 z-0"></div>
    <div class="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#1e5687] blur-[150px] rounded-full opacity-20 z-0"></div>

    <main class="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
      <!-- Icon/Illustration based on error type -->
      <div class="mb-8 flex justify-center">
        <div class="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm shadow-[0_0_50px_rgba(255,255,255,0.05)]">
          <svg v-if="statusCode === 404" class="w-10 h-10 text-[#d97706]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg v-else class="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      </div>

      <h1 class="mb-2 font-black tracking-tighter text-[100px] md:text-[140px] leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 drop-shadow-sm">
        {{ statusCode }}
      </h1>
      
      <h2 class="text-2xl md:text-4xl font-bold text-white mb-4 tracking-tight">
        {{ errorTitle }}
      </h2>

      <p class="mb-10 text-lg font-medium md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
        {{ errorDescription }}
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          @click="handleError"
          class="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-[#0a1118] font-bold tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          <span class="relative z-10 flex items-center gap-2">
            <svg class="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Ana Sayfaya Dön
          </span>
        </button>
        
        <a
          href="/iletisim"
          class="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-bold tracking-wide rounded-full border border-white/20 transition-all duration-300 hover:bg-white/5 hover:border-white/40"
        >
          İletişime Geç
        </a>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { NuxtError } from "#app";
import { clearError } from "#app";
import { gsap } from "gsap";

const props = defineProps({
  error: Object as () => NuxtError,
});

const errorRoot = ref<HTMLElement | null>(null);

const statusCode = computed(() => {
  return props.error?.statusCode || 500;
});

const errorTitle = computed(() => {
  if (statusCode.value === 404) return "Aradığınız Rota Bulunamadı";
  return "Beklenmeyen Bir Hata Oluştu";
});

const errorDescription = computed(() => {
  if (statusCode.value === 404) {
    return "Erişmeye çalıştığınız sayfa silinmiş, adresi değişmiş veya hiç var olmamış olabilir. Lütfen URL'yi kontrol edin veya ana sayfaya dönerek sitemizi keşfetmeye devam edin.";
  }
  return "Sistemimizde anlık bir teknik sorun yaşandı. Ekiplerimiz bilgilendirildi ve en kısa sürede çözülecektir. Lütfen daha sonra tekrar deneyin.";
});

useSeoMeta({
  title: () => `${statusCode.value} - ${errorTitle.value}`,
  robots: "noindex, nofollow",
});

onMounted(() => {
  gsap.to(errorRoot.value, { opacity: 1, duration: 0.8, ease: "power2.out" });
});

const handleError = () => {
  gsap.to(errorRoot.value, {
    opacity: 0,
    duration: 0.4,
    ease: "power2.inOut",
    onComplete: () => {
      void clearError({ redirect: "/" });
    },
  });
};
</script>
