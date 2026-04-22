<template>
  <div class="min-h-screen bg-[#0C2340] flex items-center justify-center px-6 py-20 relative overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0">
      <img src="/images/marine_hero_bg.png" alt="bg" class="w-full h-full object-cover opacity-20" />
      <div class="absolute inset-0 bg-gradient-to-b from-[#0C2340]/80 to-[#0C2340]"></div>
    </div>

    <div class="relative z-10 w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-10">
        <NuxtLink to="/" class="inline-flex items-center gap-3 group">
          <svg viewBox="0 0 36 36" fill="none" class="w-10 h-10">
            <path d="M4 24 C10 18 14 14 18 10 C22 14 26 18 32 24" stroke="#C8A96E" stroke-width="2" stroke-linecap="round"/>
            <path d="M2 28 H34" stroke="#C8A96E" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
            <path d="M18 10 L18 4" stroke="#C8A96E" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M18 4 L26 14" stroke="#C8A96E" stroke-width="1.5" stroke-linejoin="round"/>
          </svg>
          <span class="text-[22px] font-black text-white">YatigoTR</span>
        </NuxtLink>
        <p class="text-white/40 text-[13px] mt-4">{{ isLogin ? 'Hesabınıza giriş yapın' : 'Yeni hesap oluşturun' }}</p>
      </div>

      <!-- Card -->
      <div class="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div v-if="!isLogin">
            <label class="block text-[12px] font-semibold text-white/60 uppercase tracking-wider mb-2">Ad Soyad</label>
            <input type="text" v-model="form.name" required placeholder="Adınız Soyadınız" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-[14px] focus:outline-none focus:border-[#C8A96E] transition-colors placeholder:text-white/20" />
          </div>
          <div>
            <label class="block text-[12px] font-semibold text-white/60 uppercase tracking-wider mb-2">E-posta</label>
            <input type="email" v-model="form.email" required placeholder="ornek@mail.com" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-[14px] focus:outline-none focus:border-[#C8A96E] transition-colors placeholder:text-white/20" />
          </div>
          <div>
            <label class="block text-[12px] font-semibold text-white/60 uppercase tracking-wider mb-2">Şifre</label>
            <input type="password" v-model="form.password" required placeholder="••••••••" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-[14px] focus:outline-none focus:border-[#C8A96E] transition-colors placeholder:text-white/20" />
          </div>

          <div v-if="errorMessage" class="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-300 text-[13px]">{{ errorMessage }}</div>

          <button type="submit" :disabled="loading" class="w-full bg-[#C8A96E] text-[#0C2340] font-bold text-[14px] py-4 rounded-xl hover:bg-[#dbbf7e] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
            <svg v-if="loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
            {{ loading ? 'İşleniyor...' : (isLogin ? 'Giriş Yap' : 'Kayıt Ol') }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <button @click="isLogin = !isLogin" class="text-[13px] text-white/40 hover:text-white/70 transition-colors">
            {{ isLogin ? 'Hesabınız yok mu? Ücretsiz kayıt olun →' : 'Zaten hesabınız var mı? Giriş yapın →' }}
          </button>
        </div>
      </div>

      <div class="mt-6 text-center">
        <NuxtLink to="/" class="text-[12px] text-white/30 hover:text-white/50 transition-colors">← Ana Sayfaya Dön</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSupabaseClient, navigateTo } from '#imports';

definePageMeta({ layout: false });

const isLogin = ref(true);
const loading = ref(false);
const errorMessage = ref('');
const form = ref({ name: '', email: '', password: '' });
const supabase = useSupabaseClient();

const handleSubmit = async () => {
  loading.value = true;
  errorMessage.value = '';
  try {
    if (isLogin.value) {
      const { error } = await supabase.auth.signInWithPassword({ email: form.value.email, password: form.value.password });
      if (error) throw error;
      navigateTo('/');
    } else {
      const { error } = await supabase.auth.signUp({ email: form.value.email, password: form.value.password, options: { data: { full_name: form.value.name, role: 'user' } } });
      if (error) throw error;
      alert('Kayıt başarılı! Giriş yapabilirsiniz.');
      isLogin.value = true;
    }
  } catch (err: any) {
    if (err.message.includes('Invalid login credentials')) errorMessage.value = 'E-posta veya şifre hatalı.';
    else if (err.message.includes('User already registered')) errorMessage.value = 'Bu e-posta ile zaten kayıt olunmuş.';
    else errorMessage.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>
