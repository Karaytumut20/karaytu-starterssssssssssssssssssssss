<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const supabase = useSupabaseClient();
const router = useRouter();

const form = ref({
    title: '',
    slug: '',
    category: 'Rehber',
    excerpt: '',
    content: '',
    image_url: '',
    is_active: true,
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    related_yachts: [] as string[],
    related_experiences: [] as string[]
});

const yachtsList = ref<any[]>([]);
const experiencesList = ref<any[]>([]);

// Fetch options
const fetchOptions = async () => {
    const { data: y } = await supabase.from('yachts').select('id, name');
    if (y) yachtsList.value = y;
    
    const { data: e } = await supabase.from('experiences').select('id, title');
    if (e) experiencesList.value = e;
};

import { onMounted } from 'vue';
onMounted(() => {
    fetchOptions();
});

const uploadFile = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const previewUrl = ref<string | null>(null);
const saveLoading = ref(false);

const categories = ['Rehber', 'Tavsiye', 'Haber', 'Rota'];

const generateSlug = () => {
    if (!form.value.title) return;
    const turkishMap: { [key: string]: string } = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u', 'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U' };
    let text = form.value.title;
    for (const key in turkishMap) {
        text = text.replace(new RegExp(key, 'g'), turkishMap[key]);
    }
    form.value.slug = text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
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
    if (!uploadFile.value) return form.value.image_url || '';
    
    const file = uploadFile.value;
    const fileExt = file.name.split('.').pop();
    const fileName = `blog_${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `blogs/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('yachts-images') // Reusing the same storage bucket for simplicity
        .upload(filePath, file);

    if (uploadError) throw new Error('Resim yükleme hatası: ' + uploadError.message);
    
    const { data: publicUrlData } = supabase.storage.from('yachts-images').getPublicUrl(filePath);
    return publicUrlData.publicUrl;
};

const savePost = async () => {
    saveLoading.value = true;
    try {
        const finalImageUrl = await handleImageUpload();
        form.value.image_url = finalImageUrl || '';

        const { error } = await supabase.from('blogs').insert([form.value]);
        if (error) {
            if(error.code === '42P01') { // table doesn't exist
               throw new Error('Lütfen Supabase SQL editöründe blogs tablosunu oluşturun.');
            }
            throw error;
        }
        
        alert('Blog yazısı başarıyla eklendi!');
        router.push('/blogs');
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
                    <v-card-title class="text-h5 mb-4">Yeni Blog Yazısı Ekle</v-card-title>
                </v-card-item>
                
                <v-card-text>
                    <v-form @submit.prevent="savePost">
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.title" label="Yazı Başlığı" @change="generateSlug" required variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.slug" label="URL (Slug)" required variant="outlined" hint="Otomatik doldurulur"></v-text-field>
                            </v-col>
                            
                            <v-col cols="12" md="6">
                                <v-select v-model="form.category" :items="categories" label="Kategori" variant="outlined"></v-select>
                            </v-col>
                            <v-col cols="12" md="6" class="d-flex align-center">
                                <v-switch v-model="form.is_active" label="Aktif mi? (Yayınla)" color="success" hide-details></v-switch>
                            </v-col>

                            <v-col cols="12">
                                <div class="text-caption mb-2 font-weight-bold">Blog Görseli (Kapak)</div>
                                <v-card 
                                    variant="outlined" 
                                    class="d-flex flex-column align-center justify-center pa-6 bg-grey-lighten-4 border-dashed cursor-pointer hover-bg-grey-lighten-3 transition-colors" 
                                    min-height="160"
                                    @click="triggerFileUpload"
                                    style="border-width: 2px !important; border-color: #cbd5e1 !important;"
                                >
                                    <div v-if="!previewUrl" class="text-center">
                                        <v-icon size="48" color="primary" class="mb-2">mdi-image-plus</v-icon>
                                        <div class="text-body-1 font-weight-bold text-primary mb-1">Görsel Seçmek İçin Tıklayın</div>
                                    </div>
                                    <div v-else class="text-center w-100">
                                        <v-img :src="previewUrl" max-height="200" class="rounded mx-auto mb-3" style="border: 1px solid #e2e8f0;"></v-img>
                                        <v-btn size="small" color="primary" variant="tonal">Görseli Değiştir</v-btn>
                                    </div>
                                    <input type="file" ref="fileInput" class="d-none" accept="image/*" @change="handleFileSelect" />
                                </v-card>
                            </v-col>

                            <v-col cols="12">
                                <v-textarea v-model="form.excerpt" label="Kısa Özet (Listeleme Ekranı İçin)" variant="outlined" rows="2"></v-textarea>
                            </v-col>
                            
                            <v-col cols="12">
                                <v-textarea v-model="form.content" label="Ana İçerik (HTML veya Düz Metin)" variant="outlined" rows="8"></v-textarea>
                            </v-col>

                            <!-- Internal Linking Settings -->
                            <v-col cols="12">
                                <h3 class="text-h6 font-weight-bold mb-3 mt-4 text-primary">SEO İç Linkleme (Otomatik Öneriler)</h3>
                                <v-divider class="mb-5"></v-divider>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-select
                                    v-model="form.related_yachts"
                                    :items="yachtsList"
                                    item-title="name"
                                    item-value="id"
                                    label="Bu yazıda bahsedilen/önerilen Yatlar"
                                    multiple
                                    chips
                                    variant="outlined"
                                    hint="Makalenin altında yatları listeler ve link verir."
                                    persistent-hint
                                ></v-select>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-select
                                    v-model="form.related_experiences"
                                    :items="experiencesList"
                                    item-title="title"
                                    item-value="id"
                                    label="Bu yazıda bahsedilen/önerilen Deneyimler"
                                    multiple
                                    chips
                                    variant="outlined"
                                    hint="Makalenin altında deneyimleri listeler ve link verir."
                                    persistent-hint
                                ></v-select>
                            </v-col>

                            <!-- SEO Settings -->
                            <v-col cols="12">
                                <h3 class="text-h6 font-weight-bold mb-3 mt-4 text-primary">SEO Ayarları</h3>
                                <v-divider class="mb-5"></v-divider>
                            </v-col>

                            <v-col cols="12" md="12">
                                <v-text-field v-model="form.meta_title" label="SEO Başlık (Meta Title)" variant="outlined" hint="Boş bırakılırsa Yazı Başlığı kullanılır."></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea v-model="form.meta_description" label="SEO Açıklama (Meta Description)" variant="outlined" rows="2" hint="Arama motorları için kısa açıklama."></v-textarea>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="form.meta_keywords" label="SEO Anahtar Kelimeler (Meta Keywords)" variant="outlined" hint="Virgülle ayırarak yazın (örn: yat, boğaz turu, kiralama)"></v-text-field>
                            </v-col>

                            <v-col cols="12" class="mt-4">
                                <v-btn color="primary" type="submit" :loading="saveLoading" block size="large">Yazıyı Kaydet</v-btn>
                                <v-btn color="error" variant="text" block class="mt-2" @click="$router.push('/blogs')">İptal</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>
