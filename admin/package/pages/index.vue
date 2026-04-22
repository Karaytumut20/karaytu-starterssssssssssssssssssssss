<script setup lang="ts">
import { ref, onMounted } from 'vue';

const supabase = useSupabaseClient();
const loading = ref(true);

const stats = ref({
    totalYachts: 0,
    totalExperiences: 0,
    totalReservations: 0,
    pendingReservations: 0
});

const recentReservations = ref<any[]>([]);

const fetchDashboardData = async () => {
    loading.value = true;
    try {
        // Fetch Yachts count
        const { count: yachtsCount } = await supabase.from('yachts').select('*', { count: 'exact', head: true });
        stats.value.totalYachts = yachtsCount || 0;

        // Fetch Experiences count
        const { count: expCount } = await supabase.from('experiences').select('*', { count: 'exact', head: true });
        stats.value.totalExperiences = expCount || 0;

        // Fetch total reservations
        const { count: resCount } = await supabase.from('reservations').select('*', { count: 'exact', head: true });
        stats.value.totalReservations = resCount || 0;

        // Fetch pending reservations
        const { count: pendingCount } = await supabase.from('reservations').select('*', { count: 'exact', head: true }).eq('status', 'pending');
        stats.value.pendingReservations = pendingCount || 0;

        // Fetch 5 recent reservations
        const { data: recent } = await supabase
            .from('reservations')
            .select('*, yachts(name), experiences(title)')
            .order('created_at', { ascending: false })
            .limit(5);
        
        recentReservations.value = recent || [];
    } catch (e) {
        console.error("Dashboard veri hatası:", e);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchDashboardData();
});
</script>

<template>
    <v-row v-if="loading">
        <v-col cols="12" class="text-center py-10">Yükleniyor...</v-col>
    </v-row>
    <v-row v-else>
        <!-- İstatistik KARTLARI -->
        <v-col cols="12" md="3">
            <v-card elevation="10" class="bg-primary text-white">
                <v-card-item>
                    <div class="d-flex justify-space-between align-center">
                        <div>
                            <v-card-title class="text-h6 opacity-80">Toplam Yat</v-card-title>
                            <h2 class="text-h3 font-weight-bold mt-2">{{ stats.totalYachts }}</h2>
                        </div>
                        <v-icon size="48" class="opacity-50">mdi-ferry</v-icon>
                    </div>
                </v-card-item>
            </v-card>
        </v-col>

        <v-col cols="12" md="3">
            <v-card elevation="10" class="bg-info text-white">
                <v-card-item>
                    <div class="d-flex justify-space-between align-center">
                        <div>
                            <v-card-title class="text-h6 opacity-80">Aktif Deneyimler</v-card-title>
                            <h2 class="text-h3 font-weight-bold mt-2">{{ stats.totalExperiences }}</h2>
                        </div>
                        <v-icon size="48" class="opacity-50">mdi-waves</v-icon>
                    </div>
                </v-card-item>
            </v-card>
        </v-col>

        <v-col cols="12" md="3">
            <v-card elevation="10" class="bg-success text-white">
                <v-card-item>
                    <div class="d-flex justify-space-between align-center">
                        <div>
                            <v-card-title class="text-h6 opacity-80">Toplam Talep</v-card-title>
                            <h2 class="text-h3 font-weight-bold mt-2">{{ stats.totalReservations }}</h2>
                        </div>
                        <v-icon size="48" class="opacity-50">mdi-calendar-check</v-icon>
                    </div>
                </v-card-item>
            </v-card>
        </v-col>

        <v-col cols="12" md="3">
            <v-card elevation="10" class="bg-warning text-white">
                <v-card-item>
                    <div class="d-flex justify-space-between align-center">
                        <div>
                            <v-card-title class="text-h6 opacity-80">Bekleyen Talep</v-card-title>
                            <h2 class="text-h3 font-weight-bold mt-2">{{ stats.pendingReservations }}</h2>
                        </div>
                        <v-icon size="48" class="opacity-50">mdi-clock-outline</v-icon>
                    </div>
                </v-card-item>
            </v-card>
        </v-col>

        <!-- SON REZERVASYONLAR TABLOSU -->
        <v-col cols="12" class="mt-6">
            <v-card elevation="10">
                <v-card-item class="d-flex justify-space-between align-center">
                    <div>
                        <v-card-title class="text-h5">Son Rezervasyon Talepleri</v-card-title>
                        <v-card-subtitle>Sisteme düşen en son 5 talep</v-card-subtitle>
                    </div>
                    <v-btn color="primary" variant="tonal" @click="$router.push('/reservations')">Tümünü Gör</v-btn>
                </v-card-item>
                
                <v-card-text>
                    <v-table>
                        <thead>
                            <tr>
                                <th>Tarih</th>
                                <th>Müşteri</th>
                                <th>Yat / Deneyim</th>
                                <th>Durum</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="recentReservations.length === 0">
                                <td colspan="4" class="text-center py-4">Kayıtlı talebiniz yok.</td>
                            </tr>
                            <tr v-for="res in recentReservations" :key="res.id">
                                <td>
                                    <div class="font-weight-medium">{{ res.booking_date }}</div>
                                    <div class="text-caption text-muted">{{ res.start_time }}</div>
                                </td>
                                <td>
                                    <div class="font-weight-medium">{{ res.full_name }}</div>
                                    <div class="text-caption text-muted">{{ res.phone_number }}</div>
                                </td>
                                <td>
                                    <div>{{ res.yachts?.name || 'Belirtilmedi' }}</div>
                                    <div class="text-caption text-muted">{{ res.experiences?.title }}</div>
                                </td>
                                <td>
                                    <v-chip :color="res.status === 'confirmed' ? 'success' : res.status === 'cancelled' ? 'error' : 'warning'" size="small">
                                        {{ res.status }}
                                    </v-chip>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>