// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  css: ['vuetify/lib/styles/main.sass', 'mdi/css/materialdesignicons.min.css'],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/_colors.scss" as *;',
        },
      },
    },
  },
  app: {
    baseURL: '/skill/',
    head: {
      title: `スキルシミュレータ | やっぱりROが好き！`,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: `ROの今風リッチスキルシミュレータ`,
        },
        { property: 'og:site_name', content: 'やっぱりROが好き！' },
        {
          property: 'og:title',
          content: `スキルシミュレータ | やっぱりROが好き！`,
        },
        {
          property: 'og:description',
          content: `ROの今風リッチスキルシミュレータ`,
        },
        { property: 'og:image', content: `/skill/ogp/skill.png` },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
    },
  },
})
