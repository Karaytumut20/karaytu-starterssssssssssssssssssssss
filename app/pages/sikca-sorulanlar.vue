<template>
  <div class="font-sans bg-white text-[#1C2B3A] min-h-screen overflow-x-hidden">

    <!-- Hero -->
    <section class="bg-[#0C2340] pt-36 pb-20 px-6">
      <div class="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-6 h-px bg-[#C8A96E]"></div>
          <span class="text-[#C8A96E] text-[11px] font-semibold uppercase tracking-[0.3em]">SSS</span>
        </div>
        <h1 class="text-[52px] md:text-[64px] font-bold text-white leading-tight tracking-[-0.02em] mb-4">Sıkça Sorulan<br><span class="text-[#C8A96E]">Sorular</span></h1>
        <p class="text-white/50 text-[17px] font-light max-w-xl">Yat kiralama, organizasyon ve fiyatlandırma hakkında aklınıza takılan soruların cevapları.</p>
      </div>
    </section>

    <!-- FAQs -->
    <section class="py-24 px-6">
      <div class="max-w-4xl mx-auto">
        <div class="space-y-4">
          <div v-for="(faq, idx) in faqs" :key="idx" class="bg-white border border-[#E8E0D0] rounded-2xl overflow-hidden hover:border-[#0C2340]/20 transition-colors group">
            <button @click="open = open === idx ? null : idx" class="w-full flex items-center justify-between p-7 text-left">
              <h3 class="text-[17px] font-semibold text-[#0C2340] pr-6 leading-snug group-hover:text-[#1A7B8A] transition-colors">{{ faq.q }}</h3>
              <div :class="['w-8 h-8 rounded-full border border-[#E8E0D0] flex items-center justify-center shrink-0 transition-all', open === idx ? 'bg-[#0C2340] border-[#0C2340]' : 'bg-transparent']">
                <svg :class="['w-4 h-4 transition-transform', open === idx ? 'rotate-45 text-white' : 'text-[#6B7A8D]']" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
              </div>
            </button>
            <div v-show="open === idx" class="px-7 pb-7 border-t border-gray-100">
              <p class="text-[#6B7A8D] text-[15px] leading-relaxed pt-5">{{ faq.a }}</p>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="mt-16 bg-[#0C2340] rounded-2xl p-10 text-center">
          <h2 class="text-[28px] font-bold text-white mb-3">Başka Sorunuz mu Var?</h2>
          <p class="text-white/50 text-[15px] mb-8">Ekibimiz 7/24 size yardımcı olmaya hazır.</p>
          <div class="flex flex-wrap gap-4 justify-center">
            <NuxtLink to="/iletisim" class="bg-[#C8A96E] text-[#0C2340] font-semibold text-[14px] px-8 py-4 rounded-lg hover:bg-[#dbbf7e] transition-all">İletişime Geç</NuxtLink>
            <a href="https://wa.me/905441014343" target="_blank" class="border border-white/25 text-white font-medium text-[14px] px-8 py-4 rounded-lg hover:bg-white/5 transition-all">WhatsApp</a>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
definePageMeta({ layout: "custom" });

const open = ref<number | null>(null);

const faqs = [
  { q: "Yat kiralama fiyatlarına neler dahildir?", a: "Fiyatlarımıza profesyonel kaptan ve mürettebat, yakıt ve tam kapsamlı sigorta dahildir. Çay, kahve ve temel ikramlar ücretsiz sunulmaktadır." },
  { q: "Tekneye dışarıdan yiyecek ve içecek getirebilir miyiz?", a: "Evet, kendi yiyecek ve içeceklerinizi getirebilirsiniz. Servis hizmeti (tabak, bardak, buz) için ek ücret alınabilir. Profesyonel catering hizmetimiz de mevcuttur." },
  { q: "Kötü hava koşullarında tur iptal edilir mi?", a: "Hafif yağmur turu engellemez. Liman Başkanlığı tarafından denize çıkış yasağı olan durumlarda turunuz ücretsiz ertelenir." },
  { q: "Rezervasyonumu nasıl iptal edebilirim?", a: "Tur tarihinden 15 gün öncesine kadar yapılan iptallerde kapora iade edilir. 15 günden az süre kaldığında ücret iadesi yapılmaz, tarih değişikliği talep edilebilir." },
  { q: "Bebekli/çocuklu aileler için güvenli mi?", a: "Evet, yatlarımız sertifikalı güvenlik standartlarına sahiptir. Çocuk can yelekleri mevcuttur. Küçük çocukların ebeveyn gözetiminde olması gerekmektedir." },
  { q: "Süsleme ve organizasyon desteği veriyor musunuz?", a: "Evet. Doğum günü balonları, fasıl, kemancı, volkan gösterisi, drone ve fotoğrafçı gibi tüm ekstra talepleriniz için destek sağlıyoruz." },
];

useSeoMeta({
  title: "Sıkça Sorulan Sorular | YatigoTR Yatçılık",
  description: "Yat kiralama ve organizasyon hakkında sıkça sorulan sorular.",
});
</script>
