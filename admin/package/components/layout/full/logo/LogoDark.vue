<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
</script>
<template>
    <div class="logo">
        <NuxtLink to="/" class="d-flex align-center" style="text-decoration: none;">
            <v-icon color="primary" size="32" class="mr-2">mdi-sailing</v-icon>
            <span class="text-h6 font-weight-black text-primary" style="letter-spacing: 0.1em;">SU YATÇILIK</span>
        </NuxtLink>
    </div>
</template>
