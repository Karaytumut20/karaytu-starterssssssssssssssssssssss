<script setup lang="ts">
import { UserIcon } from 'vue-tabler-icons';
import { useRouter } from 'vue-router';

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();

const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
};
</script>

<template>
    <!-- ---------------------------------------------- -->
    <!-- notifications DD -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <v-btn class="profileBtn custom-hover-primary" variant="text" v-bind="props" icon>
                <v-avatar size="35" color="primary">
                    <span class="text-white">{{ user?.email?.charAt(0).toUpperCase() || 'A' }}</span>
                </v-avatar>
            </v-btn>
        </template>
        <v-sheet rounded="md" width="220" elevation="10" class="mt-2">
            <div class="px-4 py-3 text-caption text-muted border-b">
                Giriş Yapan Kullanıcı:
                <div class="font-weight-bold text-black">{{ user?.email || 'Bilinmiyor' }}</div>
            </div>
            <div class="pt-4 pb-4 px-5 text-center">
                <v-btn @click="handleLogout" color="error" variant="outlined" block>Çıkış Yap</v-btn>
            </div>
        </v-sheet>
    </v-menu>
</template>
