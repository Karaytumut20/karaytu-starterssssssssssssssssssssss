<script setup lang="ts">
const props = defineProps({
  error: Object
})
const title = ref("Error Page");
useHead({
  meta: [{ content: title }],
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} - Error`
      : "Error";
  },
});
</script>
<template>
  <div class="d-flex justify-center align-center text-center h-100vh">
      <div>
          <img src="/images/background/errorimg.svg" width="500" alt="error" />
          <h1 class="text-h1 pt-3">Opps!!!</h1>
          <h4 class="text-h4 my-8">{{ error?.statusCode }} - {{ error?.message || 'Page not found' }}</h4>
          <p class="mb-8 text-red font-weight-bold">{{ error?.stack }}</p>
          <v-btn flat color="primary" class="mb-4" to="/">Go Back to Home</v-btn>
      </div>    
  </div>
</template>
