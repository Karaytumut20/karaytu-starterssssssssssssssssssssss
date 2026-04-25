<template>
  <div class="bg-[#f4f7f6] min-h-screen text-[#0b213b] font-sans pb-32 pt-24 selection:bg-[#1d4e89] selection:text-white">
    
    <!-- MAIN CHECKOUT AREA -->
    <div class="max-w-[1400px] mx-auto px-4 lg:px-6 relative z-10">
      
      <!-- Top Title -->
      <div class="mb-10 text-center">
        <h1 class="text-3xl md:text-4xl font-extrabold text-[#0b213b] mb-2">Rezervasyon Oluştur</h1>
        <p class="text-gray-500 text-sm">Deneyiminiz için mükemmel yatı ve detayları seçin.</p>
      </div>

      <div v-if="loadingYachts" class="flex justify-center py-20">
         <svg class="animate-spin h-12 w-12 text-[#1d4e89]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      </div>
      
      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        <!-- LEFT COLUMN: Steps -->
        <div class="lg:col-span-8 space-y-6">
           
          <!-- STEP 1: Yat Seçin -->
          <div class="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] p-6 md:p-8">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-12 h-12 shrink-0 rounded-full bg-[#e8f0fe] flex items-center justify-center text-[#1a73e8]">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1z M13 8h6a1 1 0 011 1v7a1 1 0 01-1 1h-6"/></svg>
              </div>
              <div>
                <h2 class="text-xl font-bold text-[#0b213b] flex items-center gap-2">Yat Seçin <span class="text-red-500">*</span></h2>
                <p class="text-[13px] text-gray-500 mt-1">Deneyiminiz için mükemmel yatı seçin</p>
              </div>
            </div>

            <!-- Lock Badge -->
            <div v-if="hasLockId" class="mb-6 bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-4">
               <svg class="w-6 h-6 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
               <div>
                  <p class="text-red-600 font-bold text-sm">Yatınız Geçici Olarak Kilitlendi</p>
                  <p class="text-red-500/80 text-xs mt-1">Başka biri tarafından alınmadan önce işlemi tamamlayın.</p>
               </div>
            </div>

            <!-- Yachts Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div v-for="y in realYachts" :key="y.id" 
                   @click="!hasLockId && (selectedYacht = y.id)"
                   :class="[
                     'rounded-[20px] overflow-hidden border-2 cursor-pointer transition-all duration-300 relative group flex flex-col',
                     selectedYacht === y.id ? 'border-[#1a73e8] shadow-[0_8px_30px_rgba(26,115,232,0.12)]' : 'border-gray-100 hover:border-gray-300 shadow-sm'
                   ]">
                
                <!-- Image Area -->
                <div class="h-[200px] relative overflow-hidden">
                  <img :src="y.main_image || '/images/default.jpg'" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div class="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-lg">
                    {{ y.length || '24.0' }}m
                  </div>
                  <div class="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-[#0b213b] text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-sm cursor-pointer hover:bg-white transition-colors">
                    Detayları Görüntüle
                  </div>
                </div>

                <!-- Content Area -->
                <div class="p-5 flex flex-col flex-1 bg-white">
                  <h3 class="font-extrabold text-[#0b213b] text-[17px] mb-3">{{ y.name }}</h3>
                  
                  <div class="flex items-center gap-4 text-[12px] text-gray-500 mb-4">
                    <span>Maks Kişi: <strong class="text-[#0b213b]">{{ y.capacity }}</strong></span>
                    <span>Maks Yemek Düzeni: <strong class="text-[#0b213b]">{{ Math.max(1, y.capacity - 4) }}</strong></span>
                  </div>

                  <div class="flex items-baseline gap-1 mb-5">
                    <span class="text-[20px] font-black text-[#1d4e89]">{{ Number(y.price_hourly || 0).toLocaleString('tr-TR') }} TL</span>
                    <span class="text-[12px] text-gray-400">/ saat başı</span>
                  </div>

                  <div class="flex justify-between items-center text-[12px] mb-4 pb-4 border-b border-gray-100">
                    <span class="text-gray-500">Tam Gün Ada veya Boğaz Turu</span>
                    <strong class="text-[#0b213b]">{{ Number((y.price_hourly || 0) * 8).toLocaleString('tr-TR') }} TL</strong>
                  </div>

                  <div class="flex items-center justify-between text-[10.5px] text-gray-500 mt-auto flex-wrap gap-y-2">
                    <span class="flex items-center gap-1"><svg class="w-3 h-3 text-[#34A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg> Kaptan ve mürettebat dahil</span>
                    <span class="flex items-center gap-1"><svg class="w-3 h-3 text-[#34A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg> Yakıt dahil</span>
                    <span class="flex items-center gap-1"><svg class="w-3 h-3 text-[#34A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg> Sigorta dahil</span>
                  </div>
                </div>

                <!-- Selected Overlay Ring -->
                <div v-if="selectedYacht === y.id" class="absolute top-4 right-4 w-6 h-6 bg-[#1a73e8] rounded-full flex items-center justify-center shadow-md">
                  <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                </div>
              </div>
            </div>
          </div>

          <!-- STEP 2: Tur Detayları -->
          <div class="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] p-6 md:p-8">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-12 h-12 shrink-0 rounded-full bg-[#f4f7fe] flex items-center justify-center text-[#1d4e89]">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              </div>
              <div>
                <h2 class="text-xl font-bold text-[#0b213b]">Tur Detayları</h2>
                <p class="text-[13px] text-gray-500 mt-1">Paket, misafir sayısı, süre ve lokasyonu belirleyin</p>
              </div>
            </div>

            <div class="space-y-5">
              <div>
                 <label class="block text-[11px] font-bold text-[#1d4e89] uppercase tracking-wider mb-2">TUR TİPİ <span class="text-red-500">*</span></label>
                 <select v-model="tourType" class="w-full bg-[#f8fafc] border border-gray-200 text-[#0b213b] font-semibold text-[14px] rounded-[14px] py-4 px-5 outline-none focus:border-[#1d4e89] transition-colors appearance-none relative">
                    <option value="Saatlik Kiralama">Saatlik Kiralama</option>
                    <option value="Tam Gün Adalar Turu (8 saat)">Tam Gün Adalar Turu (8 saat)</option>
                 </select>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                   <label class="block text-[11px] font-bold text-[#1d4e89] uppercase tracking-wider mb-2">MİSAFİR SAYISI <span class="text-red-500">*</span></label>
                   <div class="flex items-center justify-between bg-[#f8fafc] border border-gray-200 rounded-[14px] px-2 h-[56px] focus-within:border-[#1d4e89]">
                      <button type="button" @click="guestCount > 1 && guestCount--" class="w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#0b213b] hover:bg-white transition-colors shadow-sm"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg></button>
                      <span class="text-[15px] font-bold text-[#0b213b]">{{ guestCount }}</span>
                      <button type="button" @click="guestCount < 100 && guestCount++" class="w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#0b213b] hover:bg-white transition-colors shadow-sm"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg></button>
                   </div>
                </div>
                <div>
                   <label class="block text-[11px] font-bold text-[#1d4e89] uppercase tracking-wider mb-2">TUR SÜRESİ <span class="text-red-500">*</span></label>
                   <div class="flex items-center justify-between bg-[#f8fafc] border border-gray-200 rounded-[14px] px-2 h-[56px] focus-within:border-[#1d4e89]">
                      <button type="button" @click="!hasLockId && duration > 2 && duration--" :disabled="hasLockId" class="w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#0b213b] hover:bg-white transition-colors disabled:opacity-30 shadow-sm"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg></button>
                      <span class="text-[15px] font-bold text-[#0b213b]">{{ duration }}</span>
                      <button type="button" @click="!hasLockId && duration < 168 && duration++" :disabled="hasLockId" class="w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#0b213b] hover:bg-white transition-colors disabled:opacity-30 shadow-sm"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg></button>
                   </div>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                   <label class="block text-[11px] font-bold text-[#1d4e89] uppercase tracking-wider mb-2">ALIŞ NOKTASI <span class="text-red-500">*</span></label>
                   <select v-model="pickupPoint" class="w-full bg-[#f8fafc] border border-gray-200 text-[#0b213b] font-semibold text-[14px] rounded-[14px] py-4 px-5 outline-none focus:border-[#1d4e89] transition-colors appearance-none">
                      <option value="Arnavutköy">Arnavutköy</option>
                      <option value="Bebek">Bebek</option>
                      <option value="Kuruçeşme">Kuruçeşme</option>
                   </select>
                </div>
                <div>
                   <label class="block text-[11px] font-bold text-[#1d4e89] uppercase tracking-wider mb-2">BIRAKIŞ NOKTASI <span class="text-red-500">*</span></label>
                   <select v-model="dropoffPoint" class="w-full bg-[#f8fafc] border border-gray-200 text-[#0b213b] font-semibold text-[14px] rounded-[14px] py-4 px-5 outline-none focus:border-[#1d4e89] transition-colors appearance-none">
                      <option value="Arnavutköy">Arnavutköy</option>
                      <option value="Bebek">Bebek</option>
                      <option value="Kuruçeşme">Kuruçeşme</option>
                   </select>
                </div>
              </div>
            </div>
          </div>

          <!-- STEP 3: Tarih ve Saat -->
          <div class="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] p-6 md:p-8">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-12 h-12 shrink-0 rounded-full bg-[#f3e8ff] flex items-center justify-center text-[#9333ea]">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              </div>
              <div>
                <h2 class="text-xl font-bold text-[#0b213b]">Tarih ve Saat</h2>
                <p class="text-[13px] text-gray-500 mt-1">Turunuz için tarih ve saat seçin</p>
              </div>
            </div>

            <div class="border border-gray-200 rounded-[20px] p-6 mb-5">
              <!-- Custom Calendar Header -->
              <div class="flex justify-between items-center mb-6">
                <button type="button" @click="prevMonth" class="text-gray-400 hover:text-[#0b213b] transition-colors"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg></button>
                <span class="font-bold text-[#0b213b] text-[15px] capitalize">{{ currentMonthName }}</span>
                <button type="button" @click="nextMonth" class="text-gray-400 hover:text-[#0b213b] transition-colors"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg></button>
              </div>

              <!-- Days Header -->
              <div class="grid grid-cols-7 gap-2 mb-4 text-center">
                <span class="text-[10px] font-bold text-gray-400">PZT</span>
                <span class="text-[10px] font-bold text-gray-400">SAL</span>
                <span class="text-[10px] font-bold text-gray-400">ÇAR</span>
                <span class="text-[10px] font-bold text-gray-400">PER</span>
                <span class="text-[10px] font-bold text-gray-400">CUM</span>
                <span class="text-[10px] font-bold text-gray-400">CMT</span>
                <span class="text-[10px] font-bold text-gray-400">PAZ</span>
              </div>

              <!-- Days Grid -->
              <div class="grid grid-cols-7 gap-y-3 gap-x-2 text-center text-[13px] font-semibold">
                <div v-for="(dayObj, index) in calendarDays" :key="index">
                  <div v-if="!dayObj.isCurrentMonth" class="text-gray-300 py-1.5">{{ dayObj.day }}</div>
                  <div v-else-if="selectedDate === dayObj.dateStr" class="bg-[#1d4e89] text-white py-1.5 cursor-pointer rounded-lg font-bold shadow-md" @click="selectedDate = dayObj.dateStr">{{ dayObj.day }}</div>
                  <div v-else class="text-gray-500 py-1.5 cursor-pointer hover:bg-gray-100 rounded-lg" @click="selectedDate = dayObj.dateStr">{{ dayObj.day }}</div>
                </div>
              </div>
            </div>

            <!-- Time Picker -->
            <div class="border border-gray-200 rounded-[20px] p-6 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
               <div class="flex items-center gap-2 mb-5">
                  <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  <span class="text-[13px] font-bold text-[#0b213b]">Tur başlangıç saati seçin</span>
                  <span class="text-[12px] text-gray-400 ml-1">{{ selectedDateStrFormatted }}</span>
               </div>

               <div class="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-7 gap-3 mb-6">
                  <button v-for="t in timeSlots" :key="t.time" 
                    @click="t.status === 'available' ? handleTimeSelection(t.time) : null"
                    :class="[
                      'py-2.5 rounded-xl border text-[13px] font-bold transition-all relative flex items-center justify-center',
                      t.status === 'available' && !isSlotSelected(t.time) ? 'border-[#b9d3e8] text-[#1d4e89] bg-white hover:bg-[#f0f4f8]' : '',
                      t.status === 'booked' ? 'border-red-200 text-red-400 bg-red-50/50 cursor-not-allowed' : '',
                      t.status === 'busy' ? 'border-gray-200 text-gray-400 bg-gray-100 cursor-not-allowed' : '',
                      isSlotSelected(t.time) ? 'border-[#1d4e89] bg-[#e8f0fe] text-[#1d4e89] ring-1 ring-[#1d4e89]' : ''
                    ]">
                    {{ t.time }}
                    <!-- Booked Notification Icon -->
                    <div v-if="t.status === 'booked'" class="absolute -top-1.5 -right-1.5 bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                       <svg class="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                    </div>
                  </button>
               </div>
               
               <!-- Legend -->
               <div class="flex items-center gap-5 text-[11px] font-semibold text-gray-500 pt-2 border-t border-gray-100">
                 <div class="flex items-center gap-1.5"><div class="w-3 h-3 border border-[#b9d3e8] bg-white rounded-sm"></div> Müsait</div>
                 <div class="flex items-center gap-1.5"><div class="w-3 h-3 bg-red-50 border border-red-200 rounded-sm flex items-center justify-center"><div class="w-1.5 h-1.5 bg-red-500 rounded-full"></div></div> Rezerve</div>
                 <div class="flex items-center gap-1.5"><div class="w-3 h-3 bg-gray-100 border border-gray-200 rounded-sm"></div> Hazırlık</div>
               </div>
            </div>
          </div>

          <!-- STEP 4: Premium Ekstralar (White background) -->
          <div class="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] p-6 md:p-8">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-12 h-12 shrink-0 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
              </div>
              <div>
                <h2 class="text-xl font-bold text-[#0b213b] flex items-center gap-2">Premium Ekstralar <span class="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-widest">VIP</span></h2>
                <p class="text-[13px] text-gray-500 mt-1">Lüks deneyiminizi bir üst seviyeye taşıyın</p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               <div v-for="(item, idx) in extraServices" :key="idx" 
                 @click="toggleExtra(idx)"
                 :class="['relative overflow-hidden flex flex-col p-5 rounded-2xl cursor-pointer transition-all duration-300 border-2', 
                          selectedExtras.includes(idx) ? 'border-amber-500 bg-amber-50' : 'border-gray-100 bg-white hover:border-amber-200']">
                 
                 <!-- Check Icon -->
                 <div :class="['absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors z-10', 
                               selectedExtras.includes(idx) ? 'bg-amber-500 border-amber-500' : 'bg-transparent border-gray-200']">
                   <svg v-if="selectedExtras.includes(idx)" class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                 </div>

                 <!-- Icon -->
                 <div class="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4 text-xl">
                   {{ item.icon }}
                 </div>
                 
                 <div class="flex-1">
                   <h4 class="text-[14px] font-bold text-[#0b213b] mb-1.5">{{ item.name }}</h4>
                   <p class="text-[11px] text-gray-500 leading-relaxed mb-4">{{ item.desc }}</p>
                 </div>
                 
                 <div class="mt-auto pt-3 border-t border-gray-100">
                   <p class="text-[15px] font-black text-amber-600">+ {{ item.price }} <span v-if="item.type === 'person'" class="text-[10px] text-gray-400 font-semibold uppercase">/ kişi başı</span></p>
                 </div>
               </div>
            </div>
          </div>

          <!-- STEP 5: Rezervasyon Bilgileri -->
          <div class="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] p-6 md:p-8">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-12 h-12 shrink-0 rounded-full bg-[#e8f0fe] flex items-center justify-center text-[#1a73e8]">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              </div>
              <div>
                <h2 class="text-xl font-bold text-[#0b213b]">Rezervasyon Bilgileri</h2>
                <p class="text-[13px] text-gray-500 mt-1">Rezervasyon için iletişim bilgilerinizi girin</p>
              </div>
            </div>



            <div class="border border-gray-200 rounded-[20px] p-6 mb-5">
               <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                     <label class="block text-[12px] font-bold text-[#0b213b] mb-2">Ad Soyad <span class="text-red-500">*</span></label>
                     <input v-model="formName" type="text" class="w-full h-12 bg-[#f4f7f6] rounded-[12px] px-4 text-[14px] font-semibold text-[#0b213b] outline-none border border-transparent focus:border-[#1d4e89] transition-colors" />
                  </div>
                  <div>
                     <label class="block text-[12px] font-bold text-[#0b213b] mb-2">Telefon <span class="text-red-500">*</span> <span class="text-gray-400 font-normal text-[10px]">(en az birini girin)</span></label>
                     <input v-model="formPhone" type="tel" class="w-full h-12 bg-[#f4f7f6] rounded-[12px] px-4 text-[14px] font-semibold text-[#0b213b] outline-none border border-transparent focus:border-[#1d4e89] transition-colors" />
                  </div>
                  <div>
                     <label class="block text-[12px] font-bold text-[#0b213b] mb-2">E-posta <span class="text-red-500">*</span> <span class="text-gray-400 font-normal text-[10px]">(en az birini girin)</span></label>
                     <input v-model="formEmail" type="email" class="w-full h-12 bg-[#f4f7f6] rounded-[12px] px-4 text-[14px] font-semibold text-[#0b213b] outline-none border border-transparent focus:border-[#1d4e89] transition-colors" />
                  </div>
               </div>
            </div>

            <div class="border border-gray-200 rounded-[20px] p-6">
               <label class="block text-[12px] font-bold text-[#0b213b] mb-2">Notlar (opsiyonel)</label>
               <textarea v-model="formNotes" class="w-full h-24 bg-[#f4f7f6] rounded-[12px] p-4 text-[14px] font-semibold text-[#0b213b] outline-none border border-transparent focus:border-[#1d4e89] transition-colors resize-none"></textarea>
            </div>
          </div>

        </div>

        <!-- RIGHT COLUMN: Rezervasyon Özeti -->
        <div class="lg:col-span-4 relative sticky top-[120px] self-start z-20 w-full pb-10">
           <div class="border border-gray-200 bg-white rounded-[24px] overflow-hidden flex flex-col shadow-[0_4px_25px_rgba(0,0,0,0.03)] p-6 md:p-8">
              <!-- Summary Header -->
              <div class="flex items-center gap-3 mb-6">
                 <div class="w-10 h-10 rounded-full bg-[#f4f7fe] flex items-center justify-center text-[#1d4e89]">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                 </div>
                 <h3 class="text-[18px] font-bold text-[#0b213b]">Rezervasyon Özeti</h3>
              </div>

              <!-- Top Blue Box -->
              <div class="border border-[#b9d3e8] rounded-[16px] overflow-hidden mb-6 flex flex-col xl:flex-row relative">
                 <div class="flex flex-col flex-1">
                    <!-- Left Side Details -->
                    <div class="flex-1 p-5 border-b xl:border-b-0 xl:border-r border-[#b9d3e8]">
                       <div class="flex items-center gap-4 mb-6">
                          <img :src="realYachts.find(y=>y.id===selectedYacht)?.main_image || '/images/default.jpg'" class="w-20 h-12 rounded-lg object-cover" />
                          <div>
                             <h4 class="font-bold text-[#0b213b] text-[15px]">{{ realYachts.find(y=>y.id===selectedYacht)?.name || 'Yat Seçilmedi' }}</h4>
                             <p class="text-[12px] text-gray-500">{{ realYachts.find(y=>y.id===selectedYacht)?.capacity || '-' }} kişi kapasite</p>
                          </div>
                       </div>
                       
                       <div class="grid grid-cols-2 gap-3 mb-5">
                          <div class="border border-gray-200 rounded-xl p-3">
                             <p class="text-[11px] text-gray-500 mb-1">Tarih</p>
                             <p class="text-[13px] font-bold text-[#0b213b]">{{ selectedDate ? selectedDate.split('-').reverse().join('.') : 'Seçilmedi' }}</p>
                          </div>
                          <div class="border border-gray-200 rounded-xl p-3">
                             <p class="text-[11px] text-gray-500 mb-1">Saat</p>
                             <p class="text-[13px] font-bold text-[#0b213b]">{{ selectedTime || '-' }}</p>
                          </div>
                          <div class="border border-gray-200 rounded-xl p-3">
                             <p class="text-[11px] text-gray-500 mb-1">Süre</p>
                             <p class="text-[13px] font-bold text-[#0b213b]">{{ duration }} saat</p>
                          </div>
                          <div class="border border-gray-200 rounded-xl p-3">
                             <p class="text-[11px] text-gray-500 mb-1">kişi</p>
                             <p class="text-[13px] font-bold text-[#0b213b]">{{ guestCount }} kişi</p>
                          </div>
                       </div>

                       <div class="border border-gray-200 rounded-xl p-3 flex items-center justify-between">
                          <div>
                             <p class="text-[11px] text-gray-500 mb-1 flex items-center gap-2">Alış <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg> Bırakış</p>
                             <p class="text-[13px] font-bold text-[#0b213b]">{{ pickupPoint }} <svg class="w-3 h-3 inline text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg> {{ dropoffPoint }}</p>
                          </div>
                       </div>
                    </div>

                    <!-- Right Side Pricing -->
                    <div class="w-full xl:w-[260px] bg-white p-5 flex flex-col relative shrink-0">
                       <h4 class="font-bold text-[#0b213b] text-[15px] mb-4">Fiyat Detayı</h4>
                       <div class="flex justify-between items-center mb-2">
                          <span class="text-[13px] text-gray-600">Yat Kirası</span>
                          <span class="text-[13px] font-bold text-[#0b213b]">{{ formatNumber(yachtTotal) }} TL</span>
                       </div>
                       <div v-if="extrasTotal > 0" class="flex justify-between items-center mb-2">
                          <span class="text-[13px] text-gray-600">Ekstralar</span>
                          <span class="text-[13px] font-bold text-[#0b213b]">{{ formatNumber(extrasTotal) }} TL</span>
                       </div>
                       
                       <div class="mt-auto">
                          <div class="flex justify-between items-center py-4 border-t border-gray-100">
                             <span class="text-[16px] font-bold text-[#0b213b]">Toplam</span>
                             <span class="text-[20px] font-black text-[#1d4e89]">{{ formatNumber(grandTotal) }} TL</span>
                          </div>
                          
                          <div class="bg-[#f4f7fe] rounded-lg p-3 flex justify-between items-center">
                             <span class="text-[13px] text-gray-500">Depozito (50%)</span>
                             <span class="text-[14px] font-bold text-[#0b213b]">{{ formatNumber(depositAmount) }} TL</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>



              <!-- Terms Checkbox -->
              <div @click="acceptedTerms = !acceptedTerms" class="border border-gray-200 rounded-[16px] p-4 flex items-center gap-3 cursor-pointer mb-6 hover:bg-gray-50 transition-colors">
                 <div :class="['w-5 h-5 rounded-[4px] border-2 flex-shrink-0 flex items-center justify-center transition-all', acceptedTerms ? 'bg-[#1a73e8] border-[#1a73e8]' : 'bg-white border-gray-300']">
                   <svg v-if="acceptedTerms" class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                 </div>
                 <p class="text-[13px] text-gray-600 font-medium"><span class="text-[#1a73e8] font-bold hover:underline">Kullanım Koşulları</span> okudum ve kabul ediyorum.</p>
              </div>

              <!-- Submit Button -->
              <button type="button" @click="submitReservation"
                :disabled="!selectedYacht || !acceptedTerms || (!hasLockId && !selectedTime) || submitLoading"
                :class="[
                  'w-full py-4 rounded-[12px] font-bold text-[15px] flex items-center justify-center gap-2 transition-all duration-300 shadow-sm',
                  selectedYacht && acceptedTerms && (hasLockId || selectedTime) && !submitLoading
                    ? 'bg-[#9ca3af] text-white hover:bg-[#868e96] hover:shadow-md cursor-pointer' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
                ]">
                 <svg v-if="submitLoading" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                 <span v-else>&gt;</span>
                 <span>{{ submitLoading ? 'İşleniyor...' : 'Öde ve Rezervasyonu Tamamla' }}</span>
              </button>
              <p v-if="!acceptedTerms || !selectedYacht || (!hasLockId && !selectedTime)" class="text-center text-[11px] text-gray-400 mt-3">Devam etmek için {{ (!acceptedTerms ? 1 : 0) + (!selectedYacht ? 1 : 0) + ((!hasLockId && !selectedTime) ? 1 : 0) }} alan doldurulmalı</p>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { siteConfig } from "~/utils/site";
