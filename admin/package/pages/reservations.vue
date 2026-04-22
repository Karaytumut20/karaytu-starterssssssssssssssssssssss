<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useSupabaseClient, useRoute, useRouter } from '#imports';

const supabase = useSupabaseClient();
const route = useRoute();
const router = useRouter();
const reservations = ref<any[]>([]);
const loading = ref(true);

// Dialog State
const dialog = ref(false);
const selectedRes = ref<any>(null);
const saving = ref(false);

const statusOptions = [
    { title: 'Bekliyor (Yeni)', value: 'pending' },
    { title: 'Onaylandı', value: 'confirmed' },
    { title: 'Tamamlandı', value: 'completed' },
    { title: 'İptal Edildi', value: 'cancelled' }
];

const paymentStatusOptions = [
    { title: 'Ödeme Bekleniyor', value: 'unpaid' },
    { title: 'Kapora Alındı', value: 'partial' },
    { title: 'Tamamı Ödendi', value: 'paid' },
    { title: 'İade Edildi', value: 'refunded' }
];

const schemaError = ref(false);

const fetchReservations = async () => {
    loading.value = true;
    schemaError.value = false;
    
    const { data, error } = await supabase
        .from('reservations')
        .select(`
            *,
            yachts(name),
            experiences(title)
        `)
        .order('created_at', { ascending: false });
    
    if (error) {
        console.error("Reservations fetch error:", error);
        // If error mentions amount_paid or schema, flag it
        if(error.message.includes('amount_paid')) {
             schemaError.value = true;
        }
    }
    
    reservations.value = data || [];
    
    if (route.query.id) {
        const targetRes = reservations.value.find(r => r.id === route.query.id);
        if (targetRes) {
            openDetails(targetRes);
            router.replace({ query: {} });
        }
    }
    
    loading.value = false;
};

const openDetails = (res: any) => {
    selectedRes.value = { ...res };
    if (selectedRes.value.amount_paid === undefined || selectedRes.value.amount_paid === null) {
        selectedRes.value.amount_paid = 0;
    }
    dialog.value = true;
};

const saveChanges = async () => {
    if (!selectedRes.value) return;
    saving.value = true;
    
    const { error } = await supabase
        .from('reservations')
        .update({
            status: selectedRes.value.status,
            payment_status: selectedRes.value.payment_status,
            amount_paid: Number(selectedRes.value.amount_paid) || 0
        })
        .eq('id', selectedRes.value.id);
        
    saving.value = false;
    
    if (!error) {
        dialog.value = false;
        fetchReservations();
    } else {
        console.error(error);
        if(error.message.includes("amount_paid") || error.code === 'PGRST204') {
             schemaError.value = true;
             alert("KRİTİK HATA: Veritabanında 'amount_paid' kolonu bulunamadı! Lütfen Supabase SQL Editor'den ilgili kodu çalıştırın.");
             dialog.value = false;
        } else {
             alert("Güncelleme hatası: " + error.message);
        }
    }
};

const deleteReservation = async (id: string) => {
    if(confirm("Bu rezervasyonu kalıcı olarak silmek istediğinize emin misiniz?")) {
        const { error } = await supabase.from('reservations').delete().eq('id', id);
        if(!error) {
            fetchReservations();
            dialog.value = false;
        } else {
            alert("Silme hatası: " + error.message);
        }
    }
};

const getStatusColor = (status: string) => {
    switch(status) {
        case 'pending': return 'warning';
        case 'confirmed': return 'info';
        case 'completed': return 'success';
        case 'cancelled': return 'error';
        default: return 'grey';
    }
};

const getStatusText = (status: string) => {
    return statusOptions.find(o => o.value === status)?.title || status;
};

const getPaymentColor = (pStatus: string) => {
    switch(pStatus) {
        case 'unpaid': return 'error';
        case 'partial': return 'warning';
        case 'paid': return 'success';
        case 'refunded': return 'grey';
        default: return 'grey';
    }
};

const getPaymentText = (pStatus: string) => {
    return paymentStatusOptions.find(o => o.value === pStatus)?.title || pStatus;
};

onMounted(() => {
    fetchReservations();
});
</script>

