<template>
  <main class="w-full bg-[#FAFAFA] min-h-screen font-sans selection:bg-[#0C2340] selection:text-white pb-24">
    
    <!-- LÜKS GALERİ ALANI (KOYU LACİVERT ARKAPLAN) -->
    <section class="bg-[#0C2340] pt-32 pb-16 relative">
      <!-- Breadcrumb -->
      <div class="max-w-[1300px] mx-auto px-6 lg:px-8 mb-6">
        <div class="flex items-center gap-2 text-[12px] font-medium text-white/50">
          <NuxtLink to="/" class="hover:text-white transition-colors">Ana Sayfa</NuxtLink>
          <span class="text-white/30">/</span>
          <NuxtLink to="/yatlarimiz" class="hover:text-white transition-colors">Yatlarımız</NuxtLink>
          <span class="text-white/30">/</span>
          <span class="text-white">{{ yacht?.name || 'Yükleniyor...' }}</span>
        </div>
      </div>

      <!-- Galeri Grid -->
      <div v-if="yacht" class="max-w-[1300px] mx-auto px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row gap-4 h-[50vh] lg:h-[65vh] min-h-[450px] max-h-[700px]">
          <!-- Ana Görsel (Sol) -->
          <div class="w-full lg:w-[65%] h-full relative group rounded-[20px] overflow-hidden bg-black shadow-lg">
            <img 
              :src="galleryImages[currentImageIndex]?.src || '/images/default.jpg'" 
              :alt="galleryImages[currentImageIndex]?.alt" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer"
              @click="openLightbox(currentImageIndex)"
            />
            <!-- Sol / Sağ Oklar -->
            <button @click.stop="prevImage" class="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#0C2340] shadow-md hover:bg-white hover:scale-105 transition-all z-10">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button @click.stop="nextImage" class="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#0C2340] shadow-md hover:bg-white hover:scale-105 transition-all z-10">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
            </button>
            
            <div class="absolute bottom-5 left-5 bg-black/60 backdrop-blur-md text-white text-[12px] font-semibold px-4 py-2 rounded-full z-10 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              {{ currentImageIndex + 1 }} / {{ galleryImages.length }}
            </div>

            <!-- Galeriyi Görüntüle Butonu -->
            <button @click.stop="openLightbox(0)" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md text-[#0C2340] font-bold text-[14px] px-6 py-3.5 rounded-full flex items-center gap-2 hover:bg-white hover:scale-105 transition-all shadow-xl z-10">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
              Galeriyi Görüntüle
            </button>
          </div>

          <!-- Sağ Görseller -->
          <div class="hidden lg:flex w-[35%] h-full flex-col gap-4">
            <div @click="openLightbox(1)" v-if="galleryImages[1]" class="h-[calc(33.333%-10.66px)] rounded-[20px] overflow-hidden bg-black relative group shadow-lg cursor-pointer">
              <img :src="galleryImages[1]?.src" :alt="galleryImages[1]?.alt" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div @click="openLightbox(2)" v-if="galleryImages[2]" class="h-[calc(33.333%-10.66px)] rounded-[20px] overflow-hidden bg-black relative group shadow-lg cursor-pointer">
              <img :src="galleryImages[2]?.src" :alt="galleryImages[2]?.alt" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div @click="openLightbox(3)" v-if="galleryImages[3]" class="h-[calc(33.333%-10.66px)] rounded-[20px] overflow-hidden bg-black relative group cursor-pointer shadow-lg">
              <img :src="galleryImages[3]?.src" :alt="galleryImages[3]?.alt" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div v-if="galleryImages.length > 4" class="absolute inset-0 bg-[#0C2340]/50 backdrop-blur-[2px] flex items-center justify-center transition-colors group-hover:bg-[#0C2340]/60">
                <span class="text-white font-bold text-3xl">+{{ galleryImages.length - 4 }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ANA İÇERİK ALANI -->
    <div v-if="yacht" class="max-w-[1300px] mx-auto px-6 lg:px-8 mt-10 relative z-20">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        
        <!-- SOL KOLON (DETAYLAR) -->
        <div class="lg:col-span-8">
          
          <h1 class="text-[40px] font-extrabold text-[#0C2340] leading-tight mb-5 tracking-tight">{{ yacht.name }}</h1>
          
          <!-- Özellik Rozetleri -->
          <div class="flex flex-wrap gap-3 mb-8">
            <div v-if="yacht.capacity" class="bg-[#EBF3F5] text-[#1A7B8A] px-4 py-2.5 rounded-full flex items-center gap-2 font-bold text-[13px]">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
              maks. {{ yacht.capacity }} kişi
            </div>
            <div v-if="yacht.length" class="bg-[#EBF3F5] text-[#1A7B8A] px-4 py-2.5 rounded-full flex items-center gap-2 font-bold text-[13px]">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
              {{ yacht.length }}m
            </div>
            <div class="bg-[#FDF8EE] text-[#B8860B] px-4 py-2.5 rounded-full flex items-center gap-2 font-bold text-[13px]">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
              Yemek Kapasitesi: {{ Math.max(10, yacht.capacity - 4) }}
            </div>
          </div>

          <p class="text-[#4A5568] text-[16px] leading-relaxed mb-10 font-medium">
            {{ yacht.short_description || `${yacht.name} ile şık ve konforlu bir Boğaz deneyimi. Orta ölçekli gruplar için ideal, ${yacht.capacity} kişilik kapasite.` }}
          </p>

          <hr class="border-[#E2E8F0] mb-10" />

          <!-- Yat Hakkında -->
          <div class="mb-12">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-12 h-12 bg-[#EBF3F5] rounded-2xl flex items-center justify-center text-[#0C2340]">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              </div>
              <h2 class="text-[24px] font-bold text-[#0C2340]">Yat Hakkında</h2>
            </div>
            
            <div class="prose prose-lg max-w-none text-[#4A5568] leading-relaxed mb-8">
              <div v-html="yacht.description || `${yacht.name}, orta ölçekli gruplar için tasarlanmış şık ve konforlu bir yattır. ${yacht.length} metrelik zarif yapısıyla ${yacht.capacity} kişiye kadar misafir ağırlayabilir.<br><br>Modern iç tasarımı, geniş güvertesi ve tam donanımlı olanakları ile hem iş toplantıları hem de özel kutlamalar için uygundur.`"></div>
            </div>

            <!-- Öne Çıkan Özellikler -->
            <h3 v-if="features.length" class="text-[#0C2340] font-bold text-[17px] mb-4">Öne Çıkan Özellikler:</h3>
            <ul v-if="features.length" class="space-y-3 mb-10 text-[#4A5568] text-[15px]">
              <li v-for="(feat, idx) in features" :key="'feat-'+idx" class="flex items-center gap-3">
                <span class="w-1.5 h-1.5 bg-[#4A5568] rounded-full"></span>{{ feat }}
              </li>
            </ul>

            <!-- Esnek Kapasite Box -->
            <div class="bg-[#F4F8FA] border border-[#E2E8F0] rounded-2xl p-6 flex items-start gap-4">
              <div class="w-10 h-10 bg-[#E2E8F0] rounded-full flex items-center justify-center shrink-0 text-[#0C2340]">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div>
                <h4 class="text-[#0C2340] font-bold text-[16px] mb-1">Esnek Kapasite</h4>
                <p class="text-[#4A5568] text-[14px] leading-relaxed">
                  Bu yat 1 kişiden {{ yacht.capacity }} kişiye kadar konforlu bir deneyim sunar. İster romantik bir ikili kaçamak, ister arkadaşlarınızla eğlenceli bir gün, isterse de büyük bir kutlama olsun - her türlü organizasyona uygundur.
                </p>
              </div>
            </div>
          </div>

          <!-- Olanaklar & Özellikler -->
          <div v-if="amenities.length" class="mb-12">
            <div class="flex items-center gap-4 mb-8">
              <div class="w-12 h-12 bg-[#FDF8EE] rounded-2xl flex items-center justify-center text-[#B8860B]">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
              </div>
              <h2 class="text-[24px] font-bold text-[#0C2340]">Olanaklar & Özellikler</h2>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-for="amenity in amenities" :key="amenity" class="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                <div class="w-6 h-6 rounded-md bg-[#ECFDF5] text-[#10B981] flex items-center justify-center shrink-0">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                </div>
                <span class="text-[#0C2340] font-medium text-[14px] leading-tight">{{ amenity }}</span>
              </div>
            </div>
          </div>
          
        </div>

        <!-- SAĞ KOLON (REZERVASYON / FİYAT KARTI) -->
        <div class="lg:col-span-4">
          <div class="sticky top-28 space-y-6">
            
            <!-- Ana Fiyat Kartı -->
            <div class="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden">
              <!-- Kart Üst Lacivert Kısım -->
              <div class="bg-[#0C2340] p-8 text-white relative">
                <p class="text-white/80 text-[13px] font-medium mb-1">Saatlik Fiyat</p>
                <div class="flex items-end gap-2">
                  <span class="text-[40px] font-bold leading-none tracking-tight">{{ Number(yacht.price_hourly).toLocaleString('tr-TR') }}</span>
                  <span class="text-white font-bold text-[18px] mb-1">TL <span class="text-white/60 text-[14px] font-normal">/ saat</span></span>
                </div>
              </div>
              
              <!-- Kart Alt Kısım -->
              <div class="p-8">
                <p class="text-center text-[#6B7A8D] text-[13px] font-medium mb-5">Minimum kiralama süresi: 2 saat</p>
                
                <div class="bg-[#FFFDF4] border border-[#FBE3B3] rounded-xl p-3 flex items-center justify-center gap-2 text-[#D97706] font-bold text-[12px] mb-6 shadow-sm">
                  <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                  Yoğun talep, erken rezervasyon önerilir
                </div>

                <div class="flex flex-col gap-3">
                  <NuxtLink :to="`/rezervasyon?yacht_id=${yacht.id}`" class="w-full bg-[#1A5B8A] text-white py-4 rounded-xl font-bold text-[15px] hover:bg-[#124266] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                    Bu Yatla Rezervasyon Yap
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </NuxtLink>
                  
                  <a href="https://wa.me/905441014343" target="_blank" class="w-full bg-[#10B981] text-white py-4 rounded-xl font-bold text-[15px] hover:bg-[#059669] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <!-- Paket Turlar Kartı -->
            <div class="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-8">
              <div class="flex items-center gap-3 mb-6">
                <div class="text-[#D97706]">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/></svg>
                </div>
                <h3 class="text-[#0C2340] font-bold text-[18px]">Paket Turlar</h3>
              </div>
              
              <div class="space-y-4">
                <div class="bg-[#F8F9FA] rounded-xl p-5 hover:bg-[#F1F5F9] transition-colors cursor-pointer group">
                  <div class="flex justify-between items-start mb-1">
                    <span class="font-bold text-[#0C2340] text-[15px] group-hover:text-[#1A5B8A] transition-colors">Tam Gün Adalar Turu (8 saat)</span>
                    <span class="font-bold text-[#1A5B8A] text-[15px]">{{ Number(yacht.price_adalar || yacht.price_hourly * 8).toLocaleString('tr-TR') }} TL</span>
                  </div>
                  <p class="text-[#6B7A8D] text-[13px]">8 saat</p>
                </div>
                <div class="bg-[#F8F9FA] rounded-xl p-5 hover:bg-[#F1F5F9] transition-colors cursor-pointer group">
                  <div class="flex justify-between items-start mb-1">
                    <span class="font-bold text-[#0C2340] text-[15px] group-hover:text-[#1A5B8A] transition-colors">Tam Gün Boğaz Turu (8 saat)</span>
                    <span class="font-bold text-[#1A5B8A] text-[15px]">{{ Number(yacht.price_bogaz || yacht.price_hourly * 8).toLocaleString('tr-TR') }} TL</span>
                  </div>
                  <p class="text-[#6B7A8D] text-[13px]">8 saat</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      <!-- DİĞER YATLARIMIZ -->
      <div v-if="otherYachts && otherYachts.length > 0" class="mt-24 pt-16">
        <div class="text-center mb-12">
          <h2 class="text-[32px] font-extrabold text-[#0C2340] mb-3">Diğer Yatlarımız</h2>
          <p class="text-[#6B7A8D] text-[15px]">Filomuzda farklı boyutlarda ve kapasitelerde yatlar mevcut.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink v-for="oy in otherYachts" :key="oy.id" :to="`/yatlarimiz/${oy.slug}`" class="bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
            <div class="h-[240px] overflow-hidden relative">
              <img :src="oy.main_image || '/images/default.jpg'" :alt="oy.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div class="p-6 flex flex-col flex-grow">
              <h3 class="text-[#0C2340] font-bold text-[18px] mb-3">{{ oy.name }}</h3>
              <div class="flex items-center gap-4 text-[#6B7A8D] text-[13px] mb-6 font-medium">
                <span class="flex items-center gap-1.5"><svg class="w-4 h-4 text-[#6B7A8D]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>{{ oy.capacity }} kişi</span>
                <span v-if="oy.length">{{ oy.length }}m</span>
              </div>
              <div class="mt-auto flex items-center justify-between">
                <div class="text-[#1A5B8A] font-bold text-[18px]">
                  {{ Number(oy.price_hourly).toLocaleString('tr-TR') }} TL<span class="text-[12px] font-normal text-[#6B7A8D]">/saat</span>
                </div>
                <div class="text-[#1A5B8A] group-hover:translate-x-1 transition-transform">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div class="text-center mt-12">
          <NuxtLink to="/yatlarimiz" class="inline-flex items-center justify-center gap-2 border border-[#1A5B8A] text-[#1A5B8A] font-bold text-[14px] px-8 py-3.5 rounded-full hover:bg-[#F8F9FA] transition-colors">
            Tüm Yatları Görüntüle
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </NuxtLink>
        </div>
      </div>

    </div>
    
    <!-- LIGHTBOX MODAL -->
    <Teleport to="body">
      <div v-if="isLightboxOpen" class="fixed inset-0 z-[9999] bg-black/95 flex flex-col items-center justify-center p-4 lg:p-10" @click="closeLightbox">
        <button @click.stop="closeLightbox" class="absolute top-6 right-6 lg:top-10 lg:right-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-50">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <div class="relative w-full max-w-6xl h-full flex items-center justify-center" @click.stop>
          <img :src="galleryImages[lightboxIndex]?.src" :alt="galleryImages[lightboxIndex]?.alt" class="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl" />
          
          <button @click.stop="prevLightboxImage" class="absolute left-2 lg:-left-12 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button @click.stop="nextLightboxImage" class="absolute right-2 lg:-right-12 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
        
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 font-medium">
          {{ lightboxIndex + 1 }} / {{ galleryImages.length }}
        </div>
      </div>
    </Teleport>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useAsyncData, useSupabaseClient, useSeoMeta, definePageMeta, useHead, useSchemaOrg, defineBreadcrumb, defineProduct } from '#imports';

const route = useRoute();
definePageMeta({ layout: "custom" });

const supabase = useSupabaseClient();
const slug = route.params.slug as string;

const { data: pageData, pending } = await useAsyncData<{yacht: any, otherYachts: any[]}>(`yacht-page-${slug}`, async () => {
    const { data: yacht } = await (supabase as any).from('yachts').select('*').eq('slug', slug).single();
    let otherYachts: any[] = [];
    if (yacht) {
        const { data: others } = await (supabase as any).from('yachts')
            .select('*')
            .neq('id', yacht.id)
            .limit(20);
        if (others && others.length > 0) {
            otherYachts = others.sort(() => 0.5 - Math.random()).slice(0, 3);
        }
    }
    return { yacht, otherYachts };
});

const yacht = computed(() => pageData.value?.yacht);
const otherYachts = computed(() => pageData.value?.otherYachts || []);

// Dynamic data parsers
const features = computed(() => {
    if (!yacht.value || !yacht.value.features) return [];
    if (Array.isArray(yacht.value.features)) return yacht.value.features;
    try { return JSON.parse(yacht.value.features); } catch { return []; }
});

const amenities = computed(() => {
    if (!yacht.value || !yacht.value.amenities) return [];
    if (Array.isArray(yacht.value.amenities)) return yacht.value.amenities;
    try { return JSON.parse(yacht.value.amenities); } catch { return []; }
});

const galleryImages = computed(() => {
    if (!yacht.value) return [];
    let imgs = [];
    if (yacht.value.main_image) {
        imgs.push({ src: yacht.value.main_image, alt: yacht.value.main_image_alt || yacht.value.name });
    }
    if (yacht.value.gallery) {
        let parsedUrls = yacht.value.gallery;
        if (typeof parsedUrls === 'string') {
           try { parsedUrls = JSON.parse(parsedUrls); } catch(e) {}
        }
        let parsedAlts = yacht.value.gallery_alts || [];
        if (typeof parsedAlts === 'string') {
           try { parsedAlts = JSON.parse(parsedAlts); } catch(e) {}
        }
        if (Array.isArray(parsedUrls)) {
            parsedUrls.forEach((url, idx) => {
                imgs.push({ src: url, alt: parsedAlts[idx] || `${yacht.value.name} - Görsel ${idx + 1}` });
            });
        }
    }
    return imgs.length > 0 ? imgs : [{ src: '/images/img1.jpg', alt: yacht.value?.name || 'Yat Resmi' }];
});

// --- GALLERY & LIGHTBOX LOGIC ---
const currentImageIndex = ref(0);

const prevImage = () => {
  if (galleryImages.value.length === 0) return;
  currentImageIndex.value = currentImageIndex.value === 0 ? galleryImages.value.length - 1 : currentImageIndex.value - 1;
};

const nextImage = () => {
  if (galleryImages.value.length === 0) return;
  currentImageIndex.value = currentImageIndex.value === galleryImages.value.length - 1 ? 0 : currentImageIndex.value + 1;
};

const isLightboxOpen = ref(false);
const lightboxIndex = ref(0);

const openLightbox = (index: number) => {
  lightboxIndex.value = index;
  isLightboxOpen.value = true;
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden';
  }
};

const closeLightbox = () => {
  isLightboxOpen.value = false;
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
  }
};

const prevLightboxImage = () => {
  if (galleryImages.value.length === 0) return;
  lightboxIndex.value = lightboxIndex.value === 0 ? galleryImages.value.length - 1 : lightboxIndex.value - 1;
};

const nextLightboxImage = () => {
  if (galleryImages.value.length === 0) return;
  lightboxIndex.value = lightboxIndex.value === galleryImages.value.length - 1 ? 0 : lightboxIndex.value + 1;
};

const handleKeydown = (e: KeyboardEvent) => {
  if (!isLightboxOpen.value) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevLightboxImage();
  if (e.key === 'ArrowRight') nextLightboxImage();
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
  }
});
// --------------------------------

useSeoMeta({
  title: () => yacht.value?.meta_title || `${yacht.value?.name || 'Yat Detay'} | Lüks Yat Kiralama`,
  description: () => yacht.value?.meta_description || yacht.value?.description || "İstanbul Boğazında lüks yat kiralama detayları.",
  keywords: () => yacht.value?.meta_keywords || ''
});

useSchemaOrg([
  defineBreadcrumb({ itemListElement: [{ name: "Ana Sayfa", item: "/" }, { name: "Yatlarımız", item: "/yatlarimiz" }, { name: () => yacht.value?.name || "Detay", item: () => `/yatlarimiz/${yacht.value?.slug}` }] }),
  defineProduct({ name: () => yacht.value?.name, description: () => yacht.value?.meta_description || "İstanbul Boğazı lüks kiralık yat.", image: () => yacht.value?.main_image || "/images/img1.jpg", offers: [{ price: () => yacht.value?.price_hourly || 0, priceCurrency: "TRY", availability: "InStock" }] })
]);

useHead(() => {
    return { link: [{ rel: 'canonical', href: `https://yatigotr.com/yatlarimiz/${route.params.slug}` }] };
});
</script>