import { useRoute, useSupabaseUser, useSupabaseClient, navigateTo, definePageMeta } from "#imports";

definePageMeta({ layout: "custom" });

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const route = useRoute();

const selectedYacht = ref<string | number | null>(route.query.yacht_id ? String(route.query.yacht_id) : null);
const guestCount = ref(2);
const duration = ref((route.query.duration as string | undefined) ? Number((route.query.duration as string | undefined)) : 2);
const tourType = ref((route.query.tourType as string) || "Saatlik Kiralama");

const pickupPoint = ref("Arnavutköy");
const dropoffPoint = ref("Arnavutköy");

const currentDate = ref(new Date());
const selectedDate = ref<string | null>((route.query.date as string | undefined) || new Date().toISOString().split('T')[0]);
const selectedTime = ref((route.query.time as string | undefined) ? String((route.query.time as string | undefined)) : '10:00');

const currentMonthName = computed(() => {
  return currentDate.value.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });
});

const prevMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
};
const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
};

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  
  const startingDay = firstDay === 0 ? 6 : firstDay - 1; 
  
  const days = [];
  for (let i = 0; i < startingDay; i++) {
    days.push({ day: daysInPrevMonth - startingDay + i + 1, isCurrentMonth: false, dateStr: '' });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    days.push({ day: i, isCurrentMonth: true, dateStr });
  }
  const remaining = Math.ceil(days.length / 7) * 7 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({ day: i, isCurrentMonth: false, dateStr: '' });
  }
  return days;
});

