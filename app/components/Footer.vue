<template>
  <footer class="w-full bg-[#0C2340] text-white pt-20 pb-0">
    <!-- CTA Band -->
    <div class="max-w-[1400px] mx-auto px-6 lg:px-12 mb-20">
      <div class="border border-[#C8A96E]/20 rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 bg-[#0d2847]">
        <div>
          <h2 class="text-[26px] md:text-[32px] font-bold text-white mb-2 leading-tight">Unutulmaz bir deneyim için<br><span class="text-[#C8A96E]">hemen rezervasyon yapın.</span></h2>
          <p class="text-white/40 text-[14px]">Sınırlı kapasite · Erken rezervasyonda özel fiyat</p>
        </div>
        <NuxtLink to="/rezervasyon" class="shrink-0 bg-[#C8A96E] text-[#0C2340] font-semibold text-[14px] px-8 py-4 rounded-lg hover:bg-[#dbbf7e] transition-all shadow-lg whitespace-nowrap">
          Rezervasyon Yap →
        </NuxtLink>
      </div>
    </div>

    <!-- Grid -->
    <div class="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/8">
      <!-- Brand -->
      <div>
        <NuxtLink to="/" class="flex items-center gap-3 mb-6">
          <svg viewBox="0 0 36 36" fill="none" class="w-9 h-9">
            <path d="M4 24 C10 18 14 14 18 10 C22 14 26 18 32 24" stroke="#C8A96E" stroke-width="2" stroke-linecap="round"/>
            <path d="M2 28 H34" stroke="#C8A96E" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
            <path d="M18 10 L18 4" stroke="#C8A96E" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M18 4 L26 14" stroke="#C8A96E" stroke-width="1.5" stroke-linejoin="round"/>
          </svg>
          <div>
            <div class="text-[16px] font-black text-white">YatigoTR</div>
            <div class="text-[8px] text-[#C8A96E] uppercase tracking-[0.3em] font-medium">Yatçılık</div>
          </div>
        </NuxtLink>
        <p class="text-white/40 text-[13px] leading-relaxed mb-6">İstanbul Boğazı'nda 16 yıllık deneyimle özel yat kiralama ve organizasyon.</p>
        <div class="flex gap-3">
          <a href="https://wa.me/908508403030" target="_blank" class="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#25d366] hover:border-[#25d366]/30 transition-colors text-[11px] font-bold">WA</a>
          <a href="https://instagram.com" target="_blank" class="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#e1306c] hover:border-[#e1306c]/30 transition-colors text-[11px] font-bold">IG</a>
        </div>
      </div>

      <!-- Links -->
      <div>
        <h4 class="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C8A96E] mb-6">Keşfet</h4>
        <ul class="space-y-3">
          <li v-for="l in [['/yatlarimiz','Yatlarımız'],['/deneyimlerimiz','Deneyimler'],['/yat-kiralama-fiyatlari','Fiyatlar'],['/blog','Blog'],['/hakkimizda','Hakkımızda'],['/iletisim','İletişim']]" :key="l[0]">
            <NuxtLink :to="l[0]" class="text-[13px] text-white/40 hover:text-white transition-colors">{{ l[1] }}</NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Tours -->
      <div>
        <h4 class="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C8A96E] mb-6">Turlar</h4>
        <ul class="space-y-3">
          <li v-for="l in [['/deneyimlerimiz/istanbul-bogazi-ozel-yat-turu','Boğaz Turu'],['/deneyimlerimiz/yemekli-yat-turu','Yemekli Tur'],['/deneyimlerimiz/adalar-yat-turu','Adalar Turu'],['/deneyimlerimiz/evlilik-teklifi','Evlilik Teklifi']]" :key="l[0]">
            <NuxtLink :to="l[0]" class="text-[13px] text-white/40 hover:text-white transition-colors">{{ l[1] }}</NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h4 class="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C8A96E] mb-6">İletişim</h4>
        <ul class="space-y-4">
          <li><div class="text-[9px] text-[#C8A96E] uppercase tracking-wider mb-1">Telefon</div><a href="tel:+908508403030" class="text-[13px] text-white/60 hover:text-white">+90 850 840 30 30</a></li>
          <li><div class="text-[9px] text-[#C8A96E] uppercase tracking-wider mb-1">E-posta</div><a href="mailto:info@yatigotr.com" class="text-[13px] text-white/60 hover:text-white">info@yatigotr.com</a></li>
          <li><div class="text-[9px] text-[#C8A96E] uppercase tracking-wider mb-1">Adres</div><span class="text-[13px] text-white/60">Arnavutköy, Beşiktaş, İstanbul</span></li>
          <li><div class="text-[9px] text-[#C8A96E] uppercase tracking-wider mb-1">Çalışma Saatleri</div><span class="text-[13px] text-white/60">09:00 – 02:00</span></li>
        </ul>
      </div>
    </div>

    <!-- Copyright -->
    <div class="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-3">
      <p class="text-[12px] text-white/20">© 2026 YatigoTR Yatçılık. Tüm hakları saklıdır.</p>
      <div class="flex gap-5 text-[12px] text-white/20">
        <NuxtLink to="/gizlilik-politikasi" class="hover:text-white/50 transition-colors">Gizlilik</NuxtLink>
        <NuxtLink to="/kullanim-kosullari" class="hover:text-white/50 transition-colors">Kullanım</NuxtLink>
        <NuxtLink to="/kvkk" class="hover:text-white/50 transition-colors">KVKK</NuxtLink>
      </div>
    </div>
  </footer>
</template>
