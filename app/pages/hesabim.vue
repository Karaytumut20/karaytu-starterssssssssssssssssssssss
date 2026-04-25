<template>
  <div class="font-sans min-h-screen bg-[#F8FAFC] pb-24">
    <!-- Hero / Profile Header -->
    <div class="bg-[#0C2340] text-white pt-24 pb-32 px-6 relative overflow-hidden">
       <!-- Dekoratif Arka Plan -->
       <div class="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div class="absolute -top-[20%] -right-[10%] w-[50%] h-[100%] rounded-full bg-gradient-to-bl from-[#C8A96E] to-transparent blur-3xl"></div>
          <div class="absolute -bottom-[20%] -left-[10%] w-[50%] h-[100%] rounded-full bg-gradient-to-tr from-[#215d8f] to-transparent blur-3xl"></div>
       </div>

       <div class="max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
             <div class="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white/10 bg-gradient-to-br from-[#C8A96E] to-[#9c814b] flex items-center justify-center text-4xl md:text-5xl font-black text-[#0C2340] shadow-2xl shrink-0">
                {{ profileForm.fullName.charAt(0) || user?.email?.charAt(0) || 'U' }}
             </div>
             <div class="md:pb-3">
                <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight">{{ profileForm.fullName || 'Değerli Misafirimiz' }}</h1>
                <p class="text-white/60 mt-2 text-sm md:text-base font-medium flex items-center justify-center md:justify-start gap-2">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  {{ user?.email }}
                </p>
             </div>
          </div>
          <button @click="logout" class="md:self-end md:mb-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 w-full md:w-auto shadow-lg hover:shadow-xl">
             <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
             Çıkış Yap
          </button>
       </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-5xl mx-auto px-6 -mt-12 relative z-20">
       
       <!-- Navigation Tabs -->
       <div class="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-2 mb-8 flex overflow-x-auto hide-scrollbar snap-x border border-gray-100">
          <button @click="activeTab = 'panel'" :class="['snap-start shrink-0 px-6 py-3.5 text-sm font-bold rounded-xl transition-all flex items-center gap-2.5', activeTab === 'panel' ? 'bg-[#0C2340] text-white shadow-md' : 'text-gray-500 hover:text-[#0C2340] hover:bg-gray-50']">
             <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
             Özet
          </button>
          <button @click="activeTab = 'orders'" :class="['snap-start shrink-0 px-6 py-3.5 text-sm font-bold rounded-xl transition-all flex items-center gap-2.5', activeTab === 'orders' ? 'bg-[#0C2340] text-white shadow-md' : 'text-gray-500 hover:text-[#0C2340] hover:bg-gray-50']">
             <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
             Rezervasyonlarım
          </button>
          <button @click="activeTab = 'payments'" :class="['snap-start shrink-0 px-6 py-3.5 text-sm font-bold rounded-xl transition-all flex items-center gap-2.5', activeTab === 'payments' ? 'bg-[#0C2340] text-white shadow-md' : 'text-gray-500 hover:text-[#0C2340] hover:bg-gray-50']">
             <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
             Ödemeler
          </button>
          <button @click="activeTab = 'profile'" :class="['snap-start shrink-0 px-6 py-3.5 text-sm font-bold rounded-xl transition-all flex items-center gap-2.5', activeTab === 'profile' ? 'bg-[#0C2340] text-white shadow-md' : 'text-gray-500 hover:text-[#0C2340] hover:bg-gray-50']">
             <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
             Profil Ayarları
          </button>
       </div>

       <!-- Tab Content -->
       <div class="transition-all duration-300">
          
          <!-- PANEL (ÖZET) -->
          <div v-if="activeTab === 'panel'" class="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div class="absolute -right-8 -top-8 w-32 h-32 bg-amber-50 rounded-full group-hover:scale-[1.8] transition-transform duration-700 ease-in-out"></div>
                <div class="relative z-10 flex flex-col items-center text-center">
                   <div class="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-5 rotate-3 group-hover:rotate-0 transition-transform">
                      <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   </div>
                   <div class="text-5xl font-black text-[#112135] mb-2">{{ activeReservationsCount }}</div>
                   <div class="text-xs font-bold text-gray-400 uppercase tracking-widest">Aktif Rezervasyon</div>
                </div>
             </div>
             
             <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div class="absolute -right-8 -top-8 w-32 h-32 bg-emerald-50 rounded-full group-hover:scale-[1.8] transition-transform duration-700 ease-in-out"></div>
                <div class="relative z-10 flex flex-col items-center text-center">
                   <div class="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-5 -rotate-3 group-hover:rotate-0 transition-transform">
                      <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   </div>
                   <div class="text-5xl font-black text-[#112135] mb-2">{{ completedReservationsCount }}</div>
                   <div class="text-xs font-bold text-gray-400 uppercase tracking-widest">Tamamlanan Tur</div>
                </div>
             </div>
             
             <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div class="absolute -right-8 -top-8 w-32 h-32 bg-blue-50 rounded-full group-hover:scale-[1.8] transition-transform duration-700 ease-in-out"></div>
                <div class="relative z-10 flex flex-col items-center text-center">
                   <div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-5 rotate-3 group-hover:rotate-0 transition-transform">
                      <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                   </div>
                   <div class="text-5xl font-black text-[#112135] mb-2">{{ pendingPaymentsCount }}</div>
                   <div class="text-xs font-bold text-gray-400 uppercase tracking-widest">Bekleyen Ödeme</div>
                </div>
             </div>
          </div>

          <!-- ORDERS (REZERVASYONLARIM) -->
          <div v-else-if="activeTab === 'orders'">
             <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div class="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                   <h2 class="text-lg font-bold text-[#112135]">Rezervasyon Geçmişiniz</h2>
                   <span class="text-sm font-medium text-gray-500">{{ reservations.length }} Kayıt</span>
                </div>
                
                <div v-if="loading" class="py-20 flex justify-center">
                   <svg class="animate-spin h-10 w-10 text-[#C8A96E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                </div>
                
                <div v-else-if="reservations.length === 0" class="text-center py-24 px-6">
                   <div class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg class="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                   </div>
                   <h3 class="text-xl font-bold text-[#112135] mb-2">Henüz Bir Rezervasyon Yok</h3>
                   <p class="text-gray-500 text-sm md:text-base mb-8 max-w-md mx-auto">Lüks yat filomuzu hemen inceleyin ve ilk unutulmaz deneyiminizi ayırtın.</p>
                   <NuxtLink to="/rezervasyon" class="inline-flex items-center gap-2 bg-[#0C2340] text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#1a385f] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                      Hemen Rezervasyon Yap
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                   </NuxtLink>
                </div>

                <div v-else class="divide-y divide-gray-100">
                   <div v-for="res in reservations" :key="res.id" class="p-6 md:p-8 hover:bg-gray-50/50 transition-colors group">
                      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                         
                         <div class="flex items-start gap-4">
                            <div class="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center shrink-0 shadow-sm text-[#C8A96E] group-hover:scale-105 transition-transform">
                               <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                            </div>
                            <div>
                               <div class="flex flex-wrap items-center gap-3 mb-1.5">
                                  <h3 class="font-extrabold text-[#112135] text-lg">{{ res.yacht_id?.name || 'Özel Yat Turu' }}</h3>
                                  <span :class="getStatusClass(res.status)" class="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">{{ getStatusText(res.status) }}</span>
                               </div>
                               <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 font-medium">
                                  <span class="flex items-center gap-1.5"><svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> {{ formatDate(res.booking_date) }}</span>
                                  <span class="flex items-center gap-1.5"><svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> {{ res.start_time.substring(0,5) }}</span>
                                  <span class="flex items-center gap-1.5"><svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg> {{ res.guest_count }} Kişi</span>
                               </div>
                            </div>
                         </div>
                         
                         <div class="flex items-center justify-between md:flex-col md:items-end gap-3 w-full md:w-auto">
                            <div class="text-right">
                               <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">Toplam Tutar</p>
                               <p class="text-2xl font-black text-[#0C2340]">{{ formatNumber(res.total_price) }}₺</p>
                            </div>
                            <button @click="openModal(res)" class="px-5 py-2.5 bg-white border border-gray-200 text-[#112135] text-[13px] font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                               Detayları Gör
                            </button>
                         </div>

                      </div>
                   </div>
                </div>
             </div>
          </div>

          <!-- PAYMENTS (ÖDEMELER) -->
          <div v-else-if="activeTab === 'payments'">
             <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-1">
                
                <div v-if="loading" class="py-20 flex justify-center">
                   <svg class="animate-spin h-10 w-10 text-[#C8A96E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                </div>

                <div v-else-if="reservations.length === 0" class="text-center py-24 px-6">
                   <div class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg class="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                   </div>
                   <h3 class="text-xl font-bold text-[#112135] mb-2">Ödeme Kaydı Yok</h3>
                   <p class="text-gray-500 text-sm">Sisteme kayıtlı geçmiş bir ödeme işleminiz bulunmamaktadır.</p>
                </div>

                <div v-else class="overflow-x-auto hide-scrollbar">
                   <table class="w-full text-left text-sm min-w-[700px]">
                      <thead class="bg-gray-50/80 text-gray-400 uppercase text-[11px] tracking-wider font-extrabold border-b border-gray-100">
                         <tr>
                            <th class="px-6 py-5 rounded-tl-2xl">Rezervasyon No</th>
                            <th class="px-6 py-5">Tarih</th>
                            <th class="px-6 py-5 text-right">Toplam</th>
                            <th class="px-6 py-5 text-right">Ödenen (Kapora)</th>
                            <th class="px-6 py-5 rounded-tr-2xl">Durum</th>
                         </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-50">
                         <tr v-for="res in reservations" :key="res.id" class="hover:bg-gray-50/30 transition-colors">
                            <td class="px-6 py-5 font-mono text-xs font-bold text-gray-600">{{ res.id.split('-')[0].toUpperCase() }}</td>
                            <td class="px-6 py-5 text-gray-500 font-medium">{{ formatDate(res.booking_date) }}</td>
                            <td class="px-6 py-5 font-bold text-[#0C2340] text-right">{{ formatNumber(res.total_price) }} ₺</td>
                            <td class="px-6 py-5 font-bold text-[#C8A96E] text-right">{{ formatNumber(res.prepayment_amount) }} ₺</td>
                            <td class="px-6 py-5">
                               <span :class="getPaymentClass(res.payment_status)" class="px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider">{{ getPaymentText(res.payment_status) }}</span>
                            </td>
                         </tr>
                      </tbody>
                   </table>
                </div>
             </div>
          </div>

          <!-- PROFILE (AYARLAR) -->
          <div v-else-if="activeTab === 'profile'">
             <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 max-w-2xl mx-auto">
                <div class="mb-8">
                  <h2 class="text-2xl font-extrabold text-[#112135]">Profil Ayarları</h2>
                  <p class="text-gray-500 text-sm mt-1">Kişisel bilgilerinizi ve iletişim detaylarınızı güncelleyin.</p>
                </div>
                
                <form @submit.prevent="updateProfile" class="space-y-6">
                   <div class="space-y-1.5">
                      <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Ad Soyad</label>
                      <input type="text" v-model="profileForm.fullName" class="w-full h-14 bg-gray-50 border border-gray-200 rounded-xl px-4 text-[15px] font-medium text-[#112135] outline-none focus:border-[#C8A96E] focus:bg-white focus:ring-4 focus:ring-[#C8A96E]/10 transition-all" />
                   </div>
                   
                   <div class="space-y-1.5">
                      <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Telefon Numarası</label>
                      <div class="flex bg-gray-50 border border-gray-200 rounded-xl h-14 focus-within:border-[#C8A96E] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#C8A96E]/10 overflow-hidden transition-all">
                        <div class="flex items-center px-4 border-r border-gray-200 bg-transparent shrink-0 text-[15px] font-bold text-gray-500">
                          +90
                        </div>
                        <input type="tel" v-model="profileForm.phone" placeholder="501 234 56 78" class="w-full h-full bg-transparent px-4 text-[15px] font-medium text-[#112135] outline-none" />
                      </div>
                   </div>
                   
                   <div class="space-y-1.5">
                      <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 flex justify-between">E-posta Adresi <span class="text-red-400 font-medium normal-case tracking-normal">(Değiştirilemez)</span></label>
                      <input type="email" :value="user?.email" disabled class="w-full h-14 bg-gray-100 border border-gray-200 rounded-xl px-4 text-[15px] font-medium text-gray-400 cursor-not-allowed" />
                   </div>
                   
                   <div class="pt-4">
                      <button type="submit" :disabled="savingProfile" class="w-full h-14 bg-[#0C2340] text-white font-bold rounded-xl hover:bg-[#1a385f] hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center text-[15px]">
                         <svg v-if="savingProfile" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                         {{ savingProfile ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet' }}
                      </button>
                      
                      <!-- Başarı Mesajı Animasyonlu -->
                      <transition enter-active-class="transition duration-300 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                         <div v-if="profileSuccess" class="mt-4 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                            Profiliniz başarıyla güncellendi!
                         </div>
                      </transition>
                   </div>
                </form>
             </div>
          </div>
          
       </div>
    </div>

    <!-- SİPARİŞ DETAY MODALI -->
    <Teleport to="body">
       <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 scale-95 translate-y-4"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-4"
      >
        <div v-if="selectedRes" class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-[#0C2340]/40 backdrop-blur-sm" @click="closeModal">
          <div class="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]" @click.stop>
            
            <!-- Header -->
            <div class="px-6 py-5 md:px-8 md:py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
               <div>
                  <h3 class="text-xl font-extrabold text-[#112135]">Rezervasyon Detayı</h3>
                  <p class="text-xs font-mono text-gray-500 mt-1">Kayıt: {{ selectedRes.id }}</p>
               </div>
               <button @click="closeModal" class="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-[#112135] hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                 <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
               </button>
            </div>
            
            <!-- Content -->
            <div class="p-6 md:p-8 overflow-y-auto">
               
               <div class="flex items-center justify-between mb-8">
                  <div class="flex items-center gap-3">
                     <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                     </div>
                     <div>
                        <h4 class="font-extrabold text-[#112135] text-lg">{{ selectedRes.yacht_id?.name || 'Özel Yat Turu' }}</h4>
                        <p class="text-sm font-medium text-gray-500">YatigoTR Yatçılık</p>
                     </div>
                  </div>
                  <span :class="getStatusClass(selectedRes.status)" class="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider">{{ getStatusText(selectedRes.status) }}</span>
               </div>
               
               <div class="grid grid-cols-2 gap-4 mb-8">
                  <div class="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                     <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Tarih</p>
                     <p class="text-[15px] font-bold text-[#112135]">{{ formatDate(selectedRes.booking_date) }}</p>
                  </div>
                  <div class="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                     <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Saat / Süre</p>
                     <p class="text-[15px] font-bold text-[#112135]">{{ selectedRes.start_time.substring(0,5) }} • {{ selectedRes.duration_hours }} Saat</p>
                  </div>
                  <div class="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                     <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Misafir</p>
                     <p class="text-[15px] font-bold text-[#112135]">{{ selectedRes.guest_count }} Kişi</p>
                  </div>
                  <div class="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                     <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Ödeme Durumu</p>
                     <p class="text-[15px] font-bold text-[#112135]">{{ getPaymentText(selectedRes.payment_status) }}</p>
                  </div>
               </div>
               
               <div class="bg-[#0C2340] rounded-2xl p-6 text-white relative overflow-hidden shadow-xl shadow-[#0C2340]/20">
                  <!-- Decor -->
                  <div class="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-white/5 blur-2xl pointer-events-none"></div>
                  
                  <h4 class="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Finansal Özet</h4>
                  
                  <div class="space-y-3">
                     <div class="flex justify-between text-sm font-medium">
                        <span class="text-white/70">Toplam Hizmet Tutarı</span>
                        <span>{{ formatNumber(selectedRes.total_price) }} ₺</span>
                     </div>
                     <div class="flex justify-between text-sm font-medium">
                        <span class="text-white/70">Ödenen Kapora</span>
                        <span class="text-[#C8A96E]">- {{ formatNumber(selectedRes.prepayment_amount) }} ₺</span>
                     </div>
                     <div class="w-full h-px bg-white/10 my-3"></div>
                     <div class="flex justify-between items-end">
                        <span class="font-bold text-white">Tur Günü Kalan Ödeme</span>
                        <span class="font-black text-2xl text-white">{{ formatNumber(selectedRes.total_price - selectedRes.prepayment_amount) }} ₺</span>
                     </div>
                  </div>
               </div>
               
               <div v-if="selectedRes.notes" class="mt-6 border border-gray-200 rounded-2xl p-5 bg-yellow-50/50">
                  <h4 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                     <svg class="w-4 h-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                     Notlarınız
                  </h4>
                  <p class="text-[15px] text-[#112135] font-medium leading-relaxed">{{ selectedRes.notes }}</p>
               </div>
               
            </div>
            
            <!-- Footer -->
            <div class="px-6 py-4 md:px-8 md:py-5 border-t border-gray-100 bg-gray-50 flex justify-end">
               <button @click="closeModal" class="px-8 py-3 bg-[#0C2340] text-white text-sm font-bold rounded-xl hover:bg-[#1a385f] hover:shadow-lg transition-all">Kapat</button>
            </div>
          </div>
        </div>
       </Transition>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useSupabaseUser, useSupabaseClient, useRoute, useRouter, navigateTo, definePageMeta } from '#imports';

definePageMeta({
  middleware: 'auth'
});

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const route = useRoute();
const router = useRouter();

const activeTab = ref(route.query.tab ? String(route.query.tab) : 'panel');

// Profil Formu (Telefon dahil)
const profileForm = ref({
  fullName: '',
  phone: ''
});
const savingProfile = ref(false);
const profileSuccess = ref(false);

const reservations = ref<any[]>([]);
const loading = ref(true);

const fetchReservations = async () => {
   if (!user.value) return;
   
   try {
      loading.value = true;
      const { data, error } = await supabase
        .from('reservations')
        .select(`
          *,
          yacht_id (
            id,
            name
          )
        `)
        .eq('user_id', user.value.id)
        .order('created_at', { ascending: false });
        
      if (data) reservations.value = data;
   } catch (e) {
      console.error(e);
   } finally {
      loading.value = false;
   }
};

const activeReservationsCount = computed(() => reservations.value.filter(r => r.status === 'confirmed' || r.status === 'pending').length);
const completedReservationsCount = computed(() => reservations.value.filter(r => r.status === 'completed').length);
const pendingPaymentsCount = computed(() => reservations.value.filter(r => r.payment_status === 'unpaid' || r.payment_status === 'partial').length);

const updateProfile = async () => {
   savingProfile.value = true;
   profileSuccess.value = false;
   try {
      const { data, error } = await supabase.auth.updateUser({
         data: { 
           full_name: profileForm.value.fullName,
           phone: profileForm.value.phone
         }
      });
      if (error) throw error;
      
      await supabase.auth.refreshSession();
      profileSuccess.value = true;
      setTimeout(() => { profileSuccess.value = false; }, 3000);
   } catch (e) {
      console.error(e);
      alert('Profil güncellenirken bir hata oluştu.');
   } finally {
      savingProfile.value = false;
   }
};

const logout = async () => {
   await supabase.auth.signOut();
   navigateTo('/');
};

// --- Modal State ---
const selectedRes = ref<any>(null);

const openModal = (res: any) => {
   selectedRes.value = res;
};
const closeModal = () => {
   selectedRes.value = null;
};

// --- Formatters ---
const formatDate = (dateStr: string) => {
   if (!dateStr) return '-';
   const d = new Date(dateStr);
   return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
};
const formatNumber = (num: number) => {
   if (!num) return '0';
   return num.toLocaleString('tr-TR');
};

const getStatusText = (status: string) => {
   const map: Record<string, string> = {
      'pending': 'Onay Bekliyor',
      'confirmed': 'Onaylandı',
      'completed': 'Tamamlandı',
      'cancelled': 'İptal Edildi'
   };
   return map[status] || status;
};

const getStatusClass = (status: string) => {
   const map: Record<string, string> = {
      'pending': 'bg-amber-100 text-amber-700 border border-amber-200',
      'confirmed': 'bg-emerald-100 text-emerald-700 border border-emerald-200',
      'completed': 'bg-blue-100 text-blue-700 border border-blue-200',
      'cancelled': 'bg-red-100 text-red-700 border border-red-200'
   };
   return map[status] || 'bg-gray-100 text-gray-700 border border-gray-200';
};

const getPaymentText = (status: string) => {
   const map: Record<string, string> = {
      'unpaid': 'Ödenmedi',
      'partial': 'Kısmi Ödeme (Kapora)',
      'paid': 'Ödendi',
      'refunded': 'İade Edildi'
   };
   return map[status] || status;
};

const getPaymentClass = (status: string) => {
   const map: Record<string, string> = {
      'unpaid': 'bg-red-100 text-red-700 border border-red-200',
      'partial': 'bg-amber-100 text-amber-700 border border-amber-200',
      'paid': 'bg-emerald-100 text-emerald-700 border border-emerald-200',
      'refunded': 'bg-gray-100 text-gray-700 border border-gray-200'
   };
   return map[status] || 'bg-gray-100 text-gray-700 border border-gray-200';
};

onMounted(() => {
   if (user.value) {
      profileForm.value.fullName = user.value.user_metadata?.full_name || '';
      profileForm.value.phone = user.value.user_metadata?.phone || '';
   }
   fetchReservations();
});

watch(() => route.query.tab, (newTab) => {
  if (newTab) activeTab.value = String(newTab);
});
watch(activeTab, (newTab) => {
  router.push({ query: { ...route.query, tab: newTab } });
});

</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
