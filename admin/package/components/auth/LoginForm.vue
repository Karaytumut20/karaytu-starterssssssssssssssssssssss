<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const supabase = useSupabaseClient();
const router = useRouter();
const route = useRoute();

const email = ref('');
const password = ref('');
const loading = ref(false);
const errorMsg = ref('');
const user = useSupabaseUser();

const errorMessage = computed(() => {
    if (route.query.error === 'unauthorized') {
        return 'Bu panele giriş yapmak için Admin (Yönetici) yetkiniz bulunmamaktadır!';
    }
    return errorMsg.value;
});

const handleLogin = async () => {
    try {
        console.log("Login baslatiliyor...", email.value);
        if (!email.value || !password.value) {
            errorMsg.value = 'Lütfen e-posta ve şifrenizi giriniz.';
            return;
        }

        loading.value = true;
        errorMsg.value = '';
        
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        });

        console.log("Supabase Yanıtı:", data, error);
        
        if (error) {
            console.error("Giriş hatası:", error);
            errorMsg.value = 'Giriş başarısız: ' + error.message;
        } else if (data?.user) {
            // Açık role kontrolü: Eğer admin değilse net hata ver
            if (data.user.user_metadata?.role !== 'admin') {
                console.warn("Hesap bir admin hesabı değil!");
                errorMsg.value = 'Hata: Bu e-posta adresinin Admin (Yönetici) yetkisi yoktur.';
                await supabase.auth.signOut();
                return;
            }

            console.log("Giriş başarılı. Session bekleniyor...");
            
            // Başarılı ve admin. Middleware engelini aşmak için yönlendirelim:
            setTimeout(() => {
                const dest = '/admin/yachts';
                window.location.href = dest;
            }, 800);
        }
    } catch (err) {
        console.error("Beklenmeyen hata:", err);
        errorMsg.value = 'Sistem hatası: Olası bağlantı problemi.';
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <v-form @submit.prevent="handleLogin">
        <v-row class="d-flex mb-3">
            <v-col cols="12" v-if="errorMessage">
                <v-alert type="error" variant="tonal" density="compact">{{ errorMessage }}</v-alert>
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">E-Posta</v-label>
                <v-text-field v-model="email" variant="outlined" hide-details color="primary" type="email"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">Şifre</v-label>
                <v-text-field v-model="password" variant="outlined" type="password" hide-details color="primary" @keyup.enter="handleLogin"></v-text-field>
            </v-col>
            
            <v-col cols="12" class="pt-4">
                <v-btn type="submit" :loading="loading" color="primary" size="large" block flat>Giriş Yap</v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>
