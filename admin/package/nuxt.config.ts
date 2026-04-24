// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  
  experimental: {
    appManifest: false
  },

  typescript: {
    shim: false
  },

  app: {
    baseURL: '/admin/',
  },

  devServer: {
    host: '127.0.0.1',
  },

  modules: ["@nuxtjs/supabase"],

  supabase: {
    redirectOptions: {
      login: "/auth/login",
      callback: "/confirm",
      exclude: ["/*"], // For now exclude to not block development
    },
  },

  build: {
    transpile: ["vuetify"],
  },

  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },

  nitro: {
    serveStatic: true,
  },

  devServerHandlers: [],

  hooks: {
  },

  compatibilityDate: "2025-04-15",
})
// trigger rebuild