<template>
  <div class="font-sans bg-white text-[#1C2B3A] min-h-screen overflow-x-hidden">

    <!-- Hero -->
    <section class="relative min-h-[55vh] flex items-end overflow-hidden">
      <div class="absolute inset-0">
        <img src="/images/marine_hero_bg.png" alt="Blog" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-r from-[#0C2340]/90 via-[#0C2340]/60 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#0C2340]/80 via-transparent to-transparent"></div>
      </div>
      <div class="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-20 pt-40 w-full">
        <div class="max-w-2xl">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-6 h-px bg-[#C8A96E]"></div>
            <span class="text-[#C8A96E] text-[11px] font-semibold uppercase tracking-[0.3em]">Blog & Rehberler</span>
          </div>
          <h1 class="text-white text-[52px] md:text-[68px] font-bold leading-[1.0] tracking-[-0.03em] mb-6">Deniz <span class="text-[#C8A96E]">Rehberi</span></h1>
          <p class="text-white/60 text-[17px] font-light leading-relaxed max-w-lg">Yat kiralama, boğaz turları ve deniz deneyimleri hakkında ipuçları ve bilgiler.</p>
        </div>
      </div>
    </section>

    <!-- Blog Grid -->
    <section class="py-24 bg-white">
      <div class="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div class="text-center mb-16">
          <span class="text-[#1A7B8A] text-[11px] font-semibold uppercase tracking-[0.28em] block mb-4">Tüm Yazılar</span>
          <h2 class="text-[40px] font-bold text-[#0C2340] leading-tight">Son Yazılarımız</h2>
        </div>

        <div v-if="pending" class="flex justify-center py-20">
          <div class="w-12 h-12 border-3 border-[#E8E0D0] border-t-[#0C2340] rounded-full animate-spin"></div>
        </div>

        <div v-else-if="posts.length === 0" class="text-center py-20">
          <p class="text-[#6B7A8D] text-[16px]">Henüz blog yazısı eklenmemiş.</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          <div v-for="post in posts" :key="post.slug" class="group bg-white rounded-2xl overflow-hidden border border-[#E8E0D0] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div class="relative aspect-[16/10] overflow-hidden">
              <img :src="post.image" :alt="post.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div class="absolute top-4 left-4">
                <span class="bg-[#0C2340]/80 backdrop-blur-sm text-[#C8A96E] text-[9px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full">{{ post.category }}</span>
              </div>
            </div>
            <div class="p-6 flex flex-col flex-1">
              <div class="flex items-center gap-3 text-[#6B7A8D] text-[12px] mb-4">
                <span>{{ post.date }}</span>
                <span class="w-1 h-1 rounded-full bg-[#6B7A8D]"></span>
                <span>{{ post.readTime }}</span>
              </div>
              <h2 class="text-[19px] font-bold text-[#0C2340] mb-3 leading-tight">{{ post.title }}</h2>
              <p class="text-[#6B7A8D] text-[14px] leading-relaxed mb-6 flex-1 line-clamp-3">{{ post.desc }}</p>
              <NuxtLink :to="`/blog/${post.slug}`" class="mt-auto inline-flex items-center gap-1.5 text-[#1A7B8A] font-semibold text-[13px] group-hover:text-[#0C2340] transition-colors">
                Devamını Oku
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#0C2340] py-20">
      <div class="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
        <span class="text-[#C8A96E] text-[11px] font-semibold uppercase tracking-[0.28em] block mb-4">Rezervasyon</span>
        <h2 class="text-[36px] font-bold text-white mb-6">Boğazda Hayalinizdeki<br>Turu Planlayalım</h2>
        <div class="flex flex-wrap gap-4 justify-center">
          <NuxtLink to="/rezervasyon" class="bg-[#C8A96E] text-[#0C2340] font-semibold text-[14px] px-8 py-4 rounded-lg hover:bg-[#dbbf7e] transition-all">Rezervasyon Yap</NuxtLink>
          <NuxtLink to="/yatlarimiz" class="border border-white/25 text-white font-medium text-[14px] px-8 py-4 rounded-lg hover:bg-white/5 transition-all">Filomuzu İncele</NuxtLink>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { useAsyncData, useSupabaseClient, useSeoMeta } from '#imports';
import { computed } from 'vue';

definePageMeta({ layout: "custom" });

const supabase = useSupabaseClient();
const { data: dbPosts, pending } = await useAsyncData('blogs', async () => {
  const { data } = await supabase.from('blogs').select('*').eq('is_active', true).order('created_at', { ascending: false });
  return data || [];
});

const posts = computed(() => dbPosts.value?.map((p: any) => ({
  title: p.title,
  slug: p.slug,
  category: p.category || 'Rehber',
  date: new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(p.created_at)),
  readTime: Math.max(1, Math.ceil((p.content?.length || 0) / 1000)) + ' dk okuma',
  image: p.image_url || '/images/default.jpg',
  desc: p.excerpt || p.content?.substring(0, 150) + '...',
})) || []);

useSeoMeta({
  title: "Blog | YatigoTR Yatçılık",
  description: "Yat kiralama rehberi, boğaz turu ipuçları ve deniz deneyimleri.",
});
</script>
