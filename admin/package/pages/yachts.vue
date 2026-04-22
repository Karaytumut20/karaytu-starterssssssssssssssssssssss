<script setup lang="ts">
import { ref, onMounted } from 'vue';

const supabase = useSupabaseClient();
const yachts = ref<any[]>([]);
const loading = ref(true);

// Düzenleme Dialogu state
const editDialog = ref(false);
const saveLoading = ref(false);
const uploadFile = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const previewUrl = ref<string | null>(null);

const editForm = ref({
    id: '',
    name: '',
    slug: '',
    description: '',
    capacity: 12,
    length: '20',
    price_hourly: 5000,
    price_2h: 10000,
    price_adalar: 25000,
    main_image: '',
    featured: false,
    is_active: true
});

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

const openEditDialog = (yacht: any) => {
    editForm.value = { ...yacht }; // Veriyi forma aktar
    uploadFile.value = null; // Dosyayı sıfırla
    previewUrl.value = yacht.main_image || null; // Önizlemeyi db'deki ile başlat
    editDialog.value = true;
};

const handleFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        uploadFile.value = target.files[0];
        previewUrl.value = URL.createObjectURL(target.files[0]);
    }
};

const triggerFileUpload = () => {
    if (fileInput.value) {
        fileInput.value.click();
    }
};

const generateSlug = () => {
    if (!editForm.value.name) return;
    editForm.value.slug = editForm.value.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
};

const handleImageUpload = async (): Promise<string | null> => {
    if (!uploadFile.value) return editForm.value.main_image; // Yeni resim seçilmediyse eski url
    
    const file = uploadFile.value;
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `yachts/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('yachts-images')
        .upload(filePath, file);

    if (uploadError) throw new Error('Resim yükleme hatası: ' + uploadError.message);
    
    const { data: publicUrlData } = supabase.storage.from('yachts-images').getPublicUrl(filePath);
    return publicUrlData.publicUrl;
};

const saveEdit = async () => {
    saveLoading.value = true;
    try {
        const finalImageUrl = await handleImageUpload();
        editForm.value.main_image = finalImageUrl || '';

        const { error } = await supabase.from('yachts').update(editForm.value).eq('id', editForm.value.id);
        if (error) throw error;
        
        editDialog.value = false;
        fetchYachts(); // Tabloyu güncelle
    } catch (err: any) {
        alert('Hata oluştu: ' + err.message);
    } finally {
        saveLoading.value = false;
    }
};

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
                                    <v-btn size="small" variant="text" color="primary" class="mr-2" @click="openEditDialog(y)">Düzenle</v-btn>
                                    <v-btn size="small" variant="text" color="error" @click="deleteYacht(y.id)">Sil</v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card-text>
            </v-card>
        </v-col>

        <!-- YAT DÜZENLEME POP-UP (MODAL) -->
        <v-dialog v-model="editDialog" max-width="800" persistent>
            <v-card>
                <v-card-title class="d-flex justify-space-between align-center pa-4 bg-primary text-white">
                    <span>Yat Düzenle: {{ editForm.name }}</span>
                    <v-btn icon="mdi-close" variant="text" @click="editDialog = false"></v-btn>
                </v-card-title>
                
                <v-card-text class="pa-6">
                    <v-form @submit.prevent="saveEdit">
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="editForm.name" label="Yat Adı" @change="generateSlug" required variant="outlined" density="compact"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="editForm.slug" label="URL (Slug)" required variant="outlined" density="compact"></v-text-field>
                            </v-col>
                            
                            <v-col cols="12">
                                <v-textarea v-model="editForm.description" label="Açıklama" variant="outlined" rows="2" density="compact"></v-textarea>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field v-model.number="editForm.capacity" type="number" label="Kapasite (Kişi)" required variant="outlined" density="compact"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="editForm.length" label="Uzunluk (Metre)" required variant="outlined" density="compact"></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field v-model.number="editForm.price_hourly" type="number" label="Saatlik Fiyat (TL)" required variant="outlined" density="compact"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field v-model.number="editForm.price_2h" type="number" label="2 Saatlik Fiyat (TL)" variant="outlined" density="compact"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field v-model.number="editForm.price_adalar" type="number" label="Adalar Turu (TL)" variant="outlined" density="compact"></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <div class="text-caption mb-2 font-weight-bold">Yat Görseli (Vitrin Resmi)</div>
                                <v-row>
                                    <!-- Mevcut Görsel (Sadece varsa gösterilir) -->
                                    <v-col cols="12" sm="4" v-if="editForm.main_image">
                                        <v-card variant="outlined" class="pa-2 bg-grey-lighten-4 h-100 d-flex flex-column align-center justify-center">
                                            <div class="text-caption font-weight-bold text-grey-darken-1 mb-2">Şu Anki / Mevcut Resim</div>
                                            <v-img :src="editForm.main_image" max-height="120" class="rounded w-100" style="border: 1px solid #cbd5e1;"></v-img>
                                        </v-card>
                                    </v-col>
                                    
                                    <!-- Yeni Yükleme Alanı -->
                                    <v-col cols="12" :sm="editForm.main_image ? 8 : 12">
                                        <v-card 
                                            variant="outlined" 
                                            class="d-flex flex-column align-center justify-center pa-4 bg-blue-grey-lighten-5 border-dashed cursor-pointer hover-bg-grey-lighten-3 transition-colors h-100" 
                                            min-height="140"
                                            @click="triggerFileUpload"
                                            style="border-width: 2px !important; border-color: #94a3b8 !important;"
                                        >
                                            <div v-if="!previewUrl || previewUrl === editForm.main_image" class="text-center">
                                                <v-icon size="36" color="primary" class="mb-2">mdi-cloud-upload-outline</v-icon>
                                                <div class="text-body-2 font-weight-bold text-primary mb-1">Yeni Resim Seç / Değiştir</div>
                                                <div class="text-caption text-grey-darken-1">JPG, PNG (Maks 5MB)</div>
                                            </div>
                                            <div v-else class="text-center w-100">
                                                <div class="text-caption font-weight-bold text-success mb-2">Seçilen Yeni Resim:</div>
                                                <v-img :src="previewUrl" max-height="120" class="rounded mx-auto mb-2" style="border: 2px solid #22c55e;"></v-img>
                                                <v-btn size="x-small" color="primary" variant="tonal" prepend-icon="mdi-camera-retake">Görseli Değiştir</v-btn>
                                            </div>
                                            <input 
                                                type="file" 
                                                ref="fileInput" 
                                                class="d-none" 
                                                accept="image/*" 
                                                @change="handleFileSelect"
                                            />
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-col>

                            <v-col cols="12" md="4" class="d-flex align-center gap-4 pt-0">
                                <v-switch v-model="editForm.featured" label="Öne Çıkan?" color="primary" hide-details></v-switch>
                                <v-switch v-model="editForm.is_active" label="Aktif mi?" color="success" hide-details></v-switch>
                            </v-col>
                        </v-row>

                        <div class="d-flex justify-end gap-3 mt-4 border-t pt-4">
                            <v-btn color="error" variant="text" @click="editDialog = false">İptal</v-btn>
                            <v-btn color="primary" type="submit" :loading="saveLoading">Güncelle</v-btn>
                        </div>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>
