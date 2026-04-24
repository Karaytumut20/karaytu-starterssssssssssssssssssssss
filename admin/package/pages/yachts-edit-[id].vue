<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const supabase = useSupabaseClient();
const route = useRoute();
const router = useRouter();

const yachtId = route.params.id as string;

const form = ref({
    name: '',
    slug: '',
    short_description: '',
    description: '',
    features: [] as string[],
    amenities: [] as string[],
    capacity: 12,
    length: '20',
    cabins: 1,
    bathrooms: 1,
    built_year: new Date().getFullYear(),
    price_hourly: 5000,
    price_2h: 10000,
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
const loading = ref(false);
const initialLoading = ref(true);

const galleryFiles = ref<File[]>([]);
const galleryFileInput = ref<HTMLInputElement | null>(null);
const galleryPreviews = ref<string[]>([]);
const new_gallery_alts = ref<string[]>([]);

const fetchYacht = async () => {
    try {
        const { data, error } = await supabase.from('yachts').select('*').eq('id', yachtId).single();
        if (error) throw error;
        if (data) {
            form.value = { ...data };
            if (typeof form.value.gallery === 'string') {
                try { form.value.gallery = JSON.parse(form.value.gallery); } catch(e) { form.value.gallery = []; }
            }
            if (!Array.isArray(form.value.gallery)) {
                form.value.gallery = [];
            }
            
            // parse alts
            if (typeof form.value.gallery_alts === 'string') {
                try { form.value.gallery_alts = JSON.parse(form.value.gallery_alts); } catch(e) { form.value.gallery_alts = []; }
            }
            if (!Array.isArray(form.value.gallery_alts)) {
                form.value.gallery_alts = form.value.gallery.map(() => '');
            }

            // parse faq
            if (typeof form.value.faq === 'string') {
                try { form.value.faq = JSON.parse(form.value.faq); } catch(e) { form.value.faq = []; }
            }
            if (!Array.isArray(form.value.faq)) {
                form.value.faq = [];
            }

            // parse features
            if (typeof form.value.features === 'string') {
                try { form.value.features = JSON.parse(form.value.features); } catch(e) { form.value.features = []; }
            }
            if (!Array.isArray(form.value.features)) {
                form.value.features = [];
            }

            // parse amenities
            if (typeof form.value.amenities === 'string') {
                try { form.value.amenities = JSON.parse(form.value.amenities); } catch(e) { form.value.amenities = []; }
            }
            if (!Array.isArray(form.value.amenities)) {
                form.value.amenities = [];
            }
        }
    } catch (err: any) {
        alert('Yat yüklenemedi: ' + err.message);
        router.push('/yachts');
    } finally {
        initialLoading.value = false;
    }
};

const generateSlug = () => {
    if (!form.value.name) return;
    form.value.slug = form.value.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
};

const handleImageUpload = async (): Promise<string | null> => {
    if (!uploadFile.value) return form.value.image_url; // if no new file, keep old url
    
    const file = uploadFile.value;
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `yachts/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('yachts-images')
        .upload(filePath, file);

    if (uploadError) throw new Error('Resim yükleme hatası: ' + uploadError.message);
    
    // Yükleme başarılıysa URL'yi al
    const { data: publicUrlData } = supabase.storage.from('yachts-images').getPublicUrl(filePath);
    return publicUrlData.publicUrl;
};

const handleGalleryFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
        for (let i = 0; i < target.files.length; i++) {
            galleryFiles.value.push(target.files[i]);
            galleryPreviews.value.push(URL.createObjectURL(target.files[i]));
            new_gallery_alts.value.push('');
        }
    }
    if (galleryFileInput.value) galleryFileInput.value.value = '';
};

const triggerGalleryUpload = () => {
    if (galleryFileInput.value) {
        galleryFileInput.value.click();
    }
};

const removeNewGalleryImage = (index: number) => {
    galleryFiles.value.splice(index, 1);
    galleryPreviews.value.splice(index, 1);
    new_gallery_alts.value.splice(index, 1);
};

const removeExistingGalleryImage = (index: number) => {
    if (form.value.gallery && Array.isArray(form.value.gallery)) {
        form.value.gallery.splice(index, 1);
        if (form.value.gallery_alts && Array.isArray(form.value.gallery_alts)) {
            form.value.gallery_alts.splice(index, 1);
        }
    }
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

const updateYacht = async () => {
    loading.value = true;
    try {
        const finalImageUrl = await handleImageUpload();
        form.value.main_image = finalImageUrl || form.value.main_image || '';

        const newGalleryUrls = await handleGalleryUpload();
        form.value.gallery = [...(form.value.gallery || []), ...newGalleryUrls];
        form.value.gallery_alts = [...(form.value.gallery_alts || []), ...new_gallery_alts.value];

        const { error } = await supabase.from('yachts').update(form.value).eq('id', yachtId);
        if (error) throw error;
        
        alert('Yat başarıyla güncellendi!');
        router.push('/yachts');
    } catch (err: any) {
        alert('Hata: ' + err.message);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    if(yachtId) fetchYacht();
    else router.push('/yachts');
});
</script>

<template>
    <v-row>
        <v-col cols="12" md="8" class="mx-auto">
            <v-card elevation="10" :loading="initialLoading">
                <v-card-item v-if="!initialLoading">
                    <v-card-title class="text-h5 mb-4">Yatı Düzenle</v-card-title>
                </v-card-item>
                
                <v-card-text v-if="!initialLoading">
                    <v-form @submit.prevent="updateYacht">
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.name" label="Yat Adı" @change="generateSlug" required variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.slug" label="URL (Slug)" required variant="outlined" hint="Otomatik doldurulur" persistent-hint></v-text-field>
                            </v-col>
                            
                            <v-col cols="12">
                                <v-textarea v-model="form.short_description" label="Kısa Açıklama (Listeleme ve Detay Sayfası İçin)" variant="outlined" rows="2"></v-textarea>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea v-model="form.description" label="Detaylı Açıklama (Yat Hakkında)" variant="outlined" rows="4"></v-textarea>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-combobox
                                    v-model="form.features"
                                    label="Öne Çıkan Özellikler"
                                    multiple
                                    chips
                                    closable-chips
                                    variant="outlined"
                                    hint="Yazıp Enter'a basarak ekleyin (Örn: Şık ve modern tasarım)"
                                    persistent-hint
                                ></v-combobox>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-combobox
                                    v-model="form.amenities"
                                    label="Olanaklar (Yeşil Tikli Liste)"
                                    multiple
                                    chips
                                    closable-chips
                                    variant="outlined"
                                    hint="Yazıp Enter'a basarak ekleyin (Örn: Ücretsiz Wi-Fi)"
                                    persistent-hint
                                ></v-combobox>
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
                                <div class="text-caption mb-2 font-weight-bold">Vitrin Resmi (Mevcut resmi değiştirmek için yeni yükleyin)</div>
                                <div v-if="form.main_image" class="mb-4 text-center border rounded pa-4 bg-grey-lighten-4">
                                    <v-img :src="form.main_image" max-height="200" class="rounded border mx-auto mb-3"></v-img>
                                    <v-text-field v-model="form.main_image_alt" label="Vitrin Resmi Alt Etiketi (SEO)" variant="outlined" density="compact" hint="Bu görsel neyi gösteriyor?" class="mx-auto" style="max-width: 400px;"></v-text-field>
                                </div>
                                <v-file-input
                                    v-model="uploadFile"
                                    label="Yeni Vitrin Resmi Seç (İsteğe Bağlı)"
                                    accept="image/*"
                                    variant="outlined"
                                    prepend-icon="mdi-camera"
                                    show-size
                                    hint="Yeni resim seçmezseniz eski resim kalır."
                                    persistent-hint
                                ></v-file-input>
                            </v-col>

                            <v-col cols="12">
                                <div class="text-caption mb-2 font-weight-bold">Diğer Görseller (Galeri)</div>
                                
                                <v-card 
                                    variant="outlined" 
                                    class="pa-6 bg-grey-lighten-4 border-dashed cursor-pointer hover-bg-grey-lighten-3 transition-colors mb-4" 
                                    min-height="160"
                                    style="border-width: 2px !important; border-color: #cbd5e1 !important;"
                                >
                                    <div v-if="(form.gallery && form.gallery.length > 0) || galleryPreviews.length > 0" class="d-flex flex-wrap gap-6 mb-4 pb-4 border-b w-100">
                                        <!-- Mevcut Resimler -->
                                        <div v-for="(img, idx) in form.gallery" :key="'exist-'+idx" class="position-relative" style="width: 150px;">
                                            <v-img :src="img" width="150" height="150" cover class="rounded border bg-white mb-2"></v-img>
                                            <v-chip size="x-small" color="primary" class="position-absolute" style="top: 4px; left: 4px; z-index: 10;">Mevcut</v-chip>
                                            <v-btn 
                                                icon="mdi-close" 
                                                size="x-small" 
                                                color="error" 
                                                class="position-absolute" 
                                                style="top: 4px; right: 4px; z-index: 10;"
                                                @click.stop="removeExistingGalleryImage(idx)"
                                                title="Mevcut resmi sil"
                                            ></v-btn>
                                            <v-text-field v-model="form.gallery_alts[idx]" density="compact" variant="outlined" placeholder="Alt Etiket"></v-text-field>
                                        </div>

                                        <!-- Yeni Eklenecek Resimler -->
                                        <div v-for="(img, idx) in galleryPreviews" :key="'new-'+idx" class="position-relative" style="width: 150px;">
                                            <v-img :src="img" width="150" height="150" cover class="rounded border bg-white opacity-80 mb-2"></v-img>
                                            <v-chip size="x-small" color="success" class="position-absolute" style="top: 4px; left: 4px; z-index: 10;">Yeni Eklenecek</v-chip>
                                            <v-btn 
                                                icon="mdi-close" 
                                                size="x-small" 
                                                color="error" 
                                                class="position-absolute" 
                                                style="top: 4px; right: 4px; z-index: 10;"
                                                @click.stop="removeNewGalleryImage(idx)"
                                                title="İptal et"
                                            ></v-btn>
                                            <v-text-field v-model="new_gallery_alts[idx]" density="compact" variant="outlined" placeholder="Alt Etiket"></v-text-field>
                                        </div>
                                    </div>

                                    <div class="d-flex flex-column align-center justify-center text-center" @click="triggerGalleryUpload">
                                        <v-icon size="48" color="secondary" class="mb-2">mdi-view-gallery-outline</v-icon>
                                        <div class="text-body-1 font-weight-bold text-secondary mb-1">Galeri İçin Yeni Görsel Eklemek İstiyorsanız Tıklayın</div>
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
                                
                                <div v-if="!form.faq || form.faq.length === 0" class="text-center pa-4 bg-grey-lighten-4 rounded border-dashed text-grey-darken-1 mb-4">
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
                                <v-btn color="primary" type="submit" :loading="loading" block size="large">Değişiklikleri Kaydet</v-btn>
                                <v-btn color="error" variant="text" block class="mt-2" @click="$router.push('/yachts')">İptal</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>
