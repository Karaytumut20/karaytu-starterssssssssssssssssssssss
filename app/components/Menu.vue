<template>
  <div v-if="isVisible" class="fixed left-0 top-0 z-[10000] h-[100dvh] w-full bg-light text-dark">
    <div class="flex flex-col h-full px-[var(--page-margin)] py-[var(--page-margin)]">
      <div class="flex justify-between items-center pb-[var(--page-margin)] border-b border-dark/20">
        <h2 class="text-2xl font-light">Menü</h2>
        <button @click="closeMenu" class="text-sm font-medium uppercase tracking-widest opacity-70 hover:opacity-100">Kapat</button>
      </div>
      <div class="flex flex-col gap-6 mt-10 text-4xl font-light">
        <NuxtLink to="/" @click="closeMenu" class="hover:opacity-60 transition-opacity text-dark">Ana Sayfa</NuxtLink>
        <NuxtLink to="/yatlarimiz" @click="closeMenu" class="hover:opacity-60 transition-opacity text-dark">Yatlarımız</NuxtLink>
        <NuxtLink to="/yat-turu-organizasyon" @click="closeMenu" class="hover:opacity-60 transition-opacity text-dark">Deneyimler</NuxtLink>
        <NuxtLink to="/yat-kiralama-fiyatlari" @click="closeMenu" class="hover:opacity-60 transition-opacity text-dark">Fiyatlar</NuxtLink>
        <NuxtLink to="/blog" @click="closeMenu" class="hover:opacity-60 transition-opacity text-dark">Rehber ve Blog</NuxtLink>
        <NuxtLink to="/rezervasyon" @click="closeMenu" class="hover:opacity-60 transition-opacity text-dark">Rezervasyon</NuxtLink>
        <NuxtLink to="/hakkimizda" @click="closeMenu" class="hover:opacity-60 transition-opacity text-dark">Hakkımızda</NuxtLink>
        <NuxtLink to="/iletisim" @click="closeMenu" class="hover:opacity-60 transition-opacity text-dark">İletişim</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useAppStore } from "~/stores/app";
import { storeToRefs } from "pinia";

const store = useAppStore();
const { isMenuOpen } = storeToRefs(store);
const isVisible = ref(isMenuOpen.value);

watch(isMenuOpen, (newVal) => {
  if (newVal) {
    isVisible.value = true;
  } else {
    // Add exit animation if needed, for simplicity set false immediate
    isVisible.value = false;
  }
});

const closeMenu = () => {
  store.closeMenu();
};
</script>
