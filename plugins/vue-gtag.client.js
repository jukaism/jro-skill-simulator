import { defineNuxtPlugin } from '#app'
import VueGtag from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  const getGDPR = localStorage.getItem('GDPR:accepted')
  nuxtApp.vueApp.use(
    VueGtag,
    {
      property: {
        id: 'G-6KSJPVL0P1',
      },
      appName: 'やっぱりROが好き！',
      enabled: getGDPR === 'true',
      pageTrackerScreenviewEnabled: true,
    },
    nuxtApp.vueApp.router,
  )
})