const selectedDateStrFormatted = computed(() => {
  if (!selectedDate.value) return '';
  return new Date(selectedDate.value).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' });
});

const lockId = route.query.lock_id ? String(route.query.lock_id) : null;
const hasLockId = computed(() => !!lockId);

const selectedExtras = ref<number[]>([]);
const acceptedTerms = ref(false);

const extraServices = [
  { name: 'VIP Vito Transfer', desc: 'Otelinizden yata lüks Vito ile gidiş-dönüş transfer.', icon: '🚐', price: '6.500 TL', val: 6500, type: 'fixed' },
  { name: 'Meze Tabağı', desc: 'Geleneksel Türk mezelerinden oluşan özel tabak.', icon: '🍱', price: '1.080 TL', val: 1080, type: 'person' },
  { name: 'Özel İçki/Yiyecek Servisi', desc: 'Dışarıdan getirdiğiniz ürünlerin profesyonel servisi.', icon: '🍷', price: '500 TL', val: 500, type: 'person' },
  { name: 'Meyve & Çerez Menüsü', desc: 'Taze mevsim meyveleri ve karışık lüks çerez.', icon: '🍇', price: '1.180 TL', val: 1180, type: 'person' },
  { name: 'Profesyonel Fotoğrafçı', desc: 'Tüm organizasyon boyunca profesyonel çekim.', icon: '📸', price: '12.500 TL', val: 12500, type: 'fixed' },
  { name: 'Kahvaltı Menüsü', desc: 'Serpme organik Boğaz kahvaltısı.', icon: '🍳', price: '1.395 TL', val: 1395, type: 'person' },
  { name: 'Akşam Yemeği Menüsü', desc: 'Balık veya et seçenekli lüks akşam yemeği.', icon: '🍽️', price: '2.150 TL', val: 2150, type: 'person' },
  { name: 'Özel Kutlama Pastası', desc: 'Kişiye özel tasarım kutlama pastası.', icon: '🎂', price: '2.250 TL', val: 2250, type: 'fixed' }
];

