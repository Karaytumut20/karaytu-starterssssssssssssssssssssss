<script setup lang="ts">
import { ref, onMounted } from 'vue';

const supabase = useSupabaseClient();
const reviews = ref<any[]>([]);
const loading = ref(true);

const editDialog = ref(false);
const saveLoading = ref(false);

const editForm = ref({
    id: '',
    reviewer_name: '',
    avatar_url: '',
    avatar_color: '',
    rating: 5.0,
    comment: '',
    is_active: true
});

const fetchReviews = async () => {
    loading.value = true;
    const { data } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
    reviews.value = data || [];
    loading.value = false;
};

const deleteReview = async (id: string) => {
    if(confirm('Yorumu silmek istediğinize emin misiniz?')){
        const { error } = await supabase.from('reviews').delete().eq('id', id);
        if(!error){
            fetchReviews();
        } else {
            alert('Silinemedi: ' + error.message);
        }
    }
};

const openEditDialog = (rev: any) => {
    if(rev) {
        editForm.value = { ...rev }; 
    } else {
        editForm.value = {
            id: '',
            reviewer_name: '',
            avatar_url: '',
            avatar_color: '',
            rating: 5.0,
            comment: '',
            is_active: true
        };
    }
    editDialog.value = true;
};

const saveEdit = async () => {
    saveLoading.value = true;
    try {
        let error;
        if(editForm.value.id) {
            const res = await supabase.from('reviews').update({
                reviewer_name: editForm.value.reviewer_name,
                avatar_url: editForm.value.avatar_url,
                avatar_color: editForm.value.avatar_color,
                rating: editForm.value.rating,
                comment: editForm.value.comment,
                is_active: editForm.value.is_active
            }).eq('id', editForm.value.id);
            error = res.error;
        } else {
            const res = await supabase.from('reviews').insert({
                reviewer_name: editForm.value.reviewer_name,
                avatar_url: editForm.value.avatar_url,
                avatar_color: editForm.value.avatar_color,
                rating: editForm.value.rating,
                comment: editForm.value.comment,
                is_active: editForm.value.is_active
            });
            error = res.error;
        }

        if (error) throw error;
        
        editDialog.value = false;
        fetchReviews();
    } catch (err: any) {
        alert('Hata oluştu: ' + err.message);
    } finally {
        saveLoading.value = false;
    }
};

onMounted(() => {
    fetchReviews();
});
</script>

<template>
    <v-row>
        <v-col cols="12">
            <v-card elevation="10">
                <v-card-item class="d-flex justify-space-between align-center">
                    <div>
                        <v-card-title class="text-h5">Müşteri Yorumları</v-card-title>
                        <v-card-subtitle>Anasayfada gösterilecek konuk geri bildirimleri</v-card-subtitle>
                    </div>
                    <v-btn color="primary" @click="openEditDialog(null)">Yeni Yorum Ekle</v-btn>
                </v-card-item>
                
                <v-card-text>
                    <v-table>
                        <thead>
                            <tr>
                                <th>Kullanıcı</th>
                                <th>Puan</th>
                                <th class="w-50">Yorum</th>
                                <th>Durum</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="loading">
                                <td colspan="5" class="text-center py-4">Yükleniyor...</td>
                            </tr>
                            <tr v-else-if="reviews.length === 0">
                                <td colspan="5" class="text-center py-4">Kayıtlı yorum bulunamadı.</td>
                            </tr>
                            <tr v-for="r in reviews" :key="r.id">
                                <td class="font-weight-medium">
                                    <div class="d-flex align-center gap-2">
                                        <v-avatar size="32" color="primary">
                                            <span class="text-white text-uppercase" v-if="!r.avatar_url">{{ r.reviewer_name.charAt(0) }}</span>
                                            <v-img v-else :src="r.avatar_url" cover></v-img>
                                        </v-avatar>
                                        {{ r.reviewer_name }}
                                    </div>
                                </td>
                                <td>
                                    <v-icon color="warning" size="small" class="mr-1">mdi-star</v-icon>
                                    {{ r.rating }}
                                </td>
                                <td>
                                    <span class="text-truncate d-inline-block" style="max-width: 300px;">
                                        {{ r.comment }}
                                    </span>
                                </td>
                                <td>
                                    <v-chip :color="r.is_active ? 'success' : 'default'" size="small">
                                        {{ r.is_active ? 'Aktif' : 'Gizli' }}
                                    </v-chip>
                                </td>
                                <td>
                                    <v-btn size="small" variant="text" color="primary" class="mr-2" @click="openEditDialog(r)">Düzenle</v-btn>
                                    <v-btn size="small" variant="text" color="error" @click="deleteReview(r.id)">Sil</v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card-text>
            </v-card>
        </v-col>

        <v-dialog v-model="editDialog" max-width="600" persistent>
            <v-card>
                <v-card-title class="d-flex justify-space-between align-center pa-4 bg-primary text-white">
                    <span>{{ editForm.id ? 'Yorumu Düzenle' : 'Yeni Yorum Ekle' }}</span>
                    <v-btn icon="mdi-close" variant="text" @click="editDialog = false"></v-btn>
                </v-card-title>
                
                <v-card-text class="pa-6">
                    <v-form @submit.prevent="saveEdit">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="editForm.reviewer_name" label="İsim Soyisim" required variant="outlined" density="compact"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="editForm.avatar_url" label="Avatar URL (Opsiyonel)" variant="outlined" density="compact" hint="Boş bırakırsanız baş harf çıkar"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="editForm.avatar_color" type="color" label="Baş Harf Arkaplan Rengi" variant="outlined" density="compact" hint="İsteğe bağlı, seçilmezse rastegele atanır"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model.number="editForm.rating" type="number" label="Puan (Örn: 5.0)" required variant="outlined" density="compact" max="5" min="1"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea v-model="editForm.comment" label="Yorum Metni" required variant="outlined" rows="4"></v-textarea>
                            </v-col>
                            <v-col cols="12">
                                <v-switch v-model="editForm.is_active" label="Sitede Gösterilsin mi?" color="success" hide-details></v-switch>
                            </v-col>
                        </v-row>

                        <div class="d-flex justify-end gap-3 mt-4 border-t pt-4">
                            <v-btn color="error" variant="text" @click="editDialog = false">İptal</v-btn>
                            <v-btn color="primary" type="submit" :loading="saveLoading">{{ editForm.id ? 'Güncelle' : 'Kaydet' }}</v-btn>
                        </div>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>
