<script setup lang="ts">
import { ref, onMounted } from 'vue';

const supabase = useSupabaseClient();
const experiences = ref<any[]>([]);
const loading = ref(true);

// Düzenleme Dialogu state
const editDialog = ref(false);
const saveLoading = ref(false);
const uploadFile = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const previewUrl = ref<string | null>(null);

const editForm = ref({
    id: '',
    title: '',
    slug: '',
    short_description: '',
    full_description: '',
    starting_price: 5000,
    main_image: '',
    is_active: true,
    main_image_alt: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    content_json: {
        features: [] as string[],
        itinerary: [] as {title: string, desc: string}[],
        menu: [] as string[],
        faq: [] as {q: string, a: string}[]
    }
});

const defaultContentJson = () => ({
    features: [''],
    itinerary: [{title: '', desc: ''}],
    menu: [''],
    faq: [{q: '', a: ''}]
});

const fetchExperiences = async () => {
    loading.value = true;
    const { data } = await supabase.from('experiences').select('*').order('created_at', { ascending: false });
    experiences.value = data || [];
    loading.value = false;
};

const deleteExperience = async (id: string) => {
    if(confirm('Emin misiniz?')){
        const { error } = await supabase.from('experiences').delete().eq('id', id);
        if(!error){
            fetchExperiences();
        } else {
            alert('Silinemedi: ' + error.message);
        }
    }
};

const openEditDialog = (exp: any) => {
    if(exp) {
        let parsedJson = exp.content_json || {};
        if (typeof parsedJson === 'string') {
            try { parsedJson = JSON.parse(parsedJson); } catch(e) { parsedJson = {}; }
        }
        
        editForm.value = { ...exp }; 
        editForm.value.content_json = {
            features: parsedJson.features || [],
            itinerary: parsedJson.itinerary || [],
            menu: parsedJson.menu || [],
            faq: parsedJson.faq || []
        };
    } else {
        editForm.value = {
            id: '',
            title: '',
            slug: '',
            short_description: '',
            full_description: '',
            starting_price: 5000,
            main_image: '',
            main_image_alt: '',
            is_active: true,
            meta_title: '',
            meta_description: '',
            meta_keywords: '',
            content_json: defaultContentJson()
        };
    }
    
    uploadFile.value = null; // Dosyayı sıfırla
    previewUrl.value = editForm.value.main_image || null; // Önizlemeyi db'deki ile başlat
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
    if (!editForm.value.title) return;
    editForm.value.slug = editForm.value.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
};

const handleImageUpload = async (): Promise<string | null> => {
    if (!uploadFile.value) return editForm.value.main_image; 
    
    const file = uploadFile.value;
    const fileExt = file.name.split('.').pop();
    const fileName = `exp-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `experiences/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('experiences-images')
        .upload(filePath, file);

    if (uploadError) throw new Error('Resim yükleme hatası: ' + uploadError.message);
    
    const { data: publicUrlData } = supabase.storage.from('experiences-images').getPublicUrl(filePath);
    return publicUrlData.publicUrl;
};

const saveEdit = async () => {
    saveLoading.value = true;
    try {
        const finalImageUrl = await handleImageUpload();
        editForm.value.main_image = finalImageUrl || '';

        // Temizleme (Boş olanları sil)
        const cleanedJson = {
            features: editForm.value.content_json.features.filter((f: string) => f.trim() !== ''),
            menu: editForm.value.content_json.menu.filter((m: string) => m.trim() !== ''),
            itinerary: editForm.value.content_json.itinerary.filter((i: any) => i.title.trim() !== ''),
            faq: editForm.value.content_json.faq.filter((f: any) => f.q.trim() !== '')
        };

        const payload = {
            title: editForm.value.title,
            name: editForm.value.title,
            slug: editForm.value.slug,
            short_description: editForm.value.short_description,
            full_description: editForm.value.full_description,
            starting_price: editForm.value.starting_price,
            main_image: editForm.value.main_image,
            main_image_alt: editForm.value.main_image_alt,
            is_active: editForm.value.is_active,
            meta_title: editForm.value.meta_title,
            meta_description: editForm.value.meta_description,
            meta_keywords: editForm.value.meta_keywords,
            content_json: cleanedJson
        };

        let error;
        if(editForm.value.id) {
            const res = await supabase.from('experiences').update(payload).eq('id', editForm.value.id);
            error = res.error;
        } else {
            const res = await supabase.from('experiences').insert(payload);
            error = res.error;
        }

        if (error) throw error;
        
        editDialog.value = false;
        fetchExperiences(); // Tabloyu güncelle
    } catch (err: any) {
        alert('Hata: ' + err.message + '\n\nEğer "content_json" bulunamadı diyorsa lütfen SQL komutunu çalıştırdığınızdan emin olun!');
    } finally {
        saveLoading.value = false;
    }
};

