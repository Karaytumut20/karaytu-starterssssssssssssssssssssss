<template>
  <div class="rotate-device-overlay">
    <div
      class="flex flex-col items-center justify-center w-full h-full p-8 text-center pointer-events-auto text-light bg-dark"
    >
      <div class="relative flex items-center justify-center mb-8">
        <svg
          ref="phoneIcon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-12 h-12 will-change-transform opacity-90"
        >
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18" stroke-width="1.5"></line>
          <line x1="10" y1="6" x2="14" y2="6"></line>
        </svg>
      </div>

      <h2 class="mb-4 text-2xl font-light leading-tight tracking-tight md:text-3xl">
        Her detay, doğru açıyla anlam kazanır.
      </h2>
      <p class="text-xs font-medium tracking-widest uppercase opacity-50">
        En iyi deneyim için dikey kullanım önerilir
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";

const phoneIcon = ref<SVGElement | null>(null);
let ctx: gsap.Context | null = null;

onMounted(() => {
  if (!import.meta.client) return;

  // GSAP Context kullanarak memory-leak (hafıza sızıntısı) riskini sıfırlıyoruz
  ctx = gsap.context(() => {
    if (phoneIcon.value) {
      // 🔥 Sert atlamayı (Tak diye geçmeyi) önleyen Smooth Timeline Döngüsü
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

      tl.set(phoneIcon.value, { rotationZ: 90, autoAlpha: 0, scale: 0.9 })
        // 1. Yatay konumda yavaşça belirir
        .to(phoneIcon.value, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "power2.out" })
        // 2. İpeksi bir şekilde dikeye döner
        .to(phoneIcon.value, { rotationZ: 0, duration: 1.4, ease: "power4.inOut" }, "+=0.2")
        // 3. Dikey konumda biraz bekler ve sıfırlanmak üzere yavaşça silinir (Fade-out)
        .to(phoneIcon.value, { autoAlpha: 0, scale: 0.9, duration: 0.6, ease: "power2.in" }, "+=1.2");
    }
  });
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<style scoped>
.rotate-device-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  z-index: 99999; /* Preloader'dan bile üstte yer alır */
  overscroll-behavior: none;
}

/* 🔥 SENIOR MİMARİ: Sadece hedeflenen cihazları yakalayan sihirli kalkan
  - orientation: landscape -> Ekran yan çevrildiğinde
  - max-height: 600px      -> Dikey alan daraldığında (Tabletleri korur, telefonları hedefler)
  - pointer: coarse        -> Sadece dokunmatik ekranları hedefler (Masaüstü tarayıcıyı daraltanları engeller)
*/
@media (orientation: landscape) and (max-height: 600px) and (pointer: coarse) {
  .rotate-device-overlay {
    display: block;
  }
}
</style>
