<script setup lang="ts">
  import { Ref } from 'vue'
  interface Modal {
    visible: boolean
    head: string
    body: string
  }
  interface Save {
    slot: number
    text: string
    path: string | null
    params: string
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
  const open = ref(['4-1'])
  const miniVariant = ref<boolean>(false)
  const rightDrawer = ref<boolean>(false)
  const modal: Ref<Modal> = ref<Modal>({
    visible: false,
    head: '',
    body: '',
  })
  const jobName = useDisplayJobName()
  const saves = useCookie<Save[]>('skillSaves')
  saves.value = saves.value || [
    { slot: 1, text: '1: No save', path: null, params: '' },
    { slot: 2, text: '2: No save', path: null, params: '' },
    { slot: 3, text: '3: No save', path: null, params: '' },
    { slot: 4, text: '4: No save', path: null, params: '' },
    { slot: 5, text: '5: No save', path: null, params: '' },
    { slot: 6, text: '6: No save', path: null, params: '' },
    { slot: 7, text: '7: No save', path: null, params: '' },
    { slot: 8, text: '8: No save', path: null, params: '' },
    { slot: 9, text: '9: No save', path: null, params: '' },
    { slot: 10, text: '10: No save', path: null, params: '' },
    { slot: 11, text: '11: No save', path: null, params: '' },
    { slot: 12, text: '12: No save', path: null, params: '' },
    { slot: 13, text: '13: No save', path: null, params: '' },
    { slot: 14, text: '14: No save', path: null, params: '' },
    { slot: 15, text: '15: No save', path: null, params: '' },
    { slot: 16, text: '16: No save', path: null, params: '' },
    { slot: 17, text: '17: No save', path: null, params: '' },
    { slot: 18, text: '18: No save', path: null, params: '' },
    { slot: 19, text: '19: No save', path: null, params: '' },
    { slot: 20, text: '20: No save', path: null, params: '' },
    { slot: 21, text: '21: No save', path: null, params: '' },
    { slot: 22, text: '22: No save', path: null, params: '' },
    { slot: 23, text: '23: No save', path: null, params: '' },
    { slot: 24, text: '24: No save', path: null, params: '' },
    { slot: 25, text: '25: No save', path: null, params: '' },
    { slot: 26, text: '26: No save', path: null, params: '' },
    { slot: 27, text: '27: No save', path: null, params: '' },
    { slot: 28, text: '28: No save', path: null, params: '' },
    { slot: 29, text: '29: No save', path: null, params: '' },
    { slot: 30, text: '30: No save', path: null, params: '' },
  ]
  const selectedSave: Ref<Save> = ref<Save>(saves.value[0])
  const memo = ref('')
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
  function saveSkill() {
    if (saves.value?.[selectedSave.value.slot - 1]) {
      const newSave: Save = {
        slot: selectedSave.value.slot,
        text: memo.value || '名称未設定',
        path: route.path,
        params: getParams(),
      }
      saves.value = saves.value.map((save, index) => {
        return index === selectedSave.value.slot - 1 ? newSave : save
      })
      selectedSave.value = newSave
    }
  }
  function loadSkill() {
    if (!selectedSave.value.path) {
      return
    }
    if (route.path === selectedSave.value.path) {
      setParams(selectedSave.value.params)
    } else {
      navigateTo(selectedSave.value.path + '?s=' + selectedSave.value.params)
    }
  }
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
        <v-list-item title="Top" to="../" exact link> </v-list-item>
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
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="job-name" :text="jobName" />
      <v-select
        v-if="saves"
        v-model="selectedSave"
        class="ml-4"
        :hide-details="true"
        style="max-width: 250px"
        :items="saves"
        item-title="text"
        label="Save slots"
        density="compact"
        outlined
      ></v-select>
      <v-btn class="ml-1" color="primary" small @click.stop="loadSkill">
        Load
      </v-btn>
      <v-text-field
        v-model="memo"
        class="ml-4"
        label="メモ"
        style="max-width: 200px"
        :hide-details="true"
        placeholder="キャラ名等"
        outlined
        density="compact"
      ></v-text-field>
      <v-btn class="ml-1" color="primary" small @click.stop="saveSkill">
        Save
      </v-btn>
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
  .job-name {
    min-width: 100px;
    font-size: 1em;
  }
</style>
