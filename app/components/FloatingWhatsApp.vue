<template>
  <div class="fixed bottom-6 right-6 z-[99] flex flex-col items-end gap-3 pointer-events-none">
    
    <!-- Tooltip (Optional, shows on hover or initially) -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div v-if="showTooltip" class="bg-white py-2.5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#e2e8f0]/60 pointer-events-auto">
        <p class="text-[13px] font-bold text-[#112135] whitespace-nowrap">{{ customMessage }}</p>
      </div>
    </Transition>

    <!-- Main Button -->
    <a :href="whatsappLink" target="_blank" class="w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(37,211,102,0.4)] transition-all hover:scale-110 pointer-events-auto relative group">
      <!-- Ping Animation -->
      <span class="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping" style="animation-duration: 3s;"></span>
      
      <!-- Icon -->
      <svg class="w-8 h-8 text-white relative z-10" fill="currentColor" viewBox="0 0 448 512" style="transform: translateY(-1px);">
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
      </svg>
    </a>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const showTooltip = ref(false);

const phoneNumber = "905441014343";

// Route bazlı dinamik mesaj (Smart WhatsApp)
const customMessage = computed(() => {
  if (route.path.includes('/yatlarimiz/')) {
    return "Bu yat için müsaitlik sormak ister misiniz? 👋";
  } else if (route.path.includes('/deneyimlerimiz/')) {
    return "Bu deneyim paketi hakkında bilgi alın! ✨";
  } else if (route.path.includes('/rezervasyon')) {
    return "Rezervasyon için yardıma mı ihtiyacınız var?";
  }
  return "Size nasıl yardımcı olabiliriz? 👋";
});

const whatsappLink = computed(() => {
  let text = "Merhaba, YatigoTR Yatçılık hizmetleri hakkında bilgi almak istiyorum.";
  
  // URL parametresi ile akıllı mesaj oluşturma
  if (route.path.includes('/yatlarimiz/')) {
    const slug = route.params.slug as string;
    if (slug) {
       text = `Merhaba, web sitenizdeki "${slug.replace(/-/g, ' ').toUpperCase()}" yatını inceledim. Fiyatlar ve müsaitlik hakkında bilgi alabilir miyim?`;
    }
  } else if (route.path.includes('/deneyimlerimiz/')) {
    const slug = route.params.slug as string;
    if (slug) {
       text = `Merhaba, "${slug.replace(/-/g, ' ').toUpperCase()}" tur paketi hakkında fiyat almak istiyorum.`;
    }
  } else if (route.path.includes('/rezervasyon')) {
     const yid = route.query.yacht_id;
     if (yid) {
       text = `Merhaba, sistem üzerinden rezervasyon yapıyordum ancak yardıma ihtiyacım var. Seçtiğim tarih: ${route.query.date || '-'}, Saat: ${route.query.time || '-'}`;
     } else {
       text = `Merhaba, rezervasyon işlemleri için bilgi almak istiyorum.`;
     }
  }

  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${phoneNumber}?text=${encodedText}`;
});

onMounted(() => {
  // Delay the tooltip appearance so it catches attention
  setTimeout(() => {
    showTooltip.value = true;
  }, 2000);
});
</script>
