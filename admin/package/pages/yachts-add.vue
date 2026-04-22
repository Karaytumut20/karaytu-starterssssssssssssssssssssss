<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const supabase = useSupabaseClient();
const router = useRouter();

const form = ref({
    name: '',
    slug: '',
    description: '',
    capacity: 12,
    length: '20',
    cabins: 1,
    bathrooms: 1,
    built_year: new Date().getFullYear(),
    price_hourly: 5000,
    price_2h: null,
    price_3h: null,
    price_4h: null,
    price_adalar: null,
    price_bogaz: null,
    main_image: '',
    gallery: [] as string[],
    featured: false,
    is_active: true,
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    main_image_alt: '',
    gallery_alts: [] as string[],
    faq: [] as {q: string, a: string}[]
});

const uploadFile = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const previewUrl = ref<string | null>(null);

const galleryFiles = ref<File[]>([]);
const galleryFileInput = ref<HTMLInputElement | null>(null);
const galleryPreviews = ref<string[]>([]);

const saveLoading = ref(false);

const generateSlug = () => {
    if (!form.value.name) return;
    form.value.slug = form.value.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
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

const handleImageUpload = async (): Promise<string | null> => {
    if (!uploadFile.value) return form.value.main_image || '/images/img1.jpg'; // fallback
    
    // Yükleme işlemi
    const file = uploadFile.value;
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `yachts/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('yachts-images')
        .upload(filePath, file);

    if (uploadError) throw new Error('Resim yükleme hatası: ' + uploadError.message);
    
    // Yükleme başarılıysa URL al
    const { data: publicUrlData } = supabase.storage.from('yachts-images').getPublicUrl(filePath);
    return publicUrlData.publicUrl;
};

const handleGalleryFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
        for (let i = 0; i < target.files.length; i++) {
            galleryFiles.value.push(target.files[i]);
            galleryPreviews.value.push(URL.createObjectURL(target.files[i]));
            form.value.gallery_alts.push(''); // add empty alt for each new image
        }
    }
    // reset input
    if (galleryFileInput.value) galleryFileInput.value.value = '';
};

const triggerGalleryUpload = () => {
    if (galleryFileInput.value) {
        galleryFileInput.value.click();
    }
};

const removeGalleryImage = (index: number) => {
    galleryFiles.value.splice(index, 1);
    galleryPreviews.value.splice(index, 1);
    form.value.gallery_alts.splice(index, 1);
};

const addFaq = () => {
    form.value.faq.push({ q: '', a: '' });
};

const removeFaq = (index: number) => {
    form.value.faq.splice(index, 1);
};

const handleGalleryUpload = async (): Promise<string[]> => {
    if (!galleryFiles.value.length) return [];
    
    const urls: string[] = [];
    for (const file of galleryFiles.value) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `yachts/gallery/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('yachts-images')
            .upload(filePath, file);

        if (uploadError) throw new Error('Galeri resim yükleme hatası: ' + uploadError.message);
        
        const { data: publicUrlData } = supabase.storage.from('yachts-images').getPublicUrl(filePath);
        urls.push(publicUrlData.publicUrl);
    }
    return urls;
};

const saveYacht = async () => {
    saveLoading.value = true;
    try {
        // Önce resmi yükle
        const finalImageUrl = await handleImageUpload();
        form.value.main_image = finalImageUrl || '';

        // Galeri resimlerini yükle
        const finalGalleryUrls = await handleGalleryUpload();
        form.value.gallery = finalGalleryUrls;

        // Sonra veritabanına kaydet
        const { error } = await supabase.from('yachts').insert([form.value]);
        if (error) throw error;
        
        alert('Yat başarıyla eklendi!');
        router.push('/yachts');
    } catch (err: any) {
        alert('Hata: ' + err.message);
    } finally {
        saveLoading.value = false;
    }
};
</script>

