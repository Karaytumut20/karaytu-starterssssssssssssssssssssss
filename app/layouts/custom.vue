<template>
  <div class="relative w-full min-h-[100dvh] font-sans bg-[#f8f9fa] flex flex-col">
    <Navbar />
    <div class="flex-grow flex flex-col items-stretch w-full">
      <slot />
    </div>
    <Footer class="mt-auto" />
  </div>
</template>
