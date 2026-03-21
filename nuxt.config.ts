export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/supabase', '@nuxt/icon', '@nuxt/image'],

  css: ['~/assets/css/main.css'],

  supabase: {
    redirect: false
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        '@vueuse/core',
      ]
    }
  },

  nitro: {
    storage: {
      data: process.env.KV_REST_API_URL
        ? { driver: 'vercel-kv' }
        : { driver: 'fs', base: './.data/storage' }
    }
  }
})
