<script setup lang="ts">
import { ref, onMounted } from 'vue';

const supabase = useSupabaseClient();
const yachts = ref<any[]>([]);
const loading = ref(true);

// Düzenleme sayfası kullanıldığı için modal state'leri silindi.

const fetchYachts = async () => {
    loading.value = true;
    const { data } = await supabase.from('yachts').select('*').order('created_at', { ascending: false });
    yachts.value = data || [];
    loading.value = false;
};

const deleteYacht = async (id: string) => {
    if(confirm('Emin misiniz?')){
        const { error } = await supabase.from('yachts').delete().eq('id', id);
        if(!error){
            fetchYachts();
        } else {
            alert('Silinemedi: ' + error.message);
        }
    }
};

// Modal işlemleri silindi.

onMounted(() => {
    fetchYachts();
});
</script>

<template>
    <v-row>
        <v-col cols="12">
            <v-card elevation="10">
                <v-card-item class="d-flex justify-space-between align-center">
                    <div>
                        <v-card-title class="text-h5">Yat Yönetimi</v-card-title>
                        <v-card-subtitle>Sistemdeki yatlarınız</v-card-subtitle>
                    </div>
                    <v-btn color="primary" @click="$router.push('/yachts-add')">Yeni Yat Ekle</v-btn>
                </v-card-item>
                
                <v-card-text>
                    <v-table>
                        <thead>
                            <tr>
                                <th>Ad</th>
                                <th>Kapasite</th>
                                <th>Uzunluk</th>
                                <th>Saatlik Fiyat</th>
                                <th>Durum</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="loading">
                                <td colspan="6" class="text-center py-4">Yükleniyor...</td>
                            </tr>
                            <tr v-else-if="yachts.length === 0">
                                <td colspan="6" class="text-center py-4">Sistemde kayıtlı yat bulunmuyor.</td>
                            </tr>
                            <tr v-for="y in yachts" :key="y.id">
                                <td class="font-weight-medium">
                                    <div class="d-flex align-center gap-2">
                                        <v-avatar size="32" rounded class="border">
                                            <v-img :src="y.main_image || '/images/default.jpg'" cover></v-img>
                                        </v-avatar>
                                        {{ y.name }}
                                    </div>
                                </td>
                                <td>{{ y.capacity }} Kişi</td>
                                <td>{{ y.length }} m</td>
                                <td>{{ y.price_hourly }} TL</td>
                                <td>
                                    <v-chip :color="y.is_active ? 'success' : 'default'" size="small">
                                        {{ y.is_active ? 'Aktif' : 'Pasif' }}
                                    </v-chip>
                                </td>
                                <td>
                                    <v-btn size="small" variant="text" color="primary" class="mr-2" @click="$router.push({ name: 'yachts-edit-id', params: { id: y.id } })">Düzenle</v-btn>
                                    <v-btn size="small" variant="text" color="error" @click="deleteYacht(y.id)">Sil</v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card-text>
            </v-card>
        </v-col>

        <!-- Modal kaldırıldı, tam sayfa düzenleme kullanılıyor -->
    </v-row>
</template>
