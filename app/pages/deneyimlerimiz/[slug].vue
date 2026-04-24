<template>
  <main>
    <div class="font-sans bg-white text-[#1C2B3A] min-h-screen overflow-x-hidden">

    <div v-if="pending" class="w-full h-[60vh] flex items-center justify-center">
      <div class="w-10 h-10 border-2 border-[#E8E0D0] border-t-[#0C2340] rounded-full animate-spin"></div>
    </div>

    <div v-else-if="!experience" class="w-full h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <h1 class="text-[40px] font-bold text-[#0C2340] mb-4">Deneyim Bulunamadı</h1>
      <p class="text-[#6B7A8D] mb-8">Aradığınız deneyim yayından kaldırılmış veya URL hatalı olabilir.</p>
      <NuxtLink to="/deneyimlerimiz" class="bg-[#0C2340] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#1a3a5c] transition-colors">Tüm Deneyimlere Dön</NuxtLink>
    </div>

    <div v-else>
      <!-- Hero -->
      <div class="relative w-full h-[70vh] min-h-[520px] overflow-hidden bg-[#0C2340] bg-cover bg-center" :style="experience.main_image ? `background-image: url('${experience.main_image}')` : ''">
        <div class="absolute inset-0 bg-gradient-to-t from-[#0C2340] via-[#0C2340]/60 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-[#0C2340]/50 to-transparent"></div>

        <!-- Breadcrumb -->
        <div class="absolute top-28 left-0 right-0">
          <div class="max-w-[1200px] mx-auto px-6 lg:px-12">
            <div class="flex items-center gap-2 text-[11px] font-medium text-white/50 uppercase tracking-wider">
              <NuxtLink to="/" class="hover:text-white/80 transition-colors">Ana Sayfa</NuxtLink>
              <span>·</span>
              <NuxtLink to="/deneyimlerimiz" class="hover:text-white/80 transition-colors">Deneyimler</NuxtLink>
              <span>·</span>
              <span class="text-white/80">{{ experience.title }}</span>
            </div>
          </div>
        </div>

        <!-- Hero Content -->
        <div class="absolute inset-x-0 bottom-0 pb-16">
          <div class="max-w-[1200px] mx-auto px-6 lg:px-12">
            <div class="max-w-2xl">
              <div class="flex items-center gap-3 mb-5">
                <div class="w-6 h-px bg-[#C8A96E]"></div>
                <span class="text-[#C8A96E] text-[10px] font-semibold uppercase tracking-[0.3em]">Özel Deneyim</span>
              </div>
              <h1 class="text-white text-[44px] md:text-[58px] font-bold leading-[1.05] tracking-[-0.02em] mb-6">{{ experience.title }}</h1>
              <div class="flex flex-wrap items-center gap-4">
                <div class="bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-full text-[13px] font-semibold">
                  ₺{{ Number(experience.starting_price).toLocaleString('tr-TR') }}'den başlayan
                </div>
                <NuxtLink to="#rezervasyon" class="bg-[#C8A96E] text-[#0C2340] px-6 py-2.5 rounded-full text-[13px] font-bold hover:bg-[#dbbf7e] transition-colors shadow-lg">
                  Hızlı Rezervasyon
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="bg-white">
      <div class="max-w-[1200px] mx-auto px-6 lg:px-12 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">

        <!-- Left: Main Content -->
        <div class="lg:col-span-8 space-y-14">

          <!-- Description -->
          <div class="prose prose-lg max-w-none text-[#4A5568] leading-relaxed [&>p]:mb-5 [&>h2]:text-[#0C2340] [&>h2]:font-bold [&>h3]:text-[#0C2340]">
            <div v-html="experience.full_description || experience.short_description"></div>
          </div>

          <!-- Itinerary -->
          <div v-if="content.itinerary && content.itinerary.length > 0" class="border-t border-[#F0EBE3] pt-12">
            <div class="flex items-center gap-3 mb-10">
              <div class="w-10 h-10 rounded-xl bg-[#0C2340] flex items-center justify-center text-[#C8A96E]">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <h2 class="text-[26px] font-bold text-[#0C2340]">Tur Akışı</h2>
            </div>
            <div class="space-y-4">
              <div v-for="(step, idx) in content.itinerary" :key="idx" class="flex items-start gap-5 group">
                <div class="w-10 h-10 rounded-full bg-[#0C2340] text-white flex items-center justify-center text-[13px] font-bold shrink-0 mt-1">{{ idx + 1 }}</div>
                <div class="flex-1 bg-white border border-[#F0EBE3] rounded-2xl p-5 hover:border-[#0C2340]/20 hover:shadow-md transition-all">
                  <h3 class="text-[16px] font-bold text-[#0C2340] mb-2">{{ step.title }}</h3>
                  <p class="text-[#6B7A8D] text-[14px] leading-relaxed">{{ step.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- FAQ -->
          <div v-if="content.faq && content.faq.length > 0" class="border-t border-[#F0EBE3] pt-12">
            <div class="flex items-center gap-3 mb-10">
              <div class="w-10 h-10 rounded-xl bg-[#0C2340] flex items-center justify-center text-[#C8A96E]">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <h2 class="text-[26px] font-bold text-[#0C2340]">Sıkça Sorulan Sorular</h2>
            </div>
            <div class="space-y-3">
              <details v-for="(faq, idx) in content.faq" :key="idx" class="group bg-white border border-[#F0EBE3] rounded-2xl overflow-hidden hover:border-[#0C2340]/20 transition-colors" :open="idx === 0">
                <summary class="flex items-center justify-between cursor-pointer p-6 font-semibold text-[#0C2340] text-[15px] marker:content-none list-none">
                  {{ faq.q }}
                  <div class="w-7 h-7 rounded-full border border-[#F0EBE3] flex items-center justify-center shrink-0 group-open:bg-[#0C2340] group-open:border-[#0C2340] transition-all">
                    <svg class="w-3.5 h-3.5 transition-transform group-open:rotate-180 group-open:text-white text-[#6B7A8D]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
                  </div>
                </summary>
                <div class="px-6 pb-6 text-[#6B7A8D] text-[14px] leading-relaxed border-t border-[#F0EBE3] pt-4">{{ faq.a }}</div>
              </details>
            </div>
          </div>
        </div>

        <!-- Right: Sidebar -->
        <div class="lg:col-span-4">
          <div class="sticky top-28 space-y-5">

            <!-- Reservation Card -->
            <div id="rezervasyon" class="bg-white rounded-2xl border border-[#F0EBE3] shadow-lg p-7 overflow-hidden relative">
              <div class="absolute top-0 right-0 w-40 h-40 bg-[#0C2340]/3 rounded-full blur-3xl"></div>
              <div class="mb-6">
                <span class="text-[10px] text-[#6B7A8D] font-semibold uppercase tracking-[0.25em] block mb-2">Başlangıç Fiyatı</span>
                <span class="text-[32px] font-bold text-[#0C2340] leading-none">₺{{ Number(experience.starting_price).toLocaleString('tr-TR') }}</span>
              </div>
              <p class="text-[#6B7A8D] text-[13px] mb-7 leading-relaxed">Online rezervasyon yapabilir veya WhatsApp hattımızdan bilgi alabilirsiniz.</p>
              <div class="flex flex-col gap-3 relative z-10">
                <NuxtLink to="/rezervasyon" class="w-full bg-[#0C2340] text-white py-4 rounded-xl font-semibold text-[14px] hover:bg-[#1a3a5c] transition-all flex items-center justify-center gap-2">
                  Rezervasyon Yap
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </NuxtLink>
                <a href="https://wa.me/905441014343" target="_blank" class="w-full border border-[#F0EBE3] text-[#0C2340] py-4 rounded-xl font-semibold text-[14px] hover:border-[#25D366] hover:text-[#128C7E] transition-all flex items-center justify-center gap-2">
                  <svg class="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  WhatsApp'tan Sor
                </a>
              </div>
              <div class="mt-5 flex items-center justify-center gap-5 text-[11px] text-[#6B7A8D] font-medium border-t border-[#F0EBE3] pt-5">
                <span class="flex items-center gap-1.5"><svg class="w-3.5 h-3.5 text-[#1A7B8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>Hızlı Onay</span>
                <span class="flex items-center gap-1.5"><svg class="w-3.5 h-3.5 text-[#1A7B8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>Güvenli Ödeme</span>
              </div>
            </div>

            <!-- Features -->
            <div v-if="content.features && content.features.length > 0" class="bg-white rounded-2xl border border-[#F0EBE3] p-6 shadow-sm">
              <h3 class="text-[16px] font-bold text-[#0C2340] mb-5">Özellikler</h3>
              <ul class="space-y-3">
                <li v-for="(feature, idx) in content.features" :key="idx" class="flex items-start gap-3 text-[13px] text-[#4A5568]">
                  <svg class="w-4 h-4 text-[#1A7B8A] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                  {{ feature }}
                </li>
              </ul>
            </div>

            <!-- Menu -->
            <div v-if="content.menu && content.menu.length > 0" class="bg-white rounded-2xl border border-[#F0EBE3] p-6 shadow-sm">
              <h3 class="text-[16px] font-bold text-[#0C2340] mb-2">Servis Menüsü</h3>
              <p class="text-[#6B7A8D] text-[11px] mb-4">Bu paket için standart içerikler.</p>
              <ul class="space-y-2">
                <li v-for="(item, idx) in content.menu" :key="idx" class="flex items-center gap-2 text-[13px] text-[#4A5568] font-medium border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#C8A96E] shrink-0"></span>
                  {{ item }}
                </li>
              </ul>
            </div>

          </div>
        </div>
       </div><!-- /max-w -->
      </div><!-- /bg-white -->
    </div><!-- /v-else -->
    </div><!-- /root -->
  </main>
</template>

<script setup lang="ts">
import { useRoute, useAsyncData, useSupabaseClient, useSeoMeta, useHead, useSchemaOrg, defineBreadcrumb, defineProduct } from '#imports';
import { computed, onMounted } from 'vue';

definePageMeta({ layout: "custom" });

const route = useRoute();
const supabase = useSupabaseClient();
const slug = route.params.slug as string;

const { data: experienceData, pending } = await useAsyncData<any>(`exp-${slug}`, async () => {
  const { data } = await (supabase as any).from('experiences').select('*').eq('slug', slug).single();
  return data;
});

const experience = computed(() => experienceData.value);
const content = computed(() => {
  if (!experience.value?.content_json) return { features: [], menu: [], itinerary: [], faq: [] };
  return typeof experience.value.content_json === 'string' ? JSON.parse(experience.value.content_json) : experience.value.content_json;
});

useSeoMeta({
  title: computed(() => experience.value?.meta_title || (experience.value?.title ? `${experience.value.title} | YatigoTR Yatçılık` : 'Deneyim Detayı | YatigoTR Yatçılık')),
  description: computed(() => experience.value?.meta_description || experience.value?.short_description || "İstanbul Boğazı yat kiralama ve özel deneyimler."),
  keywords: computed(() => experience.value?.meta_keywords || '')
});

useSchemaOrg([
  defineBreadcrumb({ itemListElement: [{ name: "Ana Sayfa", item: "/" }, { name: "Deneyimlerimiz", item: "/deneyimlerimiz" }, { name: () => experience.value?.title || "Detay", item: () => `/deneyimlerimiz/${experience.value?.slug}` }] }),
  defineProduct({ name: () => experience.value?.title, description: () => experience.value?.short_description || "İstanbul Boğazı özel yat turu.", image: () => experience.value?.main_image || "/images/img1.jpg", offers: [{ price: () => experience.value?.starting_price || 0, priceCurrency: "TRY", availability: "InStock" }] })
]);

useHead(() => {
  const headData: any = { link: [{ rel: 'canonical', href: `https://yatigotr.com/deneyimlerimiz/${route.params.slug}` }] };
  if (content.value?.faq?.length) {
    headData.script = [{ type: 'application/ld+json', innerHTML: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": content.value.faq.map((item: any) => ({ "@type": "Question", "name": item.q, "acceptedAnswer": { "@type": "Answer", "text": item.a } })) }) }];
  }
  return headData;
});

onMounted(() => { if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'instant' }); });
</script>
