<script setup lang="ts">
  import { Ref } from 'vue'

  interface Save {
    s: number
    t: string
    j: string | null
    p: string
  }
  const saves = useCookie<Save[]>('skillSave', { maxAge: 60 * 60 * 24 * 365 })
  saves.value = saves.value || [
    { s: 1, t: '1: No save', j: null, p: '' },
    { s: 2, t: '2: No save', j: null, p: '' },
    { s: 3, t: '3: No save', j: null, p: '' },
    { s: 4, t: '4: No save', j: null, p: '' },
    { s: 5, t: '5: No save', j: null, p: '' },
    { s: 6, t: '6: No save', j: null, p: '' },
    { s: 7, t: '7: No save', j: null, p: '' },
    { s: 8, t: '8: No save', j: null, p: '' },
    { s: 9, t: '9: No save', j: null, p: '' },
    { s: 10, t: '10: No save', j: null, p: '' },
    { s: 11, t: '11: No save', j: null, p: '' },
    { s: 12, t: '12: No save', j: null, p: '' },
    { s: 13, t: '13: No save', j: null, p: '' },
    { s: 14, t: '14: No save', j: null, p: '' },
    { s: 15, t: '15: No save', j: null, p: '' },
    { s: 16, t: '16: No save', j: null, p: '' },
    { s: 17, t: '17: No save', j: null, p: '' },
    { s: 18, t: '18: No save', j: null, p: '' },
    { s: 19, t: '19: No save', j: null, p: '' },
    { s: 20, t: '20: No save', j: null, p: '' },
  ]
  const selectedSave: Ref<Save> = ref<Save>(saves.value[0])
  const memo = ref('')
  const route = useRoute()
  function saveSkill() {
    if (saves.value?.[selectedSave.value.s - 1]) {
      const newSave: Save = {
        s: selectedSave.value.s,
        t: memo.value || '名称未設定',
        j: route.path,
        p: getParams(),
      }
      saves.value = saves.value.map((save, index) => {
        return index === selectedSave.value.s - 1 ? newSave : save
      })
      selectedSave.value = newSave
    }
  }
  function loadSkill() {
    if (!selectedSave.value.j) {
      return
    }
    if (route.path === selectedSave.value.j) {
      setParams(selectedSave.value.p)
    } else {
      navigateTo(selectedSave.value.j + '?s=' + selectedSave.value.p)
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
      item-title="t"
      label="Save slots"
      density="compact"
      outlined
      return-object
    ></v-select>
    <v-btn class="ml-1" color="primary" small @click.stop="loadSkill">
      Load
    </v-btn>
  </div>
  <div
    v-if="1 < route.path.length"
    class="d-flex flex-row flex-nowrap align-center flex-grow-1 skill-save"
  >
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
