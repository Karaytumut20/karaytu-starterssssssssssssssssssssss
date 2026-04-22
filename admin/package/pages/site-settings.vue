<script setup lang="ts">
import { ref, onMounted } from 'vue';

const supabase = useSupabaseClient();
const settingsForm = ref<Record<string, any>>({
    hero_title: 'İstanbul Boğazında\nÖzel Yat Turu',
    hero_subtitle: 'Boğaz turu, gün batımı, yemekli tur ve özel etkinlikler için size en uygun yatı seçin ve kolayca rezervasyon yapın.',
    hero_badge: 'İstanbul Boğazı\'nda Özel Yat Kiralama',
    hero_price_text: 'Saatlik 4.950 TL\'den başlayan fiyatlarla',
    stats_years: '16+',
    stats_rating: '4.8',
    stats_guests: '65Bin+',
    contact_phone: '+90 501 234 56 78',
    contact_whatsapp: '905012345678',
    contact_email: 'info@suyatcilik.com',
    contact_address: 'Arnavutköy, Bebek, İstanbul',
    social_instagram: 'https://instagram.com/',
    social_facebook: 'https://facebook.com/',
    site_meta_title: 'Su Yatçılık - Boğazda Özel Yat Kiralama',
    site_meta_description: 'İstanbul Boğazı\'nda en uygun fiyatlarla özel yat kiralama, boğaz turu, evlilik teklifi ve organizasyonlar için hemen rezervasyon yapın.',
    site_meta_keywords: 'yat kiralama, boğaz turu, istanbul yat kiralama, özel yat turu'
});

const saveLoading = ref(false);

const mapArrayToForm = (dataList: any[]) => {
    dataList.forEach(item => {
        if (settingsForm.value[item.key_name] !== undefined) {
            settingsForm.value[item.key_name] = item.value;
        }
    });
};

const fetchSettings = async () => {
    const { data, error } = await supabase.from('site_settings').select('*');
    if (data && data.length > 0) {
        mapArrayToForm(data);
    }
};

const saveSettings = async () => {
    saveLoading.value = true;
    try {
        // Upsert format hazırlığı
        for (const [key, val] of Object.entries(settingsForm.value)) {
            // Kontrol et
            const { data: existing } = await supabase.from('site_settings').select('id').eq('key_name', key).single();
            if (existing) {
                await supabase.from('site_settings').update({ value: val }).eq('id', existing.id);
            } else {
                await supabase.from('site_settings').insert({ key_name: key, value: val });
            }
        }
        alert('Ayarlar başarıyla güncellendi!');
    } catch (error: any) {
        alert('Hata oluştu: ' + error.message);
    } finally {
        saveLoading.value = false;
    }
};

onMounted(() => {
    fetchSettings();
});
</script>

<template>
    <v-row>
        <v-col cols="12" md="10" class="mx-auto">
            <v-card elevation="10">
                <v-card-item class="d-flex justify-space-between align-center mb-4">
                    <div>
                        <v-card-title class="text-h5">Genel Site Ayarları</v-card-title>
                        <v-card-subtitle>Anasayfa içerikleri, istatistikler ve iletişim bilgileri</v-card-subtitle>
                    </div>
                </v-card-item>
                
                <v-card-text>
                    <v-form @submit.prevent="saveSettings">
                        
                        <!-- Hero Section -->
                        <h3 class="text-h6 font-weight-bold mb-3 mt-4 text-primary">Anasayfa "Hero" Alanı</h3>
                        <v-divider class="mb-5"></v-divider>
                        
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="settingsForm.hero_badge" label="Üst Rozet Metni" variant="outlined" density="compact"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="settingsForm.hero_price_text" label="Fiyat Vurgusu Metni" variant="outlined" density="compact"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea v-model="settingsForm.hero_title" label="Ana Başlık" variant="outlined" rows="2"></v-textarea>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea v-model="settingsForm.hero_subtitle" label="Alt Açıklama (Subtitle)" variant="outlined" rows="2"></v-textarea>
                            </v-col>
                        </v-row>

                        <!-- Stats -->
                        <h3 class="text-h6 font-weight-bold mb-3 mt-6 text-primary">İstatistikler</h3>
                        <v-divider class="mb-5"></v-divider>

                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="settingsForm.stats_years" label="Yıllık Deneyim (Örn: 16+)" variant="outlined" density="compact"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="settingsForm.stats_rating" label="Google Puan (Örn: 4.8)" variant="outlined" density="compact"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="settingsForm.stats_guests" label="Mutlu Misafir (Örn: 65Bin+)" variant="outlined" density="compact"></v-text-field>
                            </v-col>
                        </v-row>

                        <!-- İletişim -->
                        <h3 class="text-h6 font-weight-bold mb-3 mt-6 text-primary">İletişim & Sosyal Medya</h3>
                        <v-divider class="mb-5"></v-divider>

                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="settingsForm.contact_phone" label="Görünür Telefon" variant="outlined" density="compact"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="settingsForm.contact_whatsapp" label="Whatsapp Numara (Boşluksuz)" hint="905011112233 gibi" variant="outlined" density="compact"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="settingsForm.contact_email" label="E-Posta" variant="outlined" density="compact"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="settingsForm.contact_address" label="Açık Adres" variant="outlined" density="compact"></v-text-field>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field v-model="settingsForm.social_instagram" label="Instagram URL" variant="outlined" density="compact"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="settingsForm.social_facebook" label="Facebook URL" variant="outlined" density="compact"></v-text-field>
                            </v-col>
                        </v-row>

                        <!-- SEO Settings -->
                        <h3 class="text-h6 font-weight-bold mb-3 mt-6 text-primary">Genel SEO Ayarları</h3>
                        <v-divider class="mb-5"></v-divider>

                        <v-row>
                            <v-col cols="12" md="12">
                                <v-text-field v-model="settingsForm.site_meta_title" label="Genel Site Başlığı (Title)" variant="outlined" density="compact" hint="Tüm sayfalarda varsayılan olarak kullanılır."></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea v-model="settingsForm.site_meta_description" label="Genel Site Açıklaması (Description)" variant="outlined" rows="3" density="compact" hint="Arama motorlarında anasayfa için çıkacak olan açıklama."></v-textarea>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="settingsForm.site_meta_keywords" label="Genel Anahtar Kelimeler (Keywords)" variant="outlined" density="compact" hint="Virgülle ayırarak yazın (örn: istanbul, yat, kiralama)"></v-text-field>
                            </v-col>
                        </v-row>

                        <div class="mt-6">
                            <v-btn type="submit" color="primary" block size="large" :loading="saveLoading">Tüm Ayarları Kaydet</v-btn>
                        </div>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>
