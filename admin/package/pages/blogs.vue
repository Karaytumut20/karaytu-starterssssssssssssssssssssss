<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// Supabase hook
const supabase = useSupabaseClient();
const router = useRouter();

const search = ref('');
const headers = [
    { title: 'Görsel', key: 'image_url', sortable: false },
    { title: 'Başlık', key: 'title' },
    { title: 'Kategori', key: 'category' },
    { title: 'Oluşturulma', key: 'created_at' },
    { title: 'Durum', key: 'is_active' },
    { title: 'İşlemler', key: 'actions', sortable: false, align: 'end' as const }
];

const posts = ref<any[]>([]);
const loading = ref(true);

const fetchPosts = async () => {
    loading.value = true;
    try {
        const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        posts.value = data || [];
    } catch (err: any) {
        if(err.code === '42P01') { // table doesn't exist
            alert('Lütfen Supabase SQL editöründe blogs tablosunu oluşturun (Bkz: dökümantasyon/mesaj).');
        } else {
            console.error('Bloglar çekilirken hata:', err.message);
        }
    } finally {
        loading.value = false;
    }
};

const deletePost = async (id: string) => {
    if (!confirm('Bu blog yazısını silmek istediğinize emin misiniz?')) return;
    try {
        const { error } = await supabase.from('blogs').delete().eq('id', id);
        if (error) throw error;
        fetchPosts();
    } catch (err: any) {
        alert('Blog yazısı silinirken hata oluştu: ' + err.message);
    }
};

const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(d);
};

onMounted(() => {
    fetchPosts();
});
</script>

<template>
    <v-row>
        <v-col cols="12" md="12">
            <v-card elevation="10" title="Blog Yönetimi">
                <template v-slot:append>
                    <v-btn color="primary" @click="$router.push('/blogs-add')">Yeni Yazı Ekle</v-btn>
                </template>
                <v-card-text>
                    <v-text-field
                        v-model="search"
                        append-inner-icon="mdi-magnify"
                        label="Yazı Ara"
                        single-line
                        hide-details
                        variant="outlined"
                        class="mb-4"
                        density="comfortable"
                    ></v-text-field>

                    <v-data-table
                        :headers="headers"
                        :items="posts"
                        :search="search"
                        :loading="loading"
                        no-data-text="Henüz blog yazısı eklenmemiş."
                        hover
                    >
                        <!-- Görsel -->
                        <template v-slot:item.image_url="{ item }">
                            <v-avatar rounded="lg" size="48" color="grey-lighten-2" class="my-2">
                                <v-img :src="item.image_url || '/images/default.jpg'" cover></v-img>
                            </v-avatar>
                        </template>

                        <!-- Başlık -->
                        <template v-slot:item.title="{ item }">
                            <div class="font-weight-medium">{{ item.title }}</div>
                            <div class="text-caption text-grey">/blog/{{ item.slug }}</div>
                        </template>

                        <!-- Kategori -->
                        <template v-slot:item.category="{ item }">
                            <v-chip size="small" color="secondary" variant="tonal">{{ item.category }}</v-chip>
                        </template>

                        <!-- Tarih -->
                        <template v-slot:item.created_at="{ item }">
                            {{ formatDate(item.created_at) }}
                        </template>

                        <!-- Aktif -->
                        <template v-slot:item.is_active="{ item }">
                            <v-chip :color="item.is_active ? 'success' : 'error'" size="small">
                                {{ item.is_active ? 'Aktif' : 'Pasif' }}
                            </v-chip>
                        </template>

                        <!-- Actions -->
                        <template v-slot:item.actions="{ item }">
                            <v-btn icon="mdi-pencil" size="small" variant="text" color="primary" @click="$router.push(`/blogs-edit-${item.id}`)"></v-btn>
                            <v-btn icon="mdi-delete" size="small" variant="text" color="error" @click="deletePost(item.id)"></v-btn>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>
