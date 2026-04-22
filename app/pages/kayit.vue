<template>
  <main class="w-full bg-light text-dark pt-32 pb-24 px-page-margin min-h-dvh flex items-center justify-center">
    <div class="w-full max-w-md bg-dark/5 p-8 rounded-lg shadow-sm">
      <h1 class="text-4xl font-light mb-2 text-center">Kayıt Ol</h1>
      <p class="text-center opacity-70 mb-8">Kendi hesabınızı oluşturun ve rezervasyon yapmaya başlayın.</p>
      
      <form @submit.prevent="handleRegister" class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label class="font-medium text-sm">Ad Soyad</label>
          <input v-model="name" type="text" class="p-3 rounded border border-dark/20 bg-transparent" placeholder="Adınız Soyadınız" required />
        </div>
        <div class="flex flex-col gap-2">
          <label class="font-medium text-sm">E-posta</label>
          <input v-model="email" type="email" class="p-3 rounded border border-dark/20 bg-transparent" placeholder="ornek@mail.com" required />
        </div>
        <div class="flex flex-col gap-2">
          <label class="font-medium text-sm">Şifre</label>
          <input v-model="password" type="password" class="p-3 rounded border border-dark/20 bg-transparent" placeholder="En az 6 karakter" required minlength="6" />
        </div>
        
        <p v-if="errorMsg" class="text-red-500 text-sm mt-2">{{ errorMsg }}</p>
        <p v-if="successMsg" class="text-green-600 text-sm mt-2">{{ successMsg }}</p>

        <button type="submit" class="bg-dark text-light w-full py-4 rounded font-medium hover:bg-dark/80 transition-colors mt-4" :disabled="loading">
          {{ loading ? 'Kayıt Yapılıyor...' : 'Kayıt Ol' }}
        </button>
      </form>
      
      <div class="mt-6 text-center text-sm opacity-70">
        Zaten hesabınız var mı? <NuxtLink to="/giris" class="underline hover:opacity-100 transition-opacity font-medium">Giriş Yapın</NuxtLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { siteConfig } from '~/utils/site';

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const errorMsg = ref('');
const successMsg = ref('');
const loading = ref(false);

watchEffect(() => {
  if (user.value) {
    router.push('/hesabim');
  }
});

const handleRegister = async () => {
  try {
    loading.value = true;
    errorMsg.value = '';
    successMsg.value = '';
    const { error, data } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          full_name: name.value
        }
      }
    });
    if (error) throw error;
    
    // Auth success msg or direct push based on confirm email settings
    if (data.user && data.session) {
      router.push('/hesabim');
    } else {
      successMsg.value = 'Kayıt başarılı. Lütfen e-postanızı onaylayın (eğer e-posta doğrulama aktifse).';
    }
  } catch (err: any) {
    errorMsg.value = err.message || 'Kayıt işlemi başarısız.';
  } finally {
    loading.value = false;
  }
};

useSeoMeta({
  title: `Kayıt Ol | ${siteConfig.name}`,
});
</script>
