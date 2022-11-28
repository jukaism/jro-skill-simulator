<script setup lang="ts">
  import { Ref } from 'vue'

  interface Save {
    slot: number
    text: string
    path: string | null
    params: string
  }
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
</script>
<template>
  <div class="d-flex flex-row flex-nowrap align-center flex-grow-1 skill-save">
    <v-select
      v-if="saves"
      v-model="selectedSave"
      class="ml-4 flex-grow-1"
      :hide-details="true"
      style="max-width: 250px"
      :items="saves"
      item-title="text"
      label="Save slots"
      density="compact"
      outlined
      return-object
    ></v-select>
    <v-btn class="ml-1" color="primary" small @click.stop="loadSkill">
      Load
    </v-btn>
  </div>
  <div class="d-flex flex-row flex-nowrap align-center flex-grow-1 skill-save">
    <v-text-field
      v-model="memo"
      class="ml-4 flex-grow-1"
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
  </div>
</template>