<template>
    <v-row>
        <v-col cols="12">
            <!-- ERROR BANNER -->
            <v-alert
                v-if="schemaError"
                type="error"
                variant="tonal"
                title="Veritabanı Güncellemesi Gerekli!"
                class="mb-6 font-weight-bold border-error"
                closable
            >
                Finansal hesaplamaların (Alınan / Kalan Tutar) çalışması için veritabanında "amount_paid" kolonu eksik. <br><br>
                <strong>Lütfen Supabase > SQL Editor kısmına gidip şu kodu çalıştırın:</strong><br>
                <code class="bg-error-lighten-4 pa-1 rounded text-error mt-2 d-inline-block">ALTER TABLE public.reservations ADD COLUMN IF NOT EXISTS amount_paid NUMERIC DEFAULT 0;</code>
            </v-alert>

            <v-card elevation="10">
                <v-card-item class="d-flex align-center justify-space-between pb-4">
                    <div>
                        <v-card-title class="text-h5 font-weight-bold">Rezervasyon Yönetimi</v-card-title>
                        <v-card-subtitle>Gelen tüm yat kiralama ve tur talepleri</v-card-subtitle>
                    </div>
                    <v-btn color="primary" @click="fetchReservations" :loading="loading" icon="mdi-refresh" variant="tonal"></v-btn>
                </v-card-item>
                
                <v-card-text>
                    <v-table hover>
                        <thead>
                            <tr>
                                <th>Tarih / Saat</th>
                                <th>Müşteri</th>
                                <th>Yat / Deneyim</th>
                                <th>Finansal Durum</th>
                                <th>Rezervasyon Durumu</th>
                                <th class="text-right">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="loading">
                                <td colspan="6" class="text-center py-8">
                                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                                </td>
                            </tr>
                            <tr v-else-if="reservations.length === 0">
                                <td colspan="6" class="text-center py-8 text-muted">Kayıtlı rezervasyon bulunamadı.</td>
                            </tr>
                            <tr v-for="res in reservations" :key="res.id">
                                <td>
                                    <div class="font-weight-bold">{{ res.booking_date }}</div>
                                    <div class="text-caption text-grey-darken-1">{{ res.start_time }} ({{ res.duration_hours }} Saat)</div>
                                </td>
                                <td>
                                    <div class="font-weight-bold">{{ res.full_name }}</div>
                                    <div class="text-caption text-grey-darken-1">{{ res.phone_number }}</div>
                                </td>
                                <td>
                                    <div class="font-weight-medium">{{ res.yachts?.name || 'Belirtilmedi' }}</div>
                                    <v-chip v-if="res.guest_count" size="x-small" color="primary" variant="flat" class="mt-1">{{ res.guest_count }} Kişi</v-chip>
                                </td>
                                <td>
                                    <div class="font-weight-bold text-primary">{{ Number(res.total_price).toLocaleString('tr-TR') }} TL Toplam</div>
                                    <div class="text-caption text-success font-weight-bold mt-1">Alınan: {{ Number(res.amount_paid || 0).toLocaleString('tr-TR') }} TL</div>
                                    <div class="text-caption text-error font-weight-bold">Kalan: {{ Math.max(0, Number(res.total_price) - Number(res.amount_paid || 0)).toLocaleString('tr-TR') }} TL</div>
                                </td>
                                <td>
                                    <v-chip :color="getStatusColor(res.status)" size="small" variant="elevated" class="font-weight-bold mb-1 d-block text-center">
                                        {{ getStatusText(res.status) }}
                                    </v-chip>
                                    <v-chip :color="getPaymentColor(res.payment_status)" size="x-small" class="d-block text-center mt-1" variant="flat">
                                        {{ getPaymentText(res.payment_status) }}
                                    </v-chip>
                                </td>
                                <td class="text-right">
                                    <v-btn size="small" color="primary" variant="elevated" @click="openDetails(res)">Detaylar</v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>

    <!-- DETAY / DÜZENLEME MODAL -->
    <v-dialog v-model="dialog" max-width="800" persistent>
        <v-card v-if="selectedRes" class="rounded-xl">
            <v-card-title class="bg-primary text-white py-4 px-6 d-flex justify-space-between align-center">
                <span class="text-h6 font-weight-bold">Rezervasyon Detayı</span>
                <v-btn icon="mdi-close" variant="text" color="white" @click="dialog = false"></v-btn>
            </v-card-title>

            <v-card-text class="pa-6 bg-grey-lighten-4">
                <v-row>
                    <!-- Müşteri Bilgileri -->
                    <v-col cols="12" md="6">
                        <v-card elevation="2" class="h-100 rounded-lg">
                            <v-card-title class="text-subtitle-1 font-weight-bold border-b pb-2">Müşteri Bilgileri</v-card-title>
                            <v-card-text class="pt-4">
                                <p class="mb-2"><strong>Ad Soyad:</strong> {{ selectedRes.full_name }}</p>
                                <p class="mb-2"><strong>Telefon:</strong> <a :href="'tel:' + selectedRes.phone_number" class="text-primary">{{ selectedRes.phone_number }}</a></p>
                                <p class="mb-2"><strong>E-posta:</strong> {{ selectedRes.email }}</p>
                                <p v-if="selectedRes.notes" class="mt-4 pt-4 border-t text-body-2 bg-grey-lighten-5 pa-2 rounded">
                                    <strong>Müşteri Notu:</strong><br/>
                                    {{ selectedRes.notes }}
                                </p>
                            </v-card-text>
                        </v-card>
                    </v-col>

                    <!-- Tur Bilgileri -->
                    <v-col cols="12" md="6">
                        <v-card elevation="2" class="h-100 rounded-lg">
                            <v-card-title class="text-subtitle-1 font-weight-bold border-b pb-2">Tur Bilgileri</v-card-title>
                            <v-card-text class="pt-4">
                                <p class="mb-2"><strong>Yat:</strong> {{ selectedRes.yachts?.name || 'Belirtilmedi' }}</p>
                                <p class="mb-2"><strong>Tarih:</strong> <v-chip size="small" color="primary">{{ selectedRes.booking_date }}</v-chip></p>
                                <p class="mb-2"><strong>Saat:</strong> {{ selectedRes.start_time }} ({{ selectedRes.duration_hours }} saat)</p>
                                <p class="mb-2"><strong>Kişi Sayısı:</strong> {{ selectedRes.guest_count }} Kişi</p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>

                <v-row class="mt-4">
                    <v-col cols="12">
                        <v-card elevation="2" class="rounded-lg">
                            <v-card-title class="text-subtitle-1 font-weight-bold border-b pb-2">Durum & Finansal İşlemler</v-card-title>
                            <v-card-text class="pt-6">
                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-select
                                            v-model="selectedRes.status"
                                            :items="statusOptions"
                                            item-title="title"
                                            item-value="value"
                                            label="Rezervasyon Durumu"
                                            variant="outlined"
                                            density="comfortable"
                                            color="primary"
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-select
                                            v-model="selectedRes.payment_status"
                                            :items="paymentStatusOptions"
                                            item-title="title"
                                            item-value="value"
                                            label="Ödeme Durumu"
                                            variant="outlined"
                                            density="comfortable"
                                            color="primary"
                                        ></v-select>
                                    </v-col>
                                </v-row>
                                
                                <v-divider class="my-4"></v-divider>

                                <v-row align="center">
                                    <v-col cols="12" sm="4">
                                        <div class="text-body-2 text-grey-darken-1 mb-1">Toplam Tutar</div>
                                        <div class="text-h6 font-weight-bold">{{ Number(selectedRes.total_price).toLocaleString('tr-TR') }} TL</div>
                                        <div class="text-caption text-warning mt-1">İstenen Kapora: {{ Number(selectedRes.prepayment_amount).toLocaleString('tr-TR') }} TL</div>
                                    </v-col>
                                    <v-col cols="12" sm="4">
                                        <v-text-field
                                            v-model.number="selectedRes.amount_paid"
                                            label="Alınan Tutar (Ödenen)"
                                            type="number"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            prefix="₺"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" class="text-right">
                                        <div class="text-body-2 text-grey-darken-1 mb-1">Kalan Tutar</div>
                                        <div :class="['text-h5 font-weight-black', (Number(selectedRes.total_price) - Number(selectedRes.amount_paid)) <= 0 ? 'text-success' : 'text-error']">
                                            {{ Math.max(0, Number(selectedRes.total_price) - Number(selectedRes.amount_paid)).toLocaleString('tr-TR') }} TL
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions class="pa-4 bg-white">
                <v-btn color="error" variant="text" @click="deleteReservation(selectedRes.id)">Sil</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="grey-darken-1" variant="text" @click="dialog = false" class="px-4">Vazgeç</v-btn>
                <v-btn color="primary" variant="elevated" @click="saveChanges" :loading="saving" class="px-6 font-weight-bold">Değişiklikleri Kaydet</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
