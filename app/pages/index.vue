<template>
  <div class="font-sans bg-white text-[#1C2B3A] min-h-screen overflow-x-hidden">

    <!-- HERO — FlyHigh style pixel-perfect -->
    <section class="relative h-[85vh] min-h-[650px] flex flex-col overflow-visible bg-[#f8f9fb]">
      <!-- Background image -->
      <div class="absolute inset-0 pb-20">
        <img src="/images/marine_hero_bg.png" alt="İstanbul Boğazı" class="w-full h-full object-cover" />
        <!-- Adjusted gradient to make text legible but keep the image clear -->
        <div class="absolute inset-0 bg-gradient-to-r from-white/80 via-white/30 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent"></div>
      </div>

      <!-- Top content -->
      <div class="relative z-10 max-w-[1200px] mx-auto px-6 w-full pt-32 lg:pt-48">
        <div class="max-w-xl">
          <h1 class="text-[#111827] text-[52px] md:text-[64px] font-medium leading-[1.05] tracking-tight mb-6">
            Hey Buddy! Nereye<br>
            <span class="font-bold">Yelken Açıyorsun?</span>
          </h1>
          <NuxtLink to="/yatlarimiz" class="inline-flex items-center gap-2 text-[#111827] text-[15px] font-bold mt-2 hover:gap-3 transition-all">
            Keşfet <span class="text-xl leading-none">&rarr;</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Floating booking card — Functional -->
      <div class="absolute bottom-0 left-0 right-0 z-20 translate-y-1/2">
        <div class="max-w-[1100px] mx-auto px-6 w-full">
          <!-- No tabs - single booking form -->

          <!-- Main white card -->
          <div class="bg-white rounded-3xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] p-8 relative">

            <!-- Form inputs row -->
            <div class="flex flex-col md:flex-row items-stretch gap-4">
              <!-- Kalkış İskelesi + Tur Tipi -->
              <div class="flex-[1.2] flex items-center border border-gray-200 rounded-2xl p-5 bg-white w-full">
                <div class="flex-1">
                  <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">KALKIŞ İSKELESİ</p>
                  <div class="relative" data-booking-dropdown>
                    <button @click.stop="toggleDropdown('departure')" class="text-[18px] font-bold text-[#111827] hover:text-[#4f46e5] transition-colors text-left">{{ departureLocations[departure]?.name || 'Seçin' }}</button>
                    <p class="text-[12px] text-gray-400 mt-1">{{ departureLocations[departure]?.sub || '' }}</p>
                    <div v-if="openDropdown === 'departure'" class="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl py-2 min-w-[200px] z-50">
                      <button v-for="(loc, key) in departureLocations" :key="key" @click.stop="departure = key as string; openDropdown = null" :class="['block w-full text-left px-4 py-2.5 text-[13px] hover:bg-gray-50', departure === key ? 'text-[#4f46e5] font-bold' : '']"><span class="font-semibold">{{ loc.name }}</span> <span class="text-gray-400 text-[11px] ml-1">{{ loc.sub }}</span></button>
                    </div>
                  </div>
                </div>
                <div class="w-px h-12 bg-gray-100 mx-4"></div>
                <div class="flex-1">
                  <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">TUR TİPİ</p>
                  <div class="relative" data-booking-dropdown>
                    <button @click.stop="toggleDropdown('tourType')" class="text-[18px] font-bold text-[#111827] hover:text-[#4f46e5] transition-colors text-left">{{ tourTypeOptions[selectedTourType] }}</button>
                    <p class="text-[12px] text-gray-400 mt-1">Özel güzergah</p>
                    <div v-if="openDropdown === 'tourType'" class="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl py-2 min-w-[220px] z-50">
                      <button v-for="(label, key) in tourTypeOptions" :key="key" @click.stop="selectedTourType = key as string; openDropdown = null" :class="['block w-full text-left px-4 py-2.5 text-[13px] hover:bg-gray-50', selectedTourType === key ? 'text-[#4f46e5] font-bold' : '']">{{ label }}</button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Tarih + Saat -->
              <div class="flex-1 flex items-center border border-gray-200 rounded-2xl p-5 bg-white w-full">
                <div class="flex-1">
                  <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">KALKIŞ TARİHİ</p>
                  <input type="date" v-model="departDate" :min="todayStr" class="text-[18px] font-bold text-[#111827] bg-transparent border-none outline-none cursor-pointer w-full" />
                  <p class="text-[12px] text-gray-400 mt-1">{{ departDate ? formatDateTR(departDate) : 'Tarih seçin' }}</p>
                </div>
                <div class="flex-1 pl-6 border-l border-gray-100">
                  <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">SAAT</p>
                  <div class="relative" data-booking-dropdown>
                    <button @click.stop="toggleDropdown('time')" class="text-[18px] font-bold text-[#111827] hover:text-[#4f46e5] transition-colors text-left">{{ selectedTime }}</button>
                    <p class="text-[12px] text-gray-400 mt-1">Başlangıç saati</p>
                    <div v-if="openDropdown === 'time'" class="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl py-2 min-w-[140px] z-50 max-h-[250px] overflow-y-auto">
                      <button v-for="t in timeSlots" :key="t" @click.stop="selectedTime = t; openDropdown = null" :class="['block w-full text-left px-4 py-2 text-[13px] hover:bg-gray-50', selectedTime === t ? 'text-[#4f46e5] font-bold' : '']">{{ t }}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Search Button & Note -->
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
              <p class="text-[13px] text-gray-500 font-medium flex items-center gap-1.5">
                <svg class="w-4 h-4 text-[#eab308]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Tüm yatlarımızda minimum kiralama süresi <strong class="text-[#111827]">2 saattir.</strong>
              </p>
              <button @click="handleSearch" class="bg-[#18181b] hover:bg-black text-white px-8 py-4 rounded-xl font-semibold text-[15px] flex items-center gap-3 transition-colors shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] duration-200 w-full sm:w-auto justify-center">
                Yat Ara
                <span class="text-xl leading-none font-light">&rarr;</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>

    <!-- Spacer to account for absolute positioned card -->
    <div class="h-32 bg-[#f8f9fb]"></div>

    <!-- POPÜLER TURLAR - Pick the Place Style -->
    <section class="py-24 bg-[#f8f9fb]">
      <div class="max-w-[1200px] mx-auto px-6 w-full">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div class="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 mb-4">
              <div class="w-1.5 h-1.5 rounded-full bg-[#3b82f6]"></div>
              <span class="text-[11px] font-semibold text-[#111827]">Popüler Destinasyonlar 2025</span>
            </div>
            <h2 class="text-[48px] md:text-[56px] font-medium text-[#111827] leading-[1.05] tracking-tight">Özel Turlar</h2>
          </div>
          <p class="text-gray-500 text-[14px] max-w-sm md:text-right leading-relaxed mb-2">
            Sizin ve sevdikleriniz için harika rotalarımız ve birlikte keyif alabileceğiniz eşsiz deneyimlerimiz var!
          </p>
        </div>

        <!-- Filter Bar (Visual) -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 flex flex-wrap items-center justify-between mb-10">
          <div class="flex flex-wrap items-center gap-4 md:gap-8 px-4 py-2 w-full md:w-auto">
            <div class="flex-1 md:flex-none">
              <p class="text-[11px] font-bold text-[#111827] mb-0.5">Destinasyon</p>
              <p class="text-[12px] text-gray-400">Rota seçin...</p>
            </div>
            <div class="hidden md:block w-px h-8 bg-gray-100"></div>
            <div class="flex-1 md:flex-none">
              <p class="text-[11px] font-bold text-[#111827] mb-0.5">Kategori</p>
              <p class="text-[12px] text-gray-400 flex items-center gap-1">Tür seçin <span class="text-[8px]">&#9660;</span></p>
            </div>
            <div class="hidden md:block w-px h-8 bg-gray-100"></div>
            <div class="flex-1 md:flex-none hidden sm:block">
              <p class="text-[11px] font-bold text-[#111827] mb-0.5">Fiyat</p>
              <p class="text-[12px] text-gray-400 flex items-center gap-1">Bütçe <span class="text-[8px]">&#9660;</span></p>
            </div>
            <div class="hidden md:block w-px h-8 bg-gray-100"></div>
            <div class="flex-1 md:flex-none hidden sm:block">
              <p class="text-[11px] font-bold text-[#111827] mb-0.5">Tarih</p>
              <p class="text-[12px] text-gray-400 flex items-center gap-1">Tarih <span class="text-[8px]">&#9660;</span></p>
            </div>
          </div>
          <NuxtLink to="/deneyimlerimiz" class="bg-[#18181b] hover:bg-black text-white px-8 py-3.5 rounded-xl text-[13px] font-semibold transition-all mt-3 md:mt-0 w-full md:w-auto text-center">
            Keşfet
          </NuxtLink>
        </div>

        <!-- Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="exp in experiences.slice(0,3)" :key="exp.id" class="bg-white rounded-[24px] p-3 shadow-sm border border-gray-100 group">
            <!-- Card Header -->
            <div class="flex justify-between items-start px-2 pt-2 pb-3">
              <div>
                <h3 class="font-bold text-[#111827] text-[18px] leading-tight">{{ exp.title }}</h3>
                <p class="text-gray-400 text-[12px] mt-1">İstanbul Boğazı, TR</p>
              </div>
              <div class="bg-[#f8f9fb] px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-gray-100 shrink-0">
                <div class="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                <span class="text-[10px] font-semibold text-[#111827]">Popüler</span>
              </div>
            </div>
            
            <!-- Image -->
            <div class="relative aspect-[4/3] rounded-[20px] overflow-hidden mb-4">
              <img :src="exp.main_image||'/images/default.jpg'" :alt="exp.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <!-- Stats inside image bottom -->
              <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div class="flex items-center gap-3 text-[11px] font-medium">
                  <span class="flex items-center gap-1.5"><svg class="w-3.5 h-3.5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> ₺{{ Number(exp.starting_price).toLocaleString('tr-TR') }}</span>
                  <span class="flex items-center gap-1.5"><svg class="w-3.5 h-3.5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg> Özel Tur</span>
                </div>
                <span class="text-[11px] font-medium flex items-center gap-1"><svg class="w-3.5 h-3.5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg> Esnek</span>
              </div>
            </div>
            
            <!-- Card Footer -->
            <div class="flex items-center justify-between px-2 pb-1">
              <NuxtLink :to="`/deneyimlerimiz/${exp.slug}`" class="w-8 h-8 rounded-full bg-[#f8f9fb] border border-gray-200 flex items-center justify-center hover:bg-[#111827] hover:border-[#111827] hover:text-white transition-all group/btn shrink-0">
                <svg class="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19L19 5m0 0v10m0-10H9"/></svg>
              </NuxtLink>
              <div class="flex gap-4 text-[9px] text-gray-500 text-right">
                <div><span class="block font-bold text-[#111827] mb-0.5">Kalkış</span> İstenilen İskele</div>
                <div><span class="block font-bold text-[#111827] mb-0.5">Süre</span> Min. 2 Saat</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NASIL ÇALIŞIR -->
    <section class="py-20 bg-white border-t border-gray-100">
      <div class="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div class="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-4">
          <div>
            <span class="text-[#1A7B8A] text-[11px] font-semibold uppercase tracking-[0.28em] block mb-3">Nasıl Çalışır</span>
            <h2 class="text-[40px] font-bold text-[#0C2340] leading-tight">3 Adımda<br>Rezervasyon</h2>
          </div>
          <p class="text-[#6B7A8D] text-[15px] max-w-sm">Online sistemimizle dakikalar içinde yat kiralamanın keyfini çıkarın.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="(s, i) in steps" :key="i" class="group bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div class="flex items-start justify-between mb-8">
              <div class="w-12 h-12 rounded-xl bg-[#0C2340] flex items-center justify-center">
                <svg class="w-5 h-5 text-[#C8A96E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-html="s.icon"></svg>
              </div>
              <span class="text-[48px] font-black text-gray-100 leading-none select-none">{{ String(i+1).padStart(2,'0') }}</span>
            </div>
            <h3 class="text-[20px] font-bold text-[#0C2340] mb-3">{{ s.title }}</h3>
            <p class="text-[#6B7A8D] text-[14px] leading-relaxed">{{ s.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- YATLARIMIZ - Pick the Place Style -->
    <section class="py-24 bg-white border-t border-gray-100">
      <div class="max-w-[1200px] mx-auto px-6 w-full">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div class="inline-flex items-center gap-2 bg-[#f8f9fb] px-3 py-1.5 rounded-full border border-gray-100 mb-4">
              <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              <span class="text-[11px] font-semibold text-[#111827]">Özel Seçim</span>
            </div>
            <h2 class="text-[48px] md:text-[56px] font-medium text-[#111827] leading-[1.05] tracking-tight">Lüks Yatlar</h2>
          </div>
          <p class="text-gray-500 text-[14px] max-w-sm md:text-right leading-relaxed mb-2">
            İhtiyacınıza uygun kapasite ve özelliklerde, konforlu bir deniz yolculuğu için özenle seçilmiş filomuz.
          </p>
        </div>

        <!-- Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="yacht in yachts.slice(0,3)" :key="yacht.id" class="bg-white rounded-[24px] p-3 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100 group">
            <!-- Card Header -->
            <div class="flex justify-between items-start px-2 pt-2 pb-3">
              <div>
                <h3 class="font-bold text-[#111827] text-[18px] leading-tight">{{ yacht.name }}</h3>
                <p class="text-gray-400 text-[12px] mt-1">{{ yacht.capacity }} Kişi Kapasiteli</p>
              </div>
              <div class="bg-[#f8f9fb] px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-gray-100 shrink-0">
                <div class="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                <span class="text-[10px] font-semibold text-[#111827]">Müsait</span>
              </div>
            </div>
            
            <!-- Image -->
            <div class="relative aspect-[4/3] rounded-[20px] overflow-hidden mb-4">
              <img :src="yacht.main_image||'/images/img1.jpg'" :alt="yacht.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" @error="(e)=>(e.target as HTMLImageElement).src='/images/img1.jpg'" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <!-- Stats inside image bottom -->
              <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div class="flex items-center gap-3 text-[11px] font-medium">
                  <span class="flex items-center gap-1.5"><svg class="w-3.5 h-3.5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> ₺{{ new Intl.NumberFormat('tr-TR').format(yacht.price_hourly||0) }}</span>
                  <span class="flex items-center gap-1.5"><svg class="w-3.5 h-3.5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg> Saatlik</span>
                </div>
                <span class="text-[11px] font-medium flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">Özel Yat</span>
              </div>
            </div>
            
            <!-- Card Footer -->
            <div class="flex items-center justify-between px-2 pb-1">
              <NuxtLink :to="`/yatlarimiz/${yacht.slug}`" class="w-8 h-8 rounded-full bg-[#f8f9fb] border border-gray-200 flex items-center justify-center hover:bg-[#111827] hover:border-[#111827] hover:text-white transition-all group/btn shrink-0">
                <svg class="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19L19 5m0 0v10m0-10H9"/></svg>
              </NuxtLink>
              <div class="flex gap-4 text-[9px] text-gray-500 text-right">
                <div><span class="block font-bold text-[#111827] mb-0.5">Uzunluk</span> {{ yacht.length }}m</div>
                <div><span class="block font-bold text-[#111827] mb-0.5">Kabin</span> Var</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-12 flex justify-center">
          <NuxtLink to="/yatlarimiz" class="inline-flex items-center gap-2 bg-[#f8f9fb] border border-gray-200 text-[#111827] font-semibold text-[13px] px-8 py-3.5 rounded-xl hover:bg-[#111827] hover:text-white transition-all">
            Tüm Filoyu Gör
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- YORUMLAR -->
    <section v-if="allReviews.length > 0" class="py-20 bg-white">
      <div class="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div class="text-center mb-14">
          <span class="text-[#C8A96E] text-[11px] font-semibold uppercase tracking-[0.28em] block mb-3">Misafir Görüşleri</span>
          <h2 class="text-[40px] font-bold text-[#0C2340]">Misafirlerimiz<br>Ne Diyor?</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="review in allReviews.slice(0,6)" :key="review.id" class="bg-white border border-gray-100 rounded-2xl p-7 hover:shadow-lg transition-all">
            <div class="flex text-[#C8A96E] mb-4">
              <svg v-for="s in 5" :key="s" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            </div>
            <p class="text-[#4A5568] text-[14px] leading-relaxed mb-5 italic">"{{ review.comment }}"</p>
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white" :style="{backgroundColor: review.avatar_color||'#1A7B8A'}">{{ review.reviewer_name?.charAt(0)||'U' }}</div>
              <div>
                <div class="font-semibold text-[13px] text-[#0C2340]">{{ review.reviewer_name }}</div>
                <div class="text-[11px] text-[#9CA3AF]">{{ review.created_at ? new Date(review.created_at).toLocaleDateString('tr-TR',{month:'long',year:'numeric'}) : '' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { useAsyncData, useSupabaseClient, useRouter } from '#imports';
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

definePageMeta({ layout: "custom" });

const supabase = useSupabaseClient();
const router = useRouter();
const openDropdown = ref<string|null>(null);

// Departure locations (kalkış iskelesi)
const departure = ref('bebek');
const departureLocations: Record<string, { name: string; sub: string }> = {
  bebek: { name: 'Bebek', sub: 'İstanbul, TR' },
  kabatas: { name: 'Kabataş', sub: 'İstanbul, TR' },
  besiktas: { name: 'Beşiktaş', sub: 'İstanbul, TR' },
  eminonu: { name: 'Eminönü', sub: 'İstanbul, TR' },
  sariyer: { name: 'Sarıyer', sub: 'İstanbul, TR' },
  kuruçesme: { name: 'Kuruçeşme', sub: 'İstanbul, TR' },
  istinye: { name: 'İstinye', sub: 'İstanbul, TR' },
};

// Tour type
const selectedTourType = ref('bogaz');
const tourTypeOptions: Record<string, string> = {
  'bogaz': 'Boğaz Turu',
  'adalar': 'Adalar Turu',
  'yuzme': 'Yüzme Turu',
  'evlilik': 'Evlilik Teklifi',
};

// Date
const todayStr = computed(() => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
});
const departDate = ref(todayStr.value);

// Time slots
const selectedTime = ref('10:00');
const timeSlots = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'];

// Format date to Turkish
function formatDateTR(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  const days = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
  const months = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`;
}

// Dropdown toggle
function toggleDropdown(name: string) {
  openDropdown.value = openDropdown.value === name ? null : name;
}

// Close dropdown on outside click
const handleOutsideClick = (e: Event) => {
  const target = e.target as HTMLElement;
  if (!target.closest('[data-booking-dropdown]')) {
    openDropdown.value = null;
  }
};
onMounted(() => { document.addEventListener('click', handleOutsideClick); });
onUnmounted(() => { document.removeEventListener('click', handleOutsideClick); });

// Handle search → navigate to /rezervasyon with all fields pre-filled
function handleSearch() {
  const tourNames: Record<string, string> = { bogaz: 'Boğaz Turu', adalar: 'Adalar Turu', yuzme: 'Yüzme Turu', evlilik: 'Evlilik Teklifi' };
  const pickupNames: Record<string, string> = { bebek: 'Bebek', kabatas: 'Kabataş', besiktas: 'Beşiktaş', eminonu: 'Eminönü', sariyer: 'Sarıyer', kuruçesme: 'Kuruçeşme', istinye: 'İstinye' };
  const query: Record<string, string> = {
    pickup: pickupNames[departure.value] || 'Bebek',
    tourType: tourNames[selectedTourType.value] || 'Boğaz Turu',
    time: selectedTime.value,
  };
  if (departDate.value) query.date = departDate.value;
  router.push({ path: '/rezervasyon', query });
}
const steps = [
  { title: 'Yatınızı Seçin', desc: 'Kişi sayısı ve etkinlik türüne göre en uygun yatı belirleyin.', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>' },
  { title: 'Tarih Belirleyin', desc: 'Müsaitlik takviminden istediğiniz gün ve saati seçin.', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>' },
  { title: 'Onaylayın', desc: 'Güvenli ödeme ile %50 ön ödeme yapın, rezervasyon anında kesinleşsin.', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>' },
];

const { data: homeData } = await useAsyncData('home-all-data', async () => {
  if (import.meta.server) return { yachts: [], experiences: [], settings: [], reviews: [] };
  const [yRes, eRes, sRes, rRes] = await Promise.all([
    supabase.from('yachts').select('*').order('created_at', { ascending: true }).limit(4),
    supabase.from('experiences').select('*').order('created_at', { ascending: true }).limit(4),
    supabase.from('site_settings').select('*'),
    supabase.from('reviews').select('*').eq('is_active', true).order('created_at', { ascending: false }).limit(6),
  ]);
  return { yachts: yRes.data||[], experiences: eRes.data||[], settings: sRes.data||[], reviews: rRes.data||[] };
}, { lazy: true });

const fallbackYachts = [
  { id:'1', name:'Royal', slug:'royal', capacity:36, length:'24.0', price_hourly:7950, main_image:'/images/img4.jpg' },
  { id:'2', name:'Orion', slug:'orion', capacity:24, length:'26.0', price_hourly:6800, main_image:'/images/luxury_yacht_sunset.png' },
  { id:'3', name:'Prestige', slug:'prestige', capacity:12, length:'22.5', price_hourly:5950, main_image:'/images/img1.jpg' },
  { id:'4', name:'Classic', slug:'classic', capacity:12, length:'21.5', price_hourly:4950, main_image:'/images/img2.jpg' },
];
const fallbackExperiences = [
  { id:'e1', title:'Boğaz Turu', slug:'istanbul-bogazi-ozel-yat-turu', starting_price:9900, main_image:'/images/img4.jpg' },
  { id:'e2', title:'Yemekli Yat Turu', slug:'yemekli-yat-turu', starting_price:14200, main_image:'/images/luxury_yacht_sunset.png' },
  { id:'e3', title:'Adalar Turu', slug:'adalar-tur', starting_price:29500, main_image:'/images/img2.jpg' },
  { id:'e4', title:'Evlilik Teklifi', slug:'evlilik-teklifi', starting_price:14200, main_image:'/images/img3.jpg' },
];

const yachts = computed(() => { const d = homeData.value?.yachts; return d?.length ? d : fallbackYachts; });
const experiences = computed(() => { const d = homeData.value?.experiences; return d?.length ? d : fallbackExperiences; });
const allReviews = computed(() => homeData.value?.reviews || []);

const settingsForm = ref<Record<string,any>>({
  hero_title: 'İstanbul Boğazında\nNereye Gidiyorsunuz?',
  hero_subtitle: '',
  hero_badge: 'Türkiye\'nin #1 Yat Kiralama Platformu',
  stats_years: '16+', stats_rating: '4.8', stats_guests: '65Bin+',
});

watch(() => homeData.value?.settings, (s) => {
  if (s?.length) {
    s.forEach((item: any) => { if (settingsForm.value[item.key_name] !== undefined) settingsForm.value[item.key_name] = item.value; });
    useSeoMeta({ title: settingsForm.value.site_meta_title||'YatigoTR Yatçılık', description: settingsForm.value.site_meta_description||'İstanbul Boğazı\'nda özel yat kiralama.' });
  }
}, { immediate: true });
</script>
