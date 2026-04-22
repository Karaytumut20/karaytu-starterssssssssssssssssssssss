<template>
  <div v-if="isOpen" class="fixed inset-0 z-[9999] flex items-center justify-center p-4">
    <!-- Bokeh/Blur Background -->
    <div class="absolute inset-0 bg-dark/30 backdrop-blur-md" @click="skip"></div>
    
    <!-- Modal Content -->
    <div class="relative w-full max-w-[420px] bg-white rounded-[24px] shadow-2xl overflow-hidden animate-fade-in-up">
      
      <!-- Top Section -->
      <div class="bg-[#112a46] text-white pt-10 pb-8 px-8 flex flex-col items-center text-center">
        <div class="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold mb-3 tracking-tight">Eksik Bilgiler</h2>
        <p class="text-white/80 text-[15px] leading-relaxed">
          Hesabınızı tamamlamak ve rezervasyonlarınızı takip edebilmek için lütfen aşağıdaki bilgileri girin.
        </p>
      </div>
      
      <!-- Bottom Section -->
      <div class="p-8">
        <div class="mb-6">
          <label class="block text-[13px] font-semibold text-[#112a46] mb-2">Telefon Numarası <span class="text-red-500">*</span></label>
          <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#112a46] focus-within:ring-1 focus-within:ring-[#112a46] transition-all">
            <div class="bg-gray-50 px-3 py-3 border-r border-gray-200 flex items-center gap-2 select-none">
              <span class="text-lg leading-none">🇹🇷</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><path d="m6 9 6 6 6-6"/></svg>
              <span class="text-[#112a46] font-medium">+90</span>
            </div>
            <input 
              v-model="phone" 
              type="tel" 
              placeholder="501 234 56 78" 
              class="flex-1 w-full px-4 py-3 outline-none text-[#112a46] placeholder-gray-400 bg-transparent text-[15px]" 
              @keydown.enter="save" 
            />
          </div>
          <p v-if="errorMsg" class="text-red-500 text-xs mt-2">{{ errorMsg }}</p>
        </div>
        
        <button @click="save" class="w-full bg-[#112a46] text-white font-medium py-[14px] rounded-lg hover:bg-[#0c1e33] transition-colors mb-3 flex items-center justify-center gap-2" :disabled="loading">
          <svg v-if="loading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loading ? 'Kaydediliyor...' : 'Kaydet' }}
        </button>
        
        <button @click="skip" class="w-full text-[#64748b] font-medium py-2 hover:text-[#112a46] transition-colors text-[14px]">
          Şimdilik Atla
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useSupabaseUser, useSupabaseClient } from '#imports';
import { useRouter } from 'vue-router';

const isOpen = ref(false);
const phone = ref('');
const loading = ref(false);
const errorMsg = ref('');

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const router = useRouter();

const checkStatus = () => {
  if (user.value) {
    const hasPhone = user.value.user_metadata?.phone;
    const skipped = sessionStorage.getItem('skipPhoneModal');
    if (!hasPhone && !skipped) {
      isOpen.value = true;
    } else {
      isOpen.value = false;
    }
  } else {
    isOpen.value = false;
  }
};

// Sayfa geçişlerinde kontrol et
router.afterEach(() => {
  setTimeout(checkStatus, 500);
});

// İlk yüklendiğinde kontrol et
onMounted(() => {
  setTimeout(checkStatus, 500);
});

const skip = () => {
  sessionStorage.setItem('skipPhoneModal', 'true');
  isOpen.value = false;
};

const save = async () => {
  // Basit validasyon
  if (!phone.value || phone.value.replace(/\D/g, '').length < 10) {
    errorMsg.value = 'Lütfen geçerli bir telefon numarası girin (Örn: 501 234 56 78).';
    return;
  }
  
  try {
    loading.value = true;
    errorMsg.value = '';
    
    const { error } = await supabase.auth.updateUser({
      data: { phone: phone.value }
    });
    
    if (error) throw error;
    
    isOpen.value = false;
  } catch (err: any) {
    errorMsg.value = err.message || 'Bir hata oluştu.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
