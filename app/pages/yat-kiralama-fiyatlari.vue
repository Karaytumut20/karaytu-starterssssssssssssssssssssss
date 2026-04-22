<template>
  <div class="font-sans bg-white text-[#1C2B3A] min-h-screen overflow-x-hidden">

    <!-- Hero -->
    <section class="relative min-h-[60vh] flex items-end overflow-hidden">
      <div class="absolute inset-0">
        <img src="/images/marine_hero_bg.png" alt="Fiyatlar" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-r from-[#0C2340]/90 via-[#0C2340]/60 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#0C2340]/80 via-transparent to-transparent"></div>
      </div>
      <div class="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-20 pt-40 w-full">
        <div class="max-w-2xl">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-6 h-px bg-[#C8A96E]"></div>
            <span class="text-[#C8A96E] text-[11px] font-semibold uppercase tracking-[0.3em]">Güncel Fiyatlar 2026</span>
          </div>
          <h1 class="text-white text-[52px] md:text-[68px] font-bold leading-[1.0] tracking-[-0.03em] mb-6">Yat Kiralama<br><span class="text-[#C8A96E]">Fiyatları</span></h1>
          <p class="text-white/60 text-[17px] font-light leading-relaxed max-w-lg mb-10">Tüm fiyatlara mürettebat, yakıt ve sigorta dahildir. Sürpriz ek ücret yoktur.</p>
          <div class="flex flex-wrap gap-4">
            <NuxtLink to="/rezervasyon" class="inline-flex items-center gap-2 bg-[#C8A96E] text-[#0C2340] font-semibold text-[14px] px-8 py-4 rounded-lg hover:bg-[#dbbf7e] transition-all shadow-lg">Rezervasyon Yap</NuxtLink>
            <a href="https://wa.me/905441014343" target="_blank" class="inline-flex items-center gap-2 border border-white/25 text-white font-medium text-[14px] px-8 py-4 rounded-lg hover:bg-white/8 transition-all">Fiyat Sor</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Yacht Prices -->
    <section class="py-24 bg-white">
      <div class="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div class="text-center mb-16">
          <span class="text-[#1A7B8A] text-[11px] font-semibold uppercase tracking-[0.28em] block mb-4">Yat Fiyatları</span>
          <h2 class="text-[40px] md:text-[48px] font-bold text-[#0C2340] leading-tight">Yat Kiralama Fiyatları</h2>
          <p class="text-[#6B7A8D] mt-4 text-[15px]">Minimum kiralama süresi 2 saattir. Tüm fiyatlara KDV dahildir.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div v-for="yacht in yachtsList" :key="yacht.name" :class="['group bg-white rounded-2xl overflow-hidden border hover:shadow-2xl hover:-translate-y-1 transition-all duration-300', yacht.highlight ? 'border-[#C8A96E] ring-2 ring-[#C8A96E]/20' : 'border-[#E8E0D0]']">
            <div class="relative aspect-[16/9] overflow-hidden">
              <img :src="yacht.img" :alt="yacht.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div class="absolute top-4 left-4 bg-[#0C2340]/80 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                Maks. {{ yacht.cap }} kişi
              </div>
              <div v-if="yacht.highlight" class="absolute top-4 right-4 bg-[#C8A96E] text-[#0C2340] text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-wider">En Popüler</div>
            </div>
            <div class="p-7">
              <h2 class="text-[22px] font-bold text-[#0C2340] mb-6">{{ yacht.name }}</h2>
              <div class="space-y-0 mb-5">
                <div class="flex justify-between items-center py-3.5 border-b border-gray-100">
                  <span class="text-[14px] text-[#6B7A8D] font-medium">2 Saat</span>
                  <span class="text-[16px] font-bold text-[#0C2340]">{{ yacht.p2 }} ₺</span>
                </div>
                <div class="flex justify-between items-center py-3.5 border-b border-gray-100">
                  <span class="text-[14px] text-[#6B7A8D] font-medium">3 Saat</span>
                  <span class="text-[16px] font-bold text-[#0C2340]">{{ yacht.p3 }} ₺</span>
                </div>
                <div class="flex justify-between items-center py-3.5 border-b border-gray-100">
                  <span class="text-[14px] text-[#6B7A8D] font-medium">4 Saat</span>
                  <span class="text-[16px] font-bold text-[#0C2340]">{{ yacht.p4 }} ₺</span>
                </div>
                <div class="flex justify-between items-center py-3.5 border-b border-gray-100 bg-white -mx-7 px-7">
                  <span class="text-[13px] text-[#6B7A8D] font-medium">Saatlik Ücret</span>
                  <span class="text-[15px] font-bold text-[#1A7B8A]">{{ yacht.ph }} ₺/Saat</span>
                </div>
                <div class="flex justify-between items-center py-3.5 border-b border-gray-100">
                  <span class="text-[13px] text-[#6B7A8D] font-medium">Tam Gün Adalar Turu (8 saat)</span>
                  <span class="text-[15px] font-bold text-[#0C2340]">{{ yacht.padalar }} ₺</span>
                </div>
                <div class="flex justify-between items-center py-3.5">
                  <span class="text-[13px] text-[#6B7A8D] font-medium">Tam Gün Boğaz Turu (8 saat)</span>
                  <span class="text-[15px] font-bold text-[#0C2340]">{{ yacht.pbogaz }} ₺</span>
                </div>
              </div>
              <div class="flex items-center gap-4 py-4 border-t border-gray-100 mb-5">
                <span class="flex items-center gap-1.5 text-[11px] text-[#6B7A8D] font-medium">
                  <svg class="w-3.5 h-3.5 text-[#1A7B8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg> Yakıt
                </span>
                <span class="flex items-center gap-1.5 text-[11px] text-[#6B7A8D] font-medium">
                  <svg class="w-3.5 h-3.5 text-[#1A7B8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg> Sigorta
                </span>
                <span class="flex items-center gap-1.5 text-[11px] text-[#6B7A8D] font-medium">
                  <svg class="w-3.5 h-3.5 text-[#1A7B8A]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg> İkramlar
                </span>
              </div>
              <NuxtLink to="/rezervasyon" class="block w-full text-center py-3.5 bg-[#0C2340] text-white font-semibold text-[14px] rounded-xl hover:bg-[#1a3a5c] transition-colors">Bu Yatı Rezerve Et</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Included Services -->
    <section class="py-24 bg-[#0C2340]">
      <div class="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div class="text-center mb-16">
          <span class="text-[#C8A96E] text-[11px] font-semibold uppercase tracking-[0.28em] block mb-4">Şeffaf Fiyatlandırma</span>
          <h2 class="text-[40px] font-bold text-white leading-tight">Fiyata Dahil Hizmetler</h2>
          <p class="text-white/40 mt-4 text-[15px]">Sürpriz ek ücret yok. Gösterilen fiyat ödeyeceğiniz fiyattır.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div v-for="inc in included" :key="inc.title" class="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/8 hover:border-[#C8A96E]/30 transition-all">
            <div class="w-12 h-12 rounded-xl bg-[#C8A96E]/10 border border-[#C8A96E]/20 flex items-center justify-center text-[#C8A96E] mb-5">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-html="inc.icon"></svg>
            </div>
            <h3 class="text-[17px] font-bold text-white mb-2">{{ inc.title }}</h3>
            <p class="text-white/40 text-[13px] leading-relaxed">{{ inc.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Extra Services -->
    <section class="py-24 bg-white">
      <div class="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div class="text-center mb-16">
          <span class="text-[#1A7B8A] text-[11px] font-semibold uppercase tracking-[0.28em] block mb-4">Özelleştir</span>
          <h2 class="text-[40px] font-bold text-[#0C2340] leading-tight">Ek Hizmetler</h2>
          <p class="text-[#6B7A8D] mt-4 text-[15px]">Turunuzu özelleştirmek için ek hizmetler ekleyebilirsiniz.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div v-for="addon in extraServices" :key="addon.name" class="bg-white border border-[#E8E0D0] rounded-xl p-5 hover:border-[#0C2340] hover:shadow-lg transition-all group">
            <div class="flex items-start justify-between mb-3">
              <h3 class="text-[15px] font-bold text-[#0C2340] leading-tight pr-2 group-hover:text-[#1A7B8A] transition-colors">{{ addon.name }}</h3>
              <span class="text-[#C8A96E] font-bold text-[15px] whitespace-nowrap shrink-0">{{ addon.price }} ₺</span>
            </div>
            <span class="text-[10px] bg-white text-[#6B7A8D] font-semibold px-2 py-1 rounded uppercase tracking-wider">{{ addon.unit }}</span>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
definePageMeta({ layout: "custom" });

const supabase = useSupabaseClient();
const yachtsList = ref<any[]>([]);

const fetchYachts = async () => {
  const { data, error } = await (supabase as any).from('yachts').select('*').order('created_at', { ascending: false });
  if (!error && data && data.length > 0) {
    yachtsList.value = data.map((y: any) => ({
      ...y, img: y.main_image || '/images/default.jpg', cap: y.capacity,
      p2: (y.price_2h || 0).toLocaleString('tr-TR'),
      p3: (y.price_3h || ((y.price_2h || 0) + (y.price_hourly || 0))).toLocaleString('tr-TR'),
      p4: (y.price_4h || ((y.price_2h || 0) + ((y.price_hourly || 0) * 2))).toLocaleString('tr-TR'),
      ph: (y.price_hourly || 0).toLocaleString('tr-TR'),
      padalar: (y.price_adalar || 0).toLocaleString('tr-TR'),
      pbogaz: (y.price_bogaz || y.price_adalar || 0).toLocaleString('tr-TR'),
      highlight: y.featured
    }));
  } else {
    yachtsList.value = [
      { name: 'YatigoTR Royal', img: '/images/img4.jpg', cap: 36, p2: '15.900', p3: '23.850', p4: '31.800', ph: '7.950', padalar: '63.600', pbogaz: '63.600', highlight: false },
      { name: 'YatigoTR Orion', img: '/images/luxury_yacht_sunset.png', cap: 24, p2: '13.600', p3: '20.400', p4: '27.200', ph: '6.800', padalar: '54.400', pbogaz: '54.400', highlight: true },
    ];
  }
};
onMounted(fetchYachts);

const included = [
  { title: 'Profesyonel Mürettebat', desc: 'Deneyimli kaptan ve mürettebat ekibi turunuz boyunca hizmetinizdedir.', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>' },
  { title: 'Yakıt Dahil', desc: 'Tur süresi boyunca tüm yakıt giderleri fiyata dahildir.', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>' },
  { title: 'Tam Sigorta', desc: 'Tüm yolcular ve tekne için kapsamlı sigorta sağlanır.', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>' },
  { title: 'İkramlar', desc: 'Çay, kahve, YatigoTR ve mevsimsel meyve servisi standarttır.', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>' },
];

const extraServices = [
  { name: 'Lazer Gösterisi', price: '2.500', unit: 'Tur Boyu' },
  { name: 'Volkan Gösterisi', price: '950', unit: 'Tur Boyu' },
  { name: 'Gül 25 Adet', price: '3.950', unit: 'Tur Boyu' },
  { name: 'Fasıl', price: '15.000', unit: 'Tur Boyu' },
  { name: 'Dansöz', price: '8.500', unit: 'Tur Boyu' },
  { name: 'Kemancı', price: '8.500', unit: 'Tur Boyu' },
  { name: 'Uçan Balon', price: '3.950', unit: 'Tur Boyu' },
  { name: 'Vito Transfer', price: '6.500', unit: 'Tur Boyu' },
  { name: 'Meze Tabağı', price: '1.080', unit: 'Kişi Başı' },
  { name: 'Dışarıdan Yiyecek', price: '500', unit: 'Kişi Başı' },
  { name: 'Meyve/Cips Menü', price: '1.380', unit: 'Kişi Başı' },
  { name: 'Fotoğrafçı', price: '12.500', unit: 'Tur Boyu' },
  { name: 'Kahvaltı', price: '1.395', unit: 'Kişi Başı' },
  { name: 'Yemek Menüsü', price: '2.150', unit: 'Kişi Başı' },
  { name: 'Pasta', price: '2.250', unit: 'Tur Boyu' },
];

useSeoMeta({ title: "Yat Kiralama Fiyatları | YatigoTR", description: "İstanbul Boğazı yat kiralama fiyatları. Sürpriz ücret yok." });
</script>
