<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useSupabaseClient } from '#imports';

definePageMeta({
  layout: "default",
});

const supabase = useSupabaseClient();
const redirects = ref<any[]>([]);
const loading = ref(true);

const search = ref('');
const dialog = ref(false);
const dialogDelete = ref(false);

const headers = [
  { title: 'Eski URL', key: 'old_path' },
  { title: 'Yeni URL', key: 'new_path' },
  { title: 'Durum Kodu', key: 'status_code' },
  { title: 'Aktif mi?', key: 'is_active' },
  { title: 'İşlemler', key: 'actions', sortable: false, align: 'end' },
];

const defaultItem = {
  id: null,
  old_path: '',
  new_path: '',
  status_code: 301,
  is_active: true
};

const editedItem = ref({ ...defaultItem });

const fetchRedirects = async () => {
    loading.value = true;
    const { data, error } = await supabase.from('redirects').select('*').order('created_at', { ascending: false });
    if (!error && data) {
        redirects.value = data;
    }
    loading.value = false;
};

onMounted(() => {
    fetchRedirects();
});

const formTitle = computed(() => {
  return editedItem.value.id === null ? 'Yeni Yönlendirme Ekle' : 'Yönlendirme Düzenle';
});

const close = () => {
  dialog.value = false;
  setTimeout(() => {
    editedItem.value = { ...defaultItem };
  }, 300);
};

const closeDelete = () => {
  dialogDelete.value = false;
  setTimeout(() => {
    editedItem.value = { ...defaultItem };
  }, 300);
};

const editItem = (item: any) => {
  editedItem.value = { ...item };
  dialog.value = true;
};

const deleteItem = (item: any) => {
  editedItem.value = { ...item };
  dialogDelete.value = true;
};

const deleteItemConfirm = async () => {
  const { error } = await supabase.from('redirects').delete().eq('id', editedItem.value.id);
  if (!error) {
    await fetchRedirects();
  }
  closeDelete();
};

const save = async () => {
  // Normalize paths (ensure they start with /)
  if (editedItem.value.old_path && !editedItem.value.old_path.startsWith('/')) {
      editedItem.value.old_path = '/' + editedItem.value.old_path;
  }
  if (editedItem.value.new_path && !editedItem.value.new_path.startsWith('http') && !editedItem.value.new_path.startsWith('/')) {
      editedItem.value.new_path = '/' + editedItem.value.new_path;
  }

  const payload = {
    old_path: editedItem.value.old_path,
    new_path: editedItem.value.new_path,
    status_code: editedItem.value.status_code,
    is_active: editedItem.value.is_active
  };

  if (editedItem.value.id) {
    await supabase.from('redirects').update(payload).eq('id', editedItem.value.id);
  } else {
    await supabase.from('redirects').insert([payload]);
  }
  await fetchRedirects();
  close();
};
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="10">
        <v-card-title class="d-flex align-center mt-3 mb-2 px-6">
          <span class="text-h5 font-weight-bold">301 Yönlendirmeleri</span>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-inner-icon="mdi-magnify"
            label="Ara"
            single-line
            hide-details
            density="compact"
            class="mr-4"
            style="max-width: 300px"
          ></v-text-field>
          <v-btn color="primary" @click="dialog = true">Yeni Yönlendirme</v-btn>
        </v-card-title>

        <v-card-text>
          <v-alert type="info" variant="tonal" class="mb-4 text-body-2">
            Eski sayfalardan gelen ziyaretçileri ve Google botlarını 404 hatasına düşürmeden yeni sayfalara yönlendirin. Bu işlem SEO puanınızın düşmesini engeller. Not: Değişikliklerin siteye yansıması (önbellek nedeniyle) 5 dakikayı bulabilir.
          </v-alert>

          <v-data-table
            :headers="headers"
            :items="redirects"
            :search="search"
            :loading="loading"
            class="elevation-0"
          >
            <template v-slot:item.is_active="{ item }">
              <v-chip :color="item.is_active ? 'success' : 'default'" size="small">
                 {{ item.is_active ? 'Aktif' : 'Pasif' }}
              </v-chip>
            </template>
            <template v-slot:item.status_code="{ item }">
              <v-chip color="primary" variant="tonal" size="small">
                 {{ item.status_code }}
              </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon size="small" class="me-2" @click="editItem(item)" color="primary">mdi-pencil</v-icon>
              <v-icon size="small" @click="deleteItem(item)" color="error">mdi-delete</v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="fetchRedirects">Yenile</v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <!-- Create/Edit Dialog -->
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="editedItem.old_path" label="Eski URL (Örn: /eski-yat)" required variant="outlined" hint="Başına / koymayı unutmayın."></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="editedItem.new_path" label="Yeni Hedef URL (Örn: /yatlarimiz/yeni-yat)" required variant="outlined" hint="Başka bir siteye de yönlendirebilirsiniz (https://...)"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select v-model="editedItem.status_code" :items="[301, 302, 307, 308]" label="Durum Kodu" variant="outlined" hint="SEO için genelde kalıcı 301 önerilir."></v-select>
            </v-col>
            <v-col cols="12" md="6" class="d-flex align-center">
              <v-switch v-model="editedItem.is_active" label="Aktif mi?" color="success" hide-details></v-switch>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="close">İptal</v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="save">Kaydet</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Delete Confirmation Dialog -->
  <v-dialog v-model="dialogDelete" max-width="500px">
    <v-card>
      <v-card-title class="text-h5">Silme Onayı</v-card-title>
      <v-card-text>Bu yönlendirmeyi silmek istediğinizden emin misiniz?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="closeDelete">İptal</v-btn>
        <v-btn color="error" variant="text" @click="deleteItemConfirm">Evet, Sil</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