const generateBaseTimeSlots = () => {
  const slots = [];
  let hour = 0;
  let min = 0;
  for (let i = 0; i < 48; i++) { // 48 slots * 30 mins = 24 hours (00:00 to 23:30)
    const hStr = String(hour).padStart(2, '0');
    const mStr = min === 0 ? '00' : '30';
    slots.push({ time: `${hStr}:${mStr}`, status: 'available' });
    min += 30;
    if (min === 60) {
      min = 0;
      hour++;
    }
  }
  return slots;
};

const timeSlots = ref(generateBaseTimeSlots());
const allFetchedReservations = ref<any[]>([]);

const fetchAvailability = async () => {
  if (!selectedYacht.value || !selectedDate.value) return;
  
  // Önce tüm saatleri müsait olarak sıfırla
  timeSlots.value = generateBaseTimeSlots();
  
  // Çakışmaları görebilmek için mevcut tarihten -7 ve +7 gün aralığındaki rezervasyonları çekiyoruz
  const sDate = new Date(selectedDate.value);
  const startDateStr = new Date(sDate.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const endDateStr = new Date(sDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  const { data: reservations, error } = await supabase
    .from('reservations')
    .select('booking_date, start_time, duration_hours, amount_paid, payment_status, status')
    .eq('yacht_id', selectedYacht.value)
    .gte('booking_date', startDateStr)
    .lte('booking_date', endDateStr)
    .neq('status', 'cancelled');
    
  if (reservations && !error) {
    // Sadece kaporası alınmış veya ödenmiş olanları filtrele
    allFetchedReservations.value = reservations.filter((res: any) => {
       return res.amount_paid >= 1 || res.payment_status === 'partial' || res.payment_status === 'paid';
    });
    
    // Görüntülenen gün (selectedDate) için saat slotlarını güncelle
    allFetchedReservations.value.forEach((res: any) => {
        const resDate = new Date(`${res.booking_date}T${res.start_time}`);
        const resStartMs = resDate.getTime();
        const resEndMs = resStartMs + (res.duration_hours * 60 * 60 * 1000);
        
        timeSlots.value.forEach((slot: any) => {
            const slotDate = new Date(`${selectedDate.value}T${slot.time}:00`);
            const slotStartMs = slotDate.getTime();
            const slotEndMs = slotStartMs + (30 * 60 * 1000); // 30 dk slot
            
            if (resStartMs < slotEndMs && resEndMs > slotStartMs) {
                slot.status = 'booked';
                if (selectedTime.value === slot.time) {
                    selectedTime.value = ''; 
                }
            }
        });
    });
  }
};

watch([selectedYacht, selectedDate], () => {
  fetchAvailability();
}, { immediate: true });

const checkOverlap = (startTimeStr: string, durHours: number) => {
    const reqStartMs = new Date(`${selectedDate.value}T${startTimeStr}:00`).getTime();
    const reqEndMs = reqStartMs + (durHours * 60 * 60 * 1000);
    
    for (const res of allFetchedReservations.value) {
        const resStartMs = new Date(`${res.booking_date}T${res.start_time}`).getTime();
        const resEndMs = resStartMs + (res.duration_hours * 60 * 60 * 1000);
        
        if (reqStartMs < resEndMs && reqEndMs > resStartMs) {
            return true; // Overlaps
        }
    }
    return false; // No overlap
};

const isSlotSelected = (tTime: string) => {
  if (!selectedTime.value) return false;
  const reqStartMs = new Date(`${selectedDate.value}T${selectedTime.value}:00`).getTime();
  const reqEndMs = reqStartMs + (duration.value * 60 * 60 * 1000);
  
  const slotStartMs = new Date(`${selectedDate.value}T${tTime}:00`).getTime();
  
  return slotStartMs >= reqStartMs && slotStartMs <= reqEndMs;
};

const handleTimeSelection = (tTime: string) => {
  if (checkOverlap(tTime, duration.value)) {
     alert("Seçtiğiniz " + duration.value + " saatlik kiralama süresi, başka bir gün veya saatteki rezervasyon ile çakışıyor. Lütfen kiralama süresini kısaltın veya müsait olan başka bir saat seçin.");
  } else {
     selectedTime.value = tTime;
  }
};

watch(duration, () => {
   if (selectedTime.value) {
      if (checkOverlap(selectedTime.value, duration.value)) {
          selectedTime.value = '';
      }
   }
});

const realYachts = ref<any[]>([]);
const loadingYachts = ref(true);

const fetchYachts = async () => {
  try {
    const { data } = await supabase.from('yachts').select('*').eq('is_active', true);
    if (data) {
       realYachts.value = data;
       
       const queryYachtIdStr = String(route.query.yacht_id);
       if (queryYachtIdStr && ['1', '2', '3', '4'].includes(queryYachtIdStr)) {
          if (realYachts.value.length > 0) {
             selectedYacht.value = realYachts.value[0].id;
          } else {
             selectedYacht.value = null;
          }
       } else if (!selectedYacht.value && realYachts.value.length > 0) {
          selectedYacht.value = realYachts.value[0].id; // Select first by default
       }
    }
  } catch (error) {
    console.error(error);
  } finally {
    loadingYachts.value = false;
  }
};

const yachtTotal = computed(() => {
  if (!selectedYacht.value) return 0;
  const yacht = realYachts.value.find(y => y.id === selectedYacht.value);
  if (yacht && yacht.price_hourly) {
     return Number(yacht.price_hourly) * duration.value;
  }
  return 0;
});

const extrasTotal = computed(() => {
  return selectedExtras.value.reduce((total, idx) => {
    const srv = extraServices[idx]; if (!srv) return total;
    if (srv.type === 'person') {
       return total + (srv.val * guestCount.value);
    }
    return total + srv.val;
  }, 0);
});

const grandTotal = computed(() => yachtTotal.value + extrasTotal.value);
const depositAmount = computed(() => grandTotal.value / 2);

const formatNumber = (num: number) => {
  return num.toLocaleString('tr-TR');
};

const toggleExtra = (idx: number) => {
  const pos = selectedExtras.value.indexOf(idx);
  if (pos > -1) {
    selectedExtras.value.splice(pos, 1);
  } else {
    selectedExtras.value.push(idx);
  }
};

const formName = ref('');
const formEmail = ref('');
const formPhone = ref('');
const formNotes = ref('');
const submitLoading = ref(false);

const submitReservation = async () => {
   if (!formName.value || !formPhone.value || !formEmail.value) {
      alert("Lütfen misafir bilgilerini (Ad Soyad, Telefon, E-posta) eksiksiz doldurun.");
      return;
   }

   submitLoading.value = true;
   try {
      const { data: authData } = await supabase.auth.getUser();
      const currentUserId = authData?.user?.id || null;
      
      const isUUID = typeof selectedYacht.value === 'string' && selectedYacht.value.length > 10;
      
      const payload = {
        user_id: currentUserId,
        yacht_id: isUUID ? selectedYacht.value : null,
        full_name: formName.value,
        phone_number: formPhone.value,
        email: formEmail.value,
        guest_count: guestCount.value,
        total_price: grandTotal.value,
        prepayment_amount: depositAmount.value,
        status: 'pending',
        payment_status: 'unpaid',
        notes: formNotes.value,
      };

      if (!hasLockId.value) {
        Object.assign(payload, {
          booking_date: selectedDate.value,
          start_time: selectedTime.value,
          duration_hours: duration.value
        });
      }

      let result;
      if (hasLockId.value && lockId) {
          result = await supabase.from('reservations').update(payload).eq('id', lockId);
      } else {
          result = await supabase.from('reservations').insert(payload);
      }
      
      if (result.error) throw result.error;

      alert(`Rezervasyonunuz başarıyla oluşturuldu!\n\nToplam tutar: ${formatNumber(grandTotal.value)} TL\nÖdemeniz gereken kapora tutarı: ${formatNumber(depositAmount.value)} TL\nEkibimiz en kısa sürede sizinle iletişime geçecektir.`);
      
      if (user.value) {
         navigateTo('/hesabim?tab=orders');
      } else {
         navigateTo('/');
      }

   } catch (e: any) {
      console.error(e);
      alert("İşlem sırasında bir hata oluştu: " + e.message);
   } finally {
      submitLoading.value = false;
   }
};

onMounted(() => {
   fetchYachts();

   if (user.value) {
      formEmail.value = user.value.email || '';
      formName.value = user.value.user_metadata?.full_name || '';
   }
});

useSeoMeta({
  title: `Rezervasyon Oluştur | ${siteConfig.name}`,
  description: "YatigoTR Lüks Yat kiralama rezervasyon ekranı.",
});
</script>

<style scoped>
/* Hidden scrollbar */
::-webkit-scrollbar {
  display: none;
}
</style>
