<template>
  <div class="font-sans bg-white text-[#1C2B3A] min-h-screen overflow-x-hidden">

    <!-- Hero -->
    <section class="relative min-h-[65vh] flex items-end overflow-hidden">
      <div class="absolute inset-0">
        <img src="/images/marine_hero_bg.png" alt="Deneyimler" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-r from-[#0C2340]/90 via-[#0C2340]/60 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#0C2340]/80 via-transparent to-transparent"></div>
      </div>
      <div class="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-20 pt-40 w-full">
        <div class="max-w-2xl">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-6 h-px bg-[#C8A96E]"></div>
            <span class="text-[#C8A96E] text-[11px] font-semibold uppercase tracking-[0.3em]">Özel Deneyimler</span>
          </div>
          <h1 class="text-white text-[52px] md:text-[72px] font-bold leading-[1.0] tracking-[-0.03em] mb-6">Unutulmaz<br><span class="text-[#C8A96E]">Anlar</span></h1>
          <p class="text-white/60 text-[17px] font-light leading-relaxed max-w-lg mb-10">Doğum günleri, evlilik teklifleri, kurumsal etkinlikler ve özel kutlamalar için İstanbul Boğazı'nda size özel organizasyonlar.</p>
          <div class="flex flex-wrap gap-4">
            <NuxtLink to="/rezervasyon" class="inline-flex items-center gap-2 bg-[#C8A96E] text-[#0C2340] font-semibold text-[14px] px-8 py-4 rounded-lg hover:bg-[#dbbf7e] transition-all shadow-lg">Rezervasyon Yap</NuxtLink>
            <a href="https://wa.me/905441014343" target="_blank" class="inline-flex items-center gap-2 border border-white/25 text-white font-medium text-[14px] px-8 py-4 rounded-lg hover:bg-white/8 transition-all">WhatsApp ile Sor</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Grid -->
    <section class="py-24 bg-white">
      <div class="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div class="text-center mb-16">
          <span class="text-[#1A7B8A] text-[11px] font-semibold uppercase tracking-[0.28em] block mb-4">Tüm Deneyimler</span>
          <h2 class="text-[40px] md:text-[52px] font-bold text-[#0C2340] leading-tight tracking-[-0.02em]">Size Özel<br>Deneyimler</h2>
          <p class="text-[#6B7A8D] mt-4 text-[15px]">En uygun deneyimi seçin ve rezervasyonunuzu yapın.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          <div v-for="exp in experiences" :key="exp.slug" class="group bg-white rounded-2xl overflow-hidden border border-[#E8E0D0] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div class="relative aspect-[16/10] overflow-hidden bg-white">
              <img :src="exp.main_image || '/images/img4.jpg'" :alt="exp.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" @error="(e) => (e.target as HTMLImageElement).src = '/images/img4.jpg'" />
              <div class="absolute top-4 left-4">
                <span class="bg-[#0C2340]/80 backdrop-blur-sm text-[#C8A96E] text-[9px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full">Deneyim</span>
              </div>
            </div>
            <div class="p-6 flex flex-col flex-1">
              <h3 class="text-[19px] font-bold text-[#0C2340] mb-3 leading-tight">{{ exp.title }}</h3>
              <p class="text-[#6B7A8D] text-[14px] leading-relaxed mb-5 flex-1 line-clamp-3">{{ exp.short_description }}</p>
              <div class="border-t border-gray-100 pt-5 flex items-center justify-between">
                <div>
                  <div class="text-[9px] text-[#6B7A8D] uppercase tracking-wider mb-1">Başlangıç Fiyatı</div>
                  <div class="text-[20px] font-bold text-[#0C2340]" v-if="exp.starting_price">₺{{ Number(exp.starting_price).toLocaleString('tr-TR') }}</div>
                  <div class="text-[16px] font-bold text-[#1A7B8A]" v-else>Fiyat Alın</div>
                </div>
                <div class="flex gap-2">
                  <NuxtLink :to="`/deneyimlerimiz/${exp.slug}`" class="h-10 px-4 border border-[#E8E0D0] text-[#0C2340] text-[13px] font-medium rounded-lg flex items-center hover:bg-gray-50 transition-colors">Detaylar</NuxtLink>
                  <NuxtLink to="/rezervasyon" class="h-10 px-4 bg-[#0C2340] text-white text-[13px] font-medium rounded-lg flex items-center hover:bg-[#1a3a5c] transition-colors">Rezervasyon</NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#0C2340] py-24">
      <div class="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div class="max-w-3xl mx-auto text-center">
          <span class="text-[#C8A96E] text-[11px] font-semibold uppercase tracking-[0.28em] block mb-6">Özel Organizasyon</span>
          <h2 class="text-[36px] md:text-[48px] font-bold text-white leading-tight mb-6">Size Özel Bir<br>Deneyim mi İstiyorsunuz?</h2>
          <p class="text-white/50 text-[16px] leading-relaxed mb-10">İhtiyaçlarınıza göre deneyimi planlamak için bize ulaşın. Uzman ekibimiz en güzel anınızı tasarlasın.</p>
          <div class="flex flex-wrap gap-4 justify-center">
            <NuxtLink to="/rezervasyon" class="bg-[#C8A96E] text-[#0C2340] font-semibold text-[14px] px-8 py-4 rounded-lg hover:bg-[#dbbf7e] transition-all">Rezervasyon Yap</NuxtLink>
            <a href="https://wa.me/905441014343" target="_blank" class="border border-white/25 text-white font-medium text-[14px] px-8 py-4 rounded-lg hover:bg-white/5 transition-all">WhatsApp</a>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { useSeoMeta, useAsyncData, useSupabaseClient } from '#imports';
import { computed } from 'vue';

definePageMeta({ layout: "custom" });

useSeoMeta({
  title: "Deneyimler | İstanbul Boğazı'nda Özel Yat Turları",
  description: "İstanbul Boğazı'nda evlenme teklifi, doğum günü, mezuniyet ve özel organizasyonlar.",
});

const supabase = useSupabaseClient();
const { data } = await useAsyncData('experiences', async () => {
  const { data: e } = await supabase.from('experiences').select('*').order('created_at', { ascending: true });
  return e || [];
});
const experiences = computed(() => data.value || []);
</script>
