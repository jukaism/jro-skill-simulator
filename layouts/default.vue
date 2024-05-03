<script setup lang="ts">
  useHead({
    title: `β開発ページ | やっぱりROが好き！`,
    meta: [
      {
        name: 'description',
        content: `β開発ページ | やっぱりROが好き！`,
      },
      {
        name: 'og:title',
        content: `β開発ページ | やっぱりROが好き！`,
      },
      {
        name: 'og:description',
        content: `β開発ページ | やっぱりROが好き！`,
      },
    ],
  })

  const clipped = ref<boolean>(false)
  const drawer = ref<boolean>(false)
</script>

<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" temporary fixed>
      <v-list>
        <v-list-item title="Top" href="https://yapparo.net" exact link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app class="skill-app-bar">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>
<style lang="scss" scoped>
  .job-name {
    min-width: 100px;
    font-size: 1em;
  }
</style>
