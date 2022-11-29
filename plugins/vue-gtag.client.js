import { defineNuxtPlugin } from '#app'
import VueGtag from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  const getGDPR = localStorage.getItem('GDPR:accepted')
  nuxtApp.vueApp.use(
    VueGtag,
    {
      property: {
        id: 'G-XMCMVBDRYH',
      },
      appName: 'APP NAME',
      enabled: getGDPR === 'true',
      pageTrackerScreenviewEnabled: true,
    },
    nuxtApp.vueApp.router,
  )
})
