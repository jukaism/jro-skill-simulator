<script setup lang="ts">
  import { SearchItem } from '../models/roten'
  import {
    Skill,
    SkillRelation,
    SkillRequire,
    ItemWithRequires,
    ItemIdAndName,
  } from '@/models/job'
  import { JobCode, JobTree4, JobTypeName } from '~/models/skill'
  import { Ref } from 'vue'
  import {
    fetchCandidates,
    fetchItemDetail,
    fetchJob,
    setSkillLv,
    skillReset,
    useItemsWithRequires,
    useSearchCandidates,
    useSkillRelations,
    useSkills,
    useTrees,
  } from '~~/composables/skill4'
  type JobName =
    | 'Swordman'
    | 'Magician'
    | 'Acolyte'
    | 'Archer'
    | 'Thief'
    | 'Rogue'
    | 'Merchant'
    | 'Chaser'
    | 'Shadow Chaser'
    | 'Abyss Chaser'
    | 'Wizard'
    | 'High Wizard'
    | 'Warlock'
    | 'Arch Mage'
    | 'Alchemist'
    | 'Creator'
    | 'Genetic'
    | 'Biolo'
    | 'Priest'
    | 'High Priest'
    | 'Arch Bishop'
    | 'Cardinal'
    | 'Knight'
    | 'Load Knight'
    | 'Rune Knight'
    | 'Dragon Knight'
    | 'Sage'
    | 'Professor'
    | 'Sorcerer'
    | 'Elemental Master'
    | 'Crusader'
    | 'Paladin'
    | 'Royal Guard'
    | 'Imperial Guard'
    | 'Monk'
    | 'Champion'
    | 'Sura'
    | 'Inquisitor'
    | 'Black Smith'
    | 'White Smith'
    | 'Mechanic'
    | 'Meister'
    | 'Assassin'
    | 'Assassin Cross'
    | 'Guillotine Cross'
    | 'Shadow Cross'
    | 'Bard'
    | 'Clown'
    | 'Minstrel'
    | 'Troubadour'
    | 'Dancer'
    | 'Gypsy'
    | 'Wanderer'
    | 'Trouvere'
    | 'Hunter'
    | 'Sniper'
    | 'Ranger'
    | 'Wind Hawk'
    | 'Summoner'
    | 'Taekwon Kid'
    | 'Star Gradiator'
    | 'Star Emperor'
    | 'Soul Linker'
    | 'Soul Reaper'
    | 'Ninja'
    | 'Kagerou'
    | 'Oboro'
    | 'Gunslinger'
    | 'Rebellion'
    | 'Super Novice'
    | 'Super Novice 2'

  interface JobType {
    name: JobTypeName
    lv: 40 | 50 | 60 | 70 | 99
  }

  interface JobInfo {
    code: JobCode
    name: JobName
    type: JobTypeName
  }

  interface JobDetail {
    code: JobCode
    name: string
    lv: number
  }
  interface JobProps {
    allJobCodes?: JobCode[][]
  }
  interface Transfer {
    from: number
    to: number
    num: number
  }
  const props = withDefaults(defineProps<JobProps>(), {
    allJobCodes: () => [],
  })
  const route = useRoute()
  const itemsWithRequires = useItemsWithRequires()
  const baby: Ref<boolean> = ref(false)
  const jobTypes: JobType[] = [
    { name: '1st', lv: 50 },
    { name: '2nd', lv: 70 },
    { name: '2nd_native', lv: 50 },
    { name: '3rd', lv: 70 },
    { name: '4th', lv: 40 },
    { name: '1st_sp', lv: 70 },
    { name: '2nd_taekwon', lv: 50 },
    { name: '1st_sp_novice', lv: 99 },
    { name: 'summoner', lv: 60 },
  ]
  const jobs: JobInfo[] = [
    { code: 'JT_SWORDMAN', name: 'Swordman', type: '1st' },
    { code: 'JT_MAGICIAN', name: 'Magician', type: '1st' },
    { code: 'JT_ARCHER', name: 'Archer', type: '1st' },
    { code: 'JT_ACOLYTE', name: 'Acolyte', type: '1st' },
    { code: 'JT_THIEF', name: 'Thief', type: '1st' },
    { code: 'JT_MERCHANT', name: 'Merchant', type: '1st' },
    { code: 'JT_KNIGHT', name: 'Knight', type: '2nd_native' },
    { code: 'JT_KNIGHT_H', name: 'Load Knight', type: '2nd' },
    { code: 'JT_WIZARD', name: 'Wizard', type: '2nd_native' },
    { code: 'JT_WIZARD_H', name: 'High Wizard', type: '2nd' },
    { code: 'JT_HUNTER', name: 'Hunter', type: '2nd_native' },
    { code: 'JT_HUNTER_H', name: 'Sniper', type: '2nd' },
    { code: 'JT_PRIEST', name: 'Priest', type: '2nd_native' },
    { code: 'JT_PRIEST_H', name: 'High Priest', type: '2nd' },
    { code: 'JT_ASSASSIN', name: 'Assassin', type: '2nd_native' },
    { code: 'JT_ASSASSIN_H', name: 'Assassin Cross', type: '2nd' },
    { code: 'JT_BLACKSMITH', name: 'Black Smith', type: '2nd_native' },
    { code: 'JT_BLACKSMITH_H', name: 'White Smith', type: '2nd' },
    { code: 'JT_CRUSADER', name: 'Crusader', type: '2nd_native' },
    { code: 'JT_CRUSADER_H', name: 'Paladin', type: '2nd' },
    { code: 'JT_SAGE', name: 'Sage', type: '2nd_native' },
    { code: 'JT_SAGEE_H', name: 'Professor', type: '2nd' },
    { code: 'JT_BARD', name: 'Bard', type: '2nd_native' },
    { code: 'JT_BARD_H', name: 'Clown', type: '2nd' },
    { code: 'JT_DANCER', name: 'Dancer', type: '2nd_native' },
    { code: 'JT_DANCER_H', name: 'Gypsy', type: '2nd' },
    { code: 'JT_ROGUE', name: 'Rogue', type: '2nd_native' },
    { code: 'JT_ROGUE_H', name: 'Chaser', type: '2nd' },
    { code: 'JT_ROGUE', name: 'Rogue', type: '2nd_native' },
    { code: 'JT_ROGUE_H', name: 'Chaser', type: '2nd' },
    { code: 'JT_ALCHEMIST', name: 'Alchemist', type: '2nd_native' },
    { code: 'JT_ALCHEMIST_H', name: 'Creator', type: '2nd' },
    { code: 'JT_RUNE_KNIGHT', name: 'Rune Knight', type: '3rd' },
    { code: 'JT_WARLOCK', name: 'Warlock', type: '3rd' },
    { code: 'JT_RANGER', name: 'Ranger', type: '3rd' },
    { code: 'JT_ARCHBISHOP', name: 'Arch Bishop', type: '3rd' },
    { code: 'JT_GUILLOTINE_CROSS', name: 'Guillotine Cross', type: '3rd' },
    { code: 'JT_MECHANIC', name: 'Mechanic', type: '3rd' },
    { code: 'JT_ROYAL_GUARD', name: 'Royal Guard', type: '3rd' },
    { code: 'JT_SORCERER', name: 'Sorcerer', type: '3rd' },
    { code: 'JT_MINSTREL', name: 'Minstrel', type: '3rd' },
    { code: 'JT_WANDERER', name: 'Wanderer', type: '3rd' },
    { code: 'JT_SURA', name: 'Sura', type: '3rd' },
    { code: 'JT_SHADOW_CHASER', name: 'Shadow Chaser', type: '3rd' },
    { code: 'JT_GENETIC', name: 'Genetic', type: '3rd' },
    { code: 'JT_DRAGON_KNIGHT', name: 'Dragon Knight', type: '4th' },
    { code: 'JT_ARCH_MAGE', name: 'Arch Mage', type: '4th' },
    { code: 'JT_WINDHAWK', name: 'Wind Hawk', type: '4th' },
    { code: 'JT_CARDINAL', name: 'Cardinal', type: '4th' },
    { code: 'JT_SHADOW_CROSS', name: 'Shadow Cross', type: '4th' },
    { code: 'JT_MEISTER', name: 'Meister', type: '4th' },
    { code: 'JT_IMPERIAL_GUARD', name: 'Imperial Guard', type: '4th' },
    { code: 'JT_ELEMENTAL_MASTER', name: 'Elemental Master', type: '4th' },
    { code: 'JT_TROUBADOUR', name: 'Troubadour', type: '4th' },
    { code: 'JT_TROUVERE', name: 'Trouvere', type: '4th' },
    { code: 'JT_INQUISITOR', name: 'Inquisitor', type: '4th' },
    { code: 'JT_ABYSS_CHASER', name: 'Abyss Chaser', type: '4th' },
    { code: 'JT_BIOLO', name: 'Biolo', type: '4th' },
    { code: 'JT_DO_SUMMONER', name: 'Summoner', type: 'summoner' },
    { code: 'JT_TAEKWON', name: 'Taekwon Kid', type: '1st' },
    { code: 'JT_STAR', name: 'Star Gradiator', type: '2nd_taekwon' },
    { code: 'JT_STAR_EMPEROR', name: 'Star Emperor', type: '3rd' },
    { code: 'JT_LINKER', name: 'Soul Linker', type: '2nd_taekwon' },
    { code: 'JT_SOUL_REAPER', name: 'Soul Reaper', type: '3rd' },
    { code: 'JT_NINJA', name: 'Ninja', type: '1st_sp' },
    { code: 'JT_KAGEROU', name: 'Kagerou', type: '2nd' },
    { code: 'JT_Oboro', name: 'Oboro', type: '2nd' },
    { code: 'JT_GUNSLINGER', name: 'Gunslinger', type: '1st_sp' },
    { code: 'JT_REBELLION', name: 'Rebellion', type: '2nd' },
    { code: 'JT_SUPERNOVICE', name: 'Super Novice', type: '1st_sp_novice' },
    { code: 'JT_SUPERNOVICE2', name: 'Super Novice 2', type: '2nd' },
  ]

  const headers = [
    { text: 'アイテム名', value: 'itemName', width: 280 },
    { text: '対象スキル数', value: 'targets' },
  ]
  const page: Ref<number> = ref(1)
  const pageCount: Ref<number> = ref(0)
  const search: Ref<string> = ref('')
  const searchItem: Ref<SearchItem | null> = ref(null)
  const bgElement: Ref<HTMLElement | null> = ref(null)
  interface Element {
    id: string
    element: HTMLElement
  }
  const elements: Ref<Element[]> = ref([])
  const maxx: Ref<number> = ref(1200)
  const maxy: Ref<number> = ref(700)
  const jobCodes = computed(
    (): JobCode[] =>
      props.allJobCodes?.map((codes) => {
        return (baby.value && codes[1]) || codes[0]
      }) || [],
  )
  const jobDetails = computed((): JobDetail[] =>
    jobCodes.value.map((code) => {
      const job: JobInfo | undefined = jobs.find((job) => job.code === code)
      const name: string = job?.name || ''
      const lv: number = jobTypes.find((jt) => jt.name === job?.type)?.lv || 1
      const jobDetail: JobDetail = { code, name, lv }
      return jobDetail
    }),
  )
  const viewBox = computed((): string => `0 0 1200 ${maxy.value}`)
  const skills = useSkills()
  const relations = useSkillRelations()
  const cachedSearchItems = useCookie<ItemIdAndName[]>(
    'searchItems' + jobCodes.value[jobCodes.value.length - 1],
  )
  onMounted(() => {
    fetchJob({
      jobCodes: jobCodes.value,
      params: route.params.s === 'string' ? route.params.s : '',
      callback: decorateRelation,
    })
    baby.value = route.params.t === 'none'
    cachedSearchItems.value?.reverse().forEach((item: ItemIdAndName) => {
      const searchItem: SearchItem = {
        itemId: Number(item.id),
        itemName: item.name,
        cardSlot: 0,
        refiningFlag: false,
        createFlag: false,
        enchantFlag: false,
        makeFlag: false,
      }
      const target = itemsWithRequires.value.find(
        (item: ItemWithRequires) =>
          item.searchItem.itemId === searchItem.itemId,
      )
      if (!target) {
        fetchItemDetail({
          searchItem,
          callback: () => {},
        })
      }
    })
  })
  function relationColor(relation: SkillRelation): string {
    const target = skills.value.find(
      (skill: Skill) => skill.code === relation.from,
    )
    if (target && target.lv >= relation.lv) {
      return 'orange'
    } else {
      return '#AAAAAA'
    }
  }
  const relationPaths: Ref<string[]> = ref<string[]>([])
  watch(elements, (_) => {
    relationPaths.value = []
    if (bgElement.value) {
      const bgLeft: number = bgElement.value.getBoundingClientRect().left
      const bgTop: number = bgElement.value.getBoundingClientRect().top
      relations.value.forEach((relation: SkillRelation) => {
        const fromRect = getCardRect(relation.from)
        const toRect = getCardRect(relation.to)
        if (fromRect && toRect) {
          let xType = 'same'
          let yType = 'same'
          const xDiff = toRect.left - fromRect.left
          const yDiff = toRect.top - fromRect.top
          const scale = 1 / 2
          if (Math.abs(xDiff) > 50) {
            if (160 > Math.abs(xDiff)) {
              xType = 'near'
            } else {
              xType = 'far'
            }
          }
          if (Math.abs(yDiff) > scale * 50) {
            if (scale * 160 > yDiff && yDiff > -10) {
              yType = 'near'
            } else {
              yType = 'far'
            }
          }
          let startX: number = (fromRect.right + fromRect.left) / 2
          let startY: number = fromRect.bottom
          let endX: number = xDiff > -10 ? toRect.left : toRect.right
          let endY: number = toRect.top
          startX = startX - bgLeft
          startY = startY - bgTop
          endX = endX - bgLeft
          endY = endY - bgTop
          const endPath = ` L ${endX} ${endY}`
          const near: number = scale === 1 ? 5 : 3
          const neighbor: number = scale === 1 ? 12 : 8
          const nearEndX: number = xDiff > -10 ? endX - near : endX + near
          const nearEndY: number = xDiff > -10 ? endY - near : endY - 12
          const nearEndPath: string = [xType, yType].includes('near')
            ? ` L ${nearEndX} ${nearEndY}`
            : ` V ${nearEndY} H ${nearEndX}`
          // Tower reachable
          let path = `M ${startX} ${startY} V ${startY + near}`
          if ([xType, yType].includes('near')) {
            if (xDiff > 10) {
              path = path + `H ${startX + fromRect.width / 2 + near}`
              path = path + endPath
            } else {
              path = path + `H ${startX - fromRect.width / 2 - near}`
              path = path + endPath
            }
          } else {
            if (xDiff > 10) {
              path = path + `H ${startX + fromRect.width / 2 + near}`
              path = path + nearEndPath + endPath
            } else if (xDiff > -10) {
              path = path + `H ${startX - fromRect.width / 2 - near}`
              path = path + nearEndPath + endPath
            } else {
              path = path + `H ${startX - fromRect.width / 2 - near}`
              path =
                path +
                ` L ${
                  startX - fromRect.width / 2 - neighbor
                } ${nearEndY} H ${nearEndX}` +
                endPath
            }
          }
          if ([xType, yType].includes('same')) {
            // 2, 4, 6, 8
            if ([xType, yType].includes('near')) {
              path = `M ${cardCenterX(relation.from)} ${cardCenterY(
                relation.from,
              )} L ${cardCenterX(relation.to)} ${cardCenterY(relation.to)}`
            }
          }
          relationPaths.value.push(path)
          maxy.value = Math.max(startY + 10, endY + 10, maxy.value)
        }
      })
    }
  })
  function cardCenterX(name: string): number {
    const rect = getCardRect(name)
    if (rect && bgElement.value) {
      return (
        (rect.left + rect.right) / 2 -
        bgElement.value.getBoundingClientRect().left
      )
    } else {
      return 0
    }
  }
  function cardCenterY(name: string): number {
    const rect = getCardRect(name)
    if (rect && bgElement.value) {
      maxy.value = Math.max(rect.bottom, maxy.value)
      return (
        (rect.top + rect.bottom) / 2 -
        bgElement.value.getBoundingClientRect().top
      )
    } else {
      return 0
    }
  }
  function getCardRect(name: string): ClientRect | DOMRect | null {
    const target = elements.value.find(
      (element: { id: string; element: HTMLElement }) => element.id === name,
    )
    if (target && target.element !== null) {
      return target.element.getBoundingClientRect()
    } else {
      return null
    }
  }
  function decrement(skill: Skill) {
    if (skill.lv > 0) {
      setSkillLv({ name: skill.name, level: skill.lv - 1 })
    }
  }
  function increment(skill: Skill) {
    if (skill.lv < skill.maxLv) {
      setSkillLv({ name: skill.name, level: skill.lv + 1 })
    }
  }
  const searchCandidates = useSearchCandidates()
  const candidates = computed((): SearchItem[] =>
    searchCandidates.value.filter(costumeFilter),
  )
  function costumeFilter(item: SearchItem): boolean {
    return !item.itemName.includes('[衣装]')
  }
  function addListToItem(searchItem: SearchItem | null) {
    if (searchItem) {
      const target = itemsWithRequires.value.find(
        (item: ItemWithRequires) =>
          item.searchItem.itemId === searchItem.itemId,
      )
      if (!target) {
        fetchItemDetail({
          searchItem,
          callback: saveItems,
        })
      }
    }
  }
  function saveItems() {
    cachedSearchItems.value = itemsWithRequires.value.map((ir) => {
      return { id: ir.searchItem.itemId, name: ir.searchItem.itemName }
    })
  }
  // function setRequiredSkills(itemWithRequires: ItemWithRequires) {
  //   itemWithRequires.requires.forEach((require: SkillRequire) => {
  //     setSkillLv({
  //       name: require.skillName,
  //       level: require.lv,
  //     })
  //   })
  // }
  // function openDetail(itemWithRequires: ItemWithRequires) {
  //   console.warn(itemWithRequires)
  //   // setItemDetail(itemWithRequires.itemDescription)
  // }
  // function deleteItemWithRequires(itemWithRequires: ItemWithRequires) {
  //   removeItemDetail(itemWithRequires)
  //   saveItems()
  // }
  function arrangeSkillRequireDescription(
    itemName: string,
    require: SkillRequire,
  ): string {
    const brTaggedDescription = require.description
      .replace(
        /(?:\[[^\]]+\]、)*(?:\[[^\]]+\])*(?:\[[^\]]+\])*\[[^\]]+\]((Lv|レベル)[0-9]+(?:以上習得|習得)|を?未習得|習得時|の習得(Lv|レベル)|と共に|の精錬値)/g,
        '<br>$&',
      )
      .replace(/([^で\>、,\s\]])(\[)/g, '$1 $2')
      .replace(/( [0-9\%]+)([^0-9\%、,\.\s]+)/g, '$1 $2')
    return `<span style="color: blue;">${itemName}</span>${brTaggedDescription}`
  }
  function badgeOfSkill(skill: Skill): ItemWithRequires[] {
    return itemsWithRequires.value
      .map((itemWithRequires: ItemWithRequires) => {
        const requires: SkillRequire[] = itemWithRequires.requires.filter(
          (require: SkillRequire) => {
            return require.skillName === skill.name
          },
        )
        return {
          itemName: itemWithRequires.itemName,
          targets: itemWithRequires.targets,
          searchItem: itemWithRequires.searchItem,
          itemDescription: itemWithRequires.itemDescription,
          requires,
        }
      })
      .filter((ir) => ir.requires.length > 0)
  }
  watch(search, (itemName) => {
    fetchCandidates({ itemName, page: 1 })
  })
  function decorateRelation() {
    maxy.value = 700
    bgElement.value = document.getElementById('background')
    elements.value = []
    skills.value.forEach((skill: Skill) => {
      const element = document.getElementById(skill.code)
      if (element) {
        elements.value.push({
          id: skill.code,
          element,
        })
      }
    })
  }
  const trees = useTrees()
  function treeOfJob(jobCode: JobCode): Skill[] {
    let jobSkills: Skill[] = []
    let treeSize = 0
    trees.value.forEach((tree: JobTree4) => {
      if (jobCode === tree.jobCode) {
        treeSize = Math.max(treeSize, tree.treeSize)
        jobSkills = jobSkills.concat(
          skills.value.filter((skill: Skill) =>
            tree.skillCodes.includes(skill.code),
          ),
        )
      }
    })
    let skillsWithDummys: Skill[] = []
    for (var i = 0; i < Math.ceil((treeSize + 1) / 7) * 7; i++) {
      const skill = jobSkills.find((skill: Skill) => skill.id === i)
      if (skill) {
        skillsWithDummys.push(skill)
      } else {
        skillsWithDummys.push({
          id: -1,
          code: '',
          name: 'dummy',
          maxLv: 1,
          lv: 0,
          description: '',
          imageUrl: '',
        })
      }
    }
    return skillsWithDummys
  }
  const lvsOfJob = computed((): number[] => {
    let lvs: number[] = []
    jobCodes.value.forEach((jobCodes: JobCode) => {
      let lv = 1
      trees.value.forEach((tree: JobTree4) => {
        if (jobCodes.includes(tree.jobCode)) {
          skills.value
            .filter((skill: Skill) => tree.skillCodes.includes(skill.code))
            .forEach((skill: Skill) => {
              lv = lv + skill.lv
            })
        }
      })
      lvs.push(lv)
    })
    return lvs
  })
  const transfers: Ref<Transfer[]> = ref([])
  const lvOfJob = computed((): number[] => {
    transfers.value = []
    const lvs: number[] = lvsOfJob.value
    jobDetails.value.forEach((detail, ind) => {
      for (var i = ind + 1; i < jobCodes.value.length; i++) {
        if (lvs[ind] > detail.lv) {
          const transfer: number = Math.min(
            lvs[ind] - detail.lv,
            jobDetails.value[i].lv - 1,
          )
          lvs[ind] = lvs[ind] - transfer
          lvs[i] = lvs[i] + transfer
          if (transfer > 0) {
            const trans: { from: number; to: number; num: number } = {
              from: ind,
              to: i,
              num: transfer,
            }
            transfers.value.push(trans)
          }
        }
      }
    })
    return lvs
  })
