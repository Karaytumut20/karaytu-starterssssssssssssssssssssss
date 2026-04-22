<template>
  <nav
    class="w-full fixed top-0 left-0 right-0 z-[9999] transition-all duration-500"
    :class="scrolled
      ? 'bg-[#0C2340]/98 backdrop-blur-md shadow-lg shadow-black/20'
      : 'bg-transparent'"
  >
    <div class="max-w-[1400px] mx-auto px-6 lg:px-12 h-[76px] flex items-center justify-between">

      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-3 group shrink-0">
        <div class="relative w-9 h-9">
          <svg viewBox="0 0 36 36" fill="none" class="w-full h-full">
            <path d="M4 24 C10 18 14 14 18 10 C22 14 26 18 32 24" stroke="#C8A96E" stroke-width="2" stroke-linecap="round"/>
            <path d="M2 28 H34" stroke="#C8A96E" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
            <path d="M18 10 L18 4" stroke="#C8A96E" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M18 4 L26 14" stroke="#C8A96E" stroke-width="1.5" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="flex flex-col leading-none">
          <span class="text-[17px] font-black text-white tracking-wide">YatigoTR</span>
          <span class="text-[8px] text-[#C8A96E] font-medium uppercase tracking-[0.3em]">Yat Kiralama</span>
        </div>
      </NuxtLink>

      <!-- Center Nav -->
      <div class="hidden lg:flex items-center gap-1">
        <NuxtLink
          v-for="link in navLinks" :key="link.to" :to="link.to"
          class="px-4 py-2 text-[13px] font-medium text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5"
          :exact-active-class="link.to === '/' ? 'text-white' : ''"
          :active-class="link.to !== '/' ? 'text-[#C8A96E]' : ''"
        >
          {{ link.label }}
        </NuxtLink>
      </div>

      <!-- Right -->
      <div class="hidden lg:flex items-center gap-3">
        <NuxtLink v-if="!user" to="/giris" class="text-[13px] font-medium text-white/60 hover:text-white transition-colors px-3 py-2 flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          Giriş
        </NuxtLink>
        <div v-else class="relative group">
          <NuxtLink to="/hesabim" class="flex items-center gap-1.5 text-[13px] font-medium text-white/60 hover:text-white transition-colors px-3 py-2">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            Hesabım
          </NuxtLink>
          <div class="absolute right-0 top-full mt-2 w-52 bg-[#0C2340] border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
            <NuxtLink to="/hesabim?tab=orders" class="flex items-center gap-2 px-4 py-3 text-[13px] text-white/60 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5">Rezervasyonlarım</NuxtLink>
            <NuxtLink to="/hesabim?tab=profile" class="flex items-center gap-2 px-4 py-3 text-[13px] text-white/60 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5">Profilim</NuxtLink>
            <button @click="logout" class="w-full text-left flex items-center gap-2 px-4 py-3 text-[13px] text-red-400 hover:bg-white/5 transition-colors">Çıkış Yap</button>
          </div>
        </div>
        <NuxtLink to="/rezervasyon" class="bg-[#C8A96E] text-[#0C2340] text-[13px] font-bold px-6 py-2.5 rounded-lg hover:bg-[#dbbf7e] transition-all shadow-md">
          Rezervasyon Yap
        </NuxtLink>
      </div>

      <!-- Mobile -->
      <div class="flex lg:hidden items-center gap-3">
        <NuxtLink v-if="user" to="/hesabim" class="text-white/70"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></NuxtLink>
        <NuxtLink v-else to="/giris" class="text-white/70"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></NuxtLink>
        <button @click="mobileOpen = !mobileOpen" class="text-white/80 p-1.5">
          <svg v-if="!mobileOpen" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          <svg v-else class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
    </div>

    <div v-if="mobileOpen" class="lg:hidden bg-[#0C2340]/98 backdrop-blur-md border-t border-white/5 px-6 py-4">
      <div class="flex flex-col gap-1">
        <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to" @click="mobileOpen = false" class="px-3 py-3 text-[14px] font-medium text-white/70 hover:text-white rounded-lg">{{ link.label }}</NuxtLink>
        <NuxtLink to="/rezervasyon" @click="mobileOpen = false" class="mt-3 bg-[#C8A96E] text-[#0C2340] font-bold text-[14px] px-6 py-3 rounded-lg text-center">Rezervasyon Yap</NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useSupabaseUser, useSupabaseClient, navigateTo } from '#imports';
import { ref, onMounted, onUnmounted } from 'vue';

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const scrolled = ref(false);
const mobileOpen = ref(false);

const navLinks = [
  { to: '/', label: 'Ana Sayfa' },
  { to: '/yatlarimiz', label: 'Yatlarımız' },
  { to: '/deneyimlerimiz', label: 'Deneyimler' },
  { to: '/yat-kiralama-fiyatlari', label: 'Fiyatlar' },
  { to: '/blog', label: 'Blog' },
  { to: '/hakkimizda', label: 'Hakkımızda' },
  { to: '/iletisim', label: 'İletişim' },
];

const onScroll = () => { scrolled.value = window.scrollY > 40; };
onMounted(() => window.addEventListener('scroll', onScroll));
onUnmounted(() => window.removeEventListener('scroll', onScroll));

const logout = async () => { await supabase.auth.signOut(); navigateTo('/'); };
</script>