<template>
    <v-row>
        <v-col cols="12" md="8" class="mx-auto">
            <v-card elevation="10">
                <v-card-item>
                    <v-card-title class="text-h5 mb-4">Yeni Yat Ekle</v-card-title>
                </v-card-item>
                
                <v-card-text>
                    <v-form @submit.prevent="saveYacht">
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.name" label="Yat Adı" @change="generateSlug" required variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.slug" label="URL (Slug)" required variant="outlined" hint="Otomatik doldurulur" persistent-hint></v-text-field>
                            </v-col>
                            
                            <v-col cols="12">
                                <v-textarea v-model="form.description" label="Açıklama" variant="outlined" rows="3"></v-textarea>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field v-model.number="form.capacity" type="number" label="Kapasite (Kişi)" required variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model.number="form.length" type="number" label="Uzunluk (Metre)" required variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field v-model.number="form.built_year" type="number" label="Yapım Yılı" required variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field v-model.number="form.cabins" type="number" label="Kabin Sayısı" required variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field v-model.number="form.bathrooms" type="number" label="Banyo Sayısı" required variant="outlined"></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field v-model.number="form.price_hourly" type="number" label="Saatlik Fiyat (TL)" required variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field v-model.number="form.price_2h" type="number" label="2 Saatlik Fiyat (TL)" variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field v-model.number="form.price_3h" type="number" label="3 Saatlik Fiyat (TL)" variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field v-model.number="form.price_4h" type="number" label="4 Saatlik Fiyat (TL)" variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field v-model.number="form.price_adalar" type="number" label="Tam Gün Adalar Turu (TL)" variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field v-model.number="form.price_bogaz" type="number" label="Tam Gün Boğaz Turu (TL)" variant="outlined"></v-text-field>
                            </v-col>

                            <!-- SEO Settings -->
                            <v-col cols="12">
                                <h3 class="text-h6 font-weight-bold mb-3 mt-4 text-primary">SEO Ayarları</h3>
                                <v-divider class="mb-5"></v-divider>
                            </v-col>

                            <v-col cols="12" md="12">
                                <v-text-field v-model="form.meta_title" label="SEO Başlık (Meta Title)" variant="outlined" hint="Boş bırakılırsa Yat Adı kullanılır."></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea v-model="form.meta_description" label="SEO Açıklama (Meta Description)" variant="outlined" rows="2" hint="Arama motorları için kısa açıklama."></v-textarea>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="form.meta_keywords" label="SEO Anahtar Kelimeler (Meta Keywords)" variant="outlined" hint="Virgülle ayırarak yazın (örn: yat, boğaz turu, kiralama)"></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <div class="text-caption mb-2 font-weight-bold">Yat Görseli (Vitrin Resmi)</div>
                                <v-card 
                                    variant="outlined" 
                                    class="d-flex flex-column align-center justify-center pa-6 bg-grey-lighten-4 border-dashed cursor-pointer hover-bg-grey-lighten-3 transition-colors" 
                                    min-height="160"
                                    @click="triggerFileUpload"
                                    style="border-width: 2px !important; border-color: #cbd5e1 !important;"
                                >
                                    <div v-if="!previewUrl" class="text-center">
                                        <v-icon size="48" color="primary" class="mb-2">mdi-cloud-upload-outline</v-icon>
                                        <div class="text-body-1 font-weight-bold text-primary mb-1">Vitrin Resmi Seçmek İçin Tıklayın</div>
                                        <div class="text-caption text-grey-darken-1">JPG, PNG vb. Desteklenen Formatlar (Maks 5MB)</div>
                                    </div>
                                    <div v-else class="text-center w-100">
                                        <v-img :src="previewUrl" max-height="200" class="rounded mx-auto mb-3" style="border: 1px solid #e2e8f0;"></v-img>
                                        <v-text-field v-model="form.main_image_alt" label="Vitrin Resmi Alt Etiketi (SEO)" variant="outlined" density="compact" hint="Bu görsel neyi gösteriyor?" class="mb-3 mx-auto" style="max-width: 400px;"></v-text-field>
                                        <v-btn size="small" color="primary" variant="tonal" prepend-icon="mdi-camera-retake">Görseli Değiştir</v-btn>
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

                            <v-col cols="12">
                                <div class="text-caption mb-2 font-weight-bold">Diğer Görseller (Galeri)</div>
                                <v-card 
                                    variant="outlined" 
                                    class="pa-6 bg-grey-lighten-4 border-dashed cursor-pointer hover-bg-grey-lighten-3 transition-colors" 
                                    min-height="160"
                                    style="border-width: 2px !important; border-color: #cbd5e1 !important;"
                                >
                                    <div v-if="galleryPreviews.length > 0" class="d-flex flex-wrap gap-6 mb-4 w-100">
                                        <div v-for="(img, idx) in galleryPreviews" :key="idx" class="position-relative" style="width: 150px;">
                                            <v-img :src="img" width="150" height="150" cover class="rounded border bg-white mb-2"></v-img>
                                            <v-btn 
                                                icon="mdi-close" 
                                                size="x-small" 
                                                color="error" 
                                                class="position-absolute" 
                                                style="top: -8px; right: -8px; z-index: 10;"
                                                @click.stop="removeGalleryImage(idx)"
                                            ></v-btn>
                                            <v-text-field v-model="form.gallery_alts[idx]" density="compact" variant="outlined" placeholder="Alt Etiket"></v-text-field>
                                        </div>
                                    </div>

                                    <div class="d-flex flex-column align-center justify-center text-center" @click="triggerGalleryUpload">
                                        <v-icon size="48" color="secondary" class="mb-2">mdi-view-gallery-outline</v-icon>
                                        <div class="text-body-1 font-weight-bold text-secondary mb-1">Galeri İçin Görsel Eklemek İçin Tıklayın</div>
                                        <div class="text-caption text-grey-darken-1">Birden fazla görsel seçebilirsiniz</div>
                                    </div>
                                    <input 
                                        type="file" 
                                        ref="galleryFileInput" 
                                        class="d-none" 
                                        accept="image/*" 
                                        multiple
                                        @change="handleGalleryFileSelect"
                                    />
                                </v-card>
                            </v-col>

                            <!-- S.S.S (FAQ) Settings -->
                            <v-col cols="12">
                                <div class="d-flex align-center justify-space-between mb-3 mt-4">
                                    <h3 class="text-h6 font-weight-bold text-primary">Sıkça Sorulan Sorular (FAQ Schema)</h3>
                                    <v-btn color="primary" variant="tonal" size="small" prepend-icon="mdi-plus" @click="addFaq">Soru Ekle</v-btn>
                                </div>
                                <v-divider class="mb-5"></v-divider>
                                
                                <div v-if="form.faq.length === 0" class="text-center pa-4 bg-grey-lighten-4 rounded border-dashed text-grey-darken-1 mb-4">
                                    Henüz soru eklenmedi. Arama sonuçlarında çıkmak için SSS ekleyin.
                                </div>
                                
                                <v-card v-for="(faqItem, idx) in form.faq" :key="idx" variant="outlined" class="mb-4 pa-4 position-relative border-blue-lighten-4 bg-blue-lighten-5">
                                    <v-btn icon="mdi-delete" size="x-small" color="error" class="position-absolute" style="top: 8px; right: 8px;" @click="removeFaq(idx)"></v-btn>
                                    <v-text-field v-model="faqItem.q" label="Soru (Örn: Bu yatta yemek servisi var mı?)" variant="outlined" density="comfortable" class="mb-2"></v-text-field>
                                    <v-textarea v-model="faqItem.a" label="Cevap" variant="outlined" density="comfortable" rows="2" hide-details></v-textarea>
                                </v-card>
                            </v-col>

                            <v-col cols="12" md="4" class="d-flex align-center gap-4">
                                <v-switch v-model="form.featured" label="Öne Çıkan?" color="primary" hide-details></v-switch>
                                <v-switch v-model="form.is_active" label="Aktif mi?" color="success" hide-details></v-switch>
                            </v-col>

                            <v-col cols="12" class="mt-4">
                                <v-btn color="primary" type="submit" :loading="saveLoading" block size="large">Yatı Kaydet (Resimle Birlikte)</v-btn>
                                <v-btn color="error" variant="text" block class="mt-2" @click="$router.push('/yachts')">İptal</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>