</script>

<template>
  <v-layout>
    <v-row style="position: relative; margin: 0 10px 0">
      <svg
        id="background"
        :view-box.camel="viewBox"
        :width="maxx"
        :height="maxy"
        style="position: absolute; top: 0; left: 0"
      >
        <path
          v-for="(path, index) in relationPaths"
          :key="'path' + index"
          :d="path"
          :stroke="relationColor(relations[index])"
          fill="transparent"
        />
      </svg>
      <v-flex>
        <v-row>
          <div
            class="d-flex flex-no-wrap justify-start align-baseline"
            style="width: 100%"
          >
            <v-autocomplete
              v-model="searchItem"
              v-model:search-input="search"
              class="ma-1"
              label="アイテム名"
              :items="candidates"
              item-text="itemName"
              :no-filter="true"
              return-object
              style="max-width: 500px; padding-left: 20px"
            ></v-autocomplete>
            <v-btn
              v-if="searchItem"
              class="ma-1"
              color="primary"
              @click="addListToItem(searchItem)"
            >
              追加
            </v-btn>
            <v-spacer />
            <skill-info v-if="pageCount > 0" :clickable="true"></skill-info>
            <v-btn href="/skill" class="ml-2 mr-4" color="primary" small>
              一覧に戻る
            </v-btn>
          </div>
        </v-row>
        <div
          class="d-flex justify-between"
          style="height: 200px; flex-direction: column"
        >
          <v-data-table
            v-model:page="page"
            class="elevation-1"
            dense
            :headers="headers"
            :disable-sort="true"
            :items="itemsWithRequires"
            :items-per-page="3"
            hide-default-footer
            @page-count="pageCount = $event"
          >
            <!-- <template #item.itemName="{ item }">
              {{ item.itemName }}
            </template>
            <template #item.targets="{ item }">
              <div
                class="d-flex flex-no-wrap justify-between align-center"
                style="max-width: 800px"
              >
                <div>
                  {{ item.targets }}
                </div>
                <div style="margin-left: auto">
                  <v-btn
                    v-if="item.requires.length > 0"
                    class="ma-1"
                    color="secondary"
                    small
                    @click="setRequiredSkills(item)"
                  >
                    スキル習得
                  </v-btn>
                  <v-btn
                    class="ma-1"
                    color="info"
                    small
                    v-on="null"
                    @click="openDetail(item)"
                  >
                    詳細を見る
                  </v-btn>
                  <v-btn
                    class="ma-1"
                    color="error"
                    small
                    @click="deleteItemWithRequires(item)"
                  >
                    削除
                  </v-btn>
                </div>
              </div>
            </template> -->
          </v-data-table>
          <v-pagination
            v-if="pageCount > 0"
            v-model="page"
            :length="pageCount"
            style="position: relative; margin-top: auto"
          ></v-pagination>
          <div v-else class="text-center copy mt-2">
            スキル要件のある装備を追加すると連携機能が使えます。<br />
            <skill-info :clickable="true"></skill-info>
          </div>
        </div>
        <div class="d-flex flex-no-wrap align-center" style="margin-top: -30px">
          <div><p style="margin: 1px 0 0 10px">転生</p></div>
          <v-radio-group v-model="baby" class="ml-1" dense row>
            <v-radio label="あり" color="secondary" :value="false"></v-radio>
            <v-radio
              label="なし（養子）"
              color="secondary"
              :value="true"
            ></v-radio>
          </v-radio-group>
        </div>
        <div class="d-flex flex-no-wrap justify-between align-center">
          <v-btn
            class="mr-4"
            style="margin-left: auto"
            color="error"
            small
            @click="skillReset"
          >
            リセット
          </v-btn>
        </div>
        <div
          v-for="(detail, codeIndex) in jobDetails"
          :key="codeIndex"
          style="width: 870px"
        >
          <div class="d-flex align-center">
            <div style="display: inline-block">
              <v-card
                class="pa-1 text-center"
                style="
                  min-width: 170px;
                  background-color: rgb(255, 255, 200);
                  font-size: 13px;
                "
              >
                {{ detail.name }} : Lv {{ lvOfJob[codeIndex] }} /
                {{ detail.lv }}
              </v-card>
            </div>
            <div
              v-for="(trans, transIndex) in transfers.filter(
                (tran: any) => tran.to === codeIndex,
              )"
              :key="transIndex"
              class="ml-3"
              style="font-size: 11px; color: red; font-weight: bold; z-index: 2"
            >
              {{ trans.num }} ポイントを {{ trans.from + 1 }} 次スキルに使用中
            </div>
          </div>
          <v-row class="ma-0 pa-0">
            <div
              v-for="(skill, index) in treeOfJob(detail.code)"
              :key="index"
              class="mx-auto"
              :style="{
                padding: '8px 12px',
                position: 'relative',
              }"
            >
              <div
                v-for="(itemWithReq, inde) in badgeOfSkill(skill)"
                :key="inde"
                :style="{
                  zIndex: 1,
                  height: '18px',
                  width: '18px',
                  borderRadius: '9px',
                  fontSize: '14px',
                  left: '-3px',
                  position: 'absolute',
                  top: `${3 + index * 19}px`,
                  color: 'white',
                  backgroundColor: 'tomato',
                }"
                class="d-flex justify-center align-center"
              >
                <v-tooltip color="lime lighten-5" bottom>
                  <template #activator="{ on }">
                    <div style="user-select: none" v-on="on">
                      {{ itemWithReq.itemName.charAt(0) }}
                    </div>
                  </template>
                  <div style="color: black">
                    <div
                      v-for="(req, index) in itemWithReq.requires"
                      :key="index"
                    >
                      <span
                        v-html="
                          arrangeSkillRequireDescription(
                            itemWithReq.itemName,
                            req,
                          )
                        "
                      ></span>
                    </div>
                  </div>
                </v-tooltip>
              </div>
              <div
                v-if="skill.name === 'dummy'"
                style="
                  width: 100px;
                  height: 45px;
                  background-color: rgba(0, 0, 0, 0);
                "
              ></div>
              <v-tooltip v-else color="lime lighten-5" bottom>
                <template #activator="{ on }">
                  <v-card :id="skill.code" width="100" height="48">
                    <div
                      class="d-flex flex-no-wrap justify-center align-center"
                      style="flex-direction: column"
                    >
                      <div
                        style="
                          max-width: 90px;
                          font-size: 12px;
                          line-height: 12px;
                          height: 12px;
                          overflow: hidden;
                          text-overflow: ellipsis;
                          white-space: nowrap;
                        "
                        class="ma-1"
                        v-on="on"
                      >
                        {{ skill.name }}
                      </div>
                      <div class="d-flex justify-space-between align-center">
                        <v-avatar
                          style="user-select: none"
                          size="24"
                          tile
                          @click="increment(skill)"
                          @click.right.prevent="decrement(skill)"
                        >
                          <v-img :src="skill.imageUrl"></v-img>
                        </v-avatar>
                        <div
                          class="d-flex justify-center align-center flex-wrap ml-1"
                          style="width: 55px"
                        >
                          <div
                            v-for="sphereIndex in skill.maxLv"
                            :key="sphereIndex"
                            style="
                              flex: 0 0 11px;
                              padding: 2px 1px 0px;
                              user-select: none;
                              position: relative;
                            "
                            @click="
                              setSkillLv({
                                name: skill.name,
                                level: sphereIndex,
                              })
                            "
                            @click.right.prevent="
                              skill.lv >= sphereIndex
                                ? setSkillLv({
                                    name: skill.name,
                                    level: sphereIndex - 1,
                                  })
                                : null
                            "
                          >
                            <v-img src="/skill/sphere_white.png" />
                            <v-img
                              v-if="skill.lv >= sphereIndex"
                              style="position: absolute; top: 2px; left: 1px"
                              src="/skill/sphere_pink.png"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-card>
                </template>
                <span style="color: black" v-html="skill.description"></span>
              </v-tooltip>
            </div>
          </v-row>
        </div>
        <g-g-copy class="pa-5" style="margin-top: 55px" />
      </v-flex>
    </v-row>
  </v-layout>
</template>
