<template>
  <div
    v-if="isVisible"
    class="pointer-events-none fixed inset-0 z-[99999] px-[var(--page-margin)]"
  >
    <div
      class="grid w-full h-full grid-cols-6 mx-auto gap-grid-gutter md:grid-cols-14"
    >
      <div
        v-for="i in 12"
        :key="i"
        class="h-full w-full bg-[#ff0000]/10"
        :class="i > 6 ? 'hidden md:block' : 'block'"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const isVisible = ref(false);

const handleKeydown = (e: KeyboardEvent) => {
  // 🔥 GÜNCELLEME: Canlı (Production) sunucuda kullanıcının kazara ızgarayı açması engellendi.
  if (!import.meta.dev) return;

  const activeEl = document.activeElement?.tagName;
  if (activeEl === "INPUT" || activeEl === "TEXTAREA") return;

  if (e.shiftKey && (e.code === "KeyG" || e.key === "g" || e.key === "G")) {
    e.preventDefault();
    isVisible.value = !isVisible.value;
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>
