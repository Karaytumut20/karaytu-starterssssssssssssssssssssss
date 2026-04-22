<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useSupabaseClient, navigateTo } from '#imports';
import { BellRingingIcon } from 'vue-tabler-icons';

const supabase = useSupabaseClient();
const notifications = ref<any[]>([]);
const unreadCount = ref(0);
const menu = ref(false);

const fetchNotifications = async () => {
    const { data } = await supabase
        .from('reservations')
        .select('id, full_name, created_at, status')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(5);
        
    if (data) {
        notifications.value = data;
        unreadCount.value = data.length;
    }
};

let realtimeChannel: any;

onMounted(() => {
    fetchNotifications();
    
    realtimeChannel = supabase.channel('reservations-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'reservations' },
        (payload) => {
          fetchNotifications();
        }
      )
      .subscribe();
});

onUnmounted(() => {
    if (realtimeChannel) {
        supabase.removeChannel(realtimeChannel);
    }
});

const openReservation = (id: string) => {
    menu.value = false;
    navigateTo({ path: '/reservations', query: { id } });
};
</script>

<template>
    <v-menu v-model="menu" :close-on-content-click="false" location="bottom end" offset="10">
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon variant="text" class="custom-hover-primary ml-0 ml-md-5 text-muted">
                <v-badge v-if="unreadCount > 0" :content="unreadCount" color="error" offset-x="-5" offset-y="-3">
                    <BellRingingIcon stroke-width="1.5" size="22" />
                </v-badge>
                <v-badge v-else dot color="primary" offset-x="-5" offset-y="-3">
                    <BellRingingIcon stroke-width="1.5" size="22" />
                </v-badge>
            </v-btn>
        </template>
        
        <v-card width="350" elevation="10" class="rounded-xl">
            <v-card-item class="pb-3 border-b">
                <v-card-title class="text-h6 font-weight-bold d-flex align-center justify-space-between">
                    Bildirimler
                    <v-chip color="primary" size="small">{{ unreadCount }} Bekleyen</v-chip>
                </v-card-title>
            </v-card-item>
            
            <v-list lines="two" class="py-0" v-if="notifications.length > 0">
                <v-list-item v-for="notif in notifications" :key="notif.id" @click="openReservation(notif.id)" class="border-b" hover>
                    <template v-slot:prepend>
                        <v-avatar color="primary" variant="tonal" class="font-weight-bold mr-3">
                            {{ notif.full_name?.charAt(0).toUpperCase() || 'R' }}
                        </v-avatar>
                    </template>
                    <v-list-item-title class="font-weight-bold mb-1 text-subtitle-2">Yeni Rezervasyon</v-list-item-title>
                    <v-list-item-subtitle class="text-caption text-wrap">
                        <strong>{{ notif.full_name }}</strong> yeni bir talep gönderdi.
                    </v-list-item-subtitle>
                    <template v-slot:append>
                        <span class="text-caption text-muted">{{ new Date(notif.created_at).toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'}) }}</span>
                    </template>
                </v-list-item>
            </v-list>
            
            <div v-else class="pa-6 text-center text-muted">
                Bekleyen yeni rezervasyon yok.
            </div>
            
            <v-card-actions class="pa-3 justify-center border-t">
                <v-btn color="primary" variant="text" block to="/reservations" @click="menu = false">Tüm Rezervasyonlar</v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>