onMounted(() => {
    fetchExperiences();
});

// JSON Helper Functions
const addFeature = () => editForm.value.content_json.features.push('');
const removeFeature = (i: number) => editForm.value.content_json.features.splice(i, 1);

const addMenu = () => editForm.value.content_json.menu.push('');
const removeMenu = (i: number) => editForm.value.content_json.menu.splice(i, 1);

const addItinerary = () => editForm.value.content_json.itinerary.push({title: '', desc: ''});
const removeItinerary = (i: number) => editForm.value.content_json.itinerary.splice(i, 1);

const addFaq = () => editForm.value.content_json.faq.push({q: '', a: ''});
const removeFaq = (i: number) => editForm.value.content_json.faq.splice(i, 1);

</script>

<template>
    <v-row>
        <v-col cols="12">
            <v-card elevation="10">
                <v-card-item class="d-flex justify-space-between align-center">
                    <div>
                        <v-card-title class="text-h5">Deneyimler Yönetimi</v-card-title>
                        <v-card-subtitle>Detaylı tur ve içerik sayfaları</v-card-subtitle>
                    </div>
                    <v-btn color="primary" @click="openEditDialog(null)">Yeni Deneyim Ekle</v-btn>
                </v-card-item>
                
                <v-card-text>
                    <v-table>
                        <thead>
                            <tr>
                                <th>Ad</th>
                                <th>Kısa Açıklama</th>
                                <th>Başlangıç Fiyatı</th>
                                <th>Durum</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="loading">
                                <td colspan="5" class="text-center py-4">Yükleniyor...</td>
                            </tr>
                            <tr v-else-if="experiences.length === 0">
                                <td colspan="5" class="text-center py-4">Sistemde kayıtlı deneyim bulunmuyor.</td>
                            </tr>
                            <tr v-for="e in experiences" :key="e.id">
                                <td class="font-weight-medium">
                                    <div class="d-flex align-center gap-2">
                                        <v-avatar size="32" rounded class="border">
                                            <v-img :src="e.main_image || '/images/default.jpg'" cover></v-img>
                                        </v-avatar>
                                        {{ e.title }}
                                    </div>
                                </td>
                                <td>{{ e.short_description }}</td>
                                <td>{{ e.starting_price }} TL</td>
                                <td>
                                    <v-chip :color="e.is_active ? 'success' : 'default'" size="small">
                                        {{ e.is_active ? 'Aktif' : 'Pasif' }}
                                    </v-chip>
                                </td>
                                <td>
                                    <v-btn size="small" variant="text" color="primary" class="mr-2" @click="openEditDialog(e)">Düzenle</v-btn>
                                    <v-btn size="small" variant="text" color="error" @click="deleteExperience(e.id)">Sil</v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card-text>
            </v-card>
        </v-col>

        <!-- DENEYİM DÜZENLEME POP-UP (MODAL) -->
        <v-dialog v-model="editDialog" max-width="1200" persistent>
            <v-card>
                <v-card-title class="d-flex justify-space-between align-center pa-4 bg-primary text-white">
                    <span>{{ editForm.id ? `Deneyim Düzenle: ${editForm.title}` : 'Yeni Deneyim Ekle' }}</span>
                    <v-btn icon="mdi-close" variant="text" @click="editDialog = false"></v-btn>
                </v-card-title>
                
                <v-card-text class="pa-0">
                    <v-form @submit.prevent="saveEdit">
                        
                        <v-container fluid class="pa-6 bg-grey-lighten-4 border-b">
                            <h3 class="text-h6 mb-4">Temel Bilgiler</h3>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="editForm.title" label="Deneyim Adı" @change="generateSlug" required variant="outlined" bg-color="white" density="compact"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="editForm.slug" label="URL (Slug)" required variant="outlined" bg-color="white" density="compact"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model.number="editForm.starting_price" type="number" label="Temsili Fiyat (TL)" required variant="outlined" bg-color="white" density="compact"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea v-model="editForm.short_description" label="Kısa Spot Açıklama (Vitrin İçin)" variant="outlined" bg-color="white" rows="2" density="compact"></v-textarea>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea v-model="editForm.full_description" label="Ana Makale / Detaylı Açıklama (HTML destekler)" variant="outlined" bg-color="white" rows="6" density="compact"></v-textarea>
                                </v-col>
                            </v-row>
                        </v-container>

                        <!-- SEO Settings -->
                        <v-container fluid class="pa-6 bg-grey-lighten-4 border-b">
                            <h3 class="text-h6 mb-4">SEO Ayarları</h3>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-text-field v-model="editForm.meta_title" label="SEO Başlık (Meta Title)" variant="outlined" bg-color="white" hint="Boş bırakılırsa Deneyim Adı kullanılır." density="compact"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea v-model="editForm.meta_description" label="SEO Açıklama (Meta Description)" variant="outlined" bg-color="white" rows="2" hint="Arama motorları için kısa açıklama." density="compact"></v-textarea>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="editForm.meta_keywords" label="SEO Anahtar Kelimeler (Meta Keywords)" variant="outlined" bg-color="white" hint="Virgülle ayırarak yazın (örn: yat, boğaz turu, kiralama)" density="compact"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>

                        <v-container fluid class="pa-6">
                            <h3 class="text-h6 mb-4">Sayfa İçerik Modülleri (Dinamik)</h3>
                            <v-row>
                                
                                <!-- ÖZELLİKLER -->
                                <v-col cols="12" md="6">
                                    <v-card variant="outlined" class="pa-4 h-100">
                                        <div class="d-flex justify-space-between align-center mb-4">
                                            <div class="font-weight-bold text-subtitle-1">Özellikler (Kısa Liste)</div>
                                            <v-btn size="small" color="primary" variant="tonal" prepend-icon="mdi-plus" @click="addFeature">Özellik Ekle</v-btn>
                                        </div>
                                        <div v-for="(feat, index) in editForm.content_json.features" :key="'feat'+index" class="d-flex gap-2 mb-2">
                                            <v-text-field v-model="editForm.content_json.features[index]" placeholder="Örn: Klimalı Kapalı Salon" variant="outlined" density="compact" hide-details></v-text-field>
                                            <v-btn icon="mdi-delete" color="error" variant="text" size="small" @click="removeFeature(index)"></v-btn>
                                        </div>
                                        <div v-if="editForm.content_json.features.length === 0" class="text-caption text-grey">Henüz özellik eklenmedi.</div>
                                    </v-card>
                                </v-col>

                                <!-- MENÜ -->
                                <v-col cols="12" md="6">
                                    <v-card variant="outlined" class="pa-4 h-100">
                                        <div class="d-flex justify-space-between align-center mb-4">
                                            <div class="font-weight-bold text-subtitle-1">Menü Öğeleri</div>
                                            <v-btn size="small" color="primary" variant="tonal" prepend-icon="mdi-plus" @click="addMenu">Menü Ekle</v-btn>
                                        </div>
                                        <div v-for="(menu, index) in editForm.content_json.menu" :key="'menu'+index" class="d-flex gap-2 mb-2">
                                            <v-text-field v-model="editForm.content_json.menu[index]" placeholder="Örn: Sınırsız soft içecek" variant="outlined" density="compact" hide-details></v-text-field>
                                            <v-btn icon="mdi-delete" color="error" variant="text" size="small" @click="removeMenu(index)"></v-btn>
                                        </div>
                                        <div v-if="editForm.content_json.menu.length === 0" class="text-caption text-grey">Henüz menü eklenmedi.</div>
                                    </v-card>
                                </v-col>

                                <!-- AKIŞ (ITINERARY) -->
                                <v-col cols="12">
                                    <v-card variant="outlined" class="pa-4 bg-grey-lighten-5">
                                        <div class="d-flex justify-space-between align-center mb-4">
                                            <div class="font-weight-bold text-subtitle-1">Tur Akışı (Adım Adım)</div>
                                            <v-btn size="small" color="primary" prepend-icon="mdi-plus" @click="addItinerary">Aşama Ekle</v-btn>
                                        </div>
                                        <v-row v-for="(step, index) in editForm.content_json.itinerary" :key="'step'+index" class="mb-2 align-center">
                                            <v-col cols="12" sm="3" class="pb-0">
                                                <v-text-field v-model="step.title" label="Aşama Adı (Örn: 1. Karşılama)" variant="outlined" density="compact" bg-color="white" hide-details></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="8" class="pb-0">
                                                <v-text-field v-model="step.desc" label="Açıklama" variant="outlined" density="compact" bg-color="white" hide-details></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="1" class="pb-0 text-right">
                                                <v-btn icon="mdi-delete" color="error" variant="text" @click="removeItinerary(index)"></v-btn>
                                            </v-col>
                                        </v-row>
                                        <div v-if="editForm.content_json.itinerary.length === 0" class="text-caption text-grey">Henüz akış aşaması eklenmedi.</div>
                                    </v-card>
                                </v-col>

                                <!-- FAQ (SSS) -->
                                <v-col cols="12">
                                    <v-card variant="outlined" class="pa-4">
                                        <div class="d-flex justify-space-between align-center mb-4">
                                            <div class="font-weight-bold text-subtitle-1">Sıkça Sorulan Sorular</div>
                                            <v-btn size="small" color="primary" variant="tonal" prepend-icon="mdi-plus" @click="addFaq">Soru Ekle</v-btn>
                                        </div>
                                        <v-row v-for="(faq, index) in editForm.content_json.faq" :key="'faq'+index" class="mb-2 align-start">
                                            <v-col cols="12" md="4" class="pb-0">
                                                <v-textarea v-model="faq.q" label="Soru" variant="outlined" density="compact" rows="2" hide-details></v-textarea>
                                            </v-col>
                                            <v-col cols="12" md="7" class="pb-0">
                                                <v-textarea v-model="faq.a" label="Cevap" variant="outlined" density="compact" rows="2" hide-details></v-textarea>
                                            </v-col>
                                            <v-col cols="12" md="1" class="pb-0 text-right">
                                                <v-btn icon="mdi-delete" color="error" variant="text" @click="removeFaq(index)"></v-btn>
                                            </v-col>
                                        </v-row>
                                        <div v-if="editForm.content_json.faq.length === 0" class="text-caption text-grey">Henüz soru eklenmedi.</div>
                                    </v-card>
                                </v-col>

                            </v-row>
                        </v-container>

                        <v-container fluid class="pa-6 bg-grey-lighten-4 border-t">
                            <v-row>
                                <v-col cols="12" md="6">
                                    <div class="text-caption mb-2 font-weight-bold">Vitrin Görseli</div>
                                    <v-row>
                                        <v-col cols="12" sm="4" v-if="editForm.main_image">
                                            <v-img :src="editForm.main_image" max-height="100" class="rounded border bg-white mb-2"></v-img>
                                        </v-col>
                                        <v-col cols="12" :sm="editForm.main_image ? 8 : 12">
                                            <v-file-input
                                                v-model="uploadFile"
                                                label="Yeni Resim Seç"
                                                accept="image/*"
                                                variant="outlined"
                                                prepend-icon="mdi-camera"
                                                density="compact"
                                                hide-details
                                                class="mb-3"
                                                @change="handleFileSelect"
                                            ></v-file-input>
                                            <v-text-field
                                                v-model="editForm.main_image_alt"
                                                label="Vitrin Resmi Alt Etiketi (SEO)"
                                                variant="outlined"
                                                density="compact"
                                                hint="Bu resimde ne var?"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="12" md="6" class="d-flex align-center justify-end gap-4">
                                    <v-switch v-model="editForm.is_active" label="Aktif mi?" color="success" hide-details class="flex-grow-0"></v-switch>
                                </v-col>
                            </v-row>
                        </v-container>

                        <div class="d-flex justify-end gap-3 pa-4 border-t bg-white">
                            <v-btn color="error" variant="text" @click="editDialog = false">İptal</v-btn>
                            <v-btn color="primary" type="submit" :loading="saveLoading" size="large">{{ editForm.id ? 'Tüm Değişiklikleri Güncelle' : 'Kaydet' }}</v-btn>
                        </div>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>
