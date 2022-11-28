<script setup lang="ts">
  import { Ref } from 'vue'
  interface Modal {
    visible: boolean
    head: string
    body: string
  }
  interface Head {
    icon?: string
    alticon?: string
    text: string
    to?: string
    model?: boolean
    children?: Child[]
  }
  interface Child {
    text: string
    to: string
    icon?: string
  }

  const clipped = ref<boolean>(false)
  const drawer = ref<boolean>(false)
  const items = ref<Head[]>([
    {
      icon: 'mdi-chevron-up',
      alticon: 'mdi-chevron-down',
      text: '4-1',
      children: [
        {
          text: 'Dragon Knight',
          to: '/dragonknight',
        },
        { text: 'Arch Mage', to: '/archmage' },
        { text: 'Wind Hawk', to: '/windhawk' },
        { text: 'Cardinal', to: '/cardinal' },
        { text: 'Meister', to: '/meister' },
        {
          text: 'Shadow Cross',
          to: '/shadowcross',
        },
      ],
    },
    {
      icon: 'mdi-chevron-up',
      alticon: 'mdi-chevron-down',
      text: '4-2',
      children: [
        {
          text: 'Imperial Guard',
          to: '/imperialguard',
        },
        {
          text: 'Elemental Master',
          to: '/elementalmaster',
        },
        { text: 'Troubadour', to: '/troubadour' },
        { text: 'Trouvere', to: '/trouvere' },
        { text: 'Inquisitor', to: '/inquisitor' },
        { text: 'Biolo', to: '/biolo' },
        { text: 'Abyss Chaser', to: '/abysschaser' },
      ],
    },
    {
      icon: 'mdi-chevron-up',
      alticon: 'mdi-chevron-down',
      text: 'Others',
      children: [
        { text: 'Star Emperor', to: '/staremperor' },
        { text: 'Soul Reaper', to: '/soulreaper' },
        { text: 'Super Novice', to: '/supernovice' },
        { text: 'Kagerou', to: '/kagerou' },
        { text: 'Oboro', to: '/oboro' },
        { text: 'Rebellion', to: '/rebel' },
        { text: 'Summoner', to: '/summoner' },
      ],
    },
  ])
  const route = useRoute()
  function generateUrl() {
    modal.value.head = 'URLを出力しました。'
    modal.value.body =
      location.protocol +
      '//' +
      location.host +
      route.path +
      '?s=' +
      getParams()
    modal.value.visible = true
  }
  const open = ref(['4-1'])
  const miniVariant = ref<boolean>(false)
  const rightDrawer = ref<boolean>(false)
  const modal: Ref<Modal> = ref<Modal>({
    visible: false,
    head: '',
    body: '',
  })
  const jobName = useDisplayJobName()
  const itemDetail = useItemDetail()
  const itemTitle = computed(
    (): string => itemDetail.value?.itemName || '未選択',
  )
  const itemHtml = computed((): string => itemDetail.value?.description || '')
</script>

<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" temporary fixed>
      <v-list v-model:opened="open">
        <v-list-item title="Top" href="https://yapparo.net" exact link>
        </v-list-item>
        <v-list-group
          v-for="(item, index) in items"
          :key="item.text + index"
          :value="item.text"
        >
          <template #activator="{ props }">
            <v-list-item :title="item.text" v-bind="props"> </v-list-item>
          </template>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            :title="child.text"
            :prepend-icon="child.icon"
            :to="child.to"
            link
          >
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app class="skill-app-bar">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="job-name" :text="jobName" />
      <skill-save></skill-save>
      <v-spacer />
      <v-btn class="mr-4" color="primary" small @click.stop="generateUrl">
        URL
      </v-btn>
      <v-dialog v-model="modal.visible" max-width="600">
        <v-card>
          <v-card-title class="headline">{{ modal.head }}</v-card-title>
          <v-card-text>
            {{ modal.body }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="modal.visible = false">
              閉じる
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      location="right"
      :mini-variant="miniVariant"
      :clipped="clipped"
      :disable-resize-watcher="true"
      :disable-route-watcher="true"
      fixed
      app
    >
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-subtitle style="padding: 8px 0 0 16px">
            <v-img
              v-if="itemDetail"
              :src="
                'https://rotool.gungho.jp/icon/' + itemDetail.itemId + '.png'
              "
              :max-width="75"
              :max-height="100"
            ></v-img>
          </v-card-subtitle>
          <v-card-title class="pt-1 text-wrap">{{ itemTitle }}</v-card-title>
          <v-card-subtitle><div v-html="itemHtml"></div></v-card-subtitle>
        </div>
      </div>
    </v-navigation-drawer>
  </v-app>
</template>
<style lang="scss" scoped>
  @media screen and (max-width: 799.99px) {
    .skill-app-bar:deep(.skill-save) {
      display: none !important;
    }
  }
  @media screen and (min-width: 800px) {
    .skill-app-bar:deep(.skill-save) {
      display: initial;
    }
  }
  .job-name {
    min-width: 100px;
    font-size: 1em;
  }
</style>
