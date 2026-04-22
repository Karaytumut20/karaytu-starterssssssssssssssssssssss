<template>
  <div
    class="layout-wrapper relative w-full h-[100dvh] overflow-hidden bg-light"
  >
    <Navbar />

    <div
      class="fixed bottom-0 left-0 w-full h-[100vh] bg-light translate-y-full pointer-events-none"
      aria-hidden="true"
    ></div>

    <main
      id="lenis-scroll-container"
      class="absolute inset-0 w-full h-full overflow-y-auto page-content overscroll-none pt-safe-top pb-safe-bottom pl-safe-left pr-safe-right lenis"
    >
      <div id="lenis-content-wrapper" class="w-full min-h-full bg-light flex flex-col">
        <div class="flex-grow flex flex-col w-full">
          <slot />
        </div>
        <Footer class="mt-auto" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Minimal kurgu.
</script>

<style scoped>
/* Stacking Context temizliği korundu */
</style>
