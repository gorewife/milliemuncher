export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    modules: ['@nuxtjs/supabase', '@nuxt/icon', '@nuxt/image'],

    css: ['~/assets/css/main.css'],

    supabase: {
        redirect: true,
        redirectOptions: {
            login: '/login',
            callback: '/confirm',
            include: ['/dashboard(/*)?']
        }
    },

    vite: {
        optimizeDeps: {
            include: [
                '@vue/devtools-core',
                '@vue/devtools-kit',
                '@vueuse/core',
                'md-editor-v3'
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
